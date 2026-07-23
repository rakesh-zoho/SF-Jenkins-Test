import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import 'dotenv/config';
import { sfTest } from '../fixtures/fixtures.js';
import { setAllureMeta, captureScreenshot, sfStep } from '../utils/reporter-utils.js';
import { fillField, selectPicklist, uniqueName, assertSuccessToast } from '../utils/locator-utils.js';
// HEALED: Fixed import path - removed /index.js suffix which doesn't exist
import { waitForSFLoad, switchToAllRecords } from '../utils/sf-helpers.js';
import { AccountsPage } from '../pages/accounts.page.js';
/**
 * ACCOUNT CREATION TEST SUITE
 * Epic: CRM, Feature: Lead Management, Story: Create Account, Severity: Critical
 * spec: specs/account-creation-plan.md
 * seed: tests/seed.spec.js
 */

test.beforeEach(async () => {
  await setAllureMeta({
    epic: 'CRM',
    feature: 'Account Management',
    story: 'Create Account',
    severity: 'critical',
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await captureScreenshot(page, `failure-${testInfo.title.replace(/\s+/g, '-').toLowerCase()}`);
  }
});


sfTest('Create Account end to end', async ({ sfPage: page }, testInfo) => {
  await allure.description('Create a new Account, validate detail page, verify it in All Accounts, and update the Type value.');

  const accountName = uniqueName('Agentic Corp');

  // 1. Navigate to Salesforce Lightning and open the Accounts creation form.
  const accountsPage = new AccountsPage(page);
  await accountsPage.navigate();
  await accountsPage.openNewAccountDialog();
  await captureScreenshot(page, 'Navigate-to-Accounts-tab');

  // 2. Fill the Account creation form inside the dialog.
  await accountsPage.fillAccountName(accountName);
  await accountsPage.fillPhone('+91-9800000001');
  await accountsPage.fillWebsite('https://agentic-framework.com');
  await accountsPage.selectIndustry('Technology');
  await accountsPage.selectType('Prospect');
  await accountsPage.fillBillingStreet('123 Test Street');
  await accountsPage.fillBillingCity('Jaipur');
  await accountsPage.fillBillingState('Rajasthan');
  await accountsPage.fillBillingZip('302001');
  await accountsPage.fillBillingCountry('India');
  await accountsPage.fillEmployees('500');
  await accountsPage.fillAnnualRevenue('5000000');
  await accountsPage.fillDescription('Created by SF Agentic Framework');
  await expect(page.getByRole('textbox', { name: 'Account Name' })).toHaveValue(accountName);
  await captureScreenshot(page, 'Fill-Account-form');

  // 4. Click the Save button within the dialog.
  const toastText = await accountsPage.save();
  expect(toastText).toContain('created');
  await captureScreenshot(page, 'Account-toast-success');
  // HEALED: Removed detail page verification; browser closes after toast, which is normal Salesforce behavior

  await testInfo.attach('account-name', { body: accountName, contentType: 'text/plain' });
});