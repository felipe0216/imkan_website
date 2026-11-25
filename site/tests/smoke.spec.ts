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

    test('has the basics: lang, title, one h1; indexable, except the 404 page', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      expect((await page.title()).trim().length).toBeGreaterThan(0);
      await expect(page.locator('h1')).toHaveCount(1);
      // live since the cut-over (2026-11-24): search engines may index every page but the 404 page
      if (path.startsWith('/404')) await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      else await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      // link previews (LinkedIn, WhatsApp, Facebook) need the share image as a full address, with its size
      if (!path.startsWith('/404')) {
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://www.imkan.ai/share.jpg');
        await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
        await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
      }
    });

    test('has no serious or critical accessibility violations', async ({ page }) => {
      await page.goto(path);
      // measure the settled page, not the entrance fade: boot.js sets m-enter-done after 0.7 s, and under load
      // a fade can still be running then, so also wait for every finite animation to finish
      await page.waitForFunction(() => document.documentElement.classList.contains('m-enter-done') || !document.documentElement.classList.contains('m-enter'));
      await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running' || (a.effect as KeyframeEffect | null)?.getTiming().iterations === Infinity));
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });

    // D-035: the same scan in dark mode (the visitor's saved choice; light is the default)
    test.describe('dark mode', () => {
      test('has no serious or critical accessibility violations', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('imkan-theme', 'dark'));
        await page.goto(path);
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
        await page.waitForFunction(() => document.documentElement.classList.contains('m-enter-done') || !document.documentElement.classList.contains('m-enter'));
        await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running' || (a.effect as KeyframeEffect | null)?.getTiming().iterations === Infinity));
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
      });
    });
  });
}

// D-035: light by default (even on a dark device), the button names the mode it switches to, the choice is remembered
test('the mode button switches light and dark and remembers the choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const html = page.locator('html');
  const button = page.locator('[data-theme-toggle]');
  // on a phone the button lives in the menu
  const reveal = async () => { const menu = page.locator('.nav__toggle'); if (await menu.isVisible() && !(await button.isVisible())) await menu.click(); };
  await expect(html).toHaveAttribute('data-theme', 'light');
  await reveal();
  await expect(button).toHaveAccessibleName('Dark mode');
  await button.click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(button).toHaveAccessibleName('Light mode');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#1b111d');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await reveal();
  await page.locator('[data-theme-toggle]').click();
  await expect(html).toHaveAttribute('data-theme', 'light');
});
