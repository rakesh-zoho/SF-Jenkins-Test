# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\opportunity-creation.spec.js >> Opportunity Creation >> TC2.5: Amount Field — Special Characters & Formatting
- Location: tests\opportunity-creation.spec.js:310:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Opportunities' })

```

# Test source

```ts
  214 |       await expect(dialog).not.toBeVisible();
  215 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  216 |       await expect(page.locator('.toastMessage')).toContainText('was created');
  217 |       await waitForSFLoad(page);
  218 |       await expect(page.getByRole('heading', { name: new RegExp(oppName) })).toBeVisible();
  219 |       await captureScreenshot(page, 'opportunity-no-account-saved');
  220 |     });
  221 |   });
  222 | 
  223 |   test('TC2.2: Opportunity Name Required Field Validation', async ({ page }) => {
  224 |     await sfStep('Navigate and Open Modal', page, async () => {
  225 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  226 |       await waitForSFLoad(page);
  227 |       await page.getByRole('button', { name: 'New' }).click();
  228 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  229 |     });
  230 | 
  231 |     await sfStep('Fill Form Without Name', page, async () => {
  232 |       await page.getByLabel('Account Name').fill('Acme Corp');
  233 |       await page.waitForTimeout(600);
  234 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  235 |       await page.getByLabel('Close Date').fill(getDatePlusDays(30));
  236 |       await page.getByLabel('Stage').click();
  237 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  238 |       await page.getByLabel('Amount').fill('50000');
  239 |     });
  240 | 
  241 |     await sfStep('Attempt Save and Check Error', page, async () => {
  242 |       const dialog = page.getByRole('dialog');
  243 |       await dialog.getByRole('button', { name: 'Save' }).click();
  244 |       // Assuming error appears
  245 |       await expect(page.getByRole('dialog').locator('.slds-form-element__help')).toBeVisible();
  246 |       await captureScreenshot(page, 'opportunity-name-required-error');
  247 |     });
  248 |   });
  249 | 
  250 |   test('TC2.3: Invalid Close Date (Past Date)', async ({ page }) => {
  251 |     await sfStep('Navigate and Open Modal', page, async () => {
  252 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  253 |       await waitForSFLoad(page);
  254 |       await page.getByRole('button', { name: 'New' }).click();
  255 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  256 |     });
  257 | 
  258 |     await sfStep('Fill Form with Past Date', page, async () => {
  259 |       await page.getByLabel('Opportunity Name').fill(uniqueName('Agentic Test Past Date'));
  260 |       await page.getByLabel('Account Name').fill('Acme Corp');
  261 |       await page.waitForTimeout(600);
  262 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  263 |       await page.getByLabel('Close Date').fill('03/06/2026'); // Past date
  264 |       await page.getByLabel('Stage').click();
  265 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  266 |       await page.getByLabel('Amount').fill('50000');
  267 |     });
  268 | 
  269 |     await sfStep('Attempt Save', page, async () => {
  270 |       const dialog = page.getByRole('dialog');
  271 |       await dialog.getByRole('button', { name: 'Save' }).click();
  272 |       // Observe behavior - may succeed or show error
  273 |       await captureScreenshot(page, 'opportunity-past-date-validation');
  274 |     });
  275 |   });
  276 | 
  277 |   test('TC2.4: Close Date Too Far in Future', async ({ page }) => {
  278 |     const oppName = uniqueName('Agentic Test Far Future');
  279 | 
  280 |     await sfStep('Navigate and Open Modal', page, async () => {
  281 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  282 |       await waitForSFLoad(page);
  283 |       await page.getByRole('button', { name: 'New' }).click();
  284 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  285 |     });
  286 | 
  287 |     await sfStep('Fill Form with Far Future Date', page, async () => {
  288 |       await page.getByLabel('Opportunity Name').fill(oppName);
  289 |       await page.getByLabel('Account Name').fill('Acme Corp');
  290 |       await page.waitForTimeout(600);
  291 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  292 |       await page.getByLabel('Close Date').fill('12/31/2099');
  293 |       await page.getByLabel('Stage').click();
  294 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  295 |       await page.getByLabel('Amount').fill('100000');
  296 |     });
  297 | 
  298 |     await sfStep('Save and Verify', page, async () => {
  299 |       const dialog = page.getByRole('dialog');
  300 |       await dialog.getByRole('button', { name: 'Save' }).click();
  301 |       await expect(dialog).not.toBeVisible();
  302 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  303 |       await expect(page.locator('.toastMessage')).toContainText('was created');
  304 |       await waitForSFLoad(page);
  305 |       await expect(page.getByRole('heading', { name: new RegExp(oppName) })).toBeVisible();
  306 |       await captureScreenshot(page, 'opportunity-far-future-date-saved');
  307 |     });
  308 |   });
  309 | 
  310 |   test('TC2.5: Amount Field — Special Characters & Formatting', async ({ page }) => {
  311 |     const oppName = uniqueName('Agentic Test Amount Format');
  312 | 
  313 |     await sfStep('Navigate and Open Modal', page, async () => {
> 314 |       await page.getByRole('link', { name: 'Opportunities' }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  315 |       await waitForSFLoad(page);
  316 |       await page.getByRole('button', { name: 'New' }).click();
  317 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  318 |     });
  319 | 
  320 |     await sfStep('Fill Form with Formatted Amount', page, async () => {
  321 |       await page.getByLabel('Opportunity Name').fill(oppName);
  322 |       await page.getByLabel('Account Name').fill('Acme Corp');
  323 |       await page.waitForTimeout(600);
  324 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  325 |       await page.getByLabel('Close Date').fill(getDatePlusDays(30));
  326 |       await page.getByLabel('Stage').click();
  327 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  328 |       await page.getByLabel('Amount').fill('50,000.50');
  329 |       // Tab away or click elsewhere to trigger formatting
  330 |       await page.getByLabel('Opportunity Name').click();
  331 |     });
  332 | 
  333 |     await sfStep('Save and Verify', page, async () => {
  334 |       const dialog = page.getByRole('dialog');
  335 |       await dialog.getByRole('button', { name: 'Save' }).click();
  336 |       await expect(dialog).not.toBeVisible();
  337 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  338 |       await expect(page.locator('.toastMessage')).toContainText('was created');
  339 |       await waitForSFLoad(page);
  340 |       await expect(page.getByText('50,000.50')).toBeVisible();
  341 |       await captureScreenshot(page, 'opportunity-amount-formatting');
  342 |     });
  343 |   });
  344 | 
  345 |   test('TC2.6: Account Lookup With Autocomplete', async ({ page }) => {
  346 |     await sfStep('Navigate and Open Modal', page, async () => {
  347 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  348 |       await waitForSFLoad(page);
  349 |       await page.getByRole('button', { name: 'New' }).click();
  350 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  351 |     });
  352 | 
  353 |     await sfStep('Test Autocomplete', page, async () => {
  354 |       const accountField = page.getByLabel('Account Name');
  355 |       await accountField.fill('Acm');
  356 |       await page.waitForTimeout(600);
  357 |       const option = page.getByRole('option', { name: /Acme Corp/ }).first();
  358 |       await expect(option).toBeVisible();
  359 |       await option.click();
  360 |       await expect(accountField).toHaveValue('Acme Corp');
  361 |       await captureScreenshot(page, 'account-lookup-autocomplete');
  362 |     });
  363 |   });
  364 | 
  365 |   // Suite 3: Multi-Step Workflows
  366 |   test('TC3.1: Create Opportunity → Edit Detail → Verify Changes', async ({ page }) => {
  367 |     const oppName = uniqueName('Agentic Test Edit');
  368 | 
  369 |     await sfStep('Create Opportunity', page, async () => {
  370 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  371 |       await waitForSFLoad(page);
  372 |       await page.getByRole('button', { name: 'New' }).click();
  373 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  374 |       await page.getByLabel('Opportunity Name').fill(oppName);
  375 |       await page.getByLabel('Account Name').fill('Acme Corp');
  376 |       await page.waitForTimeout(600);
  377 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  378 |       await page.getByLabel('Close Date').fill(getDatePlusDays(30));
  379 |       await page.getByLabel('Stage').click();
  380 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  381 |       await page.getByLabel('Amount').fill('50000');
  382 |       const dialog = page.getByRole('dialog');
  383 |       await dialog.getByRole('button', { name: 'Save' }).click();
  384 |       await expect(dialog).not.toBeVisible();
  385 |       await waitForSFLoad(page);
  386 |     });
  387 | 
  388 |     await sfStep('Edit Opportunity', page, async () => {
  389 |       await page.getByRole('button', { name: 'Edit' }).click();
  390 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  391 |       await page.getByLabel('Stage').click();
  392 |       await page.getByRole('option', { name: 'Qualification' }).click();
  393 |       await page.getByLabel('Amount').fill('75000');
  394 |       await captureScreenshot(page, 'opportunity-edit-stage-and-amount');
  395 |       const dialog = page.getByRole('dialog');
  396 |       await dialog.getByRole('button', { name: 'Save' }).click();
  397 |       await expect(dialog).not.toBeVisible();
  398 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  399 |       await expect(page.locator('.toastMessage')).toContainText('was saved');
  400 |       await waitForSFLoad(page);
  401 |       await expect(page.getByText('Qualification')).toBeVisible();
  402 |       await expect(page.getByText('75,000')).toBeVisible();
  403 |       await captureScreenshot(page, 'opportunity-after-edit-verification');
  404 |     });
  405 |   });
  406 | 
  407 |   test('TC3.2: Create Two Opportunities → Same Account — Verify in List', async ({ page }) => {
  408 |     const oppName1 = uniqueName('Agentic Test First');
  409 |     const oppName2 = uniqueName('Agentic Test Second');
  410 | 
  411 |     await sfStep('Create First Opportunity', page, async () => {
  412 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  413 |       await waitForSFLoad(page);
  414 |       await page.getByRole('button', { name: 'New' }).click();
```