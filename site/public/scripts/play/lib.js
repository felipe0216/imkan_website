// Shared helpers for the interactive mock-ups (see /scripts/play.js).

const rmq = matchMedia('(prefers-reduced-motion: reduce)');
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

/** The visible cue every demo shares: a pill just above the frame's right edge. Before the visitor plays it
    invites ("Try it: ..."), pressing it calls onStart (point at the first thing to press); after the first play
    it turns into a reset. Returns { played() } to switch it once the demo has been taken over.
    TODO(wording): the pill's words are proposals (Documentation/wording-changes.md, pending Felipe). */
export function cue(frame, { invite, reset = 'Reset demo', onStart, onReset }) {
  const bar = document.createElement('div');
  bar.className = 'play-cue';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'play-cue__btn';
  const icon = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7-4.5z"/></svg>';
  const icoReset = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8a4.5 4.5 0 1 0 1.4-3.3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 2.5v3h3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  let isPlayed = false;
  const paint = () => {
    btn.innerHTML = `${isPlayed ? icoReset : icon}<span>${isPlayed ? reset : invite}</span>`;
    btn.classList.toggle('is-reset', isPlayed);
  };
  btn.addEventListener('click', () => { if (isPlayed) onReset(); else onStart(); });
  bar.append(btn);
  frame.before(bar);
  paint();
  return { played(on = true) { if (isPlayed !== on) { isPlayed = on; paint(); } } };
}

export const slug =(s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** A short, stable hex id from a string (an illustrative event id, never a real one). */
export function hexOf(s) {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).slice(0, 6).padStart(6, '0');
}
