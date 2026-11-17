import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const CORE_ROUTES = [
  { path: '/', lastmod: '2026-11-17', priority: '1.0', changefreq: 'weekly' },
  { path: '/o-que-e-pdi', lastmod: '2026-11-17', priority: '0.9', changefreq: 'monthly' },
  { path: '/como-fazer-um-pdi', lastmod: '2026-11-17', priority: '0.9', changefreq: 'monthly' },
  { path: '/exemplo', lastmod: '2026-11-14', priority: '0.8', changefreq: 'monthly' },
  { path: '/para-rh', lastmod: '2026-11-14', priority: '0.9', changefreq: 'monthly' },
  { path: '/certificacoes-gratuitas', lastmod: '2026-11-14', priority: '0.8', changefreq: 'monthly' },
  { path: '/guias', lastmod: '2026-11-17', priority: '0.9', changefreq: 'weekly' },
  { path: '/sobre', lastmod: '2026-11-14', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacidade', lastmod: '2026-11-14', priority: '0.5', changefreq: 'monthly' },
];

// Ordem idêntica a src/data/editorialArticles.ts para sincronizar as datas retroativas 2x/semana
const EDITORIAL_SLUGS = [
  // P0
  'pdi-e-curriculo',
  'hard-skills-e-soft-skills',
  // Senioridade (7-14)
  'pdi-primeiro-emprego',
  'pdi-profissional-junior',
  'pdi-profissional-pleno',
  'pdi-profissional-senior',
  'pdi-transicao-de-carreira',
  'pdi-para-promocao',
  'pdi-para-lideranca',
  'pdi-onboarding-30-60-90',
  // Competências (15-24)
  'como-definir-objetivos-profissionais',
  'acoes-de-desenvolvimento-com-prazo',
  'como-identificar-lacunas-de-competencias',
  'como-registrar-evidencias-profissionais',
  'como-acompanhar-evolucao-de-competencias',
  'competencias-de-comunicacao',
  'inteligencia-emocional-no-trabalho',
  'networking-profissional',
  'pensamento-analitico-e-decisao',
  'ia-no-desenvolvimento-profissional',
  // RH (25-34)
  'pdi-ou-pdp',
  'reuniao-1-on-1-com-evidencias',
  'matriz-de-competencias-por-area-e-senioridade',
  'medir-evolucao-do-pdi-sem-notas',
  'pdi-no-onboarding-de-colaboradores',
  'conversas-de-feedback-com-evidencias',
  'evitar-pdi-esquecido',
  'autonomia-do-colaborador-no-pdi',
  'privacidade-e-lgpd-no-desenvolvimento',
  'comparar-ciclos-sem-expor-pessoas',
  // Recursos (35-40)
  'cursos-gratuitos-para-pdi',
  'como-escolher-curso-para-pdi',
  'curso-projeto-ou-pratica-no-pdi',
  'como-transformar-curso-em-evidencia',
  'trilhas-de-desenvolvimento-por-area',
  'certificados-badges-e-portfolio',
  // P2 (41, 42, 43, 44, 47, 48, 46)
  'por-que-criamos-o-meu-pdi',
  'diario-de-construcao-meu-pdi',
  'estudo-de-caso-pdi-estruturado',
  'pdi-na-pratica-por-diferentes-areas',
  'roteiros-rapidos-meu-pdi',
  'templates-pdi-1on1-feedback-onboarding',
  'glossario',
];

function buildScheduleDates(count, endIso = '2026-11-17') {
  const dates = [];
  const cursor = new Date(`${endIso}T12:00:00Z`);
  while (dates.length < count) {
    const dow = cursor.getUTCDay();
    if (dow === 2 || dow === 5) {
      dates.push(cursor.toISOString().slice(0, 10));
    }
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return dates.reverse();
}

const scheduleDates = buildScheduleDates(EDITORIAL_SLUGS.length, '2026-11-17');

const EDITORIAL_ROUTES = EDITORIAL_SLUGS.map((slug, idx) => ({
  path: `/${slug}`,
  lastmod: scheduleDates[idx],
  priority: idx < 2 ? '0.9' : '0.8',
  changefreq: 'monthly',
}));

const ALL_ROUTES = [...CORE_ROUTES, ...EDITORIAL_ROUTES];
const PUBLIC_ROUTES = ALL_ROUTES.map(r => r.path);

function generateSitemapXml() {
  const entries = ALL_ROUTES.map(
    r => `  <url>
    <loc>https://meupdi.app.br${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function findBrowser() {
  const candidates = [
    process.env.CHROME_BIN,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  return candidates.find(p => fs.existsSync(p)) ?? null;
}

function startStaticServer() {
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'));
  const server = http.createServer((req, res) => {
    const reqPath = (req.url || '/').split('?')[0];
    const safePath = path.normalize(reqPath).replace(/^(\.\.[/\\])+/, '');
    const fullPath = path.join(DIST_DIR, safePath);

    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      const ext = path.extname(fullPath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(fullPath).pipe(res);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
  });

  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, port: addr.port });
    });
  });
}

async function runPool(items, concurrency, worker) {
  let idx = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (idx < items.length) {
      const cur = items[idx++];
      await worker(cur);
    }
  });
  await Promise.all(runners);
}

async function run() {
  const sitemapXml = generateSitemapXml();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  }
  console.log(`[sitemap] Atualizado com ${ALL_ROUTES.length} URLs e datas retroativas 2x/semana.`);

  const browser = findBrowser();
  if (!browser) {
    console.warn('[prerender] Nenhum navegador headless encontrado; pulando pré-renderização.');
    return;
  }

  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    throw new Error('[prerender] dist/index.html não encontrado. Execute vite build antes.');
  }

  const { server, port } = await startStaticServer();
  try {
    await runPool(PUBLIC_ROUTES, 6, async route => {
      const url = `http://127.0.0.1:${port}${route}`;
      const { stdout } = await execFileAsync(
        browser,
        ['--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=3000', '--dump-dom', url],
        { maxBuffer: 10 * 1024 * 1024 },
      );

      if (!stdout || !stdout.includes('<div id="root">') || stdout.includes('<div id="root"></div>')) {
        console.warn(`[prerender] Aviso: DOM vazio para ${route}, mantendo fallback.`);
        return;
      }

      const outFile =
        route === '/'
          ? path.join(DIST_DIR, 'index.html')
          : path.join(DIST_DIR, route.slice(1), 'index.html');

      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, stdout, 'utf8');
      console.log(`[prerender] Gerado ${path.relative(process.cwd(), outFile)} (${stdout.length} bytes)`);
    });

    const notFoundUrl = `http://127.0.0.1:${port}/404`;
    const { stdout: notFoundHtml } = await execFileAsync(
      browser,
      ['--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=3000', '--dump-dom', notFoundUrl],
      { maxBuffer: 10 * 1024 * 1024 },
    );
    if (notFoundHtml && notFoundHtml.includes('<div id="root">') && !notFoundHtml.includes('<div id="root"></div>')) {
      const out404 = path.join(DIST_DIR, '404.html');
      fs.writeFileSync(out404, notFoundHtml, 'utf8');
      console.log(`[prerender] Gerado ${path.relative(process.cwd(), out404)} (${notFoundHtml.length} bytes)`);
    }
  } finally {
    server.close();
  }
}

run().catch(err => {
  console.error('[prerender] Falha:', err);
  process.exit(1);
});
