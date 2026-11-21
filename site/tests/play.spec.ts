import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The fraud frame (#platform) as a triage demo (D-033, revised 2026-11-21): four open alerts; picking one runs the
// detection and ends on a verdict (risk, Escalate or Clear); a decision takes the alert out and starts the next;
// an empty queue shows a summary; "Reset demo" starts over.

const app = (page: Page) => page.locator('#platform .app');
const rows = (page: Page) => page.locator('#platform [data-row]:not(.play-history)');

test.describe('fraud triage demo (#platform)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#platform').scrollIntoViewIfNeeded();
    await expect(page.locator('#platform .play-cue__btn')).toBeVisible({ timeout: 20000 });
  });

  test('only the four open alerts show, with no side menu', async ({ page }) => {
    await expect(rows(page).filter({ visible: true })).toHaveCount(4);
    await expect(page.locator('#platform .ui-win__side')).toBeHidden();
    await expect(page.locator('#platform .play-cue__btn')).toContainText('triage');
  });

  test('an alert is investigated, then escalated; the next one starts by itself', async ({ page }) => {
    await rows(page).first().click();
    const verdict = page.locator('#platform .play-verdict');
    // waitFor, then axe, then the assertions: in Firefox an expect() polling during the run crashes the next axe
    // scan (Playwright 1.65; Documentation/qa/visual-qa.md). The order changes, not the checks.
    await verdict.waitFor({ state: 'visible', timeout: 10000 });
    const r = await new AxeBuilder({ page }).include('#platform .app').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    await expect(page.locator('#platform .play-tally')).toHaveText('4 left to review');
    await expect(verdict).toContainText('risk');
    await expect(page.locator('#platform .ui-pipe__line.is-on').last()).toContainText('usual pattern');
    await page.locator('#platform .play-act--escalate').click();
    await expect(page.locator('#platform .play-tally')).toHaveText('3 left to review');
    await expect(rows(page).first()).toBeHidden();
    await expect(rows(page).nth(1).locator('[data-st]')).toHaveText('Reviewing');
  });

  test('the whole queue from the keyboard, to the summary, then reset', async ({ page }) => {
    await rows(page).first().focus();
    await page.keyboard.press('Enter');
    for (let n = 0; n < 4; n++) {
      await expect(page.locator('#platform .play-verdict')).toBeVisible({ timeout: 10000 });
      await page.locator(`#platform .play-act${n % 2 ? '' : '--escalate'}`).last().focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#platform .play-tally')).toHaveText(new RegExp(`^${3 - n} left`));
    }
    await expect(page.locator('#platform .play-summary')).toHaveText(/2 escalated, 2 cleared/);
    await page.locator('#platform .play-cue__btn').click();
    await expect(page.locator('#platform .play-tally')).toHaveText('4 left to review');
    await expect(rows(page).filter({ visible: true })).toHaveCount(4);
    await expect(page.locator('#platform .play-summary')).toBeHidden();
  });

  test('"Try it" points at the first alert', async ({ page }) => {
    await page.locator('#platform .play-cue__btn').click();
    await expect(rows(page).first()).toBeFocused();
    await expect(rows(page).first()).toHaveClass(/is-pointed/);
  });
});
