# Imkan.ai website redesign: project specification (master plan)

- **Owner:** Felipe Araya (Imkan.ai co-founder)
- **Version:** 1.0, 2026-11-16
- **Status:** planning and ideation for visual direction v2. The foundation (decisions, tooling, API, first home page build) is done; see the Checklist.
- **How this file is used:** this is the master plan. It changes only when the plan itself changes. Every decision, amendment and debate after this point goes into `DECISION_TRACKER.md`, which wins over this file where they differ.

---

## 1. Summary

Replace the current imkan.ai site, which reads as AI-generated (dark, cyan, glassmorphism), with a site that looks elite, minimal and impressive. The new site:

- is a set of static HTML pages built with Vite on the `design-taste-frontend` kit, in `site/` on the `feature/redesign` branch;
- is **light (not white)**, with a palette, type and motion that read as a serious AI engineering firm (visual direction v2, ADR 0010);
- opens with **one cinematic scroll scene** in the hero, with a kinetic-type opener as the fallback;
- has a **new IMKAN logo**, chosen from three directions, delivered as a full asset kit including email-signature images;
- keeps Imkan's wording wherever the design allows, logging every change for Felipe's review (ADR 0007);
- goes live by merging one pull request, with production untouched until then (ADR 0004).

Work proceeds one major item at a time, each split into small steps, each step reviewed before the next starts.

---

## 2. Architecture overview

```
                    feature/redesign  (draft PR into main)
                                │
     ┌──────────────────────────┼───────────────────────────┐
     │                          │                           │
  site/  (static pages)      api/  (Azure Functions)    .github/workflows
  Vite multi-page build      Python 3.11 (Azure)         checks.yml: lint, tests,
  kit loaded as plain files  /api/contact, /api/apply     typecheck, build, e2e
  partials (nav, footer)     JSON + form data             SWA deploy: builds site/
     │                       test mode, rate limit,
     │                       honeypot, CV checks
     ▼                          │
  Azure Static Web Apps ◄───────┘
  PR preview URL (test mode on)  ──merge──►  production (imkan.ai)
                                              Table Storage + ACS email
```

- **Rendering:** plain HTML per page, built by Vite (`site/vite.config.ts`): every `index.html` is a page, shared parts are HTML partials included at build time. No framework runtime in the browser.
- **Design system:** the `design-taste-frontend` kit (`site/public/assets/`), unmodified (its gate fails `kit-edited`). Our own CSS only where the kit allows page CSS (`site/public/styles/`).
- **Motion and effects:** the kit's motion layer, one big scene (the hero) and up to two dealt moments; at most four live WebGL contexts.
- **Forms:** the kit's form recipe posts `multipart/form-data` to the Functions; the API keeps accepting the old site's JSON until cut-over.
- **Hosting:** Azure Static Web Apps. PR previews for review; merging to `main` is the cut-over.

---

## 3. Folder structure

```
/                              repo root (old React site lives here until cut-over)
├── PROJECT_SPEC.md            this file
├── DECISION_TRACKER.md        running decision log and addendum (wins over this file)
├── CLAUDE.md                  rules for Claude sessions
├── DESIGN.md                  the new site's visual system (rewritten for v2)
├── README.md                  how to run, build and test both sites
├── .claude/
│   ├── settings.json          Claude permissions (deny / ask rules)
│   ├── launch.json            local preview servers
│   └── skills/                the 38 project skills
├── .github/workflows/
│   ├── azure-static-web-apps-*.yml   deploy (builds site/ on this branch)
│   └── checks.yml             PR checks
├── api/                       Azure Functions (Python)
│   ├── function_app.py
│   ├── requirements.txt       runtime dependencies (read by Azure)
│   ├── requirements-dev.txt   + pytest, ruff
│   └── tests/
├── site/                      the new site
│   ├── index.html             home
│   ├── careers/index.html     (to build)
│   ├── work/index.html        (to build) + work/<slug>/index.html x 11
│   ├── privacy/, terms/, 404.html   (to build)
│   ├── partials/              nav.html, footer.html
│   ├── public/
│   │   ├── assets/            the kit (unmodified) + fetched brand icons
│   │   ├── images/            logo/, team/, work/
│   │   ├── styles/            page CSS
│   │   └── favicon.svg
│   ├── tests/                 Playwright smoke + axe
│   ├── staticwebapp.config.json
│   ├── vite.config.ts, playwright.config.ts, tsconfig.json, package.json
└── Documentation/
    ├── adr/                   decision records 0001-0010
    ├── content-inventory.md   original wording, verbatim
    ├── wording-changes.md     every departure from it, for review
    ├── acceptance-criteria.md, security-plan.md, skills-playbook.md
    ├── baseline/              the old site measured
    ├── logo/, art/            generators for the logo and case art
    └── DESIGN-legacy.md       the old site's look
```

