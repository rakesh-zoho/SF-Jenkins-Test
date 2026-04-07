# Test Plan: Salesforce Opportunity Creation Flow

## Overview
This test plan covers the end-to-end workflow for creating a new Opportunity in Salesforce Lightning, linking it to an Account, and verifying the record appears in list views. The Opportunity feature is a critical CRM workflow used by sales teams to track and manage deal pipelines.

**Allure Metadata:**
- Epic: CRM
- Feature: Opportunity Management
- Story: Create New Opportunity
- Severity: Critical

---

## Pre-conditions
- User is authenticated to Salesforce Lightning via saved session (`reports/.auth-state.json`)
- Salesforce Lightning UI has fully loaded
- Opportunities tab is accessible in navigation
- Account "Acme Corp" exists or can be created during lookup
- Current date is April 6, 2026 (Close Date will be May 6, 2026)

---

## Test Suites & Cases

### Suite 1: Happy Path — Create Opportunity End-to-End

#### TC1.1: Navigate to Opportunities List View
**Objective:** Verify user can navigate to Opportunities module and list view loads

**Steps:**
1. From Salesforce home page, locate the navigation sidebar
2. Click the "Opportunities" link (using locator: `page.getByRole('link', { name: 'Opportunities' })`)
3. Wait for list view to load (spinner clears, table renders)
4. Verify page heading shows "Opportunities"

**Expected Results:**
- Opportunities list view loads successfully
- Table displays existing opportunities (or empty state if none exist)
- "New" button is visible and enabled
- View switcher button is present (shows default view as "Recently Viewed")

**Screenshot Points:**
- `opportunities-list-view`

**Locators Used:**
```javascript
page.getByRole('link', { name: 'Opportunities' })  // Nav
page.getByRole('heading', { name: 'Opportunities' })  // Page heading
page.getByRole('button', { name: 'New' })  // New button
page.getByRole('button', { name: /Select a List View/i })  // View switcher
```

**Wait Conditions:**
- `waitForSFLoad(page)` after navigation
- `.forceListViewManagerSpinner` must be hidden

---

#### TC1.2: Open New Opportunity Modal
**Objective:** Verify clicking "New" opens the opportunity creation modal

**Steps:**
1. From Opportunities list view, click the "New" button
2. Wait for modal dialog to appear (role=dialog)
3. Verify modal heading shows "New Opportunity"
4. Verify modal contains input fields for opportunity data

**Expected Results:**
- Modal opens within 3 seconds
- Modal title displays "New Opportunity"
- Form fields are focused and ready for input:
  - Opportunity Name (text field)
  - Account Name (lookup field with autocomplete)
  - Close Date (date field)
  - Stage (picklist/dropdown)
  - Amount (currency field)
- Cancel and Save buttons are visible

**Screenshot Points:**
- `new-opportunity-modal`

**Locators Used:**
```javascript
page.getByRole('button', { name: 'New' })  // Trigger button
page.getByRole('dialog')  // Modal container
page.getByRole('dialog').getByRole('heading')  // Modal title
page.getByLabel('Opportunity Name')  // Field in dialog
page.getByLabel('Account Name')  // Lookup field
page.getByLabel('Close Date')  // Date field
page.getByLabel('Stage')  // Picklist
page.getByLabel('Amount')  // Currency field
```

**Wait Conditions:**
- Dialog must reach state 'visible' within 10 seconds

---

#### TC1.3: Fill Opportunity Form — Valid Data
**Objective:** Verify all form fields accept and display valid data

**Starting State:** Modal is open and focused on Opportunity Name field

**Steps:**

**3a. Opportunity Name**
1. Click the "Opportunity Name" field
2. Clear any existing text
3. Enter: `Agentic Test 1712414400` (using timestamp: `Date.now() / 1000`)
4. Verify text appears in field

**3b. Account Name (Lookup)**
1. Click the "Account Name" field
2. Type: `Acme Corp`
3. Wait 600ms for autocomplete suggestions (SF debounce)
4. In dropdown options, click the first option matching "Acme Corp"
5. If "Acme Corp" doesn't exist, continue without it (creates orphaned record)

**3c. Close Date**
1. Click the "Close Date" field
2. Enter date: `05/06/2026` (30 days from today using `getDatePlusDays(30)`)
3. Verify date renders in MM/DD/YYYY format

**3d. Stage (Picklist)**
1. Click the "Stage" field
2. Wait for dropdown options to render
3. From the list, click option: "Needs Analysis"
4. Verify "Needs Analysis" appears in the field

