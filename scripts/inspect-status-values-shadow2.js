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

  const listboxes = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('div[role="listbox"]'));
    return nodes.map(n => ({label:n.getAttribute('aria-label'), html:n.outerHTML.slice(0, 300)}));
  });

  console.log('listboxes', listboxes);

  await browser.close();
})();