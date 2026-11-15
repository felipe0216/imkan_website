# 0007. Design first, wording second

- **Status:** Accepted. Supersedes [0006](0006-wording-is-fixed.md).
- **Date:** 2026-11-16
- **Decided by:** Felipe

## Context

ADR 0006 fixed the site's wording word for word. While confirming the case studies, Felipe set a more flexible general rule for the whole site: the design leads, and the wording should be kept as much as possible but may give way where a strong design needs it.

## Decision

Priorities, in order:

1. **Design.** Layouts, formats, icons, shapes, imagery and structure can change freely, everywhere on the site, case studies included.
2. **Wording.** Keep the existing text as much as possible. Text may be **shortened or lightly modified** when a design does not work with its current length or form. That includes splitting text across elements, cutting repetition, or shortening a paragraph to fit a card.

Limits:

- **Facts never change.** Results, numbers, industries, services, roles and claims stay as Felipe gave them. Shortening may drop detail, but must never add, inflate or alter a fact.
- **No new marketing claims and no new copy for its own sake.** Edits serve the design, not the copy rules. We do not rewrite text just to satisfy `design-taste-frontend`'s copy-lint.
- **Every wording change is logged** in `Documentation/wording-changes.md`: the page, the original text, the new text and why. Felipe reviews the log before cut-over.
- Text needed for something new (a page title, alt text, a form status line) is still proposed as a marked TODO for Felipe to approve.
- No em dashes in site copy.

## Consequences

- The design can follow the skill's one-section-per-screen rule more closely, since long text can be trimmed instead of always taking two screens.
- The gate's copy findings that come from original wording are still reported and accepted. We do not chase them with rewrites.
- CLAUDE.md and the content inventory follow this rule. The inventory records the original wording, and the log records every departure from it.
