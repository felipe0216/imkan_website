// Screenshot QA for the interactive demos (D-033): what a person sees, in every engine, before and after playing.
// For each engine (Chromium as installed Chrome, Firefox, WebKit) and each width (desktop, phone) it loads the page
// fresh at that size (never resized after load: the kit decides "phone or not" once, at load), captures the demo
// at rest, mid-run and finished, and tiles everything into one labelled contact sheet that a person reviews.
//
//   node scripts/qa-shots.mjs [baseURL] [outDir]
//   defaults: http://localhost:4173 (npm run build, then npm run preview -- --port 4173), ../Documentation/qa/visual
//
// Screenshots only: the pass/fail checks live in tests/play.spec.ts. This is the look, which tests cannot judge.
import { chromium, firefox, webkit } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const BASE = process.argv[2] || 'http://localhost:4173';
const OUT = resolve(process.argv[3] || '../Documentation/qa/visual');
mkdirSync(OUT, { recursive: true });

// PW_CHANNEL=msedge uses Edge (the same Chromium engine) when Chrome is not installed
const CHANNEL = process.env.PW_CHANNEL || 'chrome';
const ENGINES = [[CHANNEL, chromium, { channel: CHANNEL }], ['firefox', firefox, {}], ['webkit', webkit, {}]];
const SIZES = [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]];

// one entry per demo: the page, the demo's frame, and the steps a visitor takes
const DEMOS = [
  {
    name: 'anomalies', path: '/', frame: '#platform .app',
    steps: [
      ['at rest (cue)', async () => {}],
      ['"Try it" pressed', async (p) => { await p.locator('#platform .play-cue__btn').click(); await p.waitForTimeout(900); }],
      ['investigating', async (p) => { await p.locator('#platform [data-row]').first().click(); await p.waitForTimeout(1300); }],
      ['verdict', async (p) => { await p.locator('#platform .play-verdict').waitFor({ state: 'visible', timeout: 25000 }); await p.waitForTimeout(300); }],
      ['decided: next starts', async (p) => { await p.locator('#platform .play-act--escalate').click(); await p.waitForTimeout(4200); }],
    ],
  },
  // demos in a frame: at rest, "Try it", played, reset (the shared pattern in scripts/play/lib.js, demo())
  ...[
    ['roadmap', '/', '#services [data-play="roadmap"]', ['.play-rm__go'], 2400],
    ['ask-why', '/', '#methodology [data-play="why"]', ['.play-why__btn', '.play-why__btn', '.play-why__btn'], 900],
    ['partner', '/', '#methodology [data-play="partner"]', ['[data-who="vendor"]'], 1800],
    ['proof', '/', '#why-us [data-play="proof"]', async (p, f) => { await p.locator(`${f} .play-pf__slide input`).fill('8'); }, 1600],
    ['voice', '/', '#why-us [data-play="voice"]', ['.play-voice__play'], 2500],
    ['sources', '/', '#services [data-play="files"]', ['.ui-file:nth-child(2)', '.ui-file:nth-child(5)']],
    ['sales-review', '/', '#services [data-play="toggles"]', ['.ui-tg:nth-child(4)', '.ui-tg:nth-child(1)']],
    ['stack', '/', '#methodology [data-play="integrations"]', ['.ui-app:nth-child(1) .ui-app__on']],
    ['application', '/careers/', '.hero__window[data-play="checklist"]', ['.ui-check:nth-child(2)', '.ui-check:nth-child(3)']],
    ['notes', '/', '#services [data-play="notify"]', ['.ui-note:nth-child(1)', '.ui-note:nth-child(1)']],
    ['roles', '/careers/', '[data-play="roles"]', ['.ui-note:nth-child(2)']],
    ['chat', '/', '.hero__window[data-play="chat"]', async (p, f) => { await p.locator(`${f} .play-chat__q`).nth(1).click(); await p.waitForTimeout(3400); await p.locator(`${f} .play-chat__input`).fill('Any discount for 2,000 units?'); await p.keyboard.press('Enter'); }, 2600],
  ].map(([name, path, frame, presses, after = 900]) => ({
    name, path, frame, top: '.card',
    steps: [
      ['at rest (cue)', async () => {}],
      ['"Try it" pressed', async (p) => { await p.locator(`${frame} .play-cue__btn, ${frame} .play-chat__ctl`).first().click(); await p.waitForTimeout(500); }],
      ['played', async (p) => {
        if (typeof presses === 'function') await presses(p, frame);
        else for (const sel of presses) { await p.locator(`${frame} ${sel}`).first().click(); await p.waitForTimeout(300); }
        await p.waitForTimeout(after);
      }],
    ],
  })),
];

