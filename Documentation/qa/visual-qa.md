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

## Q2 defect list (2026-11-20)

How it was found:
- The layout test (Q1) in all three engines, plus a **collision check** added in Q2: text over other text or over a box it doesn't belong to. The first Q1 run missed V-01 to V-03.
- 278 window-by-window screenshots, taken the way a visitor scrolls (not a stretched full-page capture, which changes screen-height layouts):
  - Chrome: home, careers, work index, one case, privacy and 404 at 1440×900, 1366×650, 768×1024 and 390×844.
  - Firefox and WebKit: home, a case and careers at 1440×900 and 390×844.
- Screenshots use reduced motion, so moments are at rest. Evidence is in `Documentation/qa/visual/`.

**Root cause of V-01 to V-08:** sections are fixed to the screen height (the kit's rule, replaced by D-031). Content that's taller than the screen spills, gets clipped or gets covered. Content that's shorter leaves voids. To make things fit one screen, copy was hidden on smaller screens.

**Browsers:** the three engines show the same defects. The only engine difference (V-16) is line breaks.

Batches: (a) section rhythm, (b) type, (c) media frames and mock-ups, (d) components, (e) phone, (f) content.

| # | Where | Sizes | What | Cause | Batch | Evidence |
|---|---|---|---|---|---|---|
| V-01 | Home, Services | 1280×720, 1366×650, 1536×730 | The first row's mock-up panels run over the second row's headings and text ("Deploy AI that saves you time") | Section fixed to two screens; panels have fixed heights | a, c | `v01-home-1366-mockups-over-text.jpg` |
| V-02 | Every page, footer | 1366×650 | The gold "Get in Touch" bar covers the logo and the Company / Solutions / Stay Connected links | Closing footer fixed to one screen | a | `v02-footer-1366-cta-over-links.jpg` |
| V-03 | Privacy, Terms | every desktop size | The footer is drawn over the legal text. The section is one screen tall, the text is 4 to 7 screens | Section fixed to one screen | a (critical) | `v03-privacy-1440-footer-over-text.jpg` |
| V-04 | Case pages, The Challenge | 1366×650 (10 of 11) | Text clipped at the bottom (the technology list is cut mid-sentence) | Section fixed to one screen, overflow hidden | a | `v04-case-1366-text-clipped.jpg` |
| V-05 | Home, hero and Banking Fraud window | 1366×650, 1280×720, 390×664, 360×640 | Hero content runs 57px past its section; the fraud window is squeezed and its list cut | Screen-height hero and section | a, c | `v05-home-1366-fraud-window-squeezed.jpg` |
| V-06 | Case Overview, Challenge, Impact; home statement, Why us, About; careers perks, past roles, apply | 415 checks | Large empty areas: one paragraph alone on a whole screen (case Overview, up to 1,090px empty), about 300px empty above "The Challenge" on phone, up to 593px under Impact | Sections stretched to one or two screens | a | `v06-case-390-void.jpg` |
| V-07 | Home methodology and contact; careers perks, past roles, apply | short laptops (1280×720 to 1536×730) | Content runs 14 to 155px into the next section | Section fixed to one screen | a | test output |
| V-08 | Home, careers, cases | phone and tablet | **Copy hidden to fit one screen:** advantage descriptions, perk descriptions, role details, the founders' photos by the form, case art (tablet), the industry and result lines on the work index (phone), the form's note | Kit's "cut the phone copy" rule | a, e (restore) | `v08-home-390-advantage-copy-hidden.jpg` |
| V-09 | Home, Why us | phone | Advantage tags wrap onto 2 or 3 lines ("100% / founder / oversight") | Narrow value column | e | `v08-home-390-advantage-copy-hidden.jpg` |
| V-10 | Home, Context First | every size | "Think", "Build", "Evolve" overflow their 30px circles | Fixed circle size for a word | d | `v10-home-1440-step-labels.jpg` |
| V-11 | Home, industries | desktop | The industry list (the marquee's static form) is a loose run of text with uneven gaps, sitting directly on the cards below it. It's hidden at some widths | Marquee fallback not styled as a list | d | `v11-home-1440-industries-runon.jpg` |
| V-12 | Home, every mock-up frame | every size | Fades cut through mock-up text ("Assess data, tools and gaps", "Contract clauses found", "Email the full dashboard"). The sources card is cut through its labels. Mock-ups sit inconsistently in a row (top, middle, bottom) | Frames take "the height left over" (D-031: fixed aspect ratio, full mock-up) | c | `v01`, `v11` |
| V-13 | Home, hero | every size | The chat window fades out into a large empty band | Frame height, fade | c | home screenshots |
| V-14 | Home, cases | phone | One case card goes full width between half-width ones; the grid looks uneven | Grid fit to one screen | e | home 390 screenshots |
| V-15 | Careers | phone | Founder names and the "We're always looking" line at 14 to 15px | Phone type reduced to fit | b | test output |
| V-16 | Every page | Firefox, WebKit | Lines break one word earlier or later than in Chrome (WebKit sets Funnel Sans slightly wider). Harmless once heights follow content, rechecked in Q4 | Engine text layout | a, Q4 | `v16-engines-line-breaks.jpg` |
| V-17 | Header, footer | 1366×650; phone | Nav links too close for the 24px target rule at 1366; "Privacy" and "Terms" each wrap onto their own line in the phone footer | Spacing | d | test output |
| V-18 | Home, Get in Touch | desktop | The left column holds only the address and email next to a tall form; unbalanced | Layout choice | d (design, needs approval) | home 1440 screenshots |
| V-19 | Privacy, Terms | every size | **Content bug:** a content-inventory note, "Button: Close (plus a top-right icon-only close button, no aria-label)", and a stray "---" are published at the end of both pages | Extraction carried the note | f (log in wording-changes) | `content/privacy.md:137`, `content/terms.md:105` |

Felipe's own items: (to add)
