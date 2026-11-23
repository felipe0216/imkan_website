# 0003. Language scope: English at launch, Arabic later

- **Status:** Accepted
- **Date:** 2026-11-15
- **Decided by:** Felipe

## Context

Imkan.ai serves Saudi clients, so an Arabic version is likely to be wanted at some point. The redesign is built on the `design-taste-frontend` kit (ADR 0001, ADR 0002). Checked in the kit:

- It is built left to right. Its CSS has about 356 physical left and right rules (`margin-left`, `padding-right`, `left:` and similar) against 42 direction-aware ones (`margin-inline`, `inset-inline` and similar).
- Its font library (`library/type.json`) has no Arabic typefaces.
- Its copy checks (`scripts/copy-lint.mjs`) target English.
- Kit files cannot be edited (`kit-edited` fails the gate), so right-to-left support would have to come from our own override stylesheet, outside the skill's checks.

Options considered: bilingual at launch, English only, or English now with Arabic later.

## Decision

**Launch in English only, and keep the build ready for Arabic later.** While building the English site:

- Our own CSS (anything outside the kit) uses direction-aware properties: `margin-inline`, `padding-inline`, `inset-inline`, `text-align: start` and `end`.
- Every page sets `lang="en"` on `<html>`.
- Page paths leave room for Arabic under `/ar/` (for example `/ar/`, `/ar/careers/`).
- Text stays in the HTML. No text baked into images, so it can be translated later.
- Icons and images that imply a direction (arrows, sequences) are noted so they can be mirrored.

## Consequences

- No Arabic work blocks the English launch, and the skill's gate covers everything we ship.
- Arabic later is its own project:
  - Arabic pages under `/ar/` with `dir="rtl"`.
  - An `rtl.css` override layer for the kit's physical properties.
  - An Arabic font pairing chosen to sit with the English one.
  - Copy translated and reviewed by a native speaker.
  - Its own QA, since the skill's gate will not check it.
  - `i18n-sync` becomes useful only if strings move into locale files at that point.
- That project should get its own ADR when it starts.