const ONLY = process.env.QA_ONLY ? process.env.QA_ONLY.split(',') : null;
if (ONLY) DEMOS.splice(0, DEMOS.length, ...DEMOS.filter((d) => ONLY.includes(d.name)));
const shots = [];
for (const [ename, engine, launch] of ENGINES) {
  const browser = await engine.launch(launch);
  for (const [sname, viewport] of SIZES) {
    for (const demo of DEMOS) {
      const ctx = await browser.newContext({ viewport, hasTouch: sname === 'phone', deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      await p.goto(BASE + demo.path, { waitUntil: 'load' });
      await p.evaluate(() => document.fonts.ready);
      const frame = p.locator(demo.frame);
      await frame.scrollIntoViewIfNeeded();
      await p.waitForTimeout(1500);
      for (const [label, act] of demo.steps) {
        await act(p);
        // the demo's section from its top, just under the sticky navigation, so the heading, the cue above the
        // frame and the frame are all in the picture (the first version scrolled the cue under the navigation)
        // a framed demo: from its card's top (or the frame's own, outside a card), 24px under the navigation
        await p.evaluate(([sel, top]) => {
          const f = document.querySelector(sel);
          const el = (top && f.closest(top)) || (top ? f : f.closest('section'));
          const nav = document.querySelector('.nav')?.getBoundingClientRect().height || 72;
          scrollTo(0, el.getBoundingClientRect().top + scrollY - nav - (top ? 24 : 0));
        }, [demo.frame, demo.top || null]);
        await p.waitForTimeout(200);
        const file = `${OUT}/demo-${demo.name}-${ename}-${sname}-${shots.filter((s) => s.key === `${demo.name}-${ename}-${sname}`).length}.png`;
        await p.screenshot({ path: file });
        shots.push({ key: `${demo.name}-${ename}-${sname}`, demo: demo.name, ename, sname, label, file });
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log('captured', ename);
}

// the contact sheet: one row per engine and size, one column per step
for (const demo of DEMOS) {
  const rows = ENGINES.flatMap(([e]) => SIZES.map(([s]) => shots.filter((x) => x.demo === demo.name && x.ename === e && x.sname === s)));
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:24px;background:#fff;font:14px/1.4 system-ui,sans-serif;color:#222}
    h1{font-size:20px;margin:0 0 16px} .row{display:flex;gap:16px;margin-bottom:24px;align-items:flex-start}
    .lab{width:120px;flex:none;font-weight:600} figure{margin:0} figcaption{margin-bottom:6px;color:#555}
    img{display:block;border:1px solid #ccc} .desktop img{width:520px} .phone img{width:240px}
  </style><h1>Demo QA: ${demo.name} (${new Date().toISOString().slice(0, 10)})</h1>
  ${rows.map((r) => `<div class="row ${r[0].sname}"><div class="lab">${r[0].ename}<br>${r[0].sname}</div>${r.map((s) => `<figure><figcaption>${s.label}</figcaption><img src="${basename(s.file)}"></figure>`).join('')}</div>`).join('')}`;
  const sheet = `${OUT}/demo-${demo.name}-sheet.html`;
  writeFileSync(sheet, html);
  const b = await chromium.launch({ channel: CHANNEL });
  const p = await b.newPage({ viewport: { width: 1800, height: 900 } });
  await p.goto('file:///' + sheet.replace(/\\/g, '/'));
  await p.waitForLoadState('load');
  await p.screenshot({ path: `${OUT}/demo-${demo.name}-sheet.png`, fullPage: true });
  await b.close();
  console.log('sheet', `${OUT}/demo-${demo.name}-sheet.png`);
}
