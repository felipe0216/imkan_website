// The hero's pricing agent, as a small chat the visitor can use.
//   - A prompt bar at the bottom of the card. Typing a question and sending it adds the visitor's bubble; the agent
//     shows typing dots, then streams its answer word by word with the sources it used. The conversation scrolls
//     inside a fixed-height area, so the hero never changes height.
//   - Three suggestions above the bar. Pressing one types it into the bar, letter by letter, then sends it.
//   - It is a scripted demo, not a live AI: a typed question is matched to one of the three answers by its words, and
//     anything else gets one honest fallback line. Nothing typed leaves the page.
// The first question and answer are the page's own; the rest are proposals (TODO(wording), pending Felipe).
import { demo, reduced } from './lib.js';

const ASK = [
  null, // the page's own exchange, read from the markup
  {
    q: 'Can you go to 10% off?',
    a: '10% is outside your approved pricing. I can offer <b>6% off</b> today, or pass your request to your account manager.',
    srcs: ['Pricing engine'],
  },
  {
    q: 'Can you deliver 1,000 units by the 10th?',
    a: 'I can confirm <b>600 units</b> for the 10th and the other 400 on the 14th. Shall I hold both?',
    srcs: ['Inventory'],
  },
];
// TODO(wording): proposed, pending Felipe
const FALLBACK = { a: 'I can help with pricing, stock and delivery for your orders. Try one of the suggestions above.', srcs: [] };
const PRICING = { a: 'I can quote within your approved pricing: for example, <b>6% off</b> on 500 units next month. Tell me the quantity and the date.', srcs: ['Pricing engine'] };
const PLACEHOLDER = 'Ask the pricing agent';

// which scripted answer a typed question gets
const route = (text) => {
  const t = text.toLowerCase();
  if (/\d+\s*%|percent|\boff\b/.test(t)) return ASK[1];                        // a percentage asked for
  if (/deliver|delivery|ship|by the|\bstock\b|units by/.test(t)) return ASK[2];   // dates and stock
  if (/500/.test(t) && /better|price|discount|deal|cheaper/.test(t)) return ASK[0];
  if (/better|price|pricing|discount|cheaper|deal|quote|cost/.test(t)) return PRICING;
  return FALLBACK;
};

