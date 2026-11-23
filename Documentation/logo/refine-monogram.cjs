// Phase 2.2: Monogram refinements. Real fonts shaped by HarfBuzz; symbols as closed paths. Monochrome.
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];
const AR = 'إمكان';

(async () => {
  const hb = await require('harfbuzzjs');
  function shape(file, text, { rtl = false, tracking = 0 } = {}) {
    const blob = hb.createBlob(fs.readFileSync(path.join(__dirname, 'fonts', file)));
    const face = hb.createFace(blob, 0), font = hb.createFont(face), buf = hb.createBuffer();
    buf.addText(text);
    if (rtl) { buf.setDirection('rtl'); buf.setScript('arab'); buf.setLanguage('ar'); } else buf.guessSegmentProperties();
    hb.shape(font, buf);
    const out = buf.json(); const upem = face.upem; let x = 0; const parts = [];
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const g of out) {
      if (g.g === 0) throw new Error(`${file}: missing glyph`);
      const d = font.glyphToPath(g.g);
      if (d) { const ox = x + g.dx, oy = g.dy; parts.push({ d, ox, oy }); const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
        for (let i = 0; i + 1 < n.length; i += 2) { minX = Math.min(minX, n[i] + ox); maxX = Math.max(maxX, n[i] + ox); minY = Math.min(minY, n[i + 1] + oy); maxY = Math.max(maxY, n[i + 1] + oy); } }
      x += g.ax + tracking * upem;
    }
    font.destroy(); face.destroy(); blob.destroy(); buf.destroy();
    return { parts, minX, maxX, minY, maxY };
  }
  function place(sh, h, x, y) {
    const s = h / (sh.maxY - sh.minY);
    const g = sh.parts.map((p) => `<path transform="translate(${(p.ox - sh.minX).toFixed(1)} ${(-p.oy).toFixed(1)})" d="${p.d}"/>`).join('');
    return { svg: `<g transform="translate(${x.toFixed(2)} ${(y + sh.maxY * s).toFixed(2)}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})">${g}</g>`, w: (sh.maxX - sh.minX) * s };
  }
  const SYM = {
    A: { name: 'A. Balanced', d: 'M0 0H24V100H0Z M38 0H100V24L64 50L100 76V100H38Z' },
    B: { name: 'B. Open K', d: 'M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z' },
    C: { name: 'C. Monolith', d: 'M0 0H24V78H38V0H100V24L64 50L100 76V100H0Z' },
  };
  const sym = (k, x, y, size, fill) => `<path transform="translate(${x} ${y}) scale(${(size / 100).toFixed(4)})" d="${SYM[k].d}" fill="${fill}"/>`;
  const TYPE = {
    t1: { name: 'Geist 500, +0.06em, Arabic centred', latin: ['Geist-500.ttf', 0.06], align: 'centre' },
    t2: { name: 'Geist 500, +0.14em, Arabic right-aligned', latin: ['Geist-500.ttf', 0.14], align: 'right' },
  };
  function lockup(k, t, H, fill, x, y) {
    const T = TYPE[t]; const lat = shape(T.latin[0], 'IMKAN', { tracking: T.latin[1] }), ar = shape('IBMPlexSansArabic-500.ttf', AR, { rtl: true });
    const capH = H * 0.42, gap = H * 0.14, arH = H - capH - gap, tx = x + H * 1.3;
    const L = place(lat, capH, tx, y), A0 = place(ar, arH, 0, 0);
    const ax = T.align === 'right' ? tx + L.w - A0.w : tx + (L.w - A0.w) / 2;
    return { svg: `<g fill="${fill}">${sym(k, x, y, H, fill)}${L.svg}${place(ar, arH, ax, y + capH + gap).svg}</g>`, w: tx - x + L.w };
  }
  const INK = '#111', PAPER = '#f4f4f1', W = 1400; let rows = '', y = 30;
  const label = (t, x, yy, size = 18, c = '#666') => `<text x="${x}" y="${yy}" font-family="Segoe UI, sans-serif" font-size="${size}" fill="${c}">${t}</text>`;
  for (const k of ['A', 'B', 'C']) {
    rows += label(SYM[k].name, 40, y + 18);
    const top = y + 36;
    rows += sym(k, 40, top, 140, INK);
    let fx = 220;
    for (const s of [64, 32, 16]) { rows += `<rect x="${fx}" y="${top + 140 - s}" width="${s}" height="${s}" rx="${s * 0.22}" fill="${INK}"/>` + sym(k, fx + s * 0.2, top + 140 - s + s * 0.2, s * 0.6, PAPER); fx += s + 16; }
    // bare symbol at 16 and 24 (no tile), as it sits next to text in a signature
    rows += sym(k, fx + 10, top + 124, 16, INK) + sym(k, fx + 40, top + 116, 24, INK);
    const l1 = lockup(k, 't1', 84, INK, 520, top + 10); rows += l1.svg + label(TYPE.t1.name, 520, top + 128, 13);
    const l2 = lockup(k, 't2', 84, INK, 980, top + 10); rows += l2.svg + label(TYPE.t2.name, 980, top + 128, 13);
    y = top + 170;
  }
  // email signature at real size (logo 44px tall) on white, recommended variant
  rows += label('Email signature at real size (C, type 2)', 40, y + 18);
  rows += `<rect x="40" y="${y + 32}" width="620" height="110" rx="6" fill="#fff" stroke="#ddd"/>`;
  const sg = lockup('C', 't2', 44, INK, 64, y + 64); rows += sg.svg;
  rows += `<line x1="${64 + sg.w + 26}" y1="${y + 60}" x2="${64 + sg.w + 26}" y2="${y + 112}" stroke="#ccc"/>` + label('Felipe Araya', 64 + sg.w + 46, y + 80, 15, '#111') + label('Lead AI Scientist · imkan.ai', 64 + sg.w + 46, y + 101, 13);
  rows += `<rect x="700" y="${y + 32}" width="620" height="110" rx="6" fill="#111"/>` + lockup('C', 't2', 44, PAPER, 724, y + 64).svg;
  y += 170;
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'monogram-refinements.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${y}" width="${W}" height="${y}"><rect width="${W}" height="${y}" fill="${PAPER}"/>${rows}</svg>`);
  console.log('ok', y);
})().catch((e) => { console.error(e.message); process.exit(1); });
