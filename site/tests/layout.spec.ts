import { test, expect, type Page } from '@playwright/test';
import { PAGES } from './pages';

// Visual QA layout checks (Phase 7.5, D-031, D-032). Each page is loaded at every size below, in each engine's
// desktop project (the phone projects skip: the sizes already include phones). Issues are collected and compared
// with [], so one run lists every problem with its size.

// Widths from D-032, with the heights that hide layout bugs: short laptops and tall screens.
const SIZES: [number, number][] = [
  [2560, 1300], [1920, 960], [1536, 730], [1440, 900], [1366, 650], [1280, 720],
  [1024, 768], [820, 1180], [768, 1024], [430, 932], [390, 844], [390, 664], [360, 640],
];

// D-031 rhythm: a section's top and bottom padding by width. Tuned in Q3a; the test reads it from here.
// From 1280 up it is fluid, as in rhythm.css: clamp(96px, 7.19vw + 5.8px, 128px).
const RHYTHM = (w: number) => (w >= 1280 ? Math.min(128, Math.max(96, w * 0.0719 + 5.8)) : w >= 640 ? 96 : 72);
const SLACK = 2; // px: rounding between engines

// Mock-ups (illustrative product UI) and decorative art keep their own small type and are exempt from the type rules.
const MOCKUP = '[class*="ui-"], .app, .window, .fragment, [class*="frag"], figure, svg, [aria-hidden="true"]';

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(40); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

