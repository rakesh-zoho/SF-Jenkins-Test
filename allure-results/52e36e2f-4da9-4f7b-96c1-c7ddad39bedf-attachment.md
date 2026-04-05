# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lead-creation.spec.js >> Lead Creation >> Create Lead with Required Fields Only
- Location: tests\lead-creation.spec.js:42:3

# Error details

```
Error: expect.toBeVisible: Target page, context or browser has been closed
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import 'dotenv/config';
  3   | import { waitForSFLoad, switchToAllRecords } from '../utils/sf-helpers.js';
  4   | import { sfTest } from './seed.spec.js';
  5   | import { captureScreenshot, sfStep, setAllureMeta } from '../utils/reporter-utils.js';
  6   | 
  7   | // Reuse the saved Salesforce auth session
  8   | test.use({ storageState: './reports/.auth-state.json' });
  9   | 
  10  | /**
  11  |  * Lead Creation Test Suite
  12  |  * Epic: CRM
  13  |  * Feature: Lead Management
  14  |  * Story: Create Lead
  15  |  * Severity: Critical
  16  |  *
  17  |  * spec: specs/lead-creation-plan.md
  18  |  * seed: tests/seed.spec.js
  19  |  */
  20  | test.describe('Lead Creation', () => {
  21  |   test.beforeEach(async () => {
  22  |     // Set Allure metadata for all tests in this suite
  23  |     await setAllureMeta({
  24  |       epic: 'CRM',
  25  |       feature: 'Lead Management',
  26  |       story: 'Create Lead',
  27  |       severity: 'critical',
  28  |     });
  29  |   });
  30  | 
  31  |   test.afterEach(async ({ page }, testInfo) => {
  32  |     // Screenshot on failure
  33  |     if (testInfo.status !== 'passed') {
  34  |       await captureScreenshot(page, `failure-${testInfo.title.replace(/\s+/g, '-')}`);
  35  |     }
  36  |   });
  37  | 
  38  |   /**
  39  |    * Test 1.1: Create Lead with Required Fields Only
  40  |    * Verify that a Lead can be created with only the required fields filled in.
  41  |    */
  42  |   sfTest('Create Lead with Required Fields Only', async ({ sfPage: page }) => {
  43  |     // 1. Navigate to Leads app
  44  |     await sfStep('Navigate to Leads app', page, async () => {
  45  |       // HEALED: Using direct App Launcher navigation with specific locators
  46  |       await page.getByTitle('App Launcher').click({ timeout: 10000 });
  47  |       await page.waitForTimeout(500);
  48  |       await page.getByPlaceholder(/search/i).fill('Leads', { timeout: 5000 });
  49  |       await page.waitForTimeout(500);
  50  |       await page.getByRole('option', { name: /^Leads$/i }).click({ timeout: 5000 });
  51  |       await waitForSFLoad(page);
  52  |     });
  53  | 
  54  |     // 2. Click the "New" button on the Leads list view
  55  |     await sfStep('Click New button', page, async () => {
  56  |       await page.getByRole('button', { name: /^New$/i }).click();
  57  |       await waitForSFLoad(page);
  58  |       // HEALED: Form is in a dialog, not a plain form element
> 59  |       await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
      |                                              ^ Error: expect.toBeVisible: Target page, context or browser has been closed
  60  |     });
  61  | 
  62  |     // 3. Enter "John" in the First Name field
  63  |     await sfStep('Enter First Name: John', page, async () => {
  64  |       const firstNameInput = page.getByLabel(/First Name/i);
  65  |       await expect(firstNameInput).toBeVisible();
  66  |       await firstNameInput.fill('John');
  67  |       await expect(firstNameInput).toHaveValue('John');
  68  |     });
  69  | 
  70  |     // 4. Enter "Doe" in the Last Name field
  71  |     await sfStep('Enter Last Name: Doe', page, async () => {
  72  |       const lastNameInput = page.getByLabel(/Last Name/i);
  73  |       await expect(lastNameInput).toBeVisible();
  74  |       await lastNameInput.fill('Doe');
  75  |       await expect(lastNameInput).toHaveValue('Doe');
  76  |     });
  77  | 
  78  |     // 5. Enter "Acme Corporation" in the Company field
  79  |     await sfStep('Enter Company: Acme Corporation', page, async () => {
  80  |       const companyInput = page.getByLabel(/Company/i);
  81  |       await expect(companyInput).toBeVisible();
  82  |       await companyInput.fill('Acme Corporation');
  83  |       await expect(companyInput).toHaveValue('Acme Corporation');
  84  |     });
  85  | 
  86  |     // 6. Click the "Save" button
  87  |     await sfStep('Click Save button', page, async () => {
  88  |       await page.getByRole('button', { name: /^Save$/i }).click();
  89  |       await waitForSFLoad(page);
  90  |     });
  91  | 
  92  |     // Verify Lead record is created successfully
  93  |     await sfStep('Verify Lead created with correct details', page, async () => {
  94  |       // Should be redirected to the newly created Lead detail view
  95  |       await expect(page).toHaveURL(/lightning\/r\/Lead\//);
  96  | 
  97  |       // Verify fields display with correct information
  98  |       await expect(page.getByText('John')).toBeVisible();
  99  |       await expect(page.getByText('Doe')).toBeVisible();
  100 |       await expect(page.getByText('Acme Corporation')).toBeVisible();
  101 | 
  102 |       // Success message should appear (Salesforce typically shows "Saved" message)
  103 |       const successMsg = page.locator('.slds-notify__content, [role="alert"]');
  104 |       await expect(successMsg).toBeVisible({ timeout: 5000 });
  105 |     });
  106 | 
  107 |     // Verify Lead ID is generated and visible
  108 |     await sfStep('Verify Lead ID is generated', page, async () => {
  109 |       const leadId = page.locator('[data-test-id*="Lead-"], .record-id');
  110 |       await expect(leadId.or(page.locator('span:has-text("00Q")'))).toBeVisible({ timeout: 5000 });
  111 |     });
  112 |   });
  113 | 
  114 |   /**
  115 |    * Test 1.2: Create Lead with All Standard Fields
  116 |    * Verify that a Lead can be created with all standard fields populated.
  117 |    */
  118 |   sfTest('Create Lead with All Standard Fields', async ({ sfPage: page }) => {
  119 |     // 1. Navigate to Leads app
  120 |     await sfStep('Navigate to Leads app', page, async () => {
  121 |       // HEALED: Using direct App Launcher navigation with specific locators
  122 |       await page.getByTitle('App Launcher').click({ timeout: 10000 });
  123 |       await page.waitForTimeout(500);
  124 |       await page.getByPlaceholder(/search/i).fill('Leads', { timeout: 5000 });
  125 |       await page.waitForTimeout(500);
  126 |       await page.getByRole('option', { name: /^Leads$/i }).click({ timeout: 5000 });
  127 |       await waitForSFLoad(page);
  128 |     });
  129 | 
  130 |     // 2. Click the "New" button on the Leads list view
  131 |     await sfStep('Click New button', page, async () => {
  132 |       await page.getByRole('button', { name: /^New$/i }).click();
  133 |       await waitForSFLoad(page);
  134 |       // HEALED: Form is in a dialog, not a plain form element
  135 |       await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  136 |     });
  137 | 
  138 |     // 3. Enter "Jane" in the First Name field
  139 |     await sfStep('Enter First Name: Jane', page, async () => {
  140 |       const firstNameInput = page.getByLabel(/First Name/i);
  141 |       await expect(firstNameInput).toBeVisible();
  142 |       await firstNameInput.fill('Jane');
  143 |       await expect(firstNameInput).toHaveValue('Jane');
  144 |     });
  145 | 
  146 |     // 4. Enter "Smith" in the Last Name field
  147 |     await sfStep('Enter Last Name: Smith', page, async () => {
  148 |       const lastNameInput = page.getByLabel(/Last Name/i);
  149 |       await expect(lastNameInput).toBeVisible();
  150 |       await lastNameInput.fill('Smith');
  151 |       await expect(lastNameInput).toHaveValue('Smith');
  152 |     });
  153 | 
  154 |     // 5. Enter "Tech Innovations Inc" in the Company field
  155 |     await sfStep('Enter Company: Tech Innovations Inc', page, async () => {
  156 |       const companyInput = page.getByLabel(/Company/i);
  157 |       await expect(companyInput).toBeVisible();
  158 |       await companyInput.fill('Tech Innovations Inc');
  159 |       await expect(companyInput).toHaveValue('Tech Innovations Inc');
```