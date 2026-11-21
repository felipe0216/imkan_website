// The voice agent (Why us), round 2 (Felipe, 2026-11-21: "I can't hear anything or do anything"): a short call you
// can actually hear. Press play (the call bar's button, the orb, or the cue) and the browser's own voice says the
// caller's question, then the agent's answer, the words lighting up as they are spoken, the waveform moving, the
// call clock running. An English / Arabic switch replays the call in the other language.
//   - Speech is the browser's built-in speechSynthesis: no package, no audio files, nothing sent anywhere.
//   - A device with no voice for the language still plays the call as captions, and says so.
//   - It starts only when the visitor presses play (browsers allow speech only after a press), and stops when the
//     frame leaves the screen or the tab is hidden.
// The agent's English line is the page's own; the caller's question and the Arabic lines are proposals
// (TODO(wording), pending Felipe; the Arabic needs a native check, O-006).
import { own, cue, reduced } from './lib.js';

// TODO(wording): proposed, pending Felipe (Arabic: pending a native speaker's check)
const CALL = {
  en: { caller: 'Hi, did you receive my invoice from last week?', agent: null /* the page's caption */ },
  ar: { caller: 'مرحبا، هل استلمتم فاتورتي من الأسبوع الماضي؟', agent: 'نعم، تم استلام فاتورتك وتسجيلها. هل هناك شيء آخر يمكنني التحقق منه؟' },
};
const T = {
  invite: 'Try it: hear the agent',
  play: 'Play the call', stop: 'Stop the call',
  caller: 'Caller', agent: 'Agent',
  lang: 'Language of the call',
  noVoice: { en: 'No English voice on this device: captions only.', ar: 'No Arabic voice on this device: captions only.' },
};
const LANG = { en: ['en-GB', 'en-US', 'en'], ar: ['ar-SA', 'ar'] };
const ICON = {
  play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 3.5v9l7-4.5z" fill="currentColor"/></svg>',
  stop: '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4.5" y="4.5" width="7" height="7" rx="1.2" fill="currentColor"/></svg>',
};

const synth = typeof speechSynthesis !== 'undefined' ? speechSynthesis : null;
const voicesFor = (lang) => {
  const all = synth ? synth.getVoices() : [];
  for (const tag of LANG[lang]) {
    const hits = all.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(tag.toLowerCase()));
    if (hits.length) {
      // the better voices first: the natural / online ones, then the device's default
      return hits.sort((a, b) => (/natural|online|neural|premium|enhanced/i.test(b.name) - /natural|online|neural|premium|enhanced/i.test(a.name)) || (b.localService - a.localService));
    }
  }
  return [];
};

