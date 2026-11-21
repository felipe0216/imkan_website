// "Deploy AI that saves you time": the agent's notes. Press a note to handle it and it leaves, the others close
// the gap; once all are handled, the agent brings the next ones in, one by one (the kit's own entrance).
// Words: the page's own three notes.
import { demo, reduced } from './lib.js';

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
  const refill = () => {
    const ul = list();
    const tmp = document.createElement('ul');
    tmp.innerHTML = batch;
    [...tmp.children].forEach((li, i) => {
      if (!reduced()) li.classList.add('is-enter');
      ul.append(li);
      prepareNote(li);
      setTimeout(() => li.classList.remove('is-enter'), reduced() ? 0 : 60 + i * 180);
    });
  };
  const prepareNote = (li) => {
    const text = li.querySelector('.ui-note__text');
    const title = li.querySelector('.ui-note__title')?.firstChild?.textContent.trim() || '';
    li.classList.add('play-hit');
    if (text) { text.setAttribute('role', 'button'); text.tabIndex = 0; text.setAttribute('aria-label', title); }
    li.querySelector('.ui-note__btn')?.setAttribute('aria-hidden', 'true');
  };

  demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: clear a note',
    prepare(r) { r.querySelectorAll('.ui-note').forEach(prepareNote); },
    match: (t) => t.closest('.ui-note'),
    act(li) {
      if (li.classList.contains('is-leave')) return;
      batch ??= list().innerHTML;
      const next = li.nextElementSibling || li.previousElementSibling;
      li.classList.add('is-leave');
      setTimeout(() => {
        close(li);
        next?.querySelector('[role="button"]')?.focus({ preventScroll: true });
        if (!list().children.length) setTimeout(refill, reduced() ? 0 : 500);
      }, reduced() ? 0 : 260);
    },
    point: (r) => r.querySelector('.ui-note [role="button"]'),
  });
}
