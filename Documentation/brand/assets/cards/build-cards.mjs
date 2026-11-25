// Builds print-ready business cards in the three looks (extra brand asset 4, DECISION_TRACKER 2026-11-25).
// 85 x 55 mm trim with 3 mm bleed (PDF page 91 x 61 mm), front (logo) and back (details), printed to PDF by Edge or Chrome.
// The repository is public, so real people's details stay out of it: list them in cards/local/people.json (git-ignored),
// and their cards are written to cards/local/<slug>/imkan-card-<slug>-<look>.pdf. Only the template is committed.
// Never invent details: names, titles, phones and emails come from the people themselves.
//   node Documentation/brand/assets/cards/build-cards.mjs ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]
import { writeFileSync, readFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..');
const BROWSER = process.argv[2] || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const url = (p) => pathToFileURL(path.join(ROOT, p)).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// slug: file name. The template shows the prompts; real people come from local/people.json, an array of the same shape.
const LOCAL = path.join(HERE, 'local');
const PEOPLE = [
  { slug: 'template', name: 'Full name', title: 'Job title', phone: 'Mobile number', email: 'name@imkan.ai', dir: HERE },
  ...(existsSync(path.join(LOCAL, 'people.json'))
    ? JSON.parse(readFileSync(path.join(LOCAL, 'people.json'), 'utf8')).map((p) => ({ ...p, dir: LOCAL }))
    : []),
];
for (const p of PEOPLE) {
  for (const k of ['slug', 'name', 'title', 'phone', 'email']) if (!p[k]) throw new Error(`people.json: ${p.slug || '?'} has no ${k}`);
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`people.json: slug "${p.slug}" must be lower-case letters, digits and hyphens`);
}

const K = 'M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z';
// gold is never text on bone: the light-gold back keeps plum-black text and puts the gold in the K
const LOOKS = {
  light: { title: 'Light', bg: '#efece5', ink: '#1b111d', muted: '#4c4150', accent: '#5e1654', k: '#5e1654', logo: 'light' },
  dark: { title: 'Dark', bg: '#1b111d', ink: '#efece5', muted: '#cbbccf', accent: '#ffc233', k: '#ffc233', logo: 'dark' },
  'light-gold': { title: 'Light with gold', bg: '#efece5', ink: '#1b111d', muted: '#4c4150', accent: '#1b111d', k: '#ffc233', logo: 'light-gold' },
};
const BLEED = 3, W = 85, H = 55, SAFE = 4; // mm; SAFE is the margin inside the trim that print shops ask text to keep

const card = (look, p) => {
  const L = LOOKS[look];
  const pad = BLEED + SAFE;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Imkan.ai business card, ${esc(p.name)}, ${esc(L.title.toLowerCase())}</title><style>
@font-face { font-family: "Funnel Display"; src: url("${url('site/public/fonts/funnel-display-400-700-latin.woff2')}") format("woff2"); font-weight: 400 700; }
@font-face { font-family: "Funnel Sans"; src: url("${url('site/public/fonts/funnel-sans-400-600-latin.woff2')}") format("woff2"); font-weight: 400 600; }
@page { size: ${W + 2 * BLEED}mm ${H + 2 * BLEED}mm; margin: 0; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.side { width: ${W + 2 * BLEED}mm; height: ${H + 2 * BLEED}mm; background: ${L.bg}; color: ${L.ink}; position: relative; overflow: hidden; break-after: page; font-family: "Funnel Sans", sans-serif; }
.side:last-child { break-after: auto; }
.front { display: flex; align-items: center; justify-content: center; }
.front img { height: 13mm; display: block; }
.back { padding: ${pad}mm; display: flex; flex-direction: column; justify-content: space-between; }
.k { position: absolute; top: ${pad}mm; right: ${pad}mm; width: 6mm; height: 6mm; }
.name { font-family: "Funnel Display", sans-serif; font-size: 12.5pt; letter-spacing: -0.02em; line-height: 1.1; padding-right: 10mm; }
.title { color: ${L.accent}; font-size: 7.6pt; font-weight: 600; margin-top: 1.2mm; }
.details { font-size: 7.4pt; line-height: 1.55; color: ${L.ink}; }
.details .site { color: ${L.muted}; }
</style></head><body>
<section class="side front"><img src="${url(`Documentation/brand/assets/logos/svg/imkan-logo-${L.logo}.svg`)}" alt="IMKAN"></section>
<section class="side back"><svg class="k" viewBox="0 0 100 100" aria-hidden="true"><path fill="${L.k}" d="${K}"/></svg>
  <div><div class="name">${esc(p.name)}</div><div class="title">${esc(p.title)}</div></div>
  <div class="details"><div>${esc(p.phone)}</div><div>${esc(p.email)}</div><div class="site">imkan.ai</div></div></section>
</body></html>`;
};

const TMP = path.join(HERE, '.build');
mkdirSync(TMP, { recursive: true });
for (const p of PEOPLE) {
  const dir = path.join(p.dir, p.slug);
  mkdirSync(dir, { recursive: true });
  for (const look of Object.keys(LOOKS)) {
    const html = path.join(TMP, `${p.slug}-${look}.html`);
    writeFileSync(html, card(look, p));
    const pdf = path.join(dir, `imkan-card-${p.slug}-${look}.pdf`);
    if (existsSync(pdf)) rmSync(pdf);
    execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=6000', `--user-data-dir=${path.join(TMP, '.browser')}`,
      `--print-to-pdf=${pdf}`, pathToFileURL(html).href], { stdio: 'ignore', timeout: 60_000 });
    if (!existsSync(pdf)) throw new Error(`no PDF for ${p.slug} ${look}`);
    console.log(path.relative(ROOT, pdf));
  }
}
rmSync(TMP, { recursive: true, force: true }); // the HTML holds this computer's file paths: never committed
