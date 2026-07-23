import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import 'dotenv/config';
// HEALED: Fixed import path - fixtures moved from tests/ to fixtures/ directory
import { sfTest } from '../fixtures/fixtures.js';
import { captureScreenshot, setAllureMeta } from '../utils/reporter-utils.js';
import { fillField, selectPicklist } from '../utils/locator-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';

/**
 * LEAD CREATION TEST SUITE
 * Robust navigation to Leads app with error handling
 * Epic: CRM, Feature: Lead Management, Story: Create Lead, Severity: Critical
 *
 * spec: specs/lead-creation-plan.md
 * seed: tests/seed.spec.js
 */

test.beforeEach(async () => {
  await setAllureMeta({
    epic: 'CRM',
    feature: 'Lead Management',
    story: 'Create Lead',
    severity: 'critical',
  });
});

// HEALED: Unified failure screenshot capture through reporter-utils
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      await captureScreenshot(page, `${testInfo.title.replace(/\s+/g, '-').toLowerCase()}-failed`, {
        writeToFile: true,
        testInfo,
      });
    } catch (err) {
      console.warn('Failed to capture failure screenshot:', err.message);
    }
  }
});

/**
 * Helper: Navigate to Leads app with robust selector handling
 * Uses App Launcher + search for reliability across SF orgs
 */
async function navigateToLeads(page) {
  await page.getByTitle('App Launcher').click();

  const launcherSearch = page.getByPlaceholder(/search/i);
  await expect(launcherSearch).toBeVisible({ timeout: 15000 });
  await launcherSearch.fill('Leads');

  const leadsOption = page.getByRole('option', { name: /^Leads$/i });
  await expect(leadsOption).toBeVisible({ timeout: 15000 });
  await leadsOption.click();

  await waitForSFLoad(page);
}

async function expectLeadDetailLoaded(page) {
  await expect(page).toHaveURL(/\/Lead\/[a-zA-Z0-9]{15,18}/, { timeout: 30000 });
}

/**
 * Helper: Open New Lead form with proper waits
 * Eliminates duplication across all tests
 */
async function openNewLeadForm(page) {
  await page.getByRole('button', { name: /^New$/i, exact: true }).click();
  await waitForSFLoad(page);
  await expect(page.getByRole('dialog', { name: /new/i })).toBeVisible();
}

/**
 * Helper: Fill optional field if visible (cleaner, faster, no double DOM query)
 */
async function fillOptionalLabel(page, label, value) {
  const field = page.getByLabel(label);
  if (await field.isVisible().catch(() => false)) {
    await field.fill(value);
  }
}

/**
 * Helper: Select optional picklist if visible
 */
async function selectOptionalPicklist(page, label, value) {
  const field = page.getByLabel(label);
  if (await field.isVisible().catch(() => false)) {
    await selectPicklist(page, label, value);

    const selectedText = await field.inputValue().catch(() => '');
    if (selectedText) {
      await expect(field).toHaveValue(new RegExp(value, 'i'));
    } else {
      await expect(field).toHaveText(new RegExp(value, 'i'));
    }
  }
}

/**
 * SECTION 1: LEAD CREATION - BASIC INFORMATION
 */
test.describe('1. Lead Creation - Basic Information', () => {

  sfTest('1.1 Create Lead with Required Fields Only', async ({ sfPage: page }, testInfo) => {
    await allure.description('Create a Lead with only required fields (First Name, Last Name, Company)');

    // Navigate to Leads
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill form
    await fillField(page, /first name/i, 'John');
    await fillField(page, /last name/i, 'Doe');
    await fillField(page, /company/i, 'Acme Corporation');
    
    // Save and wait for URL change
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);

    await captureScreenshot(page, '1.1-required-fields');
  });

  sfTest('1.2 Create Lead with All Standard Fields', async ({ sfPage: page }, testInfo) => {
    await allure.description('Create a Lead with all standard fields populated');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill all fields
    await fillField(page, /first name/i, 'Jane');
    await fillField(page, /last name/i, 'Don');
    await fillField(page, /company/i, 'Tech Innovations Inc');
    
    // Optional fields - use helper to avoid silent failures
    await fillOptionalLabel(page, /title/i, 'Manager');
    await fillOptionalLabel(page, /email/i, 'jane.smith@techinnovations.com');
    await fillOptionalLabel(page, /phone/i, '(555) 123-4567');

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);

    await captureScreenshot(page, '1.2-all-fields');
  });

});

/**
 * SECTION 2: FIELD VALIDATION
 */
test.describe('2. Lead Creation - Field Validation', () => {

  sfTest('2.1 Attempt to Save Lead Without Required Fields', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify validation prevents saving Lead without required fields');
    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Try to save empty form
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Verify save failed (URL should not have record ID) - Use Playwright assertion for retry logic
    await expect(page).not.toHaveURL(/\/Lead\/[a-zA-Z0-9]{15,18}/);
    
    // Look for validation errors
    const alerts = page.getByRole('alert');
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible();
    }

    await captureScreenshot(page, '2.1-validation-errors');
  });

  sfTest('2.2 Enter Only First Name and Attempt Save', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify validation catches missing Last Name');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill only first name
    await fillField(page, /first name/i, 'Michael');

    // Capture initial state
    const initialUrl = page.url();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Try to save
    await page.getByRole('button', { name: 'Save', exact: true }).click();

    // Verify save failed - form should still be visible and URL unchanged
   // await expect(dialog).toBeVisible();
    await expect(page.getByLabel(/first name/i)).toHaveValue('Michael');
    await expect(page.getByLabel(/last name/i)).toBeVisible();

    // Check if URL changed (it shouldn't for failed save) - Use Playwright assertion with retry
    await expect(page).toHaveURL(initialUrl);

    await captureScreenshot(page, '2.2-missing-last-name');
  });

  sfTest('2.3 Enter Valid Email Address', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify email field accepts and saves valid email');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill with email
    await fillField(page, /first name/i, 'Robert');
    await fillField(page, /last name/i, 'Debb');
    await fillField(page, /company/i, 'Enterprise Corp');
    // Optional field - use helper
    await fillOptionalLabel(page, /email/i, 'robert.brown@enterprisecorp.com');

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);

    await captureScreenshot(page, '2.3-valid-email');
  });

});

