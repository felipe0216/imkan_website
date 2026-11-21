// "Build a strategy worth executing", round 3 (Felipe, 2026-11-21: "not impressive, it needs to be cool"). The card
// promises the first move, and this shows it found:
//   - A messy pile of ten initiatives. "Find the first move" sends each one flying to its place on an impact x effort
//     chart; the low-impact ones fade out; a path draws from "Today" through the best three, and the first one is
//     named under the chart: "Your first move".
//   - The visitor can argue with the plan: drag any dot (or focus it and use the arrow keys) and the path and the
//     first move follow.
//   - At rest it plays itself (pile, then chart) so the idea reads without a touch; a press takes over, and untouched
//     for a while it plays itself again. "Back to the pile" undoes it (no reset button).
// The positions are illustrative. Without scripts the kit's checklist shows as before. Initiative names come from the
// page where it has them; new words are TODO(wording) proposals, pending Felipe.
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe. Names marked (page) are already on the page; the rest are new.
// i: impact, e: effort, both 0..1 (illustrative); x/y/r: the chip's place in the pile (%, %, degrees)
const ITEMS = [
  { n: 'Weekly pricing decisions', i: 0.9, e: 0.22, x: 30, y: 14, r: -6 },       // (page)
  { n: 'Stock reorder decisions', i: 0.8, e: 0.5, x: 69, y: 18, r: 4 },          // (page)
  { n: 'Alert when sales miss target', i: 0.62, e: 0.3, x: 33, y: 52, r: 3 },    // (page)
  { n: 'Suggest the next step', i: 0.74, e: 0.72, x: 70, y: 37, r: -3 },         // (page)
  { n: 'Success in plain numbers', i: 0.6, e: 0.34, x: 66, y: 70, r: 5 },        // (page)
  { n: 'Show the trend beside each number', i: 0.48, e: 0.26, x: 38, y: 33, r: -2 }, // (page)
  { n: 'Join the finance exports', i: 0.52, e: 0.58, x: 70, y: 87, r: -5 },
  { n: 'Email the full dashboard', i: 0.2, e: 0.3, x: 28, y: 71, r: 6 },          // (page)
  { n: 'Rebuild every report', i: 0.36, e: 0.78, x: 34, y: 88, r: 7 },
  { n: 'A new data lake first', i: 0.18, e: 0.97, x: 72, y: 54, r: -4 },
];
const T = {
  invite: 'Try it: find the first move',
  find: 'Find the first move',
  back: 'Back to the pile',
  first: 'Your first move',
  then: 'Then',
  today: 'Today',
  impact: 'Impact ↑', effort: 'Effort →',
  best: 'High impact, low effort',
  drag: 'Drag a dot to move it.',
  dot: (n, i, e) => `${n}: impact ${i}, effort ${e}. Arrow keys move it.`,
  level: (v) => (v >= 0.67 ? 'high' : v >= 0.34 ? 'medium' : 'low'),
};
const LOW = 0.4;            // below this impact an initiative fades out of the plan
const EVERY = 3000;         // the self-playing pace (Felipe: 3 s)
const IDLE = 9000;

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="checklist"]');
  if (!kit) return;
  const title = kit.querySelector('.ui-title')?.textContent.trim() || '';
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  const items = ITEMS.map((it) => ({ ...it }));
  const box = document.createElement('div');
  box.className = 'ui ui-panel play-rm';
  box.innerHTML = `
    <div class="play-rm__head"><div class="ui-title">${title}</div></div>
    <div class="play-rm__board">
      <span class="play-rm__q" aria-hidden="true">${T.best}</span>
      <span class="play-rm__low" aria-hidden="true"></span>
      <span class="play-rm__ax play-rm__ax--y" aria-hidden="true">${T.impact}</span>
      <span class="play-rm__ax play-rm__ax--x" aria-hidden="true">${T.effort}</span>
      <svg class="play-rm__path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline class="play-rm__then-line" points=""/><polyline class="play-rm__first-line" points=""/></svg>
      <span class="play-rm__today" aria-hidden="true">${T.today}</span>
      ${items.map((it, k) => `<button type="button" class="play-rm__chip" data-k="${k}" style="--x:${it.x}%;--y:${it.y}%;--r:${it.r}deg"><span class="play-rm__badge" aria-hidden="true"></span><span class="play-rm__name">${it.n}</span></button>`).join('')}
    </div>
    <div class="play-rm__foot">
      <p class="play-rm__out" aria-live="polite"></p>
      <button type="button" class="play-rm__go"></button>
    </div>`;
  kit.replaceWith(box);
  const board = box.querySelector('.play-rm__board');
  const chips = [...box.querySelectorAll('.play-rm__chip')];
  const poly = box.querySelector('.play-rm__first-line');
  const thenLine = box.querySelector('.play-rm__then-line');
  const out = box.querySelector('.play-rm__out');
  const go = box.querySelector('.play-rm__go');

  let plotted = false;
  const narrow = () => board.getBoundingClientRect().width < 420;
  // where a dot sits on the chart, in % of the board: effort across (left = low), impact up (top = high)
  const px = (it) => 6 + it.e * 88, py = (it) => 8 + (1 - it.i) * 80;
  const plan = () => items.map((it, k) => ({ it, k })).filter(({ it }) => it.i >= LOW)
    .sort((a, b) => (b.it.i - b.it.e * 0.75) - (a.it.i - a.it.e * 0.75)).slice(0, 3);

  const paint = (draw = false) => {
    box.classList.toggle('is-plotted', plotted);
    const best = plotted ? plan() : [];
    chips.forEach((c, k) => {
      const it = items[k];
      if (plotted) {
        c.style.setProperty('--x', `${px(it)}%`);
        c.style.setProperty('--y', `${py(it)}%`);
        c.style.setProperty('--r', '0deg');
      } else if (narrow()) {
        // a phone's board is too narrow for two chips side by side: one per row, swaying left and right
        c.style.setProperty('--x', `${50 + (k % 2 ? 9 : -9)}%`);
        c.style.setProperty('--y', `${6 + k * 9.8}%`);
      } else {
        c.style.setProperty('--x', `${it.x}%`);
        c.style.setProperty('--y', `${it.y}%`);
        c.style.setProperty('--r', `${it.r}deg`);
      }
      const rank = best.findIndex((b) => b.k === k);
      c.classList.toggle('is-low', plotted && it.i < LOW);
      c.classList.toggle('is-pick', rank >= 0);
      c.classList.toggle('is-first', rank === 0);
      c.querySelector('.play-rm__badge').textContent = rank >= 0 ? String(rank + 1) : '';
      c.setAttribute('aria-label', plotted ? T.dot(it.n, T.level(it.i), T.level(it.e)) : it.n);
      c.tabIndex = plotted ? 0 : -1;
    });
    // the route: from "Today" (bottom left) straight to the first move, then, dashed, on to the next two
    const pts = best.map(({ it }) => `${px(it)},${py(it)}`);
    poly.setAttribute('points', plotted && pts.length ? `3,96 ${pts[0]}` : '');
    thenLine.setAttribute('points', plotted ? pts.join(' ') : '');
    if (plotted && draw && !reduced()) {
      poly.style.transition = 'none';
      poly.style.strokeDashoffset = '400';
      void poly.getBoundingClientRect();
      poly.style.transition = 'stroke-dashoffset 1100ms cubic-bezier(0.33, 1, 0.68, 1) 650ms';
      poly.style.strokeDashoffset = '0';
    } else { poly.style.transition = 'none'; poly.style.strokeDashoffset = '0'; }
    out.innerHTML = plotted && best.length
      ? `<span class="play-rm__label">${T.first}</span><b>${best[0].it.n}</b>${best.length > 1 ? `<span class="play-rm__then">${T.then}: ${best.slice(1).map((b) => b.it.n).join(', ')}</span>` : ''}`
      : '';
    go.innerHTML = plotted
      ? `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8a4.5 4.5 0 1 0 1.4-3.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 2.5v3h3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${T.back}</span>`
      : `<span>${T.find}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    go.classList.toggle('is-back', plotted);
  };
  const toggle = () => { plotted = !plotted; paint(true); };

  // the visitor's turn: the button, dragging a dot, the arrow keys on a dot
  let touched = -Infinity, played = false;
  const mine = () => { touched = performance.now(); if (!played) { played = true; pill.played(); } };
  go.addEventListener('click', () => { mine(); toggle(); });

  let drag = null;
  const setFrom = (k, x, y) => {
    const r = board.getBoundingClientRect();
    const fx = Math.min(1, Math.max(0, ((x - r.left) / r.width * 100 - 6) / 88));
    const fy = Math.min(1, Math.max(0, 1 - ((y - r.top) / r.height * 100 - 8) / 80));
    items[k].e = fx; items[k].i = fy;
    paint();
  };
  board.addEventListener('pointerdown', (e) => {
    const c = e.target.closest('.play-rm__chip');
    if (!c || !plotted || e.button !== 0) return;
    mine();
    drag = { k: +c.dataset.k, id: e.pointerId };
    c.setPointerCapture?.(e.pointerId);
    c.classList.add('is-dragging');
    e.preventDefault();
  });
  board.addEventListener('pointermove', (e) => { if (drag && e.pointerId === drag.id) { touched = performance.now(); setFrom(drag.k, e.clientX, e.clientY); } });
  const end = () => { if (!drag) return; chips[drag.k].classList.remove('is-dragging'); drag = null; };
  board.addEventListener('pointerup', end);
  board.addEventListener('pointercancel', end);
  board.addEventListener('keydown', (e) => {
    const c = e.target.closest('.play-rm__chip');
    const d = { ArrowUp: [0, 0.08], ArrowDown: [0, -0.08], ArrowLeft: [-0.08, 0], ArrowRight: [0.08, 0] }[e.key];
    if (!c || !d || !plotted) return;
    e.preventDefault();
    mine();
    const it = items[+c.dataset.k];
    it.e = Math.min(1, Math.max(0, it.e + d[0]));
    it.i = Math.min(1, Math.max(0, it.i + d[1]));
    paint();
  });

  // at rest: pile, then chart, every few seconds, while it is on screen and untouched
  let visible = false, beat = 0;
  setInterval(() => {
    if (!visible || document.hidden || reduced() || performance.now() - touched < IDLE) return;
    beat++;
    // the pile holds one beat, the chart two (it has more to read)
    if (!plotted || beat % 2 === 0) { if (plotted) items.forEach((it, k) => { it.i = ITEMS[k].i; it.e = ITEMS[k].e; }); toggle(); beat = 0; }
  }, EVERY);
  new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0.5 }).observe(box);
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { go.focus({ preventScroll: true }); if (!plotted) go.click(); else mine(); } });
  if (reduced()) box.classList.add('is-still');
  paint();
  // the pile's layout depends on the board's width (one chip per row on a phone): laid out again when it changes
  let wide = null;
  new ResizeObserver(() => { const n = narrow(); if (n !== wide) { wide = n; if (!plotted) paint(); } }).observe(board);
}
