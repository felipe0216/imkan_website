// Writes privacy/index.html and terms/index.html from content/<slug>.md and templates/legal.html (D-027).
// usage (from site/): node scripts/build-legal.mjs
// The Markdown is a small fixed subset, written by hand from the old site's text:
//   # Title (first line), "Last updated: ..." (first paragraph), ### section, #### subsection, "- " list items,
//   **bold**, *italic*, <email@host> links, ":::callout" (the rest of that section in a highlighted box).
// Anything else is a paragraph. Every text run is HTML-escaped before the few inline marks are applied.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const PAGES = [
  { slug: 'privacy', description: 'How Imkan.ai collects, uses, protects and deletes personal data, in line with the Saudi Personal Data Protection Law (PDPL).' },
  { slug: 'terms', description: 'The terms that govern your use of the Imkan.ai website and its content.' },
];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (s) => esc(s)
  .replace(/&lt;([\w.+-]+@[\w.-]+\.[a-z]{2,})&gt;/g, '<a class="link" href="mailto:$1">$1</a>')
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>');
const idOf = (h) => 's-' + h.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const template = readFileSync('templates/legal.html', 'utf8');
for (const page of PAGES) {
  const lines = readFileSync(`content/${page.slug}.md`, 'utf8').replace(/\r/g, '').split('\n');
  const title = lines.shift().replace(/^# /, '').trim();
  if (!title) throw new Error(`${page.slug}: no title`);
  let updated = '', body = [], toc = [], list = null, inCallout = false;
  const closeList = () => { if (list) { body.push(`<ul>${list.join('')}</ul>`); list = null; } };
  const closeCallout = () => { if (inCallout) { closeList(); body.push('</div>'); inCallout = false; } };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { closeList(); continue; }
    if (!updated && /^Last updated:/.test(l)) { updated = l; continue; }
    if (l.startsWith('### ')) {
      closeCallout(); closeList();
      const h = l.slice(4); const id = idOf(h);
      toc.push(`<li><a href="#${id}">${esc(h.replace(/^\d+\.\s*/, ''))}</a></li>`);
      body.push(`<h2 id="${id}">${inline(h)}</h2>`); continue;
    }
    if (l.startsWith('#### ')) { closeList(); body.push(`<h3>${inline(l.slice(5))}</h3>`); continue; }
    if (l === ':::callout') { closeList(); body.push('<div class="legal__callout">'); inCallout = true; continue; }
    if (l.startsWith('- ')) { (list ||= []).push(`<li>${inline(l.slice(2))}</li>`); continue; }
    closeList(); body.push(`<p>${inline(l)}</p>`);
  }
  closeCallout(); closeList();
  if (!updated) throw new Error(`${page.slug}: no "Last updated" line`);
  const html = template
    .replace(/\{\{slug\}\}/g, page.slug)
    .replace(/\{\{title\}\}/g, esc(title))
    .replace(/\{\{description\}\}/g, esc(page.description))
    .replace('{{updated}}', esc(updated))
    .replace('{{toc}}', toc.join(''))
    .replace('{{body}}', body.map((b) => '        ' + b).join('\n'));
  if (/\{\{\w+\}\}/.test(html)) throw new Error(`${page.slug}: an unfilled {{slot}}`);
  mkdirSync(page.slug, { recursive: true });
  writeFileSync(`${page.slug}/index.html`, html);
  console.log(`${page.slug}/index.html: ${toc.length} sections`);
}
