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
| D-018 | 2026-11-18 | Palette: **Midnight plum and gold** on warm bone. Bone `#efece5` / surface `#e3ded3`, plum-black ink `#1b111d`, muted `#4c4150`, plum accent `#5e1654` (white text), dark bands `#120914` / `#211325` with gold `#ffc233` buttons. Saffron only on dark bands. Funnel type kept | Accepted (closes O-002) | `Documentation/brand/palette-noir-3-midnight-plum*` |
| D-019 | 2026-11-19 | Email signature logo: **gold on midnight plum** tile (`imkan-email-logo-gold-dark@2x.png`, 163x60), over black, plum and gold on white | Accepted | `Documentation/brand/email-signature.html` |
| D-020 | 2026-11-19 | Tokens: keep `start.mjs brand`'s `:root` block as printed, then override only the gold and the inverse muted (`#ffc233` and its label, `#cbbccf`) in a second block; the band itself stays the printed ink (amended by D-022) | Accepted (implements D-018; the one deviation from the kit's "keep as printed") | `DESIGN.md`, Colour |
| D-021 | 2026-11-19 | Scene: **letter-bar-floods-the-ground**, dealt at random from the three Imkan qualifies for (letter-physics, dot-becomes-the-full-stop, letter-bar). It is not the hero: the kit allows no statement scene as the hero, and the hero scenes need Imkan's own photographs. Placed before the cases band: "Proven Impact" zooms into its I, whose stem floods into the dark band carrying "15+ production-grade AI and data solutions." Hero stays the kit's centred hero with the product window, no WebGL ground. Plan A | Accepted; approved by Felipe after the preview (closes O-003) | `Documentation/brand/scene-*` |
| D-022 | 2026-11-19 | Dark band = the ink `#1b111d` (was `#120914`) and its cards `#271d29`, as `start.mjs brand` prints them, so the scene's flooding stem and the band are one colour with no seam. Gold 11.4:1, bone 15.6:1, muted 10.2:1 on it | Accepted (amends D-018) | `DESIGN.md` |
| D-023 | 2026-11-19 | Funnel Display reports ascent 1.0em and descent 0.25em; the scene measures the stem on a 1em box, so its stem sat 0.075em high. Fix: the scene's line uses the same font file under a second `@font-face` ("Funnel Display Fit") with `ascent-override: 80%; descent-override: 20%`. Kit untouched | Accepted | scene preview, Phase 4 build |
| D-024 | 2026-11-19 | Moments (dealt, seed 4b9ea349): **marquee-row** in services (the seven case-study industries) and **counter-rolls** in the statement (four case results). The dealt hero moment cursor-spotlight is left out: two moments in all at most. Beats: services, statement, the scene, with calm sections between | Accepted (dealt; Felipe reviews in 4.4) | `site/index.html`, wording changes 22-23 |
| D-025 | 2026-11-19 | Lit ground `sand` instead of v1's `sky` (a cool blue frame behind the hero window clashed with the warm bone) | Superseded by D-034 | `site/index.html` |
| D-026 | 2026-11-19 | Gate waivers (5, the cap): hero-lines (final h1, as gate.md allows), card-family (false positive on the About head column), copy-headings (original wording, ADR 0007), button-styles and same-action (gold on the dark band, D-020). Copy edits 24-25 ("Empowering", "World-class") instead of waivers | Accepted by Felipe ("Fix, edit copy, then rounds"); edits pending his wording review | `site/.taste-skill/waivers.json`, wording changes 24-25 |
| D-027 | 2026-11-19 | Phase 5 plan: careers (hero, perks, open application form to /api/apply, six past roles closed with full details on demand, no search/filter while no role is open); case template first, then the other ten generated from `site/content/cases.json` (inventory text, word for word) by a no-dependency script; work index; Privacy, Terms, 404 as plain reading pages with no moment (moment-none accepted there); no scene on inner pages; full gate on careers, the case template and the work index, quick checks on the other cases | Accepted (Felipe: "Approve as recommended") | this file, PROJECT_SPEC Phase 5 |
| D-028 | 2026-11-19 | `site/staticwebapp.config.json`: `responseOverrides` 404 rewrites to `/404/index.html` (status stays 404); `.webmanifest` served as `application/manifest+json`. New site only, live at cut-over | Accepted (Felipe: "Approve both") | `site/staticwebapp.config.json` |
| D-029 | 2026-11-19 | Phase 6 plan: 6.1 share image from the logo kit, sitemap and robots generated from the page list, canonical links on https://imkan.ai, one Organization JSON-LD with published facts only; 6.2 self-host Funnel Display, Funnel Sans and DM Mono (download approved, OFL), move inline scripts and styles to files, enforce the CSP (style attributes allowed), a CSP test on every page, /assets cache one day, /_build one year; 6.3 portrait srcset, perf checks, keyboard and reduced-motion passes | Accepted (Felipe: "Approve both", including the font download) | PROJECT_SPEC Phase 6 |
| D-030 | 2026-11-19 | Enforced CSP in `site/staticwebapp.config.json`: default/script/style/font/connect/manifest 'self', `style-src-attr 'unsafe-inline'` (the kit's layout attributes), img 'self' data:, form-action 'self', frame-ancestors 'none', base-uri 'self', object-src 'none', upgrade-insecure-requests. Cache: `/_build/*` 1 year immutable, `/assets/*` 1 day, `/fonts/*` 30 days, `/images/*` 1 week. `site/tests/csp.spec.ts` runs every page under the policy | Accepted (Felipe: "Approve and commit"); live at cut-over | `site/staticwebapp.config.json` |
| D-031 | 2026-11-19 | Layout rhythm: sections fit their content with fixed padding tokens (128 / 96 / 72px by width), not one or two screens of `100svh`; only the hero keeps a capped screen height. Media frames get a fixed `aspect-ratio`, mock-ups sit fully visible and the same way in a row. Titles never smaller than their text. Overrides the kit's section rule in our CSS (kit files unmodified); the gate's screen-count findings for this are recorded as this decision, not waived one by one. Evidence: at 1366×650 content overran sections by up to 230px; at 2560×1300 sections were half empty | Accepted (Felipe: "Approve as recommended") | `DESIGN.md` Layout |
| D-032 | 2026-11-19 | Browser support and visual QA: last two versions of Chrome, Edge, Firefox, Safari (macOS, iOS) and Samsung Internet (Brave, Opera via Chromium). Our CSS uses Baseline widely-available features, newer ones behind `@supports`. Tooling: Playwright Chromium + Firefox + WebKit, locally (engines downloaded to Playwright's cache) and in CI (`checks.yml`, diff shown first); `stylelint` + `stylelint-plugin-use-baseline` as dev-only dependencies; screenshot baselines in the repo; Felipe's real-device check per release | Accepted (Felipe: "Approve as recommended") | `DESIGN.md` Browser support |
| D-033 | 2026-11-20 | Interactive mock-ups (experiment on `feature/interactive-demos`, not on the production candidate `feature/redesign`): every moving mock-up becomes a small demo the visitor can play. The kit stays unmodified: `/scripts/play.js` lazy-loads `/scripts/play/<name>.js` for a `data-play` element and, on the first touch, stops the kit's loop through the fragment's own controller. No new dependencies, CSP unchanged. The mock-up itself is the control (no added toolbars); real roles (listbox, buttons, switches), keyboard, 24px+ targets; reduced motion keeps the demos working without animation. Words come from the markup; new text is a TODO for Felipe. Pilot: the anomalies frame (#platform) | Accepted (Felipe: "do all of them", "Yes, build pilot") | `site/public/scripts/play/`, `tests/play.spec.ts` |
| D-034 | 2026-11-22 | Mock-up frames flat bone (`#e3ded3`, the palette's surface) instead of the kit's sand mesh; favicon set from the kit's light icon (bone tile, plum K `#5e1654`), manifest icons and theme colour to match; the "Try it" pill lines up with the mock-up's right edge, 16px above and below it. Done in our `tokens.css` and `play.css`, kit files unmodified. Supersedes D-025 | Frame colour superseded by D-035; favicon and pill stand (Felipe: "Bone, flat", "Bone tile, plum K") | `site/public/styles/tokens.css`, `site/public/brand/`, `site/public/scripts/play/lib.js`, `site/public/styles/play.css` |
| D-035 | 2026-11-23 | Light and dark mode. Light ("Rhythm"): the bone page with light and dark bands: the opening and Methodology plum-black, the figures band gold with plum-black text, mock-up frames plum-black on bone and `#271d29` on the dark bands, gold buttons and gold "Try it" pills on the frames. Dark: the plum-black page (the inverse tokens on every ground), frames `#271d29`, gold actions and figures. The mock-ups stay light product UI in both. The visitor's device setting decides; a sun/moon button in the nav overrides it and is remembered on that browser (`localStorage`); without scripts the page is light. Case heroes use the light-on-dark drawing. Supersedes D-034's frame colour (bone) | Accepted (Felipe: light mode Rhythm, dark mode Midnight, "an option to turn light mode or dark mode") | `site/public/styles/theme.css`, `site/public/scripts/boot.js`, `site/partials/nav.html`, `site/partials/head.html`, `site/templates/case.html` |

## Open decisions

| ID | Question | Options | Needed by |
|---|---|---|---|
| O-004 | Where the email-signature logo image is hosted | Built for the recommended option: `https://imkan.ai/brand/png/imkan-email-logo@2x.png`, live after cut-over; the alternative is uploading the PNG into each mail client. Felipe to confirm | Phase 8 (signature usable after cut-over) |
| O-005 | Pending wording changes 7-20 and the illustrative UI text | Approve, edit or revert each | Phase 7.3 |
| O-006 | Who checks the Arabic "إمكان" in the logo | A native reader Felipe names | Phase 2.5 |

## Log

### 2026-11-16: visual direction v2 (D-012, D-013, D-014, D-015)

Felipe reviewed home page v1: layout, minimalism and new elements kept; palette, hero animation and logo rejected as not elite or impressive enough. Agreed: a light (not white) palette dealt for an AI firm, a cinematic scroll scene in the hero with a kinetic-type opener as fallback, and three logo directions before choosing. The logo also serves the email signature, so PNG exports are required. Adopted a stepwise working method and the planning files above. Pushed back on a root `requirements.txt` (drift, and Azure's build reads `api/requirements.txt`); proposed documenting all manifests in the README instead.

Superseded by this: the oxblood palette (and the darker `#560a0f` ink added for contrast), the working logo, and the `fluted-glass` hero effect.

### 2026-11-18: palette chosen (D-018)

Seven palette rounds between 2026-11-16 and 2026-11-18. Rejected: the three dealt palettes (swap pastels, cool grey and cobalt, stone and blueprint), two rounds of cobalt variants (too close to straight black and white, then midnight navy disliked), vibrant porcelain (violet and lime, cobalt and tangerine, teal and magenta), and the warm bone family (persimmon, coral, apricot, terracotta). Felipe wants the site fun and vibrant but premium, not corporate: warm bone ground, a plum-black blend instead of black, and a saffron yellow that pops against the purple. Picked midnight plum and gold over blackcurrant noir and the plum-to-black gradient. Contrast: ink 15.6:1, muted 8.2:1, accent 10.4:1, white on accent 12.2:1, band text 16.6:1, gold button text 12.1:1, so the muted colour already meets 7:1 and needs no darkening. The palette is Felipe's choice, not dealt, so it goes in through `start.mjs brand`.

### 2026-11-19: logo kit built (Phase 2.4)

Built in `site/public/brand/` (served at `/brand/` after cut-over), usage guide in `Documentation/brand/README.md`, overview `Documentation/brand/logo-kit.jpg`. Four lockup colourways (plum and plum-black on light, ink, gold and bone on dark, bone), four symbol colourways, app icons (gold mark on midnight plum), favicon SVG/ICO/PNG, apple-touch and manifest icons, square avatars, PNG lockups at 1x/2x/3x, and an email-signature template (`Documentation/brand/email-signature.html`) with placeholders for name, title, email and phone. The email PNG has a white tile so it survives dark-mode mail apps. Not yet wired into the site pages: that is Phase 4. The old working logo in `site/public/images/logo/` stays until then.


Kit approved (2026-11-19). Felipe asked for every colourway as files, not only plum and gold, plus gold and black email logos. Added `imkan-lockup-gold-ink` (gold mark, plum-black text; the mark is pale on light grounds, 1.6:1) and `imkan-lockup-black` (pure black), PNGs for all six lockup colourways and four mark colourways, light app icons, and email tiles in black, gold on white and gold on midnight plum. Felipe picked gold on midnight plum as the email default (D-019).

### 2026-11-19: DESIGN.md v2 (Phase 2.6)

`DESIGN.md` rewritten for visual direction v2: midnight plum and gold tokens with contrast for every pair, Funnel type, the logo kit and its rules, the motion budget with the hero scene and moments left to Phases 3 and 4, and the home page plan carried over from v1. `start.mjs brand` was run for the chosen colours; it derives a plum-black band with bone buttons, so the gold band needs the override recorded as D-020. CLAUDE.md now points to DESIGN.md v2.

### 2026-11-19: hero scene dealt and previewed (Phase 3.1, 3.2)

The kit's scene rules: a scene is the hero only if it fits the hero section and rests in one screen; none qualifies for Imkan (the three hero scenes need the client's own photographs and rest in two screens). Of the eleven scenes, Imkan qualifies for three statement scenes; the product scenes need Imkan's own product screen (our windows show clients' systems), fly-into-the-shape needs one real dark photograph, object-through-giant-type needs a quote. Felipe chose Plan A. Previewed with the v2 tokens and real words; found and fixed the stem offset (D-023); phone and reduced motion show the finished composition. The v1 moments letters-assemble and iris-opens cannot sit with this scene (`avoidWith`); Phase 4 re-deals moments.

Felipe approved the scene after the preview (2026-11-19). O-003 closed; the letter-physics fallback is not needed.

### 2026-11-19: Phase 4.0 to 4.2

Checker crash (constraint 5): diagnosed. The full desktop walk crashed Chrome's software renderer (SwiftShader) on v1's WebGL hero ground (`fluted-glass`); a full 1440 walk of a page without WebGL completed. With the ground retired (ADR 0010) the full check runs again. The v2 tokens, logo, icons and recoloured case art (one gold detail per drawing on the dark band) are in; the old working logo files were deleted with Felipe's approval. The scene sits before the cases band; the tiles take the original eyebrow "Production Systems" as their heading.

### 2026-11-19: Phase 4.3 and 4.4

Screen counts fixed at 1440, 820, 768 and 390 (marquee overflow that made the page 3990px wide, tablet cases on one screen, phone form on one screen, statement figures). Gate: the quick look listed 21 FAILs; seven sit on the scene section and the kit's own scene demo fails the same checks (no-visual, heading-scale, empty-area, container-edges; `Documentation/baseline/kit-demo-letter-bar-check.txt`), and the marquee's clipped-carousel finding also appears on the kit's own marquee demo. Felipe chose to fix ours, edit two words and run the rounds; findings inherent to kit parts are reported, not waived (the cap is five).

Felipe approved Phase 4 (2026-11-19) after the screenshots and the live preview. The gate stays OPEN with the 11 kit-inherent findings documented in `Documentation/qa/phase-4-report.md`; it is closed with `gate.mjs --done` only on Felipe's own words. Wording changes 21-25 stay pending his review (O-005, Phase 7.3).

### 2026-11-19: careers page approved (Phase 5.1)

Felipe approved `/careers/`. Hero (centred, the open application's steps), perks as rows with lucide icons (downloaded with his OK) beside the first three past roles, six past roles on the dark band with details on demand (dealt moment line-carries-colour), the open application with the founders beside the form, posting to /api/apply with CV type and size checked in the browser. Gate after round 2: FAIL 2, with five waivers (gold button x2, original h1 and headings, a contrast reading taken mid-fade). Open: `sparse` on the past-roles band (measured while the moment still hides it) and uneven gaps at 390 (the form takes two phone screens with the founders). One round left. Evidence in `Documentation/qa/careers/`.

### 2026-11-19: work pages approved (Phase 5.2)

Felipe approved the case template, the eleven generated case pages and the work index. Cases: product hero with the case drawing, overview statement (dealt word-highlight), challenge, solution and stack on the band, impact with the next-case link; all generated from `site/content/cases.json` by `site/scripts/build-cases.mjs`, the index included. Index: statement hero with four facts, eleven tiles on the band (dealt iris-opens). Case template: checks clean apart from five waivers. Index gate round 1: FAIL 2 (card-layout on phones, inherent to an index of tiles). Evidence in `Documentation/qa/work/`.

### 2026-11-19: Phase 5 complete

Privacy, Terms and the 404 page approved. Privacy and Terms are generated from `site/content/*.md` (the old text word for word, checked: 989 and 704 words) by `site/scripts/build-legal.mjs`; the 404 page's words are new (wording change 35). The 404 is served for missing paths by D-028. All 17 pages pass the smoke and accessibility tests on desktop and phone (102 tests). Found for Phase 6: `/assets/*` is cached for a year as immutable though the kit files there have no versioned names.

### 2026-11-19: Phase 6 complete

6.1 share image, sitemap, robots, canonical links, Organization data, head audit (`site/scripts/build-seo.mjs`). 6.2 self-hosted fonts with their OFL licences, no inline code, enforced CSP and cache headers (D-030), CSP test on every page. 6.3 portrait WebP copies with srcset, lazy icons, keyboard and reduced-motion tests (both proven able to fail). 182 tests pass. Open and accepted: perf.mjs counts four font families on the home page; the fourth, "Funnel Display Fit", is the same file under normalised metrics for the scene (D-023), downloaded once. SVG "oversized/upscaled" warnings do not apply to vector drawings.

### 2026-11-19: PR #25 opened; preview environments full

Draft PR #25 (feature/redesign into main) opened; CI checks pass. The Azure preview deploy was refused: the Static Web App had reached its maximum number of staging environments. Cause: the workflow's Close Pull Request Job failed on every past PR (#13 to #24), so their previews were never removed. Felipe deleted the stale environments in the portal. Agreed (after 7.2): find the close job's error with a throwaway PR, fix the workflow (diff shown first), and add a check of Azure Environments after each merge to `Documentation/git_commandments.md`. Standard plan not needed.


### 2026-11-19: preview cleanup fixed

The Close Pull Request Job's error, captured on throwaway PR #26: `No matching static site found`. The deploy job signs in with the deployment token and a GitHub identity token (OIDC); the close job sent only the token. Fix: the close job gets the same OIDC sign-in (`id-token: write`, the Get Id Token step, `github_id_token`). Tested on PR #26: the close job passed and its preview was deleted (URL 404); PR #25's preview untouched. Rolled out: PR #27 into `main` (needs Felipe's merge; production content unchanged) and the same commit on `feature/redesign`. `Documentation/git_commandments.md` §8 now has the check of Actions and Azure Environments after each merge or close. Resetting the deployment token was not needed.

### 2026-11-19: Phase 7.5 visual QA started

Felipe found the preview messy (things off frame, wrong sizes, uneven spacing). Measured on the preview: section heights are tied to the screen height, so content overlaps the next section on short laptops and leaves voids on tall screens, which a 900px-tall test window never showed; mock-ups are cropped by "leftover height" frames; the Think / Build / Evolve labels overflow their circles. Reading copy is already 16px (the 13px text is inside the mock-ups only), so the type issue is hierarchy, not size. Plan approved with all four recommendations: D-031 (rhythm, frames), D-032 (browsers, tooling). Q0 standards written in `DESIGN.md`; Q1 to Q6 in `PROJECT_SPEC.md` 7.5.

### 2026-11-20: interactive demos started (D-033)
Felipe approved the redesign and asked for a dev experiment: make the moving mock-ups playable, all of them. Branch `feature/interactive-demos` from `feature/redesign`. 14 mock-ups listed (12 home, 2 careers). Pilot built: the anomaly queue and detection run (#platform). Open: the "Illustrative demo" label (recommended), and new text (extra chat answers, more notification texts, hints) as TODOs.

### 2026-11-20: interactive demos rolled out (D-033)
Felipe approved the cue pattern ("Approve, roll out"). All 13 moving mock-ups are now demos, on home and careers, with the same "Try it" / "Reset demo" pill: in a frame's top-right corner for card panels and hero windows, above the frame for #platform. The terminal and voice demos replay the kit's own animation through its controller; the careers roles open the real role details. New text (wording changes 44 to 58) is pending Felipe. QA under the revised protocol: contact sheets per demo in Edge, Firefox and WebKit at desktop and phone size, section heights against PR #25, the first screen at 1440x900 and 1366x650.

### 2026-11-21: three demos reworked after Felipe's review (D-033)
Felipe liked the demos and asked for three changes, approved as proposed ("Approve, build all three"):
- **Hero chat:** the card takes up to 820px; the visitor's bubbles are plum and the agent's answers white cards; there is a prompt bar; the suggestions type themselves into it. Typed questions get a scripted answer or an honest fallback.
- **Fraud demo:** becomes alert triage. Four open alerts, a plain-language narrative, a verdict with an illustrative risk level and Escalate or Clear, and a count-down to a summary.
- **Roadmap:** becomes a journey of four stops, then an impact x effort grid where the visitor places four initiatives and the top-left one is "Your first move".

New text: wording changes 59 to 82, pending.

### 2026-11-21: second review, batch A (D-033)
Felipe reviewed the demos again and approved a plan of quick fixes (A) and five redesigns (B), one at a time ("Approve, start"). Batch A:
- **No "Reset demo" anywhere:** the "Try it" pill fades away once the visitor plays. Each demo has its own undo or returns by itself.
- **Fraud triage:** each run step takes 3 s. Picking another alert restarts the run. After the summary the queue refills by itself (5 s).
- **Deploy AI notes:** our own loop replaces the kit's, which had no tempo setting. One new note every 3 s; handled notes come back one at a time.
- **Voice frame:** hugs its card from the top instead of a fixed 560px with the card centred.
- **Hero chat:** a white window up to 1120px wide in its frame. The agent's answers are tinted cards. The header holds "Try chatting" (plays a random suggestion), then "Clear chat" (empties the conversation).

New text: wording changes 83 to 86, pending. Batch B, the redesigns, as proposed:
- **Voice:** a call you hear. The browser's own speechSynthesis (no package, no files, nothing sent) speaks the caller's question and the agent's answer; the transcript lights up word by word; EN / Arabic switch; captions only where the device has no voice.
- **Think:** "Ask why", a deck that zooms through a request to the decision to improve.
- **Roadmap:** ten initiatives fly from a pile onto an impact x effort chart; low ones fade; a route draws to the first move; dots can be dragged or moved with the arrow keys.
- **Evolve:** a value-over-time chart with a Vendor / Partner switch and three marked moments each.
- **Proof of value:** a week slider; a small product builds itself, the four commitments tick off, "Cost to you" stays 0.

The self-playing demos (Ask why, the chart, the roadmap, the weeks, the notes) play at rest and pause for 9 s after the visitor's last touch. The old search, console and checklist scripts stay in the repository unused, pending Felipe's OK to delete them. New text: wording changes 87 to 100, pending (the Arabic also needs a native check).

### 2026-11-21: third review fixes (D-033)
- **Fraud timing:** the seconds shown stay the system's own (the case study says under 10 seconds), so a run at 3 s a step is tagged "Slow motion". Every waiting step reads "Queued". At rest our own slow run replaces the kit's fast one.
- **Roadmap:** a line says what the pile and the chart show and what to do.
- **Sales review:** the kit's loop no longer flips the switches by itself or on hover; they change only when pressed.
- **Steady cards:** the partner, roadmap, proof-of-value and voice cards keep the height of their tallest state, so a press never resizes the row.

New text: wording changes 101 to 103, pending.

### 2026-11-21: fraud demo in sync (D-033)
Felipe: the bar, the counter and the status labels were not aligned. Now one clock drives them all:
- a running step's seconds count in tenths with its bar;
- the run's chip names the running step (the page's own step names);
- at rest the queue follows the run: the alert being run is selected and Reviewing, then Escalated or Cleared by its risk;
- after the four alerts, they start over as New. The kit's own window loop no longer runs beside ours.

### 2026-11-21: roadmap game and "Hand it off" (D-033)
Approved by Felipe ("Pick the next step", "Hand it off", push with the rest):
- **Roadmap:** a game. Four empty stops, six cards: the page's four steps and two traps. Each pick gets a one-line reason: right, not yet, or not a step. A right card flies to its stop; finish with "Roadmap complete" and Play again.
- **Deploy AI that saves you time:** a team's week of five tasks, tagged copying, checking, chasing (the card's words) or judgement. "Hand off" flies a task's hours into an hours-back meter, and the agent shows the work done (the page's own notes). The judgement task stays with the team. The hours are illustrative.

Both cards keep their tallest height. New text: wording changes 104 to 112, pending.

### 2026-11-21: fraud steps 2 s; roadmap game on data maturity (D-033)
- **Fraud demo:** each step takes 2 s. The bar, the seconds, the total, the chip and the statuses still share one clock.
- **Roadmap game:** now the road to "AI ready": Goals, Collect, Clean, Trust, then a fixed AI-ready flag. Traps: "Buy an AI tool first" and "Build dashboards for every team".

New text: wording changes 113 to 115 (they replace 104 to 108), pending.

### 2026-11-22: six stages to AI ready; everyday sources (D-033)
Approved by Felipe ("Six stages", "Make your data work"):
- **Roadmap game:** Strategy, Collect, Owners, Quality, Pipelines, Trust, then AI ready. The traps now sound sensible: "Launch a chatbot pilot" and "Move everything to the cloud". On desktop the cards sit in two columns.
- **Make your data work for you:** we work with what a client already has. Five everyday sources: an Excel workbook, an orders inbox, a folder of PDF invoices, an accounting system running for years, and scanned paper forms. Each is plugged in as it is, and "March sales" goes from three answers to one. The line under it reads "Nothing to replace. Nothing new to learn." Figures are illustrative.

"Build on what you already own" (Methodology) still shows cloud tools; aligning it is open. New text: wording changes 116 to 122, pending.

### 2026-11-22: flat bone frames, plum favicon, the pill in line (D-034)
- Felipe: the sand frames were not one of his colours; the favicon should be purple, not gold; the "Try it" pill looked squeezed and off frame.
- Frames: previews of sand, bone flat, midnight plum and plum; chosen bone flat. The kit's ground tokens are set to the palette on `html[data-ground]` and the panel mesh is removed, in `tokens.css`.
- Favicon: the kit's own `imkan-icon-light.svg` (bone tile, plum K); `.ico`, 16/32/48 PNGs and the apple-touch icon made from its 512 PNG; the manifest points at `icon-light-192/512`.
- Pill: `lib.js` measures the mock-up and sets `--cue-top` / `--cue-end`; frames keep 64px above the mock-up at every width.

### 2026-11-23: light and dark mode (D-035)
- Felipe: the site felt all light and the gold was barely used. Four whole-page colour mocks (Rhythm, Midnight, Plum and gold, Gold frames); he chose Rhythm as light mode and Midnight as dark mode, with a switch on the site. (A first build used Plum and gold for light mode by mistake: Felipe counted "Today" as the first mock. Corrected the same day.)
- Built in one file, `theme.css`, over the kit's tokens (kit unmodified). `boot.js` sets `<html data-theme>` in the head before the body is drawn (no flash): saved choice first, else the device setting, followed live. The nav button has `aria-pressed` and the label "Dark mode" (wording 123, pending).
- Fixes found on the way: the industry tags and the privacy callout used the fixed light surface (now the ground's own); the fraud demo keeps its light window in dark mode; case heroes switched to the `-band.svg` drawings (the `-ink.svg` files are now unused; kept on purpose for a light hero later, Felipe 2026-11-24).
- Tests: a dark-mode accessibility scan for every page and a test for the button were added to `smoke.spec.ts`.
- Fraud demo: the steps show as a row from a 1280px window (the kit turned the row on only from about 1366px); tablets and phones keep the stacked list (Felipe, 2026-11-23). In `play.css`, kit unmodified.

### 2026-11-24: cut-over to production
- Felipe: "make it the main website in the main branch, this is the website that is going live". The new site (with the demos and the two modes) merges into `main`, replacing the old React site.
- `noindex` removed from every page but the 404 page; the smoke test now checks that. robots.txt and the sitemap already point at imkan.ai. Forms leave test mode on the live domain by themselves.
- Still open after launch: Felipe's review of the remaining pending wording rows, the Arabic voice check (O-006), the real-device check (Q5).
- 2026-11-24: light mode is the default for everyone (the device setting no longer decides); the nav button is worded, "Dark mode" / "Light mode", naming the mode it switches to, and on phones it sits in the open menu (it pushed the menu button off a 390px screen). Felipe.
- 2026-11-24: cards in a row share their rows (CSS subgrid) from 640px, so the demo frames in a row start and end on one line when one card's text runs longer (Felipe saw Step 2's frame sit lower on the live site). In `rhythm.css`.
- 2026-11-24: phones only. The hero chat's suggestions wrap to two lines and the row fades at its edge, so the first one is no longer cut off. The roadmap, hand-off and "plug in a source" cards fit their content on phones and grow with a longer message, without reserving blank space (tablet and desktop keep the reserve, since cards sit side by side there).
- 2026-11-24: brand assets come in three looks (Felipe): light (bone or white, plum K, plum-black text), dark (plum-black, gold K, bone text) and "light with yellow" (bone or white, gold K, plum-black text: the kit's `gold-ink` lockup). Item 1 of the brand assets: the favicon also sits at the site root (`/favicon.ico`, `/favicon.svg`), where search engines look first, and the pages offer a 192px PNG icon too (Google asks for a multiple of 48px). Google still showed the old icon because it had not re-read the home page since the launch; Felipe asks for a re-crawl in Search Console.
- 2026-11-24: brand assets item 2, the logo pack (`Documentation/brand/assets/logos`): the logo, the logo on its background, the K alone, an icon tile and a square profile picture, each in the three looks, as SVG and PNG, with a README saying which background each look is for. Built from the kit's own SVGs by `build-logos.mjs`, so the shapes match the site; the kit itself is unchanged. The dark background is the site's plum-black `#1b111d` (the old kit tiles use a darker `#120914`).
- 2026-11-24: brand assets item 3, email signatures in the three looks. `Documentation/brand/email-signature.html` (rewritten): type your details once, copy the light, dark or light-with-gold signature, with steps for Gmail, Outlook (new, web, classic) and Apple Mail. Tables and inline styles, Arial text, the logo as a 2x PNG on a solid tile (white, or plum-black for the dark one) so dark-mode mail apps cannot hide it. The logos are new files in `site/public/brand/email/` because email images must load from a public https address; links go to www.imkan.ai.
- 2026-11-24: brand assets item 4, PowerPoint templates in the three looks (`Documentation/brand/assets/slides`): a `.potx` per look (Felipe: one file per look, bone background for the light ones, Funnel fonts embedded) with twelve named layouts, theme colours from the site's tokens and Funnel as theme fonts, plus an example deck per look. Built by `build-slides.ps1`, which drives PowerPoint itself (no new packages). The fonts are the designers' static TTFs (Dicotype/Funnel `f9509ce`, OFL) in `Documentation/brand/assets/fonts`, embedded in full. Tables use PowerPoint built-in styles (Light Style 2 or 1, Accent 1): PowerPoint does not draw custom table styles.
- 2026-11-25: brand assets item 5, Word templates (`Documentation/brand/assets/documents`): a letterhead and a report `.dotx` per look, with filled-in examples as Word and PDF. Felipe chose white pages in every look, the dark look as a plum-black report cover and a plum-black band on the letter's first page (white pages inside), and a letterhead plus a report per look. A4, Funnel fonts embedded, named styles and an "Imkan table" style, prompts as Word placeholders. Built by `build-docs.ps1` driving Word (plus `fix-prompts.vbs`); no new packages; it never writes to Normal.dotm. Table header text stays plum-black (Word lets Normal's colour win over a table style), so header fills are surface, lilac or gold. Open: the letterhead's legal line (company legal name, CR, VAT, address) waits for Felipe.
- 2026-11-25: brand assets item 6. Felipe picked one item from the proposed list (link previews; LinkedIn kit, video-call backgrounds and business cards not wanted now). The share image (`share.jpg`, 1200x630) was already on the new brand, but every page named it as `/share.jpg`; link previews (LinkedIn, WhatsApp, Facebook) need a full address, so all 16 pages now give `https://www.imkan.ai/share.jpg` with `og:image:width` and `og:image:height`, and the smoke test checks it. An `og:image:alt` text is proposed, not published (new wording).
- 2026-11-25: more brand assets (Felipe agreed to four: company profile, LinkedIn banner, bilingual letterhead, business cards; one at a time). The company profile (`Documentation/brand/assets/profile`): two A4 pages in the three looks (Felipe: two pages, all three looks, a designed PDF). Laid out in HTML with the site's fonts and printed to PDF by Edge (`build-profile.mjs`). All wording is the site's; two new labels logged (wording 129, 130).
- 2026-11-25: LinkedIn banners (`Documentation/brand/assets/social`): the company page cover (1128x191) and a personal profile banner (1584x396) in the three looks, at 1x and 2x. "Possibility? Engineered!" with the site's meta title line; text kept out of the lower left, where LinkedIn places the logo or photo. Built by `build-banners.mjs` (HTML captured by Edge).
- 2026-11-25: business cards (`Documentation/brand/assets/cards`), as a template first (Felipe): 85 x 55 mm with 3 mm bleed, front logo and back details, in the three looks; prompts until each person's details are supplied. Built by `build-cards.mjs` (HTML printed by Edge). Cards with a person's phone and email are better kept out of the repository.
- 2026-11-25: the Arabic brand font is IBM Plex Sans Arabic (Felipe approved the download), for the bilingual letterhead. From IBM's official release `@ibm/plex-sans-arabic@1.1.0` (GitHub IBM/plex), SIL OFL 1.1, embedding allowed (fsType 0). Four weights (Regular, Medium, SemiBold, Bold) as TTF in `Documentation/brand/assets/fonts`, with its licence as `IBMPlexSansArabic-OFL.txt`; installed for Felipe's Windows user like Funnel. Not used on the website yet.
- 2026-11-25: the registered address is the Riyadh address from the old site's contact section (Felipe): "8392 Prince Turki Bin Abdulaziz Al Awwal, 5246 King Saud University district, Riyadh, 12371, Saudi Arabia". The Word letterheads now print it in the first-page footer; the company legal name, CR number and VAT number stay a prompt until Felipe supplies them.
- 2026-11-25: company legal details (Felipe): legal name "Imkan dot AI", CR number 7053412040; no VAT number on file. The Word letterheads' footer now reads "Imkan dot AI · CR 7053412040" over the registered address; the prompt is gone. A VAT number is added there if one is issued.
- 2026-11-25: business cards for Felipe Antonio Araya and Dr. Syed Fawad Ali, from the details they gave (titles "Co-founder | Head of Data Science & AI" and "Co-founder | Head of Data Strategy & Engineering"; phones spaced as +966 5x xxx xxxx). The repository is public, so people's details live in `cards/local/people.json` and their cards in `cards/local/<slug>/`, both git-ignored; only the template is committed.
