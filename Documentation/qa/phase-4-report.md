# Phase 4 report: home page v2

Date: 2026-11-19. Branch `feature/redesign`, page `site/index.html`. Nothing pushed.

## What changed

| Step | Result | Commits |
|---|---|---|
| 4.0 | Checker crash diagnosed: v1's WebGL hero ground (`fluted-glass`) crashed Chrome's software renderer during the long desktop walk. A page without WebGL completes; the ground is retired (ADR 0010), so full checks run again. | 10592ea |
| 4.1 | v2 tokens (midnight plum and gold, D-018, D-020, D-022), Funnel type, lit ground `sand` (D-025); the logo kit in nav, footer and icons, old logo files deleted; case art recoloured with one gold detail per drawing; the scene "Proven Impact" before the cases band (D-021, D-023) | 2fe02e1, abf9caa, 372b5a6, e29553b |
| 4.2 | Dealt moments: marquee-row (services) and counter-rolls (statement) (D-024) | 2f25fcf |
| 4.3 | Screen counts: every section one or two whole screens at 1440, 820, 768 and 390; no sideways scroll | 1f56d27, fd796e4 |
| 4.4 | Pill, phone form on one screen, desktop form one field per row (the repeated note under the button hidden; the intro says the same words), statement results, portrait pair on the grid gutter, two copy edits, icon sizes and lazy loading; five waivers | 26c5258, 3bbf142, 31762b9, d5761d4 |

## Checks

| Check | Result |
|---|---|
| `npm run build` | passes |
| `npm run test:e2e` (console errors, basics, axe WCAG 2.2 AA serious/critical) | 6 of 6 pass, desktop and phone |
| `copy-lint.mjs` | 0 FAIL (2 WARN: two "No X, no Y" runs, the "!" in the h1) |
| `perf.mjs` | FCP/LCP about 0.6 s (CPU, relative), layout shift 0.002, 0 WebGL, 0 broken requests, 480 KiB. Open: portraits 800px shown at about 300px; four font families (the D-023 "Fit" face counts as one). Both go to Phase 6 (self-hosted fonts, image sizes) |
| `gate.mjs` | Round 1: 14 FAIL. Round 2: 11 FAIL. Round 3: **`GATE: OPEN 11 (rounds used up)`**, the 11 below, none of ours (`gate-round-3.txt`, waivers in `gate-waivers.json`) |

## Waivers (5, the cap; D-026)

1. `hero-lines`: the h1 is final and fits two lines; gate.md says to waive it when the h1 is final.
2. `card-family`: false positive; the About heading column shares the grid class `span-6` with cards.
3. `copy-headings`: the headings are Felipe's original wording (ADR 0007).
4. `button-styles` and 5. `same-action`: the gold button on the dark band is deliberate (D-020).

## Open findings (inherent to kit parts)

All of these sit on two kit parts used unmodified. The kit's own demos fail the same checks, so they are reported, not waived:

| Finding | Where | Evidence |
|---|---|---|
| no-visual, section-gaps (2), one-section, container-edges, heading-scale (390), empty-area (390) | the scene `letter-bar-floods-the-ground` (#impact) | `Documentation/baseline/kit-demo-letter-bar-check.txt`: the kit demo fails no-visual, heading-scale, empty-area and container-edges on the same section |
| row-lines "clipped carousel" (2) | the moment `marquee-row` (#services) | the kit's marquee demo fails the same check |
| bleed-one-side (2) | the marquee's moving track and its copy | the moment's own structure: the duplicate track always runs past one edge |

Fixing these would mean changing the kit (not allowed: `kit-edited`) or giving up the approved scene and the dealt moment.

## Screenshots

`home-v2-desktop.jpg` and `home-v2-phone.jpg` (one shot per section, 1440x900 and 390x844), single shots in `screens/`.

## Pending Felipe

- Wording changes 7 to 25 in `Documentation/wording-changes.md` (21 to 25 are from this phase).
- The gate's close: it ends OPEN with the findings above; `gate.mjs --done "<your words>"` closes it only on Felipe's instruction.
