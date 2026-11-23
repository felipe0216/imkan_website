---
version: alpha
name: Imkan.ai
description: The visual system of the Imkan.ai website as it is built today. A dark, engineered interface on near-black blue-grey, one electric cyan that carries every action and highlight, frosted glass cards with a cursor-following spotlight, and a single geometric sans (Space Grotesk) set heavy and tight for headlines.

colors:
  primary: "#25e2f4"
  on-primary: "#0A0F14"
  accent-green: "#a3e635"
  accent-emerald: "#34d399"
  accent-purple: "#c084fc"
  accent-blue: "#60a5fa"
  accent-orange: "#fb923c"
  background: "#0A0F14"
  background-alt: "#0B1215"
  background-footer: "#05080a"
  surface: "#162024"
  surface-raised: "#132325"
  glass: "rgba(255, 255, 255, 0.03)"
  glass-hover: "rgba(255, 255, 255, 0.05)"
  hairline: "rgba(255, 255, 255, 0.10)"
  hairline-soft: "rgba(255, 255, 255, 0.05)"
  ink: "#ffffff"
  ink-secondary: "#d1d5db"
  ink-muted: "#9ca3af"
  ink-faint: "#6b7280"
  scrollbar: "#223033"
  error: "#f87171"

typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 96px
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: -0.05em
  heading-1:
    fontFamily: Space Grotesk
    fontSize: 60px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.025em
  heading-2:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.025em
  heading-3:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  title:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  lead:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.625
    letterSpacing: 0
  body:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  button:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.025em
  nav:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  eyebrow:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.1em
  eyebrow-mono:
    fontFamily: monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.2em

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  section: 96px

components:
  nav-pill:
    backgroundColor: "{colors.glass-hover}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline-soft}"
    typography: "{typography.nav}"
    rounded: "{rounded.full}"

  nav-link-active:
    backgroundColor: "rgba(37, 226, 244, 0.20)"
    textColor: "{colors.ink}"
    indicator: "{colors.primary}"
    rounded: "{rounded.full}"

  hero:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"

  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    hoverBackground: "{colors.ink}"
    glow: "0 0 20px rgba(37, 226, 244, 0.3)"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"

  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "rgba(255, 255, 255, 0.20)"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"

  text-input:
    backgroundColor: "{colors.glass-hover}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    focusBorder: "{colors.primary}"
    placeholder: "{colors.ink-faint}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"

  glass-card:
    backgroundColor: "{colors.glass}"
    borderColor: "rgba(255, 255, 255, 0.08)"
    backdropBlur: 16px
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"

  spotlight-card:
    extends: glass-card
    hoverGlow: "radial-gradient(800px circle at cursor, rgba(37, 226, 244, 0.08), transparent 40%)"
    hoverBorder: "section accent color"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg} to {spacing.xl}"

  modal-card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    scrim: "rgba(10, 15, 20, 0.80) + backdrop blur"
    rounded: "{rounded.lg}"
    maxWidth: 672px to 896px

  tag-chip:
    backgroundColor: "rgba(0, 0, 0, 0.30)"
    textColor: "rgba(255, 255, 255, 0.80)"
    borderColor: "{colors.hairline}"
    typography: "{typography.eyebrow-mono}"
    rounded: "{rounded.xs}"

  eyebrow-label:
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"

  footer:
    backgroundColor: "{colors.background-footer}"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
---

> **Legacy design (archived 2026-11-16).** This describes the current production site (dark, cyan, glassmorphism). The redesign replaces it (ADR 0001). Use this file only when maintaining the old React site at the repository root. The new site's visual system will live in a new `DESIGN.md`.

## Overview

