// A checklist (the data strategy roadmap, the proof-of-value plan, the open application): tick and untick each
// step; the bar and the "2 of 4" count follow. Words: the page's own (only the count's number changes).
import { demo, renum, idFor } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="checklist"]');
  if (!root) return;
  let count0 = null;
  const tally = (r) => {
    const items = [...r.querySelectorAll('.ui-check')];
    const done = items.filter((i) => i.classList.contains('is-done')).length;
    r.querySelector('[data-checks-bar]')?.style.setProperty('--k', String(done / items.length));
    const c = r.querySelector('[data-checks-count]');
    if (c) { count0 ??= c.textContent; c.textContent = renum(count0, done); }
  };
  demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: tick a step',
    prepare(r) {
      r.querySelectorAll('.ui-check').forEach((li) => {
        const box = li.querySelector('.ui-check__box');
        const label = li.querySelector('.ui-check__label, .ui-check__text');
        li.classList.add('play-hit');
        if (!box) return;
        box.setAttribute('role', 'checkbox');
        box.tabIndex = 0;
        box.setAttribute('aria-checked', String(li.classList.contains('is-done')));
        if (label) box.setAttribute('aria-labelledby', idFor(label));
      });
    },
    match: (t) => t.closest('.ui-check'),
    act(li) {
      const on = !li.classList.contains('is-done');
      li.classList.toggle('is-done', on);
      li.querySelector('.ui-check__box')?.setAttribute('aria-checked', String(on));
      tally(root);
    },
    point: (r) => r.querySelector('.ui-check:not(.is-done) .ui-check__box') || r.querySelector('.ui-check__box'),
  });
}
