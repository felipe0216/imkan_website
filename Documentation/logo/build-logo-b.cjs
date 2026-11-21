// The chosen logo (D-017): B. Open K, lettering type 2. Writes currentColor SVGs for previews.
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];
const AR = 'إمكان';
const SYMBOL = 'M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z';

(async () => {
  const hb = await require('harfbuzzjs');
  function shape(file, text, { rtl = false, tracking = 0 } = {}) {
    const blob = hb.createBlob(fs.readFileSync(path.join(__dirname, 'fonts', file)));
    const face = hb.createFace(blob, 0), font = hb.createFont(face), buf = hb.createBuffer();
    buf.addText(text);
    if (rtl) { buf.setDirection('rtl'); buf.setScript('arab'); buf.setLanguage('ar'); } else buf.guessSegmentProperties();
    hb.shape(font, buf);
    let x = 0; const parts = []; let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const g of buf.json()) {
      if (g.g === 0) throw new Error(`${file}: missing glyph`);
      const d = font.glyphToPath(g.g);
      if (d) { const ox = x + g.dx, oy = g.dy; parts.push({ d, ox, oy }); const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
        for (let i = 0; i + 1 < n.length; i += 2) { minX = Math.min(minX, n[i] + ox); maxX = Math.max(maxX, n[i] + ox); minY = Math.min(minY, n[i + 1] + oy); maxY = Math.max(maxY, n[i + 1] + oy); } }
      x += g.ax + tracking * face.upem;
    }
    font.destroy(); face.destroy(); blob.destroy(); buf.destroy();
    return { parts, minX, maxX, minY, maxY };
  }
  function place(sh, h, x, y) {
    const s = h / (sh.maxY - sh.minY);
    const g = sh.parts.map((p) => `<path transform="translate(${(p.ox - sh.minX).toFixed(1)} ${(-p.oy).toFixed(1)})" d="${p.d}"/>`).join('');
    return { svg: `<g transform="translate(${x.toFixed(2)} ${(y + sh.maxY * s).toFixed(2)}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})">${g}</g>`, w: (sh.maxX - sh.minX) * s };
  }
  const H = 100, capH = H * 0.42, gap = H * 0.14, arH = H - capH - gap, tx = H * 1.3;
  const lat = shape('Geist-500.ttf', 'IMKAN', { tracking: 0.14 }), ar = shape('IBMPlexSansArabic-500.ttf', AR, { rtl: true });
  const L = place(lat, capH, tx, 0), A0 = place(ar, arH, 0, 0), A = place(ar, arH, tx + L.w - A0.w, capH + gap);
  const W = tx + L.w;
  fs.mkdirSync(OUT, { recursive: true });
  const svg = (inner, w, h, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ${(w + 4).toFixed(1)} ${h + 4}" role="img" aria-label="${label}">${inner}</svg>\n`;
  fs.writeFileSync(path.join(OUT, 'lockup.svg'), svg(`<g fill="currentColor"><path d="${SYMBOL}"/>${L.svg}${A.svg}</g>`, W, H, 'IMKAN ' + AR));
  fs.writeFileSync(path.join(OUT, 'symbol.svg'), svg(`<path fill="currentColor" d="${SYMBOL}"/>`, 100, 100, 'IMKAN'));
  console.log('lockup', W.toFixed(1), 'x', H);
})().catch((e) => { console.error(e.message); process.exit(1); });
