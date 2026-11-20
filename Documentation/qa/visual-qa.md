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

## Q3 batch (a): section rhythm (2026-11-20)

What changed:
- **New `site/public/styles/rhythm.css`**, loaded after the kit and `tokens.css`. Kit files are unmodified.
  - Every section and the closing footer is as tall as its content, plus `--rhythm` padding above and below: 128px from 1280 up, 96px from 640 to 1279, 72px below 640.
  - The two parts of a two-part section stack at their own height, `--rhythm-split` apart (96 / 80 / 64).
  - A `.fill` frame gets a height of its own.
  - The hero keeps a minimum of one screen (capped at 1040px) and grows on short windows.
- **Page CSS:** removed the rules that squeezed, centred or hid content to fit one screen (statement, careers, case Impact and Challenge, work index). The copy is back at every size (wording-changes 39).
- **V-19:** the stray inventory note is removed from Privacy and Terms (wording-changes 38). Legal pages regenerated.
- **Test fixes:**
  - The empty-space check now counts framed boxes and painted decorative text.
  - Overlap is measured on what is actually painted, not on what a frame clips.
  - The full-screen scene is exempt, like the hero.

Result, Chromium, 17 pages × 13 sizes: **208 of 221 pass** (before: 78 of 221 per engine, about 1,900 findings).
- What fails belongs to later batches: frames cutting mock-up text (c, home Services and Methodology) and the step labels (d).
- Smoke, accessibility, CSP and keyboard: 182 pass.
- CSS lint: pass.

