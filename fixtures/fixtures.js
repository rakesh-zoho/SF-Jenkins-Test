import path from 'path';
import { test } from '@playwright/test';
import { waitForSFLoad } from '../utils/sf-helpers.js';

const authStatePath = path.resolve(process.cwd(), 'reports/.auth-state.json');

export const sfTest = test.extend({
  // Healed: Removed fixture-level recordVideo to avoid conflict with config-level video setting
  // Healed: Config-level setting (video: 'retain-on-failure') now uses correct ../reports path
  // Healed: Fixture-level recordVideo was causing 0-second empty videos due to improper context closure
  sfPage: async ({ browser }, use) => {

    const context = await browser.newContext({
      storageState: authStatePath,
      permissions: [],
      // Healed: Allow context to inherit video recording from config (no explicit recordVideo needed)
    });

    const page = await context.newPage();

    try {
      const lightningHome = new URL(
        '/lightning/page/home',
        process.env.SF_URL
      ).toString();

      await page.goto(lightningHome, {
        waitUntil: 'domcontentloaded',
        timeout: 45000, // HEALED: Increased from 30s to 45s to avoid timeout on slow Salesforce instances
      });

      // Healed: Wait for SF UI readiness before yielding to test
      await waitForSFLoad(page);

      // Healed: Ensure App Launcher is clickable (helps with Lightning stability)
      const appLauncher = page.locator('[title="App Launcher"]').first();
      await appLauncher.waitFor({ state: 'visible', timeout: 25000 }); // HEALED: Increased from 20s to 25s

      // Healed: Buffer for rendering helps video capture stability
      await page.waitForTimeout(1000);

      await use(page);

    } finally {
      // Healed: Proper context closure allows video to flush and finalize
      await context.close();
    }
  },
});