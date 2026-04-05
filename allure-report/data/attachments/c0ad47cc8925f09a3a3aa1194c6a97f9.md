# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lead-creation.spec.js >> seed: Salesforce login and Lightning shell loads
- Location: tests\seed.spec.js:47:1

# Error details

```
Error: Not on Salesforce domain
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import 'dotenv/config';
  3  | import { waitForSFLoad } from '../utils/sf-helpers.js';
  4  | 
  5  | /**
  6  |  * SEED SPEC — Salesforce Login Fixture
  7  |  * ─────────────────────────────────────
  8  |  * This file is the foundation for all agent-generated tests.
  9  |  * The Playwright Test Agents (Planner, Generator, Healer) read this
  10 |  * and copy the auth pattern into every .spec.js they produce.
  11 |  *
  12 |  * Auth state is written by globalSetup (utils/sf-helpers.js) and
  13 |  * reused here via storageState so no re-login occurs per test.
  14 |  */
  15 | 
  16 | // Reuse the saved Salesforce auth session
  17 | test.use({ storageState: './reports/.auth-state.json' });
  18 | 
  19 | /**
  20 |  * Extended test fixture: sfPage
  21 |  * Provides a pre-authenticated Salesforce Lightning page with blocked permissions.
  22 |  * Generator agent should use this in all generated tests.
  23 |  */
  24 | export const sfTest = test.extend({
  25 |   sfPage: async ({ browser }, use) => {
  26 |     // Create context with NO permissions allowed (blocks notifications, camera, microphone, etc.)
  27 |     const context = await browser.newContext({
  28 |       storageState: './reports/.auth-state.json',
  29 |       permissions: [], // Block all permissions
  30 |     });
  31 |     
  32 |     const page = await context.newPage();
  33 |     await page.goto(process.env.SF_URL);
  34 |     await waitForSFLoad(page);
  35 |     
  36 |     await use(page);
  37 |     
  38 |     // Cleanup
  39 |     await context.close();
  40 |   },
  41 | });
  42 | 
  43 | /**
  44 |  * Seed health check — verifies the auth setup works.
  45 |  * Agents run this first to confirm login is working before proceeding.
  46 |  */
  47 | test('seed: Salesforce login and Lightning shell loads', async ({ browser }) => {
  48 |   // Create context with blocked permissions
  49 |   const context = await browser.newContext({
  50 |     storageState: './reports/.auth-state.json',
  51 |     permissions: [], // Block all browser permissions
  52 |   });
  53 |   
  54 |   const page = await context.newPage();
  55 |   try {
  56 |     await page.goto(process.env.SF_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  57 |     await waitForSFLoad(page);
  58 | 
  59 |     // Verify we're on Salesforce and not on login page
  60 |     const checks = await page.evaluate(() => {
  61 |       return {
  62 |         isOnSalesforce: window.location.hostname.includes('salesforce'),
  63 |         isNotOnLogin: !window.location.href.includes('/login'),
  64 |         pageTitle: document.title,
  65 |       };
  66 |     });
  67 |     
  68 |     if (!checks.isOnSalesforce) {
> 69 |       throw new Error('Not on Salesforce domain');
     |             ^ Error: Not on Salesforce domain
  70 |     }
  71 |     
  72 |     if (!checks.isNotOnLogin) {
  73 |       throw new Error('Still on login page');
  74 |     }
  75 |     
  76 |     console.log('✓ Auth valid, page:', checks.pageTitle);
  77 |   } finally {
  78 |     // Should NOT be on login page
  79 |     await expect(page).not.toHaveURL(/login/);
  80 |     
  81 |     // Cleanup
  82 |     await context.close();
  83 |   }
  84 | });
  85 | 
```