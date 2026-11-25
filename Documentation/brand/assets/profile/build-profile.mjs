// Builds the two-page company profile (A4, PDF) in the three looks: a page laid out in HTML with the site's own fonts,
// printed to PDF by Edge or Chrome. Item 1 of the extra brand assets (DECISION_TRACKER 2026-11-25).
// All wording is the live site's (site/index.html, site/work/*); labels the site does not have are logged in
// Documentation/wording-changes.md for Felipe's review. Edit the CONTENT block, then rebuild:
//   node Documentation/brand/assets/profile/build-profile.mjs ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..');
const BROWSER = process.argv[2] || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const url = (p) => pathToFileURL(path.join(ROOT, p)).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- wording: copied from the live site; "new" marks a label the site does not have (logged for review) ----
const CONTENT = {
  eyebrow: 'Company profile', // new
  headline: ['Possibility?', 'Engineered!'],
  lead: 'Production-grade data platforms, agentic AI and intelligent automation, aligned with Vision 2030.',
  servicesTitle: 'We work with leaders ready to act on Data & AI',
  servicesLead: 'Not sure where to start? Stuck after strategy? We meet you where you are and move you forward.',
  steps: [
    ['Step 1', 'Build a strategy worth executing', 'Everyone says to "become data-driven", but no one shows you the first move. Here is how a real data strategy actually begins, and where it should take you.'],
    ['Step 2', 'Make your data work for you', 'Spreadsheets here, systems there, numbers that never match. We turn them into one source of truth on the tools you already use: nothing you do not need, and simple for your team to adopt.'],
    ['Step 3', 'Deploy AI & automations that save you time', 'If your team spends hours copying, checking, and chasing information, that is work software can do. Here is how to spot it and hand it off.'],
  ],
  industriesLabel: 'Industries', // new
  industries: ['Banking & Financial Services', 'Logistics & Delivery', 'Real Estate & PropTech', 'Retail & E-commerce', 'Healthcare & Clinical AI', 'Customer Service & AI Agents', 'Travel & Tourism'],
  statement: 'Engineering Without Friction.',
  statementBody: 'No account managers. No junior-only teams. No endless discovery phases. Just senior engineers building production-grade systems aligned with Vision 2030.',
  advantageTitle: 'The imkan.ai Advantage',
  advantages: [
    ['Prove Before You Pay', '6-8 weeks free', 'We spend 6-8 weeks on one of your real use cases, completely free, and hand you a working solution. You only commit once you have seen measurable results.'],
    ['We Meet You Where You Are', 'Zero disruption', 'No dedicated tech team or complex infrastructure? No problem. We build smart solutions on top of the tools you already know, then train your team to own them.'],
    ['Founders at the Front', '100% founder oversight', 'Every project is led directly by our founders and senior engineers, from strategy through production. No account managers, no junior-only teams, no hand-offs.'],
    ['Agentic AI Pioneers', '24/7 · Arabic & English', 'We go beyond dashboards. We build AI that reads documents, answers questions in plain language, and handles real work in Arabic and English, around the clock.'],
    ['Built for the Kingdom', '100% data in KSA', 'Saudi-ready from day one. Your data stays in the Kingdom, PDPL, NCA, and CITC compliance is built in, and every solution advances your Vision 2030 goals.'],
    ['Proven Accelerators', '15+ deployments', 'Reusable components refined across 15+ production deployments mean no greenfield. Your first working version ships in weeks, and budget goes to what sets you apart.'],
  ],
  methodTitle: 'Context First',
  method: [
    ['Think', 'Start with the right problem', 'Before we touch any technology, we get clear on the decision you actually want to improve.'],
    ['Build', 'Build on what you already own', 'We build on the tools and infrastructure you already pay for, so your team adopts it naturally.'],
    ['Evolve', 'A partner, not a vendor', 'We stay on to support and improve well after delivery, so your investment keeps paying off long after go-live.'],
  ],
  impactTitle: 'Proven Impact',
  impactFigure: '15+',
  impactLine: 'production-grade AI and data solutions.',
  impactBody: 'Delivering measurable results across banking, logistics, healthcare, and beyond.',
  casesTitle: 'Production Systems',
  cases: ['Banking Fraud Detection in Real-Time', 'Real-Time Feature Store for Banking AI', 'Credit Risk Scoring with Machine Learning', 'AI Agents for Customer Negotiations',
    'Clinical AI Safety & Validation', 'Demand Forecasting for Retail Inventory', 'Enterprise Data Foundation for Retail', 'Route Optimization for Last-Mile Delivery',
    'Smart Lead Scoring for Property Sales', 'Real-Time Analytics for Travel Bookings', 'Travel Booking Data Transformation'],
  teamTitle: 'Architects of Intelligence',
  teamLead: 'Talent bridging the gap between academic research and industrial application.',
  team: [
    ['Felipe Araya', 'Lead AI Scientist', 'Leads AI innovation from research to production: generative AI, autonomous agent systems, MLOps and model monitoring.', 'site/public/images/team/felipe-araya-400.webp'],
    ['Dr. Syed Fawad Ali', 'Lead Data Engineer', 'Builds enterprise data foundations from the ground up: data strategy, modern warehousing, ETL/ELT pipelines and data quality.', 'site/public/images/team/syed-fawad-ali-400.webp'],
  ],
  contactTitle: 'Get in Touch',
  contact: [['info@imkan.ai', 'mailto:info@imkan.ai'], ['imkan.ai', 'https://www.imkan.ai/'], ['linkedin.com/company/imkan-ai', 'https://www.linkedin.com/company/imkan-ai']],
};

