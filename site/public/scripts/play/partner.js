// "A partner, not a vendor" (Evolve), round 2 (Felipe, 2026-11-21: a console running commands "does not make sense").
// The card's promise as a picture: what happens to the value of the work after go-live.
//   - A chart over time with a "Go-live" line. A Vendor / Partner switch: with a vendor the line sags after go-live,
//     with a partner it keeps climbing. The other future stays as a faint ghost line, so the gap between them shows.
//   - As the line draws, three moments are marked on it and listed below, in step: what goes wrong without support,
//     or what support does (the partner's are the console's own checks: freshness, drift, usage, alerts).
//   - At rest it switches by itself every few seconds; a press takes over, and untouched for a while it plays again.
// Illustrative: no numbers on either axis. Without scripts the kit's console shows as before. New words are
// TODO(wording) proposals, pending Felipe.
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe
const T = {
  invite: 'Try it: compare the two',
  title: 'After go-live',
  vendor: 'Vendor', partner: 'Partner',
  switch: 'Who supports it after go-live',
  golive: 'Go-live',
  value: 'Value', time: 'Time',
  say: { partner: 'Value keeps growing after go-live.', vendor: 'Value fades after the hand-off.' },
  events: {
    partner: ['Drift caught, model retrained', 'Pipelines kept on time', 'New reports as needs change'],
    vendor: ['The model drifts, nobody notices', 'A pipeline breaks, the data goes stale', 'The team stops using it'],
  },
};
// the chart (viewBox 0 0 360 160): one shared climb to go-live, then two futures
const PRE = 'M24 138 C 60 134, 96 118, 132 96';
const AFTER = {
  partner: 'C 168 86, 196 70, 228 58 S 300 30, 344 16',
  vendor: 'C 164 90, 196 96, 228 106 S 300 126, 344 132',
};
const DOTS = { partner: [[176, 81], [248, 50], [322, 23]], vendor: [[180, 92], [258, 115], [326, 129]] };
const EVERY = 4500;   // the self-playing pace: long enough to draw the line and read its three moments
const IDLE = 9000;

export default function init(frame) {
  const kit = frame.querySelector('[data-ui="terminal-run"]');
  if (!kit) return;
  own(kit);
  for (let el = kit; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');

  const box = document.createElement('div');
  box.className = 'ui ui-panel play-pv';
  box.innerHTML = `
    <div class="play-pv__head"><div class="ui-title">${T.title}</div><span class="ui-spacer"></span>
      <div class="play-pv__switch" role="group" aria-label="${T.switch}">
        <button type="button" data-who="vendor" aria-pressed="false">${T.vendor}</button>
        <button type="button" data-who="partner" aria-pressed="true">${T.partner}</button>
      </div></div>
    <div class="play-pv__chart">
      <svg viewBox="0 0 360 160" role="img" aria-hidden="true" focusable="false">
        <defs><linearGradient id="play-pv-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity="0.18"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
        <path class="play-pv__grid" d="M24 146 H344 M24 146 V8"/>
        <path class="play-pv__go" d="M132 10 V146"/>
        <text class="play-pv__golabel" x="138" y="18">${T.golive}</text>
        <text class="play-pv__axis" x="344" y="158" text-anchor="end">${T.time}</text>
        <text class="play-pv__axis" x="20" y="14" text-anchor="end" transform="rotate(-90 20 14)">${T.value}</text>
        <path class="play-pv__ghost" data-for="partner" d="${PRE} ${AFTER.partner}"/>
        <path class="play-pv__ghost" data-for="vendor" d="${PRE} ${AFTER.vendor}"/>
        <path class="play-pv__area" d=""/>
        <path class="play-pv__line" d=""/>
        <g class="play-pv__dots"></g>
      </svg>
    </div>
    <p class="play-pv__say" aria-live="polite"></p>
    <ol class="play-pv__events"></ol>`;
  kit.replaceWith(box);
  const svg = box.querySelector('svg');
  const line = box.querySelector('.play-pv__line');
  const area = box.querySelector('.play-pv__area');
  const dots = box.querySelector('.play-pv__dots');
  const say = box.querySelector('.play-pv__say');
  const list = box.querySelector('.play-pv__events');
  const btns = [...box.querySelectorAll('[data-who]')];

  let who = 'partner', run = 0;
  const show = (w) => {
    who = w;
    const me = ++run;
    box.dataset.who = w;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.who === w)));
    svg.querySelectorAll('.play-pv__ghost').forEach((g) => g.classList.toggle('is-other', g.dataset.for !== w));
    const d = `${PRE} ${AFTER[w]}`;
    line.setAttribute('d', d);
    area.setAttribute('d', `${d} L344 146 L24 146 Z`);
    say.textContent = T.say[w];
    dots.innerHTML = DOTS[w].map(([x, y], i) => `<g class="play-pv__dot" data-i="${i}" transform="translate(${x} ${y})"><circle r="9"/><text y="3.6" text-anchor="middle">${i + 1}</text></g>`).join('');
    list.innerHTML = T.events[w].map((e, i) => `<li data-i="${i}"><span class="play-pv__n" aria-hidden="true">${i + 1}</span>${e}</li>`).join('');
    // the line draws itself from go-live on; the moments light up as the line reaches them
    const len = line.getTotalLength();
    if (reduced()) { box.querySelectorAll('[data-i]').forEach((el) => el.classList.add('is-on')); return; }
    line.style.transition = 'none';
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len * 0.62}`;
    area.style.opacity = '0';
    void line.getBoundingClientRect();
    line.style.transition = 'stroke-dashoffset 1400ms cubic-bezier(0.33, 1, 0.68, 1)';
    line.style.strokeDashoffset = '0';
    area.style.opacity = '1';
    [500, 900, 1300].forEach((t, i) => setTimeout(() => {
      if (me !== run) return;
      box.querySelectorAll(`[data-i="${i}"]`).forEach((el) => el.classList.add('is-on'));
    }, t));
  };

  let touched = -Infinity, visible = false, played = false;
  setInterval(() => {
    if (!visible || document.hidden || reduced() || performance.now() - touched < IDLE) return;
    show(who === 'partner' ? 'vendor' : 'partner');
  }, EVERY);
  new IntersectionObserver((es) => {
    const was = visible;
    visible = es.some((e) => e.isIntersecting);
    if (visible && !was && performance.now() - touched > IDLE) show(who);   // drawn again as it comes into view
  }, { threshold: 0.5 }).observe(box);
  box.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-who]');
    if (!b) return;
    touched = performance.now();
    if (!played) { played = true; pill.played(); }
    show(b.dataset.who);
  });
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { const v = btns[0]; v.focus({ preventScroll: true }); v.click(); } });
  show('partner');
}
