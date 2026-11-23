// Renders the past roles on /careers/ from content/roles.json (data first: edit the JSON, then run this).
// usage (from site/): node scripts/build-roles.mjs
// Writes the block between <!-- roles:start --> and <!-- roles:end --> in careers/index.html. No dependencies.
import { readFileSync, writeFileSync } from 'node:fs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

const roles = JSON.parse(readFileSync('content/roles.json', 'utf8'));
for (const r of roles) {
  for (const k of ['id', 'title', 'department', 'location', 'type', 'level', 'description']) if (!r[k]) throw new Error(`role ${r.id || '?'}: missing ${k}`);
  if (!/^[a-z0-9-]+$/.test(r.id)) throw new Error(`role ${r.id}: id must be kebab-case`);
}

const html = roles.map((r) => `        <details class="role" id="role-${r.id}">
          <summary>
            <span class="role__chips"><span class="chip">${esc(r.department)}</span><span class="chip chip--closed">Closed</span></span>
            <span class="role__title">${esc(r.title)}</span>
            <span class="role__meta">${esc(r.location)}</span>
            <span class="role__more" aria-hidden="true">View details</span>
          </summary>
          <div class="role__body">
            <p class="role__meta">${esc(r.level)} · ${esc(r.type)} · ${esc(r.location)}</p>
            <p>${esc(r.description)}</p>
            <h3>What you'll do</h3>${list(r.do)}
            <h3>What we're looking for</h3>${list(r.want)}
            ${r.nice?.length ? `<h3>Nice to have</h3>${list(r.nice)}` : ''}
            <p class="role__tags">${r.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</p>
            <p class="role__closed">Applications for this role are closed</p>
          </div>
        </details>`).join('\n');

const file = 'careers/index.html';
const page = readFileSync(file, 'utf8');
const start = page.indexOf('<!-- roles:start'), end = page.indexOf('<!-- roles:end -->');
if (start < 0 || end < 0) throw new Error('roles markers not found in ' + file);
const startLineEnd = page.indexOf('\n', start) + 1;
writeFileSync(file, page.slice(0, startLineEnd) + html + '\n' + page.slice(end));
console.log(`${roles.length} roles written to ${file}`);
