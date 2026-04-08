import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  // ✅ Keep everything inside Jenkins workspace
  testDir: 'tests',
  outputDir: 'reports/test-results',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  timeout: parseInt(process.env.TIMEOUT) || 80000,
  expect: { timeout: 15000 },

  reporter: [
    ['list'],

    // ✅ Playwright HTML report (Jenkins will publish this)
    ['html', { 
      outputFolder: 'reports/playwright-report', 
      open: 'never' 
    }],

    // ✅ Allure results (used by Jenkins Allure plugin)
    ['allure-playwright', {
      detail: true,
      outputFolder: 'reports/allure-results',
      suiteTitle: false,
    }],

    // ✅ JUnit report (used by Jenkins test trends)
    ['junit', { 
      outputFile: 'reports/junit-results.xml' 
    }],
  ],

  use: {
    baseURL: process.env.BASE_URL || process.env.SF_URL,

    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    viewport: { width: 1920, height: 1080 },

    ignoreHTTPSErrors: true,
    navigationTimeout: 30000,
    actionTimeout: 15000,

    permissions: [],
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // ✅ Fixed path (no ../)
  globalSetup: 'utils/sf-helpers.js',
});
