import { chromium } from '@playwright/test';
import { waitForSFLoad } from '../utils/sf-helpers.js';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'reports/.auth-state.json' });
  const page = await context.newPage();

  await page.goto('https://nexturninc6.my.salesforce.com/lightning/o/Lead/home', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await waitForSFLoad(page);

  await page.getByRole('button', { name: 'New' }).click();
  const dialog = page.getByRole('dialog').filter({ hasText: 'Last Name' });
  await dialog.waitFor({ state: 'visible', timeout: 20000 });

  await dialog.getByRole('combobox', { name: 'Status' }).click();
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'reports/screenshots/status-dropdown.png' });

  const listboxes = await page.$$eval('div[role="listbox"]', els => els.map(el => el.outerHTML));
  console.log('listbox count', listboxes.length);
  listboxes.forEach((html, idx) => {
    console.log(`--- listbox ${idx}`);
    console.log(html.substring(0, 1000));
  });

  await browser.close();
})();