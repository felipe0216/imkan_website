import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Interactive mock-ups (feature/interactive-demos). One block per demo: mouse, keyboard, and an axe scan of
// the demo after it has been played.

const status = (page: Page, i: number) => page.locator('#platform [data-row]').nth(i).locator('[data-st]');

test.describe('anomalies demo (#platform)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#platform').scrollIntoViewIfNeeded();
    await expect(page.locator('#platform [role="listbox"] [role="option"]')).toHaveCount(9, { timeout: 20000 });
  });

  test('picking a new alert runs it to "Needs you"', async ({ page }) => {
    const mine = page.locator('#platform .ui-win__nav em').nth(1);
    const before = Number(await mine.textContent());
    await page.locator('#platform [data-row]').nth(2).click();      // Mobile app, New
    await expect(status(page, 2)).toHaveText(/Reviewing|Needs you/);
    await expect(page.locator('#platform .ui-pipe__run')).toHaveText('Mobile app');
    await expect(status(page, 2)).toHaveText('Needs you', { timeout: 9000 });
    await expect(page.locator('#platform [data-pipe-chip]')).toHaveText('Alerted');
    await expect(mine).toHaveText(String(before + 1));
    // the kit's loop is stopped for good: nothing changes the picture after the run
    await page.waitForTimeout(1500);
    await expect(status(page, 2)).toHaveText('Needs you');
    // opening the alert clears it
    await page.locator('#platform [data-pipe-btn]').click();
    await expect(status(page, 2)).toHaveText('Cleared');
    await expect(mine).toHaveText(String(before));
  });

  test('Hold pauses and resumes a run', async ({ page }) => {
    await page.locator('#platform [data-row]').nth(2).click();
    const hold = page.locator('#platform [data-pipe-btn]');
    // dispatched, not clicked: under parallel load Playwright's pre-click checks can outlast the run itself
    await hold.dispatchEvent('click');
    await expect(hold).toHaveAttribute('aria-pressed', 'true');
    const at = await page.locator('#platform .ui-pipe__step.is-run').getAttribute('data-step');
    await page.waitForTimeout(1200);
    await expect(page.locator('#platform .ui-pipe__step.is-run')).toHaveAttribute('data-step', at!);
    await hold.click();
    // resumed: the run goes on to the end (it may already be there, so the button's state is not checked)
    await expect(status(page, 2)).toHaveText('Needs you', { timeout: 9000 });
    await expect(hold).not.toHaveClass(/is-pressed/);
  });

  test('the queue works from the keyboard', async ({ page }) => {
    const first = page.locator('#platform [data-row]').first();
    await first.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#platform [data-row]').nth(2)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#platform [data-row]').nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(status(page, 2)).toHaveText(/Reviewing|Needs you/);
  });

  test('the side menu filters the queue', async ({ page }) => {
    const navs = page.locator('#platform .ui-win__nav');
    test.skip(!(await navs.first().isVisible()), 'the side menu shows from 1024px (home.css)');
    await navs.nth(2).click();                                        // Cleared
    await expect(navs.nth(2)).toHaveAttribute('aria-pressed', 'true');
    const rows = page.locator('#platform [data-row]');
    const n = await rows.count();
    for (let i = 0; i < n; i++) {
      const cleared = (await rows.nth(i).locator('[data-st]').textContent())?.trim() === 'Cleared';
      await expect(rows.nth(i)).toHaveClass(cleared ? /^(?!.*is-dim)/ : /is-dim/);
    }
    await navs.nth(2).click();                                        // again: back to the whole queue
    await expect(page.locator('#platform [data-row].is-dim')).toHaveCount(0);
    await expect(navs.nth(0)).toHaveAttribute('aria-pressed', 'true');
  });

  test('no axe violations once played', async ({ page }) => {
    await page.locator('#platform [data-row]').nth(2).click();
    await expect(status(page, 2)).toHaveText('Needs you', { timeout: 9000 });
    const r = await new AxeBuilder({ page }).include('#platform').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
  test('the cue invites, points at a new alert, then resets the demo', async ({ page }) => {
    const pill = page.locator('#platform .play-cue__btn');
    await expect(pill).toBeVisible();
    await expect(pill).toContainText('Try it');
    await pill.click();
    await expect(page.locator('#platform [data-row]').nth(2)).toBeFocused();   // Mobile app, the first new alert
    await expect(pill).toContainText('Try it');                                  // pointing is not playing
    await page.keyboard.press('Enter');
    await expect(pill).toContainText('Reset');
    await expect(status(page, 2)).toHaveText('Needs you', { timeout: 9000 });
    await pill.click();
    await expect(pill).toContainText('Try it');
    // back to the picture first taken over (the kit's finished picture): Mobile app is new again
    await expect(status(page, 2)).toHaveText('New');
    // Mine is back to 3, plus one once the carried-on run (Card switch) reaches "Needs you"
    await expect.poll(() => page.evaluate(() => {
      const mine = Number(document.querySelectorAll('#platform .ui-win__nav em')[1].textContent);
      const cs = document.querySelectorAll('#platform [data-row] [data-st]')[1].textContent!.trim();
      return mine - (cs === 'Needs you' ? 1 : 0);
    })).toBe(3);
  });

  test('phones show four alerts, then "Show all"', async ({ page }) => {
    const more = page.locator('#platform .play-more');
    test.skip(!(await more.isVisible()), 'the queue is folded under 640px only');
    await expect(page.locator('#platform [data-row]:visible')).toHaveCount(4);
    await expect(more).toHaveAttribute('aria-expanded', 'false');
    await more.click();
    await expect(page.locator('#platform [data-row]:visible')).toHaveCount(9);
    await expect(more).toHaveAttribute('aria-expanded', 'true');
  });
});
