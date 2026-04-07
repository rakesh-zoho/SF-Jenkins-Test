const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const baseURL = process.env.BASE_URL || process.env.SF_URL || 'https://nexturninc6.my.salesforce.com/';
  const statePath = './reports/.auth-state.json';
  if (!fs.existsSync(statePath)) {
    console.error('No storage state file');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: statePath });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);

  const navItems = await page.$$eval('a,button,span', els =>
    els
      .filter(el => el.textContent && /opportunities/i.test(el.textContent))
      .map(el => ({ tag: el.tagName, text: el.textContent.trim(), role: el.getAttribute('role') }))
      .slice(0, 50)
  );

  console.log('Nav items containing Opportunities:', JSON.stringify(navItems, null, 2));
  const linkCount = await page.locator('text=Opportunities').count();
  console.log('Text=Opportunities count:', linkCount);

  const roles = await page
    .locator('a,button')
    .evaluateAll(els =>
      els
        .map(el => ({ tag: el.tagName, text: el.innerText.trim(), role: el.getAttribute('role') }))
        .filter(x => /opportunities/i.test(x.text))
    );
  console.log('Anchor/button items with Opportunities:', JSON.stringify(roles.slice(0, 50), null, 2));

  await browser.close();
})();
