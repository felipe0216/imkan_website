import { test, expect, type Page, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Every framed demo (D-033): it shows its cue, it does what it says when pressed, "Reset demo" puts it back
// where that applies, and axe finds nothing once it has been played. The anomalies demo has its own file.

const open = async (page: Page, path: string, frame: string) => {
  await page.goto(path);
  const f = page.locator(frame);
  await f.scrollIntoViewIfNeeded();
  await expect(f.locator('.play-cue__btn')).toBeVisible({ timeout: 20000 });
  return f;
};
const axe = async (page: Page, frame: string) => {
  const r = await new AxeBuilder({ page }).include(frame).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
};
const resets = async (f: Locator) => {
  await expect(f.locator('.play-cue__btn')).toContainText('Reset');
  await f.locator('.play-cue__btn').click();
  await expect(f.locator('.play-cue__btn')).toContainText('Try it');
};

test.describe('framed demos', () => {
  test('roadmap: a step ticks, the count follows, reset puts it back', async ({ page }) => {
    const frame = '#services [data-play="checklist"]';
    const f = await open(page, '/', frame);
    const box = f.locator('.ui-check:nth-child(4) [role="checkbox"]');
    await f.locator('.ui-check:nth-child(4)').click();
    await expect(box).toHaveAttribute('aria-checked', 'true');
    await expect(f.locator('[data-checks-count]')).toHaveText('3 of 4');
    await axe(page, frame);
    await resets(f);
    await expect(f.locator('[data-checks-count]')).toHaveText('2 of 4');
  });

  test('proof plan and the open application tick from the keyboard', async ({ page }) => {
    for (const [path, frame] of [['/', '#why-us [data-play="checklist"]'], ['/careers/', '.hero__window[data-play="checklist"]']]) {
      const f = await open(page, path, frame);
      const box = f.locator('[role="checkbox"][aria-checked="false"]').first();
      await box.focus();
      await page.keyboard.press('Space');
      await expect(f.locator('[role="checkbox"][aria-checked="true"]')).not.toHaveCount(0);
      await axe(page, frame);
    }
  });

  test('sources: dropping a source lowers the count; it joins back', async ({ page }) => {
    const frame = '#services [data-play="files"]';
    const f = await open(page, '/', frame);
    await f.locator('.ui-file').first().click();
    await expect(f.locator('[data-files-status]')).toHaveText('5 sources joined');
    await expect(f.locator('.ui-file').first()).toHaveAttribute('aria-selected', 'false');
    await f.locator('.ui-file').first().click();
    await expect(f.locator('[data-files-status]')).toHaveText('6 sources joined', { timeout: 4000 });
    await axe(page, frame);
  });

  test('sales review: a switch flips and "n of 4 on" follows', async ({ page }) => {
    const frame = '#services [data-play="toggles"]';
    const f = await open(page, '/', frame);
    await f.locator('.ui-tg:nth-child(4)').click();
    await expect(f.locator('.ui-tg:nth-child(4) [role="switch"]')).toHaveAttribute('aria-checked', 'true');
    await expect(f.locator('[data-tg-count]')).toHaveText('4 of 4 on');
    await axe(page, frame);
    await resets(f);
  });

  test('stack: Connected disconnects, Connect connects again', async ({ page }) => {
    const frame = '#methodology [data-play="integrations"]';
    const f = await open(page, '/', frame);
    const row = f.locator('.ui-app').first();
    await row.locator('.ui-app__on').click();
    await expect(row).not.toHaveClass(/is-on/);
    await row.locator('.ui-app__connect').click();
    await expect(row).toHaveClass(/is-on/, { timeout: 4000 });
    await axe(page, frame);
  });

  test('notes: a handled note leaves; all handled, they come back', async ({ page }) => {
    const frame = '#services [data-play="notify"]';
    const f = await open(page, '/', frame);
    for (let n = 3; n > 0; n--) {
      await expect(f.locator('.ui-note')).toHaveCount(n);
      await f.locator('.ui-note').first().click();
      await expect(f.locator('.ui-note')).toHaveCount(n - 1);
    }
    await expect(f.locator('.ui-note')).toHaveCount(3, { timeout: 5000 });
    await axe(page, frame);
  });

  test('search: typing filters the rows', async ({ page }) => {
    const frame = '#methodology [data-play="search"]';
    const f = await open(page, '/', frame);
    await f.locator('.play-search__input').fill('stock');
    await expect(f.locator('.ui-search__row:not(.is-stale)')).toHaveCount(1);
    await expect(f.locator('.ui-search__row.is-sel')).toContainText('Stock reorder');
    await axe(page, frame);
    await resets(f);
    await expect(f.locator('.play-search__input')).toHaveValue('decisions to improve');
  });

  test('checks: pressing the command runs them again', async ({ page }) => {
    const frame = '#methodology [data-play="terminal"]';
    const f = await open(page, '/', frame);
    await f.locator('.ui-term__cmd[role="button"]').click();
    await expect(f.locator('[data-ui="terminal-run"]')).not.toHaveClass(/is-ui-held/, { timeout: 2000 });
    await axe(page, frame);
  });

  test('voice: tapping the orb replays the line', async ({ page }) => {
    const frame = '#why-us [data-play="voice"]';
    const f = await open(page, '/', frame);
    await f.locator('[data-voice-orb]').click();
    await expect(f.locator('[data-ui="voice"]')).toHaveClass(/is-talking/, { timeout: 2000 });
    await axe(page, frame);
  });

  test('chat: a suggested question gets its answer and its sources', async ({ page }) => {
    const frame = '.hero__window[data-play="chat"]';
    const f = await open(page, '/', frame);
    await f.locator('.play-chat__q').nth(1).click();
    await expect(f.locator('[data-chat-q]')).toHaveText('Can you go to 10% off?');
    await expect(f.locator('.ui-chat__src:visible')).toHaveText(['Pricing engine'], { timeout: 6000 });
    await expect(f.locator('.ui-chat__answer')).toContainText('outside your approved pricing');
    await axe(page, frame);
    await resets(f);
    await expect(f.locator('[data-chat-q]')).toContainText('500 units');
  });

  test('careers: a role in the mock-up opens it in Past roles', async ({ page }) => {
    const frame = '[data-play="roles"]';
    const f = await open(page, '/careers/', frame);
    const title = (await f.locator('.ui-note__title').nth(1).evaluate((el) => el.firstChild!.textContent!.trim()));
    await f.locator('.ui-note').nth(1).click();
    await expect(page.locator('details.role[open] .role__title')).toHaveText(title);
    await axe(page, frame);
  });
});
