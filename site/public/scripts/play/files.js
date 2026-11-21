// "6 sources joined": drop a source (press its tile) and the count falls; press it again and it is read and
// joined back ("Joining 5 of 6 sources", the page's own data-reading phrase). The tiles are a multi-select list.
import { demo, renum, reduced } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="files"]');
  if (!root) return;
  let status0 = null;
  const tiles = () => [...root.querySelectorAll('.ui-file')];
  const joined = () => tiles().filter((x) => x.classList.contains('is-done')).length;
  const say = (text) => {
    const s = root.querySelector('[data-files-status]');
    if (!s) return;
    status0 ??= s.textContent;
    s.textContent = text ?? renum(status0, joined());
  };
  demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: drop a source',
    prepare(r) {
      const list = r.querySelector('.ui-files__grid');
      const st = r.querySelector('[data-files-status]');
      if (list) {
        list.setAttribute('role', 'listbox');
        list.setAttribute('aria-multiselectable', 'true');
        if (st) { st.id ||= 'play-files-status'; list.setAttribute('aria-labelledby', st.id); }
      }
      r.querySelectorAll('.ui-file').forEach((t, i) => {
        t.setAttribute('role', 'option');
        t.setAttribute('aria-selected', String(t.classList.contains('is-done')));
        t.tabIndex = i === 0 ? 0 : -1;
        t.classList.add('play-hit');
      });
    },
    match: (t) => t.closest('.ui-file'),
    act(t) {
      if (t.classList.contains('is-reading')) return;
      if (t.classList.contains('is-done')) {
        t.classList.remove('is-done');
        t.setAttribute('aria-selected', 'false');
        say();
        return;
      }
      const reading = root.dataset.reading;
      t.classList.add('is-reading');
      if (reading) say(reading.replace('{n}', String(joined() + 1)).replace('{total}', String(tiles().length)));
      setTimeout(() => {
        t.classList.remove('is-reading');
        t.classList.add('is-done');
        t.setAttribute('aria-selected', 'true');
        say();
      }, reduced() ? 0 : 650);
    },
    // arrows move between tiles (one tab stop for the list)
    keys(e) {
      const t = e.target.closest?.('.ui-file');
      const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (!t || !(e.key in moves || e.key === 'Home' || e.key === 'End')) return false;
      e.preventDefault();
      const all = tiles(), i = all.indexOf(t);
      const to = e.key === 'Home' ? 0 : e.key === 'End' ? all.length - 1 : i + moves[e.key];
      const next = all[Math.max(0, Math.min(all.length - 1, to))];
      all.forEach((x) => { x.tabIndex = x === next ? 0 : -1; });
      next.focus();
      return true;
    },
    point: (r) => r.querySelector('.ui-file'),
  });
}
