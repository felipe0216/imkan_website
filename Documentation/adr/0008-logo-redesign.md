# 0008. Logo redesign as part of the site redesign

- **Status:** Accepted
- **Date:** 2026-11-16
- **Decided by:** Felipe

## Context

The repo only has the logo as PNG files (`public/images/logos/imkan-logo.png`, `imkan-logo-full.png`, `imkan-logo-horizontal.png`), plus `public/favicon.svg`. `design-taste-frontend` wants a vector logo, and the current logo belongs to the look the redesign is replacing (ADR 0001).

## Decision

- Claude designs a **new Imkan.ai logo** as part of the redesign: a wordmark and a compact mark, as SVG. It is built to suit the new visual system rather than carry over the cyan, dark-mode identity.
- The new logo is used on the new site **for now**, as a working logo. Felipe reviews it, and it can be revised or replaced by a professionally designed one later.
- The old PNG logos stay in the repo for the old site until cut-over.

## Consequences

- Deliverables: a primary wordmark SVG, a compact mark SVG (also the favicon), and a monochrome version for dark and light grounds. All are hand-written, clean SVG with no embedded raster images.
- The logo is designed after the palette and fonts are chosen, so it matches them. The company name stays exactly "imkan.ai" (or "Imkan.ai"; to confirm with Felipe which casing the wordmark uses).
- The skill's own "mark" choice in its deal step informs the logo's style.
- The favicon and social share image (`share.jpg`) are regenerated from the new logo.
