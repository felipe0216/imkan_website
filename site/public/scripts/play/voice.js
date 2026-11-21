// The voice agent (Why us): tap the orb or the caption and the agent says its line again, word by word, the call's
// clock moving on: the kit's own cycle, started through the kit's own controller (restart() plays a held fragment
// once). The call buttons stay pictures: muting or ending the call would need words and states the page does not
// have. Nothing to reset, so the cue keeps inviting. Under reduced motion the finished picture stays.
import { cue } from './lib.js';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="voice"]');
  if (!root) return;
  for (let el = root; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');
  const speak = () => root.__ui?.restart?.();
  const orb = root.querySelector('[data-voice-orb]');
  const cap = root.querySelector('[data-voice-cap]');
  if (orb) {
    orb.setAttribute('role', 'button');
    orb.tabIndex = 0;
    orb.setAttribute('aria-label', root.querySelector('.ui-voice__name')?.textContent.trim() || 'Voice agent');
    orb.classList.add('play-hit');
    orb.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); speak(); } });
  }
  [orb, cap].forEach((el) => el?.addEventListener('click', speak));
  cap?.classList.add('play-hit');
  cap?.setAttribute('aria-live', 'polite');
  // TODO(wording): proposed, pending Felipe
  cue(frame, { corner: true, invite: 'Try it: hear the agent', onStart: speak, onReset: speak });
}
