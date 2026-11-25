# Imkan LinkedIn banners

LinkedIn banners in the three looks: "Possibility? Engineered!" with the site's line "AI and data engineering for Saudi enterprises · imkan.ai", and a large K cropped at the right edge.

| Look | What it looks like |
|---|---|
| Light | Bone, plum-black text, "Engineered!" in plum, a faint plum K |
| Dark | Plum-black, bone text, "Engineered!" in gold, a faint gold K |
| Light with gold | Bone, plum-black text, a gold K (gold is never text on bone) |

| File (in `linkedin/`) | Size | Where |
|---|---|---|
| `imkan-linkedin-company-<look>.png`, `@2x` | 1128x191, 2256x382 | Company page: Edit page, Header, Cover image |
| `imkan-linkedin-personal-<look>.png`, `@2x` | 1584x396, 3168x792 | Your own profile: the pencil on the background photo |

Upload the `@2x` file: LinkedIn scales it down and it stays sharp on high-resolution screens. `preview.png` shows all six.

The text sits in the middle band: on the company page LinkedIn sets the logo over the lower left and phones crop the sides, and on a personal profile the photo covers the lower left. After uploading, check the page once on a phone.

The profile picture for these pages is in the logo pack: `../logos/png/imkan-avatar-<look>-1024.png`.

## Rebuilding

```powershell
node Documentation/brand/assets/social/build-banners.mjs
```

It lays each banner out in HTML with the site's fonts and captures it with Edge (or Chrome; pass its path). Nothing to install.