---

## 4. Dataset (content and assets)

| Data | Source of truth | Notes |
|---|---|---|
| All site wording | `Documentation/content-inventory.md` | Verbatim from the old site. Edits only for design, logged in `wording-changes.md` |
| Case studies (11) | inventory, section "Home: Case studies" | Real, anonymised. Facts never change; three headline stats aligned to their ranges |
| Services (4), methodology (3), advantages (6) | inventory | |
| Team (2) | inventory + `site/public/images/team/` | Only Felipe and Dr. Syed Fawad Ali appear as people |
| Jobs (6) | inventory, "Careers page" | All past their 30-day window: shown as closed, open application kept |
| Legal | inventory, "Privacy Policy" and "Terms" | Carried over in full |
| Contact details | inventory, "Footer" | Street and district shown (wording change 17, pending review) |
| Case illustrations | `Documentation/art/build-case-art.mjs` | Regenerated in the v2 palette |
| Brand icons | `icons.mjs` into `site/public/assets/icons/` | Real marks of tools Imkan uses |
| Logo | v2 logo kit (to build) | Replaces the working logo |
| Illustrative UI text | listed in `wording-changes.md` | Inside drawn product windows; pending approval |

---

## 5. Specification

### 5.1 Functional
1. Pages: `/`, `/careers/`, `/work/`, `/work/<slug>/` (11), `/privacy/`, `/terms/`, a 404 page (ADR 0005).
2. Contact form on the home page and job application form (with CV upload) on `/careers/`, both through the kit's form recipe, success shown only after the API answers.
3. Shared nav and footer on every page; every internal link resolves.
4. English only; built ready for Arabic under `/ar/` later (ADR 0003).

### 5.2 Visual (direction v2, ADR 0010)
1. **Light, not white:** a tinted light ground with high-contrast ink and one accent, dealt for an AI firm and approved by Felipe.
2. **Elite, minimal, impressive:** restraint everywhere except the few dealt beats.
3. **Hero:** one cinematic scroll scene (`assets/scenes`), dealt from the scenes Imkan qualifies for; fallback: a kinetic-type opener.
4. **New logo** from three explored directions; the symbol can feed the hero scene.
5. The kit's rules hold: one section per screen at every width, equal edges, real icons, the hover layer, no tilt, fade-on-scroll or carousels, no invented figures.

### 5.3 Quality
1. WCAG 2.2 AA: reading text 7:1 where the kit demands it, visible focus, 44px targets, reduced motion respected.
2. The skill's gate: no design FAILs; copy findings from Felipe's original wording waived with reasons.
3. Performance: the gate's `perf.mjs` budget; at most four live WebGL contexts.
4. Security: server-side validation, test mode on previews, enforced CSP before cut-over (`Documentation/security-plan.md`).

---

## 6. Module specifications

