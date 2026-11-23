# 0009. Site kind: AI / software, with tech effects

- **Status:** Accepted. Supersedes the "service, no effects" part of [0001](0001-design-direction-service-light-photo-led.md); the light ground, the approved palette, type and logo stay.
- **Date:** 2026-11-16
- **Decided by:** Felipe

## Context

ADR 0001 classified Imkan as a service firm, which under `design-taste-frontend` allows no effects, loops or animated diagrams (`references/effects-usage.md`, "The gate"). Felipe wants the site to show that Imkan is a tech company, with graphics and animation, but only where the skill supports it.

The skill states that "AI and developer tools count as software", and house rule 8 lists AI among the trades with a technical subject. Imkan sells AI and data engineering, so classifying it as software is within the skill's rules. The skill's `brand` command lets a client keep its own colours, so the palette, type and logo Felipe approved on 2026-11-16 carry over unchanged.

## Decision

- `<html data-type="software">`, `<meta name="page-type" content="software">`, `<meta name="site-kind" content="software">`. The trade is AI.
- Palette and type through `start.mjs brand` with the approved values: oxblood `#7d0c14` on stone `#e2e2e2`, Schibsted Grotesk.
- Re-dealt for software (2026-11-16):
  - **Hero:** `centred` (a centred headline over one app window rising out of a lit frame, the x.ai pattern).
  - **Effect:** `fluted-glass`, a quiet WebGL ground in the hero's frame, behind the window.
  - **Moments:** `iris-opens` (the dark band opens from a disc) and `letters-assemble` (a short statement whose letters fly into place).
  - **Unchanged, valid for both kinds:** nav-centre, footer-dark, close-type, dark-band, tonal buttons, mark stack.
- **The "product" shown is the work Imkan has delivered.** The app window and the app-frame show systems from the real, anonymised case studies (for example the AI negotiation agent or the fraud-detection queue) as live HTML. Nothing presents an invented product as Imkan's own.
- **Case-study pictures:** vector illustrations of each case's subject, redrawn from the current images' ideas in the new style (oxblood line work on stone), with at most one timed loop per card group, as the skill allows on software.

## Consequences

- Allowed now: one live effect, up to two moments, pulsing diagram cards (0 to 2), one timed loop per card group, CSS grounds (0 to 2), and the dark band. At most four live WebGL contexts; three beats at most, never in neighbouring sections.
- The `pinned-chapters` and `word-highlight` moments from the service deal are dropped. The methodology becomes a steps section.
- The software page plan applies (`references/sections.md`, Software): hero, app-frame, feature sections in different layouts, proof, close. Imkan has no pricing, so the calm section before the close is the team and the contact form.
- Pages must also follow the software copy budget of 60 to 80 words a screen outside UI mocks. Where the existing wording runs longer, it is trimmed and logged (ADR 0007).
- The UI shown in the hero window and the app-frame is new illustrative text. It is proposed to Felipe as a TODO and must match the facts of the case it shows.
