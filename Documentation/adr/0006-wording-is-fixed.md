# 0006. The site's wording is fixed; the redesign is visual only

- **Status:** Superseded by [0007](0007-design-first-wording-second.md) on 2026-11-16
- **Date:** 2026-11-15
- **Decided by:** Felipe

## Context

Felipe and the team worked hard on the site's text and do not want it rewritten. The redesign is about aesthetics.

`design-taste-frontend` normally writes the copy first and gates it with `scripts/copy-lint.mjs`. That checker fails slop words, stock phrases, two-fragment headings, eyebrow labels and similar patterns. It allows at most five waivers per page, and more than five is itself a FAIL (`references/gate.md`). A quick check of the current text against copy-lint's slop-word list alone found at least eight hits ("robust" three times, "empowering", "seamless", "cutting-edge", "world-class", "leverage"), before counting stock phrases and headline patterns. So the existing wording cannot pass the skill's copy gate, and the skill's fix would be to rewrite it.

## Decision

- **The wording on the site is not changed.** Every headline, paragraph, label, button text, case study, job description and legal text is carried over word for word.
- The redesign changes how the text looks and where it sits, not what it says. Moving existing text to a new page (for example a case study from a pop-up to `/work/<slug>/`) is allowed. Rewording, shortening, merging or cutting it is not, unless Felipe asks.
- The skill's copy steps (fact sheet, voice card, copy-lint fixes) are **not applied**. The gate's copy findings are reported as known and accepted under this decision. They are not fixed, and they are not counted toward the five-waiver limit for design findings.
- The skill's **design** checks (layout, consistency, accessibility, hover, motion, performance, photos) still apply in full and must pass.
- Where the new design needs text that does not exist yet (a page title for `/work/`, a nav label, a form status line, alt text), Claude proposes it as a clearly marked TODO for Felipe to approve. Nothing is invented and published without approval.

## Consequences

- The gate will not reach a literal `GATE: PASS` while copy findings are listed. Our definition of done is: no design FAILs, and copy FAILs only from the original wording.
- Layout must fit the text, not the other way round. Where a section's text does not fit the skill's one-screen section height, the section takes two screens or moves to its own page. The text is never cut.
- Eyebrow labels such as "Our Services" stay as text. The design decides how they look.
- This rule goes into CLAUDE.md so every session follows it.
