import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: '../tests',
  // Healed: Changed outputDir back to './reports/test-results' - paths resolve relative to CWD (project root), not config file
  outputDir: './reports/test-results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: parseInt(process.env.TIMEOUT) || 80000,
  expect: { timeout: 15000 },
  
  // Healed: JIRA reporter
// reporter: [
//    ['list'],
//   ['html', { outputFolder: './reports/playwright-report', open: 'never' }],
//   ['allure-playwright', { outputFolder: './reports/allure-results' }],
//   ['junit', { outputFile: './reports/junit-results.xml' }]

// ],
// ... existing config code
reporter: [
  ['list'],
  ['html', { outputFolder: '../reports/playwright-report', open: 'never' }],   // Playwright reports
  ['../utils/jira-reporter.js'],  //Jira reporter
  ['../utils/teams-reporter.js'] // Teams reporter
],
// ... rest of config

 launchOptions: {
    args: [
      '--disable-gpu',
      '--use-gl=swiftshader',
      '--disable-dev-shm-usage',
    ],
  },

  use: {
    baseURL: process.env.BASE_URL || process.env.SF_URL,
    // HEALED: Removed storageState from global config - sfTest fixture handles auth state via context creation
    // Having both config.use.storageState and fixture context.storageState causes conflicts
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    screenshot: 'only-on-failure',
    // Healed: Changed video to 'on' to record all tests (important for Salesforce Lightning validation)
    video: 'on',
    trace: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    navigationTimeout: 30000,
    actionTimeout: 15000,
    permissions: [], // Block all browser permissions
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']  }, // channel: 'chrome'  Use Chrome channel for better compatibility with Salesforce
    },
  ],

  globalSetup: '../utils/sf-helpers.js',
});
