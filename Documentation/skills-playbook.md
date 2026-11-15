# Skills playbook

How to use the project skills in `.claude/skills/` for the Imkan.ai redesign: what each useful skill does, when to reach for it, and what to watch out for. Written from a full read of the skills in November 2026. The 139 skills were copied from the Ear Cleaning project, which uses the ECC ("Everything Claude Code") bundle plus `design-taste-frontend`.

## Read this first

- **Only about 30 of the 139 skills are useful here.** The rest target other stacks (Django, Kotlin, Rust, Laravel, Flutter and others), healthcare or crypto. They still cost context: the session's skill list is already over its budget, so the descriptions of important skills such as `make-interfaces-feel-better`, `react-patterns` and `security-review` are cut off. See [Trimming](#trimming).
- **No ECC hooks are installed.** Imkan has no `.claude/settings.json`, no `.claude/hooks/` and no ECC scripts. Skills that say they "block", "gate" or "observe" through hooks (`gateguard`, `safety-guard`, `delivery-gate`, `strategic-compact`, `continuous-learning-v2`, `plan-canvas`) do nothing here. Treat them as advice only, or not at all.
- **The only skill that declares its own hook is `design-taste-frontend`.** It is a Stop hook that runs its finish gate (minutes of headless Chrome) every time Claude tries to end a turn, once a build is armed.
- **Skills live in the main checkout only.** `.claude/skills/` is untracked in git, so a fresh worktree or a clone will not have them unless we commit them.
- Several skills are written for Next.js, Vite 7 and 8, Supabase or FastAPI. Ignore those parts; our stack is React 19 + Vite 6 SPA, Tailwind via CDN, Python Azure Functions.

## The redesign lifecycle at a glance

| Phase | Skills | Output |
|---|---|---|
| 1. Baseline | `design-system` (audit + slop check), `react-performance` (Web Vitals map) | Scores and a list of what reads as "AI-made" today |
| 2. Brief and decisions | `intent-driven-development`, `product-lens`, `council`, `architecture-decision-records` | Acceptance criteria, product brief, ADRs |
| 3. Direction and copy | `design-taste-frontend` (brief, copy, deal), `frontend-design-direction` | Voice card, fact sheet, section plan in screens, dealt palette and fonts |
| 4. Tokens and system | `design-taste-frontend` kit or `design-system` generate, `accessibility` (contrast, targets) | `:root` tokens, new DESIGN.md |
| 5. Build | `react-patterns`, `vite-patterns`, `make-interfaces-feel-better`, `frontend-a11y`, `error-handling`, `security-review`, motion skills only if adopted | Components |
| 6. Verify per feature | `playwright-cli`, `react-testing`, `verification-loop`, `click-path-audit` | Passing build, types, lint, tests |
| 7. Copy gate | `design-taste-frontend` copy-lint, `santa-method` | Copy with no invented facts and no slop words |
| 8. Pre-merge | `design-taste-frontend` finish gate, `e2e-testing`, `browser-qa` on the PR preview, `accessibility` audit, `design-system` re-audit | GATE: PASS, SHIP verdict |
| 9. Go-live | `production-audit`, `security-review` pre-deployment checklist | Launch score and blockers |

## Design and direction

### design-taste-frontend (tasteskill 2.5.1)
The core skill for the goal "does not look AI-made". It builds sites to the bar of figma.com and x.ai, and it enforces its rules with real scripts in a real browser.

- **How it works:** it *deals* design choices (hero layout, palette, font pairing, nav, footer, button style, one or two "moments") with scripts, instead of letting the model pick by taste, and keeps a history so pages differ. Copy is written first, from a fact sheet and a voice card. A finish gate (`scripts/gate.mjs`) must reach `GATE: PASS` before the work counts as done.
- **House rules (override everything):** no captions under images; every visual works at 1440, 1024, 768 and 390; each section is exactly one or two screens tall; equal edges; a hover layer on cards, photos and buttons; real photographs; real full-colour brand icons; shaders only on tech sites; contact details limited to what the brief gives.
- **What it bans, and why it matters for us:** Space Grotesk, Inter and similar fonts; weights 700 and 800; violet; glassmorphism and backdrop blur; fade-in on scroll; floating blurred navs; eyebrow labels; stat strips; invented stats, clients or testimonials; slop words (seamless, robust, leverage, cutting-edge and many more in `references/copy-tells.md`); em dashes. **Most of the current Imkan look is on this list.**
- **Site kind matters:** an AI and data consultancy is classified as a *service* site. Service sites get no dark pages or heroes, no gradients, glass, grain or shaders, and they want photos of the work, the team and the rooms. Classifying Imkan as *software* unlocks dark grounds and effects, but only if we show real product UI.
- **Workflow:** (0) stack, (1) brief and arm the gate with `node <skill>/scripts/gate.mjs --start <page or http://localhost:5173/> --kind --category --primary`, (2) copy, (3) plan in screens, (4) deal, (5) build with the kit's `system.css` classes, (6) run copy-lint, consistency, layout check, shoot and perf one at a time, then the gate until PASS (three rounds, at most five waivers), (7) report.
- **Tooling:** about 20 Node scripts, no npm packages. Needs Node 22+ (we have 24), Chrome or Edge (driven over CDP), optional ffmpeg (not installed). `photos.mjs` and `icons.mjs` download from Wikimedia, picsum and jsDelivr; the checkers only touch localhost.
- **Fit with our stack:** works with Vite (`--start http://localhost:5173/` or `dist/index.html`). Its kit is a full CSS system (`system.css` and friends) that must be loaded unmodified from `public/assets`, so Tailwind would become a second system and should be dropped or kept to a minimum for the new site. Its hero entrance and moments are small vanilla JS modules, not CSS only. Its no-JS check renders nothing for a pure client-side React app, so prerendering or static HTML is safer. No Arabic or RTL support.
- **Writes into the project:** `.taste-skill/`, `shots/`, `assets/`, `credits.html`, `names.json`, `share.jpg`. Add `.taste-skill/` and `shots/` to `.gitignore`.
- **Run its scripts only against our own local pages** (see CLAUDE.md).

