import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const iconsDir = join(__dirname, '../src/components/widget/icons');
const outputFile = join(__dirname, '../icons.html');

const files = readdirSync(iconsDir).filter(f => f.endsWith('.ts')).sort();

const items = files.map(file => {
  const raw = readFileSync(join(iconsDir, file), 'utf-8');
  const match = raw.match(/ICON_BODY:\s*string\s*=\s*'(.*)'/s);
  const body = match?.[1] ?? '';
  const name = basename(file, '.ts');
  return { name, body };
});

const svgCards = items.map(({ name, body }) => `
<div class="item">
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="color:#333">${body}</svg>
  <span>${name}</span>
</div>`).join('\n');

const html = `<!DOCTYPE html>
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
  <h1>Icons Preview (${items.length})</h1>
  <div class="grid">${svgCards}</div>
</body>
</html>`;

writeFileSync(outputFile, html, 'utf-8');
console.log(`Generated ${outputFile} with ${items.length} icons`);