Imkan.ai looks like an engineering console after dark. Every page sits on a near-black blue-grey (`{colors.background}`, #0A0F14) with no light mode. Content floats on frosted glass panels, and one electric cyan (`{colors.primary}`, #25e2f4) does nearly all the signalling: buttons, active nav, eyebrows, focus rings, glows and the scrollbar hover. The mood is precise, technical and confident, matching a Saudi AI and data engineering consultancy that promises "engineering excellence" in weeks, not quarters.

The hero sets the tone. Instead of a photo, a live product mock (`HeroBackground.tsx`) plays behind a dark gradient, and the headline "Possibility? Engineered!" is set in the heaviest weight of Space Grotesk, tightly tracked, with a cyan to white to lime gradient that slowly drifts.

Depth comes from light, not shadow. Cards are translucent glass with a hairline white border, and when the cursor moves over them a soft cyan spotlight follows it. Buttons and active elements emit a cyan glow instead of a drop shadow.

**Key characteristics**
- Dark mode only. The base is `{colors.background}`, with slightly lifted surfaces for cards and modals.
- One accent color, cyan, for every primary action and highlight. Other hues appear only to tell parallel items apart.
- A single typeface, Space Grotesk, from weight 300 (lead copy) up to 900 (hero). Hierarchy comes from weight and size.
- Glassmorphism: `.glass-card` (3% white fill, 16px blur, 8% white border) is the default container.
- Light as depth: cyan glows, radial gradients and a cursor-following spotlight replace classic elevation.
- Motion is CSS only, and mostly slow and ambient (scan lines, beams, shimmer, drifting gradients).

## Colors

All theme tokens are defined in the inline `tailwind.config` in `index.html`. Utilities that need raw values (`index.css`) repeat the same hex codes.

### Brand and accent
- **Cyan** (`{colors.primary}`, #25e2f4): the brand color. Primary buttons, active nav state, section eyebrows, input focus, links on hover, glows and the grid pattern. Tailwind: `primary`.
- **Lime** (`{colors.accent-green}`, #a3e635): the second brand hue. Used at the end of the hero headline gradient and as one item color in Why Us. Tailwind: `accent-green`.
- **Item accents**: when a section shows several parallel items (services, methodology steps, advantages), each item gets its own hue so they can be told apart. The fixed order is cyan, then `{colors.accent-emerald}` (emerald-400), `{colors.accent-purple}` (purple-400), `{colors.accent-blue}` (blue-400), with `{colors.accent-orange}` (orange-400) as an extra. These are stored per item as a `colorClass` string and drive the item's icon, title, hover border and spotlight tint. They are never used for buttons.

### Surfaces
- **Background** (`{colors.background}`, #0A0F14): the page. Tailwind: `background-dark`.
- **Background alt** (`{colors.background-alt}`, #0B1215): a barely different band used by Why Us to separate it from its neighbours. Currently a hard-coded hex.
- **Footer** (`{colors.background-footer}`, #05080a): the darkest surface, used only by the footer. Currently a hard-coded hex.
- **Surface** (`{colors.surface}`, #162024): solid panel for modals. Tailwind: `background-card`.
- **Surface raised** (`{colors.surface-raised}`, #132325): solid card fill used under glass in Why Us. Tailwind: `surface-dark`.
- **Glass** (`{colors.glass}` to `{colors.glass-hover}`): 3 to 5% white over the background, the default card and input fill.
- **Hairlines**: white at 10% (`{colors.hairline}`) for card, input and modal borders; white at 5% (`{colors.hairline-soft}`) for section dividers.

### Text
- **Ink** (`{colors.ink}`, white): headings, button labels on dark, active states.
- **Ink secondary** (`{colors.ink-secondary}`, gray-300): default body copy in cards and modals. The most used text color after white.
- **Ink muted** (`{colors.ink-muted}`, gray-400): lead paragraphs, inactive nav links, footer links.
- **Ink faint** (`{colors.ink-faint}`, gray-500): meta text, captions, placeholders.

### Semantic
- **Error** (`{colors.error}`, red-400): form validation messages.

## Typography

### Font family
- **Space Grotesk** (Google Fonts, weights 300 to 700, with 900 synthesised by the browser for `font-black`) is the only typeface. It is set as both `font-display` and `font-sans`, so everything inherits it.
- **Monospace** (the system stack, via `font-mono`) appears only in small uppercase tags and some eyebrows, to add a technical, terminal-like note.
- **Material Symbols Outlined** for icons, unfilled, weight 400.

### Hierarchy

Sizes are mobile first; the larger value applies from `md` (768px) or `lg` (1024px).

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `{typography.display}` | 48 → 72 → 96px | 900 | 0.95 | Hero headline only |
| `{typography.heading-1}` | 36 → 60px | 700 | tight | Section titles (Methodology, Why Us, Careers hero) |
| `{typography.heading-2}` | 30/36 → 48px | 700 | tight | Section titles (Services, Team, Case Studies, footer CTA) |
| `{typography.heading-3}` | 30 → 36px | 700 | normal | Modal titles, sub-sections |
| `{typography.title}` | 24px | 700 | normal | Card titles, legal page headings |
| `{typography.lead}` | 18 → 20px | 300 | relaxed | Hero subtitle, section intros |
| `{typography.body}` | 16px | 400 | relaxed | Modal body, long text |
| `{typography.body-sm}` | 14px | 400 | relaxed | Card body, footer, lists. The most common size. |
| `{typography.button}` | 14 to 16px | 700 | 1 | Button labels |
| `{typography.nav}` | 12px | 500 | 1 | Desktop nav pills |
| `{typography.eyebrow}` | 14px | 700, uppercase | | Section overlines ("Our Services", "Our Framework") |
| `{typography.eyebrow-mono}` | 12px | mono, uppercase | | Overlines and tags ("Production Systems") |

### Principles
- Weight carries hierarchy. Headlines are bold (700) or black (900) with tight tracking; supporting copy drops to 300 or 400 with relaxed line height.
- Every section header follows the same pattern: a cyan uppercase eyebrow, then a large white heading, often with one word in cyan or a gradient, then a gray lead paragraph.
- Body copy uses `leading-relaxed` almost everywhere. Keep it that way on dark backgrounds.

## Layout

### Spacing
- Base unit 4px (Tailwind default). The most common gaps are 8px (`gap-2`), 12px and 16px.
- Card padding is 24px (`p-6`), or 32px (`p-8`) for larger cards.
- Sections use 96px vertical padding (`py-24`), with 80px on some mobile layouts.

### Grid and container
- Content is centred in `max-w-7xl` (1280px) with 24px side padding (`px-6`).
- Intro paragraphs are capped at `max-w-2xl` (672px) for readable line length.
- Card grids run 1 column on mobile, 2 on tablet and 3 or 4 on desktop. Several sections ship a separate mobile layout instead of simply stacking the desktop one.

### Section order
Home: Hero (`home`) → Services (`services`) → Methodology (`methodology`) → Why Us (`why-us`) → Case Studies (`cases`) → Team (`about`) → Footer with closing CTA. `/careers` is a separate page with the same Navbar and Footer.

### Responsive
| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | below 640px | Single column, stacked buttons, hamburger menu, smaller display type |
| `sm` | 640px | Buttons sit side by side |
| `md` | 768px | Larger headings, 2-column grids, desktop variants of some sections |
| `lg` | 1024px | Full display size, 3 to 4-column grids, pill nav |

Touch targets should stay at least 44px. The hero buttons are 56px tall (`h-14`).

## Elevation and depth

| Level | Treatment | Use |
|---|---|---|
| 0 | Flat background, sections separated by a 5% white top border | Page sections |
| 1 | Glass fill + 16px blur + hairline border | Cards, nav pill, inputs |
| 2 | Glass + cursor spotlight on hover, accent border on hover | Interactive cards (Services, Methodology, Why Us) |
| 3 | Solid `{colors.surface}`, `shadow-2xl`, dark blurred scrim behind | Modals |

**Glow, not shadow.** Primary buttons and active nav use cyan box-shadow glows (`0 0 15px` to `0 0 30px` at 30 to 50% opacity). Headlines can use `.text-glow`. Large radial cyan gradients (`.hero-glow`) light up empty backgrounds. Keep glow opacity low: it should feel like light on glass, not neon.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tags and chips |
| `{rounded.sm}` | 8px | Hero buttons, small elements |
| `{rounded.md}` | 12px | Buttons, inputs, images in cards |
| `{rounded.lg}` | 16px | Cards and modals (`rounded-2xl`) |
| `{rounded.full}` | pill | Nav pill and its links, avatars, status dots, scroll indicator |

## Components

### Navigation
**`nav-pill`**: a floating, fully rounded glass bar on desktop holding the section links at 12px. The active link gets a 20% cyan fill, a cyan glow and a short cyan underline. On hover a cyan underline grows in. On mobile a hamburger opens a full-screen menu. The nav highlights the current section using an IntersectionObserver on the section IDs.

### Hero
**`hero`**: full viewport height. Layers from back to front: the animated product mock, a dark gradient and vignette for readability, then centred text. Display headline, a 300-weight gray lead, and two buttons: primary "Get in Touch" (with an arrow and a shimmer on hover) and secondary "Why Us?". A bouncing chevron hints at scrolling.

### Buttons
**`button-primary`**: cyan fill, dark text (`text-background-dark`), bold, 12px radius (8px in the hero), soft cyan glow. On hover the fill turns white and the glow strengthens. Used for every contact or submit action.

**`button-secondary`**: transparent or 5% white fill with a 10 to 20% white border and white text. Hover raises the fill to 5 to 10% and brightens the border.

**Text links**: gray, turning white or cyan on hover, sometimes with an arrow that slides right.

### Inputs
**`text-input`**: 5% white fill, 10% white border, 12px radius, white text, gray-500 placeholder. On focus the border and a 1px ring turn cyan. Errors show in red-400 beneath the field.

### Cards
**`glass-card`**: the default container. 16px radius, 24px padding, translucent fill and hairline border. Careers role cards brighten their border to cyan on hover.

**`spotlight-card`**: a glass card with a radial cyan glow that follows the cursor (`--mouse-x` and `--mouse-y` set by the `handleMouseMove` helper). On hover it scales up slightly or lifts by 4px, and its border takes the item's accent color. Clicking usually opens a detail modal.

**Case study cards**: an image with a dark overlay, a mono uppercase tag in the corner, and the client and result below.

### Modals
**`modal-card`**: centred, `max-w-2xl` to `max-w-4xl`, solid `{colors.surface}` panel, hairline border, 16px radius, `shadow-2xl`, over an 80% dark scrim with blur. A close button with the Material `close` icon sits top right. Tall modals scroll inside and lock page scroll while open. Contact CTAs inside a modal close it first, then open the contact form.

### Signature details
- **Eyebrow + heading** pattern on every section (see Typography).
- **Tag chips**: tiny mono uppercase labels on a 30% black glass chip, used for case-study categories and tech stacks.
- **Footer wordmark**: an oversized "imkan", a cyan dot, then "ai", in weight 900 at 20% of the viewport width. It sits behind the footer content at 3% opacity as a watermark, over a faint 40px grid.
- **Ambient motion**: `animate-scan`, `animate-beam`, `animate-pulse-slow` and `animate-text-gradient` keep the page subtly alive. All are CSS keyframes in `index.html`.

## Imagery
- Images live in `public/images/` (`logos/`, `methodology/`, `profile_pictures/`, `services/`, `use_cases/`).
- Case study and service images are dark, technical visuals shown under dark gradients so text stays readable.
- Team photos are real portraits. Never replace them with stock or generated people.
- The hero uses a coded product mock instead of a photo. Keep fictional client names in that mock clearly fictional.

## Motion
- CSS transitions only. Common durations: 300ms for colors and small moves, 500ms for card hover, 700 to 1000ms for large reveals.
- Hover vocabulary: color shift to white or cyan, slight scale (1.02 to 1.05), 4px lift, arrow nudge, glow increase.
- Respect `prefers-reduced-motion`. `HeroBackground.tsx` already does; any new looping animation must too.

## Do's and Don'ts

### Do
- Keep every surface dark. Lift with glass and light, not with lighter solid backgrounds.
- Use cyan for the primary action and the main highlight in each view.
- Use the theme tokens (`primary`, `background-dark`, `background-card`, `surface-dark`, `accent-green`) and white opacity steps (5, 10, 20%) instead of new hex values.
- Follow the eyebrow, heading, lead pattern for new sections.
- Reuse `.glass-card`, `.spotlight-card` and the existing modal structure exactly.
- Give parallel items distinct accents from the fixed order: cyan, emerald, purple, blue, then orange.
- Keep glows soft and low opacity.

### Don't
- Don't add a light theme or white sections. `background-light` exists in the config but is unused.
- Don't put the item accents (emerald, purple, blue, orange) on buttons. Buttons are cyan or neutral glass.
- Don't introduce a second typeface for headings or body.
- Don't use hard drop shadows for depth on dark backgrounds. Use glass, borders and glow.
- Don't add animation libraries for effects CSS can already do.
- Don't use em dashes in site copy.

## Known inconsistencies

These exist in the current code. Fix them when touching the area rather than copying them.
- Button radius: hero buttons use 8px (`rounded-lg`), all others use 12px (`rounded-xl`).
- Eyebrows come in two styles: bold sans with `tracking-widest` (Services, Methodology, Team) and mono `text-xs` with `tracking-[0.2em]` (Why Us, Case Studies).
- Section and footer backgrounds `#0B1215` and `#05080a` are hard-coded instead of being theme tokens.
- Some heading levels are out of order: section titles use `h1` with an `h2` eyebrow above them, and the footer wordmark is an `h1`.
