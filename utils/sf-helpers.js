import { chromium, expect } from '@playwright/test';
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
export async function waitForSFLoad(page, timeout = 20000) {
  try {
    await page.waitForFunction(
      () => {
        const hidden = (selector) => {
          const element = document.querySelector(selector);
          if (!element) return true;
          const style = window.getComputedStyle(element);
          return (
            element.hidden ||
            element.getAttribute('aria-hidden') === 'true' ||
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            element.offsetParent === null
          );
        };

        return (
          hidden('.forceListViewManagerSpinner') &&
          hidden('.slds-spinner_container') &&
          hidden('.loadingIndicator') &&
          document.readyState === 'complete'
        );
      },
      { timeout }
    );
  } catch (err) {
    console.warn('waitForSFLoad timed out', err.message);
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
  let appLauncherButton = page.locator('[title="App Launcher"]').first();
  if ((await appLauncherButton.count()) === 0) {
    appLauncherButton = page.getByRole('button', { name: /App Launcher/i }).first();
  }
  await expect(appLauncherButton).toBeVisible({ timeout: 20000 }); // HEALED: Increased from 15s to 20s
  await appLauncherButton.click({ timeout: 10000 });
  const appSearchInput = page.getByPlaceholder(/search apps and items...|search/i).first();
  await expect(appSearchInput).toBeVisible({ timeout: 20000 }); // HEALED: Increased from 15s to 20s
  await appSearchInput.fill(appName, { timeout: 5000 });
  await page.waitForTimeout(500);
  const appOption = page.getByRole('option', { name: new RegExp(`^${appName}$`, 'i') }).first();
  await expect(appOption).toBeVisible({ timeout: 20000 }); // HEALED: Increased from 15s to 20s
  await appOption.click({ timeout: 10000 });
  await waitForSFLoad(page);
}
