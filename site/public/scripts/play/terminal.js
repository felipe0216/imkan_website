// "A partner, not a vendor": the after-go-live checks. Press the command (or the cue) and the checks run again,
// line by line: the kit's own run, started through the kit's own controller (restart() plays a held fragment
// once). Nothing to reset, so the cue keeps inviting. Under reduced motion the finished picture stays as it is.
import { cue } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="terminal-run"]');
  if (!root) return;
  for (let el = root; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');
  const run = () => root.__ui?.restart?.();
  const cmd = root.querySelector('[data-term-cmd]')?.closest('.ui-term__cmd');
  if (cmd) {
    cmd.setAttribute('role', 'button');
    cmd.tabIndex = 0;
    cmd.setAttribute('aria-label', root.querySelector('[data-term-cmd]').textContent.trim());
    cmd.classList.add('play-hit');
    cmd.addEventListener('click', run);
    cmd.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); } });
  }
  // TODO(wording): proposed, pending Felipe
  cue(frame, { corner: true, invite: 'Try it: run the checks', onStart: run, onReset: run });
}
