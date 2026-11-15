// Builds the IMKAN logo SVGs from real fonts shaped by HarfBuzz (no hand-drawn letters).
// Setup (outside the repo, so the project gains no dependency):
//   1. a folder with this file, `npm install harfbuzzjs@0.4.7`
//   2. a fonts/ folder beside it holding SchibstedGrotesk-600.ttf and IBMPlexSansArabic-500.ttf
//      (Google Fonts, OFL; static TTFs)
// usage: node build-logo.cjs <outDir>   e.g. site/public/images/logo
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const INK = '#7d0c14';   // --p-ink (oxblood)
const PAPER = '#e2e2e2'; // --p-bg (stone)

(async () => {
  const hb = await require('harfbuzzjs');

  function shape(fontFile, text, opts = {}) {
    const blob = hb.createBlob(fs.readFileSync(path.join(__dirname, 'fonts', fontFile)));
    const face = hb.createFace(blob, 0);
    const font = hb.createFont(face);
    const upem = face.upem;
    const buf = hb.createBuffer();
    buf.addText(text);
    if (opts.rtl) { buf.setDirection('rtl'); buf.setScript('arab'); buf.setLanguage('ar'); }
    else buf.guessSegmentProperties();
    hb.shape(font, buf, opts.features || '');
    const glyphs = buf.json();
    let x = 0; const parts = []; let minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity;
    for (const g of glyphs) {
      const d = font.glyphToPath(g.g);
      if (d) {
        const ox = x + g.dx, oy = g.dy;
        parts.push({ d, ox, oy });
        // bbox from the path's coordinates (control points bound the outline)
        const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
        for (let i = 0; i + 1 < nums.length; i += 2) {
          minX = Math.min(minX, nums[i] + ox); maxX = Math.max(maxX, nums[i] + ox);
          minY = Math.min(minY, nums[i + 1] + oy); maxY = Math.max(maxY, nums[i + 1] + oy);
        }
      }
      x += g.ax + (opts.tracking || 0) * upem;
    }
    font.destroy(); face.destroy(); blob.destroy(); buf.destroy();
    return { parts, upem, minX, maxX, minY, maxY, advance: x };
  }

  // Render shaped text at a given cap/ink height, top-left at (x, y). Returns {svg, w, h}.
  function place(sh, height, x, y) {
    const s = height / (sh.maxY - sh.minY);
    const g = sh.parts.map((p) => `<path transform="translate(${(p.ox - sh.minX).toFixed(1)} ${(-p.oy).toFixed(1)})" d="${p.d}"/>`).join('');
    // font units are y-up: flip, and move the top of the ink to y
    return {
      svg: `<g transform="translate(${x.toFixed(2)} ${(y + sh.maxY * s).toFixed(2)}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})">${g}</g>`,
      w: (sh.maxX - sh.minX) * s,
      h: height,
    };
  }

  // The mark: three bars building upward (widest at the bottom): data, engineering, intelligence.
  function mark(x, y, size) {
    const u = size / 24; const h = 4.2 * u; const r = 1.2 * u;
    const bars = [[8, 3], [14, 9.9], [20, 16.8]]; // [width, y] top to bottom
    return bars.map(([w, by]) => `<rect x="${(x + 2 * u).toFixed(2)}" y="${(y + by * u).toFixed(2)}" width="${(w * u).toFixed(2)}" height="${h.toFixed(2)}" rx="${r.toFixed(2)}"/>`).join('');
  }

  const latin = shape('SchibstedGrotesk-600.ttf', 'IMKAN', { tracking: 0.14 });
  // "إمكان" as escapes: alef with hamza below, meem, kaf, alef, noon
  const AR = 'إمكان';
  const LABEL = 'IMKAN ' + AR;
  const arabic = shape('IBMPlexSansArabic-500.ttf', AR, { rtl: true });

  const files = {};

  // 1. Primary lockup: mark + stacked IMKAN / Ø¥Ù…ÙƒØ§Ù†, left-aligned to the mark's right.
  {
    const capH = 100, gapLines = 30, markSize = 220, pad = 0;
    const lat = place(latin, capH, 0, 0);
    const arH = capH * 1.05;
    const ar = place(arabic, arH, 0, 0);
    const textW = Math.max(lat.w, ar.w);
    const textH = capH + gapLines + arH;
    const markPx = textH; const mx = 0, my = 0;
    const tx = markPx + 56;
    const latSvg = place(latin, capH, tx, 0).svg;
    const arSvg = place(arabic, arH, tx + (lat.w - ar.w) / 2, capH + gapLines).svg;
    const W = tx + textW + pad, H = textH;
    const body = (fill) => `<g fill="${fill}">${mark(mx, my, markPx)}${latSvg}${arSvg}</g>`;
    files['imkan-logo.svg'] = svg(W, H, body(INK), LABEL);
    files['imkan-logo-on-dark.svg'] = svg(W, H, body(PAPER), LABEL);
    files['imkan-logo-mono.svg'] = svg(W, H, body('currentColor'), LABEL);
  }

  // 2. Wordmark only (no mark): IMKAN over Ø¥Ù…ÙƒØ§Ù†, centred.
  {
    const capH = 100, gap = 30, arH = capH * 1.05;
    const lat0 = place(latin, capH, 0, 0), ar0 = place(arabic, arH, 0, 0);
    const W = Math.max(lat0.w, ar0.w);
    const lat = place(latin, capH, (W - lat0.w) / 2, 0), ar = place(arabic, arH, (W - ar0.w) / 2, capH + gap);
    files['imkan-wordmark.svg'] = svg(W, capH + gap + arH, `<g fill="${INK}">${lat.svg}${ar.svg}</g>`, LABEL);
  }

  // 3. Favicon / compact mark: the bars on a rounded stone square.
  {
    const S = 64;
    files['favicon.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><rect width="${S}" height="${S}" rx="14" fill="${INK}"/><g fill="${PAPER}">${mark(6, 7, 52)}</g></svg>\n`;
    files['imkan-mark.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="IMKAN"><g fill="${INK}">${mark(0, 0, 24)}</g></svg>\n`;
  }

  function svg(W, H, inner, label) {
    const m = 2; // a hair of margin so antialiasing is never clipped
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-m} ${-m} ${(W + 2 * m).toFixed(1)} ${(H + 2 * m).toFixed(1)}" role="img" aria-label="${label}">${inner}</svg>\n`;
  }

  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(OUT, name), content);
    console.log(name, (content.length / 1024).toFixed(1) + 'KB');
  }
})();
