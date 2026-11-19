// Phase 2.4: IMKAN logo kit (D-017 logo, D-018 palette). Text is outlined, so no font is needed to display it.
// usage: node kit.cjs <outDir>   (needs harfbuzzjs and ./fonts: Geist-500, IBMPlexSansArabic-500)
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];
const AR = '\u0625\u0645\u0643\u0627\u0646';
const SYMBOL = 'M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z';
const C = { ink: '#1b111d', plum: '#5e1654', bone: '#efece5', gold: '#ffc233', night: '#120914' };

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
  const W = tx + L.w, PAD = 2, VW = +(W + 2 * PAD).toFixed(1), VH = H + 2 * PAD;
  const svgOpen = (vw, vh, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-PAD} ${-PAD} ${vw} ${vh}" width="${vw}" height="${vh}" role="img" aria-label="${label}"><title>${label}</title>`;
  const lockup = (sym, text) => `${svgOpen(VW, VH, 'IMKAN')}<path fill="${sym}" d="${SYMBOL}"/><g fill="${text}">${L.svg}${A.svg}</g></svg>\n`;
  const symbol = (fill) => `${svgOpen(104, 104, 'IMKAN')}<path fill="${fill}" d="${SYMBOL}"/></svg>\n`;
  // app icon: symbol centred on a rounded square; the mark is 56% of the tile
  const tile = (bg, fg, r = 0.22) => { const k = 0.56, o = (1 - k) / 2 * 100; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" role="img" aria-label="IMKAN"><title>IMKAN</title><rect width="100" height="100" rx="${r * 100}" fill="${bg}"/><path transform="translate(${o} ${o}) scale(${k})" fill="${fg}" d="${SYMBOL}"/></svg>\n`; };
  const files = {
    'svg/imkan-lockup.svg': lockup(C.plum, C.ink),            // primary, on light grounds
    'svg/imkan-lockup-ink.svg': lockup(C.ink, C.ink),          // one colour, light grounds
    'svg/imkan-lockup-on-dark.svg': lockup(C.gold, C.bone),    // on dark grounds
    'svg/imkan-lockup-bone.svg': lockup(C.bone, C.bone),       // one colour, dark grounds
    'svg/imkan-symbol.svg': symbol(C.plum),
    'svg/imkan-symbol-ink.svg': symbol(C.ink),
    'svg/imkan-symbol-gold.svg': symbol(C.gold),
    'svg/imkan-symbol-bone.svg': symbol(C.bone),
    'svg/imkan-icon-dark.svg': tile(C.night, C.gold),          // favicon, avatar
    'svg/imkan-icon-light.svg': tile(C.bone, C.plum),
    'svg/imkan-avatar-dark.svg': tile(C.night, C.gold, 0),     // square; platforms crop to circle
    'svg/imkan-avatar-light.svg': tile(C.bone, C.plum, 0),
  };
  for (const [f, s] of Object.entries(files)) { fs.mkdirSync(path.dirname(path.join(OUT, f)), { recursive: true }); fs.writeFileSync(path.join(OUT, f), s); }
  console.log(JSON.stringify({ lockupW: VW, lockupH: VH }));
})().catch((e) => { console.error(e.message); process.exit(1); });