function audit(args: { rhythm: number; slack: number; mockup: string }) {
  const { rhythm, slack, mockup } = args;
  const issues: string[] = [];
  const vw = document.documentElement.clientWidth;
  const name = (el: Element) => {
    const c = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.') : '';
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${c ? '.' + c : ''}`;
  };
  // checkVisibility also hides what a closed <details>, a transparent or invisible ancestor hides
  const visible = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  };
  const ownText = (el: Element) => Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent || '').trim());
  const scrollY = window.scrollY;
  const bottom = (r: DOMRect) => r.bottom + scrollY;

  // the part of a box actually painted: cut by every clipping ancestor (a frame hides what runs outside it)
  const painted = (el: Element) => {
    const r = el.getBoundingClientRect(); let l = r.left, t = r.top, rt = r.right, b = r.bottom;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (/(hidden|clip)/.test(cs.overflowX + cs.overflowY)) { const ar = a.getBoundingClientRect(); l = Math.max(l, ar.left); t = Math.max(t, ar.top); rt = Math.min(rt, ar.right); b = Math.min(b, ar.bottom); }
    }
    return { left: l, top: t, right: rt, bottom: b };
  };

  // 1. No sideways scroll.
  const over = document.documentElement.scrollWidth - vw;
  if (over > 1) issues.push(`page scrolls sideways by ${over}px`);

  // 2. Sections: content inside the section, no void, padding on the rhythm, one edge for every .wrap.
  const header = document.querySelector('header .wrap, header > .wrap');
  const edge = header ? header.getBoundingClientRect() : null;
  for (const sec of Array.from(document.querySelectorAll<HTMLElement>('main > section, footer.closing'))) {
    if (!visible(sec)) continue;
    const id = name(sec); const sr = sec.getBoundingClientRect();
    // the hero and the full-screen scene (D-021, its own runway) keep a screen-based height by design
    const hero = sec.matches('.hero, .section--hero, :first-child, .sc[data-big-scene]');
    // end: the lowest box of any kind (for overlap); last: the lowest real content, text or media (for voids,
    // because a .wrap or a card stretched to the section's height is not content)
    let end = 0; let last = 0;
    for (const el of Array.from(sec.querySelectorAll('*'))) {
      // decorative copies (aria-hidden) are still painted, so they count here
      if (!visible(el)) continue;
      const cs = getComputedStyle(el); if (cs.position === 'fixed') continue;
      const b = painted(el).bottom + scrollY; // what a frame clips is not painted, so it cannot overlap anything
      end = Math.max(end, b);
      const framed = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none' || parseFloat(cs.borderBottomWidth) > 0;
      const fullBleed = el.matches('.layer') || el.getBoundingClientRect().height >= sr.height - 2; // a ground behind the section
      if (!fullBleed && (ownText(el) || framed || el.matches('img, svg, video, canvas, picture, input, textarea, select, button'))) last = Math.max(last, b);
    }
    const s = getComputedStyle(sec);
    const padB = parseFloat(s.paddingBottom); const padT = parseFloat(s.paddingTop);
    if (end > bottom(sr) + slack) issues.push(`${id}: content runs ${Math.round(end - bottom(sr))}px past the section's bottom (overlaps the next section)`);
    const room = bottom(sr) - last;
    if (!hero && room > padB + 64 + slack) issues.push(`${id}: ${Math.round(room - padB)}px of empty space under the content (section taller than its content)`);
    if (!hero && sec.matches('main > section')) {
      if (Math.abs(padT - rhythm) > slack || Math.abs(padB - rhythm) > slack) issues.push(`${id}: padding ${Math.round(padT)}/${Math.round(padB)}px, rhythm is ${rhythm}px (D-031)`);
    }
    const wrap = sec.querySelector(':scope > .wrap');
    if (edge && wrap) {
      const wr = wrap.getBoundingClientRect();
      if (Math.abs(wr.left - edge.left) > slack || Math.abs(wr.width - edge.width) > slack) issues.push(`${id}: .wrap at x ${Math.round(wr.left)} width ${Math.round(wr.width)}, header at x ${Math.round(edge.left)} width ${Math.round(edge.width)}`);
    }
  }

  // 3. Text: never clipped or spilling out of its box (an intended ellipsis is fine).
  for (const el of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
    if (!ownText(el) || !visible(el) || el.closest('[aria-hidden="true"]')) continue;
    const s = getComputedStyle(el);
    if (s.textOverflow === 'ellipsis' || s.display === 'inline' || el.clientWidth <= 1 || el.matches('.skip-link, .sr-only, .visually-hidden')) continue;
    if (el.scrollWidth > el.clientWidth + slack) issues.push(`${name(el)}: text ${el.scrollWidth}px in a ${el.clientWidth}px box "${(el.textContent || '').trim().slice(0, 24)}"`);
  }

  // 4. Frames: text inside a rounded, clipping frame is either fully inside it or not shown (D-031: mock-ups fully visible).
  for (const frame of Array.from(document.querySelectorAll<HTMLElement>('main *'))) {
    const s = getComputedStyle(frame);
    if (!/(hidden|clip)/.test(s.overflow + s.overflowX + s.overflowY) || parseFloat(s.borderTopLeftRadius) < 4 || !visible(frame)) continue;
    const fr = frame.getBoundingClientRect();
    const cut: string[] = [];
    for (const el of Array.from(frame.querySelectorAll('*'))) {
      if (!ownText(el) || !visible(el) || el.closest('[aria-hidden="true"]')) continue;
      const r = el.getBoundingClientRect();
      const outside = r.bottom <= fr.top || r.top >= fr.bottom || r.right <= fr.left || r.left >= fr.right;
      const inside = r.top >= fr.top - 1 && r.bottom <= fr.bottom + 1 && r.left >= fr.left - 1 && r.right <= fr.right + 1;
      if (!outside && !inside) cut.push(`"${(el.textContent || '').trim().slice(0, 20)}"`);
    }
    if (cut.length) issues.push(`${name(frame)} (${frame.closest('section')?.id || 'page'}): cuts through ${cut.length} text line(s), e.g. ${cut.slice(0, 2).join(', ')}`);
  }

  // 4b. Collisions: text over another text or over a solid box it is not part of (a card, a button, a picture).
  {
    const solid = (el: Element) => {
      const s = getComputedStyle(el);
      const bg = s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent';
      return bg || s.backgroundImage !== 'none' || el.matches('img, picture, video, canvas, button, input, textarea, select') || parseFloat(s.borderTopWidth) > 0;
    };
    const scope = Array.from(document.querySelectorAll<HTMLElement>('main *, footer *')).filter((el) => visible(el) && !el.closest('[aria-hidden="true"]'));
    const texts = scope.filter((el) => ownText(el) && getComputedStyle(el).display !== 'inline');
    const boxes = scope.filter((el) => solid(el) && !el.matches('main > section, footer, .wrap'));
    const hits = new Set<string>();
    for (const t of texts) {
      const a = painted(t);
      for (const o of [...texts, ...boxes]) {
        if (o === t || o.contains(t) || t.contains(o)) continue;
        if (texts.includes(o) && boxes.includes(o) === false && o.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) continue; // each text pair once
        const b = painted(o);
        const x = Math.min(a.right, b.right) - Math.max(a.left, b.left); const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (x > 4 && y > 4) hits.add(`${name(t)} "${(t.textContent || '').trim().slice(0, 20)}" overlaps ${name(o)}${ownText(o) ? ' "' + (o.textContent || '').trim().slice(0, 20) + '"' : ''}`);
      }
    }
    for (const h of Array.from(hits).slice(0, 15)) issues.push(`collision: ${h}`);
  }

  // 5. Type: reading text 16px or more, nothing under 13px, a title never smaller than the text after it.
  for (const el of Array.from(document.querySelectorAll<HTMLElement>('main p, main li, main dd, footer p'))) {
    if (!visible(el) || el.closest(mockup) || !ownText(el)) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    // labels, metadata, form help and status lines are small text by design (13 to 15px)
    const small = el.matches('.t-small, .t-label, .muted, small, [class*="meta"], [class*="help"], [class*="error"], [class*="status"]') || el.closest('label, .label, .meta, .mo-mq, [class*="chip"], [class*="tag"]'); // tags are labels too
    if (fs < 13) issues.push(`${name(el)}: ${fs}px text, the floor is 13px`);
    else if (!small && fs < 16 - 0.5) issues.push(`${name(el)}: reading text ${fs}px, should be 16px or more "${(el.textContent || '').trim().slice(0, 24)}"`);
  }
  for (const h of Array.from(document.querySelectorAll<HTMLElement>('main h3, main h4'))) {
    if (!visible(h) || h.closest(mockup)) continue;
    const next = h.nextElementSibling as HTMLElement | null;
    if (!next || !visible(next) || !/^(P|UL|OL|DL)$/.test(next.tagName)) continue;
    const a = parseFloat(getComputedStyle(h).fontSize); const b = parseFloat(getComputedStyle(next).fontSize);
    if (a + 0.5 < b) issues.push(`${name(h)}: title ${a}px is smaller than the ${b}px text under it "${(h.textContent || '').trim().slice(0, 24)}"`);
  }

  // 6. Tap targets (WCAG 2.5.8): 24px or more, or spaced so a 24px circle on it touches no other target; links
  //    inside a sentence are exempt.
  const targets = Array.from(document.querySelectorAll<HTMLElement>('a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"]'))
    .filter((el) => visible(el) && !el.closest(mockup) && !el.matches('.skip-link'))
    .filter((el) => !(el.matches('a') && getComputedStyle(el).display === 'inline' && el.closest('p, li') && (el.closest('p, li')!.textContent || '').trim().length > (el.textContent || '').trim().length + 8));
  const box = targets.map((el) => el.getBoundingClientRect());
  const isSmall = box.map((r) => r.width < 23.5 || r.height < 23.5);
  const centre = (r: DOMRect) => [r.left + r.width / 2, r.top + r.height / 2];
  targets.forEach((el, i) => {
    if (!isSmall[i]) return;
    const [cx, cy] = centre(box[i]);
    const crowded = box.some((o, j) => {
      if (j === i) return false;
      if (isSmall[j]) { const [ox, oy] = centre(o); return Math.hypot(cx - ox, cy - oy) < 24; }
      const dx = Math.max(o.left - cx, 0, cx - o.right); const dy = Math.max(o.top - cy, 0, cy - o.bottom);
      return Math.hypot(dx, dy) < 12;
    });
    if (crowded) issues.push(`${name(el)}: tap target ${Math.round(box[i].width)}×${Math.round(box[i].height)}px and too close to the next one (WCAG 2.5.8) "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 20)}"`);
  });

  return [...new Set(issues)];
}

test.describe('layout', () => {
  test.use({ reducedMotion: 'reduce' }); // the settled layout, without moments mid-animation
  test.beforeEach(() => {
    test.skip(test.info().project.name.endsWith('phone'), 'the size list covers phones');
    // Off by default until the Phase 7.5 fixes land (Q6 turns it on in CI): run with QA=1.
    test.skip(!process.env.QA, 'set QA=1 to run the layout checks');
  });

  for (const path of PAGES) {
    test.describe(path, () => {
      for (const [w, h] of SIZES) {
        test(`fits ${w}×${h}`, async ({ page }) => {
          test.setTimeout(90_000);
          await page.setViewportSize({ width: w, height: h });
          await page.goto(path, { waitUntil: 'networkidle' });
          await settle(page);
          const issues = await page.evaluate(audit, { rhythm: RHYTHM(w), slack: SLACK, mockup: MOCKUP });
          expect(issues).toEqual([]);
        });
      }
    });
  }
});
