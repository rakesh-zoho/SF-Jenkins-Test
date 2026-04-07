# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\opportunity-creation.spec.js >> Opportunity Creation >> TC3.2: Create Two Opportunities → Same Account — Verify in List
- Location: tests\opportunity-creation.spec.js:407:3

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
  312 |       await captureScreenshot(page, 'opportunity-far-future-date-saved');
  313 |     });
  314 |   });
  315 | 
  316 |   test('TC2.5: Amount Field — Special Characters & Formatting', async ({ page }) => {
  317 |     const oppName = uniqueName('Agentic Test Amount Format');
  318 | 
  319 |     await sfStep('Navigate and Open Modal', page, async () => {
  320 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  321 |       await waitForSFLoad(page);
  322 |       await page.getByRole('button', { name: 'New' }).click();
  323 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  324 |     });
  325 | 
  326 |     await sfStep('Fill Form with Formatted Amount', page, async () => {
  327 |       await page.getByLabel('Opportunity Name').fill(oppName);
  328 |       await page.getByLabel('Account Name').fill('Acme Corp');
  329 |       await page.waitForTimeout(600);
  330 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  331 |       await page.getByLabel('Close Date').fill(getDatePlusDays(30));
  332 |       await page.getByLabel('Stage').click();
  333 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  334 |       await page.getByLabel('Amount').fill('50,000.50');
  335 |       // Tab away or click elsewhere to trigger formatting
  336 |       await page.getByLabel('Opportunity Name').click();
  337 |     });
  338 | 
  339 |     await sfStep('Save and Verify', page, async () => {
  340 |       const dialog = page.getByRole('dialog');
  341 |       await dialog.getByRole('button', { name: 'Save' }).click();
  342 |       await expect(dialog).not.toBeVisible();
  343 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  344 |       await expect(page.locator('.toastMessage')).toContainText('was created');
  345 |       await waitForSFLoad(page);
  346 |       await expect(page.getByText('50,000.50')).toBeVisible();
  347 |       await captureScreenshot(page, 'opportunity-amount-formatting');
  348 |     });
  349 |   });
  350 | 
  351 |   test('TC2.6: Account Lookup With Autocomplete', async ({ page }) => {
  352 |     await sfStep('Navigate and Open Modal', page, async () => {
  353 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  354 |       await waitForSFLoad(page);
  355 |       await page.getByRole('button', { name: 'New' }).click();
  356 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  357 |     });
  358 | 
  359 |     await sfStep('Test Autocomplete', page, async () => {
  360 |       const accountField = page.getByLabel('Account Name');
  361 |       await accountField.fill('Acm');
  362 |       await page.waitForTimeout(600);
  363 |       const option = page.getByRole('option', { name: /Acme Corp/ }).first();
  364 |       await expect(option).toBeVisible();
  365 |       await option.click();
  366 |       await expect(accountField).toHaveValue('Acme Corp');
  367 |       await captureScreenshot(page, 'account-lookup-autocomplete');
  368 |     });
  369 |   });
  370 | 
  371 |   // Suite 3: Multi-Step Workflows
  372 |   test('TC3.1: Create Opportunity → Edit Detail → Verify Changes', async ({ page }) => {
  373 |     const oppName = uniqueName('Agentic Test Edit');
  374 | 
  375 |     await sfStep('Create Opportunity', page, async () => {
  376 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  377 |       await waitForSFLoad(page);
  378 |       await page.getByRole('button', { name: 'New' }).click();
  379 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  380 |       await page.getByLabel('Opportunity Name').fill(oppName);
  381 |       await page.getByLabel('Account Name').fill('Acme Corp');
  382 |       await page.waitForTimeout(600);
  383 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  384 |       await page.getByLabel('Close Date').fill(getDatePlusDays(30));
  385 |       await page.getByLabel('Stage').click();
  386 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  387 |       await page.getByLabel('Amount').fill('50000');
  388 |       const dialog = page.getByRole('dialog');
  389 |       await dialog.getByRole('button', { name: 'Save' }).click();
  390 |       await expect(dialog).not.toBeVisible();
  391 |       await waitForSFLoad(page);
  392 |     });
  393 | 
  394 |     await sfStep('Edit Opportunity', page, async () => {
  395 |       await page.getByRole('button', { name: 'Edit' }).click();
  396 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  397 |       await page.getByLabel('Stage').click();
  398 |       await page.getByRole('option', { name: 'Qualification' }).click();
  399 |       await page.getByLabel('Amount').fill('75000');
  400 |       await captureScreenshot(page, 'opportunity-edit-stage-and-amount');
  401 |       const dialog = page.getByRole('dialog');
  402 |       await dialog.getByRole('button', { name: 'Save' }).click();
  403 |       await expect(dialog).not.toBeVisible();
  404 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  405 |       await expect(page.locator('.toastMessage')).toContainText('was saved');
  406 |       await waitForSFLoad(page);
  407 |       await expect(page.getByText('Qualification')).toBeVisible();
  408 |       await expect(page.getByText('75,000')).toBeVisible();
  409 |       await captureScreenshot(page, 'opportunity-after-edit-verification');
  410 |     });
  411 |   });
