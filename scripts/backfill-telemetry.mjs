/**
 * Backfill único de telemetria anonimizada (`telemetry/{uid}`) para usuários
 * que usaram o Meu PDI antes da criação do painel Admin Geral.
 *
 * Não lê nem grava PII (nome, e-mail, causa, textos de objetivos ou diário).
 *
 * Uso:
 *   node scripts/backfill-telemetry.mjs --key C:\caminho\service-account.json --dry-run
 *   node scripts/backfill-telemetry.mjs --key C:\caminho\service-account.json
 *
 * Ou definindo GOOGLE_APPLICATION_CREDENTIALS com o caminho do JSON da conta de serviço.
 */

import fs from 'node:fs';
import crypto from 'node:crypto';

function parseArgs(argv) {
  let keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
  let dryRun = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--key' && argv[i + 1]) {
      keyPath = argv[i + 1];
      i += 1;
    } else if (argv[i] === '--dry-run') {
      dryRun = true;
    }
  }
  return { keyPath, dryRun };
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/datastore',
      aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  );
  const unsigned = `${header}.${claim}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer
    .sign(sa.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Falha ao autenticar conta de serviço (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token;
}

function fromFirestoreValue(val) {
  if (!val || typeof val !== 'object') return undefined;
  if ('stringValue' in val) return val.stringValue;
  if ('booleanValue' in val) return val.booleanValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return Number(val.doubleValue);
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) {
    return (val.arrayValue.values || []).map(fromFirestoreValue);
  }
  if ('mapValue' in val) {
    const out = {};
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      out[k] = fromFirestoreValue(v);
    }
    return out;
  }
  return undefined;
}

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') fields[k] = { stringValue: v };
    else if (typeof v === 'boolean') fields[k] = { booleanValue: v };
    else if (typeof v === 'number') fields[k] = { integerValue: String(Math.round(v)) };
  }
  return fields;
}

function computeHealthScore(objetivos, planoDeAcao, campoDeForcas) {
  if (!Array.isArray(objetivos) || objetivos.length === 0) return 0;
  let score = 100;
  const objetivosComAcao = new Set(planoDeAcao.map(a => a?.objetivoId).filter(Boolean));
  const semAcao = Math.max(0, objetivos.length - objetivosComAcao.size);
  score -= semAcao * 20;

  const semRecurso = planoDeAcao.filter(a => !String(a?.recursos || '').trim()).length;
  score -= semRecurso * 10;

  if (!Array.isArray(campoDeForcas?.restritivas) || campoDeForcas.restritivas.length === 0) {
    score -= 15;
  }
  if (String(campoDeForcas?.aliancas || '').trim().length < 10) {
    score -= 10;
  }
  return Math.max(0, Math.min(100, score));
}

async function countSubcollection(baseUrl, token, uid, subcol) {
  let count = 0;
  let pageToken = '';
  do {
    const url = new URL(`${baseUrl}/users/${uid}/${subcol}`);
    url.searchParams.set('pageSize', '300');
    url.searchParams.set('mask.fieldPaths', 'id');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return count;
    const data = await res.json();
    count += (data.documents || []).length;
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return count;
}

async function main() {
  const { keyPath, dryRun } = parseArgs(process.argv.slice(2));
  if (!keyPath || !fs.existsSync(keyPath)) {
    console.error(
      'Informe o arquivo JSON da conta de serviço do Firebase com --key <caminho.json> (ou GOOGLE_APPLICATION_CREDENTIALS).'
    );
    process.exit(1);
  }

  const sa = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  const projectId = sa.project_id;
  if (!projectId) {
    console.error('JSON da conta de serviço inválido: project_id ausente.');
    process.exit(1);
  }

  const token = await getAccessToken(sa);
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

  const queryRes = await fetch(`${baseUrl}:runQuery`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'pdi', allDescendants: true }],
      },
    }),
  });

  if (!queryRes.ok) {
    throw new Error(`Erro ao consultar coleção pdi (${queryRes.status}): ${await queryRes.text()}`);
  }

  const rows = await queryRes.json();
  const docs = rows.map(r => r.document).filter(Boolean);
  const pdiAtualDocs = docs.filter(d => d.name.endsWith('/pdi/atual'));

  console.log(`Encontrados ${pdiAtualDocs.length} usuário(s) histórico(s) com PDI salvo.`);
  let processados = 0;

  for (const doc of pdiAtualDocs) {
    const parts = doc.name.split('/');
    const usersIdx = parts.lastIndexOf('users');
    const uid = usersIdx >= 0 ? parts[usersIdx + 1] : '';
    if (!uid) continue;

    const fields = doc.fields || {};
    const usuario = fromFirestoreValue(fields.usuario) || {};
    const inventario = fromFirestoreValue(fields.inventario) || {};
    const objetivos = fromFirestoreValue(fields.objetivos) || [];
    const planoDeAcao = fromFirestoreValue(fields.planoDeAcao) || [];
    const campoDeForcas = fromFirestoreValue(fields.campoDeForcas) || {};
    const planoAcaoStatus = fromFirestoreValue(fields.planoAcaoStatus) || {};
    const wizardConcluido = Boolean(fromFirestoreValue(fields.wizardConcluido));

    const [diarioCount, ciclosCount] = await Promise.all([
      countSubcollection(baseUrl, token, uid, 'diario'),
      countSubcollection(baseUrl, token, uid, 'ciclos'),
    ]);

    const acoesConcluidasCount = planoDeAcao.filter(
      a => a?.id && planoAcaoStatus[a.id] === 'concluido'
    ).length;

    const snapshot = {
      areaAtuacao: String(usuario.areaAtuacao || 'nao_informado'),
      nivelCarreira: String(usuario.nivelCarreira || 'nao_informado'),
      wizardConcluido,
      objetivosCount: Array.isArray(objetivos) ? objetivos.length : 0,
      acoesCount: Array.isArray(planoDeAcao) ? planoDeAcao.length : 0,
      acoesConcluidasCount,
      diarioCount,
      ciclosCount,
      hardSkillsCount: Array.isArray(inventario.hardSkills) ? inventario.hardSkills.length : 0,
      softSkillsCount: Array.isArray(inventario.softSkills) ? inventario.softSkills.length : 0,
      scoreSaude: computeHealthScore(objetivos, planoDeAcao, campoDeForcas),
      ultimoAcesso: (doc.updateTime || new Date().toISOString()).slice(0, 10),
    };

    if (!dryRun) {
      const writeRes = await fetch(`${baseUrl}/telemetry/${uid}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: toFirestoreFields(snapshot) }),
      });
      if (!writeRes.ok) {
        console.error(`Falha ao gravar telemetria de 1 registro (${writeRes.status}).`);
        continue;
      }
    }
    processados += 1;
  }

  console.log(
    dryRun
      ? `[dry-run] ${processados} snapshot(s) anonimizados prontos para gravação (nada foi alterado).`
      : `Concluído: ${processados} snapshot(s) anonimizados gravados em telemetry/.`
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