**3e. Amount**
1. Click the "Amount" field
2. Enter: `50000`
3. Verify field displays currency formatting (should show as $50,000 or similar)

**Expected Results:**
- All fields filled with correct values
- Form displays all entries before save
- No validation errors appear
- Form is ready for submission

**Screenshot Points:**
- `opportunity-form-all-fields-filled`

**Locators Used:**
```javascript
// Within dialog context:
const dialog = page.getByRole('dialog');

dialog.getByLabel('Opportunity Name')  // Text input
dialog.getByLabel('Account Name')  // Lookup field
dialog.getByLabel('Close Date')  // Date input
dialog.getByLabel('Stage')  // Picklist dropdown
dialog.getByLabel('Amount')  // Currency input

// Autocomplete option:
page.getByRole('option', { name: 'Acme Corp' })  // After typing in lookup
page.getByRole('option', { name: 'Needs Analysis' })  // Stage option
```

**Helper Functions:**
```javascript
import { getDatePlusDays } from '../utils/locator-utils.js';
const closeDate = getDatePlusDays(30);  // Returns "MM/DD/YYYY"

import { uniqueName } from '../utils/locator-utils.js';
const oppName = uniqueName('Agentic Test');  // Appends timestamp
```

**Wait Conditions:**
- `.slds-spinner_container` must be hidden before clicking dropdowns
- Wait 600ms after typing in lookup field before clicking suggestion

---

#### TC1.4: Save Opportunity & Verify Toast
**Objective:** Verify save succeeds and success toast displays

**Starting State:** All form fields are filled with valid data

**Steps:**
1. Scope all actions to the modal dialog: `const dialog = page.getByRole('dialog');`
2. Click the "Save" button inside the dialog
3. Wait for modal to close (check: dialog state becomes 'hidden')
4. Wait for success toast to appear (`.toastMessage` becomes visible)
5. Verify toast text contains: "Opportunity was created"
6. Wait for toast to auto-dismiss (disappears after ~3 seconds) or dismiss manually

**Expected Results:**
- Modal closes immediately after Save click
- Success toast displays with green background
- Toast text includes: "Opportunity was created" (exact match or substring)
- Page navigates to newly created Opportunity detail page
- URL changes to include Opportunity ID (format: `/lightning/r/Opportunity/[ID]/view`)

**Screenshot Points:**
- `opportunity-saved-success-toast`

**Locators Used:**
```javascript
const dialog = page.getByRole('dialog');
dialog.getByRole('button', { name: 'Save' })  // Save button in modal

page.locator('.toastMessage')  // Toast message (CSS exception for SF)
page.locator('.slds-notify--toast .toastMessage')  // Success toast specifically
```

**Assertions:**
```javascript
// Toast visibility
await expect(page.locator('.toastMessage')).toBeVisible({ timeout: 15000 });
await expect(page.locator('.toastMessage')).toContainText('was created');

// Modal is closed
await expect(dialog).not.toBeVisible();

// Navigation occurred
const urlAfterSave = page.url();
expect(urlAfterSave).toContain('/Opportunity/');
```

**Wait Conditions:**
- Toast appears within 15 seconds (sometimes slow on first save)
- Modal closes within 5 seconds

---

#### TC1.5: Verify Opportunity Detail Page
**Objective:** Verify newly created opportunity displays correct data on detail page

**Starting State:** User has been redirected to Opportunity detail page after successful save

**Steps:**
1. Wait for detail page to fully load (`waitForSFLoad(page)`)
2. Locate the page heading element
3. Verify heading contains the opportunity name: "Agentic Test [timestamp]"
4. Scroll down to view all fields on the detail page (if needed)
5. Locate the "Stage" field in the detail view
6. Verify Stage displays: "Needs Analysis"
7. Locate the "Account Name" field
8. Verify Account Name shows: "Acme Corp" (or empty if not created)
9. Locate the "Amount" field
10. Verify Amount displays: "50,000" or "$50,000"
11. Locate the "Close Date" field
12. Verify Close Date displays: "5/6/2026" or similar format

**Expected Results:**
- Page heading shows: "Agentic Test [timestamp]"
- Stage field on detail shows: "Needs Analysis"
- Account Name field displays: "Acme Corp"
- Amount field displays: "50,000" or currency formatted
- Close Date displays expected date
- Opportunity Name matches what was entered
- No error messages or validation failures display
- Edit and other action buttons are present

