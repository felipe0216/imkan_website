import { defineConfig } from '@playwright/test';

// BASE_URL points the tests at a deployed preview (CI). Without it they run
// against the local Vite dev server, using the Chrome installed on this machine.
const baseURL = process.env.BASE_URL || 'http://localhost:5173';
const local = !process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : [['list']],
  use: {
    baseURL,
    channel: local && !process.env.CI ? 'chrome' : undefined,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'phone', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: local
    ? { command: 'npm run dev', url: baseURL, reuseExistingServer: true, timeout: 60_000 }
    : undefined,
});