| # | Module | Responsibility | Inputs | Outputs | Status |
|---|---|---|---|---|---|
| M1 | Brand: palette | Light, non-white palette for an AI firm | `start.mjs deal --page software --trade ai --light` | `:root` tokens via `start.mjs brand` | To do |
| M2 | Brand: logo kit | Three directions, then the chosen one in full | Felipe's pick | SVG set, PNG @1x/2x/3x, favicons, social avatar, email signature block | To do |
| M3 | DESIGN.md v2 | The visual system in writing | M1, M2, the deal | `DESIGN.md` | To do |
| M4 | Hero scene | The cinematic opener | `scenes.md`, the deal, M2's mark | Hero section; fallback kinetic type | To do |
| M5 | Home page v2 | Re-theme and finish the home page | M1-M4, current build | Gate-ready home | Built in v1 look; to re-theme |
| M6 | Careers | Roles (closed) + application form | inventory, `/api/apply` | `/careers/` | To do |
| M7 | Work | Index + 11 case pages from one template | inventory, case art | `/work/`, `/work/<slug>/` | To do |
| M8 | Legal + 404 | Privacy, Terms, not-found | inventory | 3 pages | To do |
| M9 | SEO and sharing | Titles, descriptions, OG images, sitemap, robots, Organization JSON-LD, canonical at cut-over | all pages | head tags, files | To do |
| M10 | API | Forms backend | form posts | Table Storage, ACS email | Done (test mode, limits, tests) |
| M11 | CI/CD | Checks + preview deploy | PRs | green checks, preview URL | Done, not yet run on GitHub |
| M12 | QA and gate | Consistency, layout, perf, axe, e2e, browser-qa | every page | reports, waivers | Running per page |
| M13 | Cut-over | Merge, verify, roll back if needed | all of the above | live site | To do |

---

## 7. Environment and configuration

| Item | Value |
|---|---|
| Node | 24 locally, 22 in CI |
| Python | 3.13 locally (`api/.venv`), 3.11 in CI and on Azure |
| Build | Vite 6 (`site/`), `npm run dev` on 5173, `npm run preview` on 4173 |
| Tests | Playwright 1.65 + axe (local Chrome), pytest + ruff for `api/` |
| Skill tooling | `design-taste-frontend` scripts, run by hand (manual gate), Chrome headless over CDP |
| Azure app settings | `AZURE_STORAGE_CONNECTION_STRING`, `ACS_EMAIL_CONNECTION_STRING`, `ACS_SENDER_ADDRESS`, `CONTACT_NOTIFICATION_RECIPIENTS`, `FORMS_TEST_MODE`, `FORMS_TEST_RECIPIENTS`, `FORMS_RATE_LIMIT`, `FORMS_RATE_WINDOW_SECONDS` |
| Secrets | GitHub secret for the SWA deploy token; Azure app settings; never in the repo |
| Dependency manifests | `site/package.json` (+ lock) and `api/requirements*.txt`, where each tool reads them (see Constraints, item 8) |

---

## 8. Known constraints and limitations

