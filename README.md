# imkan.ai Website

Single-page marketing site for **imkan.ai**, built with **React 19 + TypeScript** and **Vite**.
Tailwind CSS is loaded via CDN and configured inline in `index.html`. The contact form is
backed by a Python **Azure Function** in `api/`, and the site is deployed as an **Azure Static Web App**.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs at http://localhost:3000.

## Build

```bash
npm run build      # outputs the production bundle to dist/
npm run preview    # preview the production build locally
```

## Project Structure

- `App.tsx` / `index.tsx` — app entry and root composition.
- `components/` — all UI sections (Navbar, Hero, Services, Methodology, WhyUs, CaseStudies, Team, Footer, ContactFormModal).
- `api/` — Python Azure Function (`/api/contact`) that stores contact submissions in Azure Table Storage.
- `public/images/` — static image assets.
- `Documentation/` — setup and deployment guides.
