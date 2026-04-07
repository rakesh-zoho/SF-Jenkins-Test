import { chromium } from 'playwright';
import 'dotenv/config';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(`${process.env.SF_URL}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.fill('#username', process.env.SF_USERNAME);
    await page.fill('#password', process.env.SF_PASSWORD);
    await page.click('#Login');
    await page.waitForSelector('role=link[name="Accounts"]', { timeout: 90000 });
    console.log('URL', page.url());
    await page.click('role=link[name="Accounts"]', { timeout: 10000 });
    await page.waitForSelector('role=button[name="New"]', { timeout: 90000 });
    console.log('Accounts page loaded');
    await page.click('role=button[name="New"]', { timeout: 10000 });
    await page.waitForSelector('role=dialog', { timeout: 90000 });
    await page.waitForTimeout(3000);
    console.log('New Account dialog visible');
    const dialogCount = await page.locator('role=dialog').count();
    console.log('dialog count', dialogCount);
    const accountNameFields = await page.locator('role=textbox[name="Account Name"]').count();
    console.log('Account Name textbox count', accountNameFields);
    const saveButtons = await page.locator('role=button[name="Save"]').count();
    console.log('Save button count', saveButtons);
    if (accountNameFields > 0) {
      await page.fill('role=textbox[name="Account Name"]', `Debug Account ${Date.now()}`);
    }
    await page.click('role=button[name="Save"]', { timeout: 10000 });
    await page.waitForTimeout(5000);
    const toastCount = await page.locator('.toastMessage').count();
    const notifyCount = await page.locator('.slds-notify_toast').count();
    const alertCount = await page.locator('[role="alert"]').count();
    console.log('toastMessage count', toastCount);
    console.log('slds-notify_toast count', notifyCount);
    console.log('role=alert count', alertCount);
    const toastText = await page.locator('.toastMessage').allTextContents();
    console.log('toast texts', toastText);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();