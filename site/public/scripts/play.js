// Interactive mock-ups (feature/interactive-demos, experiment). The kit's fragments keep looping as they do;
// a mock-up marked data-play="<name>" gets /scripts/play/<name>.js, which takes the mock-up over from the kit
// on the visitor's first touch. The kit's files are not edited: a demo stops the kit's loop through the
// fragment's own controller (root.__ui.destroy()).
// A demo loads when its mock-up comes within a screen of view, or once the page is idle, whichever is first,
// so a visitor who scrolls fast (or is on a slow connection) does not tap a mock-up that is not ready yet.
const started = new WeakSet();
function start(el) {
  if (started.has(el)) return;
  started.add(el);
  near.unobserve(el);
  const name = el.dataset.play;
  if (!/^[a-z0-9-]+$/.test(name || '')) return;
  import(`/scripts/play/${name}.js`)
    .then((m) => m.default(el))
    .catch((err) => console.warn('play:', name, err));
}

const near = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) start(e.target);
}, { rootMargin: '100% 0px' });

const all = [...document.querySelectorAll('[data-play]')];
all.forEach((el) => near.observe(el));

const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
const whenIdle = () => idle(() => all.forEach(start), { timeout: 3000 });
if (document.readyState === 'complete') whenIdle();
else addEventListener('load', whenIdle, { once: true });
