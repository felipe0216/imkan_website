// The "Think" card's search: the query becomes a real text box. Typing filters the rows (the rows that do not
// match step back; none disappear, so no new words are needed), the matched words are bold, and the arrow keys
// move the selection. Words: the page's own rows and query.
import { demo } from './lib.js';

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export default function init(frame) {
  const root = frame.querySelector('[data-ui="search"]');
  if (!root) return;
  let api = null;

  const rows = () => [...root.querySelectorAll('.ui-search__row')];
  const words = (v) => v.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
  const filter = (input) => {
    const ws = words(input.value);
    let firstHit = null;
    for (const r of rows()) {
      const t = r.querySelector('.ui-search__t');
      const text = t.dataset.text ?? (t.dataset.text = t.textContent);
      const hit = !ws.length || ws.some((w) => text.toLowerCase().includes(w));
      r.classList.toggle('is-stale', !hit);
      r.setAttribute('aria-disabled', String(!hit));
      // bold the matched words, as the kit's rows do
      let html = esc(text);
      for (const w of ws) html = html.replace(new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'), '<b>$1</b>');
      t.innerHTML = html;
      if (hit && !firstHit) firstHit = r;
    }
    select(input, firstHit);
  };
  const select = (input, r) => {
    rows().forEach((x) => { x.classList.toggle('is-sel', x === r); x.setAttribute('aria-selected', String(x === r)); });
    if (r) input.setAttribute('aria-activedescendant', r.id); else input.removeAttribute('aria-activedescendant');
  };

  // typing and arrows, listened for at the root so they survive "Reset demo" (which restores the markup)
  root.addEventListener('input', (e) => {
    if (!e.target.matches('.play-search__input')) return;
    api?.take();
    filter(e.target);
  });
  root.addEventListener('keydown', (e) => {
    const input = e.target.closest?.('.play-search__input');
    if (!input || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    e.preventDefault();
    api?.take();
    const live = rows().filter((x) => !x.classList.contains('is-stale'));
    if (!live.length) return;
    const at = live.findIndex((x) => x.classList.contains('is-sel'));
    select(input, live[(at + (e.key === 'ArrowDown' ? 1 : live.length - 1)) % live.length]);
  });

  api = demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: type a search',
    prepare(r) {
      const list = r.querySelector('[data-search-list]');
      const group = r.querySelector('.ui-search__group');
      const q = r.querySelector('[data-search-q]');
      if (!list) return;
      list.setAttribute('role', 'listbox');
      list.id ||= 'play-search-list';
      if (group) { group.id ||= 'play-search-group'; list.setAttribute('aria-labelledby', group.id); }
      list.querySelectorAll('.ui-search__row').forEach((row, i) => {
        row.setAttribute('role', 'option');
        row.id ||= `play-search-${i}`;
        row.setAttribute('aria-selected', String(row.classList.contains('is-sel')));
        row.classList.add('play-hit');
      });
      // the query as a real text box, in the same place and type (once: prepare runs again after the takeover)
      if (!q || r.querySelector('.play-search__input')) return;
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'play-search__input';
      input.value = q.textContent;
      input.setAttribute('value', q.textContent);   // kept by the snapshot "Reset demo" restores
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-expanded', 'true');
      input.setAttribute('aria-controls', list.id);
      input.setAttribute('aria-autocomplete', 'list');
      if (group) input.setAttribute('aria-labelledby', group.id);
      input.autocomplete = 'off';
      input.spellcheck = false;
      q.closest('.ui-search__q')?.classList.add('play-search__q');
      q.replaceWith(input);
    },
    match: (t) => t.closest('.ui-search__row'),
    act(row) {
      const input = root.querySelector('.play-search__input');
      if (input && !row.classList.contains('is-stale')) select(input, row);
    },
    point(r) {
      const input = r.querySelector('.play-search__input');
      input?.select();
      return input;
    },
  });
}
