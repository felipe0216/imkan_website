import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

// Screenshot baselines (D-032). Off until the Phase 7.5 fixes are approved (Q6): run with VISUAL=1, and
// `VISUAL=1 npx playwright test visual --update-snapshots` to record approved baselines. Baselines are per engine
// and per operating system, so CI (Linux) keeps its own set.
test.skip(!process.env.VISUAL, 'set VISUAL=1 to compare screenshots');
test.use({ reducedMotion: 'reduce' });

for (const path of PAGES) {
  test(`${path} looks as approved`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(40); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
}
