# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\opportunity-creation.spec.js >> Opportunity Creation >> TC1.6: Verify Record in List View
- Location: tests\opportunity-creation.spec.js:158:3

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
  63  | 
  64  |     await sfStep('Fill Opportunity Name', page, async () => {
  65  |       await page.getByLabel('Opportunity Name').fill(oppName);
  66  |       await expect(page.getByLabel('Opportunity Name')).toHaveValue(oppName);
  67  |     });
  68  | 
  69  |     await sfStep('Fill Account Name', page, async () => {
  70  |       await page.getByLabel('Account Name').fill('Acme Corp');
  71  |       await page.waitForTimeout(600);
  72  |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  73  |       await expect(page.getByLabel('Account Name')).toHaveValue('Acme Corp');
  74  |     });
  75  | 
  76  |     await sfStep('Fill Close Date', page, async () => {
  77  |       await page.getByLabel('Close Date').fill(closeDate);
  78  |       await expect(page.getByLabel('Close Date')).toHaveValue(closeDate);
  79  |     });
  80  | 
  81  |     await sfStep('Select Stage', page, async () => {
  82  |       await page.getByLabel('Stage').click();
  83  |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  84  |       await expect(page.getByLabel('Stage')).toHaveValue('Needs Analysis');
  85  |     });
  86  | 
  87  |     await sfStep('Fill Amount', page, async () => {
  88  |       await page.getByLabel('Amount').fill('50000');
  89  |       await expect(page.getByLabel('Amount')).toHaveValue('50000');
  90  |     });
  91  | 
  92  |     await captureScreenshot(page, 'opportunity-form-all-fields-filled');
  93  |   });
  94  | 
  95  |   test('TC1.4: Save Opportunity & Verify Toast', async ({ page }) => {
  96  |     const oppName = uniqueName('Agentic Test');
  97  |     const closeDate = getDatePlusDays(30);
  98  | 
  99  |     await sfStep('Navigate, Open Modal, and Fill Form', page, async () => {
  100 |       await page.getByRole('link', { name: 'Opportunities' }).click();
  101 |       await waitForSFLoad(page);
  102 |       await page.getByRole('button', { name: 'New' }).click();
  103 |       await page.getByRole('dialog').waitFor({ state: 'visible' });
  104 |       await page.getByLabel('Opportunity Name').fill(oppName);
  105 |       await page.getByLabel('Account Name').fill('Acme Corp');
  106 |       await page.waitForTimeout(600);
  107 |       await page.getByRole('option', { name: 'Acme Corp' }).first().click();
  108 |       await page.getByLabel('Close Date').fill(closeDate);
  109 |       await page.getByLabel('Stage').click();
  110 |       await page.getByRole('option', { name: 'Needs Analysis' }).click();
  111 |       await page.getByLabel('Amount').fill('50000');
  112 |     });
  113 | 
  114 |     await sfStep('Save Opportunity', page, async () => {
  115 |       const dialog = page.getByRole('dialog');
  116 |       await dialog.getByRole('button', { name: 'Save' }).click();
  117 |       await expect(dialog).not.toBeVisible();
  118 |       await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
  119 |       await expect(page.locator('.toastMessage')).toContainText('was created');
  120 |       await expect(page.url()).toContain('/Opportunity/');
  121 |       await captureScreenshot(page, 'opportunity-saved-success-toast');
  122 |     });
  123 |   });
  124 | 
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
> 163 |       await page.getByRole('link', { name: 'Opportunities' }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
```