Fixed: V-01, V-02, V-03, V-04, V-05 (overlap; the fraud window's crop stays for c), V-06, V-07, V-08, V-19.

Evidence (before on the left, after on the right):
- `a-v01-before-after.jpg`: Services at 1366×650
- `a-v02-before-after.jpg`: footer at 1366×650
- `a-v03-before-after.jpg`: Privacy at 1440×900
- `a-v08-before-after.jpg`: advantages on a phone

Open for Felipe: at 1366 and 1440, two sections on the same ground now sit 256px apart (128 + 128), which reads airy. A fluid value (about 104px at 1366, 128px from 1700 up) would tighten laptops without changing large screens.

### Batch (a) follow-up: laptop padding tightened (Felipe: "Tighten")

From 1280 up, `--rhythm` is fluid: `clamp(96px, 7.19vw + 5.8px, 128px)`. That's about 104px at 1366, 109px at 1440 and 128px from about 1700 up. Two sections on one ground now sit about 208px apart on a laptop, not 256px. The layout test computes the same value.

## Q3 batch (b): type hierarchy (2026-11-20)

The type inventory (`scratchpad` script over 6 pages at 1440 and 390) found no text too small. Reading copy is 16px or more, and labels are 13 to 14px. **The problem was that the same role appeared in several styles:**

| Role | Before | After |
|---|---|---|
| Card titles (Services, Methodology, Why us) | 18px / 560 (from `cards.css`) | 20px / 500 Funnel Sans (`--t-card`), the same as the case tiles and the founders' names beside them |
| Row names (Why us advantages, careers perks) | 16px / 500, the same size as the description under them | `--t-lead` (20px desktop, 18px phone) |
| Small subheads ("Our Solution", "Technology Stack", a role's headings, legal 2.1 etc.) | 16px / 500 in the **display** face, which looks thinner than the body text | 20px / 500 Funnel Sans (18px phone) |

Rules are in `rhythm.css` ("Type hierarchy"). The kit is unmodified. Fixed: V-15 (careers 14px text, gone with batch a's removal of the phone squeeze) and the hierarchy item in D-031.

Checks: layout 208 of 221 (unchanged; what's left is batches c and d), Chromium suite pass, CSS lint pass.

## Q3 batch (c): frames and mock-ups (2026-11-20)

The kit puts each mock-up at fixed offsets inside a frame of fixed height, "rising out of the bottom edge", and fades out whatever the edge cuts. With real UI text inside, that read as cut-off screens.

What changed (`rhythm.css`, "Frames"):
- **Card frames:**
  - The mock-up is in the flow and centred.
  - The frame grows around it with 48px of ground on each side (32px on phone), with no fade.
  - Cards in a row keep equal frames, so mock-ups in a row share one middle line.
- **Hero:**
  - The chat window is centred, whole and unfaded.
  - The frame takes what the first screen leaves and grows on short windows.
- **Fraud-detection window:** as tall as its content, no fade over the last rows. On a tablet the alert list shows whole (it was capped at 252px).
- **Joined-sources grid:** fits a narrow frame (tablet), with tiles from 120px.

Result: no frame cuts through text at any size (was 42). Layout test **208 of 221**: all 13 failures are the step labels (batch d). Chromium suite 182 pass.

Fixed: V-05 (crop), V-12, V-13.

Evidence (before on the left):
- `c-services-before-after.jpg`
- `c-hero-before-after.jpg`
- `c-fraud-window-before-after.jpg` (1366×650)

## Q3 batch (d): components (2026-11-20)

What changed (`rhythm.css`, "Components"; `partials/footer.html`):
- **V-10, the methodology steps:** "Think", "Build" and "Evolve" are pills sized to the word (28px tall), not 32px number circles the word ran out of.
- **V-11, the industries:**
  - At rest (reduced motion) the list is a row of tags, not a loose run of display text.
  - It sits 32px under the intro and 48px over the cards.
  - Phones show it again (it was hidden) as still tags; the moving copy and its pause button are left out there.
  - With motion on, desktop keeps the moving row.
- **V-17, footer:**
  - Footer links are at least 24px tall targets.
  - Privacy and Terms are one group (markup in `partials/footer.html`) that never splits across lines; on a phone they sit together under the copyright line.
- **Test:** tags count as labels (13 to 14px allowed), like chips.

Result: **the layout test passes 221 of 221 in Chromium.** Chromium suite 182 pass, CSS lint pass.

**V-18, contact section: not changed, three options for Felipe** (`d-contact-options.jpg`; no new copy in any of them):
- **A (now):** heading and intro across the top; address and email alone in the left column beside the form. The left column is mostly empty.
- **B (recommended):** heading, intro, address and email in the left column, the form beside them from the top. The usual contact layout, and the two columns end close to each other.
- **C:** one centred column (heading, intro, details on one line, then the form at a reading width). Calm, but the only centred section on the page.

Evidence (before on the left):
- `d-steps-before-after.jpg`
- `d-industries-before-after.jpg`
- `d-footer-phone-before-after.jpg`

## Q3 batch (e): phone details, and contact layout B (2026-11-20)

- **V-18, contact (Felipe: option B):** on desktop, the heading, intro, address and email form the left column, with the form beside them from the top (`home.css`). Tablet and phone keep the stacked order. Evidence: `e-contact-b-live.jpg`.
  - Wording note for Felipe: the intro says "Fill out the form **below**"; on desktop the form is now beside it. Not changed (that would be a wording change); "Fill out the form and we'll get back to you shortly." would fit every layout.
- **V-09, advantage rows on a phone:** each row stacks its name, its fact as a small muted line, and its description at full width. The fact no longer wraps over three lines in a narrow column. Careers perks keep their icon layout. Evidence: `e-advantages-phone-before-after.jpg`.
- **V-14, case tiles on a phone (home and work index):** a list, one case per row, with the drawing (120px) on the left and industry, title and result on the right. The two-column grid left a lone tile in each group of three and on the eleven-case index. Evidence: `e-cases-phone-before-after.jpg`.
- **Phone pass:** home, careers, work index, a case, privacy and 404 at 390×844 and 360×640, all checked. Nothing else found.

Result: layout test **221 of 221** in Chromium; Chromium suite 182 pass; CSS lint pass.

**Q3 complete.** All 19 defects (V-01 to V-19) are fixed. Two notes wait on Felipe: the "below" wording, and wording-changes 38 and 39.
