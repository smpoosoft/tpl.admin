import { createServer } from 'node:http';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const iconsDir = join(__dirname, '../src/components/widget/icons');
const PORT = 5234;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.ts': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

const scanIcons = () => {
  return readdirSync(iconsDir)
    .filter(f => f.endsWith('.ts'))
    .sort()
    .map(file => {
      const raw = readFileSync(join(iconsDir, file), 'utf-8');
      const match = raw.match(/ICON_BODY:\s*string\s*=\s*'(.*)'/s);
      return { name: file.replace('.ts', ''), body: match?.[1] ?? '' };
    });
};

const renderPage = (icons) => {
  const cards = icons.map(({ name, body }) => `
    <div class="item">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="color:#333">${body}</svg>
      <span>${name}</span>
    </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Icons Preview</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; background: #f5f5f5; }
    h1 { margin-bottom: 24px; font-size: 20px; color: #333; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; }
    .item { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .item svg { width: 24px; height: 24px; }
    .item span { font-size: 12px; color: #666; word-break: break-all; text-align: center; }
  </style>
</head>
<body>
  <h1>Icons Preview (${icons.length}) — <a href="/">refresh</a></h1>
  <div class="grid">${cards}</div>
</body>
</html>`;
};

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/' || url.pathname === '/index.html') {
    const icons = scanIcons();
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(renderPage(icons));
  } else if (url.pathname === '/api/icons') {
    res.writeHead(200, { 'Content-Type': MIME['.json'] });
    res.end(JSON.stringify(scanIcons()));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(PORT, () => {
  console.log(`Icons preview running at http://localhost:${PORT}`);
});