> 412 | 
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  413 |   test('TC3.2: Create Two Opportunities → Same Account — Verify in List', async ({ page }) => {
  414 |     const oppName1 = uniqueName('Agentic Test First');
  415 |     const oppName2 = uniqueName('Agentic Test Second');
  416 | 
  417 |     await sfStep('Create First Opportunity', page, async () => {
  418 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  419 |       await waitForSFLoad(page);
  420 |       await page.getByRole('button', { name: 'New' }).click();
  421 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  422 |       await page.getByLabel('Opportunity Name').fill(oppName1);
  423 |       await page.getByLabel('Account Name').fill('Acme Corp');
  424 |       await page.waitForTimeout(600);
  425 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  426 |       await page.getByLabel('Close Date').fill(getDatePlusDays(30));
  427 |       await page.getByLabel('Stage').click();
  428 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  429 |       await page.getByLabel('Amount').fill('50000');
  430 |       const dialog = page.getByRole('dialog');
  431 |       await dialog.getByRole('button', { name: 'Save' }).click();
  432 |       await expect(dialog).not.toBeVisible();
  433 |       await waitForSFLoad(page);
  434 |     });
  435 | 
  436 |     await sfStep('Create Second Opportunity', page, async () => {
  437 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  438 |       await waitForSFLoad(page);
  439 |       await page.getByRole('button', { name: 'New' }).click();
  440 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  441 |       await page.getByLabel('Opportunity Name').fill(oppName2);
  442 |       await page.getByLabel('Account Name').fill('Acme Corp');
  443 |       await page.waitForTimeout(600);
  444 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  445 |       await page.getByLabel('Close Date').fill(getDatePlusDays(37));
  446 |       await page.getByLabel('Stage').click();
  447 |       await page.getByRole('option', { name: 'Qualification' }).click();
  448 |       await page.getByLabel('Amount').fill('75000');
  449 |       const dialog = page.getByRole('dialog');
  450 |       await dialog.getByRole('button', { name: 'Save' }).click();
  451 |       await expect(dialog).not.toBeVisible();
  452 |       await waitForSFLoad(page);
  453 |     });
  454 | 
  455 |     await sfStep('Verify Both in List', page, async () => {
  456 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  457 |       await waitForSFLoad(page);
  458 |       await switchToAllRecords(page, 'Opportunities');
  459 |       await expect(page.getByRole('link', { name: new RegExp(oppName1) })).toBeVisible();
  460 |       await expect(page.getByRole('link', { name: new RegExp(oppName2) })).toBeVisible();
  461 |       await captureScreenshot(page, 'opportunities-list-multiple-records');
  462 |     });
  463 |   });
  464 | });
```