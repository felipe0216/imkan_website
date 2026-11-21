# Baseline: the current site before the redesign

Recorded on 2026-11-16 from the React site at the repository root (`npm run dev`, localhost:3000), so the redesign has something concrete to be measured against.

## Screenshots

Full-page captures through Chrome's DevTools protocol, at a normal viewport height (so `100vh` sections render at their real size), in `screenshots/`:

| File | Viewport | Page height |
|---|---|---|
| `home-1440.jpg` | 1440 × 900 | 7049 px |
| `home-768.jpg` | 768 × 1024 | 8710 px |
| `home-390.jpg` | 390 × 844 | 10678 px |
| `careers-1440.jpg` | 1440 × 900 | 3746 px |
| `careers-390.jpg` | 390 × 844 | 5416 px |

## Build size

`npm run build` (Vite 6.4.1):

| Asset | Size | Gzip |
|---|---|---|
| `index.html` | 4.06 kB | 1.41 kB |
| CSS | 1.04 kB | 0.52 kB |
| JS (React app) | 393.45 kB | 105.18 kB |

On top of that, the browser downloads the Tailwind CDN runtime (`cdn.tailwindcss.com`), which compiles CSS in the browser on every visit, plus two Google Fonts families (Space Grotesk, Material Symbols). The page renders nothing until the JavaScript has run.

## Design audit (`design-system` skill, Mode 2)

Scores are 0 to 10.

| # | Dimension | Score | Evidence |
|---|---|---|---|
| 1 | Color consistency | 6 | Theme tokens exist in `index.html`, but `#0B1215` (`WhyUs.tsx`) and `#05080a` (`Footer.tsx`) are hard-coded. Each section adds its own accent (emerald, purple, blue, orange, lime) on top of cyan. |
| 2 | Typography hierarchy | 5 | One family only. Section titles are `h1` under an `h2` eyebrow (`Services.tsx`, `Methodology.tsx`, `Team.tsx`). Two competing eyebrow styles (bold sans vs mono). |
| 3 | Spacing rhythm | 7 | Tailwind's 4px scale used throughout; sections sit on `py-24`. |
| 4 | Component consistency | 6 | Hero buttons use `rounded-lg`, all others `rounded-xl`. Cards share `.glass-card`, but three different card layouts across Services, Why Us and Case Studies. |
| 5 | Responsive behavior | 7 | Works at 390, 768 and 1440. The page is very long on phones (10,678 px). |
| 6 | Dark mode | 8 | Dark only, consistently. `background-light` is defined but unused. |
| 7 | Animation | 4 | Ambient scan lines, beams, shimmer, drifting gradient headline, bouncing chevron, pulsing "!" and hover scale on many cards. Much of it is decorative. |
| 8 | Accessibility | 4 | `text-gray-500` on the page background is 3.98:1 and on cards 3.43:1, below the 4.5:1 needed for body text; `text-gray-600` is 2.55:1. These classes appear 47 times. Inactive Methodology steps are faded further. Heading order is broken. Only 16 explicit focus styles across all components. |
| 9 | Information density | 5 | Services cards and Why Us cards are text-heavy at small sizes; the hero background mock adds visual noise behind the headline. |
| 10 | Polish | 7 | Hover states, transitions and modal patterns are consistent and careful. |

**Total: 59 / 100.**

## AI-slop check (`design-system` skill, Mode 3)

| Pattern | Present? | Where |
|---|---|---|
| Gratuitous gradients | Yes | Hero headline (cyan to white to lime, animated), radial glows behind sections, gradient overlays |
| Purple-to-blue defaults | Partly | Purple and blue as section accents next to cyan |
| Glassmorphism with no purpose | Yes | `.glass-card` on nearly every card, the nav pill and modals |
| Rounded everything | Yes | 12 to 16px radius on buttons, cards, images and inputs alike |
| Excessive scroll and ambient animation | Yes | See Animation above |
| Generic hero, centered text over a dark effect | Yes | "Possibility? Engineered!" centered over a blurred fictional product mock |
| Sans with no personality | Partly | Space Grotesk, a very common choice for AI and tech sites |

Other tells that `design-taste-frontend` also flags: eyebrow labels above every section, a neon glow on the primary button, a cursor-following spotlight, an oversized faded wordmark in the footer, and a dark, techy look for a service business.

## Notes for the redesign

- The current logo is bilingual: "IMKAN" in spaced capitals over the Arabic "إمكان". Worth considering for the new logo (ADR 0008), since Arabic is planned later (ADR 0003).
- The nav has a "Portal" link (`components/Navbar.tsx`) that opens Imkan's internal SharePoint document library in a new tab. Whether a public site should link to it, and whether it stays on the new site, needs confirming with Felipe.
- Strengths worth keeping: the consistent modal behaviour, careful hover transitions, and the clear section order.
