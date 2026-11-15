---
version: alpha
name: Imkan.ai (2026 redesign)
description: A light, editorial AI-engineering site. Stone-grey paper ground, one deep oxblood ink that does both the reading and the acting, one sturdy grotesque (Schibsted Grotesk) at regular weight, the systems Imkan builds shown as live UI, one quiet WebGL ground in the hero, and no glassmorphism, glow or gradient. Built on the design-taste-frontend kit (tasteskill 2.5.1), dealt on 2026-11-16 (ADR 0009).

kind:
  page-type: software
  site-kind: software
  kind: software
  trade: ai

deal:
  hero: centred
  palette: brand (oxblood on stone, the approved colours)
  type: schibsted
  radius: soft
  effect: fluted-glass (band slot, quiet, behind the hero window)
  nav: nav-centre
  footer: footer-dark
  close: close-type
  rhythm: dark-band
  buttons: tonal
  mark: stack
  moments: [iris-opens, letters-assemble]

colors:
  bg: "#e2e2e2"
  surface: "#d6d6d6"
  ink: "#7d0c14"
  muted: "#7a4a4e"
  accent: "#7d0c14"
  accent-ink: "#e2e2e2"
  action: "#7d0c14"
  action-ink: "#e2e2e2"
  inv-bg: "#7d0c14"
  inv-surface: "#862323"
  inv-ink: "#e2e2e2"
  inv-muted: "#d0b3af"
  inv-accent: "#e2e2e2"
  inv-action: "#e2e2e2"
  inv-action-ink: "#7d0c14"

typography:
  family: Schibsted Grotesk (Google Fonts, wght 400..700)
  display-weight: 400
  display-tracking: -0.035em
  display-tracking-xl: -0.042em
  scale: 0.98
  h1: clamp(38px, 3.24vw + 25.4px, 72px)
  hero-h1: 80px desktop / 44px phone (photo hero, before the 0.98 scale)
  h2: clamp(30px, 1.72vw + 23.3px, 48px)
  h3: 24px
  lead: 18px
  card: 18px
  body: 16px
  small: 14px
  label: 13px
  stat: clamp(28px, .952vw + 24.29px, 38px)

rounded:
  sm: 8px
  md: 12px
  lg: 20px
  btn: 8px

spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]

rhythm:
  nav: 72px / 56px under 640
  section-top: 120px / 96px
  section-bottom: 72px / 48px
  gutter: 80px / 24px
  wrap: 1280px
  grid: 12 columns, 24px gap (12px under 640)
---

## Overview

The new Imkan.ai reads like a confident consulting firm's printed report, not a tech demo. The ground is a cool stone grey (`#e2e2e2`), and a single deep oxblood (`#7d0c14`) carries everything: headlines, body text, links, the focus ring and the one filled button. There is no second accent. One sturdy neo-grotesque, Schibsted Grotesk, is set at regular weight (400) with tight tracking, so hierarchy comes from size and space rather than boldness.

It is classified as **software (AI)** under the kit (ADR 0009), so it shows that Imkan is a tech company the way good software sites do: by showing the systems themselves as live UI, with one quiet WebGL ground in the hero (`fluted-glass`), pulsing diagram cards, one loop per card group and two dealt moments. Depth comes from the work and from one dark band, never from glassmorphism, glow, blur or gradients.

This replaces the old dark, cyan, glassmorphism look (archived in `Documentation/DESIGN-legacy.md`). Decisions: `Documentation/adr/0001` to `0009`.

**Why this palette fits a consultancy:** the stone ground reads as paper and print, the material of reports, proposals and boardroom documents. The single oxblood ink is the colour of a bound annual report or a seal, serious and established, which suits a firm selling senior engineering judgement rather than a gadget.

## The kit

The new site is built with the `design-taste-frontend` kit, loaded **unmodified** from `site/public/assets/` (ADR 0002). Editing any kit file fails the gate (`kit-edited`, not waivable). Page-specific CSS goes in our own files, never in the kit's.

| File | Role |
|---|---|
| `system.css`, `system.js` | Tokens, grid, type scale, buttons, nav, footer, forms, focus, the phone action bar |
| `ui/cards.css`, `ui/base.css`, `ui/ui.js` | Card recipes |
| `motion/motion.css`, `motion/motion.js` | Hover, press, focus, the hero entrance |
| `layout/layout.css`, `layout/layout.js` | Section heights, the hero frame, edges |
| `backgrounds/backgrounds.css` | Loaded by the starter; flat tokens only on a service page |
| `icons/icon.css` | Real-icon sizing |
| `moments/moments.js`, `lib.js`, `pinned-chapters/`, `word-highlight/` | The two dealt moments |

