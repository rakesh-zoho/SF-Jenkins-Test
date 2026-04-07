import { chromium } from 'playwright';
import 'dotenv/config';
import { fillField, selectPicklist, uniqueName } from '../utils/locator-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(`${process.env.SF_URL}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.fill('#username', process.env.SF_USERNAME);
    await page.fill('#password', process.env.SF_PASSWORD);
    await page.click('#Login');
    await page.waitForSelector('role=link[name="Accounts"]', { timeout: 90000 });
    await page.click('role=link[name="Accounts"]', { timeout: 10000 });
    await waitForSFLoad(page);
    await page.waitForSelector('role=button[name="New"]', { timeout: 90000 });
    await page.click('role=button[name="New"]', { timeout: 10000 });
    await page.waitForSelector('role=dialog', { timeout: 90000 });
    await page.waitForTimeout(3000);
    const accountName = uniqueName('Debug Account');
    console.log('Using accountName', accountName);
    await fillField(page, 'Account Name', accountName);
    await fillField(page, 'Phone', '+91-9800000001');
    await fillField(page, 'Website', 'https://agentic-framework.com');
    await selectPicklist(page, 'Industry', 'Technology');
    await selectPicklist(page, 'Type', 'Prospect');
    await fillField(page, 'Billing Street', '123 Test Street');
    await fillField(page, 'Billing City', 'Jaipur');
    await fillField(page, 'Billing State', 'Rajasthan');
    await fillField(page, 'Billing Zip', '302001');
    await fillField(page, 'Billing Country', 'India');
    await fillField(page, 'Employees', '500');
    await fillField(page, 'Annual Revenue', '5000000');
    await fillField(page, 'Description', 'Created by SF Agentic Framework');
    await page.click('role=button[name="Save"]', { timeout: 10000 });
    await waitForSFLoad(page);
    const toastCount = await page.locator('.toastMessage').count();
    console.log('toastMessage count after save', toastCount);
    if (toastCount > 0) {
      console.log(await page.locator('.toastMessage').allTextContents());
    }
    const heading = `role=heading[name="${accountName}"]`;
    const detailCount = await page.locator(heading).count();
    console.log('detail heading count', detailCount);
    if (detailCount > 0) {
      console.log('detail heading visible');
    } else {
      console.log('detail heading NOT visible');
    }
  } catch (err) {
    console.error('ERROR', err);
  } finally {
    await browser.close();
  }
})();