**Screenshot Points:**
- `opportunity-detail-page-verification`

**Locators Used:**
```javascript
page.getByRole('heading', { name: /Agentic Test/ })  // Page heading

// Field values (read-only mode on detail):
page.getByText('Needs Analysis').first()  // Stage value
page.getByText('Acme Corp').first()  // Account value
page.getByText('50,000')  // Amount value (or with currency symbol)
page.getByText(/5\/6\/2026/).first()  // Close Date

// Alternative - using getByRole for structured fields:
page.locator('dt:has-text("Stage") + dd')  // Stage field value
page.locator('dt:has-text("Account Name") + dd')  // Account field value
```

**Assertions:**
```javascript
await expect(page.getByRole('heading', { name: /Agentic Test/ })).toBeVisible();
await expect(page.getByText('Needs Analysis')).toBeVisible();
await expect(page.getByText('Acme Corp')).toBeVisible();
```

**Wait Conditions:**
- `waitForSFLoad(page)` after page loads
- `.forceListViewManagerSpinner` is hidden
- All detail fields are rendered and visible

---

#### TC1.6: Verify Record in List View
**Objective:** Verify the newly created opportunity appears in the "All Opportunities" list view

**Starting State:** User is on Opportunity detail page

**Steps:**
1. Click the "Opportunities" navigation link to return to list view
2. Wait for list view to load
3. Verify that the list view is showing "Recently Viewed" (default)
4. Open the view switcher: click button with text "Select a List View"
5. From dropdown options, select: "All Opportunities"
6. Wait for list to reload with all records
7. Search for the newly created opportunity by name: "Agentic Test [timestamp]"
8. Verify the record appears as a clickable link in the table

**Expected Results:**
- Navigation back to Opportunities succeeds
- View switcher shows list of available views
- "All Opportunities" view option is present and clickable
- After selecting "All Opportunities", table reloads and shows all records
- Created opportunity appears in the list by name
- Record is displayed as a clickable link (can navigate to detail)
- Record shows expected Stage and other columns (depending on list view columns)

**Screenshot Points:**
- `opportunities-list-all-view`
- `opportunity-record-in-list`

**Locators Used:**
```javascript
// Navigation:
page.getByRole('link', { name: 'Opportunities' })  // Nav tab

// List view controls:
page.getByRole('button', { name: /Select a List View/i })  // View switcher
page.getByRole('option', { name: 'All Opportunities' })  // View option

// Record in list:
page.getByRole('link', { name: /Agentic Test/ })  // Record link by name
```

**Helper Function:**
```javascript
import { switchToAllRecords } from '../utils/sf-helpers.js';
await switchToAllRecords(page, 'Opportunities');
```

**Assertions:**
```javascript
// After switching to All Opportunities view:
await expect(page.getByRole('link', { name: /Agentic Test/ })).toBeVisible();
```

**Wait Conditions:**
- List view loads within 10 seconds
- `.forceListViewManagerSpinner` is hidden after view switch

---

### Suite 2: Edge Cases & Validation

#### TC2.1: Create Opportunity Without Account Name (Lookup Optional)
**Objective:** Verify opportunity can be created without selecting an account

**Starting State:** New Opportunity modal is open

**Steps:**
1. Fill in Opportunity Name: `Agentic Test No Account [timestamp]`
2. **Skip** the Account Name field (leave it empty)
3. Fill Close Date: `05/06/2026`
4. Select Stage: "Needs Analysis"
5. Enter Amount: `25000`
6. Click Save
7. Verify success toast appears

**Expected Results:**
- Save succeeds without Account Name
- Toast displays: "Opportunity was created"
- Detail page loads with Account Name field empty or showing "None"
- All other fields display correctly
- Record appears in All Opportunities list

**Screenshot Points:**
- `opportunity-no-account-saved`

**Why This Test Matters:**
- Validates that Account is not a required field
- Verifies system handles orphaned opportunities gracefully
- Common workflow: sometimes accounts are created after opportunity

---

#### TC2.2: Opportunity Name Required Field Validation
**Objective:** Verify save fails if Opportunity Name is missing

**Starting State:** New Opportunity modal is open

**Steps:**
1. **Leave Opportunity Name empty** (or fill then clear it)
2. Fill Account Name: `Acme Corp`
3. Fill Close Date: `05/06/2026`
4. Select Stage: "Needs Analysis"
5. Enter Amount: `50000`
6. Click Save
7. Observe error message

