// Builds the LinkedIn banners in the three looks (extra brand asset 2, DECISION_TRACKER 2026-11-25): the company page
// cover (1128x191) and a personal profile banner (1584x396), each at 1x and 2x. Laid out in HTML with the site's fonts and
// captured by Edge or Chrome. Wording is the site's own (the headline and its meta title).
//   node Documentation/brand/assets/social/build-banners.mjs ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..');
const BROWSER = process.argv[2] || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const url = (p) => pathToFileURL(path.join(ROOT, p)).href;

const HEADLINE = ['Possibility?', 'Engineered!'];
const LINE = 'AI and data engineering for Saudi enterprises'; // the site's meta title, after "Imkan.ai:"
const K = 'M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z';

// gold is never text on bone: in light-gold the second word stays plum-black and the gold lives in the big K
const LOOKS = {
  light: { bg: '#efece5', ink: '#1b111d', muted: '#4c4150', accent: '#5e1654', k: '#5e1654', kAlpha: 0.08 },
  dark: { bg: '#1b111d', ink: '#efece5', muted: '#cbbccf', accent: '#ffc233', k: '#ffc233', kAlpha: 0.12 },
  'light-gold': { bg: '#efece5', ink: '#1b111d', muted: '#4c4150', accent: '#1b111d', k: '#ffc233', kAlpha: 0.55 },
};
// Safe areas. Company cover: LinkedIn sets the logo over the lower left and phones crop the sides, so the text starts
// at about a third of the width. Personal banner: the profile photo covers the lower left quarter.
const SIZES = {
  company: { w: 1128, h: 191, textLeft: 330, size: 44, line: 15, kH: 300, kRight: -90, kTop: -40, lift: 50 },
  personal: { w: 1584, h: 396, textLeft: 440, size: 70, line: 21, kH: 560, kRight: -210, kTop: -80, lift: 64 },
};

const page = (look, kind) => {
  const L = LOOKS[look], S = SIZES[kind];
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Funnel Display"; src: url("${url('site/public/fonts/funnel-display-400-700-latin.woff2')}") format("woff2"); font-weight: 400 700; }
@font-face { font-family: "Funnel Sans"; src: url("${url('site/public/fonts/funnel-sans-400-600-latin.woff2')}") format("woff2"); font-weight: 400 600; }
html, body { margin: 0; width: ${S.w}px; height: ${S.h}px; overflow: hidden; background: ${L.bg}; }
.k { position: absolute; right: ${S.kRight}px; top: ${S.kTop}px; height: ${S.kH}px; width: ${S.kH}px; opacity: ${L.kAlpha}; }
.text { position: absolute; left: ${S.textLeft}px; top: 50%; transform: translateY(-${S.lift}%); }
h1 { margin: 0; font: 400 ${S.size}px/1 "Funnel Display", sans-serif; letter-spacing: -0.035em; color: ${L.ink}; white-space: nowrap; }
h1 span { color: ${L.accent}; }
p { margin: ${Math.round(S.size * 0.28)}px 0 0; font: 400 ${S.line}px/1.3 "Funnel Sans", sans-serif; color: ${L.muted}; }
</style></head><body>
<svg class="k" viewBox="0 0 100 100" aria-hidden="true"><path fill="${L.k}" d="${K}"/></svg>
<div class="text"><h1>${HEADLINE[0]} <span>${HEADLINE[1]}</span></h1><p>${LINE} · imkan.ai</p></div>
</body></html>`;
};

const TMP = path.join(HERE, '.build');
mkdirSync(TMP, { recursive: true });
mkdirSync(path.join(HERE, 'linkedin'), { recursive: true });
for (const kind of Object.keys(SIZES)) {
  for (const look of Object.keys(LOOKS)) {
    const html = path.join(TMP, `${kind}-${look}.html`);
    writeFileSync(html, page(look, kind));
    for (const scale of [1, 2]) {
      const out = path.join(HERE, 'linkedin', `imkan-linkedin-${kind}-${look}${scale === 2 ? '@2x' : ''}.png`);
      if (existsSync(out)) rmSync(out);
      execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${SIZES[kind].w},${SIZES[kind].h}`, `--force-device-scale-factor=${scale}`,
        '--virtual-time-budget=5000', `--user-data-dir=${path.join(TMP, '.browser')}`, `--screenshot=${out}`, pathToFileURL(html).href], { stdio: 'ignore', timeout: 60_000 });
      if (!existsSync(out)) throw new Error(`no image for ${kind} ${look} ${scale}x`);
    }
    console.log(`${kind} ${look}`);
  }
}
rmSync(TMP, { recursive: true, force: true }); // the HTML holds this computer's file paths: never committed
