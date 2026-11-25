# Imkan company profile

A two-page A4 company profile to send after a first call or leave after a meeting, in the three looks. One A4 sheet printed on both sides.

| Look | What it looks like | File |
|---|---|---|
| Light | Bone pages, plum accents ("Engineered!", step labels, industry tags, the 15+), plum-black contact band | `imkan-profile-light.pdf` |
| Dark | Plum-black pages, gold accents and gold K, bone text, a gold contact band | `imkan-profile-dark.pdf` |
| Light with gold | Bone pages, gold K, gold fills with plum-black text (labels, tags, the 15+ panel, the contact band); gold never as text on bone | `imkan-profile-light-gold.pdf` |

`preview/` has each page as a PNG; `preview.png` shows all six.

**Page 1:** the logo, "Possibility? Engineered!", the one-line description, the three service steps, the industries, and Proven Impact (15+ and the 11 production systems).
**Page 2:** the imkan.ai Advantage (six points), Context First (Think, Build, Evolve), "Engineering Without Friction.", the founders, and the contact band (info@imkan.ai, imkan.ai, LinkedIn).

## Wording

Every line is the live site's own wording, so the profile claims nothing the site does not. Two labels are new, "Company profile" and "Industries", and wait for review in `Documentation/wording-changes.md` (rows 129, 130). When the site's wording changes, change it in the `CONTENT` block of `build-profile.mjs` too.

## Rebuilding

`build-profile.mjs` lays the pages out in HTML with the site's fonts (`site/public/fonts`), the logo pack and the team photos, and prints them to PDF with Edge (or Chrome). Nothing to install.

```powershell
node Documentation/brand/assets/profile/build-profile.mjs
```

Pass the browser's path as an argument if Edge is not at its usual place. The page previews are made from the PDFs with Windows' own PDF renderer (not part of the build).
