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

  const statuses = await page.evaluate(() => {
    const listbox = document.querySelector('div[role="listbox"][aria-label="Lead Status"]');
    if (!listbox) return null;
    const values = [];
    const items = listbox.querySelectorAll('lightning-base-combobox-item');
    for (const item of items) {
      const title = item.getAttribute('data-value') || '';
      const text = item.shadowRoot?.textContent?.trim() || '';
      values.push({title, text});
    }
    return values;
  });

  console.log('statuses from shadow:', statuses);

  await browser.close();
})();