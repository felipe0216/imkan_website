import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

// Keyboard and reduced-motion checks (Phase 6.3, D-029), on top of the axe scan in smoke.spec.ts.

test.describe('keyboard', () => {
  test('the skip link is the first stop and moves focus to the content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const first = page.locator(':focus');
    await expect(first).toHaveClass(/skip-link/);
    await expect(first).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#top$/);
  });

  for (const path of ['/', '/careers/', '/work/banking-fraud-detection-in-real-time/']) {
    test(`${path}: every focus stop shows a focus ring`, async ({ page }) => {
      await page.goto(path);
      const misses: string[] = [];
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none');
          return { ring, name: `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"` };
        });
        if (!info) break;
        if (!info.ring) misses.push(info.name);
      }
      expect(misses).toEqual([]);
    });
  }

  test('careers: a past role opens and closes from the keyboard', async ({ page }) => {
    await page.goto('/careers/');
    const role = page.locator('details.role').first();
    await role.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(role).toHaveAttribute('open', '');
    await page.keyboard.press('Enter');
    await expect(role).not.toHaveAttribute('open', '');
  });

  test('careers: the application form is reachable and its CV field is required', async ({ page }) => {
    await page.goto('/careers/#apply');
    const cv = page.locator('#a-cv');
    await cv.focus();
    await expect(cv).toBeFocused();
    await expect(cv).toHaveAttribute('required', '');
    await page.locator('#apply button[type="submit"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#apply [data-form-status]')).toHaveText(/1 field to fix/);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  for (const path of PAGES) {
    test(`${path}: nothing keeps moving`, async ({ page }) => {
      await page.goto(path);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= height; y += 700) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(80); }
      await page.waitForTimeout(1200);
      const running = await page.evaluate(() => document.getAnimations()
        .filter((a) => a.playState === 'running' && (a.effect as KeyframeEffect | null)?.getTiming().iterations === Infinity)
        .map((a) => ((a.effect as KeyframeEffect).target as Element | null)?.className?.toString().slice(0, 40) || 'unknown'));
      expect(running).toEqual([]);
    });
  }
});