export default function init(frame) {
  const root = frame.querySelector('[data-ui="voice"]');
  if (!root) return;
  for (let el = root; el && el !== frame; el = el.parentElement) el.removeAttribute('aria-hidden');
  const cap = root.querySelector('[data-voice-cap]');
  const orb = root.querySelector('[data-voice-orb]');
  const timeEl = root.querySelector('[data-voice-time]');
  const btn0 = root.querySelector('.ui-voice__btn:not(.ui-voice__end)');
  if (!cap || !btn0) return;
  CALL.en.agent = cap.textContent.trim();

  // the call card, taken over: a language switch in its top bar, the caller's line above the agent's caption,
  // the call bar's first button a real play / stop button
  let lang = 'en', playing = false, run = 0, taken = false;
  const top = root.querySelector('.ui-voice__top');
  const sw = document.createElement('div');
  sw.className = 'play-voice__lang';
  sw.setAttribute('role', 'group');
  sw.setAttribute('aria-label', T.lang);
  sw.innerHTML = '<button type="button" data-lang="en" aria-pressed="true">EN</button><button type="button" data-lang="ar" aria-pressed="false" lang="ar">عربي</button>';
  top?.querySelector('.ui-spacer')?.after(sw);
  const said = document.createElement('div');
  said.className = 'play-voice__said';
  said.setAttribute('aria-live', 'polite');
  const note = document.createElement('p');
  note.className = 'play-voice__note';
  note.hidden = true;
  cap.replaceWith(said);
  said.after(note);
  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'ui-voice__btn play-voice__play';
  btn0.replaceWith(play);
  root.classList.add('play-voice');

  const words = (text) => text.split(/\s+/).filter(Boolean);
  const esc = (w) => w.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  // the transcript: the caller's line and the agent's, each word a span that lights up when it is spoken
  const paint = (upTo = { caller: 99, agent: 99 }, who = null) => {
    const c = CALL[lang];
    const line = (k) => `<p class="play-voice__line play-voice__line--${k}${who === k ? ' is-now' : ''}" lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
      <span class="play-voice__who">${T[k]}</span>
      <span class="play-voice__text">${words(c[k]).map((w, i) => `<span${i < upTo[k] ? '' : ' class="is-off"'}>${esc(w)}</span>`).join(' ')}</span></p>`;
    said.innerHTML = line('caller') + line('agent');
  };
  const paintBtn = () => {
    play.innerHTML = playing ? ICON.stop : ICON.play;
    play.setAttribute('aria-label', playing ? T.stop : T.play);
    play.classList.toggle('is-on', playing);
  };

  // the call's clock
  const m0 = (timeEl?.textContent.trim() || '').match(/^(\d+):(\d{2})$/);
  let secs = m0 ? +m0[1] * 60 + +m0[2] : null, tick = 0;
  const clock = () => { if (secs == null || !timeEl) return; timeEl.textContent = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`; };

  // one line, spoken: resolves when it has been said (or stopped). Without a voice, or if the browser never starts
  // speaking, the words light up on a clock instead, at about a speaking pace.
  const sayLine = (who, me) => new Promise((done) => {
    const text = CALL[lang][who];
    const n = words(text).length;
    const voices = voicesFor(lang);
    let k = 0, fallback = null, finished = false;
    const show = (j) => { k = Math.max(k, j); if (me === run) paint({ caller: who === 'caller' ? k : 99, agent: who === 'agent' ? k : 0 }, who); };
    const end = () => { if (finished) return; finished = true; clearInterval(fallback); clearTimeout(guard); if (me === run) show(n); done(); };
    const byClock = () => {
      if (fallback || finished) return;
      const per = lang === 'ar' ? 420 : 340;
      fallback = setInterval(() => { if (me !== run) { end(); return; } show(k + 1); if (k >= n) setTimeout(end, 500); }, reduced() ? 0 : per);
    };
    show(0);
    if (!synth || !voices.length) { note.hidden = false; note.textContent = T.noVoice[lang]; byClock(); return; }
    note.hidden = true;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voices[0].lang;
    // two voices when the device has them, else the same voice at two pitches: the caller lower, the agent brighter
    u.voice = who === 'caller' && voices[1] ? voices[1] : voices[0];
    u.pitch = who === 'caller' ? 0.9 : 1.05;
    u.rate = 1;
    // the words light up as the voice reaches them (charIndex); engines that send no word events get the clock
    const starts = []; let at = 0;
    for (const w of words(text)) { at = text.indexOf(w, at); starts.push(at); at += w.length; }
    let gotBoundary = false;
    u.onboundary = (e) => { if (e.name && e.name !== 'word') return; gotBoundary = true; show(starts.filter((s) => s <= e.charIndex).length); };
    u.onstart = () => { clearTimeout(guard); setTimeout(() => { if (!gotBoundary) byClock(); }, 700); };
    u.onend = end;
    u.onerror = () => { byClock(); };
    const guard = setTimeout(byClock, 1500);   // the voice never started (no audio device, a blocked engine)
    synth.speak(u);
  });

  const stop = () => {
    run++;
    playing = false;
    synth?.cancel();
    clearInterval(tick);
    root.classList.remove('is-talking');
    paint();
    paintBtn();
  };
  const start = async () => {
    if (!taken) { taken = true; own(root); pill.played(); }
    synth?.cancel();
    const me = ++run;
    playing = true;
    paintBtn();
    clearInterval(tick);
    tick = setInterval(() => { if (secs != null) { secs++; clock(); } }, 1000);
    root.classList.add('is-talking');
    await sayLine('caller', me);
    if (me !== run) return;
    await new Promise((r) => setTimeout(r, reduced() ? 0 : 350));
    if (me !== run) return;
    await sayLine('agent', me);
    if (me !== run) return;
    playing = false;
    clearInterval(tick);
    root.classList.remove('is-talking');
    paintBtn();
  };
  const toggle = () => (playing ? stop() : start());

  play.addEventListener('click', toggle);
  orb?.setAttribute('role', 'button');
  orb?.setAttribute('aria-label', T.play);
  if (orb) {
    orb.tabIndex = 0;
    orb.classList.add('play-hit');
    orb.addEventListener('click', toggle);
    orb.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  }
  sw.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (!b || b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    sw.querySelectorAll('[data-lang]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    start();                                   // the call again, in the other language
  });
  // the call stops when it leaves the screen or the tab is hidden
  new IntersectionObserver((es) => { if (playing && !es.some((x) => x.isIntersecting)) stop(); }).observe(root);
  document.addEventListener('visibilitychange', () => { if (document.hidden && playing) stop(); });
  synth?.getVoices();                          // some engines load their voices on the first ask
  paint();
  paintBtn();
  const pill = cue(frame, { corner: true, invite: T.invite, onStart: () => { start(); play.focus({ preventScroll: true }); } });
}
