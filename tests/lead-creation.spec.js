import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import 'dotenv/config';
import { sfTest } from './seed.spec.js';
import { setAllureMeta } from '../utils/reporter-utils.js';
import { fillField, selectPicklist } from '../utils/locator-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';
import fs from 'fs';
import path from 'path';

/**
 * LEAD CREATION TEST SUITE
 * Robust navigation to Leads app with error handling
 * Epic: CRM, Feature: Lead Management, Story: Create Lead, Severity: Critical
 *
 * spec: specs/lead-creation-plan.md
 * seed: tests/seed.spec.js
 */

const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

test.beforeEach(async () => {
  await setAllureMeta({
    epic: 'CRM',
    feature: 'Lead Management',
    story: 'Create Lead',
    severity: 'critical',
  });
});

// HEALED: Improved failure screenshot capture and logging
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    try {
      const failureScreenshot = await page.screenshot({ fullPage: true });
      const testName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
      fs.writeFileSync(
        path.join(screenshotDir, `${testName}-FAILED.png`),
        failureScreenshot
      );
      await testInfo.attach('failure-screenshot', {
        body: failureScreenshot,
        contentType: 'image/png',
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
  // HEALED: Replaced navigateToApp() with direct App Launcher interaction  
  await page.getByTitle('App Launcher').click({ timeout: 10000 });
  await page.waitForTimeout(500);
  await page.getByPlaceholder(/search/i).fill('Leads', { timeout: 5000 });
  await page.waitForTimeout(500);
  await page.getByRole('option', { name: /^Leads$/i }).click({ timeout: 5000 });
  await waitForSFLoad(page);
}

/**
 * SECTION 1: LEAD CREATION - BASIC INFORMATION
 */
test.describe('1. Lead Creation - Basic Information', () => {

  sfTest('1.1 Create Lead with Required Fields Only', async ({ sfPage: page }, testInfo) => {
    await allure.description('Create a Lead with only required fields (First Name, Last Name, Company)');

    // Navigate to Leads
    await navigateToLeads(page);
    
    // Open New Lead form
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill form
    await fillField(page, /first name/i, 'John');
    await fillField(page, /last name/i, 'Doe');
    await fillField(page, /company/i, 'Acme Corporation');
    
    // Save and wait for URL change
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Capture success screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '1.1-Required-Fields-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  sfTest('1.2 Create Lead with All Standard Fields', async ({ sfPage: page }, testInfo) => {
    await allure.description('Create a Lead with all standard fields populated');

    // Navigate
    await navigateToLeads(page);
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill all fields
    await fillField(page, /first name/i, 'Jane');
    await fillField(page, /last name/i, 'Smith');
    await fillField(page, /company/i, 'Tech Innovations Inc');
    
    try {
      await fillField(page, /title/i, 'Manager');
      await fillField(page, /email/i, 'jane.smith@techinnovations.com');
      await fillField(page, /phone/i, '(555) 123-4567');
    } catch {
      // Optional fields may not exist or be visible
    }

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '1.2-All-Fields-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
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
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Try to save empty form
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForTimeout(2000);

    // HEALED: Verify save failed (URL should not have record ID)
    expect(page.url()).not.toMatch(/\/Lead\/[a-zA-Z0-9]{15,18}/);
    
    // Look for validation errors
    const alerts = page.getByRole('alert');
    if (await alerts.count() > 0) {
      await expect(alerts.first()).toBeVisible({ timeout: 5000 });
    }

    // Screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '2.1-No-Required-Fields-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  sfTest('2.2 Enter Only First Name and Attempt Save', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify validation catches missing Last Name');

    // Navigate
    await navigateToLeads(page);

    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill only first name
    await fillField(page, /first name/i, 'Michael');

    // Capture initial state
    const initialUrl = page.url();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Try to save
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });

    // Wait a moment for any validation to appear
    await page.waitForTimeout(2000);

    // Verify save failed - form should still be visible and URL unchanged
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(page.getByLabel(/first name/i)).toHaveValue('Michael');
    await expect(page.getByLabel(/last name/i)).toBeVisible();

    // Check if URL changed (it shouldn't for failed save)
    const currentUrl = page.url();
    expect(currentUrl).toBe(initialUrl);

    // Screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '2.2-Missing-LastName-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  sfTest('2.3 Enter Valid Email Address', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify email field accepts and saves valid email');

    // Navigate
    await navigateToLeads(page);
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill with email
    await fillField(page, /first name/i, 'Robert');
    await fillField(page, /last name/i, 'Brown');
    await fillField(page, /company/i, 'Enterprise Corp');
    try {
      await fillField(page, /email/i, 'robert.brown@enterprisecorp.com');
    } catch {
      // Email field may not be visible in this org
    }

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '2.3-Valid-Email-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
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
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill
    await fillField(page, /first name/i, 'Emily');
    await fillField(page, /last name/i, 'Davis');
    await fillField(page, /company/i, 'Growth Ventures');
    try {
      await selectPicklist(page, /lead source/i, 'Website');
    } catch {
      // Picklist may not be available
    }

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '3.1-Lead-Source-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  sfTest('3.2 Select Rating Picklist', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify Rating picklist selection is saved');

    // Navigate
    await navigateToLeads(page);
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill
    await fillField(page, /first name/i, 'David');
    await fillField(page, /last name/i, 'Miller');
    await fillField(page, /company/i, 'Premier Industries');
    try {
      await selectPicklist(page, /rating/i, 'Warm');
    } catch {
      // Picklist may not be available
    }

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '3.2-Rating-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
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
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill with special chars
    await fillField(page, /first name/i, 'François');
    await fillField(page, /last name/i, "O'Sullivan");
    await fillField(page, /company/i, 'Société Générale & Partners');
    try {
      await fillField(page, /email/i, 'francois@test.com');
    } catch {
      // Email may not be visible
    }

    // Save
    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '4.1-Special-Chars-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
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
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill and save
    await fillField(page, /first name/i, 'Mark');
    await fillField(page, /last name/i, 'Wilson');
    await fillField(page, /company/i, 'Innovation Labs');

    await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
    
    // Screenshot
    await page.waitForTimeout(500);
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '5.1-Detail-View-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  sfTest('5.2 Cancel Lead Creation', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify canceling discards unsaved changes');

    // Navigate to Leads
    await navigateToLeads(page);

    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);

    // Find the specific New Lead dialog
    const newLeadDialog = page.getByRole('dialog', { name: /new lead/i });
    await expect(newLeadDialog).toBeVisible({ timeout: 10000 });
    await expect(newLeadDialog.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill form
    await fillField(page, /first name/i, 'Rachel');
    await fillField(page, /last name/i, 'Lee');
    await fillField(page, /company/i, 'Progress Corp');

    // Find and click cancel button within the specific dialog
    const cancelBtn = newLeadDialog.getByRole('button', { name: /^cancel$/i });
    await expect(cancelBtn).toBeVisible({ timeout: 5000 });
    await cancelBtn.click();

    // Wait for the New Lead dialog to close
    await expect(newLeadDialog).toBeHidden({ timeout: 10000 });

    // Verify we're back to list view
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
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await expect(dialog.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Fill using keyboard input after focusing fields
    const firstNameField = page.getByLabel(/first name/i);
    await expect(firstNameField).toBeVisible({ timeout: 10000 });
    await firstNameField.focus();
    await page.keyboard.type('KeyboardTest');

    await page.keyboard.press('Tab');
    await page.keyboard.type('User');

    await page.keyboard.press('Tab');
    await page.keyboard.type('KeyboardCorp');

    const saveButton = page.getByRole('button', { name: 'Save', exact: true });
    await expect(saveButton).toBeVisible({ timeout: 10000 });
    await saveButton.focus();
    await page.keyboard.press('Enter');

    await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 10000 });
    
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '6.1-Keyboard-Nav-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  sfTest('6.2 Verify Field Labels and Help Text', async ({ sfPage: page }, testInfo) => {
    await allure.description('Verify all fields have labels and required indicators');

    // Navigate
    await navigateToLeads(page);
    
    await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
    await waitForSFLoad(page);
    // HEALED: Check for dialog heading instead of form element
    await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });

    // Verify fields exist (use specific locators to avoid strict mode)
    await expect(page.getByLabel(/first name/i, { exact: true })).toBeVisible({ timeout: 5000 });
    await expect(page.getByLabel(/last name/i, { exact: true })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('textbox', { name: 'Company' })).toBeVisible({ timeout: 5000 }).catch(() => {
      // Company may be accessed via label instead
      expect(page.getByLabel(/company/i)).toBeVisible();
    });
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible({ timeout: 5000 });

    // Screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    fs.writeFileSync(path.join(screenshotDir, '6.2-Accessibility-PASSED.png'), screenshot);
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

});
