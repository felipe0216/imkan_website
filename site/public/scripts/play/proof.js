// "Prove Before You Pay" (Why us), round 2 (Felipe, 2026-11-21: the checklist was "simplistic, nothing impressive").
// The promise as something you can scrub through: a week slider from 1 to 8, and as it moves a small product builds
// itself (a sketch, then a working screen, then its results), the page's four commitments tick off as the weeks pass
// them, and "Cost to you" stays at 0 the whole way ("completely free", the page's own words).
//   - At rest the weeks play themselves; dragging the slider (or the arrow keys on it) takes over, and untouched for
//     a while it plays again. Nothing to reset.
// Illustrative: no figures. Without scripts the kit's checklist shows as before. The commitments and the title are
// the page's; other words are TODO(wording) proposals, pending Felipe.
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe
const T = {
  invite: 'Try it: drag through the weeks',
  week: (w) => `Week ${w}`,
  of: (w) => `Week ${w} of 8`,
  slider: 'Week of the proof of value',
  cost: 'Cost to you',
  phase: ['Your use case, sketched', 'Built on your data', 'Results measured', 'Your call'],
  decide: 'Commit only if the results are there.',
  before: 'Before', after: 'After',
};
// the week each of the page's four commitments is met
const TICK = [1, 5, 8, 8];
const phaseOf = (w) => (w <= 2 ? 0 : w <= 5 ? 1 : w <= 7 ? 2 : 3);
const EVERY = 2000;     // a week every 2 s at rest (16 s for the 8 weeks)
const IDLE = 9000;

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="checklist"]');
  if (!kit) return;
  const title = kit.querySelector('.ui-title')?.textContent.trim() || '';
  const labels = [...kit.querySelectorAll('.ui-check__label')].map((l) => l.textContent.trim());
  if (labels.length !== 4) return;
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  const check = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const box = document.createElement('div');
  box.className = 'ui ui-panel play-pf';
  box.innerHTML = `
    <div class="play-pf__head"><div class="ui-title">${title}</div><span class="ui-spacer"></span><div class="ui-meta" data-pf-week></div></div>
    <div class="play-pf__stage">
      <div class="play-pf__app" aria-hidden="true">
        <div class="play-pf__bar" data-s="1" data-b="3"><i></i><i></i><i></i></div>
        <div class="play-pf__tiles"><span class="play-pf__tile" data-s="1" data-b="4"><i></i></span><span class="play-pf__tile" data-s="2" data-b="4"><i></i></span></div>
        <div class="play-pf__chart" data-s="2" data-b="5" data-live="6">
          <svg viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M4 52 C 40 50, 60 40, 90 36 S 150 18, 196 8"/></svg>
          <div class="play-pf__ba" data-live="7"><span class="play-pf__b"><i></i>${T.before}</span><span class="play-pf__b play-pf__b--after"><i></i>${T.after}</span></div>
        </div>
        <div class="play-pf__stamp" data-live="8">${T.phase[2]}</div>
      </div>
      <div class="play-pf__side">
        <p class="play-pf__phase" aria-live="polite"></p>
        <ul class="play-pf__list">${labels.map((l, i) => `<li data-i="${i}"><span class="play-pf__box">${check}</span>${l}</li>`).join('')}</ul>
        <p class="play-pf__cost"><span>${T.cost}</span><b>0</b></p>
      </div>
    </div>
    <div class="play-pf__slide">
      <input type="range" min="1" max="8" step="1" value="1" aria-label="${T.slider}">
      <div class="play-pf__weeks" aria-hidden="true">${Array.from({ length: 8 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
    </div>`;
  kit.replaceWith(box);
  const range = box.querySelector('input');
  const meta = box.querySelector('[data-pf-week]');
  const phase = box.querySelector('.play-pf__phase');
  const items = [...box.querySelectorAll('.play-pf__list li')];

  const show = (w) => {
    range.value = String(w);
    range.setAttribute('aria-valuetext', T.of(w));
    range.style.setProperty('--k', String((w - 1) / 7));
    box.dataset.week = String(w);
    box.dataset.phase = String(phaseOf(w));
    meta.textContent = T.of(w);
    phase.innerHTML = w === 8 ? `<b>${T.phase[3]}</b> ${T.decide}` : `<b>${T.phase[phaseOf(w)]}</b>`;
    items.forEach((li, i) => li.classList.toggle('is-done', w >= TICK[i]));
    // the product builds itself: a sketch first (dashed), then built (solid), then live (its results)
    box.querySelectorAll('[data-s]').forEach((el) => { el.classList.toggle('is-sketch', w >= +el.dataset.s); el.classList.toggle('is-built', w >= +el.dataset.b); });
    box.querySelectorAll('[data-live]').forEach((el) => el.classList.toggle('is-live', w >= +el.dataset.live));
  };

  let touched = -Infinity, visible = false, played = false;
  const mine = () => { touched = performance.now(); if (!played) { played = true; pill.played(); } };
  range.addEventListener('input', () => { mine(); show(+range.value); });
  setInterval(() => {
    if (!visible || document.hidden || reduced() || performance.now() - touched < IDLE) return;
    show(+range.value >= 8 ? 1 : +range.value + 1);
  }, EVERY);
  new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0.5 }).observe(box);
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { range.focus({ preventScroll: true }); mine(); show(Math.min(8, +range.value + 1)); } });
  // with reduced motion nothing plays itself: the finished picture (week 8) is what shows
  show(reduced() ? 8 : 1);
}
