// "Build a strategy worth executing", round 4 (Felipe, 2026-11-21: "make it a fun exercise ... connect different
// activities to the right order in the roadmap, so they can learn what things should go first and why").
// A small game: six empty stops on a track that ends at "AI ready", eight cards (six stages and two traps). The prompt
// asks what comes first, then next; a right card flies to its stop and the track fills; a wrong one shakes and stays,
// a trap is ruled out. Every pick gets a one-line reason. Four stops filled: "Roadmap complete", in how many picks,
// and "Play again". The card never changes height: a card that leaves the tray keeps its place.
// Without scripts the kit's checklist shows as before. The title is the page's own; every other word is a
// TODO(wording) proposal, pending Felipe.
import { own, cue, reduced } from './lib.js';

// The stages of data maturity on the way to "AI ready" (Felipe, 2026-11-21: "what you need to do before getting to
// AI ready, all the things that need to happen before that, in order"). The track ends at a fixed flag, AI ready.
// Round 2 of the stages (Felipe, 2026-11-22: clearer stages, subtler traps; from strategy to collecting, ownership,
// quality, processing and testing). Six stages in order, then the AI-ready flag.
// TODO(wording): proposed, pending Felipe
const STEPS = [
  { short: 'Strategy', label: 'Agree the business questions AI should answer',
    right: 'Right. Start with the questions that move revenue or cost, so every later stage has a purpose.' },
  { short: 'Collect', label: 'Find where your data lives and bring it together',
    right: 'Right. Spreadsheets here and systems there become one source of truth.',
    early: 'Not yet. Agree the questions first, so you know which data to bring together.' },
  { short: 'Owners', label: 'Name a person accountable for each dataset',
    right: 'Right. Data with an owner gets fixed and kept up to date. Data without one drifts.',
    early: 'Not yet. Bring the data together first, so you can see what each person would own.' },
  { short: 'Quality', label: 'Fix errors, gaps and duplicates at the source',
    right: 'Right. Fixed at the source by its owner, a mistake stays fixed instead of coming back every month.',
    early: 'Not yet. Name the owners first: they are the ones who keep the fixes in place.' },
  { short: 'Pipelines', label: 'Automate how data flows, with checks built in',
    right: 'Right. The data now updates on its own, and the checks catch new errors before anyone sees them.',
    early: 'Not yet. Automating messy data only spreads the mess faster. Fix it first.' },
  { short: 'Trust', label: 'Test the numbers until the business relies on them',
    right: 'Right. When the business relies on the numbers, they are ready for AI to learn from. You are AI ready.',
    early: 'Not yet. Test the numbers once they flow on their own, or you test them all again tomorrow.' },
];
// traps that sound sensible: neither is a stage on the way
const TRAPS = [
  { label: 'Launch a chatbot pilot', why: 'Tempting, but a pilot on unready data proves nothing. It comes after the groundwork.' },
  { label: 'Move everything to the cloud', why: 'Not a stage. Where your data lives matters less than whether it is right and owned.' },
];
const N = STEPS.length;
const T = {
  invite: 'Try it: the road to AI ready',
  first: 'What comes first?',
  next: 'What comes next?',
  of: (n) => `Stage ${n} of ${N}`,
  goal: 'AI ready',
  done: 'You are AI ready',
  tries: (n) => (n === N ? `${N} picks, ${N} right. A clean run.` : `Done in ${n} picks. Every wrong turn is one a real project avoids.`),
  again: 'Play again',
  pick: 'Pick the card that comes next.',
  inOrder: 'Your road to AI ready, in order.',
};

