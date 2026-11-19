# IMKAN brand kit

Logo: IK Monogram "B. Open K" with IMKAN in Geist 500 and إمكان in IBM Plex Sans Arabic 500 (D-017). Palette: midnight plum and gold (D-018). Overview: `logo-kit.jpg`.

The files live in `site/public/brand/`, so after cut-over they are served at `https://imkan.ai/brand/...`. All text in the logo is outlined, so no font is needed to display it.

| Use | File |
|---|---|
| Website, documents, light backgrounds | `svg/imkan-lockup.svg` (plum mark, plum-black text) |
| One colour, light backgrounds (print, stamps, fax) | `svg/imkan-lockup-ink.svg` |
| Dark backgrounds | `svg/imkan-lockup-on-dark.svg` (gold mark, bone text) |
| One colour, dark backgrounds | `svg/imkan-lockup-bone.svg` |
| Mark only | `svg/imkan-symbol{,-ink,-gold,-bone}.svg` |
| Slides, Word, anything that needs a PNG | `png/imkan-lockup-large.png`, `png/imkan-lockup-on-dark-large.png` (1042x312, transparent) |
| Small PNGs (44 px tall at 1x/2x/3x) | `png/imkan-lockup@{1,2,3}x.png`, `png/imkan-lockup-on-dark@{1,2,3}x.png` |
| Email signature | `png/imkan-email-logo@2x.png` (white tile), template in `email-signature.html` |
| Favicon | `favicon.svg`, `favicon.ico` (16/32/48), `png/favicon-{16,32,48}.png` |
| Phone home screen | `png/apple-touch-icon.png` (180), `png/icon-{192,512}.png`, `site.webmanifest` |
| LinkedIn, X, WhatsApp, Teams avatar | `png/imkan-avatar-dark-1024.png` (gold on midnight plum), `png/imkan-avatar-light-1024.png`, `png/imkan-avatar-dark-400.png` |

Rules: keep clear space of at least the width of the I bar (24% of the mark's height) around the logo. Do not recolour, stretch, outline or add effects. Gold appears only on dark backgrounds. The lockup should not be shown under 24 px tall; use the mark alone below that.

Rebuild: `node Documentation/logo/build-logo-kit.cjs site/public/brand` (needs `harfbuzzjs` and the Geist and IBM Plex Sans Arabic font files next to the script, which are not committed), then `node Documentation/logo/render-png.mjs <chrome.exe> <jobs>` for PNGs.
