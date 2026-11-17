const PUBLIC_STATIC_ROUTES = new Set([
  '/',
  '/o-que-e-pdi',
  '/como-fazer-um-pdi',
  '/exemplo',
  '/para-rh',
  '/certificacoes-gratuitas',
  '/guias',
  '/sobre',
  '/privacidade',
  '/pdi-e-curriculo',
  '/hard-skills-e-soft-skills',
  '/pdi-primeiro-emprego',
  '/pdi-profissional-junior',
  '/pdi-profissional-pleno',
  '/pdi-profissional-senior',
  '/pdi-transicao-de-carreira',
  '/pdi-para-promocao',
  '/pdi-para-lideranca',
  '/pdi-onboarding-30-60-90',
  '/como-definir-objetivos-profissionais',
  '/acoes-de-desenvolvimento-com-prazo',
  '/como-identificar-lacunas-de-competencias',
  '/como-registrar-evidencias-profissionais',
  '/como-acompanhar-evolucao-de-competencias',
  '/competencias-de-comunicacao',
  '/inteligencia-emocional-no-trabalho',
  '/networking-profissional',
  '/pensamento-analitico-e-decisao',
  '/ia-no-desenvolvimento-profissional',
  '/pdi-ou-pdp',
  '/reuniao-1-on-1-com-evidencias',
  '/matriz-de-competencias-por-area-e-senioridade',
  '/medir-evolucao-do-pdi-sem-notas',
  '/pdi-no-onboarding-de-colaboradores',
  '/conversas-de-feedback-com-evidencias',
  '/evitar-pdi-esquecido',
  '/autonomia-do-colaborador-no-pdi',
  '/privacidade-e-lgpd-no-desenvolvimento',
  '/comparar-ciclos-sem-expor-pessoas',
  '/cursos-gratuitos-para-pdi',
  '/como-escolher-curso-para-pdi',
  '/curso-projeto-ou-pratica-no-pdi',
  '/como-transformar-curso-em-evidencia',
  '/trilhas-de-desenvolvimento-por-area',
  '/certificados-badges-e-portfolio',
  '/por-que-criamos-o-meu-pdi',
  '/diario-de-construcao-meu-pdi',
  '/estudo-de-caso-pdi-estruturado',
  '/pdi-na-pratica-por-diferentes-areas',
  '/roteiros-rapidos-meu-pdi',
  '/templates-pdi-1on1-feedback-onboarding',
  '/glossario',
]);

const SPA_PREFIXES = ['/app', '/p/'];
const SPA_EXACT = new Set(['/login', '/wizard', '/dashboard']);

function isKnownRoute(pathname) {
  const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if (PUBLIC_STATIC_ROUTES.has(clean) || SPA_EXACT.has(clean)) return true;
  if (SPA_PREFIXES.some((prefix) => clean === prefix || clean.startsWith(prefix))) return true;
  if (clean.startsWith('/api/')) return true;
  // Arquivos estáticos com extensão (ex.: .js, .css, .png, .svg, .xml, .txt, .webmanifest)
  if (/\.[a-zA-Z0-9]{1,16}$/.test(clean)) return true;
  return false;
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function fetchPublicProfileMeta(profileId) {
  try {
    const endpoint = `https://firestore.googleapis.com/v1/projects/meupdi/databases/(default)/documents/publicProfiles/${encodeURIComponent(profileId)}`;
    const res = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const doc = await res.json();
    const fields = doc?.fields;
    if (!fields) return null;
    if (fields.revogado?.booleanValue === true) return null;
    const expiraEm = fields.expiraEm?.integerValue ? Number(fields.expiraEm.integerValue) : null;
    if (expiraEm && Date.now() > expiraEm) return null;

    const nome = fields.nome?.stringValue || 'Profissional';
    const area = fields.area?.stringValue || '';
    const nivel = fields.nivel?.stringValue || '';
    return { nome, area, nivel };
  } catch {
    return null;
  }
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const { pathname } = url;

  // 1. Retornar HTTP 404 real para rotas desconhecidas sem extensão de arquivo
  if (!isKnownRoute(pathname)) {
    const notFoundUrl = new URL('/404.html', url.origin);
    const assetRes = await env.ASSETS.fetch(new Request(notFoundUrl, request));
    const headers = new Headers(assetRes.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(assetRes.body, {
      status: 404,
      statusText: 'Not Found',
      headers,
    });
  }

  const response = await next();

  // 2. Open Graph dinâmico + noindex em perfis públicos (/p/:id)
  if (pathname.startsWith('/p/') && response.headers.get('content-type')?.includes('text/html')) {
    const profileId = pathname.slice(3).split('/')[0];
    if (/^[A-Za-z0-9_-]{16,40}$/.test(profileId)) {
      const profile = await fetchPublicProfileMeta(profileId);
      if (profile && typeof HTMLRewriter !== 'undefined') {
        const title = `${profile.nome} - Perfil de Competências | Meu PDI`;
        const desc = [profile.area, profile.nivel].filter(Boolean).join(' · ') || 'Perfil de competências compartilhado via Meu PDI.';
        const rewritten = new HTMLRewriter()
          .on('title', {
            element(el) {
              el.setInnerContent(title);
            },
          })
          .on('meta[property="og:title"]', {
            element(el) {
              el.setAttribute('content', escapeHtmlAttr(title));
            },
          })
          .on('meta[property="og:description"]', {
            element(el) {
              el.setAttribute('content', escapeHtmlAttr(desc));
            },
          })
          .transform(response);
        const headers = new Headers(rewritten.headers);
        headers.set('X-Robots-Tag', 'noindex, nofollow');
        return new Response(rewritten.body, { status: rewritten.status, headers });
      }
    }
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(response.body, { status: response.status, headers });
  }

  return response;
}
