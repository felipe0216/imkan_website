---
version: alpha
name: Imkan.ai (2026 redesign)
description: A light, editorial service site. Stone-grey paper ground, one deep oxblood ink that does both the reading and the acting, one sturdy grotesque (Schibsted Grotesk) at regular weight, real photographs, flat grounds, and no glass, glow or gradient. Built on the design-taste-frontend kit (tasteskill 2.5.1), dealt on 2026-11-16.

kind:
  page-type: service
  site-kind: other
  kind: service
  trade: agency (consulting)

deal:
  hero: photo
  palette: oxblood-grey
  type: schibsted
  radius: soft
  nav: nav-centre
  footer: footer-dark
  close: close-type
  rhythm: dark-band
  buttons: tonal
  mark: stack
  moments: [pinned-chapters, word-highlight]

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

Depth comes from photographs and from one dark band, never from glass, glow, blur or gradients. Motion is limited to the kit's hover layer, the hero's one entrance, and two dealt moments.

This replaces the old dark, cyan, glassmorphism look (archived in `Documentation/DESIGN-legacy.md`). Decisions: `Documentation/adr/0001` to `0008`.

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

The `:root` block from `start.mjs css` is kept exactly as printed, in a `<style>` after the kit's links. `<html lang="en" data-type="service" data-radius="soft" data-buttons="tonal">`, with `<meta name="page-type" content="service">` and `<meta name="site-kind" content="other">`.

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
| Hero | `photo` | A full-bleed photograph under the header; the h1, lead and buttons in a solid box of the page's own ground on the photograph's calm side. No scrim. At 390 the photograph is a layer on top and the words sit under it. |
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
- **Still to do:** a native Arabic reader confirms "إمكان" (AC-301); Felipe approves the logo.

## Moments

- **`pinned-chapters`:** a section that holds on screen for two screens of scroll while its three steps open one at a time, the picture beside them changing with each. **Fits the methodology exactly: THINK, BUILD, EVOLVE.**
- **`word-highlight`:** one large statement rests at half ink and turns to full ink word by word as it crosses the middle of the screen. Proposed for the "Why us" statement.

Both rest completely under `prefers-reduced-motion`.

## Home page plan (draft, in screens)

Line 1: service. Line 2: hero photo, palette oxblood-grey (paper and report-binding colours for a consultancy), Schibsted Grotesk, nav-centre, footer-dark, close-type, dark-band, tonal buttons, mark stack, moments pinned-chapters and word-highlight.

| # | Section | One idea | Picture | Screens |
|---|---|---|---|---|
| 1 | `hero` | What Imkan does and for whom | Full-bleed photograph (to choose) | 1 |
| 2 | `services` | The four services | Real icons of the tools used, or one still diagram card | 1 to 2 |
| 3 | `methodology` | THINK, BUILD, EVOLVE | `pinned-chapters` moment, one picture per step | 2 |
| 4 | `why-us` | Senior engineers, no friction | `word-highlight` statement, then the six advantages as rows | 1 + 1 |
| 5 | `work` | Production systems delivered | Case-study tiles linking to `/work/<slug>/`, on the **dark band** | 1 to 2 |
| 6 | `about` | The two founders | Their real portraits | 1 |
| 7 | `contact` | Get in Touch | The contact form on the page, with the address | 1 |
| 8 | `footer.closing` | Close and directory | `close-type`, then `footer-dark` | 1 |

Other pages: `/careers/`, `/work/`, `/work/<slug>/` (11), `/privacy/`, `/terms/` (ADR 0005). Each gets its own plan before it is built.

## Open design questions

1. **Hero photograph.** The skill needs a strong photograph with a calm area for the words, showing the client's world. Only the founders may appear as people (ADR 0001). Options: a Riyadh architecture or skyline photograph (where Imkan works), a close detail of real work (a whiteboard session without faces), or a portrait of the two founders together if one exists or can be taken.
2. **Case-study pictures.** The old use-case images are dark illustrations that read as generated. Each case needs a photograph of its world (a bank, a port, a warehouse) as a licensed stand-in, or a still diagram card of the system built.

## Do's and Don'ts

### Do
- Keep the kit unmodified; page CSS only where a reference allows it.
- Use the dealt tokens exactly as printed.
- One filled button per view; the main action reads "Get in Touch" everywhere it appears.
- Let photographs and the dark band carry the visual weight.

### Don't
- Glassmorphism, backdrop blur, glows, gradients, scrims, coloured text highlights.
- Bold (700/800) headlines or tracked uppercase labels.
- Fade-in on scroll, parallax text, tilt, carousels, timed tabs.
- People other than the two founders; drawn look-alikes of real logos; invented figures.
- Em dashes in site copy.
