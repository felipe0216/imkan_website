// Render SVG files to exact-size PNGs (transparent unless bg given) via Chrome DevTools Protocol.
// usage: node render.mjs <chrome> <job> ...   job = out.png|in.svg|cssW|cssH|scale|bg?|pad?
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
const [chromePath, ...jobs] = process.argv.slice(2);
const port = 9334, prof = mkdtempSync(path.join(tmpdir(), 'cdp-'));
const chrome = spawn(chromePath, [`--remote-debugging-port=${port}`, '--headless=new', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
for (const job of jobs) {
  const [out, svgPath, w, h, scale, bg = '', pad = '0'] = job.split('|');
  const W = +w, Hh = +h, p = +pad;
  const svg = readFileSync(svgPath, 'utf8').replace(/ width="[^"]*" height="[^"]*"/, ` width="${W - 2 * p}" height="${Hh - 2 * p}"`);
  const html = `<!doctype html><html><body style="margin:0;background:${bg || 'transparent'};width:${W}px;height:${Hh}px;display:grid;place-items:center">${svg}</body></html>`;
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: Hh, deviceScaleFactor: +scale, mobile: false });
  await send('Page.navigate', { url: 'data:text/html;base64,' + Buffer.from(html).toString('base64') });
  await sleep(300);
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: Hh, scale: 1 } });
  writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log(path.basename(out), `${Math.round(W * scale)}x${Math.round(Hh * scale)}`);
}
ws.close(); chrome.kill();
