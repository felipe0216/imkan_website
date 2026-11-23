// Shared helpers for the interactive mock-ups (see /scripts/play.js).

const rmq = matchMedia('(prefers-reduced-motion: reduce)');
// a phone stacks the cards: a card can fit its content there, since no card beside it has to match its height
const stackq = matchMedia('(max-width: 639px)');
export const stacked = () => stackq.matches;
export const reduced = () => rmq.matches;

const STUB = { destroy() {}, pause() {}, resume() {}, restart() {}, hold() {} };

/** Take a fragment over from the kit: stop its loop (the kit puts back its finished picture and removes
    its pause button), and leave a stub controller so the kit never starts it again. Idempotent. */
export function own(root) {
  if (!root || root.dataset.played != null) return;
  const ctl = root.__ui;
  if (ctl && ctl !== STUB) { try { ctl.destroy(); } catch (e) { console.warn(e); } }
  root.__ui = STUB;
  root.dataset.played = '';
}

/** Make an element act as a button: focusable, named by its text, Enter and Space press it. */
export function asButton(el, onPress, { pressed } = {}) {
  el.setAttribute('role', 'button');
  el.tabIndex = 0;
  if (pressed != null) el.setAttribute('aria-pressed', String(pressed));
  el.classList.add('play-hit');
  el.addEventListener('click', (e) => { e.preventDefault(); onPress(e); });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPress(e); }
  });
}

// the next frame, or 50 ms if no frame comes (WebKit can hold frames back while nothing else repaints)
const tick = (fn) => {
  let done = false;
  const go = () => { if (done) return; done = true; clearTimeout(t); fn(performance.now()); };
  const t = setTimeout(go, 50);
  requestAnimationFrame(go);
};

/** Call fn(0..1) over ms of running time; resolves true when done, false if cancelled (token.dead).
    While token.paused it waits where it is. */
export function frames(ms, token, fn) {
  return new Promise((resolve) => {
    if (reduced() || ms <= 0) { fn(1); resolve(!token.dead); return; }
    let done = 0, last = null;
    const step = (now) => {
      if (token.dead) { resolve(false); return; }
      if (token.paused) { last = null; tick(step); return; }
      if (last != null) done += now - last;
      last = now;
      const k = Math.min(1, done / ms);
      fn(k);
      if (k < 1) tick(step); else resolve(true);
    };
    tick(step);
  });
}

/** The visible cue every demo shares: a "Try it: ..." pill, above the frame's right edge or in its corner. Pressing it
    calls onStart (point at the first thing to press). Once the visitor has played, the pill goes (Felipe, 2026-11-21:
    no "Reset demo"; every demo has its own undo or comes back by itself). played(false) brings the invitation back.
    TODO(wording): the pill's words are proposals (Documentation/wording-changes.md, pending Felipe). */
export function cue(frame, { invite, onStart, corner = false }) {
  const bar = document.createElement('div');
  bar.className = corner ? 'play-cue play-cue--corner' : 'play-cue';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'play-cue__btn';
  btn.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5z"/></svg><span>${invite}</span>`;
  btn.addEventListener('click', () => onStart());
  bar.append(btn);
  if (corner) { frame.classList.add('has-play-cue'); frame.append(bar); place(frame, bar); } else frame.before(bar);
  let isPlayed = false;
  return {
    played(on = true) {
      if (isPlayed === on) return;
      isPlayed = on;
      // the pill leaves; if it had the focus, the focus stays inside the demo, not on the page's body
      if (on && bar.contains(document.activeElement)) frame.querySelector('button, [tabindex="0"]')?.focus({ preventScroll: true });
      bar.classList.toggle('is-gone', on);
    },
  };
}

/* A corner pill lines up with the mock-up, not the frame (Felipe, 2026-11-22: in the frame's corner it looked squeezed
   and off frame): its right edge on the mock-up's right edge, centred in the room above the mock-up. Measured again
   when the frame's size changes or the fonts arrive; without room above (a phone), the CSS corner place stays. */
