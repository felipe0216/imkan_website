# 0010. Visual direction v2: light (not white), cinematic hero, new logo

- **Status:** Accepted. Replaces the oxblood-on-stone palette, the working logo and the `fluted-glass` hero from ADRs 0008 and 0009; the AI/software classification (0009) stays.
- **Date:** 2026-11-16
- **Decided by:** Felipe

## Context

Felipe reviewed the first home page build. He likes the layout, the minimal approach and the new elements (the product windows, the case art, the sections), but:

- the oxblood and grey palette does not feel elite or cool;
- the hero's animation (a quiet WebGL ground behind a chat window) is not impressive;
- the working logo does not look cool or stylish, and it will also be used in the email signature.

## Decision

1. **Colour: light, but not white.** A tinted light ground with high-contrast ink and one accent, chosen for an AI engineering firm. The skill deals light palettes for the AI trade (`start.mjs deal --page software --trade ai --light`); three are previewed with the chosen logo; Felipe picks; the result is applied with `start.mjs brand`.
2. **Hero: one cinematic scroll scene** from the kit's big scenes, dealt from those Imkan's assets qualify it for. It is the page's one effect. **Fallback:** a kinetic-type opener (for example a claim that forms from a dot, or flies apart and answers itself), kept in mind if the scene does not convince.
3. **Logo: three directions first.** Shapes are explored in monochrome, Felipe picks one, then it is refined and delivered as a full kit, including PNGs for the email signature. A solid symbol can also drive the hero scene.
4. **The rest of v1 stays:** layout, sections, product windows, case art (recoloured), copy handling, and all earlier ADRs not named above.

## Consequences

- `DESIGN.md` is rewritten for v2 once the palette and logo are chosen.
- The home page is re-themed, its moments re-dealt around the scene's beat budget, then tuned for tablet and phone.
- Earlier approvals of the oxblood palette and the working logo are superseded.
- Email signature assets must be PNG (Outlook and Gmail do not reliably render SVG).
