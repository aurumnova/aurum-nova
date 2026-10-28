// Servidor estático mínimo y cross-platform para el sitio de AURUM NOVA.
// Evita depender de python o de paquetes externos en CI.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const candidates = [
  process.env.E2E_SITE_DIR,
  resolve(process.cwd(), '..'),
  resolve(process.cwd(), '../../02_REPOSITORIES/aurum-nova'),
  process.cwd(),
].filter(Boolean);

let root = null;
for (const candidate of candidates) {
  try {
    await readFile(join(candidate, 'index.html'));
    root = resolve(candidate);
    break;
  } catch {
    // seguimos buscando
  }
}

if (!root) {
  console.error('[e2e] No se encontró index.html del frontend. Define E2E_SITE_DIR.');
  process.exit(1);
}

const port = Number(process.env.E2E_PORT || 4173);
// GitHub Pages sirve el sitio bajo /aurum-nova; replicamos el prefijo en local
// para que las rutas absolutas del 404.html también resuelvan.
const basePath = process.env.E2E_BASE_PATH ?? '/aurum-nova';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  if (basePath && pathname.startsWith(basePath + '/')) {
    pathname = pathname.slice(basePath.length);
  } else if (basePath && pathname === basePath) {
    pathname = '/';
  }
  if (pathname.endsWith('/')) pathname += 'index.html';
  if (pathname.startsWith('/')) pathname = pathname.slice(1); // join() treats leading / as absolute

  const filePath = resolve(join(root, pathname));
  if (filePath !== root && !filePath.startsWith(root + sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const data = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': mime[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch {
    try {
      const fallback = await readFile(join(root, '404.html'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fallback);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  }
}).listen(port, () => {
  console.log(`[e2e] sirviendo ${root} en http://localhost:${port} (base ${basePath})`);
});