// ---- the looks: the site's tokens. Gold is never text on bone (1.6:1): in light-gold it is a fill with plum-black text ----
const T = { bone: '#efece5', surface: '#e3ded3', ink: '#1b111d', muted: '#4c4150', plum: '#5e1654', gold: '#ffc233', frame: '#271d29', lilac: '#cbbccf', line: 'rgba(27,17,29,.14)', lineDark: 'rgba(239,236,229,.14)' };
const LOOKS = {
  light: { title: 'Light', bg: T.bone, surface: T.surface, ink: T.ink, muted: T.muted, accent: T.plum, line: T.line, chipBg: 'transparent', chipInk: T.plum, chipLine: 'rgba(94,22,84,.35)', logo: 'light', figure: T.plum, figureBg: 'transparent', figureInk: T.plum },
  dark: { title: 'Dark', bg: T.ink, surface: T.frame, ink: T.bone, muted: T.lilac, accent: T.gold, line: T.lineDark, chipBg: 'transparent', chipInk: T.gold, chipLine: 'rgba(255,194,51,.45)', logo: 'dark', figure: T.gold, figureBg: 'transparent', figureInk: T.gold },
  'light-gold': { title: 'Light with gold', bg: T.bone, surface: T.surface, ink: T.ink, muted: T.muted, accent: T.ink, line: T.line, chipBg: T.gold, chipInk: T.ink, chipLine: T.gold, logo: 'light-gold', figure: T.ink, figureBg: T.gold, figureInk: T.ink },
};

