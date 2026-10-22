// @ts-check
import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT || 4173);
const LOCAL_BASE_URL = `http://localhost:${PORT}/`;
const PROD_BASE_URL = process.env.PROD_BASE_URL || 'https://aurumnova.github.io/aurum-nova/';

// Gate de gobernanza: 6 viewports de 375 a 1440.
const localUse = {
  baseURL: LOCAL_BASE_URL,
  trace: 'on-first-retry',
  reducedMotion: 'reduce',
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: { ...localUse },

  webServer: {
    command: 'node scripts/serve.mjs',
    url: LOCAL_BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },

  projects: [
    {
      name: 'mobile-375',
      testIgnore: /smoke\.prod\.spec\.js/,
      use: { ...localUse, viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
    {
      name: 'mobile-390',
      testIgnore: /smoke\.prod\.spec\.js/,
      use: { ...localUse, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
    {
      name: 'mobile-414',
      testIgnore: /smoke\.prod\.spec\.js/,
      use: { ...localUse, viewport: { width: 414, height: 896 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
    {
      name: 'tablet-768',
      testIgnore: /smoke\.prod\.spec\.js/,
      use: { ...localUse, viewport: { width: 768, height: 1024 }, hasTouch: true },
    },
    {
      name: 'desktop-1024',
      testIgnore: /smoke\.prod\.spec\.js/,
      use: { ...localUse, viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'desktop-1440',
      testIgnore: /smoke\.prod\.spec\.js/,
      use: { ...localUse, viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'smoke-prod',
      testMatch: /smoke\.prod\.spec\.js/,
      use: { ...localUse, baseURL: PROD_BASE_URL, viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'smoke-prod-mobile',
      testMatch: /smoke\.prod\.spec\.js/,
      use: { ...localUse, baseURL: PROD_BASE_URL, viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
    },
  ],
});
