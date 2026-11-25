# IMKAN brand kit

Logo: IK Monogram "B. Open K" with IMKAN in Geist 500 and إمكان in IBM Plex Sans Arabic 500 (D-017). Palette: midnight plum and gold (D-018). Overview: `logo-kit.jpg`.

The files live in `site/public/brand/`, so they are served at `https://www.imkan.ai/brand/...`. All text in the logo is outlined, so no font is needed to display it.

Logo pack in the three looks (light, dark, light with gold) for slides, documents and social media: `assets/logos/` (see its README).

PowerPoint templates in the three looks, with example decks: `assets/slides/` (see its README). Word templates (a letterhead and a report per look, with PDF examples): `assets/documents/` (see its README). The two-page company profile (PDF, three looks): `assets/profile/`. The brand fonts (Funnel Display and Funnel Sans, OFL) to install for them: `assets/fonts/`.

| Use | File |
|---|---|
| Website, documents, light backgrounds | `svg/imkan-lockup.svg` (plum mark, plum-black text) |
| One colour, light backgrounds (print, stamps, fax) | `svg/imkan-lockup-ink.svg` |
| Dark backgrounds | `svg/imkan-lockup-on-dark.svg` (gold mark, bone text) |
| One colour, dark backgrounds | `svg/imkan-lockup-bone.svg` |
| Gold mark on light backgrounds (mark is pale: 1.6:1, so use large) | `svg/imkan-lockup-gold-ink.svg` |
| Pure black (print, single-colour stamps) | `svg/imkan-lockup-black.svg` |
| Mark only | `svg/imkan-symbol{,-ink,-gold,-bone}.svg` |
| Slides, Word, anything that needs a PNG | `png/imkan-lockup[-variant]-large.png` (1042x312, transparent) for every lockup colourway |
| Small PNGs (44 px tall at 1x/2x/3x) | `png/imkan-lockup[-variant]@{1,2,3}x.png` for every lockup colourway; variants: none (primary), `-on-dark`, `-ink`, `-bone`, `-gold-ink`, `-black` |
| Mark only as PNG | `png/imkan-symbol[-ink,-gold,-bone]-{256,1024}.png` (transparent) |
| Email signature | `Documentation/brand/email-signature.html`: open it, type your details, copy one of the three looks (light, dark, light with gold), steps for Gmail, Outlook and Apple Mail inside. Logos `email/imkan-email-{light,dark,light-gold}@{2,3}x.png`, served from `https://www.imkan.ai/brand/email/`. The older 163x60 tiles (`png/imkan-email-logo*`) stay for signatures already in use |
| Favicon | `favicon.svg`, `favicon.ico` (16/32/48), `png/favicon-{16,32,48}.png` |
| Phone home screen | `png/apple-touch-icon.png` (180), `png/icon-{192,512}.png`, `png/icon-light-{192,512}.png`, `site.webmanifest` |
| LinkedIn, X, WhatsApp, Teams avatar | `png/imkan-avatar-dark-1024.png` (gold on midnight plum), `png/imkan-avatar-light-1024.png`, `png/imkan-avatar-{dark,light}-400.png` |

Rules: keep clear space of at least the width of the I bar (24% of the mark's height) around the logo. Do not recolour, stretch, outline or add effects. Gold appears only on dark backgrounds. The lockup should not be shown under 24 px tall; use the mark alone below that.

Rebuild: `node Documentation/logo/build-logo-kit.cjs site/public/brand` (needs `harfbuzzjs` and the Geist and IBM Plex Sans Arabic font files next to the script, which are not committed), then `node Documentation/logo/render-png.mjs <chrome.exe> <jobs>` for PNGs.
