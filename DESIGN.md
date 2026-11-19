---
version: 2
name: Imkan.ai (2026 redesign, visual direction v2)
description: A warm, premium and quietly playful AI-engineering site. Warm bone paper, plum-black ink, one deep plum accent, near-black plum bands lit by a saffron-gold highlight, Funnel Display and Funnel Sans at regular weight, the systems Imkan builds shown as live UI, and one cinematic hero scene. No glassmorphism, glow or decorative gradient. Built on the design-taste-frontend kit (tasteskill 2.5.1). Decisions D-012 to D-019 in DECISION_TRACKER.md, ADRs 0001 to 0010.

kind:
  page-type: software
  site-kind: software
  kind: software
  trade: ai

deal:
  hero: cinematic scroll scene, dealt in Phase 3 (O-003); kinetic-type opener as fallback
  palette: brand (midnight plum and gold, Felipe's choice, D-018) via start.mjs brand
  type: funnel (dealt for software)
  radius: soft
  effect: the hero scene is the page's one effect (fluted-glass retired, ADR 0010)
  nav: nav-centre
  footer: footer-dark
  close: close-type
  rhythm: dark-band
  buttons: tonal
  mark: the IMKAN logo kit (D-017), replaces the kit's mark
  moments: re-dealt in Phase 4 around the scene's beat budget (v1 had iris-opens and letters-assemble)

colors:
  bg: "#efece5"          # warm bone
  surface: "#e3ded3"     # bone, one step down (cards, tiles)
  ink: "#1b111d"         # plum-black: all reading text and the logo
  muted: "#4c4150"       # plum-grey: labels, dates, a heading's quieter half
  accent: "#5e1654"      # plum: primary button, links, focus ring, the logo's K
  accent-ink: "#efece5"  # bone label on plum
  action: "#5e1654"
  action-ink: "#efece5"
  inv-bg: "#120914"      # midnight plum: dark bands and footer (override, see Colour)
  inv-surface: "#211325" # raised cards on the dark band (override)
  inv-ink: "#efece5"
  inv-muted: "#cbbccf"   # (override)
  inv-accent: "#ffc233"  # saffron gold: the one highlight, dark grounds only (override)
  inv-accent-ink: "#120914"
  inv-action: "#ffc233"
  inv-action-ink: "#120914"

typography:
  display: Funnel Display (Google Fonts, wght 400..700)
  text: Funnel Sans (Google Fonts, wght 400..600)
  mono: DM Mono (400, 500), for UI mocks and code only
  display-weight: 400
  display-tracking: -0.03em
  display-tracking-xl: -0.04em
  scale: 0.98
  h1: clamp(38px, 3.24vw + 25.4px, 72px)
  h2: clamp(30px, 1.72vw + 23.3px, 48px)
  h3: 24px
  lead: 18px
  card: 18px
  body: 16px
  small: 14px
  label: 13px
  stat: clamp(28px, .952vw + 24.29px, 38px)
  note: sizes are the kit's (system.css), unchanged from v1; only the families changed

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

# Imkan.ai design system, v2

> Replaces v1 (oxblood on stone, 2026-11-16). What changed and why: ADR 0010 and decisions D-012 to D-019 in `DECISION_TRACKER.md`. The old React site's look is archived in `Documentation/DESIGN-legacy.md`.

## Overview

The site should feel **premium and quietly playful, never corporate**. Felipe's words: elite, cool, fun and vibrant, light but not white. Seven palette rounds landed on **midnight plum and gold** (D-018):

- **Warm bone paper** (`#efece5`) instead of white or grey. It reads as a good printed document and keeps the page light.
- **Plum-black ink** (`#1b111d`) instead of black. It reads as black, but sits warmer and richer, and ties the text to the accent.
- **One deep plum accent** (`#5e1654`) for everything you can act on: the primary button, links, the focus ring, and the logo's K.
- **Midnight plum bands** (`#120914`) for the one dark section and the footer, where a **saffron gold** (`#ffc233`) highlight carries the buttons and small moments. The gold is what makes it fun; keeping it to the dark ground is what keeps it premium.

It stays classified as **software (AI)** (ADR 0009). It proves Imkan is a tech company the way good software sites do: by showing the systems themselves as live UI, with one cinematic scene in the hero. Depth comes from the work, the dark band and the gold, never from glassmorphism, glow, blur or gradients.

**What carries over from v1 (ADR 0010, point 4):** layout, sections, product windows, case art (recoloured), copy handling, the dealt nav, footer, close, rhythm and buttons.

## The kit

The site is built with the `design-taste-frontend` kit, loaded **unmodified** from `site/public/assets/` (ADR 0002). Editing any kit file fails the gate (`kit-edited`, not waivable). Page-specific CSS goes in our own files.

| File | Role |
|---|---|
| `system.css`, `system.js` | Tokens, grid, type scale, buttons, nav, footer, forms, focus, the phone action bar |
| `ui/cards.css`, `ui/base.css`, `ui/ui.js` | Card recipes and UI fragments |
| `motion/motion.css`, `motion/motion.js` | Hover, press, focus, the hero entrance |
| `layout/layout.css`, `layout/layout.js` | Section heights, the hero frame, edges |
| `backgrounds/backgrounds.css` | Flat grounds |
| `icons/icon.css` | Real-icon sizing |
| `moments/`, `effects/`, scene folders | Copied in unmodified when Phase 3 and 4 deal them |

Head setup: `<html lang="en" data-type="software" data-radius="soft" data-buttons="tonal">`, with `<meta name="page-type" content="software">` and `<meta name="site-kind" content="software">`. The `data-ground` attribute (v1 used `sky`) is revisited in Phase 4 against the new palette.

## Colour

### Tokens and how they are produced

Felipe chose these colours, so they go in through the kit's route for a client's own colours, not a dealt palette:

```
node .claude/skills/design-taste-frontend/scripts/start.mjs brand --page software --bg "#efece5" --surface "#e3ded3" --ink "#1b111d" --muted "#4c4150" --accent "#5e1654" --type funnel
```

Its `:root` block is kept **as printed**, in a `<style>` after the kit's links. **One documented deviation:** `brand` derives the inverse (dark band) tokens from the ink, which would give a plum-black band with bone buttons. D-018 needs a deeper midnight plum and the gold highlight, so a second, small `:root` block straight after it overrides only these six tokens:

```css
/* D-018: dark bands in midnight plum with the saffron-gold highlight (overrides start.mjs brand's derived inverse) */
:root {
  --p-inv-bg: #120914; --p-inv-surface: #211325; --p-inv-muted: #cbbccf;
  --p-inv-accent: #ffc233; --p-inv-accent-ink: #120914;
  --p-inv-action: #ffc233; --p-inv-action-ink: #120914;
}
```

Assumption: the kit's checker does not compare the `:root` block with `start.mjs` output (checked in `consistency.mjs` and `gate.mjs`: it does not); the contrast checks run in the browser and still apply to the result.

### Contrast (WCAG 2.2; the kit asks 7:1 for reading text, 4.5:1 for muted)

| Pair | Ratio |
|---|---|
| Ink on bone / on surface | 15.6 / 13.7 |
| Muted on bone / on surface | 8.2 / 7.2 |
| Plum accent on bone / on surface | 10.4 / 9.1 |
| Bone label on the plum button | 10.4 |
| Bone text on midnight plum / on its cards | 16.6 / 15.0 |
| Inverse muted on midnight plum / on its cards | 10.8 / 9.8 |
| Gold on midnight plum / on its cards | 12.1 / 11.0 |
| Midnight label on the gold button | 12.1 |
| Gold on bone | **1.4: never** |

### Rules

- **The interface is 90 to 95% bone and ink.** Colour comes from the accent, the dark band and the work itself.
- **Plum acts, ink reads.** Plum is for the one filled button per view, links, the focus ring and the logo's K. Body text is never plum.
- **Gold only on dark grounds.** On bone it fails contrast (1.4:1). On the dark band it is the button and at most one or two small highlights (a stat, an active state, a cursor).
- **One dark band** (rhythm `dark-band`): one section at the middle of the page or later, plus the footer.
- **Flat colour only.** The plum-to-black gradient was previewed and not chosen (D-018).
- **Never:** glows, glassmorphism, backdrop blur, scrims over photographs, coloured highlight bars behind words, a third accent.
- **Known deviation:** the kit says "never violet" for *dealt* palettes. Plum is Felipe's own brand colour, entered through `brand` as the kit prescribes for a client's colours (D-018).

## Typography

- **Funnel Display** for headlines, **Funnel Sans** for text, both from Google Fonts; **DM Mono** only inside UI mocks and code. All three are what the kit deals for software.
- Headlines 400 with tight tracking (-0.03em, -0.04em at the largest sizes); text 400; buttons and labels 500. Hierarchy comes from size and space, not boldness.
- Sentence case everywhere. **No tracked capitals or small caps** in the page; the old site's uppercase eyebrows become sentence-case labels at 13px/500 when kept. (The logo's tracked "IMKAN" is artwork, not text.)
- Reading text 16px or more, line height 1.5 to 1.8, lines at most 62 characters. Nothing under 13px.
- **The logo uses different fonts** (Geist 500 and IBM Plex Sans Arabic 500), outlined into the SVG. That is deliberate: the logo is a fixed mark, the site's type is the reading voice. Both are clean grotesques and sit together (checked in the palette previews).
- **Arabic, later (ADR 0003):** Funnel has no Arabic. The `/ar/` site needs an Arabic pairing (IBM Plex Sans Arabic is the natural candidate, matching the logo). Decided when Arabic starts.

