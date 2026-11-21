# Phase 7.2: the PR preview

Date: 2026-11-19. PR #25, preview `https://nice-bush-0890c9503-25.westeurope.2.azurestaticapps.net` (public but unlisted; every page `noindex`).

## Deploy

The first deploy was refused: the Static Web App had its maximum number of staging environments, all left by past PRs whose Close Pull Request Job had failed. Felipe deleted them in the portal; the re-run deployed. Fix of the close job agreed for after 7.2 (DECISION_TRACKER, 2026-11-19).

## Headers and static files (live)

| Check | Result |
|---|---|
| `Content-Security-Policy` (enforced, D-030) | served exactly as configured |
| `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | served |
| A missing path (`/no-such-page/`) | HTTP 404 with our 404 page (D-028) |
| `/sitemap.xml`, `/robots.txt` | 200 |
| `/brand/site.webmanifest` | `application/manifest+json` |
| `/fonts/*` | `font/woff2`, cached 30 days |
| `/assets/*` | cached 1 day |
| `/images/*` | cached 1 week |
| `/_build/*` | rule unused: Vite emits no hashed files, every asset is served from `public/` |

## Tests against the preview

`BASE_URL=<preview> npx playwright test`: **182 passed** (smoke and axe on 17 pages, the CSP on every page under the real headers, keyboard, reduced motion), desktop and phone.

## Forms (test mode, made-up data only)

| Request | Result |
|---|---|
| Contact, valid | 200, `testMode: true`, submission `1795119936667_hfjghxz`, `emailed: false` |
| Application, valid, a one-line dummy PDF | 200, `testMode: true`, submission `1795119937804_bg6ydlq`, `emailed: false` |
| Application without a CV | 400 "CV file is required" |
| Application with a PNG | 400 "CV must be a PDF or Word document" |
| A file named .pdf that is not a PDF | 400 "CV file content does not match its type" |
| Contact with a bad email | 400 "Invalid email format" |
| Contact with the honeypot filled | 200, no submission ID (dropped) |
| OPTIONS preflight | 200 with the CORS header |

`emailed: false`: no test recipients are set for the preview (`FORMS_TEST_RECIPIENTS` empty), so no email is sent. That is the safe default; production emails are not tested here.

## Confirmed in Azure (Felipe, 2026-11-19)

- The two submissions are rows in `contactsubmissionstest` and `jobapplicationstest` only, not in `contactsubmissions` / `jobapplications`. Test mode works on the preview.
