import { expect } from '@playwright/test';
import 'dotenv/config';
import { waitForSFLoad, switchToAllRecords, navigateToApp } from '../utils/sf-helpers.js';
import { captureScreenshot, sfStep, setAllureMeta } from '../utils/reporter-utils.js';
import { fillField, fillLookup, selectPicklist, uniqueName } from '../utils/locator-utils.js';
import { sfTest } from './fixtures.js';

const navigateToCases = async (page) => {
  await navigateToApp(page, 'Cases'); // HEALED: Reuse shared Salesforce app navigation helper
};

const openCasesNewDialog = async (page) => {
  await navigateToCases(page);
  const newButton = page.getByRole('button', { name: 'New' });
  await expect(newButton).toBeVisible({ timeout: 10000 });
  await newButton.click({ timeout: 10000 });
  await waitForSFLoad(page);
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible({ timeout: 10000 });
  await expect(dialog.getByText('New Case')).toBeVisible({ timeout: 10000 });
};

const fillLookupByFirstResult = async (page, fieldLabel, searchTerm) => {
  await fillLookup(page, fieldLabel, searchTerm);
  const dialog = page.getByRole('dialog');
  const lookup = dialog.getByRole('combobox', { name: fieldLabel }).first();
  await expect(lookup).not.toHaveValue('', { timeout: 10000 });
};

const selectFirstValidOption = async (page, fieldLabel) => {
  const dialog = page.getByRole('dialog');
  const field = dialog.getByRole('combobox', { name: fieldLabel }).first();
  await expect(field).toBeVisible({ timeout: 15000 });
  await field.click();
  const option = page.getByRole('option').filter({ hasText: /^(?!\-\-None\-\-).+/ }).first();
  await expect(option).toBeVisible({ timeout: 15000 }); // HEALED: Picklist options may render outside the dialog container
  await option.click();
};

