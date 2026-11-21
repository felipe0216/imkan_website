import { test, expect, type Page, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Every framed demo (D-033): it shows its cue, it does what it says when pressed, the cue leaves once it is played
// (no "Reset demo", 2026-11-21), and axe finds nothing once it has been played. The anomalies demo has its own file.

const open = async (page: Page, path: string, frame: string) => {
  await page.goto(path);
  const f = page.locator(frame);
  await f.scrollIntoViewIfNeeded();
  await expect(f.locator('.play-cue__btn')).toBeVisible({ timeout: 20000 });
  return f;
};
// Firefox (Playwright 1.65): an expect() polling while a demo animates crashes the next analyze(); waiting with
// locator.waitFor() never does (bisected 2026-11-21, Documentation/qa/visual-qa.md). The site is not involved.
const axe = async (page: Page, frame: string) => {
  await page.locator(frame).waitFor();
  const r = await new AxeBuilder({ page }).include(frame).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
};
const cueLeaves = async (f: Locator) => {
  await expect(f.locator('.play-cue')).toHaveClass(/is-gone/);
};

test.describe('framed demos', () => {
  test('the open application ticks from the keyboard', async ({ page }) => {
    for (const [path, frame] of [['/careers/', '.hero__window[data-play="checklist"]']]) {
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
    await cueLeaves(f);
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
    await expect(f.locator('.ui-note')).toHaveCount(3, { timeout: 12000 });   // they come back one every 3 s
    await axe(page, frame);
  });

  // the self-playing demos (round 2, 2026-11-21) play by themselves at rest; their tests run with reduced motion, where
  // nothing plays by itself and every change is immediate, so what the test presses is the only thing that moves
  const still = async (page: Page) => { await page.emulateMedia({ reducedMotion: 'reduce' }); };

  test('ask why: each press goes a layer down, to the decision to improve', async ({ page }) => {
    await still(page);
    const frame = '#methodology [data-play="why"]';
    const f = await open(page, '/', frame);
    const btn = f.locator('.play-why__btn');
    await expect(f.locator('[data-why-count]')).toHaveText('1 of 4');
    for (let n = 0; n < 3; n++) await btn.click();
    await expect(f.locator('[data-why-count]')).toHaveText('4 of 4');
    await expect(f.locator('.play-why__card[data-pos="now"]')).toContainText('Weekly pricing decisions');
    await expect(btn).toHaveText('Ask again');
    await axe(page, frame);
    await cueLeaves(f);
    await btn.click();
    await expect(f.locator('[data-why-count]')).toHaveText('1 of 4');
  });

  test('ask why: at rest it plays by itself', async ({ page }) => {
    const f = await open(page, '/', '#methodology [data-play="why"]');
    await f.scrollIntoViewIfNeeded();
    await expect(f.locator('[data-why-count]')).not.toHaveText('1 of 4', { timeout: 8000 });
  });

  test('partner or vendor: the switch changes the future after go-live', async ({ page }) => {
    await still(page);
    const frame = '#methodology [data-play="partner"]';
    const f = await open(page, '/', frame);
    await expect(f.locator('.play-pv__say')).toHaveText(/keeps growing/);
    await f.locator('.play-pv__switch [data-who="vendor"]').click();
    await expect(f.locator('.play-pv__switch [data-who="vendor"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(f.locator('.play-pv__say')).toHaveText(/fades/);
    await expect(f.locator('.play-pv__events li.is-on')).toHaveCount(3);
    await axe(page, frame);
    await cueLeaves(f);
  });

  test('roadmap: the pile becomes a chart with a first move; arrow keys argue with it', async ({ page }) => {
    await still(page);
    const frame = '#services [data-play="roadmap"]';
    const f = await open(page, '/', frame);
    await f.locator('.play-rm__go').click();
    await expect(f.locator('.play-rm')).toHaveClass(/is-plotted/);
    await expect(f.locator('.play-rm__out b')).toHaveText('Weekly pricing decisions');
    await expect(f.locator('.play-rm__chip.is-pick')).toHaveCount(3);
    // "Alert when sales miss target", moved up and left: it becomes the first move
    await f.locator('.play-rm__chip[data-k="2"]').focus();
    for (const key of ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft']) await page.keyboard.press(key);
    await expect(f.locator('.play-rm__out b')).toHaveText('Alert when sales miss target');
    await axe(page, frame);
    await cueLeaves(f);
    await f.locator('.play-rm__go').click();
    await expect(f.locator('.play-rm')).not.toHaveClass(/is-plotted/);
  });

  test('roadmap: a dot dragged to the top-left becomes the first move', async ({ page }) => {
    await still(page);
    const f = await open(page, '/', '#services [data-play="roadmap"]');
    await f.locator('.play-rm__go').click();
    const dot = f.locator('.play-rm__chip[data-k="1"]');
    const a = (await dot.boundingBox())!, b = (await f.locator('.play-rm__board').boundingBox())!;
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width * 0.12, b.y + b.height * 0.1, { steps: 12 });
    await page.mouse.up();
    await expect(f.locator('.play-rm__out b')).toHaveText('Stock reorder decisions');
  });

  test('proof of value: the weeks tick the commitments off; the cost stays 0', async ({ page }) => {
    await still(page);
    const frame = '#why-us [data-play="proof"]';
    const f = await open(page, '/', frame);
    const range = f.locator('.play-pf__slide input');
    await range.focus();
    await page.keyboard.press('Home');
    await expect(f.locator('[data-pf-week]')).toHaveText('Week 1 of 8');
    await expect(f.locator('.play-pf__list li.is-done')).toHaveCount(1);
    await page.keyboard.press('End');
    await expect(f.locator('[data-pf-week]')).toHaveText('Week 8 of 8');
    await expect(f.locator('.play-pf__list li.is-done')).toHaveCount(4);
    await expect(f.locator('.play-pf__cost b')).toHaveText('0');
    await axe(page, frame);
    await cueLeaves(f);
  });

  test('voice: play starts the call, the switch replays it in Arabic', async ({ page }) => {
    const frame = '#why-us [data-play="voice"]';
    const f = await open(page, '/', frame);
    await f.locator('.play-voice__play').click();
    await expect(f.locator('.play-voice__play')).toHaveAttribute('aria-label', 'Stop the call');
    await expect(f.locator('[data-ui="voice"]')).toHaveClass(/is-talking/);
    await f.locator('[data-lang="ar"]').click();
    await expect(f.locator('.play-voice__line').first()).toHaveAttribute('lang', 'ar');
    await f.locator('.play-voice__play').click();
    await expect(f.locator('.play-voice__play')).toHaveAttribute('aria-label', 'Play the call');
    await axe(page, frame);
    await cueLeaves(f);
  });

  // the chat has no cue pill: its control is in its own header ("Try chatting", then "Clear chat")
  const openChat = async (page: Page) => {
    await page.goto('/');
    const f = page.locator('.hero__window[data-play="chat"]');
    await expect(f.locator('.play-chat__ctl')).toHaveText('Try chatting', { timeout: 20000 });
    return f;
  };

  test('chat: a suggestion types itself, is sent, and gets its answer and sources; "Clear chat" empties it', async ({ page }) => {
    const frame = '.hero__window[data-play="chat"]';
    const f = await openChat(page);
    await f.locator('.play-chat__q').nth(1).click();
    // waitFor, then axe, then the assertions (Firefox and expect() during an animation: see the axe helper)
    await f.locator('.ui-msg--bot').nth(1).locator('.ui-chat__src').first().waitFor({ timeout: 10000 });
    await axe(page, frame);
    await expect(f.locator('.ui-msg--me').last()).toHaveText('Can you go to 10% off?');
    const last = f.locator('.ui-msg--bot').last();
    await expect(last.locator('.ui-chat__answer')).toContainText('outside your approved pricing');
    await expect(last.locator('.ui-chat__src')).toHaveText(['Pricing engine']);
    await expect(f.locator('.play-chat__ctl')).toHaveText('Clear chat');
    await f.locator('.play-chat__ctl').click();
    await expect(f.locator('.ui-msg')).toHaveCount(0);
    await expect(f.locator('.play-chat__empty')).toBeVisible();
    await expect(f.locator('.play-chat__ctl')).toHaveText('Try chatting');
  });

  test('chat: "Try chatting" plays one of the suggestions by itself', async ({ page }) => {
    const f = await openChat(page);
    const qs = await f.locator('.play-chat__q').allTextContents();
    await f.locator('.play-chat__ctl').click();
    await f.locator('.ui-msg--bot').nth(1).locator('.ui-chat__answer').waitFor({ timeout: 10000 });
    expect(qs).toContain((await f.locator('.ui-msg--me').last().textContent())!.trim());
  });

  test('chat: a typed question is matched to its answer, others get the fallback', async ({ page }) => {
    const f = await openChat(page);
    await f.locator('.play-chat__input').fill('When can you deliver 1,000 units?');
    await page.keyboard.press('Enter');
    await expect(f.locator('.ui-msg--bot').last().locator('.ui-chat__answer')).toContainText('600 units', { timeout: 8000 });
    await expect(f.locator('.play-chat__input')).toHaveValue('');
    await f.locator('.play-chat__input').fill('What is the weather?');
    await f.locator('.play-chat__send').click();
    await expect(f.locator('.ui-msg--bot').last().locator('.ui-chat__answer')).toContainText('Try one of the suggestions', { timeout: 8000 });
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
