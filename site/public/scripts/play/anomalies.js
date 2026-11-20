// The fraud-detection app frame (#platform), as a demo the visitor can play.
//   - The alert queue is a listbox: pick an alert (click, or arrows then Enter/Space) and the detection run
//     beside it takes it from Ingest to Board; the alert goes New -> Reviewing -> Needs you.
//   - "Hold" pauses and resumes a run; once the run has passed, "Open alert" clears the alert (Cleared).
//   - The side menu filters the queue (New shows all; Mine, Cleared and the two sources dim the rest).
// Every word shown is already in the markup (data-open/-work/-done, the "Needs you" row, the chip's and the
// button's data-done). Only illustrative figures follow (counts, step times, the event id), and the source
// name in the two "card-switch" log lines. All of it is mock-up UI: nothing here is a real system or result.
import { own, asButton, frames, reduced, slug, hexOf, cue } from './lib.js';

export default function init(app) {
  const win = app.querySelector('[data-ui="window"]');
  const pipe = app.querySelector('[data-ui="pipeline-board"]');
  if (!win || !pipe) return;

  /* ---------------------------------------------------------------- the queue */
  const list = win.querySelector('.ui-win__rows');
  const rows = [...list.querySelectorAll('[data-row]')];
  const stOf = (r) => r.querySelector('[data-st]');
  const youEl = rows.map(stOf).find((s) => s.classList.contains('is-you'));
  const W = {
    open: win.dataset.open || 'New',
    work: win.dataset.work || 'Reviewing',
    done: win.dataset.done || 'Cleared',
    you: youEl ? youEl.textContent.trim() : 'Needs you',
  };
  const CLS = { [W.open]: '', [W.work]: 'is-work', [W.done]: 'is-done', [W.you]: 'is-you' };
  const status = (r) => stOf(r).textContent.trim();
  const setStatus = (r, word) => { const s = stOf(r); s.textContent = word; s.className = `ui-win__st ${CLS[word] || ''}`.trim(); };

  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Anomalies');
  rows.forEach((r, i) => {
    r.setAttribute('role', 'option');
    r.setAttribute('aria-selected', 'false');
    r.tabIndex = i === 0 ? 0 : -1;
    r.classList.add('play-hit');
    r.querySelector('.ui-avatar')?.setAttribute('aria-hidden', 'true');
    r.addEventListener('click', () => { r.focus(); pick(r); });
    r.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'Enter' || k === ' ') { e.preventDefault(); pick(r); return; }
      const shown = rows.filter((x) => x.offsetParent !== null);
      const at = shown.indexOf(r);
      const to = k === 'ArrowDown' ? at + 1 : k === 'ArrowUp' ? at - 1 : k === 'Home' ? 0 : k === 'End' ? shown.length - 1 : null;
      if (to == null) return;
      e.preventDefault();
      focusRow(shown[Math.max(0, Math.min(shown.length - 1, to))]);
    });
  });
  const focusRow = (r) => { rows.forEach((x) => { x.tabIndex = x === r ? 0 : -1; }); r.focus(); };
  const select = (r) => rows.forEach((x) => {
    x.classList.toggle('is-sel', x === r);
    x.setAttribute('aria-selected', String(x === r));
  });

  /* ---------------------------------------------------------------- the side menu */
  const side = win.querySelector('.ui-win__side');
  side?.removeAttribute('aria-hidden');
  side?.setAttribute('aria-label', 'Filter the anomalies');
  const navs = side ? [...side.querySelectorAll('.ui-win__nav')] : [];
  const count = (word) => navs.find((n) => n.textContent.trim().startsWith(word))?.querySelector('em');
  const bump = (word, d) => { const em = count(word); if (em) em.textContent = String(Math.max(0, (parseInt(em.textContent, 10) || 0) + d)); };
  // a menu item's own words (not its icon, its # or its count)
  const navName = (n) => [...n.childNodes].filter((c) => c.nodeType === 3).map((c) => c.textContent).join('').trim();
  // New is the whole queue; Mine, Cleared and a source each keep their rows and dim the rest
  const FILTERS = {
    New: () => true,
    Mine: (r) => status(r) === W.you,
    Cleared: (r) => status(r) === W.done,
  };
  let filter = 'New';
  const applyFilter = () => {
    const test = FILTERS[filter] || ((r) => r.querySelector('.ui-win__who')?.textContent.trim() === filter);
    rows.forEach((r) => r.classList.toggle('is-dim', !test(r)));
    navs.forEach((n) => {
      const on = navName(n) === filter;
      n.classList.toggle('is-on', on);
      n.setAttribute('aria-pressed', String(on));
    });
  };
  navs.forEach((n) => {
    const name = navName(n);
    n.querySelector('em')?.setAttribute('aria-hidden', 'true');
    asButton(n, () => { take(); filter = filter === name && name !== 'New' ? 'New' : name; applyFilter(); }, { pressed: n.classList.contains('is-on') });
  });

  /* ---------------------------------------------------------------- the run */
  const steps = [...pipe.querySelectorAll('.ui-pipe__step')];
  const times = steps.map((s) => s.querySelector('[data-time]'));
  const N = steps.length;
  const chip = pipe.querySelector('[data-pipe-chip]');
  const btn = pipe.querySelector('[data-pipe-btn]');
  const total = pipe.querySelector('[data-pipe-total]');
  const lines = [...pipe.querySelectorAll('.ui-pipe__line')];
  const head = { run: pipe.querySelector('.ui-pipe__run'), msg: pipe.querySelector('.ui-pipe__msg'), sha: pipe.querySelector('.ui-pipe__sha'), av: pipe.querySelector('.ui-pipe__commit .ui-avatar') };
  const cmd0 = steps[0]?.querySelector('.ui-pipe__cmd');
  const W2 = {
    chip: chip?.textContent ?? '', chipDone: chip?.dataset.done ?? '',
    btn: btn?.textContent ?? '', btnDone: btn?.dataset.done ?? '',
    cmd0: cmd0?.textContent ?? '', lines: lines.map((l) => l.innerHTML),
    queued: times.map((t) => t.textContent),
  };
  const T = times.map((t, i) => parseInt(t.dataset.time || W2.queued[i], 10) || 1);
  const fmt = (s) => `${Math.max(0, Math.round(s))}s`;
  chip?.setAttribute('role', 'status');

  let j = Math.max(0, steps.findIndex((s) => s.classList.contains('is-run')));
  let k = parseFloat(steps[j]?.style.getPropertyValue('--k')) || 0;
  let token = { dead: true, paused: false };
  let current = rows.find((r) => status(r) === W.work) || null;

  const paint = () => {
    steps.forEach((s, i) => {
      const done = i < j, run = i === j;
      s.classList.toggle('is-done', done);
      s.classList.toggle('is-run', run);
      s.style.setProperty('--k', done ? '1' : run ? k.toFixed(3) : '0');
      times[i].textContent = done ? fmt(T[i]) : run ? fmt(k * T[i]) : W2.queued[i] && !/\d/.test(W2.queued[i]) ? W2.queued[i] : '';
    });
    const passed = j >= N;
    pipe.classList.toggle('is-passed', passed);
    if (chip) { chip.textContent = passed ? W2.chipDone : W2.chip; chip.classList.toggle('ui-chip--live', !passed); }
    if (btn) {
      btn.textContent = passed ? W2.btnDone : W2.btn;
      if (passed) btn.removeAttribute('aria-pressed'); else btn.setAttribute('aria-pressed', String(token.paused));
      btn.classList.toggle('is-pressed', !passed && token.paused);
    }
    if (total) total.textContent = fmt(T.slice(0, Math.min(j, N)).reduce((a, b) => a + b, 0) + (passed ? 0 : k * T[j]));
    const on = steps[Math.min(j, N - 1)].dataset.step;
    lines.forEach((l) => l.classList.toggle('is-on', l.dataset.step === on));
  };

  // the run shows the alert it is working on: its source, its anomaly, an illustrative event id
  const load = (r) => {
    const who = r.querySelector('.ui-win__who')?.textContent.trim() || '';
    const sub = r.querySelector('.ui-win__sub')?.textContent.trim() || '';
    const av = r.querySelector('.ui-avatar');
    if (head.run) head.run.textContent = who;
    if (head.msg) head.msg.textContent = sub;
    if (head.sha) head.sha.textContent = `evt ${hexOf(who + sub)}`;
    if (head.av && av) { head.av.textContent = av.textContent; head.av.dataset.tone = av.dataset.tone || '1'; }
    const s = slug(who);
    if (cmd0) cmd0.textContent = W2.cmd0.replace('card-switch', s);
    lines.forEach((l, i) => { l.innerHTML = W2.lines[i].replace('card-switch', s); });
  };

  const run = async (r, fromJ = 0, fromK = 0) => {
    token.dead = true;
    const t = (token = { dead: false, paused: false });
    current = r;
    j = fromJ; k = fromK;
    paint();
    while (j < N) {
      const from = k;
      const ok = await frames(Math.max(500, (1 - from) * T[j] * 520), t, (e) => { k = from + (1 - from) * e; paint(); });
      if (!ok) return;
      j++; k = 0;
      paint();
    }
    if (t !== token) return;
    t.dead = true;
    if (status(r) === W.work) { setStatus(r, W.you); bump('Mine', 1); }
    current = null;
    paint();
    applyFilter();
  };

  const showPassed = (r) => { token.dead = true; token = { dead: true, paused: false }; load(r); j = N; k = 0; paint(); };

  /* ---------------------------------------------------------------- taking it over from the kit */
  // taken: the kit's loop is stopped for good; fresh: nothing played since the page loaded or the last reset
  let taken = false, fresh = true;
  function take(played = true) {
    if (played && fresh) { fresh = false; pill.played(); }
    if (taken) return;
    taken = true;
    own(win); own(pipe);
    app.classList.add('is-playing');
    rows.forEach((r) => r.classList.remove('is-hint'));
    // the kit's finished picture has one alert mid-run: carry it on from where it stands
    j = Math.max(0, steps.findIndex((s) => s.classList.contains('is-run')));
    k = parseFloat(steps[j]?.style.getPropertyValue('--k')) || 0;
    current = rows.find((r) => status(r) === W.work) || null;
    start = {
      statuses: rows.map(status), counts: navs.map((n) => n.querySelector('em')?.textContent ?? null), j, k, current,
      // the run's header and log exactly as the markup wrote them (its event id is the page's, not a computed one)
      head: [head.run, head.msg, head.sha, head.av, cmd0].map((el) => el ? el.textContent : null),
      tone: head.av?.dataset.tone, lines: lines.map((l) => l.innerHTML),
    };
    if (current) { select(current); run(current, j, k); }
  }

  // back to the picture the visitor first took over, the alert in the run carrying on
  let start = null;
  function reset() {
    if (!start) return;
    token.dead = true;
    rows.forEach((r, i) => setStatus(r, start.statuses[i]));
    navs.forEach((n, i) => { const em = n.querySelector('em'); if (em && start.counts[i] != null) em.textContent = start.counts[i]; });
    filter = 'New';
    applyFilter();
    select(null);
    [head.run, head.msg, head.sha, head.av, cmd0].forEach((el, i) => { if (el && start.head[i] != null) el.textContent = start.head[i]; });
    if (head.av && start.tone) head.av.dataset.tone = start.tone;
    lines.forEach((l, i) => { l.innerHTML = start.lines[i]; });
    if (start.current) { select(start.current); run(start.current, start.j, start.k); }
    fresh = true;
    rows.forEach((x) => x.classList.remove('is-pointed'));
    pill.played(false);
    hint();
  }

  function pick(r) {
    take();
    rows.forEach((x) => x.classList.remove('is-pointed'));
    select(r);
    const st = status(r);
    if (st === W.open) {
      if (current && current !== r && status(current) === W.work) { setStatus(current, W.open); bump('New', 1); }
      setStatus(r, W.work);
      bump('New', -1);
      load(r);
      run(r);
    } else if (st === W.work) {
      if (current !== r) { load(r); run(r); }
    } else {
      if (current && current !== r && status(current) === W.work) { setStatus(current, W.open); bump('New', 1); current = null; }
      showPassed(r);
    }
    applyFilter();
  }

  if (btn) {
    asButton(btn, () => {
      take();
      if (j < N && !token.dead) { token.paused = !token.paused; paint(); return; }
      // the run has passed: opening the alert clears it
      const r = rows.find((x) => x.classList.contains('is-sel'));
      if (r && status(r) === W.you) { setStatus(r, W.done); bump('Mine', -1); applyFilter(); }
    }, { pressed: false });
  }

  /* ---------------------------------------------------------------- the cue */
  // TODO(wording): proposed words, pending Felipe (Documentation/wording-changes.md)
  const pill = cue(app, {
    invite: 'Try it: pick a new alert',
    onStart: () => {
      take(false);
      const first = rows.find((r) => status(r) === W.open && r.offsetParent !== null);
      if (first) { focusRow(first); first.classList.add('is-pointed'); hint(first); }
    },
    onReset: () => { reset(); },
  });
  // the first new alert glows three times whenever the frame comes into view, until the visitor has played
  function hint(el = rows.find((r) => status(r) === W.open)) {
    if (reduced() || !el) return;
    rows.forEach((r) => r.classList.remove('is-hint'));
    void el.offsetWidth;                              // restart the animation
    el.classList.add('is-hint');
  }
  new IntersectionObserver((es) => {
    if (es.some((e) => e.isIntersecting) && fresh) hint();
  }, { threshold: 0.4 }).observe(app);

  /* ---------------------------------------------------------------- phones: four alerts, then "Show all" */
  // TODO(wording): proposed words, pending Felipe
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'play-more';
  const fold = (on) => {
    list.classList.toggle('is-folded', on);
    more.setAttribute('aria-expanded', String(!on));
    more.textContent = on ? `Show all ${rows.length} alerts` : 'Show fewer';
  };
  more.addEventListener('click', () => fold(!list.classList.contains('is-folded')));
  list.after(more);
  fold(true);
}