## Layout

- **One section per screen:** every section is one or two screens tall at 1440×900; the hero is alone on the first screen. Also at tablet (768, 820) and phone (390) widths (Phase 4).
- **Equal edges:** everything sits on the 1280px `.wrap` (80px gutters) or the 12-column grid. One split pair per page uses 6/6.
- At 390: one column, full-width buttons, a full-screen menu sheet, pictures after their text.
- Our CSS uses direction-aware properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`) so the Arabic site can follow.

## Components

| Part | Dealt | What it is |
|---|---|---|
| Nav | `nav-centre` | Fixed, opaque bone bar, 72px, with a hairline. Logo left (`imkan-lockup.svg`, about 40px tall), nav words centred, "Get in Touch" as the one plum button on the right. No blur, no floating pill. |
| Hero | scene (Phase 3) | One cinematic scroll scene dealt from the kit's big scenes. The solid logo mark (`M0 0H24V100H0Z M36 50L72 0H100L62 50L100 100H72Z`) qualifies the site for scenes that need a mark path. Fallback: a kinetic-type opener (O-003). |
| Buttons | `tonal` | 44px high, 8px radius, 16px label. One filled primary per view: plum on bone, gold on the dark band. One secondary style. |
| Rhythm | `dark-band` | One midnight-plum section mid-page or later. |
| Close | `close-type` | The last row before the footer: an h2, a line, and the big button across the `.wrap`. |
| Footer | `footer-dark` | Midnight plum. The on-dark logo, link columns, the legal row (brand, year, Privacy, Terms, one credits line). |
| Forms | kit `booking-form` recipe | Visible labels, 48px fields, errors under each field, one status line, success only after the API answers. |
| Product windows | kit UI fragments | Live HTML recreations of systems Imkan delivered (chat, pipeline board, file lists). Recoloured by the tokens; tool icons stay their real colours. |

## Logo (D-016, D-017, kit D-019)

Files in `site/public/brand/`, guide in `Documentation/brand/README.md`, overview `Documentation/brand/logo-kit.jpg`.

- **The mark, "Open K":** an upright I bar and one chevron of the K's arms, from the IMKAN monogram. Solid shapes, so it works at 16px and can drive a scene.
- **"IMKAN":** Geist 500, tracked +0.14em. **"إمكان":** IBM Plex Sans Arabic 500, right-aligned under IMKAN. Real fonts shaped by HarfBuzz and outlined, so no font is needed.
- **Colourways:**
  - On bone: `imkan-lockup.svg` (plum K, plum-black text), `-ink`, `-black`, `-gold-ink`.
  - On dark: `-on-dark` (gold K, bone text), `-bone`.
- **Where:** nav and documents use the primary; the dark band and footer use `-on-dark`. The favicon and avatars are a gold K on midnight plum. The email signature uses the gold-on-midnight-plum tile (D-019).
- **Rules:**
  - Clear space at least the I bar's width.
  - No recolouring, stretching or effects.
  - Gold only on dark.
  - Mark alone under 24px.
- **Still to do:** a native Arabic reader confirms "إمكان" (Phase 2.5, O-006). The old logo in `site/public/images/logo/` is replaced in Phase 4.

## Motion: effect, scene and moments

- **Budget (software, ADR 0009):** one effect or scene, up to two moments, three beats at most per page, at most four live WebGL contexts.
- **Hero scene** (Phase 3) is the page's effect and first beat. The v1 `fluted-glass` ground is retired.
- **Moments** are re-dealt in Phase 4 to fit around the scene. In v1, `letters-assemble` ("Engineering Without Friction.") and `iris-opens` (the dark band opening) were proposed; they stay candidates, not commitments.
- Beats never sit in neighbouring sections; a calm section between them; the back third of the page calm before the close.
- Everything rests under `prefers-reduced-motion`. Hover and press stay quiet (the kit's motion layer).

## Case-study art

Eleven vector illustrations (`site/public/images/work/`, built by `Documentation/art/build-case-art.mjs`), one idea each, redrawn from the old images' subjects. **v2 recolour (Phase 4):** plum-black line work on bone, and bone line work with gold accents for the dark band. One card group may carry a timed loop (2.5 to 4 s), paused under reduced motion.

## Home page plan (screens; carries over from v1, re-dealt in Phase 4)

| # | Section | One idea | Picture | Beat | Screens |
|---|---|---|---|---|---|
| 1 | `hero` | What Imkan builds and for whom | The cinematic scene (Phase 3) | scene | 1 |
| 2 | `platform` | Production systems, not slideware | App frame: the fraud-detection alert queue (case 1) | | 1 to 2 |
| 3 | `services` | The four services | 2×2 with UI fragments | | 1 to 2 |
| 4 | `methodology` | THINK, BUILD, EVOLVE | Search, integrations, a terminal run | | 1 |
| 5 | `statement` | Engineering Without Friction. | Type | moment candidate | 1 |
| 6 | `why-us` | The six advantages | Rows with real tool icons | | 1 |
| 7 | `cases` (dark band) | Proven impact in production | Case tiles with the recoloured art | moment candidate | 1 to 2 |
| 8 | `contact-form` | Get in Touch | The form on the page | | 1 |
| 9 | `about` | The two founders | Their real portraits | | 1 |
| 10 | footer | Close and directory | close-type, footer-dark | | 1 |

Other pages (ADR 0005): `/careers/`, `/work/`, `/work/<slug>/` (11), `/privacy/`, `/terms/`, the 404. Each gets its own plan before it is built.

## Open design questions

1. **Hero scene vs kinetic-type fallback** (O-003, Phase 3).
2. **Arabic check** of the logo (O-006, Phase 2.5).
3. **Illustrative UI text** in the hero and product windows needs Felipe's approval, and must not claim anything the case studies do not (O-005).
4. **`data-ground`** (the kit's lit ground for tech pages): keep, change or drop against bone (Phase 4).

## Do's and Don'ts

### Do
- Keep the kit unmodified; the token override above is the only deviation, and it lives in our page CSS.
- Use the tokens exactly as listed; no new colours in page CSS.
- One filled button per view; the main action reads "Get in Touch" everywhere.
- Let the work, the dark band and the gold carry the visual weight.

### Don't
- Gold on bone, plum body text, a third accent colour, decorative gradients, glows, glassmorphism, backdrop blur, scrims.
- Bold (700 or 800) headlines or tracked uppercase labels.
- Fade-in on scroll, parallax text, tilt, carousels, timed tabs.
- People other than the two founders; drawn look-alikes of real logos; invented clients, figures or claims.
- Em dashes in site copy.
