# Imkan.ai Website – Git & GitHub Collaboration Manual (Short)

This is the **exact workflow** we use to collaborate on the Imkan.ai website (UI/UX, content, features). Follow it every time.

---

## 1) Values we use (standards)

### Branch naming (required)
Use **one** of these prefixes:

- `ui/` – visual-only changes (styles, spacing, fonts)
- `ux/` – layout/flow changes (navigation, page structure)
- `content/` – copy/SEO text only
- `feature/` – new functionality
- `fix/` – bug fixes
- `chore/` – tooling/deps/config

**Format:** `<prefix>/<short-kebab-case-description>`

Examples:
- `ui/hero-typography-mobile`
- `ux/navbar-mobile-menu`
- `content/homepage-value-prop`
- `feature/contact-form`
- `fix/footer-link`

### Commit messages (required)
Use: **`<type>(<scope>): <message>`**

Types:
- `ui`, `ux`, `content`, `feat`, `fix`, `chore`, `docs`, `perf`, `test`

Scopes (pick the area you touched):
- `hero`, `navbar`, `footer`, `pricing`, `home`, `about`, `blog`, `seo`, `forms`, `layout`, `theme`, `components`

Examples:
- `ui(hero): reduce title size on mobile`
- `ux(navbar): simplify menu to 3 primary links`
- `content(home): rewrite value prop and CTA`
- `feat(forms): add contact form validation`
- `fix(seo): correct canonical URL`

**Rules:**
- One commit = one logical change.
- No messages like `updates`, `wip`, `fix stuff`.

### PR rules (required)
- PRs must be **small and focused** (ideally 1–3 components/pages).
- UI/UX/content PRs must include **screenshots: Desktop + Mobile**.
- Do not mix unrelated work (e.g., “UI tweaks + dependency upgrade” in one PR).

---

## 2) Start a task (always do this)

### Step A — Update local `main`
```bash
git switch main
git pull
```

### Step B — Create a branch
```bash
git switch -c ui/hero-typography-mobile
```

**Rule:** Never work on `main`.

---

## 3) Make changes + commit (repeat as needed)

### Step A — Check what you changed
```bash
git status
git diff
```

### Step B — Stage changes
Stage everything (most common):
```bash
git add .
```
Stage a single file:
```bash
git add path/to/file
```

### Step C — Commit
```bash
git commit -m "ui(hero): reduce title size on mobile"
```

**Rule of thumb:** if your change is big, split it into multiple commits (still within one branch).

---

## 4) Push your branch

First push:
```bash
git push -u origin ui/hero-typography-mobile
```

After that:
```bash
git push
```

---

## 5) Create a Pull Request (PR)

On GitHub:
1. Open the repo → you’ll see a prompt to create a PR for your pushed branch
2. Base: `main`
3. Compare: your branch

### PR title
Use the same style as commit messages:
- `ui(hero): reduce title size on mobile`

### PR description (copy/paste template)
```
Type: UI / UX / Content / Feature / Fix / Chore
Scope: hero | navbar | footer | ...

What changed:
- 

Why:
- 

How to test:
- 

Screenshots (required for UI/UX/Content):
- Desktop:
- Mobile:
```

### Solo maintainer (no human review)
PRs are still required (clean history, CI preview on Azure SWA), but **no second-person review**.

1. Push your branch and open the PR as usual.
2. The **Auto-merge maintainer PRs** workflow approves and enables **squash auto-merge** when CI passes.
3. Once the Azure SWA check is green, GitHub merges automatically — no waiting on a reviewer.

**One-time GitHub settings** (repo → Settings):
- **General → Pull Requests**: enable **Allow auto-merge**.
- **Branches → `main` → Edit protection**:
  - Keep **Require a pull request before merging**.
  - Set **Required approvals** to **0** (or disable **Require review from Code Owners**).
  - Keep **Require status checks** with the Azure SWA build check.
  - Optional: enable **Allow auto-merge** in the rule.

If auto-merge does not trigger, merge manually with **Squash and merge** once CI is green.

---

## 6) Keep your branch current (avoid conflicts)

If your branch stays open more than a few hours (or `main` moved a lot), update it:

```bash
git switch main
git pull

git switch ui/hero-typography-mobile
git merge main
```

If conflicts happen:
1) resolve files
2) stage
3) commit
```bash
git add .
git commit -m "chore: resolve merge conflict with main"
```

---

## 7) Merge policy

- Merge via GitHub PR (never push directly to `main`).
- Preferred: **Squash & merge** (also used by the auto-merge workflow).

**Why:** keeps `main` clean and easy to revert, while CI runs on every PR.

---

## 8) After merge (clean up)

Update local `main`:
```bash
git switch main
git pull
```

Delete local branch:
```bash
git branch -d ui/hero-typography-mobile
```

---

## 9) Essential “extra” commands (use when needed)

### Inspect history
```bash
git log --oneline --graph --decorate --all
```

### Stash (pause work temporarily)
```bash
git stash push -m "WIP: hero typography"
# do something else
git stash pop
```

### Reset soft (fix commits locally BEFORE pushing)
Undo last commit but keep changes staged:
```bash
git reset --soft HEAD~1
git commit -m "ui(hero): reduce title size on mobile"
```

⚠️ Avoid rewriting history after pushing unless coordinated.

---

## 10) Non-negotiable don’ts

- Don’t commit to `main`
- Don’t commit secrets (`.env`, keys, tokens)
- Don’t mix unrelated work in a PR
- Don’t open huge PRs without agreement

---

**This manual is the collaboration contract for the Imkan.ai website repo.**

