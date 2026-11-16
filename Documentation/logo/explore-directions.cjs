// Phase 2.1: three logo directions in monochrome. Real fonts shaped by HarfBuzz; symbols as closed paths.
// usage: node explore.cjs <outDir>
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];
const AR = 'إمكان'; // إمكان

(async () => {
  const hb = await require('harfbuzzjs');

  function shape(file, text, { rtl = false, tracking = 0 } = {}) {
    const blob = hb.createBlob(fs.readFileSync(path.join(__dirname, 'fonts', file)));
    const face = hb.createFace(blob, 0), font = hb.createFont(face), buf = hb.createBuffer();
    buf.addText(text);
    if (rtl) { buf.setDirection('rtl'); buf.setScript('arab'); buf.setLanguage('ar'); } else buf.guessSegmentProperties();
    hb.shape(font, buf);
    const out = buf.json(); const upem = face.upem;
    let x = 0, notdef = 0; const parts = []; let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const g of out) {
      if (g.g === 0) notdef++;
      const d = font.glyphToPath(g.g);
      if (d) {
        const ox = x + g.dx, oy = g.dy; parts.push({ d, ox, oy });
        const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
        for (let i = 0; i + 1 < n.length; i += 2) { minX = Math.min(minX, n[i] + ox); maxX = Math.max(maxX, n[i] + ox); minY = Math.min(minY, n[i + 1] + oy); maxY = Math.max(maxY, n[i + 1] + oy); }
      }
      x += g.ax + tracking * upem;
    }
    font.destroy(); face.destroy(); blob.destroy(); buf.destroy();
    if (notdef) throw new Error(`${file} is missing ${notdef} glyph(s) for "${text}"`);
    return { parts, minX, maxX, minY, maxY };
  }
  // place shaped text so its ink is `h` tall with its top-left at (x, y)
  function place(sh, h, x, y) {
    const s = h / (sh.maxY - sh.minY);
    const g = sh.parts.map((p) => `<path transform="translate(${(p.ox - sh.minX).toFixed(1)} ${(-p.oy).toFixed(1)})" d="${p.d}"/>`).join('');
    return { svg: `<g transform="translate(${x.toFixed(2)} ${(y + sh.maxY * s).toFixed(2)}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})">${g}</g>`, w: (sh.maxX - sh.minX) * s };
  }
  // capital height of a Latin wordmark = ink height of "IMKAN" (no descenders); Arabic ink includes the hamza below
  const SYMBOLS = {
    threshold: { d: 'M20 100V52C20 30 33 13 50 2C67 13 80 30 80 52V100H64V56C64 44 58 34 50 26C42 34 36 44 36 56V100Z', vb: '0 0 100 100' },
    forward: { d: 'M0 0H26V100H0Z M36 0H100V20L60 50L100 80V100H36Z', vb: '0 0 100 100' },
    strata: { d: 'M52 92H90L100 74H62Z M30 66H82L92 48H40Z M8 40H74L84 22H18Z', vb: '0 0 104 100' },
  };
  const DIRS = [
    { id: 'threshold', name: '1. Threshold', latin: ['ReadexPro-500.ttf', 0.22], arabic: 'ReadexPro-500.ttf' },
    { id: 'forward', name: '2. Monogram', latin: ['Geist-500.ttf', 0.06], arabic: 'IBMPlexSansArabic-500.ttf' },
    { id: 'strata', name: '3. Strata', latin: ['Syne-600.ttf', 0.1], arabic: 'NotoKufiArabic-500.ttf' },
  ];

  const sym = (id, x, y, size, fill) => {
    const s = SYMBOLS[id]; const [, , vw, vh] = s.vb.split(' ').map(Number); const k = size / vh;
    return `<path transform="translate(${x} ${y}) scale(${k.toFixed(4)})" d="${s.d}" fill="${fill}"/>`;
  };
  // horizontal lockup: symbol, then IMKAN over Arabic; returns {svg, w, h} for a given total height
  function lockup(dir, H, fill, x = 0, y = 0) {
    const lat = shape(dir.latin[0], 'IMKAN', { tracking: dir.latin[1] }), ar = shape(dir.arabic, AR, { rtl: true });
    const capH = H * 0.42, gap = H * 0.13, arH = H - capH - gap;
    const symW = H * (SYMBOLS[dir.id].vb.split(' ')[2] / 100);
    const tx = x + symW + H * 0.28;
    const L = place(lat, capH, tx, y); const A0 = place(ar, arH, 0, 0);
    const A = place(ar, arH, tx + (L.w - A0.w) / 2, y + capH + gap);
    return { svg: `<g fill="${fill}">${sym(dir.id, x, y, H, fill)}${L.svg}${A.svg}</g>`, w: tx - x + L.w, h: H };
  }

  fs.mkdirSync(OUT, { recursive: true });
  const INK = '#111111', PAPER = '#f4f4f1';
  let rows = '', y = 40; const W = 1400;
  for (const dir of DIRS) {
    // label
    rows += `<text x="40" y="${y + 18}" font-family="Segoe UI, sans-serif" font-size="18" fill="#666">${dir.name}</text>`;
    const top = y + 40;
    rows += sym(dir.id, 40, top, 150, INK);                                  // big symbol
    const big = lockup(dir, 96, INK, 240, top + 27); rows += big.svg;        // lockup, large
    const mid = lockup(dir, 44, INK, 240 + big.w + 70, top + 53); rows += mid.svg; // nav size
    // favicon: symbol on a rounded square, at 64, 32 and 16
    let fx = 240 + big.w + 70 + mid.w + 70;
    for (const s of [64, 32, 16]) { rows += `<rect x="${fx}" y="${top + 120 - s}" width="${s}" height="${s}" rx="${s * 0.22}" fill="${INK}"/>` + sym(dir.id, fx + s * 0.18, top + 120 - s + s * 0.18, s * 0.64, PAPER); fx += s + 18; }
    // email signature mock on white and on dark
    const sigY = top + 175;
    rows += `<rect x="40" y="${sigY}" width="560" height="120" rx="6" fill="#ffffff" stroke="#ddd"/>`;
    const sg = lockup(dir, 40, INK, 60, sigY + 22); rows += sg.svg;
    rows += `<line x1="${60 + sg.w + 24}" y1="${sigY + 20}" x2="${60 + sg.w + 24}" y2="${sigY + 64}" stroke="#ccc"/>`;
    rows += `<text x="${60 + sg.w + 44}" y="${sigY + 38}" font-family="Segoe UI, sans-serif" font-size="15" fill="#111">Felipe Araya</text><text x="${60 + sg.w + 44}" y="${sigY + 58}" font-family="Segoe UI, sans-serif" font-size="13" fill="#666">Lead AI Scientist · imkan.ai</text>`;
    rows += `<rect x="640" y="${sigY}" width="560" height="120" rx="6" fill="#111"/>`;
    rows += lockup(dir, 40, PAPER, 660, sigY + 22).svg;
    y = sigY + 160;
  }
  const sheet = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${y}" width="${W}" height="${y}"><rect width="${W}" height="${y}" fill="${PAPER}"/>${rows}</svg>`;
  fs.writeFileSync(path.join(OUT, 'logo-directions.svg'), sheet);
  // each direction's lockup and symbol on its own, for later steps
  for (const dir of DIRS) {
    const l = lockup(dir, 100, INK);
    fs.writeFileSync(path.join(OUT, `${dir.id}-lockup.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ${(l.w + 4).toFixed(1)} 104">${l.svg}</svg>`);
    fs.writeFileSync(path.join(OUT, `${dir.id}-symbol.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SYMBOLS[dir.id].vb}"><path d="${SYMBOLS[dir.id].d}" fill="${INK}"/></svg>`);
  }
  console.log('ok', y);
})().catch((e) => { console.error(e.message); process.exit(1); });
