// Builds the logo pack (Documentation/brand/assets/logos) in the three looks from the kit's own SVGs, so the shapes
// never change (the kit in site/public/brand stays untouched). Then renders every SVG to PNG with Edge or Chrome.
// usage: node Documentation/brand/assets/build-logos.mjs ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const KIT = path.join(ROOT, 'site/public/brand/svg');
const OUT = path.join(HERE, 'logos');
const BROWSER = process.argv[2] || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const C = { bone: '#efece5', ink: '#1b111d', plum: '#5e1654', gold: '#ffc233' };
// the three looks (DECISION_TRACKER 2026-11-24); "ground" is the background colour the look is made for
const LOOKS = {
  light: { kit: 'imkan-lockup.svg', mark: C.plum, text: C.ink, ground: C.bone },
  dark: { kit: 'imkan-lockup-on-dark.svg', mark: C.gold, text: C.bone, ground: C.ink },
  'light-gold': { kit: 'imkan-lockup-gold-ink.svg', mark: C.gold, text: C.ink, ground: C.bone },
};
const K = 'M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z'; // the mark, 100 units tall
const LOCKUP_W = 343.4; // the lockup's drawn width in the kit (viewBox -2 -2 347.4 104)
const CLEAR = 24; // minimum clear space: the I bar's width, 24% of the mark's height (kit README)
const PAD = 40; // the padded files keep more than the minimum

const svg = (vb, w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="IMKAN"><title>IMKAN</title>${body}</svg>\n`;
const inner = (file) => readFileSync(path.join(KIT, file), 'utf8').replace(/^[\s\S]*?<\/title>/, '').replace(/<\/svg>\s*$/, '');

mkdirSync(path.join(OUT, 'svg'), { recursive: true });
mkdirSync(path.join(OUT, 'png'), { recursive: true });
const jobs = [];
// bg: the page colour behind the render, so a file with a background has fully solid edges (no faint frame)
const png = (name, w, h, scale, bg = '') => jobs.push(`${path.join(OUT, 'png', name)}|${path.join(OUT, 'svg', name.replace(/(-\d+)?\.png$/, '.svg'))}|${w}|${h}|${scale}|${bg}`);

for (const [look, l] of Object.entries(LOOKS)) {
  const body = inner(l.kit);
  if (!body.includes(l.mark) || !body.includes(l.text)) throw new Error(`${l.kit} is not the colourway expected for ${look}`);
  // 1. logo, transparent, the kit's own box (2 units of safety around the shapes)
  writeFileSync(path.join(OUT, 'svg', `imkan-logo-${look}.svg`), svg('-2 -2 347.4 104', 347.4, 104, body));
  // 2. logo on its background, with clear space all round
  const bw = LOCKUP_W + 2 * PAD, bh = 100 + 2 * PAD;
  writeFileSync(path.join(OUT, 'svg', `imkan-logo-${look}-bg.svg`),
    svg(`${-PAD} ${-PAD} ${bw} ${bh}`, bw, bh, `<rect x="${-PAD}" y="${-PAD}" width="${bw}" height="${bh}" fill="${l.ground}"/>${body}`));
  // 3. the K alone, transparent
  writeFileSync(path.join(OUT, 'svg', `imkan-mark-${look}.svg`), svg('-2 -2 104 104', 104, 104, `<path fill="${l.mark}" d="${K}"/>`));
  // 4. app and profile icon: the K on a rounded square of its background (the favicon's proportions)
  const tile = (rx) => `<rect width="100" height="100" rx="${rx}" fill="${l.ground}"/><path transform="translate(22 22) scale(0.56)" fill="${l.mark}" d="${K}"/>`;
  writeFileSync(path.join(OUT, 'svg', `imkan-icon-${look}.svg`), svg('0 0 100 100', 100, 100, tile(22)));
  // 5. square profile picture (LinkedIn, WhatsApp, Teams crop it to a circle themselves)
  writeFileSync(path.join(OUT, 'svg', `imkan-avatar-${look}.svg`), svg('0 0 100 100', 100, 100, tile(0)));

  // PNGs: logos 2000px wide (sharp in slides and documents), marks and icons 1024 and 512
  // (whole pixels at scale 1; the SVG keeps its proportions inside)
  png(`imkan-logo-${look}.png`, 2000, Math.round(2000 * 104 / 347.4), 1);
  png(`imkan-logo-${look}-bg.png`, 2400, Math.round(2400 * bh / bw), 1, l.ground);
  png(`imkan-mark-${look}-1024.png`, 1024, 1024, 1);
  png(`imkan-icon-${look}-1024.png`, 1024, 1024, 1);
  png(`imkan-icon-${look}-512.png`, 512, 512, 1);
  png(`imkan-avatar-${look}-1024.png`, 1024, 1024, 1, l.ground);
}

execFileSync('node', [path.join(ROOT, 'Documentation/logo/render-png.mjs'), BROWSER, ...jobs], { stdio: 'inherit' });
console.log(`clear space: at least ${CLEAR} units (the I bar) around the 100-unit mark; padded files use ${PAD}`);
