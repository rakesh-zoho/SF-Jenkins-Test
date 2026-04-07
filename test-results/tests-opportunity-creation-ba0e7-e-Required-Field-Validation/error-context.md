# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\opportunity-creation.spec.js >> Opportunity Creation >> TC2.2: Opportunity Name Required Field Validation
- Location: tests\opportunity-creation.spec.js:223:3

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
  125 |   test('TC1.5: Verify Opportunity Detail Page', async ({ page }) => {
  126 |     const oppName = uniqueName('Agentic Test');
  127 |     const closeDate = getDatePlusDays(30);
  128 | 
  129 |     await sfStep('Create Opportunity', page, async () => {
  130 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  131 |       await waitForSFLoad(page);
  132 |       await page.getByRole('button', { name: 'New' }).click();
  133 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  134 |       await page.getByLabel('Opportunity Name').fill(oppName);
  135 |       await page.getByLabel('Account Name').fill('Acme Corp');
  136 |       await page.waitForTimeout(600);
  137 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  138 |       await page.getByLabel('Close Date').fill(closeDate);
  139 |       await page.getByLabel('Stage').click();
  140 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  141 |       await page.getByLabel('Amount').fill('50000');
  142 |       const dialog = page.getByRole('dialog');
  143 |       await dialog.getByRole('button', { name: 'Save' }).click();
  144 |       await expect(dialog).not.toBeVisible();
  145 |       await waitForSFLoad(page);
  146 |     });
  147 | 
  148 |     await sfStep('Verify Opportunity Detail Page', page, async () => {
  149 |       await expect(page.getByRole('heading', { name: new RegExp(oppName) })).toBeVisible();
  150 |       await expect(page.getByText('Needs Analysis')).toBeVisible();
  151 |       await expect(page.getByText('Acme Corp')).toBeVisible();
  152 |       await expect(page.getByText('50,000')).toBeVisible();
  153 |       await expect(page.getByText(new RegExp(closeDate.replace(/\//g, '\\/')))).toBeVisible();
  154 |       await captureScreenshot(page, 'opportunity-detail-page-verification');
  155 |     });
  156 |   });
  157 | 
  158 |   test('TC1.6: Verify Record in List View', async ({ page }) => {
  159 |     const oppName = uniqueName('Agentic Test');
  160 |     const closeDate = getDatePlusDays(30);
  161 | 
  162 |     await sfStep('Create Opportunity', page, async () => {
  163 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  164 |       await waitForSFLoad(page);
  165 |       await page.getByRole('button', { name: 'New' }).click();
  166 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  167 |       await page.getByLabel('Opportunity Name').fill(oppName);
  168 |       await page.getByLabel('Account Name').fill('Acme Corp');
  169 |       await page.waitForTimeout(600);
  170 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  171 |       await page.getByLabel('Close Date').fill(closeDate);
  172 |       await page.getByLabel('Stage').click();
  173 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  174 |       await page.getByLabel('Amount').fill('50000');
  175 |       const dialog = page.getByRole('dialog');
  176 |       await dialog.getByRole('button', { name: 'Save' }).click();
  177 |       await expect(dialog).not.toBeVisible();
  178 |       await waitForSFLoad(page);
  179 |     });
  180 | 
  181 |     await sfStep('Verify Record in List View', page, async () => {
  182 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  183 |       await waitForSFLoad(page);
  184 |       await switchToAllRecords(page, 'Opportunities');
  185 |       await expect(page.getByRole('link', { name: new RegExp(oppName) })).toBeVisible();
  186 |       await captureScreenshot(page, 'opportunities-list-all-view');
  187 |       await captureScreenshot(page, 'opportunity-record-in-list');
  188 |     });
  189 |   });
  190 | 
  191 |   // Suite 2: Edge Cases & Validation
  192 |   test('TC2.1: Create Opportunity Without Account Name', async ({ page }) => {
  193 |     const oppName = uniqueName('Agentic Test No Account');
  194 |     const closeDate = getDatePlusDays(30);
  195 | 
  196 |     await sfStep('Navigate and Open Modal', page, async () => {
  197 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  198 |       await waitForSFLoad(page);
  199 |       await page.getByRole('button', { name: 'New' }).click();
  200 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  201 |     });
  202 | 
  203 |     await sfStep('Fill Form Without Account', page, async () => {
  204 |       await page.getByLabel('Opportunity Name').fill(oppName);
  205 |       await page.getByLabel('Close Date').fill(closeDate);
  206 |       await page.getByLabel('Stage').click();
  207 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  208 |       await page.getByLabel('Amount').fill('25000');
  209 |     });
  210 | 
  211 |     await sfStep('Save and Verify', page, async () => {
  212 |       const dialog = page.getByRole('dialog');
  213 |       await dialog.getByRole('button', { name: 'Save' }).click();
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
> 225 |       await page.getByRole('link', { name: 'Opportunities' }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  314 |       await page.getByRole('link', { name: 'Opportunities' }).click();
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
```