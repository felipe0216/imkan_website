# 0002. Tech approach: static HTML pages built with Vite

- **Status:** Accepted
- **Date:** 2026-11-15
- **Decided by:** Felipe

## Context

ADR 0001 commits the redesign to `design-taste-frontend` as a service site. That skill shapes the build:

- Its CSS and JavaScript kit (`system.css`, `system.js` and related files) must load as unmodified plain files from `public/assets`. Any edit, or bundling it through imports, fails the gate's `kit-edited` check, which cannot be waived (`references/gate.md`).
- The gate checks the built page in headless Chrome, including a pass with JavaScript turned off (`hidden-content`). A client-rendered React app shows an empty page in that pass.
- The kit is a complete design system. Tailwind would be a second system competing with it.
- The kit's forms post `multipart/form-data` (`new FormData(form)`) to the address in `data-endpoint` (`assets/system.js`). Success shows only after a real response.

The current site is a React 19 single-page app with Tailwind loaded from the CDN.

Options considered:

1. Static HTML pages built by Vite, using the kit.
2. React used only at build time to render static HTML.
3. Keep the React SPA and restyle it.

## Decision

Build the new site as **static HTML pages with Vite**:

- One HTML file per page (home, careers, and any added later) using Vite's multi-page build.
- No React and no Tailwind in the new site. Styling and behaviour come from the kit, loaded unmodified from `public/assets`.
- Shared parts (nav, footer) live in HTML partials, included at build time by a small local Vite plugin in `vite.config.ts`. No new dependency.
- Page-specific JavaScript is kept to a minimum and never replaces the kit's form handling.
- The Azure Functions backend (`api/`) and Azure Static Web Apps hosting stay.

## Consequences

- **`api/function_app.py` must accept the kit's form format.** `/api/contact` and `/api/apply` currently expect JSON, with the CV as base64. They need to also accept `multipart/form-data` with the CV as a file field. Keep the same server-side validation (required fields, email format, PDF/DOC/DOCX, 5 MB) and the best-effort email notifications.
- The response must work with the kit's status line. A non-2xx status is shown as a failure and keeps what was typed. A 2xx shows the `data-sent` text.
- The React components, `App.tsx`, the History API router, Tailwind CDN config and `index.css` are not reused. They stay in place until the new site replaces production.
- `staticwebapp.config.json` needs updating for real page paths (for example `/careers/`) instead of the SPA fallback to `index.html`.
- With Tailwind's CDN script gone, the Content Security Policy can drop `unsafe-eval` and most likely `unsafe-inline`. To verify against what the kit actually needs.
- The gate runs one page per build, so each page (home, careers) is checked separately.
- The CLAUDE.md sections on stack and code conventions describe the old site. Update them once the new site's folder layout exists.
- Where the new site lives during development (separate folder or branch, preview URL) is a separate decision.
