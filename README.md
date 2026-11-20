# imkan.ai website

The website of Imkan.ai, a Saudi AI and data engineering consultancy. Hosted on Azure Static Web Apps, with a Python Azure Functions backend for the contact and job-application forms.

**A redesign is in progress** on the `feature/redesign` branch. Until it is merged, production runs the old React site at the repository root.

| Plan and decisions | |
|---|---|
| `PROJECT_SPEC.md` | The master plan: architecture, modules, phases, checklist |
| `DECISION_TRACKER.md` | Every decision since, newest last (wins over the spec) |
| `DESIGN.md` | The new site's visual system |
| `CLAUDE.md` | Rules for Claude Code sessions |
| `Documentation/` | Decision records, content inventory, wording-change log, acceptance criteria, security plan |

## Repository layout

```
site/        the new site: static HTML pages built with Vite (redesign)
api/         Azure Functions: POST /api/contact, POST /api/apply
components/, App.tsx, index.html, index.tsx   the old React site (production until cut-over)
Documentation/   plans, decisions, inventories, audits
```

## Requirements

| Tool | Version | Used for |
|---|---|---|
| Node.js | 22 or newer | both sites |
| Python | 3.11 (Azure), 3.13 works locally | `api/` |
| Azure Functions Core Tools | 4 | running `api/` locally |
| Google Chrome | any current | Playwright tests and the design checks |

Dependencies live where each tool reads them; there is no root `requirements.txt` on purpose:

| File | What |
|---|---|
| `site/package.json` | New site: Vite, TypeScript, Playwright, axe |
| `package.json` | Old React site |
| `api/requirements.txt` | Functions runtime (read by Azure at deploy) |
| `api/requirements-dev.txt` | Runtime + pytest and ruff |

## The new site (`site/`)

```bash
cd site
npm install
npm run dev          # http://localhost:5173, /api proxied to localhost:7071
npm run build        # outputs site/dist
npm run preview      # serves the build on http://localhost:4173
npm run typecheck
npm run test:e2e     # Playwright smoke + axe, using the local Chrome
```

Every `index.html` under `site/` is a page. Shared parts live in `site/partials/` and are included with `<!-- @include partials/nav.html -->`. The design kit in `site/public/assets/` is copied from the `design-taste-frontend` skill and must stay unmodified.

## The API (`api/`)

```bash
cd api
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.venv\Scripts\python.exe -m pytest
.venv\Scripts\python.exe -m ruff check . --exclude .venv
func start                       # http://localhost:7071
```

Local settings go in `api/local.settings.json`, which is gitignored. Settings used:

| Setting | Purpose |
|---|---|
| `AZURE_STORAGE_CONNECTION_STRING` | Table Storage for submissions |
| `ACS_EMAIL_CONNECTION_STRING`, `ACS_SENDER_ADDRESS` | Notification emails |
| `CONTACT_NOTIFICATION_RECIPIENTS` | Who gets notified (comma-separated) |
| `FORMS_TEST_MODE` | `1` or `0` forces test mode; unset: on for PR previews and localhost |
| `FORMS_TEST_RECIPIENTS` | Recipients in test mode (none if unset) |
| `FORMS_RATE_LIMIT`, `FORMS_RATE_WINDOW_SECONDS` | Per-IP limit (default 5 per 600 s) |

## The old site (repository root)

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
```

## Deployment

- Pushes to `main` deploy production through `.github/workflows/azure-static-web-apps-*.yml`.
- Every pull request into `main` gets a preview environment. On `feature/redesign` the workflow builds `site/`, so its draft PR previews the new site.
- `.github/workflows/checks.yml` runs ruff, pytest, the site's typecheck, build and Playwright tests on every PR.
