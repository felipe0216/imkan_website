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
  // a "Try it" pill fading out (240 ms) is half-transparent text for a moment: scan once it has gone
  await page.waitForTimeout(350);
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

  test('roadmap game: a wrong pick says why not, a trap is ruled out, the right order completes it', async ({ page }) => {
    await still(page);
    const frame = '#services [data-play="roadmap"]';
    const f = await open(page, '/', frame);
    await expect(f.locator('.play-game__ask')).toHaveText('What comes first?');
    await f.locator('[data-card="s2"]').click();                  // too early
    await expect(f.locator('.play-game__say')).toHaveClass(/is-no/);
    await expect(f.locator('.play-game__msg')).toContainText('Not yet');
    await f.locator('[data-card="t0"]').click();                  // a trap
    await expect(f.locator('[data-card="t0"]')).toBeDisabled();
    for (const id of ['s0', 's1', 's2']) {
      await f.locator(`[data-card="${id}"]`).click();
      await expect(f.locator('.play-game__say')).toHaveClass(/is-yes/);
    }
    await axe(page, frame);
    await cueLeaves(f);
    await f.locator('[data-card="s3"]').click();
    await expect(f.locator('.play-game__stop.is-done')).toHaveCount(4);
    await expect(f.locator('.play-game__done')).toContainText('You are AI ready');
    await expect(f.locator('.play-game')).toHaveClass(/is-ready/);
    await expect(f.locator('[data-game-tries]')).toContainText('6 picks');
    await f.locator('.play-game__again').click();
    await expect(f.locator('.play-game__stop.is-done')).toHaveCount(0);
    await expect(f.locator('.play-game__card:disabled')).toHaveCount(0);
  });

  test('hand it off: tasks go to the agent and the hours add up; judgement stays with the team', async ({ page }) => {
    await still(page);
    const frame = '#services [data-play="handoff"]';
    const f = await open(page, '/', frame);
    await expect(f.locator('.play-ho__hours')).toHaveText('0 h');
    await f.locator('.play-ho__task[data-i="0"] .play-ho__btn').click();
    await expect(f.locator('.play-ho__task[data-i="0"]')).toHaveClass(/is-agent/);
    await expect(f.locator('.play-ho__hours')).toHaveText('3 h');
    await expect(f.locator('.play-ho__say')).toContainText('Invoice fields extracted');
    await f.locator('.play-ho__task[data-i="3"] .play-ho__btn').click();
    await expect(f.locator('.play-ho__task[data-i="3"]')).toHaveClass(/is-kept/);
    await expect(f.locator('.play-ho__say')).toContainText('judgement');
    await expect(f.locator('.play-ho__hours')).toHaveText('3 h');
    for (const i of [1, 2, 4]) {
      await f.locator(`.play-ho__task[data-i="${i}"] .play-ho__btn`).click();
      await expect(f.locator(`.play-ho__task[data-i="${i}"]`)).toHaveClass(/is-agent/);
    }
    await expect(f.locator('.play-ho__hours')).toHaveText('11 h');
    await expect(f.locator('.play-ho__again')).toBeVisible();
    await axe(page, frame);
    await cueLeaves(f);
    await f.locator('.play-ho__again').click();
    await expect(f.locator('.play-ho__hours')).toHaveText('0 h');
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

  test('sales review: the switches never flip by themselves', async ({ page }) => {
    const f = await open(page, '/', '#services [data-play="toggles"]');
    const states = async () => f.locator('[role="switch"]').evaluateAll((els) => els.map((e) => e.getAttribute('aria-checked')).join());
    const before = await states();
    await f.hover();
    await page.waitForTimeout(4000);
    expect(await states()).toBe(before);
  });

  test('cards keep their height when their demo changes state', async ({ page }) => {
    await still(page);
    await page.goto('/');
    const h = (sel: string) => page.locator(sel).evaluate((el) => Math.round(el.getBoundingClientRect().height));
    const cases: [string, string[]][] = [
      ['#methodology [data-play="partner"]', ['.play-pv__switch [data-who="vendor"]', '.play-pv__switch [data-who="partner"]']],
      ['#services [data-play="roadmap"]', ['[data-card="s2"]', '[data-card="t0"]', '[data-card="s0"]']],
      ['#services [data-play="handoff"]', ['.play-ho__task[data-i="0"] .play-ho__btn', '.play-ho__task[data-i="3"] .play-ho__btn']],
      ['#why-us [data-play="voice"]', ['[data-lang="ar"]', '[data-lang="ar"]']],
    ];
    for (const [frame, presses] of cases) {
      const f = page.locator(frame);
      await f.scrollIntoViewIfNeeded();
      await expect(f.locator('.play-cue__btn')).toBeVisible({ timeout: 20000 });
      const before = await h(frame);
      for (const sel of presses) { await f.locator(sel).click(); await page.waitForTimeout(200); expect(await h(frame)).toBe(before); }
    }
    // the proof of value, from week 1 to week 8
    const pf = '#why-us [data-play="proof"]';
    await page.locator(pf).scrollIntoViewIfNeeded();
    const range = page.locator(`${pf} .play-pf__slide input`);
    await range.focus();
    await page.keyboard.press('Home');
    const before = await h(pf);
    await page.keyboard.press('End');
    expect(await h(pf)).toBe(before);
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
