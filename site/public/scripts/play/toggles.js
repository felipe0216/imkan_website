// The weekly sales review's switches: they really switch, and "3 of 4 on" follows. The switches are the kit's
// own buttons (role="switch", named); they only get a tab stop.
// The kit's own loop flips the switches by itself (and replays on hover), which read as the switches misbehaving
// (Felipe, 2026-11-21): it is stopped at load, so a switch changes only when the visitor presses it.
import { demo, renum, own } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="toggles"]');
  if (!root) return;
  own(root);
  let count0 = null;
  demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: flip a switch',
    prepare(r) {
      r.querySelectorAll('.ui-tg').forEach((li) => li.classList.add('play-hit'));
      r.querySelectorAll('.ui-switch').forEach((b) => { b.tabIndex = 0; });
    },
    match: (t) => t.closest('.ui-tg'),
    act(li) {
      const sw = li.querySelector('.ui-switch');
      const on = !sw.classList.contains('is-on');
      sw.classList.toggle('is-on', on);
      sw.setAttribute('aria-checked', String(on));
      const c = root.querySelector('[data-tg-count]');
      if (c) { count0 ??= c.textContent; c.textContent = renum(count0, root.querySelectorAll('.ui-switch.is-on').length); }
    },
    point: (r) => r.querySelector('.ui-switch:not(.is-on)') || r.querySelector('.ui-switch'),
  });
}