The `:root` block from `start.mjs brand --page software` is kept exactly as printed (it adds `--font-mono: "JetBrains Mono"` for UI mocks), in a `<style>` after the kit's links. `<html lang="en" data-type="software" data-radius="soft" data-buttons="tonal">`, with `<meta name="page-type" content="software">` and `<meta name="site-kind" content="software">`. Effects need `assets/effects/` (the `fluted-glass` ground and `fx.js`) and the two moments' folders copied in unmodified when the page is built.

## Colour

- **Interface 90 to 95% neutral.** Colour comes from the photographs.
- **One ink, one accent, the same oxblood.** Reading text is oxblood on stone at **8.4:1** (7.5:1 on the surface). Muted text (`#7a4a4e`, labels, dates, a heading's quieter half) is **5.6:1**.
- **The dark band** (rhythm `dark-band`): one section, at the page's middle or later, flips to the inverse ground: stone text on oxblood (8.4:1). It holds the strongest visual.
- **Never:** violet, gradients, glows, scrims over photographs, coloured highlight bars behind words, a second accent.

## Typography

- One family, Schibsted Grotesk, for display and text. Headlines 400, text 400, buttons and labels 500.
- Sentence case everywhere. **No tracked capitals or small caps**, so the old site's uppercase eyebrow labels ("OUR SERVICES") become plain sentence-case labels at 13px/500 when they are kept.
- Reading text is 16px or more, line height 1.5 to 1.8, lines at most 62 characters.
- Nothing under 13px. One size per kind of element across the site.

## Layout

- **One section per screen:** every section is exactly one or two screens tall at 1440×900; the hero is alone on the first screen.
- **Equal edges:** everything sits on the 1280px `.wrap` (80px gutters) or the 12-column grid.
- At 390: one column, full-width buttons, a full-screen menu sheet, photographs after their text.
- Our own CSS uses direction-aware properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`) so the Arabic site can follow (ADR 0003).

## Components (dealt)

| Part | Dealt | What it is |
|---|---|---|
| Nav | `nav-centre` | Fixed, opaque, 72px bar with a hairline; logo on the left line, the nav words centred, "Get in Touch" as the one button on the right line. No blur, no floating pill. |
| Hero | `centred` | A centred h1 (72px, at most 2 lines), a grey line, two buttons, then one app window rising out of a lit frame (the `fluted-glass` ground) that fills the rest of the first screen and fades at its foot. The window shows a system Imkan delivered, as live HTML. |
| Buttons | `tonal` | 44px high, 8px radius, 16px label. Exactly one filled primary per view; one secondary style. |
| Rhythm | `dark-band` | One inverse (oxblood) section mid-page or later. |
| Close | `close-type` | The last row before the footer: an h2, a line, and the big button across the `.wrap`. |
| Footer | `footer-dark` | The name set large, link columns on the right, the legal row (brand, year, Privacy, Terms, one credits line). |
| Mark | `stack` | Informs the new logo's style (ADR 0008). Our own IMKAN logo replaces the kit's mark. |
| Forms | kit `booking-form` recipe | Visible labels, 48px fields, errors under each field, one status line, success only after the API answers (ADR 0002). |

## Logo (working version, ADR 0008)

Files in `site/public/images/logo/`; preview in `Documentation/logo/preview.jpg`.

| File | Use |
|---|---|
| `imkan-logo.svg` | Primary lockup: mark + "IMKAN" over "إمكان", oxblood on stone |
| `imkan-logo-on-dark.svg` | The same in stone, for the dark band and the dark footer |
| `imkan-logo-mono.svg` | `currentColor`, for inline use where the colour is inherited |
| `imkan-wordmark.svg` | "IMKAN" over "إمكان", no mark |
| `imkan-mark.svg` | The mark alone (24×24) |
| `favicon.svg` (also `site/public/favicon.svg`) | Stone bars on an oxblood rounded square |

- **The mark:** three bars building upward, widest at the bottom (data foundation, engineering, intelligence; also THINK, BUILD, EVOLVE). Derived from the dealt `stack` mark, inverted, with slim bars and small corners.
- **"IMKAN":** Schibsted Grotesk SemiBold (600), letterspaced +0.14em, capitals as Felipe chose.
- **"إمكان":** IBM Plex Sans Arabic Medium (500), centred under IMKAN.
- **No drawn letters:** both words are real fonts (OFL licensed) shaped by HarfBuzz, the shaping engine browsers use, and converted to outlines, so the SVGs need no font. Rebuild with `Documentation/logo/build-logo.cjs` (needs `harfbuzzjs` and the two TTFs; see its header).
- **Approved by Felipe on 2026-11-16**, together with the palette and type. Still to do: a native Arabic reader confirms "إمكان" (AC-301).

## Effect and moments (the page's beats, three at most)

- **`fluted-glass`** (the effect): a quiet ribbed-glass WebGL field in the hero's frame, behind the app window. Never behind body copy, never page-long.
- **`letters-assemble`** (moment): a statement of two to five words, set very large, whose letters fly into the line as it rises. Proposed for "Engineering Without Friction." from "Why us".
- **`iris-opens`** (moment): the dark band opens from a disc with a hairline ring at its edge as you scroll into it. The case-study section sits on that band.
- Beats never sit in neighbouring sections; a calm section between them; the back third of the page calm before the close. Everything rests under `prefers-reduced-motion`. At most four live WebGL contexts.

## Case-study art

Eleven vector illustrations, one per case, redrawn from the current images' subjects (a world map with routes, a lock, a house and so on) in the new style: oxblood line work on stone, crisp SVG, one idea each. One card group may carry a timed loop (for example pulses running along the routes), 2.5 to 4 s, paused under reduced motion. They live in `site/public/images/work/`.

## Home page plan (draft, in screens)

Line 1: software (AI). Line 2: hero centred, brand palette (oxblood on stone, the approved colours), Schibsted Grotesk, effect fluted-glass in the hero frame, nav-centre, footer-dark, close-type, dark-band, tonal buttons, mark stack, moments letters-assemble and iris-opens.

| # | Section | One idea | Picture | Beat | Screens |
|---|---|---|---|---|---|
| 1 | `hero` | What Imkan builds and for whom | App window: the AI negotiation agent (case 11) | effect | 1 |
| 2 | `platform` (app-frame) | Production systems, not slideware | App frame: the fraud-detection alert queue beside one open alert (case 1) | | 1 to 2 |
| 3 | `services` | The four services | Features 2×2 with UI fragments and one pulsing diagram card | | 1 to 2 |
| 4 | `methodology` | THINK, BUILD, EVOLVE | Steps with a still diagram | | 1 |
| 5 | `why-us` statement | Engineering Without Friction. | Type moment | letters-assemble | 1 |
| 6 | `why-us` rows | The six advantages | Real tool icons, rows | | 1 |
| 7 | `work` (dark band) | Proven impact in production | Case tiles with the new illustrations, one loop | iris-opens | 1 to 2 |
| 8 | `about` | The two founders | Their real portraits | | 1 |
| 9 | `contact` | Get in Touch | The contact form on the page, with the address | | 1 |
| 10 | `footer.closing` | Close and directory | close-type, footer-dark | | 1 |

Other pages: `/careers/`, `/work/`, `/work/<slug>/` (11), `/privacy/`, `/terms/` (ADR 0005). Each gets its own plan before it is built.

## Open design questions

1. **UI shown in the hero window and the app-frame** is new illustrative text built from cases 11 and 1. Felipe approves it (TODO) and it must not claim anything the case studies do not say.

## Do's and Don'ts

### Do
- Keep the kit unmodified; page CSS only where a reference allows it.
- Use the dealt tokens exactly as printed.
- One filled button per view; the main action reads "Get in Touch" everywhere it appears.
- Let photographs and the dark band carry the visual weight.

### Don't
- Glassmorphism cards, backdrop blur, glows, CSS gradients as decoration, scrims, coloured text highlights. (The one `fluted-glass` WebGL ground in the hero frame is the page's dealt effect, not a card style.)
- Bold (700/800) headlines or tracked uppercase labels.
- Fade-in on scroll, parallax text, tilt, carousels, timed tabs.
- People other than the two founders; drawn look-alikes of real logos; invented figures.
- Em dashes in site copy.
