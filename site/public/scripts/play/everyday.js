// "Make your data work for you", round 2 (Felipe, 2026-11-22: show that we work with whatever a client already has,
// older and less technical systems included, so they see value quickly without a pile of new tech to learn).
// The card says: spreadsheets here, systems there, numbers that never match; here is how scattered data becomes one
// source of truth. So the demo:
//   - five everyday sources, as a client really has them: an Excel workbook, an inbox of email orders, a folder of
//     PDF invoices, an accounting system that has run for years, scanned paper forms;
//   - at first "March sales" has three different answers, one per place that keeps it;
//   - press a source to plug it in, as it is: it flies into the one view, a line says how it was read (nothing
//     replaced, no new template), and the answers converge; all five in, one number, checked;
//   - "Nothing to replace. Nothing new to learn." stays under it all.
// At rest it plays itself (a source every 3 s); a press takes over, and untouched for a while it plays again.
// The figures are illustrative. Without scripts the kit's sources grid shows as before. Every word is a
// TODO(wording) proposal, pending Felipe.
import { own, cue, reduced, stacked } from './lib.js';

// TODO(wording): proposed, pending Felipe. Figures illustrative.
const ICON = {
  xls: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5" fill="#1f7a47"/><path d="m9 8.5 6 7M15 8.5l-6 7" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="#2f5d9e"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8.5L19 7.5V21H6z" fill="#b3412e"/><path d="M14.5 3v4.5H19" fill="#e9a092"/><text x="12.4" y="17" text-anchor="middle" font-size="5.6" font-weight="700" fill="#fff" font-family="system-ui, sans-serif">PDF</text></svg>',
  ledger: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="2" fill="#6b5a45"/><path d="M3.5 9h17M3.5 14h17M10 4v16" stroke="#e8dfd2" stroke-width="1.3"/></svg>',
  paper: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11v17h-11z" fill="#f4efe6" stroke="#8a7c68" stroke-width="1.2" transform="rotate(-4 12 12)"/><path d="M9 8h6M9 11h6M9 14h4" stroke="#8a7c68" stroke-width="1.2" stroke-linecap="round" transform="rotate(-4 12 12)"/><path d="M9.5 17.5c1-1 1.8 1 2.8 0s1.6-1 2.4 0" fill="none" stroke="#2f5d9e" stroke-width="1.1" stroke-linecap="round" transform="rotate(-4 12 12)"/></svg>',
};
const SOURCES = [
  { icon: 'xls', name: 'Sales_final_v3.xlsx', sub: 'The team’s Excel workbook', how: 'Read as it is. No new template to fill in.' },
  { icon: 'mail', name: 'Orders inbox', sub: 'Customers order by email', how: 'Orders picked up from the emails themselves.' },
  { icon: 'pdf', name: 'Invoices folder', sub: 'PDFs on a shared drive', how: 'Amounts read from each invoice. Nobody retypes them.' },
  { icon: 'ledger', name: 'Accounting system', sub: 'Running since 2012', how: 'Connected as it is. Nothing replaced, nothing migrated.' },
  { icon: 'paper', name: 'Delivery forms', sub: 'Signed on paper, scanned', how: 'Scanned forms read and matched to their orders.' },
];
// "March sales" as each place keeps it, until the sources are joined
const VERSIONS = [
  { where: 'Excel', v: '51,300' },
  { where: 'Accounting', v: '46,900' },
  { where: 'Sales team', v: '49,800' },
];
const TRUE = '48,650';
const T = {
  invite: 'Try it: plug in a source',
  title: 'Your data today',
  view: 'March sales',
  versions: (n) => (n === 1 ? '1 version of the truth' : `${n} versions of the truth`),
  plug: 'Plug in',
  joined: 'Plugged in',
  one: 'One number, from all five sources',
  checked: 'Checked against every source',
  motto: 'Nothing to replace. Nothing new to learn.',
  again: 'Start again',
  list: 'Where your data lives',
};
const EVERY = 3000;
const IDLE = 9000;

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="files"]');
  if (!kit) return;
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  const box = document.createElement('div');
  box.className = 'ui ui-panel play-ev';
  box.innerHTML = `
    <div class="play-ev__head"><div class="ui-title">${T.title}</div><span class="ui-spacer"></span><span class="play-ev__count" data-ev-count></span></div>
    <div class="play-ev__body">
      <ul class="play-ev__list" aria-label="${T.list}">${SOURCES.map((s, i) => `
        <li><button type="button" class="play-ev__src" data-i="${i}" aria-pressed="false">
          <span class="play-ev__ico">${ICON[s.icon]}</span>
          <span class="play-ev__txt"><span class="play-ev__name">${s.name}</span><span class="play-ev__sub">${s.sub}</span></span>
          <span class="play-ev__plug"><span class="play-ev__plug-off">${T.plug}</span><span class="play-ev__plug-on">${T.joined}</span></span>
        </button></li>`).join('')}
      </ul>
      <div class="play-ev__view" role="status" aria-live="polite">
        <span class="play-ev__label">${T.view}</span>
        <div class="play-ev__answers">${VERSIONS.map((v, i) => `<span class="play-ev__ans" data-v="${i}"><b>${v.v}</b><small>${v.where}</small></span>`).join('')}
          <span class="play-ev__ans play-ev__true"><b>${TRUE}</b><small>${T.one}</small></span></div>
        <span class="play-ev__how"></span>
        <span class="play-ev__ok"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>${T.checked}</span>
      </div>
    </div>
    <div class="play-ev__foot"><span class="play-ev__motto">${T.motto}</span><button type="button" class="play-ev__again" hidden>${T.again}</button></div>`;
  kit.replaceWith(box);
  const srcs = [...box.querySelectorAll('.play-ev__src')];
  const view = box.querySelector('.play-ev__view');
  const how = box.querySelector('.play-ev__how');
  const count = box.querySelector('[data-ev-count]');
  const again = box.querySelector('.play-ev__again');

  let joined = new Set();
  const flying = new Set();     // sources on their way in: several can fly at once, so quick taps are never lost
  // how many answers "March sales" still has: three apart, two once most sources are in, one with all five
  const versions = () => (joined.size >= SOURCES.length ? 1 : joined.size >= 3 ? 2 : 3);
  const paint = () => {
    const v = versions();
    box.dataset.versions = String(v);
    count.textContent = T.versions(v);
    srcs.forEach((b, i) => { const on = joined.has(i); b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    box.classList.toggle('is-one', v === 1);
    again.hidden = v !== 1;
  };
  // the source's icon flies into the one view
  const fly = (b) => {
    const ico = b.querySelector('.play-ev__ico');
    if (reduced() || !ico.animate) return Promise.resolve();
    const a = ico.getBoundingClientRect(), t = view.getBoundingClientRect();
    const g = ico.cloneNode(true);
    g.className = 'play-ev__fly';
    g.setAttribute('aria-hidden', 'true');
    Object.assign(g.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
    document.body.append(g);
    const dx = t.left + t.width / 2 - (a.left + a.width / 2), dy = t.top + 40 - (a.top + a.height / 2);
    return g.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 30}px) scale(1.2)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.4)`, opacity: 0 },
    ], { duration: 700, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' }).finished.then(() => g.remove(), () => g.remove());
  };
  const plug = async (i) => {
    if (joined.has(i) || flying.has(i)) return;
    flying.add(i);
    const b = srcs[i];
    b.classList.add('is-going');
    await fly(b);
    b.classList.remove('is-going');
    flying.delete(i);
    joined.add(i);
    how.textContent = SOURCES[i].how;
    how.classList.remove('is-pop'); void how.offsetWidth; how.classList.add('is-pop');
    paint();
  };
  const reset = () => { if (flying.size) return; joined = new Set(); how.textContent = ''; paint(); };

  let touched = -Infinity, visible = false, played = false;
  box.addEventListener('click', (e) => {
    const b = e.target.closest('.play-ev__src');
    if (b) { touched = performance.now(); if (!played) { played = true; pill.played(); } plug(+b.dataset.i); return; }
    if (e.target.closest('.play-ev__again')) { touched = performance.now(); reset(); srcs[0].focus({ preventScroll: true }); }
  });
  setInterval(() => {
    if (!visible || document.hidden || reduced() || flying.size || performance.now() - touched < IDLE) return;
    if (joined.size >= SOURCES.length) { reset(); return; }
    plug(SOURCES.findIndex((_, i) => !joined.has(i)));
  }, EVERY);
  new IntersectionObserver((es) => { visible = es.some((e) => e.isIntersecting); }, { threshold: 0.5 }).observe(box);
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { const b = srcs.find((_, i) => !joined.has(i)); b?.focus({ preventScroll: true }); b?.classList.add('is-pointed'); } });
  paint();
  // the card keeps its tallest height (the longest line under the answer, the "Start again" button shown)
  const settle = () => {
    box.style.minBlockSize = '';
    const was = [how.textContent, again.hidden];
    how.textContent = SOURCES.map((s) => s.how).sort((a, b) => b.length - a.length)[0]; again.hidden = false;
    const h = box.offsetHeight;
    [how.textContent, again.hidden] = was;
    // on a phone the card fits its content and grows with a longer message; side by side it keeps the tallest
    box.style.minBlockSize = stacked() ? '' : `${Math.ceil(h)}px`;
  };
  settle();
  document.fonts?.ready.then(settle);
  let lastW = 0;
  new ResizeObserver(() => { const w = Math.round(box.getBoundingClientRect().width); if (w && w !== lastW) { lastW = w; settle(); } }).observe(box);
}