const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="checklist"]');
  if (!kit) return;
  const title = kit.querySelector('.ui-title')?.textContent.trim() || '';
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  // the cards: the stages (by their order) and the two traps
  const CARDS = [...STEPS.map((st, i) => ({ id: `s${i}`, label: st.label, step: i })), ...TRAPS.map((t, i) => ({ id: `t${i}`, label: t.label, trap: i }))];

  const box = document.createElement('div');
  box.className = 'ui ui-panel play-game';
  box.innerHTML = `
    <div class="play-game__head"><div class="ui-title">${title}</div><span class="ui-spacer"></span><div class="ui-meta" data-game-count></div></div>
    <ol class="play-game__track" aria-label="${title}">
      ${STEPS.map((s, i) => `<li class="play-game__stop" data-stop="${i}"><span class="play-game__dot">${i + 1}</span><span class="play-game__name">${s.short}</span></li>`).join('')}
      <li class="play-game__stop play-game__goal"><span class="play-game__dot" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 14V2.5M4 3h7.5l-1.8 2.6L11.5 8.2H4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg></span><span class="play-game__name">${T.goal}</span></li>
    </ol>
    <p class="play-game__ask" aria-hidden="true"></p>
    <div class="play-game__tray" role="group"></div>
    <div class="play-game__say" role="status" aria-live="polite"><span class="play-game__icon" aria-hidden="true"></span><span class="play-game__msg"></span></div>
    <div class="play-game__end" hidden>
      <div class="play-game__trophy" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <p class="play-game__done"><b>${T.done}</b><span data-game-tries></span></p>
      <button type="button" class="play-game__again">${T.again}</button>
    </div>`;
  kit.replaceWith(box);
  const track = box.querySelector('.play-game__track');
  const stops = [...box.querySelectorAll('.play-game__stop:not(.play-game__goal)')];
  const tray = box.querySelector('.play-game__tray');
  const ask = box.querySelector('.play-game__ask');
  const say = box.querySelector('.play-game__say');
  const msg = box.querySelector('.play-game__msg');
  const end = box.querySelector('.play-game__end');
  const count = box.querySelector('[data-game-count]');
  const tries = box.querySelector('[data-game-tries]');

  let at = 0, picks = 0, played = false;

  const paint = () => {
    stops.forEach((s, i) => { s.classList.toggle('is-done', i < at); s.classList.toggle('is-next', i === at); });
    track.style.setProperty('--p', `${(at / N) * 100}%`);
    box.classList.toggle('is-ready', at >= N);
    count.textContent = T.of(Math.min(at + 1, N));
    ask.textContent = at >= N ? T.inOrder : at === 0 ? T.first : T.next;
  };
  const deal = () => {
    at = 0; picks = 0;
    tray.innerHTML = shuffle(CARDS).map((c) => `<button type="button" class="play-game__card" data-card="${c.id}">${c.label}</button>`).join('');
    tray.setAttribute('aria-label', T.pick);
    say.className = 'play-game__say';
    msg.textContent = '';
    end.hidden = true;
    tray.hidden = false;
    box.classList.remove('is-complete');
    paint();
  };
  const tell = (kind, text) => {
    say.className = `play-game__say is-${kind}`;
    msg.textContent = text;
    void say.offsetWidth;                       // replay the pop for the same kind twice in a row
    say.classList.add('is-pop');
  };

  // a right card flies to its stop (a copy of it, shrinking into the stop's dot), then the stop fills
  const fly = (card, stop) => {
    if (reduced() || !card.animate) return Promise.resolve();
    const a = card.getBoundingClientRect(), b = stop.querySelector('.play-game__dot').getBoundingClientRect();
    const ghost = card.cloneNode(true);
    ghost.className = 'play-game__card play-game__ghost';
    ghost.removeAttribute('data-card');
    ghost.setAttribute('aria-hidden', 'true');
    ghost.tabIndex = -1;
    Object.assign(ghost.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
    document.body.append(ghost);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    return ghost.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.3 },
    ], { duration: 560, easing: 'cubic-bezier(0.5, 0, 0.2, 1)' }).finished.then(() => ghost.remove(), () => ghost.remove());
  };

  const pick = async (card) => {
    if (card.disabled || box.classList.contains('is-busy')) return;
    if (!played) { played = true; pill.played(); }
    picks++;
    const c = CARDS.find((x) => x.id === card.dataset.card);
    if (c.trap != null) {
      card.classList.add('is-out');
      card.disabled = true;
      tell('no', TRAPS[c.trap].why);
      tray.querySelector('.play-game__card:not(:disabled)')?.focus({ preventScroll: true });
      return;
    }
    if (c.step !== at) {
      card.classList.remove('is-shake'); void card.offsetWidth; card.classList.add('is-shake');
      setTimeout(() => card.classList.remove('is-shake'), 450);
      tell('no', STEPS[c.step].early);
      return;
    }
    // right
    box.classList.add('is-busy');
    tell('yes', STEPS[at].right);
    const flight = fly(card, stops[at]);      // measured before the card leaves the tray
    card.classList.add('is-placed');
    card.disabled = true;
    await flight;
    box.classList.remove('is-busy');
    at++;
    paint();
    if (at === N) {
      box.classList.add('is-complete');
      tries.textContent = T.tries(picks);
      setTimeout(() => {
        tray.hidden = true;
        end.hidden = false;
        box.querySelector('.play-game__again').focus({ preventScroll: true });
      }, reduced() ? 0 : 1600);
      return;
    }
    // the focus stays in the tray, on the first card still to play
    tray.querySelector('.play-game__card:not(:disabled)')?.focus({ preventScroll: true });
  };

  tray.addEventListener('click', (e) => { const card = e.target.closest('.play-game__card'); if (card) pick(card); });
  box.querySelector('.play-game__again').addEventListener('click', () => { deal(); tray.querySelector('.play-game__card')?.focus({ preventScroll: true }); });
  // the card's height is set by its tallest state (the tray of six cards and a two-line reason), so a pick never
  // resizes it, nor the card beside it; measured again when the width changes or the fonts arrive
  const settle = () => {
    box.style.minBlockSize = '';
    const was = [tray.hidden, end.hidden, msg.textContent];
    tray.hidden = false; end.hidden = true;
    msg.textContent = [...STEPS.map((s) => s.right), ...STEPS.slice(1).map((s) => s.early), ...TRAPS.map((t) => t.why)].sort((x, y) => y.length - x.length)[0];
    const h = box.offsetHeight;
    [tray.hidden, end.hidden, msg.textContent] = was;
    box.style.minBlockSize = `${Math.ceil(h)}px`;
  };
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { const c = tray.querySelector('.play-game__card'); c?.focus({ preventScroll: true }); c?.classList.add('is-pointed'); } });
  deal();
  settle();
  document.fonts?.ready.then(settle);
  let lastW = 0;
  new ResizeObserver(() => { const w = Math.round(box.getBoundingClientRect().width); if (w && w !== lastW) { lastW = w; settle(); } }).observe(box);
}