function place(frame, bar) {
  const set = () => {
    const ui = [...frame.querySelectorAll('.ui')].find((el) => !bar.contains(el) && el.offsetParent !== null);
    if (!ui) return;
    const f = frame.getBoundingClientRect(), u = ui.getBoundingClientRect(), h = bar.offsetHeight;
    const room = u.top - f.top;
    if (!h || room < h + 12) { bar.style.removeProperty('--cue-top'); bar.style.removeProperty('--cue-end'); return; }
    bar.style.setProperty('--cue-top', `${Math.round((room - h) / 2)}px`);
    bar.style.setProperty('--cue-end', `${Math.max(0, Math.round(f.right - u.right))}px`);
  };
  set();
  document.fonts?.ready.then(set);
  new ResizeObserver(set).observe(frame);
}

export const slug =(s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** A short, stable hex id from a string (an illustrative event id, never a real one). */
export function hexOf(s) {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).slice(0, 6).padStart(6, '0');
}

/** A small demo in a frame (a card's panel, a hero window): the cue in the frame's top-right corner (cue: false for
    none), the kit's loop stopped on the visitor's first real action, and reset() putting the fragment's markup back
    as it was when first taken over (a demo's own control calls it, "Clear chat"). Clicks and keys are delegated to
    the fragment's root, so a reset (which restores the markup) needs only prepare() again.
      prepare(root)   roles, tab stops and names on the fragment's controls (at load and after a reset)
      match(target)   the control an event landed on, or null
      act(el, event)  what pressing it does
      point(root)     the control "Try it" points at
      keys(e)         optional: other keys (arrows) */
export function demo(frame, root, { invite, prepare, match, act, point, keys, onReset: afterReset, cue: withCue = true }) {
  let taken = false, fresh = true, snap = null;
  const unpoint = () => root.querySelectorAll('.is-pointed').forEach((el) => el.classList.remove('is-pointed'));
  function take(played = true) {
    // the kit puts its finished picture back as it stops (some fragments by rewriting their markup), so the
    // controls are prepared again before the picture is kept for "Reset demo"
    if (!taken) { taken = true; own(root); prepare(root); snap = root.innerHTML; }
    if (played && fresh) { fresh = false; pill?.played(); }
  }
  const start = () => {
    take(false);
    const el = point(root);
    if (!el) return;
    el.focus({ preventScroll: true });
    (el.closest('li') || el).classList.add('is-pointed');
  };
  const reset = () => {
    if (snap == null) return;
    root.innerHTML = snap;
    prepare(root);
    fresh = true;
    pill?.played(false);
    afterReset?.();
  };
  const pill = withCue ? cue(frame, { corner: true, invite, onStart: start }) : null;
  // a mock-up was hidden from assistive technology as a picture; as a demo its controls must be reachable
  for (let el = root; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');
  prepare(root);
  // the kit may rewrite the fragment's markup as it stops (its finished picture): find the same control again
  const go = (el, e) => {
    const all = () => [...root.querySelectorAll('*')];
    const at = all().indexOf(el);
    take();
    if (!el.isConnected && at >= 0) el = all()[at];
    unpoint();
    if (el) act(el, e);
  };
  root.addEventListener('click', (e) => { const el = match(e.target); if (el) go(el, e); });
  root.addEventListener('keydown', (e) => {
    if (keys && keys(e)) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target.closest('button')) return;                   // a real button turns these keys into a click itself
    const el = match(e.target);
    if (!el) return;
    e.preventDefault();
    go(el, e);
  });
  return { take, reset, start };
}

/** "3 of 4" -> "2 of 4": the first number in a phrase the page wrote, replaced (never new words) */
export const renum = (text, n) => text.replace(/\d+/, String(n));

let ids = 0;
export const idFor = (el) => el.id || (el.id = `play-${++ids}`);
