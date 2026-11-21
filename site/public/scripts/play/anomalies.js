// The fraud-detection app frame (#platform) as a triage demo (Felipe, 2026-11-21: make the intention clear, less busy).
// The visitor is the security analyst with four open alerts:
//   - pick an alert (click, or arrows then Enter): the detection run takes it from Ingest to Board while the log under
//     the steps says, in plain words, what each step found (the log lines are the page's own);
//   - the run ends on a verdict: a risk level and two decisions, Escalate or Clear;
//   - the decision takes the alert out of the queue, "n left to review" counts down, the next alert starts by itself;
//   - with the queue empty, a summary says how many were escalated and cleared, and a few seconds later the four
//     alerts come back by themselves (no "Reset demo", Felipe 2026-11-21). Picking another alert restarts the run.
//   - each step of the run takes 3 s (Felipe, 2026-11-21: slower, so it can be followed). The seconds shown stay the
//     system's own (the case study: detection in under 10 seconds), so the run says it is in slow motion.
//   - at rest our own run plays, at the same pace, alert after alert (the kit's run was much faster); the visitor's
//     first pick takes over.
// The cleared history, the side menu and the Hold button are hidden in the demo (they made it busy). The risk levels
// are illustrative, like the rest of the mock-up; every new word is a TODO(wording) proposal pending Felipe.
import { own, frames, reduced, slug, hexOf, cue } from './lib.js';

// TODO(wording): proposed, pending Felipe
const T = {
  invite: 'Try it: triage the alerts',
  left: (n) => (n === 1 ? '1 left to review' : `${n} left to review`),
  escalate: 'Escalate',
  clear: 'Clear',
  escalated: 'Escalated',
  risk: { high: 'High risk', medium: 'Medium risk', low: 'Low risk' },
  pick: 'Pick an alert to investigate',
  slow: 'Slow motion',
  done: (e, c) => `All alerts reviewed: ${e} escalated, ${c} cleared`,
};
// illustrative risk per open alert, by its anomaly as the page writes it
const RISK = {
  'Login burst from a new device': ['high', 0.82],
  'Unusual transfer pattern': ['high', 0.91],
  'Session from two countries': ['medium', 0.64],
  'Repeated failed PIN entries': ['low', 0.31],
};
const OPEN = 4;
const STEP_MS = 3000;   // each step of the run (Felipe, 2026-11-21)
const REFILL_MS = 5000; // the summary stays this long, then the queue fills again   // the first four rows are the open alerts in the markup (New, New, New, Needs you)