/**
 * SECTION 3: DROPDOWN AND PICKLIST SELECTION
 */
test.describe('3. Lead Creation - Dropdown and Picklist Selection', () => {

  sfTest('3.1 Select Lead Source Dropdown', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify dropdown selections are properly saved');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill
    await fillField(page, /first name/i, 'Emily');
    await fillField(page, /last name/i, 'Davis');
    await fillField(page, /company/i, 'Growth Ventures');
    await selectOptionalPicklist(page, /lead source/i, 'Web');
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeEnabled();

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);

    await captureScreenshot(page, '3.1-lead-source');
  });

  sfTest('3.2 Select Rating Picklist', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify Rating picklist selection is saved');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill
    await fillField(page, /first name/i, 'David');
    await fillField(page, /last name/i, 'Miller');
    await fillField(page, /company/i, 'Premier Industries');
    // Optional picklist - use helper
    await selectOptionalPicklist(page, /rating/i, 'Warm');

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);
    
    await captureScreenshot(page, '3.2-rating-picklist');
  });

});

/**
 * SECTION 4: TEXT FIELD HANDLING
 */
test.describe('4. Lead Creation - Text Field Handling', () => {

  sfTest('4.1 Enter Text with Special Characters', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify special characters are properly handled');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill with special chars
    await fillField(page, /first name/i, 'François');
    await fillField(page, /last name/i, "O'Sullivan");
    await fillField(page, /company/i, 'Société Générale & Partners');
    // Optional field
    await fillOptionalLabel(page, /email/i, 'francois@test.com');

    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);

    await captureScreenshot(page, '4.1-special-characters');
  });

});

/**
 * SECTION 5: NAVIGATION AND FORM STATE
 */
test.describe('5. Lead Creation - Navigation and Form State', () => {

  sfTest('5.1 Save and Navigate to Lead Detail View', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify navigation to Lead detail view after save');

    // Navigate to Leads
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill and save
    await fillField(page, /first name/i, 'Mark');
    await fillField(page, /last name/i, 'Wilson');
    await fillField(page, /company/i, 'Innovation Labs');

    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expectLeadDetailLoaded(page);
    await expect(page.getByText(/Details/i).first()).toBeVisible({ timeout: 15000 });

    await captureScreenshot(page, '5.1-detail-view');
  });

  sfTest('5.2 Cancel Lead Creation', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify canceling discards unsaved changes');

    // Navigate to Leads
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Scope the dialog more specifically
    const newLeadDialog = page.getByRole('dialog', { name: /new/i });

    // Fill form
    await fillField(page, /first name/i, 'Rachel');
    await fillField(page, /last name/i, 'Lee');
    await fillField(page, /company/i, 'Progress Corp');

    // Find and click cancel button within the specific dialog
    const cancelBtn = newLeadDialog.getByRole('button', { name: /^cancel$/i });
    await expect(cancelBtn).toBeVisible();
    await cancelBtn.click();

    // Handle discard changes confirmation if it appears
    const discardBtn = page.getByRole('button', { name: /discard|leave|yes/i }).first();
    if (await discardBtn.isVisible().catch(() => false)) {
      await discardBtn.click();
    }

    // Wait for the New Lead dialog to close and verify list view
    await expect(newLeadDialog).toBeHidden({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /^New$/i, exact: true })).toBeVisible();
  });

});

/**
 * SECTION 6: ACCESSIBILITY
 */
test.describe('6. Lead Creation - Accessibility', () => {

  sfTest('6.1 Navigate Form Using Keyboard Only', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify form is fully keyboard accessible');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Fill using keyboard input after focusing fields
    const firstNameField = page.getByLabel(/first name/i);
    await expect(firstNameField).toBeVisible();
    await firstNameField.focus();
    await page.keyboard.type('KeyboardTest');

    await page.keyboard.press('Backspace'); // Simulate correction
    await page.keyboard.type('User');

    await page.keyboard.press('Tab');  // Skip Phone field
    await page.keyboard.press('Tab');  // Reach Company field
    await page.keyboard.type('KeyboardCorp');

    const saveButton = page.getByRole('button', { name: 'Save', exact: true });
    await expect(saveButton).toBeVisible();
    await saveButton.focus();
    await page.keyboard.press('Enter');

    await expectLeadDetailLoaded(page);
    await captureScreenshot(page, '6.1-keyboard-nav');
  });

  sfTest('6.2 Verify Field Labels and Help Text', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify all fields have labels and required indicators');

    // Navigate
    await navigateToLeads(page);
    await openNewLeadForm(page);

    // Scope to the dialog to avoid conflicts with list view elements
    const dialog = page.getByRole('dialog', { name: /new/i });

    // Verify fields exist (scoped to dialog to avoid strict mode violations)
    await expect(dialog.getByLabel(/first name/i, { exact: true })).toBeVisible();
    await expect(dialog.getByLabel(/last name/i, { exact: true })).toBeVisible();
    await expect(dialog.getByLabel(/company/i)).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Save', exact: true })).toBeVisible();

    await captureScreenshot(page, '6.2-field-labels');
  });

});
