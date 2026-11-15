# 0004. Dev environment: site/ folder on a long-lived branch with a PR preview

- **Status:** Accepted
- **Date:** 2026-11-15
- **Decided by:** Felipe

## Context

The redesign must not touch production until it is ready. The current GitHub workflow (`.github/workflows/azure-static-web-apps-nice-bush-0890c9503.yml`) works like this:

- It deploys `main` to production.
- It creates a preview environment for each pull request into `main`, and removes it when the PR closes.
- It builds from `app_location: "/"`, `api_location: "api"` and `output_location: "dist"`.
- For pull requests, GitHub runs the workflow file from the PR branch, so a branch can change what its own preview builds.

Local tooling on Felipe's machine: Azure Functions Core Tools (`func`), Azure CLI (`az`) and Python 3.13 are installed. The Static Web Apps CLI (`swa`) is not. `gh` is installed but not signed in.

Options considered: a branch with a PR preview, a separate staging Static Web App, or local only.

## Decision

- The new site is built in a **`site/` folder** on a long-lived **`feature/redesign`** branch.
- On that branch only, the workflow builds `site/`: `app_location: "site"`, with the output folder set to match the Vite build.
- A **draft pull request** from `feature/redesign` to `main` gives an automatic preview URL that updates on every push. That URL is where the new site is reviewed and gated.
- The old site at the repository root and production stay unchanged until the PR is merged. **Merging is the cut-over.**
- Local development: Vite's dev server in `site/` and `func start` in `api/`, with Vite proxying `/api` to the Functions host on port 7071. The SWA CLI is optional, to test routing and `staticwebapp.config.json` locally.
- Feature work happens in short branches off `feature/redesign` and merges back into it, following `Documentation/git_commandments.md`.

## Consequences

- **The form test mode is a hard prerequisite.** Unless the Azure portal shows the preview environment has its own app settings, assume it uses production's storage account and email settings. A form sent from the preview could then write to the real tables and email the real inbox. The API needs a test mode, switched by an app setting or by the preview hostname, that uses separate tables and a test recipient (or no email) before forms are tested online.
- Check the Static Web App's plan in the Azure portal. The Free plan allows only a few preview environments at once, and other open PRs use them too.
- Preview URLs are public to anyone who has them. Add `noindex` to the new site until cut-over, and treat the URL as shareable but not secret.
- Avoid changing the old site on `main` while the redesign is in progress, apart from urgent fixes. Merge `main` into `feature/redesign` regularly so the final merge is clean.
- Merging also changes the production workflow (`app_location`), so cut-over needs a checklist: gates passed, test mode off for production, the new `staticwebapp.config.json` in place, a rollback plan (revert the merge commit), and a check of the live site right after.
- `gh` needs signing in (`gh auth login`) before we can open and watch the draft PR from here.
- After cut-over, the old React app at the root can be deleted in a follow-up PR.
