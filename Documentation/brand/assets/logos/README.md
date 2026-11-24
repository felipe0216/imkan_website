# IMKAN logo pack

The logo in three looks, ready to use in slides, documents, email, social media and print. `preview.png` shows every file on white, bone and plum-black.

| Look | What it looks like | Use it on |
|---|---|---|
| `light` | plum K, plum-black "IMKAN" and إمكان | white or bone (the default) |
| `dark` | gold K, bone "IMKAN" and إمكان | plum-black or any dark background |
| `light-gold` | gold K, plum-black "IMKAN" and إمكان | white or bone, shown large (the gold K is pale on light colours) |

## Files (each in all three looks)

| File | What it is | When to use it |
|---|---|---|
| `svg/imkan-logo-<look>.svg`, `png/imkan-logo-<look>.png` (2000x599) | The logo, transparent background | Placed on a background of the right colour (see the table above) |
| `svg/imkan-logo-<look>-bg.svg`, `png/imkan-logo-<look>-bg.png` (2400x1020) | The logo on its own background, with clear space | Wherever the background is unknown or wrong for the look (for example the dark logo in a white document) |
| `svg/imkan-mark-<look>.svg`, `png/imkan-mark-<look>-1024.png` | The K alone, transparent | Small spaces where the full logo is under 24 px tall |
| `svg/imkan-icon-<look>.svg`, `png/imkan-icon-<look>-{512,1024}.png` | The K on a rounded square | App icons, slide corners, favicons |
| `svg/imkan-avatar-<look>.svg`, `png/imkan-avatar-<look>-1024.png` | The K on a full square | Profile pictures (LinkedIn, WhatsApp, Teams, Google): the apps crop it to a circle |

SVG for anything that scales (web, print, design tools). PNG for apps that do not take SVG (some versions of Word and PowerPoint, email, social media).

## Colours

| Name | Hex | RGB |
|---|---|---|
| Plum | `#5e1654` | 94, 22, 84 |
| Plum-black | `#1b111d` | 27, 17, 29 |
| Gold | `#ffc233` | 255, 194, 51 |
| Bone | `#efece5` | 239, 236, 229 |

## Rules

- Keep clear space around the logo of at least the width of the K's straight bar (a quarter of the K's height).
- Do not recolour, stretch, rotate, outline or add shadows or effects.
- Do not show the full logo under 24 px tall; use the K alone below that.
- Gold is never used for text on a light background.

## Rebuilding

The files are made from the website's logo kit (`site/public/brand/svg`), so the shapes always match the site:

```
node Documentation/brand/assets/build-logos.mjs
```
