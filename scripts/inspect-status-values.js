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

  const items = await page.$$eval('lightning-base-combobox-item', els =>
    els.map(e => e.textContent?.trim() || '').filter(Boolean)
  );

  console.log('status items', items);
  await browser.close();
})();