const SEND_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3.5M3.5 8 8 3.5 12.5 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export default function init(frame) {
  const root = frame.querySelector('[data-ui="chat"]');
  if (!root) return;
  const srcTemplate = root.querySelector('.ui-chat__src')?.cloneNode(true);
  ASK[0] = {
    q: root.querySelector('[data-chat-q] .ui-msg__text')?.textContent.trim() || '',
    a: root.querySelector('.ui-chat__answer')?.innerHTML || '',
    srcs: [...root.querySelectorAll('.ui-chat__src')].map((s) => s.textContent.trim()),
  };
  let token = 0, epoch = 0, busy = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced() ? 0 : ms));
  const body = () => root.querySelector('.ui-chat__body');
  const input = () => root.querySelector('.play-chat__input');
  const toEnd = () => { const b = body(); if (b) b.scrollTo({ top: b.scrollHeight, behavior: reduced() ? 'auto' : 'smooth' }); };

  // the answer's words, each in its own span, so they can arrive one by one (the kit's own .ui-chat__w)
  const spell = (html) => {
    const box = document.createElement('span');
    box.innerHTML = html;
    const words = [];
    const walk = (node) => {
      for (const n of [...node.childNodes]) {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const p of n.textContent.split(/(\s+)/)) {
            if (!p) continue;
            if (/^\s+$/.test(p)) { frag.append(p); continue; }
            const s = document.createElement('span');
            s.className = 'ui-chat__w is-off-full';
            s.textContent = p;
            words.push(s);
            frag.append(s);
          }
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      }
    };
    walk(box);
    return { nodes: [...box.childNodes], words };
  };

  // one exchange: the visitor's bubble, the agent's dots, then its answer and sources
  // a question sent while the agent is still answering waits its turn (it was dropped before)
  let queue = Promise.resolve();
  const send = (text) => {
    const q = text.trim().slice(0, 120);
    if (!q) return;
    const e = epoch;                                   // a reset (a new epoch) drops what was still waiting
    queue = queue.then(() => (e === epoch ? reply(q) : null));
  };
  const reply = async (q) => {
    busy = true;
    const mine = ++token;
    const item = route(q);
    const b = body();
    const me = document.createElement('div');
    me.className = 'ui-msg ui-msg--me';
    const meText = document.createElement('span');
    meText.className = 'ui-msg__text';
    meText.textContent = q;                                   // the visitor's words, as text only
    me.append(meText);
    const bot = document.createElement('div');
    bot.className = 'ui-msg ui-msg--bot';
    bot.innerHTML = '<span class="ui-agent ui-msg__av" aria-hidden="true"></span><span class="ui-msg__col"><span class="play-dots" aria-hidden="true"><i></i><i></i><i></i></span></span>';
    b.append(me, bot);
    toEnd();
    await wait(750);
    if (mine !== token) { busy = false; return; }
    const col = bot.querySelector('.ui-msg__col');
    const answer = document.createElement('span');
    answer.className = 'ui-chat__answer';
    const { nodes, words } = spell(item.a);
    answer.append(...nodes);
    col.replaceChildren(answer);
    toEnd();
    const per = Math.max(35, Math.min(80, 900 / words.length));
    for (const w of words) { w.classList.remove('is-off-full'); await wait(per); if (mine !== token) { busy = false; return; } }
    if (item.srcs.length && srcTemplate) {
      const srcs = document.createElement('span');
      srcs.className = 'ui-chat__srcs';
      for (const name of item.srcs) {
        const s = srcTemplate.cloneNode(true);
        s.lastChild.textContent = name;
        srcs.append(s);
      }
      col.append(srcs);
    }
    // the answer is read out once, whole (not word by word)
    const live = root.querySelector('.play-chat__live');
    if (live) live.textContent = answer.textContent;
    toEnd();
    busy = false;
  };

  // a suggestion types itself into the bar, then sends
  const typeIn = async (text) => {
    const box = input();
    if (!box || typing) return;
    typing = true;
    const mine = token;
    box.value = '';
    for (let i = 1; i <= text.length; i++) {
      box.value = text.slice(0, i);
      await wait(28);
      if (mine !== token) { typing = false; return; }
    }
    await wait(220);
    box.value = '';
    typing = false;
    send(text);
  };
  let typing = false;

  const api = demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: ask the agent',
    prepare(r) {
      // the conversation scrolls: a named region the keyboard can reach to scroll it
      const b = r.querySelector('.ui-chat__body');
      if (b) { b.tabIndex = 0; b.setAttribute('role', 'region'); b.setAttribute('aria-label', 'Conversation'); }   // TODO(wording): proposed
      if (r.querySelector('.play-chat__bar')) return;
      // the suggestions, then the prompt bar, at the bottom of the card
      const suggest = document.createElement('div');
      suggest.className = 'play-chat__suggest';
      suggest.setAttribute('role', 'group');
      suggest.setAttribute('aria-label', 'Suggested questions');    // TODO(wording): proposed, pending Felipe
      ASK.forEach((item) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'play-chat__q';
        b.textContent = item.q;
        suggest.append(b);
      });
      const form = document.createElement('form');
      form.className = 'play-chat__bar';
      form.innerHTML = `<input class="play-chat__input" type="text" maxlength="120" autocomplete="off" placeholder="${PLACEHOLDER}" aria-label="${PLACEHOLDER}"><button class="play-chat__send" type="submit" aria-label="Send">${SEND_ICON}</button>`;
      const live = document.createElement('span');
      live.className = 'play-chat__live sr-only';
      live.setAttribute('aria-live', 'polite');
      r.append(suggest, form, live);
    },
    match: (t) => t.closest('.play-chat__q'),
    act(b) { typeIn(b.textContent); },
    point: (r) => r.querySelector('.play-chat__q:nth-child(2)'),
    onReset() { token++; epoch++; busy = false; typing = false; queue = Promise.resolve(); },
  });
  // sending from the bar (Enter or the arrow); listened for at the root so it survives "Reset demo"
  root.addEventListener('submit', (e) => {
    if (!e.target.matches('.play-chat__bar')) return;
    e.preventDefault();
    api.take();
    const box = input();
    const text = box?.value || '';
    if (box) box.value = '';
    send(text);
  });
  root.addEventListener('input', (e) => { if (e.target.matches('.play-chat__input')) api.take(); });
}
