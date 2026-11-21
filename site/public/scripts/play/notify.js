// "Deploy AI that saves you time": the agent's notes. At rest a new note comes in at the top every 3 s (Felipe,
// 2026-11-21: slower; our own loop, the kit's runs about one a second and has no tempo setting), the oldest leaving.
// Press a note to handle it and it leaves, the others close the gap; once all are handled, the agent brings them
// back one by one, 3 s apart, and the loop goes on. Words: the page's own three notes.
import { demo, reduced, own } from './lib.js';

const EVERY = 3000;

export default function init(frame) {
  const root = frame.querySelector('[data-ui="notify"]');
  if (!root) return;
  const list = () => root.querySelector('[data-notify-list]');
  let batch = null;          // the notes as they were when the visitor took over, to bring back

  // move the remaining notes up smoothly (first, last, invert, play)
  const close = (gone) => {
    const kids = [...list().children].filter((k) => k !== gone);
    const before = kids.map((k) => k.getBoundingClientRect().top);
    gone.remove();
    if (reduced()) return;
    kids.forEach((k, i) => { k.style.transition = 'none'; k.style.transform = `translateY(${before[i] - k.getBoundingClientRect().top}px)`; });
    void root.offsetHeight;
    kids.forEach((k) => { k.style.transition = ''; k.style.transform = ''; });
  };
  // a note slides in at the top (FLIP for the others); with keep set, the oldest leaves at the bottom
  const enter = (li, keep) => {
    const ul = list();
    const kids = [...ul.children];
    const before = kids.map((k) => k.getBoundingClientRect().top);
    const old = keep && kids.length >= keep ? kids[kids.length - 1] : null;
    old?.remove();
    li.classList.remove('is-leave', 'is-pointed');
    if (!reduced()) li.classList.add('is-enter');
    ul.prepend(li);
    prepareNote(li);
    if (!reduced()) {
      kids.forEach((k, i) => { if (k === old) return; k.style.transition = 'none'; k.style.transform = `translateY(${before[i] - k.getBoundingClientRect().top}px)`; });
      void root.offsetHeight;
      kids.forEach((k) => { k.style.transition = ''; k.style.transform = ''; });
      requestAnimationFrame(() => requestAnimationFrame(() => li.classList.remove('is-enter')));
    }
    // the times belong to the places: the newest is always at the top
    [...ul.children].forEach((k, i) => { const t = k.querySelector('time'); if (t && times[i] != null) t.textContent = times[i]; });
  };
  // all handled: the notes come back, oldest first, one every 3 s
  const refill = () => {
    const tmp = document.createElement('ul');
    tmp.innerHTML = batch;
    const back = [...tmp.children].reverse();
    back.forEach((li, i) => setTimeout(() => { if (alive === gen) enter(li); }, reduced() ? 0 : i * EVERY));
  };

  // the loop at rest: our own, so its tempo is ours
  let gen = 0, alive = 0, visible = false, last = -Infinity;
  const times = [...root.querySelectorAll('.ui-note time')].map((t) => t.textContent);
  const cycle = () => {
    if (!visible || document.hidden || reduced() || performance.now() - last < 8000) return;
    const ul = list();
    if (ul.querySelector('.is-leave, .is-enter')) return;
    if (ul.children.length < 3) {
      // the visitor handled some and stopped: a handled note comes back, one at a time
      if (!batch || gen !== alive) return;
      const tmp = document.createElement('ul');
      tmp.innerHTML = batch;
      const have = new Set([...ul.querySelectorAll('.ui-note__title')].map((t) => t.firstChild?.textContent.trim()));
      const li = [...tmp.children].find((n) => !have.has(n.querySelector('.ui-note__title')?.firstChild?.textContent.trim()));
      if (li) { li.querySelector('.ui-note__btn')?.remove(); enter(li); }
      return;
    }
    const li = ul.lastElementChild.cloneNode(true);
    li.querySelector('.ui-note__btn')?.remove();
    enter(li, 3);
  };
  const prepareNote = (li) => {
    const text = li.querySelector('.ui-note__text');
    const title = li.querySelector('.ui-note__title')?.firstChild?.textContent.trim() || '';
    li.classList.add('play-hit');
    if (text) { text.setAttribute('role', 'button'); text.tabIndex = 0; text.setAttribute('aria-label', title); }
    li.querySelector('.ui-note__btn')?.setAttribute('aria-hidden', 'true');
  };

  if (!reduced()) {
    own(root);
    new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }).observe(root);
    setInterval(cycle, EVERY);
  }

  demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: clear a note',
    prepare(r) { r.querySelectorAll('.ui-note').forEach(prepareNote); },
    match: (t) => t.closest('.ui-note'),
    act(li) {
      if (li.classList.contains('is-leave')) return;
      last = performance.now();               // the visitor is playing: the loop waits
      batch ??= list().innerHTML;
      const next = li.nextElementSibling || li.previousElementSibling;
      li.classList.add('is-leave');
      setTimeout(() => {
        close(li);
        next?.querySelector('[role="button"]')?.focus({ preventScroll: true });
        if (!list().children.length) { alive = ++gen; setTimeout(refill, reduced() ? 0 : 500); }
      }, reduced() ? 0 : 260);
    },
    point: (r) => r.querySelector('.ui-note [role="button"]'),
  });
}
