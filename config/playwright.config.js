import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: '../tests',
  outputDir: './reports/test-results', // relative to Jenkins workspace
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: parseInt(process.env.TIMEOUT) || 80000,
  expect: { timeout: 15000 },
  
// reporter: [
//    ['list'],
//   ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
//   ['allure-playwright', { outputFolder: 'reports/allure-results' }],
//   ['junit', { outputFile: 'reports/junit-results.xml' }]
// ],
  reporter: [
    
    ['list'],
    ['html', { outputFolder: '../reports/playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: '../reports/allure-results',
      suiteTitle: false,
    }],
    ['junit', { outputFile: '../reports/junit-results.xml' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || process.env.SF_URL,
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    screenshot: 'only-on-failure',
    video: 'on', // record all tests
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
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  globalSetup: '../utils/sf-helpers.js',
});
