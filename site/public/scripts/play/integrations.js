// "Your existing stack": connect a tool (Connect, a short spinner, Connected) or press Connected to disconnect it;
// "3 connected" follows. Words: Connect and Connected, both already in the markup.
import { demo, renum, reduced } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="integrations"]');
  if (!root) return;
  let count0 = null;
  const name = (row) => row.querySelector('.ui-app__name')?.textContent.trim() || '';
  const tally = () => {
    const c = root.querySelector('[data-apps-count]');
    if (c) { count0 ??= c.textContent; c.textContent = renum(count0, root.querySelectorAll('.ui-app.is-on').length); }
  };
  // the control that shows for the row's state gets the tab stop; the hidden one gets none
  const stops = (row) => {
    const on = row.classList.contains('is-on');
    const btn = row.querySelector('.ui-app__connect'), chip = row.querySelector('.ui-app__on');
    // the hidden one is out of the way for the pointer and for assistive technology too (the kit marked the
    // Connect buttons aria-hidden while they were hidden in its picture: that is ours to keep right now)
    if (btn) { btn.tabIndex = on ? -1 : 0; btn.toggleAttribute('aria-hidden', on); if (on) btn.setAttribute('aria-hidden', 'true'); delete btn.dataset.uiAh; }
    if (chip) { chip.tabIndex = on ? 0 : -1; chip.toggleAttribute('aria-hidden', !on); if (!on) chip.setAttribute('aria-hidden', 'true'); delete chip.dataset.uiAh; }
    return on ? chip : btn;
  };
  demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: connect a tool',
    prepare(r) {
      r.querySelectorAll('.ui-app').forEach((row) => {
        row.classList.add('play-hit');
        const btn = row.querySelector('.ui-app__connect'), chip = row.querySelector('.ui-app__on');
        btn?.setAttribute('aria-label', `${name(row)}: Connect`);
        if (chip) { chip.setAttribute('role', 'button'); chip.setAttribute('aria-label', `${name(row)}: Connected`); }
        stops(row);
      });
    },
    match: (t) => t.closest('.ui-app'),
    act(row) {
      if (row.classList.contains('is-busy')) return;
      if (row.classList.contains('is-on')) {
        row.classList.remove('is-on');
        tally();
        stops(row)?.focus({ preventScroll: true });
        return;
      }
      row.classList.add('is-busy');
      setTimeout(() => {
        row.classList.remove('is-busy');
        row.classList.add('is-on');
        tally();
        const had = row.contains(document.activeElement);
        const to = stops(row);
        if (had) to?.focus({ preventScroll: true });
      }, reduced() ? 0 : 700);
    },
    point: (r) => r.querySelector('.ui-app:not(.is-on) .ui-app__connect'),
  });
}
