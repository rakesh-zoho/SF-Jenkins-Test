import { chromium } from '@playwright/test';
import { waitForSFLoad, switchToAllRecords } from '../utils/sf-helpers.js';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'reports/.auth-state.json' });
  const page = await context.newPage();

  const firstName = 'Agentic';
  const lastName = `Test-${Date.now()}`;
  const fullName = `${firstName} ${lastName}`;

  console.log('Step 1: Open Salesforce and verify home');
  await page.goto(process.env.SF_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await waitForSFLoad(page);
  await page.screenshot({ path: 'reports/screenshots/leads-home.png' });

  console.log('Step 2: Navigate to Leads view');
  await page.getByRole('link', { name: 'Leads' }).click();
  await waitForSFLoad(page);
  await page.screenshot({ path: 'reports/screenshots/leads-list-view.png' });

  console.log('Step 3: Open New Lead modal');
  await page.getByRole('button', { name: 'New' }).click();
  const dialog = page.getByRole('dialog').filter({ hasText: 'Last Name' });
  await dialog.waitFor({ state: 'visible', timeout: 20000 });
  await page.screenshot({ path: 'reports/screenshots/new-lead-modal-open.png' });

  console.log('Step 4: Fill Lead fields');
  await dialog.getByLabel('First Name').fill(firstName);
  await dialog.getByLabel('Last Name').fill(lastName);
  await dialog.getByLabel('Company').fill('SF Agentic Framework Inc.');
  await dialog.getByLabel('Email').fill('agentic.test@sf-framework.com');
  await dialog.getByLabel('Phone').fill('+91-9876543210');

  await dialog.getByRole('combobox', { name: 'Lead Source' }).click();
  await page.getByRole('option', { name: 'Web' }).click();
  await dialog.getByRole('combobox', { name: 'Status' }).click();
  await page.getByRole('option', { name: 'Open - Not Contacted' }).click();

  await page.screenshot({ path: 'reports/screenshots/lead-form-filled.png' });

  console.log('Step 5: Save Lead');
  await dialog.getByRole('button', { name: 'Save' }).click();
  const toast = page.locator('.toastMessage');
  await toast.waitFor({ state: 'visible', timeout: 20000 });
  await page.screenshot({ path: 'reports/screenshots/lead-toast-success.png' });
  if (!(await toast.textContent()).includes('was created')) {
    throw new Error('Toast did not contain creation confirmation');
  }

  console.log('Step 6: Verify detail page');
  await waitForSFLoad(page);
  await page.getByRole('heading', { name: fullName }).waitFor({ timeout: 20000 });
  await page.screenshot({ path: 'reports/screenshots/lead-detail-page.png' });

  console.log('Step 7: Verify in All Leads list');
  await page.getByRole('link', { name: 'Leads' }).click();
  await waitForSFLoad(page);
  await switchToAllRecords(page, 'Leads');
  await page.getByRole('link', { name: fullName }).waitFor({ timeout: 20000 });
  await page.screenshot({ path: 'reports/screenshots/lead-in-list-view.png' });

  await browser.close();
  console.log('Done! Screenshots saved in reports/screenshots.');
})();