### frontend-design-direction
A short checklist for choosing a direction before coding: purpose, audience, tone, one memorable detail, constraints. Includes an anti-pattern list. Advice only, no files. Use it at the very start and again at polish. `design-taste-frontend` is the stronger tool for our specific goal; use this one to articulate the direction in plain words.

### design-system
Three modes: **Audit** (scores 10 dimensions with file:line fixes), **AI-slop check** (flags generic patterns; it will flag our current glass and gradients), and **Generate** (extracts tokens into `DESIGN.md`, `design-tokens.json` and `design-preview.html`, after looking at three competitor sites). Run the audit and slop check now as a baseline and again at the end. **Generate overwrites `DESIGN.md`**, so archive the current one first. The URL audit and competitor research need a browser and a running dev server.

### make-interfaces-feel-better
Concrete polish rules: concentric radius, optical icon alignment, `text-wrap: balance`, tabular numbers, image outlines, split enter and exit motion, press scale 0.96, never `transition: all`, hit areas of at least 40 to 44px. Pure CSS, fits any stack. Use during build and for a final polish pass; it outputs a before and after table.

### Motion: motion-foundations, motion-patterns, motion-advanced
Built on the `motion` npm package (`motion/react`), written for Next.js. `motion-foundations` defines duration, easing and spring tokens, a `shouldAnimate()` gate for reduced motion, and hooks. `motion-patterns` covers buttons, stagger, modals, toasts, page transitions, scroll reveal and accordions. `motion-advanced` covers drag, gestures, text and SVG animation and sequences.

- Adopting `motion` is a new dependency and needs approval (CLAUDE.md). Drop the Next.js and SSR rules for our Vite SPA.
- `design-taste-frontend` bans fade-in on scroll and flags external animation libraries, so the two approaches conflict. Decide one.
- Even without the package, copy the rules: animate only transform and opacity, stagger 0.05 to 0.10s, reveal once, every enter has an exit, respect reduced motion.

### accessibility and frontend-a11y
`accessibility` sets the standard (WCAG 2.2 AA: 4.5:1 text contrast, 3:1 large text and UI, 24px minimum targets, visible focus, reflow at 400%). `frontend-a11y` gives the React code (labels, `aria-describedby` errors, heading order, keyboard menus, modal focus return, a reduced-motion hook with no library). Use `accessibility` when choosing tokens and for the final audit, `frontend-a11y` while building forms, menus and modals.

## Code

- **react-patterns:** React 19 guidance (derive state during render, state placement, error boundaries, form actions, composition). Ignore the server component and Next.js sections. Daily.
- **vite-patterns:** config, env vars (`VITE_` values are public), dev proxy to Azure Functions on port 7071, `vite build` does not type-check, chunk hashes after deploys. Written for Vite 7 and 8; we are on Vite 6, so Rolldown options do not apply.
- **react-performance:** 70 rules by priority plus a Web Vitals map. Mostly Next.js; use the bundle, rendering and CLS parts for a performance pass.
- **error-handling:** typed errors, a standard `{ error: { code, message } }` shape, ErrorBoundary, retry rules. Adapt the examples to `azure.functions`.
- **coding-standards:** generic review checklist. It suggests a `src/` layout and Supabase patterns; CLAUDE.md conventions win.
- **frontend-patterns:** skip. Duplicates `react-patterns` and contradicts it on memoisation and data fetching, and uses Framer Motion.

## Testing and QA

