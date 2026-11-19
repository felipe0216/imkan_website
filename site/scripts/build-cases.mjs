// Writes the case study pages work/<slug>/index.html from content/cases.json and templates/case.html (D-027).
// usage (from site/): node scripts/build-cases.mjs [slug ...]     no slug: every case
// Data first: change the words in content/cases.json (the old site's text, word for word), then run this.
// No dependencies. Every value is HTML-escaped; the template's {{name}} slots must all be filled.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cases = JSON.parse(readFileSync('content/cases.json', 'utf8'));
const template = readFileSync('templates/case.html', 'utf8');
const only = process.argv.slice(2);

const REQUIRED = ['slug', 'title', 'category', 'stat', 'statLabel', 'summary', 'overview', 'challenge', 'solution', 'tech', 'techDetailed', 'results'];
for (const c of cases) {
  for (const k of REQUIRED) if (!c[k] || (Array.isArray(c[k]) && !c[k].length)) throw new Error(`case ${c.slug || '?'}: missing ${k}`);
  if (!/^[a-z0-9-]+$/.test(c.slug)) throw new Error(`case ${c.slug}: slug must be kebab-case`);
}
for (const s of only) if (!cases.some((c) => c.slug === s)) throw new Error(`no case with slug ${s}`);

let written = 0;
cases.forEach((c, i) => {
  if (only.length && !only.includes(c.slug)) return;
  const next = cases[(i + 1) % cases.length];
  const values = {
    index: i + 1, count: cases.length,
    slug: c.slug, title: c.title, category: c.category, stat: c.stat, statLabel: c.statLabel,
    summary: c.summary.replace(/\.$/, ''), overview: c.overview, challenge: c.challenge, solution: c.solution,
    techDetailed: c.techDetailed,
    statSize: c.stat.length > 6 ? 'case__big--long' : '',
    alt: `A line drawing for ${c.title}`,
    nextSlug: next.slug, nextTitle: next.title, nextCategory: next.category, nextStat: next.stat, nextStatLabel: next.statLabel,
  };
  const raw = {
    techChips: c.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join(''),
    results: c.results.map((r) => `<li class="span-6">${esc(r)}</li>`).join(''),
  };
  const html = template.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (k in raw) return raw[k];
    if (!(k in values)) throw new Error(`template slot {{${k}}} has no value`);
    return esc(values[k]);
  });
  mkdirSync(`work/${c.slug}`, { recursive: true });
  writeFileSync(`work/${c.slug}/index.html`, html);
  written++;
});
console.log(`${written} case page(s) written to work/`);

// the work index: every case as a tile on the dark band, in the data's order
if (!only.length) {
  const tile = (c) => `
          <a class="tile tile--case span-4" href="/work/${c.slug}/">
            <span class="tile__media"><img src="/images/work/${c.slug}-band.svg" alt="" width="480" height="320" loading="lazy"></span>
            <span class="t-label muted">${esc(c.category)}</span>
            <span class="t-card">${esc(c.title)}</span>
            <span class="t-small">${esc(c.stat)} ${esc(c.statLabel)}</span>
          </a>`;
  const half = Math.ceil(cases.length / 2);
  const idx = readFileSync('templates/work-index.html', 'utf8')
    .replace('{{count}}', String(cases.length))
    .replace('{{industries}}', String(new Set(cases.map((c) => c.category)).size))
    .replace('{{tilesA}}', cases.slice(0, half).map(tile).join('') + '\n        ')
    .replace('{{tilesB}}', cases.slice(half).map(tile).join('') + '\n        ');
  if (/\{\{\w+\}\}/.test(idx)) throw new Error('work index: an unfilled {{slot}}');
  writeFileSync('work/index.html', idx);
  console.log('work/index.html written');
}
