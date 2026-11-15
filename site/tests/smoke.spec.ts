import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './pages';

for (const path of PAGES) {
  test.describe(`page ${path}`, () => {
    test('loads with no console errors or failed requests', async ({ page }) => {
      const problems: string[] = [];
      page.on('console', (msg) => { if (msg.type() === 'error') problems.push(`console: ${msg.text()}`); });
      page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
      page.on('response', (res) => { if (res.status() >= 400) problems.push(`${res.status()} ${res.url()}`); });

      const response = await page.goto(path, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      expect(problems).toEqual([]);
    });

    test('has the basics: lang, title, one h1, noindex during the redesign', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      expect((await page.title()).trim().length).toBeGreaterThan(0);
      await expect(page.locator('h1')).toHaveCount(1);
      // Remove this check at cut-over, when the new site goes live (ADR 0004).
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    });

    test('has no serious or critical accessibility violations', async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });
  });
}
