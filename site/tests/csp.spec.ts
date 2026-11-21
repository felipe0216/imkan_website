import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PAGES } from './pages';

// Every page under the CSP that staticwebapp.config.json sends in production (D-029). `vite preview` sends no
// headers, so the test adds the policy to each document response and fails on any violation, including those
// that only happen once the page is scrolled (moments, the scene, lazy pictures).
const config = JSON.parse(readFileSync('staticwebapp.config.json', 'utf8'));
const CSP: string = config.globalHeaders['content-security-policy'];

for (const path of PAGES) {
  test(`page ${path} runs under the enforced CSP`, async ({ page }) => {
    expect(CSP, 'staticwebapp.config.json has an enforced content-security-policy').toBeTruthy();
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() !== 'document') return route.continue();
      const response = await route.fetch();
      await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': CSP } });
    });
    await page.addInitScript(() => {
      (window as any).__csp = [];
      document.addEventListener('securitypolicyviolation', (e) => (window as any).__csp.push(`${e.violatedDirective} ${e.blockedURI || 'inline'} ${e.sourceFile || ''}:${e.lineNumber || ''}`));
    });
    await page.goto(path);
    await page.waitForTimeout(800);
    // walk the page so every moment, the scene and every lazy picture mounts
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 600) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(600);
    expect(await page.evaluate(() => (window as any).__csp)).toEqual([]);
  });
}