export default function init(app) {
  const win = app.querySelector('[data-ui="window"]');
  const pipe = app.querySelector('[data-ui="pipeline-board"]');
  if (!win || !pipe) return;
  app.classList.add('play-triage');

  /* ---------------------------------------------------------------- the queue */
  const list = win.querySelector('.ui-win__rows');
  const rows = [...list.querySelectorAll('[data-row]')].slice(0, OPEN);
  const stOf = (r) => r.querySelector('[data-st]');
  const W = { open: win.dataset.open || 'New', work: win.dataset.work || 'Reviewing', done: win.dataset.done || 'Cleared' };
  const setStatus = (r, word, cls = '') => { const s = stOf(r); s.textContent = word; s.className = `ui-win__st ${cls}`.trim(); };
  const sub = (r) => r.querySelector('.ui-win__sub')?.textContent.trim() || '';
  const who = (r) => r.querySelector('.ui-win__who')?.textContent.trim() || '';

  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Open alerts');           // TODO(wording): proposed
  [...list.querySelectorAll('[data-row]')].slice(OPEN).forEach((r) => r.classList.add('play-history'));
  rows.forEach((r, i) => {
    r.setAttribute('role', 'option');
    r.setAttribute('aria-selected', 'false');
    r.tabIndex = i === 0 ? 0 : -1;
    r.classList.add('play-hit');
    r.querySelector('.ui-avatar')?.setAttribute('aria-hidden', 'true');
    r.addEventListener('click', () => pick(r));
    r.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(r); return; }
      const live = rows.filter((x) => !x.classList.contains('is-gone'));
      const at = live.indexOf(r);
      const to = { ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: live.length - 1 }[e.key];
      if (to == null) return;
      e.preventDefault();
      focusRow(live[Math.max(0, Math.min(live.length - 1, to))]);
    });
  });
  const focusRow = (r) => { rows.forEach((x) => { x.tabIndex = x === r ? 0 : -1; }); r?.focus({ preventScroll: true }); };
  const select = (r) => rows.forEach((x) => { x.classList.toggle('is-sel', x === r); x.setAttribute('aria-selected', String(x === r)); });

  // the tally in the window's bar, where the search box was
  const bar = win.querySelector('.ui-win__bar');
  const tally = document.createElement('span');
  tally.className = 'play-tally';
  tally.setAttribute('role', 'status');
  bar?.append(tally);
  // the summary, shown in the queue once it is empty
  const summary = document.createElement('p');
  summary.className = 'play-summary';
  summary.setAttribute('role', 'status');
  summary.hidden = true;
  list.after(summary);

  /* ---------------------------------------------------------------- the run and its narrative */
  const steps = [...pipe.querySelectorAll('.ui-pipe__step')];
  const times = steps.map((s) => s.querySelector('[data-time]'));
  const N = steps.length;
  const chip = pipe.querySelector('[data-pipe-chip]');
  const total = pipe.querySelector('[data-pipe-total]');
  const log = pipe.querySelector('.ui-pipe__log');
  const lines = [...pipe.querySelectorAll('.ui-pipe__line')];
  const head = { run: pipe.querySelector('.ui-pipe__run'), msg: pipe.querySelector('.ui-pipe__msg'), sha: pipe.querySelector('.ui-pipe__sha'), av: pipe.querySelector('.ui-pipe__commit .ui-avatar') };
  const cmd0 = steps[0]?.querySelector('.ui-pipe__cmd');
  const W2 = { chip: chip?.textContent ?? '', chipDone: chip?.dataset.done ?? '', cmd0: cmd0?.textContent ?? '', lines: lines.map((l) => l.innerHTML), queued: times.map((t) => t.textContent) };
  const S = times.map((t, i) => parseInt(t.dataset.time || W2.queued[i], 10) || 1);
  const fmt = (x) => `${Math.max(0, Math.round(x))}s`;
  const QUEUED = W2.queued.find((q) => q && !/\d/.test(q)) || '';
  log?.removeAttribute('aria-hidden');
  log?.setAttribute('aria-live', 'polite');

  // the verdict, under the log
  const verdict = document.createElement('div');
  verdict.className = 'play-verdict';
  verdict.hidden = true;
  verdict.innerHTML = `<div class="play-verdict__risk"><span class="play-verdict__label"></span><span class="play-meter" aria-hidden="true"><i></i></span></div>
    <div class="play-verdict__acts"><button type="button" class="play-act play-act--escalate">${T.escalate}</button><button type="button" class="play-act">${T.clear}</button></div>`;
  const slow = document.createElement('span');
  slow.className = 'play-slow';
  slow.textContent = T.slow;
  slow.hidden = true;
  total?.parentElement?.before(slow);
  const hint = document.createElement('p');
  hint.className = 'play-pick';
  hint.textContent = T.pick;
  pipe.append(verdict, hint);

  let j = 0, k = 0, token = { dead: true }, current = null;
  const decided = { escalated: 0, cleared: 0 };

  const paint = () => {
    steps.forEach((s, i) => {
      const done = i < j, run = i === j;
      s.classList.toggle('is-done', done);
      s.classList.toggle('is-run', run);
      s.style.setProperty('--k', done ? '1' : run ? k.toFixed(3) : '0');
      times[i].textContent = done ? fmt(S[i]) : run ? fmt(k * S[i]) : QUEUED;
    });
    const passed = j >= N;
    pipe.classList.toggle('is-passed', passed);
    if (chip) { chip.textContent = passed ? W2.chipDone : W2.chip; chip.classList.toggle('ui-chip--live', !passed); }
    if (total) total.textContent = fmt(S.slice(0, Math.min(j, N)).reduce((a, b) => a + b, 0) + (passed ? 0 : k * S[j]));
    // the narrative: what the current step found, and the step before it
    const at = Math.min(j, N - 1);
    const on = steps[at].dataset.step, prev = steps[at - 1]?.dataset.step;
    lines.forEach((l) => { l.classList.toggle('is-on', l.dataset.step === on); l.classList.toggle('is-prev', l.dataset.step === prev); });
  };

  // the run shows the alert it works on: its source, its anomaly, an illustrative event id
  const load = (r) => {
    const w = who(r), s = sub(r), av = r.querySelector('.ui-avatar');
    if (head.run) head.run.textContent = w;
    if (head.msg) head.msg.textContent = s;
    if (head.sha) head.sha.textContent = `evt ${hexOf(w + s)}`;
    if (head.av && av) { head.av.textContent = av.textContent; head.av.dataset.tone = av.dataset.tone || '1'; }
    if (cmd0) cmd0.textContent = W2.cmd0.replace('card-switch', slug(w));
    lines.forEach((l, i) => { l.innerHTML = W2.lines[i].replace('card-switch', slug(w)); });
  };

  const showVerdict = (r) => {
    const [level, score] = RISK[sub(r)] || ['medium', 0.5];
    verdict.dataset.level = level;
    verdict.querySelector('.play-verdict__label').textContent = T.risk[level];
    verdict.querySelector('.play-meter > i').style.setProperty('--r', String(score));
    if (chip) chip.textContent = T.risk[level];   // not the kit's "Alerted": the visitor has not decided yet
    verdict.hidden = false;
    hint.hidden = true;
    // at the verdict the log shows the evidence the decision rests on: what scoring found, after what the stream
    // built (not the last steps, "alert sent" and "board refreshed", which read as if it were already decided)
    lines.forEach((l) => { l.classList.toggle('is-on', l.dataset.step === 'score'); l.classList.toggle('is-prev', l.dataset.step === 'stream'); });
    // on a phone the steps stack and the verdict can land below the screen: bring it into view (only then)
    const r2 = verdict.getBoundingClientRect();
    if (r2.bottom > innerHeight || r2.top < 0) verdict.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
  };

  const run = async (r, idle = false) => {
    token.dead = true;
    const t = (token = { dead: false });
    if (!idle) current = r;
    verdict.hidden = true;
    if (!idle) hint.hidden = true;
    slow.hidden = false;
    j = 0; k = 0;
    load(r);
    paint();
    while (j < N) {
      const ok = await frames(STEP_MS, t, (e) => { k = e; paint(); });
      if (!ok) return;
      j++; k = 0;
      paint();
    }
    if (t !== token) return;
    slow.hidden = true;
    if (idle) {
      // at rest: the risk the run found, in the chip, and the evidence in the log; no decision is asked for
      const [level] = RISK[sub(r)] || ['medium'];
      if (chip) chip.textContent = T.risk[level];
      lines.forEach((l) => { l.classList.toggle('is-on', l.dataset.step === 'score'); l.classList.toggle('is-prev', l.dataset.step === 'stream'); });
      return;
    }
    showVerdict(r);
  };

  /* ---------------------------------------------------------------- taking over, picking, deciding */
  let taken = false, fresh = true, start = null;
  function take(played = true) {
    if (!taken) {
      taken = true;
      token.dead = true;
      own(win); own(pipe);
      app.classList.add('is-playing');
      // a fresh queue: the four open alerts, all new, nothing picked
      rows.forEach((r) => { setStatus(r, W.open); r.classList.remove('is-sel', 'is-gone', 'is-hint'); });
      select(null);
      start = { head: [head.run, head.msg, head.sha, head.av, cmd0].map((el) => el?.textContent ?? null), tone: head.av?.dataset.tone, lines: lines.map((l) => l.innerHTML) };
      verdict.hidden = true;
      hint.hidden = false;
      count();
    }
    if (played && fresh) { fresh = false; pill.played(); }
  }
  const live = () => rows.filter((r) => !r.classList.contains('is-gone'));
  const count = () => { tally.textContent = T.left(live().length); };

  function pick(r) {
    take();
    rows.forEach((x) => x.classList.remove('is-pointed'));
    if (r.classList.contains('is-gone')) return;
    if (current && current !== r && current.classList.contains('is-gone') === false && stOf(current).textContent === W.work) setStatus(current, W.open);
    select(r);
    focusRow(r);
    setStatus(r, W.work, 'is-work');
    run(r);
  }

  const decide = (how) => {
    const r = current;
    if (!r || verdict.hidden) return;
    take();
    decided[how === 'escalate' ? 'escalated' : 'cleared']++;
    setStatus(r, how === 'escalate' ? T.escalated : W.done, how === 'escalate' ? 'is-you' : 'is-done');
    verdict.hidden = true;
    current = null;
    r.classList.add('is-leaving');
    setTimeout(() => {
      r.classList.remove('is-leaving');
      r.classList.add('is-gone');
      r.setAttribute('aria-hidden', 'true');
      count();
      const next = live()[0];
      if (next) { pick(next); return; }
      // the queue is empty: the summary
      summary.textContent = T.done(decided.escalated, decided.cleared);
      summary.hidden = false;
      tally.textContent = T.left(0);
      hint.hidden = true;
      refill = setTimeout(reset, REFILL_MS);
    }, reduced() ? 0 : 320);
  };
  verdict.addEventListener('click', (e) => {
    const b = e.target.closest('.play-act');
    if (b) decide(b.classList.contains('play-act--escalate') ? 'escalate' : 'clear');
  });

  // the queue refilled: the four alerts back, the run back as the page wrote it
  let refill = 0;
  function reset() {
    clearTimeout(refill);
    token.dead = true;
    current = null;
    decided.escalated = decided.cleared = 0;
    rows.forEach((r) => { r.classList.remove('is-gone', 'is-leaving', 'is-sel', 'is-pointed'); r.removeAttribute('aria-hidden'); setStatus(r, W.open); });
    select(null);
    focusRow(rows[0]);
    if (start) {
      [head.run, head.msg, head.sha, head.av, cmd0].forEach((el, i) => { if (el && start.head[i] != null) el.textContent = start.head[i]; });
      if (head.av && start.tone) head.av.dataset.tone = start.tone;
      lines.forEach((l, i) => { l.innerHTML = start.lines[i]; });
    }
    j = 0; k = 0; paint();
    summary.hidden = true;
    verdict.hidden = true;
    hint.hidden = false;
    count();
    fresh = true;
    pill.played(false);
    rows[0].classList.add('is-hint');
  }

  /* ---------------------------------------------------------------- the cue */
  const pill = cue(app, {
    invite: T.invite,
    onStart: () => {
      take(false);
      const first = live()[0];
      if (first) { focusRow(first); first.classList.add('is-pointed'); }
    },
  });
  // at rest: our own run, alert after alert, at the demo's pace, while the frame is on screen
  let onScreen = false;
  if (!reduced()) {
    own(pipe);
    j = 0; k = 0; paint();
    new IntersectionObserver((es) => { onScreen = es.some((e) => e.isIntersecting); }, { threshold: 0.2 }).observe(app);
    (async () => {
      const nap = (ms) => new Promise((res) => setTimeout(res, ms));
      for (let i = 0; !taken; i++) {
        while (!taken && (!onScreen || document.hidden)) await nap(400);
        if (taken) return;
        load(rows[i % OPEN]);
        await run(rows[i % OPEN], true);
        if (taken) return;
        await nap(2500);
      }
    })();
  }
  if (!reduced()) {
    new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting) || !fresh) return;
      rows.forEach((r) => r.classList.remove('is-hint'));
      void rows[0].offsetWidth;
      rows[0].classList.add('is-hint');
    }, { threshold: 0.4 }).observe(app);
  }
}
