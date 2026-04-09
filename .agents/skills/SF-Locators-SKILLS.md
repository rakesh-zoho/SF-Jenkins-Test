---
name: locators
description: >
  Complete locator strategy guide for Salesforce Lightning UI tests.
  Load when writing new UI tests or debugging "element not found" errors.
  Contains every locator pattern and the correct utility function for each.
---

# Locators Skill — Salesforce Lightning

## The Golden Rule

Salesforce Lightning uses Web Components (LWC). DOM structure and class names
change between every SF release. The ONLY stable way to locate elements is via
the **accessibility tree** — roles, labels, text, and ARIA attributes.

---

## Decision Tree — Which Locator to Use

```
Is it a button, link, checkbox, or heading?
  └─ YES → getByRole('button'|'link'|'checkbox', { name: '...' })

Is it a form input with a visible label?
  └─ YES → getByLabel('Field Label')

Is it a search box or input with placeholder text?
  └─ YES → getByPlaceholder('Search...')

Is it a static text on the page?
  └─ YES → getByText('exact text')

Is it the SF toast message?
  └─ YES → page.locator('.toastMessage')  ← ONLY allowed CSS exception

None of the above?
  └─ Try page.locator('[aria-label="..."]')
  └─ Last resort: ask the Planner agent to explore the page with CLI
```

---

## Utility Functions (always use these instead of raw locators)

```js
import {
  fillField,        // fill any form field by label
  selectPicklist,   // handle both native select and SF LWC picklist
  fillLookup,       // lookup fields (Account Name, Contact Name, etc.)
  getDatePlusDays,  // returns MM/DD/YYYY format for SF date fields
  uniqueName,       // generates "Prefix-1715000000000" unique test data
} from '../utils/locator-utils.js';

import {
  waitForSFLoad,        // waits for SF spinners to clear
  switchToAllRecords,   // switches list view from "Recently Viewed"
  navigateToApp,        // App Launcher navigation
} from '../utils/sf-helpers.js';
```

---

## Complete Locator Reference

### Buttons
```js
page.getByRole('button', { name: 'New' })
page.getByRole('button', { name: 'Save' })
page.getByRole('button', { name: 'Cancel' })
page.getByRole('button', { name: 'Edit' })
page.getByRole('button', { name: 'Delete' })
page.getByRole('button', { name: 'Clone' })
page.getByRole('button', { name: 'Convert' })
page.getByRole('button', { name: /Select a List View/i })
```

### Navigation
```js
page.getByRole('link', { name: 'Leads' })
page.getByRole('link', { name: 'Contacts' })
page.getByRole('link', { name: 'Accounts' })
page.getByRole('link', { name: 'Opportunities' })
page.getByRole('link', { name: 'Cases' })
page.locator('[title="App Launcher"]')
```

### Modal/Dialog
```js
page.getByRole('dialog')                                         // the modal itself
page.getByRole('dialog').getByRole('button', { name: 'Save' })  // scoped button
page.getByRole('dialog').getByLabel('First Name')                // scoped field
```

### Toast Messages
```js
page.locator('.toastMessage')                    // any toast
page.locator('.slds-notify--toast .toastMessage') // success toast
```

### Dropdowns and Options
```js
page.getByRole('option', { name: 'Needs Analysis' })
page.getByRole('option', { name: 'Closed Won' })
page.getByRole('option', { name: 'All Leads' })
page.getByRole('listbox')  // the open dropdown container
```

### Lead Fields
```js
page.getByLabel('First Name')
page.getByLabel('Last Name')
page.getByLabel('Company')
page.getByLabel('Email')
page.getByLabel('Phone')
page.getByLabel('Mobile')
page.getByLabel('Lead Source')
page.getByLabel('Status')       // Lead Status picklist
page.getByLabel('Rating')
page.getByLabel('Title')
page.getByLabel('Industry')
page.getByLabel('Annual Revenue')
page.getByLabel('No. of Employees')
page.getByLabel('Description')
```

