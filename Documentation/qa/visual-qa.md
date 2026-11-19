# Phase 7.5: visual QA and cross-browser

Standards: `DESIGN.md` (Layout; Browser support and visual QA), D-031, D-032.

## Q1 baseline (2026-11-20, before any fix)

Run on the built site (`vite preview`), `QA=1 npx playwright test layout`: 17 pages × 13 sizes (2560×1300 down to 360×640) × 3 engines = 663 checks; **78 pass, 585 fail**.

**The three engines report the same problems** (Chromium, Firefox and WebKit counts match within one), so the layout issues come from the layout itself, not from a browser difference.

Issues per kind, Chromium (Firefox and WebKit the same):

| Kind | Count | Meaning |
|---|---|---|
| rhythm | 598 | section padding is the kit's 120/72px, not the D-031 rhythm (fixed by Q3a, expected) |
| void | 415 | section taller than its content (screen-height sections) |
| overlap | 51 | content runs past its section's bottom into the next one |
| tap | 51 | footer links 16 to 20px tall and too close together (WCAG 2.5.8) |
| frame-cut | 42 | a rounded frame cuts through mock-up text (home) |
| text-spill | 26 | text wider than its box: the Think / Build / Evolve labels in their circles (home) |
| type | 12 | careers: founder names (`p.t-card`) at 15px on phones; a few lines under 16px |

Per page, Chromium, without rhythm: `/` 155, `/careers/` 46, each case page 32 to 34, `/work/` 11, `/privacy/` 9, `/terms/` 9, `/404/` 3.

Other tests in Firefox and WebKit (smoke, accessibility, CSP, keyboard, reduced motion): 364 run; after two test fixes (axe now waits for the entrance fade; WebKit focuses the skip link directly, since Safari's Tab skips links by default), all pass on the built site.

CSS lint (`npm run lint:css`, Baseline widely available): our own CSS passes. The kit uses 31 newer features (mostly `text-wrap: balance/pretty`, `text-box`, `@starting-style`, `content-visibility`), all progressive: older browsers ignore them. Checked in Q4.
