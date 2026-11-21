// Careers, "Working at Imkan.ai": the three past roles in the mock-up open the same role in the Past roles list
// below (its details open, the page scrolls to it). Real navigation, not a toy: the cue keeps inviting.
import { cue, own, reduced } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="notify"]');
  if (!root) return;
  own(root);              // a still list of links (the kit's hover cycle would rewrite it)
  for (let el = root; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');
  const details = [...document.querySelectorAll('details.role')];
  const find = (title) => details.find((d) => d.querySelector('.role__title')?.textContent.trim() === title);
  const open = (d) => {
    d.open = true;
    d.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    d.querySelector('summary')?.focus({ preventScroll: true });
  };
  const links = [];
  root.querySelectorAll('.ui-note').forEach((li) => {
    const title = li.querySelector('.ui-note__title')?.firstChild?.textContent.trim() || '';
    const d = find(title);
    const text = li.querySelector('.ui-note__text');
    if (!d || !text) return;
    text.setAttribute('role', 'link');
    text.tabIndex = 0;
    text.setAttribute('aria-label', title);
    li.classList.add('play-hit');
    li.addEventListener('click', () => open(d));
    text.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); open(d); } });
    links.push(text);
  });
  if (!links.length) return;
  // TODO(wording): proposed, pending Felipe
  cue(frame, {
    corner: true,
    invite: 'Try it: open a role',
    onStart: () => { links[0].focus({ preventScroll: true }); links[0].closest('li').classList.add('is-pointed'); },
    onReset: () => {},
  });
  root.addEventListener('click', () => root.querySelectorAll('.is-pointed').forEach((x) => x.classList.remove('is-pointed')));
}
