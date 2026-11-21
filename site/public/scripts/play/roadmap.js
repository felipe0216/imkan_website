// "Build a strategy worth executing": the data strategy roadmap as a small strategy tool (Felipe, 2026-11-21: "there
// are nicer ways to show a roadmap and do that interactive"). The card promises to show "the first move":
//   - a journey of four stops on a track (the page's own four steps); pressing a stop travels the track to it and
//     says what happens there and what it produces;
//   - the fourth stop opens an impact x effort grid: the visitor places four initiatives (names already on the page)
//     by dragging them, or by pressing a card and then a square (keyboard too); the card in the high-impact,
//     low-effort square is marked "Your first move".
// Without scripts the kit's checklist shows as before. Every new word is a TODO(wording) proposal, pending Felipe.
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe (paraphrases of the card's own promise; no facts or figures)
const STOPS = [
  { short: 'Decisions', what: 'List the decisions your team makes every week, and pick the few that move revenue or cost.', get: 'A short list of priority decisions' },
  { short: 'Data', what: 'For each decision, trace the data it needs and where that data lives today.', get: 'A map from each decision to its data' },
  { short: 'Gaps', what: 'Check the quality of that data, who can reach it and which tools are missing.', get: 'A list of gaps, each with its effort' },
  { short: 'Priorities', what: 'Place each initiative by impact and effort. The top-left square is your first move.', get: '' },
];
const T = {
  invite: 'Try it: plan your roadmap',
  gets: 'You get',
  first: 'Your first move',
  impact: 'Impact', effort: 'Effort', high: 'High', low: 'Low',
  cells: ['High impact, low effort', 'High impact, high effort', 'Low impact, low effort', 'Low impact, high effort'],
  tray: 'Initiatives to place',
  place: 'Drag a card into the grid, or press a card and then a square.',
};
// initiatives: names the page already shows (the Think search and the weekly sales review)
const ITEMS = ['Weekly pricing decisions', 'Stock reorder decisions', 'Alert when sales miss target', 'Email the full dashboard'];

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="checklist"]');
  if (!kit) return;
  const title = kit.querySelector('.ui-title')?.textContent.trim() || '';
  const count0 = kit.querySelector('[data-checks-count]')?.textContent.trim() || '1 of 4';
  const labels = [...kit.querySelectorAll('.ui-check__label')].map((l) => l.textContent.trim());
  if (labels.length !== 4) return;
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  const road = document.createElement('div');
  road.className = 'ui ui-panel play-road';
  kit.replaceWith(road);

  let stop = 0, played = false;
  const placed = new Map();      // item index -> cell index (0..3) or absent (in the tray)
  let held = null;               // the item picked up by press (not drag)

  const render = () => {
    const pct = (stop / 3) * 100;
    road.innerHTML = `
      <div class="play-road__head"><div class="ui-title">${title}</div><span class="ui-spacer"></span>
        <div class="ui-meta">${count0.replace(/\d+/, String(stop + 1))}</div></div>
      <ol class="play-road__track" style="--p:${pct}%">
        ${labels.map((l, i) => `<li><button type="button" class="play-road__stop${i < stop ? ' is-done' : ''}${i === stop ? ' is-on' : ''}" data-stop="${i}"
          ${i === stop ? 'aria-current="step"' : ''} aria-label="${i + 1}. ${l}"><span class="play-road__dot">${i < stop ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : i + 1}</span>
          <span class="play-road__name">${STOPS[i].short}</span></button></li>`).join('')}
      </ol>
      <div class="play-road__body" aria-live="polite">${stop < 3 ? detail() : grid()}</div>`;
  };
  const detail = () => `
    <p class="play-road__label">${labels[stop]}</p>
    <p class="play-road__what">${STOPS[stop].what}</p>
    <p class="play-road__get"><span>${T.gets}</span>${STOPS[stop].get}</p>`;
  const card = (i) => {
    const first = placed.get(i) === 0;
    return `<button type="button" class="play-road__card${held === i ? ' is-held' : ''}${first ? ' is-first' : ''}" data-item="${i}" aria-pressed="${held === i}">
      ${first ? `<span class="play-road__badge">${T.first}</span>` : ''}${ITEMS[i]}</button>`;
  };
  const grid = () => {
    const tray = ITEMS.map((_, i) => i).filter((i) => !placed.has(i));
    return `
      <div class="play-road__grid">
        <span class="play-road__axis play-road__axis--y" aria-hidden="true">${T.impact}</span>
        <span class="play-road__axis play-road__axis--x" aria-hidden="true">${T.effort}</span>
        ${T.cells.map((c, k) => `<div class="play-road__cell${k === 0 ? ' is-best' : ''}" data-cell="${k}">
            <button type="button" class="play-road__drop" data-cell="${k}" aria-label="${c}"${held == null ? ' tabindex="-1"' : ''}></button>
            <span class="play-road__corner" aria-hidden="true">${c}</span>
            ${[...placed].filter(([, at]) => at === k).map(([i]) => card(i)).join('')}</div>`).join('')}
      </div>
      <div class="play-road__tray" role="group" aria-label="${T.tray}">${tray.map(card).join('') || ''}</div>
      ${tray.length ? `<p class="play-road__hint">${T.place}</p>` : ''}`;
  };

  const go = (i) => { stop = i; held = null; render(); road.querySelector(`[data-stop="${i}"]`)?.focus({ preventScroll: true }); };
  const play = () => { if (!played) { played = true; pill.played(); } };
  const put = (item, cell) => {
    placed.set(item, cell);
    held = null;
    render();
    road.querySelector(`[data-item="${item}"]`)?.focus({ preventScroll: true });
  };

  road.addEventListener('click', (e) => {
    const s = e.target.closest('[data-stop]');
    if (s) { play(); go(+s.dataset.stop); return; }
    const c = e.target.closest('[data-item]');
    if (c && !dragged) { play(); held = held === +c.dataset.item ? null : +c.dataset.item; render(); road.querySelector(`[data-item="${c.dataset.item}"]`)?.focus({ preventScroll: true }); return; }
    const d = e.target.closest('.play-road__cell, .play-road__drop');
    if (d && held != null) { play(); put(held, +d.dataset.cell); }
  });

  // dragging a card (a pointer), as well as press-then-square
  let drag = null, dragged = false;
  road.addEventListener('pointerdown', (e) => {
    const c = e.target.closest('[data-item]');
    if (!c || e.button !== 0) return;
    drag = { el: c, item: +c.dataset.item, x: e.clientX, y: e.clientY, moved: false };
    dragged = false;
  });
  road.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) { drag.moved = true; drag.el.setPointerCapture?.(e.pointerId); drag.el.classList.add('is-dragging'); play(); }
    drag.el.style.translate = `${dx}px ${dy}px`;
    road.querySelectorAll('.play-road__cell').forEach((cell) => cell.classList.remove('is-over'));
    drag.el.style.pointerEvents = 'none';
    document.elementFromPoint(e.clientX, e.clientY)?.closest('.play-road__cell')?.classList.add('is-over');
    drag.el.style.pointerEvents = '';
  });
  const drop = (e) => {
    if (!drag) return;
    const d = drag; drag = null;
    if (!d.moved) return;
    dragged = true;
    setTimeout(() => { dragged = false; }, 0);
    d.el.style.pointerEvents = 'none';
    const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest('.play-road__cell');
    d.el.style.pointerEvents = '';
    d.el.style.translate = '';
    if (cell) put(d.item, +cell.dataset.cell); else render();
  };
  road.addEventListener('pointerup', drop);
  road.addEventListener('pointercancel', () => { if (drag) { drag.el.style.translate = ''; drag = null; render(); } });

  const reset = () => { stop = 0; held = null; placed.clear(); played = false; pill.played(false); render(); };
  const pill = cue(frame, {
    corner: true,
    invite: T.invite,
    onStart: () => { const next = road.querySelector('[data-stop="1"]'); next?.focus({ preventScroll: true }); next?.classList.add('is-pointed'); },
    onReset: reset,
  });
  render();
  if (reduced()) road.classList.add('is-still');
}