1. **The kit is read-only.** Changes go in page CSS or markup, never in `site/public/assets/` kit files.
2. **The skill deals, it does not choose by taste.** Palette, scene and moments come from its scripts; Felipe picks among dealt options where a choice is offered (palette, logo).
3. **Scenes have needs.** Some scenes need a solid mark (the new logo), a photograph or a product screen. Which scenes are eligible depends on the assets we have.
4. **One big beat budget:** one scene (it is the page's effect), up to two moments, three beats at most, never in neighbouring sections, four live WebGL contexts.
5. **This machine's Chrome is CPU-rendered.** The full checker takes over ten minutes and its full desktop walk currently crashes (CDP socket closed); quick mode and full phone mode work. To investigate in M12.
6. **Copy rules vs fixed wording.** Copy findings from original wording are waived with reasons (ADR 0007), at most five design waivers per page.
7. **Arabic** in the logo needs a native reader's check; no Arabic pages yet.
8. **No root `requirements.txt`.** Each manifest stays where its tool reads it (`api/requirements.txt` for Azure, `site/package.json` for npm). A root copy would drift and could confuse Azure's build. README lists them all.
9. **Azure preview environments** may share production app settings and the Free plan limits concurrent previews (unverified).
10. **Email signatures** need PNG images: Outlook and Gmail do not reliably render SVG.

---

## 9. Out of scope (for this project)

- The Arabic site (ADR 0003: a later project).
- A CMS, blog or news section.
- Analytics, tracking or cookie banners (none today; adding them is a separate decision with privacy impact).
- New copywriting beyond logged design edits.
- Backend features beyond the two forms.
- Changes to the old React site, other than urgent fixes on `main`.

---

## 10. Evaluation

- **Acceptance criteria:** `Documentation/acceptance-criteria.md` (AC-001 to AC-405), updated for v2 where the direction changed.
- **Per page:** the skill's checks (copy-lint, consistency at 1440/1024/820/768/390, layout check, perf) and then `gate.mjs` by hand.
- **Every PR:** `checks.yml` (ruff, pytest, typecheck, build, Playwright smoke + axe).
- **On the preview URL:** forms end to end in test mode, `browser-qa`, accessibility audit.
- **Before cut-over:** `production-audit`, the security checklist, Felipe's review of the wording log and the preview.

---

## 11. Checklist

Phases run in this order; inside a phase, one item at a time.

### Phase 0. Foundation (done)
- [x] Skills selected, documented and committed (playbook)
- [x] Decisions 0001-0009, CLAUDE.md, permissions
- [x] Content inventory, baseline audit, legacy design archived
- [x] API: form data, test mode, rate limits, honeypot, CV checks, 26 tests
- [x] Site tooling (Vite multi-page, partials, Playwright + axe), CI workflow
- [x] Acceptance criteria, security plan, wording-change log
- [x] Home page v1 (oxblood look): built, desktop checks pass, phone and tablet not tuned

### Phase 1. Planning (now)
- [x] PROJECT_SPEC.md, DECISION_TRACKER.md, README.md, ADR 0010
- [ ] Felipe approves this plan

### Phase 2. Brand foundation
- [ ] 2.1 Logo: three directions as previews (shape first, in monochrome)
- [ ] 2.2 Felipe picks a direction; refine it
- [ ] 2.3 Palette: deal light palettes for an AI firm, preview three with the chosen logo; Felipe picks
- [ ] 2.4 Logo kit: SVGs, PNGs, favicons, avatar, email signature block
- [ ] 2.5 Arabic check of "إمكان" by a native reader
- [ ] 2.6 DESIGN.md v2

### Phase 3. Hero
- [x] 3.1 Deal the scene from those Imkan qualifies for; gather what it needs
- [x] 3.2 Build and preview the scene
- [x] 3.3 Felipe approves, or switch to the kinetic-type fallback

### Phase 4. Home page v2
- [x] 4.1 Apply the v2 tokens, logo and case art (and the scene)
- [x] 4.2 Re-deal moments around the scene (beat budget)
- [x] 4.3 Tablet and phone screen counts
- [x] 4.4 Full checks, gate, smoke tests (gate OPEN 11, kit-inherent; approved by Felipe 2026-11-19)

### Phase 5. Inner pages
- [ ] 5.1 Careers + application form
- [ ] 5.2a Case template (Banking Fraud Detection), reviewed
- [ ] 5.2b The other ten cases generated from `site/content/cases.json`
- [ ] 5.2c Work index
- [ ] 5.3 Privacy, Terms, 404 (D-027)

### Phase 6. Site-wide
- [ ] 6.1 SEO and sharing (M9)
- [ ] 6.2 Enforced CSP, security checklist
- [ ] 6.3 Performance and accessibility audit

### Phase 7. Preview and review
- [ ] 7.1 `gh auth login`, push, draft PR, CI green
- [ ] 7.2 Azure settings verified; forms tested on the preview in test mode
- [ ] 7.3 Felipe reviews the wording log, UI texts and the preview

### Phase 8. Cut-over
- [ ] 8.1 `production-audit`, pre-merge checklist
- [ ] 8.2 Merge, live checks, rollback ready
- [ ] 8.3 Clean-up: remove the old React app, the main checkout's untracked skills copy

---

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| The dealt scene does not impress Felipe | Rework | Preview before building the rest; kinetic-type fallback ready |
| Scene needs assets we lack (photograph, product screen) | Scene not eligible | Choose among eligible scenes; stand-in photographs are listed for replacement |
| Re-theming breaks contrast | Accessibility FAILs | Contrast checked when the palette is dealt, before applying |
| Checker crashes on desktop full mode | Gate can't run | Diagnosed in 4.0: the v1 WebGL hero ground under SwiftShader; gone with ADR 0010 |
| Long-lived branch drifts from `main` | Merge conflicts | Merge `main` in regularly; no feature work on `main` |
| Email signature logo breaks in clients | Brand looks broken | PNG with fixed width/height, hosted on the site after cut-over, tested in Outlook and Gmail |
