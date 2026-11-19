import { defineConfig, devices } from '@playwright/test';

// BASE_URL points the tests at a deployed preview (CI). Without it they run
// against the local Vite dev server.
const baseURL = process.env.BASE_URL || 'http://localhost:5173';
const local = !process.env.BASE_URL;

// Three engines (D-032): Chromium covers Chrome, Edge, Brave and Opera; Firefox is Gecko; WebKit is Safari's engine.
// On a workstation Chromium is the installed Chrome; CI installs Playwright's own builds of all three.
const chrome = process.env.CI ? {} : { channel: 'chrome' as const };
const desktop = { viewport: { width: 1440, height: 900 } };
const phone = { viewport: { width: 390, height: 844 }, hasTouch: true };

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : [['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  // Screenshot baselines (D-032): small anti-aliasing differences pass, layout shifts do not.
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: 'disabled' } },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], ...chrome, ...desktop } },
    { name: 'phone', use: { ...devices['Desktop Chrome'], ...chrome, ...phone, isMobile: true } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'], ...desktop } },
    // Firefox has no isMobile emulation in Playwright; width and touch are what the layout reads.
    { name: 'firefox-phone', use: { ...devices['Desktop Firefox'], ...phone } },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'], ...desktop } },
    { name: 'webkit-phone', use: { ...devices['iPhone 15'], ...phone, isMobile: true } },
  ],
  webServer: local
    // CI tests the built site (its build step runs first), which is faster and closer to production than the dev server
    ? { command: process.env.CI ? 'npx vite preview --port 5173 --strictPort' : 'npm run dev', url: baseURL, reuseExistingServer: !process.env.CI, timeout: 60_000 }
    : undefined,
});