- **playwright-cli:** drives a real browser from the shell and prints the matching Playwright code, so manual checks turn into tests. Needs `@playwright/cli` or local `@playwright/test` plus `npx playwright install`. Writes `.playwright-cli/` (gitignore it).
- **e2e-testing:** Playwright Test structure, config and CI template. Set `baseURL` from `BASE_URL`; `/api` only exists under the SWA CLI or on a preview environment.
- **react-testing:** Vitest, Testing Library, MSW and axe for components and forms. Needs about eight dev dependencies.
- **browser-qa:** an agent-run QA pass (console and network errors, Web Vitals, forms, visual regression at 375, 768 and 1440, axe) ending in SHIP, SHIP WITH FIXES or DO NOT SHIP. Needs committed screenshot baselines. Never submit the real forms on production.
- **click-path-audit:** reads the code and traces every button's state changes to find handlers that undo each other, races and stale closures. Use after menus, modals and forms are wired.
- **verification-loop:** the pre-PR gate: build, `tsc --noEmit`, lint, tests, secret and `console.log` grep, diff review. Needs `typecheck`, `lint` and `test` scripts, which we do not have yet.
- **ai-regression-testing:** the habit of adding a regression test for every bug fixed. Use as a principle; its examples are Next.js and Supabase.
- **production-audit:** launch readiness from local evidence, scored 0 to 100 with hard caps (no rollback path, red CI, untested critical path). Use before merging the redesign to `main`.

## Security

- **security-review:** secure-coding checklist. Relevant here: server-side CV validation, rate limiting on `/api/contact` and `/api/apply`, generic error messages, secrets in SWA app settings, and CSP (hard while Tailwind loads from the CDN, which needs `unsafe-inline` and `unsafe-eval`). Ignore the Supabase, Solana and JWT parts.
- **security-scan:** scans our Claude config (CLAUDE.md, settings, hooks) with `npx ecc-agentshield`. Pin a version, never run `--fix` or `init` unattended, and do not use `--opus` without approval (it sends the config to an API).
- **safety-guard and gateguard:** both depend on ECC hook scripts that are not installed. Use Claude Code permission deny rules instead.
- **delivery-gate:** do not enable. Its Stop hook would block every session with three or more edits because our memory folder lacks the learning files it checks, and it also blocks below 15 GB free disk.

## Process and decisions

- **intent-driven-development:** turns a vague request into numbered acceptance criteria with verification steps. Use it to define "done" for each page and for the forms.
- **council:** four voices (architect plus three independent subagents) for real forks, such as rebuild vs restyle, Tailwind vs the taste kit, adding `motion`, Arabic now or later.
- **architecture-decision-records:** numbered ADRs with an index. Put them in `Documentation/adr/`, since `docs/` does not exist.
- **product-lens:** a one-off product brief (who the buyer is, which conversions matter, ICE prioritisation).
- **santa-method:** two independent reviewers must pass a piece of work against a rubric. Use it on final marketing copy (no invented facts, voice rules, no em dashes). Too costly for code.
- **living-docs-governance:** after the redesign settles, gives CLAUDE.md, DESIGN.md, README and Documentation/ clear roles and a delete-zone so removed sections are not recreated.
- **i18n-sync:** keeps JSON locale files in sync once strings are extracted. It does not handle RTL layout or string extraction. Only useful if Arabic ships.
- **context-budget and agent-sort:** use once now to trim skills and plugins (see below).
- **strategic-compact:** advice only: compact at phase boundaries and write plans to files first.

## Not usable as installed

| Skill | Why |
|---|---|
| `plan-canvas` | Needs the `ecc-plan-canvas` CLI and an ECC hook |
| `ck` | Paths hardcoded to `~/.claude/skills/ck`, duplicates auto-memory |
| `continuous-learning-v2` | Hooks not registered, observer broken on Windows |
| `skill-stocktake` | Paths hardcoded to `~/.claude/skills`, needs `jq` |
| `plankton-code-quality` | External install, blocks npm, spawns paid subprocesses |
| `repo-scan` | Downloads and installs a third-party repo |
| `gateguard`, `safety-guard`, `delivery-gate` | Missing hooks, see Security |

## Trimming

Suggested split (not applied yet; this is Felipe's call):

- **Daily (about 14):** `design-taste-frontend`, `frontend-design-direction`, `design-system`, `make-interfaces-feel-better`, `accessibility`, `frontend-a11y`, `react-patterns`, `vite-patterns`, `error-handling`, `security-review`, `playwright-cli`, `verification-loop`, plus `motion-foundations` and `motion-patterns` only if `motion` is adopted.
- **Library (keep, use on demand):** `react-performance`, `react-testing`, `e2e-testing`, `browser-qa`, `click-path-audit`, `production-audit`, `intent-driven-development`, `council`, `architecture-decision-records`, `product-lens`, `santa-method`, `living-docs-governance`, `i18n-sync`, `context-budget`, `agent-sort`, `strategic-compact`, `coding-standards`, `api-design`, `python-patterns`, `python-testing`, `motion-advanced`.
- **Noise (remove or archive outside `.claude/skills`):** everything else, including the skills in the table above and all other-stack, healthcare and crypto skills.

Separately, many plugin MCP servers and plugin skill packs (small-business, Gmail, Shopify, vidiq and others) load in every session and have nothing to do with the website. Disabling them for this project saves more context than trimming skills.

## Gaps no skill covers

- Arabic and RTL layout (`dir`, CSS logical properties, mirrored icons, an Arabic type pairing).
- Moving Tailwind from the CDN to a build step, or removing it.
- A safe test mode for the forms, so dev and preview submissions do not email real inboxes or store real CVs.