function page(look) {
  const L = LOOKS[look]; const C = CONTENT;
  const logo = url(`Documentation/brand/assets/logos/svg/imkan-logo-${L.logo}.svg`);
  const chip = (t) => `<span class="chip">${esc(t)}</span>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Imkan.ai company profile, ${esc(L.title.toLowerCase())}</title>
<style>
@font-face { font-family: "Funnel Display"; src: url("${url('site/public/fonts/funnel-display-400-700-latin.woff2')}") format("woff2"); font-weight: 400 700; }
@font-face { font-family: "Funnel Sans"; src: url("${url('site/public/fonts/funnel-sans-400-600-latin.woff2')}") format("woff2"); font-weight: 400 600; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Funnel Sans", sans-serif; color: ${L.ink}; background: ${L.bg}; font-size: 8.6pt; line-height: 1.42; }
.page { width: 210mm; height: 297mm; padding: 15mm 16mm 13mm; display: flex; flex-direction: column; background: ${L.bg}; overflow: hidden; break-after: page; position: relative; }
.page:last-child { break-after: auto; }
h1, h2, h3, .display { font-family: "Funnel Display", sans-serif; font-weight: 400; letter-spacing: -0.02em; }
.top { display: flex; justify-content: space-between; align-items: flex-end; }
.top img { height: 10.5mm; display: block; }
.top .site { color: ${L.muted}; font-size: 8pt; }
.eyebrow { color: ${L.muted}; font-size: 8pt; letter-spacing: .08em; text-transform: uppercase; }
h1 { font-size: 46pt; line-height: .98; letter-spacing: -0.035em; margin-top: 3mm; }
h1 .accent { color: ${look === 'light-gold' ? L.ink : L.accent}; }
.lead { font-size: 12.5pt; line-height: 1.35; color: ${L.muted}; max-width: 150mm; margin-top: 5mm; }
h2 { font-size: 17pt; line-height: 1.1; }
.sub { color: ${L.muted}; margin-top: 1.8mm; font-size: 9.2pt; max-width: 150mm; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: 5mm; }
.card { background: ${L.surface}; border-radius: 3mm; padding: 4.5mm 4.5mm 5mm; }
.step { color: ${L.accent}; font-size: 7.6pt; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
${look === 'light-gold' ? `.step { display: inline-block; background: ${T.gold}; color: ${T.ink}; padding: .5mm 2mm; border-radius: 1mm; }` : ''}
.card h3 { font-size: 12pt; line-height: 1.15; margin: 2mm 0 2mm; }
.card p { color: ${L.muted}; }
.chips { display: flex; flex-wrap: wrap; gap: 2mm; margin-top: 3mm; }
.chip { border: .3mm solid ${L.chipLine}; background: ${L.chipBg}; color: ${L.chipInk}; border-radius: 10mm; padding: 1.1mm 3mm; font-size: 8pt; font-weight: 500; }
.label { font-size: 8pt; color: ${L.muted}; letter-spacing: .08em; text-transform: uppercase; }
.impact-row { margin-top: auto; padding-top: 7mm; display: grid; grid-template-columns: 62mm 1fr; gap: 7mm; }
.statement-card { background: ${L.surface}; border-radius: 3mm; padding: 6mm; display: flex; flex-direction: column; justify-content: space-between; gap: 5mm; }
.statement-card .display { font-size: 24pt; line-height: 1.02; letter-spacing: -0.03em; }
.statement-card p { color: ${L.muted}; font-size: 9.2pt; }
.statement { margin-top: auto; border-top: .3mm solid ${L.line}; padding-top: 7mm; display: grid; grid-template-columns: 1.05fr 1fr; gap: 8mm; align-items: end; }
.statement .display { font-size: 25pt; line-height: 1.02; letter-spacing: -0.03em; }
.statement p { color: ${L.muted}; font-size: 9.6pt; }
.foot { display: flex; justify-content: space-between; color: ${L.muted}; font-size: 7.4pt; margin-top: 7mm; }
.adv { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.2mm; margin-top: 4mm; }
.adv .card { padding: 3.8mm 4mm 4.2mm; }
.adv h3 { font-size: 10.6pt; margin: 0 0 1.2mm; }
.tag { display: inline-block; font-size: 7.2pt; font-weight: 600; color: ${L.accent}; margin-bottom: 1.6mm; }
${look === 'light-gold' ? `.tag { background: ${T.gold}; color: ${T.ink}; padding: .4mm 1.8mm; border-radius: 1mm; }` : ''}
.adv p { color: ${L.muted}; font-size: 7.9pt; line-height: 1.38; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin-top: 7mm; }
.method li { list-style: none; display: grid; grid-template-columns: 13mm 1fr; gap: 2mm; padding: 2.4mm 0; border-top: .3mm solid ${L.line}; }
.method li:last-child { border-bottom: .3mm solid ${L.line}; }
.method b { font-weight: 600; color: ${L.accent}; font-size: 7.8pt; text-transform: uppercase; letter-spacing: .04em; padding-top: .4mm; }
${look === 'light-gold' ? `.method b { color: ${T.ink}; }` : ''}
.method h3 { font-size: 10.4pt; margin-bottom: .6mm; }
.method p { color: ${L.muted}; font-size: 8pt; }
.impact { background: ${L.figureBg === 'transparent' ? L.surface : L.figureBg}; border-radius: 3mm; padding: 5mm; display: flex; flex-direction: column; }
.figure { font-family: "Funnel Display", sans-serif; font-size: 40pt; line-height: .9; letter-spacing: -0.04em; color: ${L.figureInk}; }
.impact .line { font-family: "Funnel Display", sans-serif; font-size: 12pt; line-height: 1.15; margin-top: 2mm; }
.impact p { color: ${look === 'light-gold' ? '#3f2f14' : L.muted}; margin-top: 2mm; font-size: 8.2pt; }
.cases { margin-top: 3mm; columns: 2; column-gap: 6mm; }
.cases li { list-style: none; font-size: 8pt; padding: 1.2mm 0; border-bottom: .3mm solid ${L.line}; break-inside: avoid; }
.team { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 3.5mm; }
.person { display: grid; grid-template-columns: 17mm 1fr; gap: 3.5mm; align-items: start; }
.person img { width: 17mm; height: 17mm; border-radius: 50%; object-fit: cover; display: block; filter: grayscale(1); }
.person h3 { font-size: 11pt; }
.person .role { color: ${L.accent}; font-weight: 600; font-size: 7.8pt; margin: .4mm 0 1mm; }
${look === 'light-gold' ? `.person .role { color: ${T.ink}; }` : ''}
.person p { color: ${L.muted}; font-size: 7.9pt; }
.contact { margin-top: auto; background: ${look === 'dark' ? T.gold : T.ink}; color: ${look === 'dark' ? T.ink : T.bone}; border-radius: 3mm; padding: 5mm 6mm; display: flex; justify-content: space-between; align-items: center; }
.contact .display { font-size: 18pt; letter-spacing: -0.02em; }
.contact a { color: inherit; text-decoration: none; font-size: 9pt; margin-left: 6mm; }
.contact a:first-child { margin-left: 0; }
${look === 'light-gold' ? `.contact { background: ${T.gold}; color: ${T.ink}; }` : ''}
</style></head><body>
<section class="page">
  <div class="top"><img src="${logo}" alt="IMKAN"><span class="site">imkan.ai</span></div>
  <div style="margin-top: 15mm"><div class="eyebrow">${esc(C.eyebrow)}</div>
  <h1>${esc(C.headline[0])}<br><span class="accent">${esc(C.headline[1])}</span></h1>
  <p class="lead">${esc(C.lead)}</p></div>
  <div style="margin-top: 11mm"><h2>${esc(C.servicesTitle)}</h2><p class="sub">${esc(C.servicesLead)}</p>
  <div class="grid3">${C.steps.map(([n, t, d]) => `<div class="card"><span class="step">${esc(n)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></div>
  <div style="margin-top: 8mm"><div class="label">${esc(C.industriesLabel)}</div><div class="chips">${C.industries.map(chip).join('')}</div></div>
  <div class="impact-row"><div><h2>${esc(C.impactTitle)}</h2><div class="impact" style="margin-top: 3.5mm"><div class="figure">${esc(C.impactFigure)}</div><div class="line">${esc(C.impactLine)}</div><p>${esc(C.impactBody)}</p></div></div>
    <div><div class="label" style="margin-top: 8.5mm">${esc(C.casesTitle)}</div><ul class="cases">${C.cases.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div></div>
  <div class="foot"><span>imkan.ai</span><span>info@imkan.ai</span></div>
</section>
<section class="page">
  <div class="top"><img src="${logo}" alt="IMKAN" style="height: 7.5mm"><span class="site">imkan.ai</span></div>
  <h2 style="margin-top: 9mm">${esc(C.advantageTitle)}</h2>
  <div class="adv">${C.advantages.map(([t, v, d]) => `<div class="card"><span class="tag">${esc(v)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
  <div class="two">
    <div><h2>${esc(C.methodTitle)}</h2><ul class="method" style="margin-top: 3.5mm">${C.method.map(([k, t, d]) => `<li><b>${esc(k)}</b><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ul></div>
    <div class="statement-card"><div class="display">${esc(C.statement)}</div><p>${esc(C.statementBody)}</p></div>
  </div>
  <div style="margin-top: 7mm"><h2>${esc(C.teamTitle)}</h2><p class="sub">${esc(C.teamLead)}</p>
  <div class="team">${C.team.map(([n, r, d, img]) => `<div class="person"><img src="${url(img)}" alt="${esc(n)}"><div><h3>${esc(n)}</h3><div class="role">${esc(r)}</div><p>${esc(d)}</p></div></div>`).join('')}</div></div>
  <div class="contact"><span class="display">${esc(C.contactTitle)}</span><span>${C.contact.map(([t, h]) => `<a href="${h}">${esc(t)}</a>`).join('')}</span></div>
</section>
</body></html>`;
}

const BUILD = path.join(HERE, 'build');
mkdirSync(BUILD, { recursive: true });
for (const look of Object.keys(LOOKS)) {
  const html = path.join(BUILD, `imkan-profile-${look}.html`);
  writeFileSync(html, page(look));
  const pdf = path.join(HERE, `imkan-profile-${look}.pdf`);
  if (existsSync(pdf)) rmSync(pdf);
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=8000', `--user-data-dir=${path.join(BUILD, '.browser')}`,
    `--print-to-pdf=${pdf}`, pathToFileURL(html).href], { stdio: 'ignore', timeout: 90_000 });
  if (!existsSync(pdf)) throw new Error(`no PDF for ${look}`);
  console.log(`${look}: ${path.relative(ROOT, pdf)}`);
}
rmSync(BUILD, { recursive: true, force: true }); // the HTML holds this computer's file paths: never committed
