import { chromium } from '@playwright/test';
import fs from 'fs/promises';
import 'dotenv/config';

/**
 * GLOBAL SETUP
 * Runs once before all tests. Logs into Salesforce and saves
 * auth state to reports/.auth-state.json for test reuse.
 */
export default async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('\n🔐 SF Global Setup: Logging into Salesforce...');

  try {
    await page.goto(`${process.env.SF_URL}/lightning/page/home`, {
      waitUntil: 'domcontentloaded',
    });

    await page.fill('#username', process.env.SF_USERNAME);
    await page.fill('#password', process.env.SF_PASSWORD);
    await page.click('#Login');

    // Wait for Lightning shell to fully load
    await page.waitForSelector(
      '[data-id="AppNavigation"], .navContainer, one-app-nav-bar',
      { timeout: 45000 }
    );

    // Ensure reports directory exists
    await fs.mkdir('./reports', { recursive: true });

    // Save auth — all tests reuse this session
    await page.context().storageState({ path: './reports/.auth-state.json' });
    console.log('✅ Auth state saved to reports/.auth-state.json\n');

  } catch (err) {
    console.error('❌ SF Login failed:', err.message);
    await page.screenshot({ path: './reports/login-failure.png' });
    throw err;
  } finally {
    await browser.close();
  }
}

/**
 * Wait for Salesforce Lightning page to settle.
 * Waits for spinners to disappear — use after every navigation or click.
 */
export async function waitForSFLoad(page, timeout = 15000) {
  try {
    await page.waitForFunction(
      () =>
        !document.querySelector('.forceListViewManagerSpinner') &&
        !document.querySelector('.slds-spinner_container:not([style*="display: none"])') &&
        !document.querySelector('.loadingIndicator'),
      { timeout }
    );
  } catch {
    // Non-fatal — spinner may already be gone
  }
}

/**
 * Switch the list view to "All [ObjectName]" records.
 * SF defaults to "Recently Viewed" — this ensures all records are visible.
 */
export async function switchToAllRecords(page, objectName) {
  try {
    await page
      .getByRole('button', { name: /Select a List View/i })
      .click({ timeout: 5000 });
    await page.getByRole('option', { name: `All ${objectName}` }).click();
    await waitForSFLoad(page);
  } catch {
    // Already on the correct list view
  }
}

/**
 * Navigate to a Salesforce app via App Launcher.
 */
export async function navigateToApp(page, appName) {
  await page.locator('[title="App Launcher"]').click();
  await page.fill('[placeholder="Search apps and items..."]', appName);
  await page.waitForTimeout(500);
  await page.click(`text="${appName}"`);
  await waitForSFLoad(page);
}
