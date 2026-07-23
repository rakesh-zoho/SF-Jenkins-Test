import { expect } from '@playwright/test';
import { navigateToApp, waitForSFLoad } from '../utils/sf-helpers.js';

/**
 * BasePage — Parent class for all Salesforce page objects
 * Provides common methods for navigation, waiting, and assertions
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToApp(appName) {
    // Navigates to Salesforce app via App Launcher
    // appName: 'Leads', 'Accounts', 'Cases', etc.
    await navigateToApp(this.page, appName);
  }

  async waitForSFLoad() {
    // Waits for Salesforce spinners/loaders to disappear
    await waitForSFLoad(this.page);
  }

  async expectUrl(pattern, options) {
    // Assert current page URL matches pattern
    await expect(this.page).toHaveURL(pattern, options);
  }
}
