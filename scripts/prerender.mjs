import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_ROUTES = [
  '/',
  '/o-que-e-pdi',
  '/como-fazer-um-pdi',
  '/exemplo',
  '/para-rh',
  '/certificacoes-gratuitas',
  '/sobre',
  '/privacidade',
  '/pdi-e-curriculo',
  '/hard-skills-e-soft-skills',
  '/pdi-ou-pdp',
  '/glossario',
];

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

async function run() {
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
    for (const route of PUBLIC_ROUTES) {
      const url = `http://127.0.0.1:${port}${route}`;
      const { stdout } = await execFileAsync(
        browser,
        ['--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=3000', '--dump-dom', url],
        { maxBuffer: 10 * 1024 * 1024 },
      );

      if (!stdout || !stdout.includes('<div id="root">') || stdout.includes('<div id="root"></div>')) {
        console.warn(`[prerender] Aviso: DOM vazio para ${route}, mantendo fallback.`);
        continue;
      }

      const outFile =
        route === '/'
          ? path.join(DIST_DIR, 'index.html')
          : path.join(DIST_DIR, route.slice(1), 'index.html');

      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, stdout, 'utf8');
      console.log(`[prerender] Gerado ${path.relative(process.cwd(), outFile)} (${stdout.length} bytes)`);
    }

    // Gera dist/404.html pré-renderizado (com noindex) para provedores estáticos
    const notFoundUrl = `http://127.0.0.1:${port}/404`;
    const { stdout: notFoundHtml } = await execFileAsync(
      browser,
      ['--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=3000', '--dump-dom', notFoundUrl],
      { maxBuffer: 10 * 1024 * 1024 },
    );
    if (notFoundHtml && notFoundHtml.includes('<div id="root">') && !notFoundHtml.includes('<div id="root"></div>')) {
      fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf8');
      console.log(`[prerender] Gerado dist\\404.html (${notFoundHtml.length} bytes)`);
    }
  } finally {
    server.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

