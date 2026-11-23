// "Start with the right problem" (Think), round 2 (Felipe, 2026-11-21: the search "could be cooler, more
// straightforward ... not clear right away what it tries to transmit"). One idea, one button: a request comes in
// ("We need a dashboard"), and each press of "Ask why" zooms through it to the layer beneath, until the real
// problem shows: the decision to improve, the page's own "Weekly pricing decisions".
//   - At rest it plays itself, one layer every 3 s, so the idea reads without a touch; the visitor's first press
//     takes over, and after a while untouched it plays itself again (no reset button).
//   - The deck shows how deep it goes: the layers still to come peek out behind the card.
// Without scripts the kit's search shows as before. New words are TODO(wording) proposals, pending Felipe.
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe. Layer 4 is the page's own row ("Weekly pricing decisions").
const LAYERS = [
  { tag: 'The request', text: 'We need a dashboard.' },
  { tag: 'Why?', text: 'Sales keep missing target, and nobody sees it in time.' },
  { tag: 'Why?', text: 'Prices are set once a month, out of habit.' },
  { tag: 'The decision to improve', text: null },
];
const T = {
  invite: 'Try it: ask why',
  ask: 'Ask why',
  again: 'Ask again',
  head: 'Discovery',
  of: (i, n) => `${i} of ${n}`,
};
const EVERY = 3000;     // the self-playing pace (Felipe: 3 s an item)
const IDLE = 9000;      // untouched this long after the visitor played, it plays itself again

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="search"]');
  if (!kit) return;
  // the real problem, in the page's own words: the search's first row
  LAYERS[3].text = kit.querySelector('.ui-search__row .ui-search__t')?.textContent.trim() || 'Weekly pricing decisions';
  const group = kit.querySelector('.ui-search__group')?.textContent.trim() || T.head;
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  const box = document.createElement('div');
  box.className = 'ui ui-panel play-why';
  box.innerHTML = `
    <div class="play-why__head"><div class="ui-title">${group}</div><span class="ui-spacer"></span><div class="ui-meta" data-why-count></div></div>
    <div class="play-why__deck" aria-live="polite">${LAYERS.map((l, i) => `
      <div class="play-why__card${i === 3 ? ' play-why__card--end' : ''}" data-i="${i}">
        <span class="play-why__tag">${i === 3 ? '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>' : ''}${l.tag}</span>
        <span class="play-why__text">${l.text}</span>
      </div>`).join('')}
    </div>
    <div class="play-why__foot">
      <ol class="play-why__dots" aria-hidden="true">${LAYERS.map(() => '<li></li>').join('')}</ol>
      <button type="button" class="play-why__btn"></button>
    </div>`;
  kit.replaceWith(box);
  const cards = [...box.querySelectorAll('.play-why__card')];
  const dots = [...box.querySelectorAll('.play-why__dots li')];
  const btn = box.querySelector('.play-why__btn');
  const count = box.querySelector('[data-why-count]');

  let at = 0;
  const paint = () => {
    cards.forEach((c, i) => {
      // past layers zoom out through the viewer; the next ones wait behind, smaller, peeking out
      c.dataset.pos = i < at ? 'past' : i === at ? 'now' : String(Math.min(i - at, 3));
      c.setAttribute('aria-hidden', String(i !== at));
    });
    dots.forEach((d, i) => { d.classList.toggle('is-on', i <= at); });
    count.textContent = T.of(at + 1, LAYERS.length);
    const last = at === LAYERS.length - 1;
    btn.innerHTML = `${last ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8a4.5 4.5 0 1 0 1.4-3.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 2.5v3h3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}<span>${last ? T.again : T.ask}</span>${last ? '' : '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'}`;
    btn.classList.toggle('is-again', last);
    box.classList.toggle('is-found', last);
  };
  const next = () => { at = at === LAYERS.length - 1 ? 0 : at + 1; paint(); };

  // at rest it plays itself; a press takes over until the visitor has left it alone for a while
  let touched = -Infinity, visible = false, played = false;
  setInterval(() => {
    if (!visible || document.hidden || reduced() || performance.now() - touched < IDLE) return;
    next();
  }, EVERY);
  new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0.5 }).observe(box);
  btn.addEventListener('click', () => {
    touched = performance.now();
    if (!played) { played = true; pill.played(); }
    next();
  });
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { btn.focus({ preventScroll: true }); btn.click(); } });
  if (reduced()) box.classList.add('is-still');
  paint();
}
