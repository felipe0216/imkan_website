# Redesign acceptance criteria

What "done" means for the new Imkan.ai site, written before building it. Each criterion has an ID, what must be true, and how it is checked. Based on ADRs 0001 to 0008 (`Documentation/adr/`). Format follows the `intent-driven-development` skill.

Status: draft for Felipe's review, 2026-11-16.

## Every page

| ID | Criterion | Check |
|---|---|---|
| AC-001 | Built as static HTML in `site/`, loading the `design-taste-frontend` kit unmodified from `public/assets`. No React, no Tailwind. | Code review; gate has no `kit-edited` finding |
| AC-002 | The skill's finish gate shows no design FAILs. Copy findings that come from Felipe's original wording are allowed and listed (ADR 0007). | `node <skill>/scripts/gate.mjs <page>` run by hand (manual mode) |
| AC-003 | Works at 1440, 1024, 768, 390 and 320 px wide with no horizontal scroll and no overlapping content. | Gate layout checks; Playwright desktop and phone projects |
| AC-004 | Readable with JavaScript turned off: all text and links present. | Gate `hidden-content` pass |
| AC-005 | No serious or critical axe violations; text contrast at least 4.5:1 (3:1 for large text); visible focus on every control; touch targets at least 44 px. | `npm run test:e2e` (axe); `accessibility` skill audit |
| AC-006 | Exactly one `h1`, headings in order, `lang="en"`, a page title and meta description. | Smoke test; manual review |
| AC-007 | No console errors and no failed requests on load. | Smoke test |
| AC-008 | Respects `prefers-reduced-motion`: no entrance or looping motion when it is set. | Gate `reduced-motion` check |
| AC-009 | Light, photo-led service look (ADR 0001): no dark hero, no glassmorphism or backdrop blur, no gradients, no glow effects, no fictional product UI. | Visual review; gate |
| AC-010 | People shown are only Felipe Araya and Dr. Syed Fawad Ali, from their real portraits (ADR 0001). | Visual review |
| AC-011 | Every wording change from the content inventory is logged in `Documentation/wording-changes.md`, and no fact (number, result, industry, role) differs from the inventory. | Diff against `Documentation/content-inventory.md` |
| AC-012 | No em dashes in visible text. | Search the built HTML |
| AC-013 | Our own CSS uses direction-aware properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`) so Arabic can follow (ADR 0003). | Search our CSS for physical left/right properties |
| AC-014 | `noindex` while in preview, removed at cut-over. | Smoke test (until cut-over) |
| AC-015 | Performance: the gate's `perf.mjs` budget passes; images are WebP or AVIF and sized for their slot. | `perf.mjs`; build output |

## Pages

| ID | Criterion | Check |
|---|---|---|
| AC-101 | `/` has the home sections (hero, services, methodology, why us, work, team) and the contact form on the page, not in a pop-up. | Visual review |
| AC-102 | `/careers/` lists roles and has the application form with CV upload on the page. Closed roles are shown as closed, not hidden silently. | Visual review; e2e |
| AC-103 | `/work/` lists all 11 case studies; each has its own `/work/<slug>/` page, anonymised (industry only, no client names or logos). | Playwright visits every slug |
| AC-104 | `/privacy/` and `/terms/` carry the full original legal text. | Diff against the content inventory |
| AC-105 | Nav and footer are shared partials and identical on every page; every internal link resolves (no 404). | Link check in e2e |
| AC-106 | A 404 page exists and is served for unknown paths. | e2e |

## Forms

| ID | Criterion | Check |
|---|---|---|
| AC-201 | Contact form posts `multipart/form-data` to `/api/contact` through the kit's form recipe (`data-endpoint`); success shows only after a 2xx; a failure keeps what was typed. | e2e against the preview with test mode on |
| AC-202 | Application form posts the CV as a file field `cv`; PDF, DOC and DOCX up to 5 MB are accepted, anything else gets a clear error under the field. | e2e; `api/tests` |
| AC-203 | Every field has a visible label; errors appear under the field with `aria-invalid` and `aria-describedby`; the first invalid field gets focus. | Gate `field-label` and `forms` checks |
| AC-204 | Both forms include the hidden `company_website` honeypot field. | Code review; `api/tests` |
| AC-205 | Preview and localhost submissions land in the `*test` tables and never email the real inbox (`testMode: true` in the response). | Submit on the preview; check the response and tables |
| AC-206 | The application form's error message names `info@imkan.ai`, not a personal address (wording change 1). | Code review |

## Brand

| ID | Criterion | Check |
|---|---|---|
| AC-301 | New logo as clean SVG: "IMKAN" wordmark with the Arabic "إمكان" (Arabic set in a real Arabic typeface and checked by a native reader), a compact mark (also the favicon) and a monochrome version (ADR 0008). Approved by Felipe. | Felipe's review |
| AC-302 | A `DESIGN.md` describes the new visual system (tokens, type, components) before page work starts. | File exists and matches the built CSS |

## Cut-over

| ID | Criterion | Check |
|---|---|---|
| AC-401 | All criteria above pass on the PR preview URL. | Checks workflow green; manual gate runs recorded |
| AC-402 | Felipe has reviewed `Documentation/wording-changes.md` and the preview. | Felipe's approval on the PR |
| AC-403 | `noindex` removed; test mode confirmed off for the production host; CSP switched from report-only to enforced with no violations. | Pre-merge checklist (`Documentation/security-plan.md`) |
| AC-404 | Rollback ready: reverting the merge commit restores the old site. | Documented in the PR |
| AC-405 | After merge: live site checked at all widths, one real contact submission end to end, forms land in production tables. | Post-deploy check |

## Decisions from Felipe (2026-11-16)

1. **Roles:** show all six as closed; keep the open application. (AC-102)
2. **Error email:** use `info@imkan.ai`. (AC-206, wording change 1)
3. **"Portal" link:** removed from the public site. (wording change 6)
4. **Case-study stats:** headline stats use the ranges from each case's own results: 70-80%, 40-50%, 60-70%. (wording changes 2 to 4)
5. **"5 More Solutions":** dropped; the home page links to `/work/`. (wording change 5)
6. **Wordmark:** "IMKAN" in capitals, bilingual with the Arabic "إمكان". (ADR 0008, AC-301)

All six are logged in `Documentation/wording-changes.md`.
