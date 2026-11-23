// Writes public/sitemap.xml and public/robots.txt from the site's pages, and audits every page's head (D-029).
// usage (from site/): node scripts/build-seo.mjs        exits 1 when the audit finds a fault
// A page is every index.html outside the build, test and source folders; /404/ is left out of the sitemap.
// No dependencies.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ORIGIN = 'https://www.imkan.ai';
const SKIP = new Set(['node_modules', 'dist', 'public', 'partials', 'templates', 'tests', 'test-results', 'playwright-report', '.taste-skill', 'scripts', 'content']);
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (!SKIP.has(name)) walk(p); }
    else if (name === 'index.html') pages.push(p);
  }
})('.');

const faults = [], titles = new Map(), descs = new Map(), urls = [];
for (const file of pages.sort()) {
  const dir = relative('.', file).split(sep).slice(0, -1).join('/');
  const path = dir ? `/${dir}/` : '/';
  const html = readFileSync(file, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const say = (m) => faults.push(`${path}: ${m}`);
  if (!title) say('no <title>'); else if (title.length > 65) say(`title ${title.length} characters (65 at most)`);
  if (!desc) say('no meta description'); else if (desc.length < 50 || desc.length > 170) say(`description ${desc.length} characters (50 to 170)`);
  if (title) { if (titles.has(title)) say(`title shared with ${titles.get(title)}`); titles.set(title, path); }
  if (desc) { if (descs.has(desc)) say(`description shared with ${descs.get(desc)}`); descs.set(desc, path); }
  if (path === '/404/') continue;
  if (canon !== ORIGIN + path) say(`canonical ${canon || 'missing'}, expected ${ORIGIN + path}`);
  if (!/property="og:image" content="\/share\.jpg"/.test(html)) say('no og:image');
  urls.push(ORIGIN + path);
}
writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
console.log(`${pages.length} pages, ${urls.length} in the sitemap`);
if (faults.length) { console.log(faults.map((f) => '  FAULT ' + f).join('\n')); process.exit(1); }
console.log('head audit: clean');
