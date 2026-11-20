// The hero's pricing agent: three suggested questions under the chat. Pressing one asks it; the agent types its
// answer word by word and shows the sources it used. One exchange at a time, so the hero never grows.
// The first question and answer are the page's own; the other two are proposals (TODO(wording), pending Felipe):
// they show what the page already says the agent does, quoting within approved pricing.
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

export default function init(frame) {
  const root = frame.querySelector('[data-ui="chat"]');
  if (!root) return;
  const qEl = () => root.querySelector('[data-chat-q] .ui-msg__text');
  const aEl = () => root.querySelector('.ui-chat__answer');
  const srcsEl = () => root.querySelector('.ui-chat__srcs');
  ASK[0] = {
    q: qEl()?.textContent.trim() || '',
    a: aEl()?.innerHTML || '',
    srcs: [...root.querySelectorAll('.ui-chat__src')].map((s) => s.textContent.trim()),
  };
  let token = 0;

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

  const ask = async (i) => {
    const item = ASK[i];
    const mine = ++token;
    const wait = (ms) => new Promise((r) => setTimeout(r, reduced() ? 0 : ms));
    press(i);
    const q = qEl(), a = aEl(), srcs = srcsEl();
    if (!q || !a) return;
    q.textContent = item.q;
    const { nodes, words } = spell(item.a);
    a.replaceChildren(...nodes);
    srcs?.classList.add('is-hidden');
    root.classList.add('is-typing');
    await wait(780);
    if (mine !== token) return;
    root.classList.remove('is-typing');
    const per = Math.max(40, Math.min(90, 900 / words.length));
    for (const w of words) { w.classList.remove('is-off-full'); await wait(per); if (mine !== token) return; }
    if (srcs) {
      srcs.querySelectorAll('.ui-chat__src').forEach((s) => { s.hidden = !item.srcs.includes(s.textContent.trim()); });
      srcs.classList.remove('is-hidden');
    }
  };

  // the suggested questions: one row under the chat, in the hero's frame (not inside the chat card: in the card's
  // 400px they took two rows and pushed the chat past the first screen of a 900px-tall laptop)
  const row = document.createElement('div');
  row.className = 'play-chat__ask';
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', 'Ask the pricing agent');   // TODO(wording): proposed, pending Felipe
  ASK.forEach((item, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'play-chat__q';
    b.textContent = item.q;
    b.setAttribute('aria-pressed', String(i === 0));
    row.append(b);
  });
  (root.closest('.ly-piece') || root).after(row);
  const press = (i) => row.querySelectorAll('.play-chat__q').forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));

  const api = demo(frame, root, {
    // TODO(wording): proposed, pending Felipe
    invite: 'Try it: ask the agent',
    prepare(r) { r.querySelector('.ui-chat__answer')?.closest('.ui-msg__col')?.setAttribute('aria-live', 'polite'); },
    match: () => null,
    act() {},
    point: () => row.querySelector('.play-chat__q:nth-child(2)'),
    onReset() { token++; press(0); row.querySelectorAll('.is-pointed').forEach((b) => b.classList.remove('is-pointed')); },
  });
  row.addEventListener('click', (e) => {
    const b = e.target.closest('.play-chat__q');
    if (!b) return;
    api.take();
    b.classList.remove('is-pointed');
    ask([...row.children].indexOf(b));
  });
}
