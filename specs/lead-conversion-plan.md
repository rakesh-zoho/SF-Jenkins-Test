# Lead Conversion Test Plan

**Feature**: Lead Management  
**Epic**: CRM  
**Feature**: Lead Conversion  
**Story**: Convert Lead to Account/Contact/Opportunity  
**Severity**: Critical  
**Priority**: P1  

---

## Overview

This test plan covers the complete Salesforce Lightning Lead Conversion flow. Lead conversion creates three new related records: Account, Contact, and Opportunity. Tests validate happy path scenarios and critical edge cases.

---

## Test Data Strategy

All test data uses **timestamp-based uniqueness** to prevent collisions:

```javascript
const timestamp = Date.now();
const uniqueName = (base) => `${base}-${timestamp}`;
```

Example:
- Lead Name: `John Doe-1715419803000`
- Account Name: `Tech Corp-1715419803000`
- Email: `john.doe.1715419803000@test-conversion.example.com`

---

## Pre-Test Requirements

| Requirement | Details |
|---|---|
| **Auth State** | Use `reports/.auth-state.json` from globalSetup |
| **Test User** | Rakesh Sharma (rakesh.sharma@nexturn.com.sfpartner) |
| **Permissions** | User must have Convert Lead permission |
| **Sales App** | Must be accessible; Leads tab visible |
| **Test Leads** | At least 3 leads with "Open" status (or create via API) |

---

## Page Elements & Locators

### Leads List View
| Element | Locator | Notes |
|---|---|---|
| Leads Tab | `getByRole('link', { name: 'Leads' })` | Primary navigation |
| List View Selector | `getByRole('button', { name: /Select a List View/i })` | Opens dropdown |
| All Leads Option | `getByRole('option', { name: 'All Leads' })` | Switch to all records |
| Lead Name Link | `getByRole('link', { name: LEAD_NAME })` | Click to open detail |
| Lead Status Column | `table cell` showing "Open" or "Converted" | Verification point |
| Search Field | `getByPlaceholder('Search this list...')` | Filter leads |

### Lead Detail Page
| Element | Locator | Notes |
|---|---|---|
| Lead Heading | `getByRole('heading', { name: LEAD_NAME })` | Confirm page loaded |
| Convert Button | `getByRole('button', { name: 'Convert' })` | Initiates conversion |
| Edit Button | `getByRole('button', { name: 'Edit' })` | For pre-conversion edits |
| Delete Button | `getByRole('button', { name: 'Delete' })` | Remove lead (cleanup) |
| Status Indicator | `getByText('Open')` or `getByText('Converted')` | Current status |

