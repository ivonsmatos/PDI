import fs from 'node:fs';
import path from 'node:path';

const FILES = [
  path.resolve(process.cwd(), 'src/data/certificacoesGratuitas.ts'),
  path.resolve(process.cwd(), 'src/lib/recursos.ts'),
];

const URL_REGEX = /https:\/\/[^\s'"`)]+/g;

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'MeuPDI-LinkChecker/1.0' },
    });
    if (res.status === 405 || res.status === 403) {
      const getRes = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'MeuPDI-LinkChecker/1.0' },
      });
      return { url, status: getRes.status, finalUrl: getRes.url, ok: getRes.ok };
    }
    return { url, status: res.status, finalUrl: res.url, ok: res.ok };
  } catch (err) {
    return { url, status: 0, finalUrl: url, ok: false, error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const urls = new Set();
  for (const file of FILES) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(URL_REGEX)) {
      urls.add(match[0].replace(/[.,;]+$/, ''));
    }
  }

  console.log(`[check:links] Verificando ${urls.size} URLs únicas do catálogo...`);
  let failures = 0;
  for (const url of urls) {
    const res = await checkUrl(url);
    const redirected = res.finalUrl && res.finalUrl !== url ? ` -> ${res.finalUrl}` : '';
    if (!res.ok) {
      failures++;
      console.warn(`[WARN] ${res.status} ${url}${redirected}${res.error ? ` (${res.error})` : ''}`);
    } else {
      console.log(`[OK]   ${res.status} ${url}${redirected}`);
    }
  }

  console.log(`[check:links] Concluído: ${urls.size - failures} OK, ${failures} alertas.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