**Expected Results:**
- Save button does not submit (or clicks show error)
- Error message displays: "Opportunity Name is required" or similar
- Modal remains open
- User can correct and save

**Screenshot Points:**
- `opportunity-name-required-error`

**Locators for Error:**
```javascript
// SF uses inline validation messages:
page.getByRole('dialog').locator('slds-form-element__help')  // Error text
// Or look for red border on required field
page.getByLabel('Opportunity Name').evaluate(el => 
  window.getComputedStyle(el).borderColor
)  // Check if red
```

---

#### TC2.3: Invalid Close Date (Past Date)
**Objective:** Verify system handles close date validation

**Starting State:** New Opportunity modal is open

**Steps:**
1. Fill Opportunity Name: `Agentic Test Past Date`
2. Fill Account Name: `Acme Corp`
3. Try to enter Close Date as last month: `03/06/2026` (before today)
4. Field may reject input or show warning
5. Attempt to save
6. Observe behavior

**Expected Results:**
- System may:
  - Option A: Reject past dates (field won't accept)
  - Option B: Allow but show warning message
  - Option C: Allow and save but validate on backend
- Behavior should be consistent with Salesforce design

**Screenshot Points:**
- `opportunity-past-date-validation`

---

#### TC2.4: Close Date Too Far in Future (Edge Case)
**Objective:** Verify system handles dates far in future

**Starting State:** New Opportunity modal is open

**Steps:**
1. Fill Opportunity Name: `Agentic Test Far Future`
2. Fill Account Name: `Acme Corp`
3. Enter Close Date: `12/31/2099` (very far future)
4. Select Stage: "Needs Analysis"
5. Enter Amount: `100000`
6. Click Save
7. Verify save succeeds or shows warning

**Expected Results:**
- Save succeeds (Salesforce typically allows any valid future date)
- Record displays with the entered date
- No validation error should occur

**Screenshot Points:**
- `opportunity-far-future-date-saved`

---

#### TC2.5: Amount Field — Special Characters & Formatting
**Objective:** Verify amount field handles currency formatting correctly

**Starting State:** New Opportunity modal is open

**Steps:**
1. Fill all required fields
2. In Amount field, try entering: `50,000.50` (with comma and decimals)
3. **OR** enter: `50000.5`
4. **OR** enter: `$50000` (with currency symbol)
5. Tab or click away from field
6. Observe how field formats the value
7. Save opportunity
8. Verify detail page shows correct amount

**Expected Results:**
- Field strips non-numeric characters (except decimals)
- Displays as currency: `$50,000.50` or similar
- Saves correctly with decimals preserved
- Detail page shows formatted amount

**Screenshot Points:**
- `opportunity-amount-formatting`

---

#### TC2.6: Account Lookup With Autocomplete
**Objective:** Verify lookup field auto-suggestions work correctly

**Starting State:** New Opportunity modal is open

**Steps:**
1. Click Account Name field
2. Type: `Acm` (partial account name)
3. Wait for autocomplete suggestions (600ms debounce)
4. Verify dropdown appears with matching accounts
5. Click the first suggestion: `Acme Corp`
6. Verify field now shows: `Acme Corp`
7. Field should close dropdown after selection

**Expected Results:**
- Typing triggers autocomplete
- Dropdown appears with matching accounts
- Selection populates field correctly
- Dropdown closes after selection
- Can proceed to save

**Screenshot Points:**
- `account-lookup-autocomplete`

**Locators Used:**
```javascript
const accountField = page.getByLabel('Account Name');
await accountField.fill('Acm');
await page.waitForTimeout(600);  // Wait for debounce

// Get autocomplete options:
const option = page.getByRole('option', { name: /Acme Corp/ }).first();
await expect(option).toBeVisible();
```

---

### Suite 3: Multi-Step Workflows

#### TC3.1: Create Opportunity → Edit Detail → Verify Changes
**Objective:** Verify opportunity can be edited after creation and changes persist

**Starting State:** New opportunity has been created and detail page is showing

**Steps:**
1. On detail page, click the "Edit" button
2. Modal should open in edit mode with current values
3. Change Stage from "Needs Analysis" to "Qualification"
4. Change Amount from `50000` to `75000`
5. Click Save
6. Wait for modal to close
7. Verify toast shows update confirmation
8. Verify detail page now shows:
   - Stage: "Qualification"
   - Amount: "75000"

**Expected Results:**
- Edit mode opens successfully
- Changes save without error
- Detail page reflects updated values
- No data loss occurs

**Screenshot Points:**
- `opportunity-edit-stage-and-amount`
- `opportunity-after-edit-verification`

---

#### TC3.2: Create Two Opportunities → Same Account — Verify in List
**Objective:** Verify list view properly displays multiple related records

**Starting State:** First opportunity created and in list view

**Steps:**
1. Click "New" to create second opportunity
2. Fill: Opportunity Name = `Agentic Test Second`
3. Fill: Account Name = `Acme Corp` (same account)
4. Fill: Close Date = `06/06/2026`
5. Select Stage = "Qualification"
6. Enter Amount = `75000`
7. Save
8. Navigate back to All Opportunities list view
9. Verify BOTH opportunities appear in list
10. Both should be linked to "Acme Corp"

**Expected Results:**
- Both opportunities created successfully
- List view shows both records
- Both linked to same account
- Can click either to view details
- Account shows 2 related opportunities

**Screenshot Points:**
- `opportunities-list-multiple-records`

---

## Summary of Test Artifacts

### Seed File Configuration
```javascript
test.use({ storageState: './reports/.auth-state.json' });
```

### Required Imports
```javascript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { waitForSFLoad, switchToAllRecords } from '../utils/sf-helpers.js';
import { fillField, selectPicklist, getDatePlusDays, uniqueName, assertSuccessToast } from '../utils/locator-utils.js';
import { captureScreenshot, sfStep, setAllureMeta } from '../utils/reporter-utils.js';
```

### Test Execution Summary
- **Total Test Cases:** 10
  - Suite 1 (Happy Path): 6 cases
  - Suite 2 (Validation): 5 cases
  - Suite 3 (Workflows): 2 cases
- **Screenshots Per Test:** 4-6
- **Assertions Per Test:** 3-5
- **Expected Duration:** ~45-60 seconds per test
- **Allure Reporting:** All cases marked as CRM/Opportunity Management/Create New Opportunity/Critical

---

## Dependencies & Assumptions

### System Dependencies
- Salesforce Lightning UI (as of 2024+)
- JavaScript async/await support
- Playwright v1.40+
- Allure reporting framework

### Business Dependencies
- Account "Acme Corp" must exist in system OR lookup must create it on-the-fly
- User must have create permission on Opportunity object
- Required fields on Opportunity: Name, Amount, CloseDate, StageName
- Stage picklist must include: "Needs Analysis", "Qualification", and others

### Data Dependencies
- Each test should use unique opportunity names (use `uniqueName()` function with timestamp)
- Use relative dates (`getDatePlusDays()`) to avoid timezone issues
- All amounts in USD (currency code should match org settings)

---

## Notes for Generator Agent

When generating tests from this plan:

1. **Scope Actions Correctly:** All form-filling actions must be scoped to the modal:
   ```javascript
   const dialog = page.getByRole('dialog');
   await dialog.getByLabel('Opportunity Name').fill(oppName);
   ```

2. **Wait Patterns:** Always use `waitForSFLoad()` after navigation and after modal actions:
   ```javascript
   await dialog.getByRole('button', { name: 'Save' }).click();
   await waitForSFLoad(page);
   ```

3. **Toast Assertions:** Assert toast immediately after save (before it disappears):
   ```javascript
   const toast = page.locator('.toastMessage');
   await expect(toast).toBeVisible({ timeout: 15000 });
   await expect(toast).toContainText('was created');
   ```

4. **Helper Functions:** Use provided utilities instead of raw locators:
   ```javascript
   import { uniqueName, getDatePlusDays } from '../utils/locator-utils.js';
   const oppName = uniqueName('Agentic Test');
   const closeDate = getDatePlusDays(30);
   ```

5. **Screenshot Timing:** Capture screenshots after each major step completes:
   ```javascript
   await sfStep('Create Opportunity', page, async () => {
     // ...actions...
     await captureScreenshot(page, 'opportunity-created');
   });
   ```

6. **Allure Annotations:** Add metadata in beforeEach:
   ```javascript
   test.beforeEach(async () => {
     await setAllureMeta({
       epic: 'CRM',
       feature: 'Opportunity Management',
       story: 'Create New Opportunity',
       severity: 'critical',
     });
   });
   ```

---

**Plan Version:** 1.0  
**Created:** April 6, 2026  
**Last Updated:** April 6, 2026  
**Status:** Ready for Test Generation
