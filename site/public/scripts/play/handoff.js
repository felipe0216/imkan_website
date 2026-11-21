// "Deploy AI that saves you time", round 3 (Felipe, 2026-11-21: "the demo and the message do not align ... make
// something clearer and punchier"). The card says: if your team spends hours copying, checking and chasing
// information, that is work software can do; here is how to spot it and hand it off. So the demo is a team's week:
//   - five tasks, each tagged with the kind of work it is (the card's own words: copying, checking, chasing), and
//     its hours a week;
//   - "Hand off" sends a task to the AI agent: its hours fly into the "hours back" meter, the agent shows the work
//     done (the page's own notes), and the row says the agent does it now;
//   - the one task that needs judgement refuses: it stays with the team, and the agent says why;
//   - all four handed off: the hours back, and "Start again".
// At rest it plays itself (a task every 3 s); a press takes over, and untouched for a while it plays again.
// The hours are illustrative, not a client's figures. Without scripts the kit's notes show as before. New words
// are TODO(wording) proposals, pending Felipe.
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe. "note" is the agent's result: n = the page's own note (by index).
const TASKS = [
  { name: 'Copy invoice fields into the system', kind: 'Copying', h: 3, note: 0 },
  { name: 'Chase approvals by email', kind: 'Chasing', h: 4, note: { t: 'Approval reminders sent', b: 'To everyone who has not replied yet' } },
  { name: 'Check contracts for renewal dates', kind: 'Checking', h: 2, note: 2 },
  { name: 'Negotiate terms with a key client', kind: 'Judgement', h: 0, keep: true },
  { name: 'Copy email requests into the tracker', kind: 'Copying', h: 2, note: 1 },
];
const T = {
  invite: 'Try it: hand off a task',
  title: "Your team's week",
  back: 'Hours back each week',
  hand: 'Hand off',
  agent: 'AI agent',
  team: 'Stays with your team',
  keep: 'Keep this one: it needs a person’s judgement. The agent takes the rest so your team has time for it.',
  per: (h) => `${h} h a week`,
  now: 'just now',
  done: (h) => `${h} hours back every week, for the work only people can do.`,
  again: 'Start again',
  working: 'Working on it',
};
const EVERY = 3000;
const IDLE = 9000;

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="notify"]');
  if (!kit) return;
  // the agent's results, in the page's own words: the kit's three notes
  const NOTES = [...kit.querySelectorAll('.ui-note')].map((n) => ({
    t: n.querySelector('.ui-note__title')?.firstChild?.textContent.trim() || '',
    b: n.querySelector('.ui-note__body')?.textContent.trim() || '',
  }));
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');
  const total = TASKS.reduce((a, t) => a + t.h, 0);
  const noteOf = (t) => (typeof t.note === 'number' ? NOTES[t.note] : t.note) || { t: '', b: '' };

  const box = document.createElement('div');
  box.className = 'ui ui-panel play-ho';
  box.innerHTML = `
    <div class="play-ho__head"><div class="ui-title">${T.title}</div><span class="ui-spacer"></span>
      <div class="play-ho__meter" role="status" aria-live="polite"><span class="play-ho__label">${T.back}</span><b class="play-ho__hours">0 h</b></div></div>
    <div class="play-ho__bar" aria-hidden="true"><i></i></div>
    <ul class="play-ho__list">${TASKS.map((t, i) => `
      <li class="play-ho__task${t.keep ? ' is-judgement' : ''}" data-i="${i}">
        <span class="play-ho__kind" data-kind="${t.kind.toLowerCase()}">${t.kind}</span>
        <span class="play-ho__text"><span class="play-ho__name">${t.name}</span><span class="play-ho__per">${t.h ? T.per(t.h) : ''}</span></span>
        <span class="play-ho__state">
          <button type="button" class="play-ho__btn" aria-label="${T.hand}: ${t.name}">${T.hand}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <span class="play-ho__tag"></span>
        </span>
      </li>`).join('')}
    </ul>
    <div class="play-ho__feed" aria-live="polite">
      <span class="ui-agent play-ho__av" aria-hidden="true"></span>
      <span class="play-ho__out"><span class="play-ho__who">${T.agent}</span><span class="play-ho__say"></span></span>
      <button type="button" class="play-ho__again" hidden>${T.again}</button>
    </div>`;
  kit.replaceWith(box);
  const rows = [...box.querySelectorAll('.play-ho__task')];
  const hoursEl = box.querySelector('.play-ho__hours');
  const bar = box.querySelector('.play-ho__bar i');
  const feed = box.querySelector('.play-ho__feed');
  const sayEl = box.querySelector('.play-ho__say');
  const again = box.querySelector('.play-ho__again');

  let back = 0, shown = 0, done = new Set(), kept = false, tick = 0;
  // the hours count up to their new value, the bar with them
  const roll = () => {
    cancelAnimationFrame(tick);
    const from = shown, to = back, t0 = performance.now(), ms = reduced() ? 0 : 700;
    const step = (now) => {
      const k = ms ? Math.min(1, (now - t0) / ms) : 1;
      shown = from + (to - from) * (1 - (1 - k) ** 3);
      hoursEl.textContent = `${Math.round(shown)} h`;
      bar.style.inlineSize = `${(shown / total) * 100}%`;
      if (k < 1) tick = requestAnimationFrame(step);
    };
    tick = requestAnimationFrame(step);
  };
  const say = (kind, html) => {
    feed.className = `play-ho__feed is-${kind}`;
    sayEl.innerHTML = html;
    void feed.offsetWidth;
    feed.classList.add('is-pop');
  };
  // the task's hours fly up into the meter (a copy of its "n h a week" label)
  const fly = (row) => {
    const from = row.querySelector('.play-ho__per'), to = hoursEl;
    if (reduced() || !from.animate) return Promise.resolve();
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const g = document.createElement('span');
    g.className = 'play-ho__fly';
    g.textContent = `+${TASKS[+row.dataset.i].h} h`;
    g.setAttribute('aria-hidden', 'true');
    Object.assign(g.style, { left: `${a.left}px`, top: `${a.top}px` });
    document.body.append(g);
    return g.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(1.25)`, opacity: 0.2 },
    ], { duration: 650, easing: 'cubic-bezier(0.5, 0, 0.2, 1)' }).finished.then(() => g.remove(), () => g.remove());
  };

  let busy = false;
  const handOff = async (i) => {
    const t = TASKS[i], row = rows[i];
    if (busy || done.has(i) || (t.keep && kept)) return;
    if (t.keep) {
      kept = true;
      row.classList.add('is-kept', 'is-shake');
      row.querySelector('.play-ho__tag').textContent = T.team;
      say('keep', T.keep);
      setTimeout(() => row.classList.remove('is-shake'), 450);
      return;
    }
    busy = true;
    done.add(i);
    row.classList.add('is-going');
    say('work', `<span class="play-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr-only">${T.working}</span>`);
    await fly(row);
    back += t.h;
    roll();
    row.classList.remove('is-going');
    row.classList.add('is-agent');
    row.querySelector('.play-ho__tag').textContent = T.agent;
    await new Promise((r) => setTimeout(r, reduced() ? 0 : 450));
    const n = noteOf(t);
    say('done', `<b>${n.t}</b> <span class="play-ho__body">${n.b}</span><time>${T.now}</time>`);
    busy = false;
    if (done.size === TASKS.filter((x) => !x.keep).length) {
      setTimeout(() => {
        say('all', `<b>${T.done(back)}</b>`);
        again.hidden = false;
        box.classList.add('is-all');
      }, reduced() ? 0 : 1600);
    }
  };
  const reset = () => {
    back = 0; done = new Set(); kept = false; busy = false;
    rows.forEach((r) => { r.classList.remove('is-agent', 'is-kept', 'is-going'); r.querySelector('.play-ho__tag').textContent = ''; });
    again.hidden = true;
    box.classList.remove('is-all');
    feed.className = 'play-ho__feed';
    sayEl.innerHTML = '';
    roll();
  };

  // the visitor's turn, and the loop at rest
  let touched = -Infinity, visible = false, played = false;
  const mine = () => { touched = performance.now(); if (!played) { played = true; pill.played(); } };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('.play-ho__btn');
    if (b) { mine(); handOff(+b.closest('.play-ho__task').dataset.i); return; }
    if (e.target.closest('.play-ho__again')) { mine(); reset(); rows[0].querySelector('.play-ho__btn').focus({ preventScroll: true }); }
  });
  setInterval(() => {
    if (!visible || document.hidden || reduced() || busy || performance.now() - touched < IDLE) return;
    if (box.classList.contains('is-all')) { reset(); return; }
    const next = TASKS.findIndex((t, i) => !t.keep && !done.has(i));
    // at rest the judgement task is tried once, halfway, so the "keep this one" moment shows too
    if (!kept && done.size === 2) { handOff(TASKS.findIndex((t) => t.keep)); return; }
    if (next >= 0) handOff(next);
  }, EVERY);
  new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0.5 }).observe(box);
  // the card keeps its tallest height (the longest message in the feed), so nothing below it moves
  const settle = () => {
    box.style.minBlockSize = '';
    const was = [sayEl.innerHTML, feed.className, again.hidden];
    feed.className = 'play-ho__feed is-keep'; sayEl.textContent = T.keep; again.hidden = false;
    const h = box.offsetHeight;
    [sayEl.innerHTML, feed.className, again.hidden] = was;
    box.style.minBlockSize = `${Math.ceil(h)}px`;
  };
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { const b = rows.find((r, i) => !TASKS[i].keep && !done.has(i))?.querySelector('.play-ho__btn'); b?.focus({ preventScroll: true }); b?.classList.add('is-pointed'); } });
  settle();
  document.fonts?.ready.then(settle);
  let lastW = 0;
  new ResizeObserver(() => { const w = Math.round(box.getBoundingClientRect().width); if (w && w !== lastW) { lastW = w; settle(); } }).observe(box);
}
