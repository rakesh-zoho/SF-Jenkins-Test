const { chromium } = require('playwright');
require('dotenv').config();
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: './reports/.auth-state.json' });
  const page = await context.newPage();
  const url = process.env.SF_URL;
  console.log('NAVIGATING', url);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  console.log('URL', page.url());
  console.log('AppLauncher title count', await page.locator('[title="App Launcher"]').count());
  console.log('AppLauncher button has-text count', await page.locator('button:has-text("App Launcher")').count());
  console.log('AppLauncher getByRole count', await page.getByRole('button', { name: /App Launcher/i }).count());
  console.log('AppLauncher visible?', await page.getByRole('button', { name: /App Launcher/i }).isVisible().catch(e => e.message));
  await browser.close();
})();