### Convert Lead Modal
| Section | Field | Locator | Type | Required |
|---|---|---|---|---|
| **Account** | Account Name | `getByLabel('Account Name')` within dialog | Text Input | Yes |
| | Create New Account | Radio button (first of pair) | Radio | - |
| | Choose Existing Account | Radio button (second of pair) | Radio | - |
| | Account Search | `getByPlaceholder('Search for matching accounts')` | Lookup | Conditional |
| **Contact** | Contact Name | `getByLabel('Contact Name')` within dialog | Auto-filled | - |
| | First Name | `getByLabel('First Name')` within dialog | Text Input | Conditional |
| | Last Name | `getByLabel('Last Name')` within dialog | Text Input | Yes* |
| | Salutation | `getByLabel('Salutation')` or `--None--` | Dropdown | No |
| | Create New Contact | Radio button (first of pair) | Radio | - |
| | Choose Existing Contact | Radio button (second of pair) | Radio | - |
| | Contact Search | `getByPlaceholder('Search for matching contacts')` | Lookup | Conditional |
| **Opportunity** | Opportunity Name | `getByLabel('Opportunity Name')` within dialog | Text Input | Conditional |
| | Create New Opportunity | Radio button (first of pair) | Radio | - |
| | Don't create opportunity | `getByLabel(/Don't create an opportunity/i)` | Checkbox | No |
| | Choose Existing Opportunity | Radio button (second of pair) | Radio | Conditional |
| **Other** | Record Owner | `getByLabel('Record Owner')` within dialog | Lookup | Auto (Current User) |
| | Converted Status | `getByLabel('*Converted Status')` within dialog | Dropdown | Yes |
| | Update Lead Source | `getByLabel('Update Lead Source')` within dialog | Checkbox | No |

### Conversion Success Screen
| Element | Locator | Notes |
|---|---|---|
| Success Message | `getByText('Your lead has been converted')` | Primary confirmation |
| Account Card | `getByText('ACCOUNT')` and account name link | Shows created account |
| Contact Card | `getByText('CONTACT')` and contact name link | Shows created contact |
| Opportunity Card | `getByText('OPPORTUNITY')` and opportunity name link | Shows created opportunity (if created) |
| Go to Leads Button | `getByRole('button', { name: 'Go to Leads' })` | Return to list |
| New Task Button | `getByRole('button', { name: 'New Task' })` | Create related task |

---

## Test Scenarios

### Test 1: Happy Path — Full Conversion with All Three Records ✅

**Scenario**: Convert an open lead into new Account, Contact, and Opportunity.

**Preconditions**:
- Navigate to Salesforce Leads tab
- Select an open lead (e.g., "Jane Smith - {timestamp}")

**Steps**:

| # | Step | Locator/Action | Expected Result | Screenshot |
|---|---|---|---|---|
| 1 | Navigate to Leads | Click `Leads` tab in navigation | Leads list loads; "Recently Viewed" view shown | `01-leads-list-view` |
| 2 | Switch to All Open Leads | Click list view selector → "All Open Leads" | List refreshes showing all open leads | `02-all-open-leads-view` |
| 3 | Search for test lead | Use search field: "Jane Smith" | Lead appears in filtered list | `03-search-results` |
| 4 | Click lead name | `getByRole('link', { name: /Jane Smith.*timestamp/ })` | Lead detail page loads; heading shows name; status shows "Open" | `04-lead-detail-open` |
| 5 | Click Convert button | `getByRole('button', { name: 'Convert' })` | Convert Lead modal opens; Account/Contact/Opportunity sections visible | `05-convert-modal-open` |
| 6 | Verify Account Name | Assert `getByLabel('Account Name')` has value `Tech Corp-{timestamp}` | Field pre-filled from Lead Company | `06-account-field-prefilled` |
| 7 | Verify Contact Name | Assert `getByLabel('Contact Name')` has value `Jane Smith-{timestamp}` | Field pre-filled from Lead Name | `07-contact-field-prefilled` |
| 8 | Verify Opportunity auto-name | Assert `getByLabel('Opportunity Name')` has value prefix `Tech Corp-{timestamp}` | Field pre-filled from Account Name | `08-opportunity-field-prefilled` |
| 9 | Verify Create New Account selected | Assert first Account radio checked | "Create New Account" is default selection | `09-account-radio-checked` |
| 10 | Verify Create New Contact selected | Assert first Contact radio checked | "Create New Contact" is default selection | `10-contact-radio-checked` |
| 11 | Verify Create New Opportunity selected | Assert first Opportunity radio checked | "Create New Opportunity" is default selection | `11-opportunity-radio-checked` |
| 12 | Update Opportunity Name | `getByLabel('Opportunity Name').clear()` then fill with `Sales Opportunity-{timestamp}` | Field shows new value | `12-opportunity-name-updated` |
| 13 | Click Convert button in modal | `dialog.getByRole('button', { name: 'Convert' })` | Modal closes; success screen appears | `13-conversion-in-progress` |
| 14 | Verify success message | Assert `getByText('Your lead has been converted')` visible | Success message displays | `14-conversion-success-message` |
| 15 | Verify Account card | Assert `getByText('ACCOUNT')` card shows "Tech Corp-{timestamp}" | Account name and owner displayed | `15-account-card` |
| 16 | Verify Contact card | Assert `getByText('CONTACT')` card shows "Jane Smith-{timestamp}" | Contact name and account reference displayed | `16-contact-card` |
| 17 | Verify Opportunity card | Assert `getByText('OPPORTUNITY')` card shows "Sales Opportunity-{timestamp}" | Opportunity name and close date displayed | `17-opportunity-card` |
| 18 | Click Go to Leads | `getByRole('button', { name: 'Go to Leads' })` | Navigates to Leads list | `18-leads-list-after-conversion` |
| 19 | Verify lead status updated | Search/filter for "Jane Smith-{timestamp}" and verify status column | Lead status = "Converted" | `19-lead-converted-status` |

**Assertions**:
- ✅ Convert modal opens successfully
- ✅ Account/Contact/Opportunity fields pre-filled correctly
- ✅ Convert button is enabled and clickable
- ✅ Success message displays "Your lead has been converted"
- ✅ All three cards (Account, Contact, Opportunity) display on success screen
- ✅ Created records have correct values
- ✅ Lead status updated to "Converted" in list view

**Data Cleanup (afterAll)**:
```javascript
// Delete created records via Salesforce API
await deleteRecordByName('Account', 'Tech Corp-{timestamp}');
await deleteRecordByName('Contact', 'Jane Smith-{timestamp}');
await deleteRecordByName('Opportunity', 'Sales Opportunity-{timestamp}');
// Mark original lead as deleted (if possible) or leave as Converted
```

---

### Test 2: Edge Case — Duplicate Email Address ⚠️

**Scenario**: Lead with email matching existing Contact; verify duplicate handling.

**Business Context**: Salesforce checks for duplicate Contact records based on duplicate rules. If a duplicate email exists, the conversion should either warn the user or allow choosing the existing contact.

**Preconditions**:
- An existing Contact exists with email: `test@company.com`
- A Lead exists with the same email

**Steps**:

| # | Step | Locator/Action | Expected Result | Screenshot |
|---|---|---|---|---|
| 1 | Navigate to Lead | Go to Leads; open "DuplicateEmail-{timestamp}" | Lead detail page; email field shows `test@company.com` | `20-duplicate-email-lead-detail` |
| 2 | Click Convert | `getByRole('button', { name: 'Convert' })` | Convert modal opens | `21-convert-modal-duplicate-email` |
| 3 | Observe Contact section | Check Contact section for duplicate warning | Message indicates existing contact found (if duplicate rule active) | `22-contact-duplicate-warning` |
| 4 | Option A: Create new Contact | Keep "Create New Contact" selected; do not search | Contact creation proceeds (duplicate rule may warn) | `23-create-new-contact-duplicate` |
| 5 | Fill required fields | Ensure Last Name provided (auto-filled from lead) | Modal validates required fields | `24-contact-fields-filled` |
| 6 | Click Convert | `dialog.getByRole('button', { name: 'Convert' })` | Conversion proceeds or error/warning appears | `25-conversion-attempt-duplicate` |
| 7 | Verify result | Check success screen or error toast | Either: (a) success with new contact, or (b) error toast with duplicate message | `26-duplicate-result` |
| **Option B** (Alternative flow): | | | | |
| 4b | Choose Existing Contact | Click "Choose Existing Contact" radio | Contact search field becomes active | `27-choose-existing-contact` |
| 5b | Search for contact | `getByPlaceholder('Search for matching contacts')` fill with "test@" | Autocomplete shows existing contact with matching email | `28-contact-search-results` |
| 6b | Select existing contact | Click matching contact from autocomplete | Contact field populated with existing contact | `29-existing-contact-selected` |
| 7b | Click Convert | `dialog.getByRole('button', { name: 'Convert' })` | Conversion succeeds; existing contact linked to new account | `30-conversion-with-existing-contact` |

**Assertions**:
- ✅ Duplicate handling respected per Salesforce org configuration
- ✅ If duplicate rule active: warning or suggestion to use existing contact
- ✅ Conversion completes (either creates new or uses existing)
- ✅ No error crashes the modal
- ✅ Success message displays if conversion succeeds

**Data Cleanup (afterAll)**:
```javascript
// If new duplicate contact created, delete it
// If existing contact was linked, revert or document
```

---

### Test 3: Edge Case — Missing Required Field (Last Name) ❌

**Scenario**: Lead with missing Last Name; attempt conversion without populating it.

**Business Context**: Contact Last Name is required in Salesforce. Conversion should fail or enforce field population before completion.

**Preconditions**:
- Lead "FirstNameOnly-{timestamp}" exists with:
  - First Name: "John"
  - Last Name: empty
  - Company: "DefaultCorp-{timestamp}"

**Steps**:

| # | Step | Locator/Action | Expected Result | Screenshot |
|---|---|---|---|---|
| 1 | Navigate to Lead | Go to Leads; open "FirstNameOnly-{timestamp}" | Lead detail page; note Last Name is empty | `31-lead-no-lastname-detail` |
| 2 | Click Convert | `getByRole('button', { name: 'Convert' })` | Convert modal opens | `32-convert-modal-no-lastname` |
| 3 | Verify Contact Name field | Check `getByLabel('Contact Name')` | Contact Name is blank or shows only first name | `33-contact-name-blank` |
| 4 | Check Last Name field | `getByLabel('Last Name')` within dialog | Last Name field is empty; may have red asterisk (*) indicating required | `34-last-name-field-required` |
| 5 | Attempt conversion without Last Name | Click Convert button directly | Button disabled OR modal shows error toast | `35-convert-disabled-or-error` |
| 6 | Verify error message | Check for toast or inline message | Message indicates "Last Name is required" or similar | `36-last-name-required-error` |
| 7 | Populate Last Name | `getByLabel('Last Name').fill('Doe-{timestamp}')` | Field populated | `37-last-name-populated` |
| 8 | Verify Convert button enabled | Assert Convert button is clickable | Button is now enabled (if was disabled) | `38-convert-button-enabled` |
| 9 | Click Convert | `dialog.getByRole('button', { name: 'Convert' })` | Modal closes; success screen appears | `39-conversion-success-after-lastname` |
| 10 | Verify Contact created | Assert `getByText('CONTACT')` card shows "John Doe-{timestamp}" | Contact shows first and last name | `40-contact-created-with-lastname` |

**Assertions**:
- ✅ Last Name field is marked as required (visual indicator)
- ✅ Convert button disabled or error appears if Last Name missing
- ✅ After populating Last Name, conversion succeeds
- ✅ Created Contact includes provided Last Name
- ✅ No partial conversions occur (all-or-nothing)

**Data Cleanup (afterAll)**:
```javascript
await deleteRecordByName('Account', 'DefaultCorp-{timestamp}');
await deleteRecordByName('Contact', 'John Doe-{timestamp}');
```

---

### Test 4: Happy Path Variation — Choose Existing Account ✅

**Scenario**: Convert lead but link to existing Account instead of creating new.

**Business Context**: If Account already exists, user can choose it to avoid duplicates and consolidate leads.

**Preconditions**:
- Account "ExistingCorp-{timestamp}" exists in Salesforce
- Lead "PartnerLead-{timestamp}" exists with Company = "PartnerCorp" (different from existing account)

**Steps**:

| # | Step | Locator/Action | Expected Result | Screenshot |
|---|---|---|---|---|
| 1 | Navigate to Lead | Open "PartnerLead-{timestamp}" | Lead detail page loaded | `41-existing-account-lead-detail` |
| 2 | Click Convert | `getByRole('button', { name: 'Convert' })` | Convert modal opens with auto-filled Account Name | `42-convert-modal-existing-account` |
| 3 | Select "Choose Existing Account" | Click second Account radio button | Radio becomes checked; search field becomes active | `43-choose-existing-account-radio` |
| 4 | Search for existing account | `getByPlaceholder('Search for matching accounts').fill('ExistingCorp')` | Autocomplete dropdown appears with matching accounts | `44-account-search-results` |
| 5 | Click matching account | Click "ExistingCorp-{timestamp}" from dropdown | Account field populated; "Create New Account" radio unchecks | `45-existing-account-selected` |
| 6 | Verify Contact section | Confirm Contact section shows "Create New Contact" selected | Contact will be newly created | `46-contact-new-for-existing-account` |
| 7 | Verify Opportunity section | Confirm Opportunity section shows "Create New Opportunity" | Opportunity will be linked to selected account | `47-opportunity-new-for-existing-account` |
| 8 | Click Convert | `dialog.getByRole('button', { name: 'Convert' })` | Modal closes; success screen appears | `48-conversion-success-existing-account` |
| 9 | Verify Account card | Assert existing account name "ExistingCorp-{timestamp}" shown | No new account created | `49-existing-account-card` |
| 10 | Verify Contact card | Assert new contact created with lead name | Contact linked to existing account | `50-contact-linked-to-existing-account` |
| 11 | Verify Opportunity card | Assert new opportunity created | Opportunity linked to existing account | `51-opportunity-linked-to-existing-account` |

**Assertions**:
- ✅ Existing Account search returns matching records
- ✅ Selecting existing account removes "Create New Account" option
- ✅ Contact and Opportunity are newly created
- ✅ All three records linked together (Contact/Opportunity → Account)
- ✅ Success screen confirms existing account usage

**Data Cleanup (afterAll)**:
```javascript
// Do NOT delete existing account (it existed before test)
// Delete only newly created Contact and Opportunity
await deleteRecordByName('Contact', 'PartnerLead-{timestamp}');
await deleteRecordByName('Opportunity', `ExistingCorp-{timestamp}-*`);
```

---

### Test 5: Happy Path Variation — Skip Opportunity Creation ✅

**Scenario**: Convert lead to Account and Contact only; skip Opportunity creation.

**Business Context**: Not all leads require an Opportunity at conversion time. User should be able to uncheck Opportunity.

**Preconditions**:
- Lead "NoOppLead-{timestamp}" with Open status exists

**Steps**:

| # | Step | Locator/Action | Expected Result | Screenshot |
|---|---|---|---|---|
| 1 | Navigate to Lead | Open "NoOppLead-{timestamp}" | Lead detail page loaded | `52-noopp-lead-detail` |
| 2 | Click Convert | `getByRole('button', { name: 'Convert' })` | Convert modal opens | `53-convert-modal-noopp` |
| 3 | Verify Opportunity section | Confirm "Create New Opportunity" radio is checked by default | Opportunity is enabled | `54-opportunity-default-checked` |
| 4 | Check "Don't create opportunity" checkbox | `getByLabel(/Don't create an opportunity/i).check()` | Checkbox becomes checked; Opportunity Name field may disable | `55-dont-create-opp-checked` |
| 5 | Verify Opportunity fields disabled | Assert Opportunity Name field is grayed out or disabled | User cannot edit opportunity details | `56-opportunity-fields-disabled` |
| 6 | Click Convert | `dialog.getByRole('button', { name: 'Convert' })` | Modal closes; success screen appears | `57-conversion-success-noopp` |
| 7 | Verify Account card | Assert account created | Account shown in success screen | `58-account-card-noopp` |
| 8 | Verify Contact card | Assert contact created | Contact shown in success screen | `59-contact-card-noopp` |
| 9 | Verify NO Opportunity card | Assert Opportunity section NOT shown on success screen | No opportunity created | `60-no-opportunity-card` |

**Assertions**:
- ✅ "Don't create opportunity" checkbox is available and functional
- ✅ Checking checkbox disables Opportunity fields
- ✅ Conversion succeeds without Opportunity
- ✅ Success screen shows only Account and Contact cards
- ✅ No orphaned or empty Opportunity created

**Data Cleanup (afterAll)**:
```javascript
await deleteRecordByName('Account', 'NoOppLead-{timestamp}' company value);
await deleteRecordByName('Contact', 'NoOppLead-{timestamp}');
// No opportunity to clean up
```

---

## Negative Test Cases (Non-Blocking / Informational)

### Scenario 6: Invalid Email Format (Informational)

**Context**: Verify Salesforce validates email fields if exposed in Contact creation.

- Navigate to Lead; open Convert modal
- If Last Name is exposed as editable AND email validation occurs, verify error message
- Expected: Email validation error if format invalid

---

### Scenario 7: Account Name Exceeds Max Length

**Context**: Verify field length validation.

- Fill Account Name with 256+ characters (Salesforce limit is 255)
- Expected: Field truncates or shows validation error

---

### Scenario 8: Cancel Conversion Modal

**Context**: User clicks Cancel before conversion.

**Steps**:
1. Open Convert modal
2. Fill fields partially
3. Click Cancel button
4. Expected: Modal closes; Lead remains Open; no records created

---

## Shared Utilities & Helpers

### Import Statements
```javascript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { sfTest } from '../fixtures/fixtures.js';
import { captureScreenshot, setAllureMeta } from '../utils/reporter-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';
import { fillLookup, selectPicklist, uniqueName } from '../utils/locator-utils.js';
```

### Common Functions

```javascript
// Generate unique test data
const timestamp = Date.now();
const testLead = {
  firstName: 'John',
  lastName: `Doe-${timestamp}`,
  company: `TechCorp-${timestamp}`,
  email: `john.doe.${timestamp}@test-convert.example.com`,
  phone: '(555) 123-4567',
};

// Navigate to Leads
async function navigateToLeads(page) {
  await page.getByTitle('App Launcher').click();
  await page.getByPlaceholder(/search/i).fill('Leads');
  await page.getByRole('option', { name: /^Leads$/i }).click();
  await waitForSFLoad(page);
}

// Open Convert modal
async function openConvertModal(page, leadName) {
  await page.getByRole('link', { name: leadName }).click();
  await waitForSFLoad(page);
  await page.getByRole('button', { name: 'Convert' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
}

// Fill conversion form
async function fillConversionForm(page, options) {
  const dialog = page.getByRole('dialog');
  
  if (options.newAccount) {
    await dialog.getByLabel('Account Name').clear();
    await dialog.getByLabel('Account Name').fill(options.accountName);
  }
  
  if (options.lastNameRequired) {
    await dialog.getByLabel('Last Name').fill(options.lastName);
  }
  
  if (options.opportunityName) {
    await dialog.getByLabel('Opportunity Name').clear();
    await dialog.getByLabel('Opportunity Name').fill(options.opportunityName);
  }
  
  if (options.skipOpportunity) {
    await dialog.getByLabel(/Don't create an opportunity/i).check();
  }
}

// Complete conversion
async function submitConversion(page) {
  const dialog = page.getByRole('dialog');
  await dialog.locator('button[type="button"].slds-button_brand').click();
  await waitForSFLoad(page);
}

// Verify success
async function verifyConversionSuccess(page, expectedValues) {
  await expect(page.getByText('Your lead has been converted')).toBeVisible();
  
  if (expectedValues.accountName) {
    await expect(page.getByText('ACCOUNT')).toBeVisible();
    await expect(page.getByRole('link', { name: expectedValues.accountName })).toBeVisible();
  }
  
  if (expectedValues.contactName) {
    await expect(page.getByText('CONTACT')).toBeVisible();
    await expect(page.getByRole('link', { name: expectedValues.contactName })).toBeVisible();
  }
  
  if (expectedValues.opportunityName) {
    await expect(page.getByText('OPPORTUNITY')).toBeVisible();
    await expect(page.getByRole('link', { name: expectedValues.opportunityName })).toBeVisible();
  }
}
```

---

## Allure Annotations

Every test must include:

```javascript
test.beforeEach(async () => {
  await setAllureMeta({
    epic: 'CRM',
    feature: 'Lead Management',
    story: 'Convert Lead to Account/Contact/Opportunity',
    severity: 'critical',
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await captureScreenshot(page, `${testInfo.title.replace(/\s+/g, '-')}-failed`, {
      writeToFile: true,
      testInfo,
    });
  }
});
```

---

## Test Execution Plan

| Phase | Tests | Duration | Trigger |
|---|---|---|---|
| **Phase 1: Happy Path** | Test 1 | 3-5 min | Manual + CI/CD |
| **Phase 2: Variations** | Tests 2, 3, 4, 5 | 10-15 min | CI/CD after Test 1 passes |
| **Phase 3: Negative Cases** | Scenarios 6-8 | 5 min | Manual validation |
| **Full Suite** | All | 20 min | Pre-release validation |

---

## Known Limitations & Notes

1. **Duplicate Rules**: Behavior depends on org-specific duplicate rule configuration. Tests should be adapted per environment.
2. **Record Owner**: Defaults to current logged-in user; cannot override in standard conversion.
3. **Converted Lead Status**: Once converted, Lead record becomes read-only in most orgs.
4. **Existing Contact Linking**: If duplicate rule active and existing contact matches, user can choose it.
5. **Close Date**: Opportunity Close Date auto-generated; cannot be pre-filled in conversion modal.
6. **Network**: All steps include `waitForSFLoad()` to handle Salesforce spinners.

---

## Reporting & Metrics

| Metric | Target | Notes |
|---|---|---|
| **Test Pass Rate** | 100% | Happy path must never fail |
| **Edge Case Coverage** | 5 scenarios | Duplicate email, missing field, existing account, skip opportunity, cancel |
| **Screenshot Coverage** | 60+ screenshots | Document every major step |
| **Performance** | < 5 min per test | Total suite < 20 min |
| **Allure Report** | Full epic/feature/story tracking | Auto-generated from annotations |

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-04-29 | Initial test plan; 5 scenarios + edge cases |

---

**Plan prepared for:** Playwright Test Agents (v1.59+)  
**Framework:** SF Agentic Framework  
**Author:** Test Planning Agent  
**Last Updated:** 2026-04-29
