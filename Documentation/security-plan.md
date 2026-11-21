# Security plan for the redesign

Based on the `security-review` and `production-audit` skills, applied to this stack: a static site on Azure Static Web Apps with two Python Functions that take personal data and CV uploads. Written 2026-11-16.

## Done

| Area | What | Where |
|---|---|---|
| Form input | Server-side validation of required fields, email format and field length limits | `api/function_app.py` |
| CV uploads | Extension allowlist (.pdf, .doc, .docx), file-signature check, 5 MB limit, file name stripped of paths; the browser's content type is ignored | `validate_cv` |
| Abuse | Per-IP rate limit (5 per 10 minutes per instance by default) and a honeypot field | `is_rate_limited`, `HONEYPOT_FIELD` |
| Error leakage | 500 responses return a generic message; details stay in logs, which record only the exception type | handlers |
| Personal data in logs | Submitter emails no longer logged; only the row key | handlers |
| Test isolation | Preview and localhost submissions go to `*test` tables and test recipients only | `is_test_mode` |
| Headers (new site) | `nosniff`, `strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, a restrictive `Permissions-Policy` | `site/staticwebapp.config.json` |
| CSP (new site) | Report-only policy: self plus Google Fonts; no `unsafe-inline`, no `unsafe-eval` | same file |
| Agent guardrails | Claude cannot force-push, hard-reset or read `.env*` / `api/local.settings.json`; pushes, PRs, installs and `az` always ask | `.claude/settings.json` |
| CI permissions | Checks workflow runs with `contents: read` only | `.github/workflows/checks.yml` |

## To do during the build

1. **Tighten the CSP.** Watch for report-only violations in the browser console (the smoke test fails on console errors, so they surface). The kit's head line that sets `html.m-enter` is an inline script: allow it by its SHA-256 hash rather than `unsafe-inline`. Switch the header to an enforced `content-security-policy` before cut-over.
2. **Self-host fonts if possible.** Serving the dealt fonts from `public/` removes the Google Fonts entries from the CSP and a third-party request.
3. **CORS.** The API still sends `Access-Control-Allow-Origin: *`. The new site calls the API from the same origin, so this can be narrowed to the site's own origins once the old site is retired.
4. **Rate limiting at scale.** The limiter is per Functions instance. If spam gets through, move to a shared store (a Table Storage counter) or add a CAPTCHA-free challenge such as a minimum time-to-submit.
5. **Dependency checks.** Run `npm audit` in `site/` and review `api/requirements.txt` before cut-over. Consider pinning the Python runtime packages.
6. **CV storage.** CVs are emailed, not stored (only metadata is in the table). Keep it that way unless retention rules are agreed.

## Checks before cut-over

- [ ] Enforced CSP with no violations on every page
- [ ] `FORMS_TEST_MODE` not set to `1` in production app settings; production host confirmed not matching the preview pattern (`testMode: false` on a production submission)
- [ ] `FORMS_TEST_RECIPIENTS` set for previews (or left empty, so no test emails at all)
- [ ] No secrets in `site/dist` (search the build for "AccountKey", "endpoint=", "secret")
- [ ] `npm audit` in `site/` shows no high or critical issues
- [ ] Old SPA fallback (`navigationFallback` to `index.html`) not present in the new site's config
- [ ] `production-audit` skill run on the merge candidate, score recorded in the PR

## Not done, on purpose

- **AgentShield scan of the Claude config (`security-scan` skill).** It runs a third-party npm package (`npx ecc-agentshield`). Our config is small enough to review by hand: one project `settings.json` (permissions only, no hooks), `CLAUDE.md`, and 38 skills, of which only `design-taste-frontend` declares a hook (kept unregistered by running it manually). Run the scan only if Felipe approves installing that package, with a pinned version and without `--fix` or `--opus`.
