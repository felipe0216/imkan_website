# 0005. Pages in scope for launch

- **Status:** Accepted
- **Date:** 2026-11-15
- **Decided by:** Felipe

## Context

The current site has:

- One long home page: hero, four services, the THINK / BUILD / EVOLVE methodology, why us, 11 case studies shown in pop-ups, and the team of two.
- A careers page with six roles and an application pop-up.
- Privacy Policy and Terms shown as pop-ups from the footer.
- The contact form, also in a pop-up.

`design-taste-frontend` checks each page separately and does not allow forms in pop-ups (`references/system.md`, Forms: "Never a modal").

Felipe confirmed that the 11 case studies are real, anonymised projects.

## Decision

The new site launches with these pages:

| Page | Path | Contents |
|---|---|---|
| Home | `/` | The existing home sections, redesigned, with the contact form on the page instead of a pop-up |
| Careers | `/careers/` | The open roles and the application form (with CV upload) on the page |
| Work index | `/work/` | All case studies |
| Case study | `/work/<slug>/` | One page per case study, replacing the pop-ups |
| Privacy Policy | `/privacy/` | The existing policy text as a page |
| Terms | `/terms/` | The existing terms text as a page |

## Consequences

- Eleven case study pages plus the index make this the largest part of the build. A shared case study template keeps them consistent.
- Case studies stay anonymised: described by industry, with no client names or logos.
- Each page needs its own gate run (ADR 0002). Case study pages share a template, but each one still has to pass.
- Job details may become sections of `/careers/` or their own pages. To settle in the section plan.
- `staticwebapp.config.json` needs routes for all these paths, plus redirects from any old in-page anchors that are linked from outside, if any.
- The wording on all these pages comes from the current site (ADR 0006).
