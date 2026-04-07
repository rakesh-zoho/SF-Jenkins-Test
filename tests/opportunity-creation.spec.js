import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { waitForSFLoad, switchToAllRecords } from '../utils/sf-helpers.js';
import { getDatePlusDays, uniqueName } from '../utils/locator-utils.js';
import { captureScreenshot, sfStep, setAllureMeta } from '../utils/reporter-utils.js';

async function navigateToOpportunities(page) {
  await page.getByTitle('App Launcher').click({ timeout: 10000 });
  await page.waitForTimeout(500);
  await page.getByPlaceholder(/search/i).fill('Opportunities', { timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByRole('option', { name: /^Opportunities$/i }).click({ timeout: 5000 });
  await waitForSFLoad(page);
}

// Reuse the saved Salesforce auth session
test.use({ storageState: './reports/.auth-state.json' });

test.describe('Opportunity Creation', () => {
  test.beforeEach(async ({ page }) => {
    // HEALED: Ensure Salesforce home page is loaded before attempting navigation locators
    await page.goto(process.env.BASE_URL || process.env.SF_URL);
    await waitForSFLoad(page);
  });

  test.beforeEach(async () => {
    await allure.epic('CRM');
    await allure.feature('Opportunity Management');
    await allure.story('Create New Opportunity');
    await allure.severity('critical');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await captureScreenshot(page, `failure-${testInfo.title.replace(/\s+/g, '-')}`);
    }
  });

  // Suite 1: Happy Path — Create Opportunity End-to-End
  test('TC1.1: Navigate to Opportunities List View', async ({ page }) => {
    await sfStep('Navigate to Opportunities List View', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      // HEALED: Disambiguated heading locator to avoid matching the 'Opportunities Recently Viewed' title.
      await expect(page.getByRole('heading', { name: 'Opportunities', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'New' })).toBeVisible();
      await captureScreenshot(page, 'opportunities-list-view');
    });
  });

  test('TC1.2: Open New Opportunity Modal', async ({ page }) => {
    await sfStep('Navigate to Opportunities', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
    });
    await sfStep('Open New Opportunity Modal', page, async () => {
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      // HEALED: Narrow the heading locator to the dialog title only using exact text.
      await expect(page.getByRole('heading', { name: 'New Opportunity', exact: true })).toBeVisible();
      await expect(page.getByLabel('Opportunity Name')).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Account Name', exact: true })).toBeVisible();
      await expect(page.getByLabel('Close Date')).toBeVisible();
      await expect(page.getByLabel('Stage')).toBeVisible();
      await expect(page.getByLabel('Amount')).toBeVisible();
      await captureScreenshot(page, 'new-opportunity-modal');
    });
  });

  test('TC1.3: Fill Opportunity Form — Valid Data', async ({ page }) => {
    const oppName = uniqueName('Agentic Test');
    const closeDate = getDatePlusDays(30);

    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Fill Opportunity Name', page, async () => {
      await page.getByLabel('Opportunity Name').fill(oppName);
      await expect(page.getByLabel('Opportunity Name')).toHaveValue(oppName);
    });

    await sfStep('Fill Account Name', page, async () => {
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await expect(page.getByRole('combobox', { name: 'Account Name', exact: true })).toHaveValue('Acme Corp');
    });

    await sfStep('Fill Close Date', page, async () => {
      await page.getByLabel('Close Date').fill(closeDate);
      await expect(page.getByLabel('Close Date')).toHaveValue(closeDate);
    });

    await sfStep('Select Stage', page, async () => {
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await expect(page.getByLabel('Stage')).toHaveValue('Needs Analysis');
    });

    await sfStep('Fill Amount', page, async () => {
      await page.getByLabel('Amount').fill('50000');
      await expect(page.getByLabel('Amount')).toHaveValue('50000');
    });

    await captureScreenshot(page, 'opportunity-form-all-fields-filled');
  });

  test('TC1.4: Save Opportunity & Verify Toast', async ({ page }) => {
    const oppName = uniqueName('Agentic Test');
    const closeDate = getDatePlusDays(30);

    await sfStep('Navigate, Open Modal, and Fill Form', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(closeDate);
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
    });

    await sfStep('Save Opportunity', page, async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('.toastMessage')).toContainText('was created');
      await expect(page.url()).toContain('/Opportunity/');
      await captureScreenshot(page, 'opportunity-saved-success-toast');
    });
  });

  test('TC1.5: Verify Opportunity Detail Page', async ({ page }) => {
    const oppName = uniqueName('Agentic Test');
    const closeDate = getDatePlusDays(30);

    await sfStep('Create Opportunity', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(closeDate);
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await waitForSFLoad(page);
    });

    await sfStep('Verify Opportunity Detail Page', page, async () => {
      await expect(page.getByRole('heading', { name: new RegExp(oppName) })).toBeVisible();
      await expect(page.getByText('Needs Analysis')).toBeVisible();
      await expect(page.getByText('Acme Corp')).toBeVisible();
      await expect(page.getByText('50,000')).toBeVisible();
      await expect(page.getByText(new RegExp(closeDate.replace(/\//g, '\\/')))).toBeVisible();
      await captureScreenshot(page, 'opportunity-detail-page-verification');
    });
  });

  test('TC1.6: Verify Record in List View', async ({ page }) => {
    const oppName = uniqueName('Agentic Test');
    const closeDate = getDatePlusDays(30);

    await sfStep('Create Opportunity', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(closeDate);
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await waitForSFLoad(page);
    });

    await sfStep('Verify Record in List View', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await switchToAllRecords(page, 'Opportunities');
      await expect(page.getByRole('link', { name: new RegExp(oppName) })).toBeVisible();
      await captureScreenshot(page, 'opportunities-list-all-view');
      await captureScreenshot(page, 'opportunity-record-in-list');
    });
  });

  // Suite 2: Edge Cases & Validation
  test('TC2.1: Create Opportunity Without Account Name', async ({ page }) => {
    const oppName = uniqueName('Agentic Test No Account');
    const closeDate = getDatePlusDays(30);

    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Fill Form Without Account', page, async () => {
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByLabel('Close Date').fill(closeDate);
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('25000');
    });

    await sfStep('Save and Verify', page, async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('.toastMessage')).toContainText('was created');
      await waitForSFLoad(page);
      await expect(page.getByRole('heading', { name: new RegExp(oppName) })).toBeVisible();
      await captureScreenshot(page, 'opportunity-no-account-saved');
    });
  });

  test('TC2.2: Opportunity Name Required Field Validation', async ({ page }) => {
    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Fill Form Without Name', page, async () => {
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(getDatePlusDays(30));
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
    });

    await sfStep('Attempt Save and Check Error', page, async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      // Assuming error appears
      await expect(page.getByRole('dialog').locator('.slds-form-element__help')).toBeVisible();
      await captureScreenshot(page, 'opportunity-name-required-error');
    });
  });

  test('TC2.3: Invalid Close Date (Past Date)', async ({ page }) => {
    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Fill Form with Past Date', page, async () => {
      await page.getByLabel('Opportunity Name').fill(uniqueName('Agentic Test Past Date'));
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill('03/06/2026'); // Past date
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
    });

    await sfStep('Attempt Save', page, async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      // Observe behavior - may succeed or show error
      await captureScreenshot(page, 'opportunity-past-date-validation');
    });
  });

  test('TC2.4: Close Date Too Far in Future', async ({ page }) => {
    const oppName = uniqueName('Agentic Test Far Future');

    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Fill Form with Far Future Date', page, async () => {
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill('12/31/2099');
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('100000');
    });

    await sfStep('Save and Verify', page, async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('.toastMessage')).toContainText('was created');
      await waitForSFLoad(page);
      await expect(page.getByRole('heading', { name: new RegExp(oppName) })).toBeVisible();
      await captureScreenshot(page, 'opportunity-far-future-date-saved');
    });
  });

  test('TC2.5: Amount Field — Special Characters & Formatting', async ({ page }) => {
    const oppName = uniqueName('Agentic Test Amount Format');

    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Fill Form with Formatted Amount', page, async () => {
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(getDatePlusDays(30));
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50,000.50');
      // Tab away or click elsewhere to trigger formatting
      await page.getByLabel('Opportunity Name').click();
    });

    await sfStep('Save and Verify', page, async () => {
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('.toastMessage')).toContainText('was created');
      await waitForSFLoad(page);
      await expect(page.getByText('50,000.50')).toBeVisible();
      await captureScreenshot(page, 'opportunity-amount-formatting');
    });
  });

  test('TC2.6: Account Lookup With Autocomplete', async ({ page }) => {
    await sfStep('Navigate and Open Modal', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
    });

    await sfStep('Test Autocomplete', page, async () => {
      const accountField = page.getByRole('combobox', { name: 'Account Name', exact: true });
      await accountField.fill('Acm');
      await page.waitForTimeout(600);
      const option = page.getByRole('option', { name: /Acme Corp/ }).first();
      await expect(option).toBeVisible();
      await option.click();
      await expect(accountField).toHaveValue('Acme Corp');
      await captureScreenshot(page, 'account-lookup-autocomplete');
    });
  });

  // Suite 3: Multi-Step Workflows
  test('TC3.1: Create Opportunity → Edit Detail → Verify Changes', async ({ page }) => {
    const oppName = uniqueName('Agentic Test Edit');

    await sfStep('Create Opportunity', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Opportunity Name').fill(oppName);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(getDatePlusDays(30));
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await waitForSFLoad(page);
    });

    await sfStep('Edit Opportunity', page, async () => {
      await page.getByRole('button', { name: 'Edit' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Qualification' }).click();
      await page.getByLabel('Amount').fill('75000');
      await captureScreenshot(page, 'opportunity-edit-stage-and-amount');
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('.toastMessage')).toContainText('was saved');
      await waitForSFLoad(page);
      await expect(page.getByText('Qualification')).toBeVisible();
      await expect(page.getByText('75,000')).toBeVisible();
      await captureScreenshot(page, 'opportunity-after-edit-verification');
    });
  });

  test('TC3.2: Create Two Opportunities → Same Account — Verify in List', async ({ page }) => {
    const oppName1 = uniqueName('Agentic Test First');
    const oppName2 = uniqueName('Agentic Test Second');

    await sfStep('Create First Opportunity', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Opportunity Name').fill(oppName1);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(getDatePlusDays(30));
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Needs Analysis' }).click();
      await page.getByLabel('Amount').fill('50000');
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await waitForSFLoad(page);
    });

    await sfStep('Create Second Opportunity', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await page.getByRole('button', { name: 'New' }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.getByLabel('Opportunity Name').fill(oppName2);
      await page.getByRole('combobox', { name: 'Account Name', exact: true }).fill('Acme Corp');
      await page.waitForTimeout(600);
      await page.getByRole('option', { name: 'Acme Corp' }).first().click();
      await page.getByLabel('Close Date').fill(getDatePlusDays(37));
      await page.getByLabel('Stage').click();
      await page.getByRole('option', { name: 'Qualification' }).click();
      await page.getByLabel('Amount').fill('75000');
      const dialog = page.getByRole('dialog');
      await dialog.getByRole('button', { name: 'Save' }).click();
      await expect(dialog).not.toBeVisible();
      await waitForSFLoad(page);
    });

    await sfStep('Verify Both in List', page, async () => {
      await page.getByRole('link', { name: 'Opportunities' }).click();
      await waitForSFLoad(page);
      await switchToAllRecords(page, 'Opportunities');
      await expect(page.getByRole('link', { name: new RegExp(oppName1) })).toBeVisible();
      await expect(page.getByRole('link', { name: new RegExp(oppName2) })).toBeVisible();
      await captureScreenshot(page, 'opportunities-list-multiple-records');
    });
  });
});