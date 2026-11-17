# Decision tracker

The running log of decisions, amendments and debates for the redesign, and the addendum to `PROJECT_SPEC.md`. **Where this file and the spec differ, this file wins.** Newest entries at the bottom. Detailed records live in `Documentation/adr/` and are linked from here.

Status values: **Accepted**, **Superseded by D-xxx**, **Open** (waiting on a decision), **Proposed**.

## Index

| ID | Date | Decision | Status | Record |
|---|---|---|---|---|
| D-001 | 2026-11-15 | Design direction: light, photo-led service site | Amended by D-009, D-012 | [ADR 0001](Documentation/adr/0001-design-direction-service-light-photo-led.md) |
| D-002 | 2026-11-15 | Tech: static HTML pages with Vite and the design-taste-frontend kit; no React, no Tailwind | Accepted | [ADR 0002](Documentation/adr/0002-tech-approach-static-html-vite.md) |
| D-003 | 2026-11-15 | Language: English at launch, Arabic later under `/ar/` | Accepted | [ADR 0003](Documentation/adr/0003-language-scope-english-first.md) |
| D-004 | 2026-11-15 | Dev environment: `site/` on `feature/redesign`, draft-PR preview, merge is cut-over | Accepted | [ADR 0004](Documentation/adr/0004-dev-environment-branch-preview.md) |
| D-005 | 2026-11-15 | Pages: home, careers, work index + 11 cases, privacy, terms | Accepted | [ADR 0005](Documentation/adr/0005-pages-in-scope.md) |
| D-006 | 2026-11-15 | Wording fixed word for word | Superseded by D-007 | [ADR 0006](Documentation/adr/0006-wording-is-fixed.md) |
| D-007 | 2026-11-16 | Design first, wording second; edits logged; facts never change | Accepted | [ADR 0007](Documentation/adr/0007-design-first-wording-second.md) |
| D-008 | 2026-11-16 | Logo redesign in scope | Accepted (direction by D-012) | [ADR 0008](Documentation/adr/0008-logo-redesign.md) |
| D-009 | 2026-11-16 | Site kind AI/software: effects, scenes and dark bands allowed | Accepted | [ADR 0009](Documentation/adr/0009-site-kind-ai-software.md) |
| D-010 | 2026-11-16 | Answers: roles shown closed; error email info@imkan.ai; Portal link removed; stats use ranges; "5 More Solutions" dropped; wordmark "IMKAN" + Arabic | Accepted | `Documentation/wording-changes.md` 1-6 |
| D-011 | 2026-11-16 | `design-taste-frontend` runs in manual mode (no Stop hook) | Accepted | CLAUDE.md, skills playbook |
| D-012 | 2026-11-16 | Visual direction v2: light not white, cinematic hero scene (kinetic-type fallback), new logo from three directions | Accepted | [ADR 0010](Documentation/adr/0010-visual-direction-v2.md) |
| D-013 | 2026-11-16 | Way of working: plan first, one major item at a time, assumptions stated, solutions scrutinised, done/left lists, memory summaries | Accepted | CLAUDE.md, "Working style" |
| D-014 | 2026-11-16 | Planning files: `PROJECT_SPEC.md` (master plan) + this tracker (addendum, indexes the ADRs); no separate Addendum.md | Accepted | this file |
| D-015 | 2026-11-16 | No root `requirements.txt`: manifests stay where their tools read them (`api/requirements*.txt`, `site/package.json`) | Proposed (pushback on the requested file) | PROJECT_SPEC §8 item 8 |
| D-016 | 2026-11-16 | Logo direction: the IK Monogram (I bar + K-notched block), lettering in Geist with IBM Plex Sans Arabic; to be refined | Accepted (closes O-001) | `Documentation/logo/exploration/` |
| D-017 | 2026-11-16 | Logo refinement: **B. Open K** (I bar + one chevron of K arms), lettering type 2: Geist 500, +0.14em tracking, "إمكان" in IBM Plex Sans Arabic 500, right-aligned under "IMKAN" | Accepted | `Documentation/logo/exploration/monogram-refinements.jpg` |

## Open decisions

| ID | Question | Options | Needed by |
|---|---|---|---|
| O-002 | Which vibrant palette? Two families in review, both "fun and vibrant": porcelain (A violet and lime, B cobalt and tangerine, C teal and magenta) and bone with graphite, no ultramarine (A persimmon, B emerald and pink, C aubergine and saffron) | `Documentation/brand/palette-porcelain-options.jpg`, `palette-bone-options.jpg` | Phase 2.3 |
| O-003 | Hero scene acceptable, or kinetic-type fallback? | Dealt scene vs fallback | Phase 3.3 |
| O-004 | Where the email-signature logo image is hosted | On imkan.ai after cut-over (recommended) vs embedded in each signature | Phase 2.4 |
| O-005 | Pending wording changes 7-20 and the illustrative UI text | Approve, edit or revert each | Phase 7.3 |
| O-006 | Who checks the Arabic "إمكان" in the logo | A native reader Felipe names | Phase 2.5 |

## Log

### 2026-11-16: visual direction v2 (D-012, D-013, D-014, D-015)

Felipe reviewed home page v1: layout, minimalism and new elements kept; palette, hero animation and logo rejected as not elite or impressive enough. Agreed: a light (not white) palette dealt for an AI firm, a cinematic scroll scene in the hero with a kinetic-type opener as fallback, and three logo directions before choosing. The logo also serves the email signature, so PNG exports are required. Adopted a stepwise working method and the planning files above. Pushed back on a root `requirements.txt` (drift, and Azure's build reads `api/requirements.txt`); proposed documenting all manifests in the README instead.

Superseded by this: the oxblood palette (and the darker `#560a0f` ink added for contrast), the working logo, and the `fluted-glass` hero effect.
