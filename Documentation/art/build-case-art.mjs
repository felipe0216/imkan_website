// Case-study illustrations (ADR 0009): one line drawing per case, redrawn from the old images'
// subjects in the new style. Two colourways each: "-stone" for the oxblood band, "-ink" for light pages.
// usage: node Documentation/art/build-case-art.mjs site/public/images/work
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2] || 'site/public/images/work';
const COLOURS = { stone: { line: '#e2e2e2', soft: 'rgba(226,226,226,.28)', fill: 'rgba(226,226,226,.08)' },
                  ink: { line: '#7d0c14', soft: 'rgba(125,12,20,.28)', fill: 'rgba(125,12,20,.06)' } };

// Each drawing is SVG markup on a 480x320 artboard using L (line), S (soft line) and F (fill) colours.
const ART = {
  'banking-fraud-detection-in-real-time': `
    ${[0,1,2,3,4,5,6].map(i => `<path d="M40 ${70 + i * 28}h${[180,150,200,120,190,160,140][i]}" stroke="S"/>`).join('')}
    <rect x="34" y="${70 + 3 * 28 - 10}" width="140" height="20" rx="4" fill="F" stroke="L"/>
    <path d="M300 70l70 26v54c0 46-30 74-70 92-40-18-70-46-70-92V96z" stroke="L" fill="F"/>
    <rect x="276" y="140" width="48" height="40" rx="6" stroke="L"/>
    <path d="M284 140v-12a16 16 0 0 1 32 0v12" stroke="L"/><circle cx="300" cy="160" r="4" fill="L"/>
    <path d="M174 154h56" stroke="L" stroke-dasharray="4 6"/>`,
  'smart-lead-scoring-for-property-sales': `
    <path d="M70 250V150l90-70 90 70v100z" stroke="L" fill="F"/><path d="M140 250v-56h40v56" stroke="L"/>
    <rect x="96" y="160" width="28" height="24" stroke="S"/><rect x="196" y="160" width="28" height="24" stroke="S"/>
    <path d="M300 230a90 90 0 0 1 150 0" stroke="S"/><path d="M300 230a90 90 0 0 1 120-70" stroke="L" stroke-width="6" stroke-linecap="round"/>
    <path d="M375 230l38-52" stroke="L"/><circle cx="375" cy="230" r="6" fill="L"/>
    <path d="M300 262h150" stroke="S"/>`,
  'route-optimization-for-last-mile-delivery': `
    ${[0,1,2,3,4].map(i => `<path d="M40 ${60 + i * 50}h400" stroke="S"/><path d="M${60 + i * 90} 40v240" stroke="S"/>`).join('')}
    <path d="M70 250L150 170 240 200 330 110 410 80" stroke="L" stroke-width="2.5" fill="none"/>
    ${[[70,250],[150,170],[240,200],[330,110],[410,80]].map(([x,y],i) => `<circle cx="${x}" cy="${y}" r="${i === 4 ? 9 : 6}" fill="${i === 4 ? 'L' : 'none'}" stroke="L"/>`).join('')}
    <path d="M70 250L240 200" stroke="S" stroke-dasharray="4 6"/>`,
  'credit-risk-scoring-with-machine-learning': `
    <rect x="40" y="90" width="170" height="110" rx="12" stroke="L" fill="F"/><path d="M40 122h170" stroke="L"/>
    <rect x="58" y="146" width="34" height="24" rx="4" stroke="S"/><path d="M110 178h80" stroke="S"/>
    ${[60,90,120,75,140,110,165].map((h,i) => `<rect x="${250 + i * 28}" y="${250 - h}" width="16" height="${h}" fill="${h > 125 ? 'L' : 'F'}" stroke="L"/>`).join('')}
    <path d="M240 125h210" stroke="L" stroke-dasharray="6 6"/>`,
  'demand-forecasting-for-retail-inventory': `
    ${[0,1,2].map(r => `<path d="M40 ${120 + r * 60}h180" stroke="L"/>` + [0,1,2,3].map(c => `<rect x="${50 + c * 42}" y="${120 + r * 60 - 34}" width="30" height="30" rx="3" stroke="S" fill="${(r + c) % 3 ? 'none' : 'F'}"/>`).join('')).join('')}
    <path d="M260 230L300 200 340 214 380 170" stroke="L" stroke-width="2.5" fill="none"/>
    <path d="M380 170L420 140 450 120" stroke="L" stroke-width="2.5" stroke-dasharray="6 6" fill="none"/>
    <path d="M380 150L450 98V146L380 190z" fill="F" stroke="S"/><path d="M250 260h210" stroke="S"/>`,
  'travel-booking-data-transformation': `
    <path d="M40 90c40 0 40 60 80 60s40-80 80-40-30 70 10 90" stroke="S" fill="none"/>
    <path d="M40 150c50 30 70-60 110-20s20 70 50 60" stroke="S" fill="none"/>
    <path d="M40 210c40-50 90 30 120-10s40 30 40 30" stroke="S" fill="none"/>
    <rect x="210" y="110" width="60" height="100" rx="8" stroke="L" fill="F"/>
    ${[0,1,2].map(i => `<path d="M270 ${130 + i * 30}h180" stroke="L"/>`).join('')}
    <path d="M360 70l40 18-40 18-8-8 14-10-30-4z" fill="L"/>`,
  'real-time-feature-store-for-banking-ai': `
    ${[0,1,2].map(i => `<ellipse cx="150" cy="${100 + i * 50}" rx="80" ry="18" stroke="L" fill="F"/><path d="M70 ${100 + i * 50}v40M230 ${100 + i * 50}v40" stroke="L"/>`).join('')}
    <ellipse cx="150" cy="240" rx="80" ry="18" stroke="L"/>
    ${[0,1,2,3].map(i => `<rect x="290" y="${80 + i * 46}" width="150" height="30" rx="15" stroke="L" fill="${i === 1 ? 'F' : 'none'}"/><circle cx="308" cy="${95 + i * 46}" r="5" fill="L"/>`).join('')}
    <path d="M230 150h60" stroke="L" stroke-dasharray="4 6"/>`,
  'real-time-analytics-for-travel-bookings': `
    <rect x="40" y="60" width="400" height="200" rx="10" stroke="L" fill="F"/>
    ${[0,1,2,3,4].map(i => `<path d="M60 ${100 + i * 34}h90" stroke="S"/><path d="M180 ${100 + i * 34}h60" stroke="S"/><rect x="${280 + (i % 2) * 40}" y="${92 + i * 34}" width="${100 - (i % 2) * 40}" height="16" rx="3" fill="${i === 2 ? 'L' : 'none'}" stroke="L"/>`).join('')}`,
  'enterprise-data-foundation-for-retail': `
    ${[0,1,2,3].map(i => `<path d="M${240} ${90 + i * 44}l${150 - i * 10} ${-0}" stroke="none"/><path d="M90 ${230 - i * 44}l150 -40 150 40 -150 40z" stroke="L" fill="${i === 3 ? 'F' : 'none'}"/>`).join('')}
    <path d="M90 230v12l150 40 150-40v-12" stroke="S" fill="none"/>`,
  'clinical-ai-safety-and-validation': `
    <path d="M40 170h90l20-50 30 110 26-90 18 30h96" stroke="L" stroke-width="2.5" fill="none"/>
    <path d="M370 80l60 22v46c0 40-26 64-60 80-34-16-60-40-60-80v-46z" stroke="L" fill="F"/>
    <path d="M346 150l18 18 34-38" stroke="L" stroke-width="3" fill="none"/><path d="M40 250h400" stroke="S"/>`,
  'ai-agents-for-customer-negotiations': `
    <rect x="40" y="70" width="220" height="80" rx="16" stroke="L" fill="F"/><path d="M80 150l-14 26 40-26" stroke="L" fill="F"/>
    <path d="M64 100h150M64 122h110" stroke="S"/>
    <rect x="200" y="180" width="220" height="70" rx="16" stroke="L"/><path d="M380 250l14 22-40-22" stroke="L"/>
    <path d="M224 206h120M224 226h80" stroke="S"/>
    <path d="M330 70h80l30 30-50 50-60-60z" stroke="L" fill="F"/><circle cx="350" cy="90" r="6" stroke="L"/>`,
};

mkdirSync(OUT, { recursive: true });
for (const [slug, body] of Object.entries(ART)) {
  for (const [name, c] of Object.entries(COLOURS)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body
      .replace(/"L"/g, `"${c.line}"`).replace(/"S"/g, `"${c.soft}"`).replace(/"F"/g, `"${c.fill}"`).replace(/\s+/g, ' ')}</svg>\n`;
    writeFileSync(join(OUT, `${slug}-${name}.svg`), svg);
  }
}
console.log(`${Object.keys(ART).length} cases x ${Object.keys(COLOURS).length} colourways -> ${OUT}`);
