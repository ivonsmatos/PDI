const encoder = new TextEncoder();

async function getHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function toBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function buildCanonicalPayload(data) {
  return [
    data.profileId || '',
    data.nome || '',
    data.area || '',
    data.nivel || '',
    data.dataGeracao || '',
  ].join('|');
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.HMAC_SECRET) {
    return Response.json({ configured: false, signature: null }, { status: 200 });
  }

  try {
    const body = await request.json();
    const payload = buildCanonicalPayload(body);
    const key = await getHmacKey(env.HMAC_SECRET);
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    return Response.json({
      configured: true,
      alg: 'HMAC-SHA256',
      signature: toBase64Url(sig),
    });
  } catch {
    return Response.json({ error: 'Payload inválido' }, { status: 400 });
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.HMAC_SECRET) {
    return Response.json({ configured: false, valid: false }, { status: 200 });
  }

  const url = new URL(request.url);
  const sig = url.searchParams.get('sig') || '';
  if (!sig) {
    return Response.json({ configured: true, valid: false }, { status: 400 });
  }

  const payload = buildCanonicalPayload({
    profileId: url.searchParams.get('profileId'),
    nome: url.searchParams.get('nome'),
    area: url.searchParams.get('area'),
    nivel: url.searchParams.get('nivel'),
    dataGeracao: url.searchParams.get('dataGeracao'),
  });

  const key = await getHmacKey(env.HMAC_SECRET);
  const expected = toBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
  return Response.json({ configured: true, valid: sig === expected });
}