### Opportunity Fields
```js
page.getByLabel('Opportunity Name')
page.getByLabel('Account Name')    // lookup
page.getByLabel('Close Date')      // use getDatePlusDays()
page.getByLabel('Stage')           // picklist
page.getByLabel('Amount')
page.getByLabel('Type')
page.getByLabel('Lead Source')
page.getByLabel('Next Step')
page.getByLabel('Probability (%)')
page.getByLabel('Description')
```

### Contact Fields
```js
page.getByLabel('Salutation')
page.getByLabel('First Name')
page.getByLabel('Last Name')
page.getByLabel('Account Name')    // lookup
page.getByLabel('Title')
page.getByLabel('Department')
page.getByLabel('Email')
page.getByLabel('Business Phone')
page.getByLabel('Mobile')
page.getByLabel('Other Phone')
page.getByLabel('Home Phone')
page.getByLabel('Lead Source')
page.getByLabel('Birthdate')
page.getByLabel('Reports To')      // Contact lookup
page.getByLabel('Mailing Street')
page.getByLabel('Mailing City')
page.getByLabel('Mailing State/Province')
page.getByLabel('Mailing Zip/Postal Code')
page.getByLabel('Mailing Country')
```

### Account Fields
```js
page.getByLabel('Account Name')
page.getByLabel('Account Number')
page.getByLabel('Type')
page.getByLabel('Industry')
page.getByLabel('Annual Revenue')
page.getByLabel('Employees')
page.getByLabel('Rating')
page.getByLabel('Phone')
page.getByLabel('Website')
page.getByLabel('Parent Account')  // lookup
page.getByLabel('Billing Street')
page.getByLabel('Billing City')
page.getByLabel('Billing State/Province')
page.getByLabel('Billing Zip/Postal Code')
page.getByLabel('Billing Country')
page.getByLabel('Description')
```

### Case Fields
```js
page.getByLabel('Status')
page.getByLabel('Priority')
page.getByLabel('Case Origin')
page.getByLabel('Case Reason')
page.getByLabel('Type')
page.getByLabel('Subject')
page.getByLabel('Account Name')    // lookup
page.getByLabel('Contact Name')    // lookup
page.getByLabel('Description')
page.getByLabel('Internal Comments')
```

### List View
```js
page.getByRole('button', { name: /Select a List View/i })
page.getByRole('option', { name: 'All Leads' })
page.getByRole('option', { name: 'All Contacts' })
page.getByRole('option', { name: 'All Accounts' })
page.getByRole('option', { name: 'All Opportunities' })
page.getByRole('option', { name: 'All Cases' })
page.getByRole('option', { name: 'All Open Cases' })
page.getByRole('link', { name: 'RECORD_NAME' })   // record row link
```

---

## Debugging "Element Not Found" Errors

### Step 1 — Take a snapshot with Playwright CLI
```bash
playwright-cli -s=debug open https://your-org.lightning.force.com
playwright-cli -s=debug goto /lightning/o/Lead/list
playwright-cli -s=debug snapshot
# Reads the accessibility tree → shows element refs (e21, e35, etc.)
playwright-cli -s=debug snapshot --filename=debug-snapshot.yaml
```

### Step 2 — Use Playwright's built-in locator helper
```bash
npx playwright test --debug tests/UI/lead-creation.spec.js --config=config/playwright.config.js
# Pauses on failure — use the DevTools console to try locators live
```

### Step 3 — Common fixes
```js
// Element in dialog — scope it
const dialog = page.getByRole('dialog');
await dialog.getByLabel('Field').fill('value');  // scoped

// Multiple matching elements — use .first() or .nth()
await page.getByRole('button', { name: 'Edit' }).first().click();

// Picklist not found — try both methods
await page.getByLabel('Stage').selectOption('Needs Analysis');
// OR
await page.getByLabel('Stage').click();
await page.getByRole('option', { name: 'Needs Analysis' }).click();

// Lookup not finding result — wait for autocomplete
await page.getByLabel('Account Name').fill('Acme');
await page.waitForTimeout(600);  // SF autocomplete debounce
await page.getByRole('option', { name: 'Acme Corp' }).first().click();
```