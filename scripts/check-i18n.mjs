// Fails if index.html has English text without a French entry in scripts/i18n-fr.js.
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const dictSrc = readFileSync('scripts/i18n-fr.js', 'utf8');
const FR = new Function('window', dictSrc + '; return window.I18N_FR;')({});

const body = html.slice(html.indexOf('<body'))
  .replace(/<!--[\s\S]*?-->/g, '\0')
  .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, '\0')
  .replace(/<[^>]+>/g, '\0');
const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const nodes = new Set(
  body.split('\0').map((t) => decode(t).replace(/\s+/g, ' ').trim()).filter(Boolean)
);

const missing = [...nodes].filter((t) => !(t in FR.text));
const orphans = Object.keys(FR.text).filter((t) => !nodes.has(t));

orphans.forEach((t) => console.warn(`unused FR key: ${t.slice(0, 70)}`));
if (missing.length) {
  missing.forEach((t) => console.error(`missing FR entry: ${t.slice(0, 90)}`));
  console.error(`\n${missing.length} text node(s) lack a French entry in scripts/i18n-fr.js`);
  process.exit(1);
}
console.log(`i18n OK: ${nodes.size} text nodes covered`);
