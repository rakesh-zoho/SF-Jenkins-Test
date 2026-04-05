import { test } from '@playwright/test';
import { waitForSFLoad } from '../utils/sf-helpers.js';

/**
 * FIXTURES — Salesforce Lightning
 * ─────────────────────────────────
 * Extended test fixture for pre-authenticated Salesforce Lightning page.
 * Separates fixture definition from test definitions to avoid import conflicts.
 */

/**
 * Extended test fixture: sfPage
 * Provides a pre-authenticated Salesforce Lightning page with blocked permissions.
 * Agents use this in all generated tests.
 */
export const sfTest = test.extend({
  sfPage: async ({ browser }, use) => {
    // Create context with NO permissions allowed (blocks notifications, camera, microphone, etc.)
    const context = await browser.newContext({
      storageState: './reports/.auth-state.json',
      permissions: [], // Block all permissions
    });

    const page = await context.newPage();
    await page.goto(process.env.SF_URL);
    await waitForSFLoad(page);

    await use(page);

    // Cleanup
    await context.close();
  },
});
