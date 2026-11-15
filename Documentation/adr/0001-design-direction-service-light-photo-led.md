# 0001. Design direction: light, photo-led service site

- **Status:** Accepted; amended by [0009](0009-site-kind-ai-software.md) (site kind is now AI / software with tech effects; the light ground and palette stay)
- **Date:** 2026-11-15
- **Decided by:** Felipe

## Context

The current Imkan.ai site reads as AI-generated: a dark ground, a cyan glow, glassmorphism cards, gradient headlines, eyebrow labels and a fictional product mock in the hero. The redesign uses the `design-taste-frontend` skill, which sorts sites into kinds, and the kind decides what is allowed. Three options were considered:

1. **Service:** light, editorial and photo-led. This is the honest classification for a consultancy.
2. **Software/tech:** dark grounds and effects are allowed, but only with real product UI Imkan has shipped and has permission to show.
3. **Own direction:** set the look ourselves and use the skill only as a checker.

## Decision

Imkan.ai is built as a **service** site under `design-taste-frontend`:

- Light grounds (cream or white), one accent color, and a font pairing dealt by the skill.
- No dark hero or dark pages, no glassmorphism or backdrop blur, no gradients or grain, and no shaders.
- Photographs carry the emotion. There is no fictional product UI.
- We follow the skill's service section plan and its copy rules: no eyebrows, no invented stats or clients, no slop words, no em dashes.

**People imagery:** the only people shown are the two co-founders, Felipe Araya and Dr. Syed Fawad Ali. We use their existing portraits in `public/images/profile_pictures/` (`real_felipe.png`, `real_syed.png`), cropped as needed. No stand-in photos of other people.

## Consequences

- The current DESIGN.md (dark, cyan, glass, Space Grotesk) becomes the legacy design. A new DESIGN.md will describe the new system.
- Space Grotesk, Material Symbols, the glass and spotlight utilities, and most of the current section styling will not carry over.
- The skill's service plan expects photos of the work and the rooms (`references/sections.md`, Service). We only have the two portraits. Other image slots will need either licensed non-people stand-ins from the skill's library, listed for later replacement, or a section plan that leans less on photos. To decide during the section plan.
- The team section becomes two people only.
- Case studies and client names can only appear where Felipe confirms the facts and the permission to show them.
- `real_syed.png` is about 7 MB. It needs a web-sized export (for example WebP) before use.
- Arabic and right-to-left support is not covered by the skill. It is a separate decision.