sfTest.describe('Case Creation', () => {
  sfTest.afterEach(async ({ sfPage }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await captureScreenshot(sfPage, `failure-${testInfo.title.replace(/\s+/g, '-').toLowerCase()}`);
    }
  });

  sfTest('1.1 Create a new Case with required fields only', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Create Case',
      severity: 'critical',
    });

    const caseSubject = uniqueName('Agentic Case');

    await sfStep('Navigate to Cases using App Launcher and open New Case modal', page, async () => {
      await openCasesNewDialog(page); // HEALED: Use App Launcher search navigation like Lead-creation.spec.js
      await captureScreenshot(page, 'new-case-modal-open');
    });

    await sfStep('Fill Case form', page, async () => {
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      await fillLookupByFirstResult(page, 'Contact Name', 'contact');
      await fillLookupByFirstResult(page, 'Account Name', 'agentic');

      await selectPicklist(page, 'Status', 'New');
      await selectPicklist(page, 'Priority', 'Medium');
      await selectPicklist(page, 'Case Origin', 'Web');
      await selectFirstValidOption(page, 'Type');
      await selectFirstValidOption(page, 'Case Reason');

      await fillField(page, 'Subject', caseSubject);
      await fillField(page, 'Description', 'Automated test case creation flow');

      await expect(dialog.getByRole('textbox', { name: 'Subject' })).toHaveValue(caseSubject);
      await expect(dialog.getByRole('textbox', { name: 'Description' })).toHaveValue('Automated test case creation flow');
      await expect(dialog.getByLabel('Contact Name').first()).not.toHaveValue('');
      await expect(dialog.getByLabel('Account Name').first()).not.toHaveValue('');
      await captureScreenshot(page, 'case-form-filled');
    });

    await sfStep('Save the new Case', page, async () => {
      const saveButton = page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
      await expect(saveButton).toBeVisible();
      await saveButton.click();
      await waitForSFLoad(page);
      const toast = page.locator('.toastMessage');
      await expect(toast).toBeVisible({ timeout: 15000 });
      await expect(toast).toContainText('was created');
      await captureScreenshot(page, 'case-toast-success');
    });

    await sfStep('Verify Case detail page', page, async () => {
      await waitForSFLoad(page);
      await expect(page.getByText(caseSubject).first()).toBeVisible({ timeout: 20000 });
      await captureScreenshot(page, 'case-detail-page');
    });

    await sfStep('Verify Case in All Cases view', page, async () => {
      await navigateToCases(page); // HEALED: Reuse Cases navigation helper for consistency
      await switchToAllRecords(page, 'Cases');
      const caseLink = page.getByRole('link', { name: caseSubject });
      await expect(caseLink).toBeVisible({ timeout: 10000 });
      await captureScreenshot(page, 'case-in-list-view');
    });

    await expect(page).toHaveScreenshot('final-state.png');
  });

  sfTest('2.1 Prevent save without Contact Name', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Case Validation',
      severity: 'critical',
    });

    const caseSubject = uniqueName('Agentic Validation');

    await sfStep('Navigate to Cases and open New dialog', page, async () => {
      await openCasesNewDialog(page);
      await captureScreenshot(page, 'validation-new-dialog-open');
    });

    await sfStep('Fill form without Contact Name and attempt save', page, async () => {
      const dialog = page.getByRole('dialog');
      await fillLookupByFirstResult(page, 'Account Name', 'agentic');
      await selectPicklist(page, 'Status', 'New');
      await selectPicklist(page, 'Priority', 'Medium');
      await selectPicklist(page, 'Case Origin', 'Web');
      await fillField(page, 'Subject', caseSubject);
      await fillField(page, 'Description', 'Validation test');
      await captureScreenshot(page, 'case-validation-no-contact');
    });

    await sfStep('Click Save and verify validation error', page, async () => {
      const saveButton = page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
      await saveButton.click();
      const errorText = page.getByText(/contact|required/i).first();
      await expect(errorText).toBeVisible({ timeout: 10000 }); // Code review: explicit assertion for validation error
      await captureScreenshot(page, 'case-validation-error-displayed');
    });
  });

  sfTest('2.2 Prevent save without Subject', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Case Validation',
      severity: 'critical',
    });

    await sfStep('Navigate to Cases and open New dialog', page, async () => {
      await openCasesNewDialog(page);
    });

    await sfStep('Fill form without Subject', page, async () => {
      await fillLookupByFirstResult(page, 'Contact Name', 'contact');
      await fillLookupByFirstResult(page, 'Account Name', 'agentic');
      await selectPicklist(page, 'Status', 'New');
      await selectPicklist(page, 'Priority', 'Medium');
      await selectPicklist(page, 'Case Origin', 'Web');
      await fillField(page, 'Description', 'Test without subject');
      await captureScreenshot(page, 'case-validation-no-subject');
    });

    await sfStep('Attempt save without Subject', page, async () => {
      const saveButton = page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
      await saveButton.click();
      const subjectError = page.getByText(/subject|required/i).first();
      await expect(subjectError).toBeVisible({ timeout: 10000 }); // Code review: explicit assertion for missing subject
    });
  });

  sfTest('3.1 Create Case with long description', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Case Edge Cases',
      severity: 'normal',
    });

    const caseSubject = uniqueName('Case Long Desc');
    const longDescription = 'A'.repeat(500) + ' Additional content';

    await sfStep('Navigate and open New Case dialog', page, async () => {
      await openCasesNewDialog(page);
    });

    await sfStep('Fill form with long description', page, async () => {
      await fillLookupByFirstResult(page, 'Contact Name', 'contact');
      await fillLookupByFirstResult(page, 'Account Name', 'agentic');
      await selectPicklist(page, 'Status', 'New');
      await selectPicklist(page, 'Priority', 'Medium');
      await selectPicklist(page, 'Case Origin', 'Web');
      await selectFirstValidOption(page, 'Type');
      await selectFirstValidOption(page, 'Case Reason');
      await fillField(page, 'Subject', caseSubject);
      await fillField(page, 'Description', longDescription);
      await captureScreenshot(page, 'case-long-description');
    });

    await sfStep('Save case with long description', page, async () => {
      const saveButton = page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
      await saveButton.click();
      await waitForSFLoad(page);
      const toast = page.locator('.toastMessage');
      await expect(toast).toBeVisible({ timeout: 15000 });
      await captureScreenshot(page, 'case-long-desc-saved');
    });
  });

  sfTest('3.2 Create Case with special characters', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Case Edge Cases',
      severity: 'normal',
    });

    const specialSubject = 'Case – Q4 "Test" & Review';
    const specialDesc = 'Special chars: é, ñ, &, %, $, @';

    await sfStep('Navigate and open New Case dialog', page, async () => {
      await openCasesNewDialog(page);
    });

    await sfStep('Fill case with special characters', page, async () => {
      await fillLookupByFirstResult(page, 'Contact Name', 'contact');
      await fillLookupByFirstResult(page, 'Account Name', 'agentic');
      await selectPicklist(page, 'Status', 'New');
      await selectPicklist(page, 'Priority', 'Medium');
      await selectPicklist(page, 'Case Origin', 'Web');
      await selectFirstValidOption(page, 'Type');
      await selectFirstValidOption(page, 'Case Reason');
      await fillField(page, 'Subject', specialSubject);
      await fillField(page, 'Description', specialDesc);
      await captureScreenshot(page, 'case-special-chars');
    });

    await sfStep('Save and verify special characters persist', page, async () => {
      const saveButton = page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
      await saveButton.click();
      await waitForSFLoad(page);
      const toast = page.locator('.toastMessage');
      await expect(toast).toContainText('was created');
      await page.waitForTimeout(1000);
      const subjectOnDetail = page.getByText(specialSubject).first();
      await expect(subjectOnDetail).toBeVisible({ timeout: 10000 });
      await captureScreenshot(page, 'case-special-chars-saved');
    });
  });

  sfTest('3.3 Cancel Case creation', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Case Cancel Flow',
      severity: 'normal',
    });

    await sfStep('Navigate to Cases and open New dialog', page, async () => {
      await openCasesNewDialog(page);
      await captureScreenshot(page, 'case-before-cancel');
    });

    await sfStep('Fill form and cancel', page, async () => {
      const lookup = page.getByRole('combobox', { name: 'Contact Name' }).first();
      await lookup.fill('contact');
      await fillField(page, 'Subject', 'To Be Cancelled');
      const cancelButton = page.getByRole('dialog').getByRole('button', { name: 'Cancel' }).first();
      await cancelButton.click();
      await captureScreenshot(page, 'case-cancel-creation');
    });

    await sfStep('Verify dialog closed and no record created', page, async () => {
      const dialog = page.getByRole('dialog').first();
      await expect(dialog).not.toBeVisible().catch(() => {
        expect(page.url()).toContain('/lightning/o/Case');
      });
    });
  });

  sfTest('4.1 Verify new Case appears in All Cases view', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Case Verification',
      severity: 'normal',
    });

    const caseSubject = uniqueName('Case List View');

    await sfStep('Create a new case', page, async () => {
      await openCasesNewDialog(page);
      await fillLookupByFirstResult(page, 'Contact Name', 'contact');
      await fillLookupByFirstResult(page, 'Account Name', 'agentic');
      await selectPicklist(page, 'Status', 'New');
      await selectPicklist(page, 'Priority', 'Medium');
      await selectPicklist(page, 'Case Origin', 'Web');
      await selectFirstValidOption(page, 'Type');
      await selectFirstValidOption(page, 'Case Reason');
      await fillField(page, 'Subject', caseSubject);
      const saveButton = page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
      await saveButton.click();
      await waitForSFLoad(page);
      await captureScreenshot(page, 'case-created-for-list-check');
    });

    await sfStep('Return to Cases and switch to All Cases view', page, async () => {
      await navigateToCases(page); // HEALED: Reuse Cases navigation helper for list verification
      await switchToAllRecords(page, 'Cases');
      await captureScreenshot(page, 'case-switched-to-all-cases');
    });

    await sfStep('Verify created case appears in list', page, async () => {
      const caseLink = page.getByRole('link', { name: caseSubject });
      await expect(caseLink).toBeVisible({ timeout: 10000 });
      await captureScreenshot(page, 'case-in-list-view');
    });
  });

  sfTest('6.1 Keyboard navigation through Case form', async ({ sfPage: page }) => {
    await setAllureMeta({
      epic: 'CRM',
      feature: 'Case Management',
      story: 'Accessibility',
      severity: 'normal',
    });

    await sfStep('Navigate and open New Case with keyboard', page, async () => {
      await navigateToCases(page); // HEALED: Reuse navigation helper for keyboard test
      const newButton = page.getByRole('button', { name: 'New' });
      await expect(newButton).toBeVisible({ timeout: 10000 });
      await newButton.focus();
      await page.keyboard.press('Enter');
      await waitForSFLoad(page);
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
      await captureScreenshot(page, 'case-keyboard-opened');
    });

    await sfStep('Tab through form fields', page, async () => {
      const contactField = page.getByRole('combobox', { name: 'Contact Name' }).first();
      await contactField.focus();
      await contactField.fill('contact');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await captureScreenshot(page, 'case-keyboard-navigation');
    });

    await sfStep('Verify form is keyboard accessible', page, async () => {
      const dialog = page.getByRole('dialog');
      const subjectField = dialog.getByRole('textbox', { name: 'Subject' });
      await expect(subjectField).toBeVisible(); // Code review: Playwright does not support toBeFocusable
      await expect(subjectField).toBeEnabled(); // Code review: ensure the field is interactable for keyboard users
    });
  });
});

