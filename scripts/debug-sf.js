import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'reports/.auth-state.json' });
  const page = await context.newPage();
  console.log('Navigating to Lead home...');
  await page.goto('https://nexturninc6.my.salesforce.com/lightning/o/Lead/home', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.getByRole('link', { name: 'Leads' }).waitFor({ state: 'visible', timeout: 90000 });
  await page.screenshot({ path: 'reports/screenshots/debug-lead-home.png' });
  console.log('Screenshot complete');
  await browser.close();
})();
