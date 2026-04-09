---
name: code-review
description: >
  Code review standards for the SF Agentic Framework. Load this skill
  before reviewing any Playwright test, utility, config, or pipeline file.
  Contains every rule, anti-pattern, and correct pattern for this project.
---

# SF Agentic Framework — Code Review Skill

Load `skills/SKILL.md` and `skills/salesforce/SKILL.md` first, then use this
skill for the detailed review checklist.

---

## Severity Levels

| Level | Meaning |
|---|---|
| 🔴 BLOCKER | Will cause test failure or CI break — must fix before merge |
| 🟡 WARNING | Weakens reliability or maintainability — should fix soon |
| 🟢 SUGGESTION | Quality improvement — nice to have |

---

## SECTION 1: Locators — Most Common Failure Point

### 🔴 NEVER use these (auto-reject):
```js
// ❌ CSS class selector
page.locator('.slds-form-element__label')
page.locator('.forceActionLink')

// ❌ XPath with DOM IDs
page.locator('//div[@id="contact-form"]')
page.locator('xpath=//button[contains(@class,"btn")]')

// ❌ data-id or data-testid that Salesforce changes between releases
page.locator('[data-id="AppNavigation"]')

// ❌ nth-child selectors (fragile)
page.locator('tr:nth-child(3) td:first-child')

// ❌ Auto-generated IDs
page.locator('#00N5e000003VKhN')
```

### ✅ ALWAYS use these:
```js
// ✅ Role + accessible name
page.getByRole('button', { name: 'New' })
page.getByRole('link', { name: 'Leads' })
page.getByRole('dialog')
page.getByRole('option', { name: 'Needs Analysis' })

// ✅ Label (form fields)
page.getByLabel('First Name')
page.getByLabel('Account Name')
page.getByLabel('Close Date')

// ✅ Placeholder (search boxes)
page.getByPlaceholder('Search...')
page.getByPlaceholder('Search apps and items...')

// ✅ Text content
page.getByText('was created')
page.getByText('Opportunity Name')

// ✅ ARIA label fallback (only when above don't work)
page.locator('[aria-label="Close"]')

// ✅ Only CSS exception allowed in this framework
page.locator('.toastMessage')   // SF toast has no accessible selector
```

### Scoping to Dialog (required when modal is open)
```js
// ✅ CORRECT — scoped to dialog
const dialog = page.getByRole('dialog');
await dialog.waitFor({ state: 'visible' });
await dialog.getByLabel('First Name').fill('value');
await dialog.getByRole('button', { name: 'Save' }).click();

// ❌ WRONG — not scoped, will match outside dialog too
await page.getByLabel('First Name').fill('value');
```

---

## SECTION 2: Allure 3 — Breaking Changes from v2

### 🔴 attachment() API changed in v3
```js
// ❌ WRONG — Allure 2 style (plain string) — BREAKS in v3
await allure.attachment('screenshot', buffer, 'image/png');

// ✅ CORRECT — Allure 3 style (options object)
await allure.attachment('screenshot', buffer, { contentType: 'image/png' });
await allure.attachment('api-response', JSON.stringify(body), { contentType: 'application/json' });
await allure.attachment('error-log', errorText, { contentType: 'text/plain' });
```

### 🔴 All Allure label functions must be awaited
```js
// ❌ WRONG — missing await (silent failure in some versions)
allure.epic('CRM');
allure.feature('Lead Management');

// ✅ CORRECT
await allure.epic('CRM');
await allure.feature('Lead Management');
await allure.story('Create Lead');
await allure.severity('critical');   // values: blocker, critical, normal, minor, trivial
```

### 🔴 Required annotations in every test file
```js
test.beforeEach(async () => {
  await allure.epic('CRM');           // top-level grouping
  await allure.feature('Leads');      // feature area
  await allure.story('Create Lead');  // specific story
  await allure.severity('critical');  // test importance
});
```

### 🟡 Recommended additional annotations
```js
await allure.owner('QA Team');
await allure.tag('smoke');
await allure.tag('salesforce');
await allure.parameter('SF Org', process.env.SF_URL);
await allure.description('Verifies Lead creation end-to-end via Lightning UI');
await allure.link('https://jira.company.com/JIRA-123', 'JIRA-123', 'issue');
```

---

## SECTION 3: SF Timing — All Must Be Present

### 🔴 waitForSFLoad() after every navigation and click
```js
// ❌ WRONG — no wait after navigation
await page.getByRole('link', { name: 'Leads' }).click();
await page.getByRole('button', { name: 'New' }).click();

// ✅ CORRECT
await page.getByRole('link', { name: 'Leads' }).click();
await waitForSFLoad(page);
await page.getByRole('button', { name: 'New' }).click();
// No waitForSFLoad needed after New — dialog appears immediately
await page.getByRole('dialog').waitFor({ state: 'visible' });
```

### 🔴 Toast must be asserted IMMEDIATELY after save
```js
// ❌ WRONG — waiting before toast assertion (toast disappears in 3s)
await page.getByRole('button', { name: 'Save' }).click();
await waitForSFLoad(page);          // toast is already gone by now
await expect(page.locator('.toastMessage')).toBeVisible();

// ✅ CORRECT — assert toast FIRST, then waitForSFLoad
await page.getByRole('button', { name: 'Save' }).click();
const toast = page.locator('.toastMessage');
await expect(toast).toBeVisible({ timeout: 15000 });
await expect(toast).toContainText('was created');
// Now it's safe to wait for page load
await waitForSFLoad(page);
```

### 🟡 waitForTimeout is a code smell
```js
// 🟡 Flag this — why is it here? Usually means a missing proper wait
await page.waitForTimeout(2000);

// Suggest replacing with:
await waitForSFLoad(page);
// OR:
await page.getByRole('dialog').waitFor({ state: 'visible' });
// OR for lookup autocomplete:
await page.waitForTimeout(600);  // ONLY for SF autocomplete debounce — document it
```

---

## SECTION 4: Test Structure — Mandatory Patterns

### 🔴 Auth state must be declared
```js
// ❌ WRONG — no auth state
test.describe('Lead Tests', () => {
  test('create lead', async ({ page }) => { ... });
});

// ✅ CORRECT
test.use({ storageState: './reports/.auth-state.json' });
test.describe('Lead Tests', () => { ... });
```

### 🔴 afterEach screenshot on failure
```js
// ✅ REQUIRED in every test file
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await captureScreenshot(page, `failure-${testInfo.title.replace(/\s+/g, '-')}`);
  }
});
```

### 🔴 Test data must be unique per run
```js
// ❌ WRONG — hardcoded, causes collision between runs
const leadName = 'Test Lead';
const email = 'test@example.com';

// ✅ CORRECT — unique per run
import { uniqueName } from '../utils/locator-utils.js';
const leadName = uniqueName('Agentic Lead');   // → "Agentic Lead-1715000000000"
const email = `lead.${Date.now()}@sf-test.com`;
```

### 🟡 sfStep() wrapper required for every major action
```js
// 🟡 WARNING — step but no sfStep wrapper (loses Allure step tracking)
await page.getByRole('button', { name: 'New' }).click();
await page.getByRole('dialog').waitFor({ state: 'visible' });

// ✅ CORRECT — wrapped in sfStep for Allure report
await sfStep('Click New and wait for modal', page, async () => {
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
});
```

### 🟡 captureScreenshot after every major step
```js
// 🟡 Missing screenshot — reviewer should flag any step without one
await sfStep('Fill Lead form', page, async () => {
  await dialog.getByLabel('First Name').fill('Agentic');
  // sfStep auto-captures screenshot at the end — good
});

// Steps outside sfStep need manual screenshot
await waitForSFLoad(page);
await captureScreenshot(page, 'page-after-navigation');  // ✅
```

---

## SECTION 5: SF Field Interaction Patterns

### Lookup Fields
```js
// ❌ WRONG — bare fill doesn't trigger SF autocomplete properly
await page.getByLabel('Account Name').fill('Acme Corp');
await page.getByRole('option', { name: 'Acme Corp' }).click();

// ✅ CORRECT — use utility which handles the debounce
import { fillLookup } from '../utils/locator-utils.js';
await fillLookup(page, 'Account Name', 'Acme Corp');
```

### Picklist Fields
```js
// ❌ WRONG — plain fill on a picklist does nothing
await page.getByLabel('Stage').fill('Needs Analysis');

// ✅ CORRECT — Option A (native select)
await page.getByLabel('Stage').selectOption('Needs Analysis');

// ✅ CORRECT — Option B (SF custom LWC picklist)
import { selectPicklist } from '../utils/locator-utils.js';
await selectPicklist(page, 'Stage', 'Needs Analysis');
```

### Date Fields
```js
// ❌ WRONG — hardcoded date breaks in future
await page.getByLabel('Close Date').fill('06/15/2026');

// ✅ CORRECT — dynamic date
import { getDatePlusDays } from '../utils/locator-utils.js';
await page.getByLabel('Close Date').fill(getDatePlusDays(30));
```

### List View Switching
```js
// ❌ WRONG — leaving default "Recently Viewed" — may not show test records
await page.getByRole('link', { name: 'Leads' }).click();
await waitForSFLoad(page);
await expect(page.getByRole('link', { name: leadName })).toBeVisible();

// ✅ CORRECT — switch to All records
import { switchToAllRecords } from '../utils/sf-helpers.js';
await page.getByRole('link', { name: 'Leads' }).click();
await waitForSFLoad(page);
await switchToAllRecords(page, 'Leads');
await expect(page.getByRole('link', { name: leadName })).toBeVisible();
```

---

## SECTION 6: API Test Standards

### 🔴 Token must be fetched once in beforeAll
```js
// ❌ WRONG — fetches new token for every test (slow + wasteful)
test('read lead', async ({ request }) => {
  const token = await getSFToken(request);
  ...
});

// ✅ CORRECT — fetch once, reuse
let token;
test.beforeAll(async ({ request }) => {
  token = await getSFToken(request);
});
```

### 🔴 All status codes must be explicitly asserted
```js
// ❌ WRONG — only checking body, not status
const res = await sfPost(request, 'sobjects/Lead', data, token);
const body = await res.json();
expect(body.success).toBe(true);

// ✅ CORRECT
const res = await sfPost(request, 'sobjects/Lead', data, token);
expect(res.status()).toBe(201);            // must check status
const body = await res.json();
expect(body.success).toBe(true);
expect(body.id).toBeTruthy();
```

### 🔴 Cleanup in afterAll
```js
// ❌ WRONG — no cleanup, pollutes SF org
test.describe('Lead API', () => {
  let leadId;
  // ... tests create records but never delete them
});

// ✅ CORRECT
let leadId;
test.afterAll(async ({ request }) => {
  if (leadId) await sfDelete(request, `sobjects/Lead/${leadId}`, token);
});
```

### 🟡 Allure annotations in API tests too
```js
// 🟡 Missing Allure in API tests is common — flag it
test.beforeEach(async () => {
  await allure.epic('CRM API');
  await allure.feature('Lead REST API');
  await allure.severity('critical');
});
```

---

## SECTION 7: Config Files

### playwright.config.js (root)
```js
// 🔴 BLOCKER — missing chromium project (MCP agents crash without it)
projects: [
  { name: 'ui-tests', ... },    // ❌ chromium project missing
]

// ✅ CORRECT
projects: [
  { name: 'chromium', testDir: './tests', use: { ...devices['Desktop Chrome'] } },
  { name: 'ui-tests',  testDir: './tests/UI',  ... },
  { name: 'api-tests', testDir: './tests/API', ... },
]

// 🔴 BLOCKER — wrong Allure 3 key
['allure-playwright', { outputFolder: '...' }]   // ❌ v2 key
['allure-playwright', { resultsDir: '...' }]     // ✅ v3 key
```

### Jenkinsfile
```groovy
// 🔴 BLOCKER — tools.allure requires Jenkins Global Tool Config
// If Allure plugin global tool isn't configured, pipeline fails before any test runs
tools { allure 'allure' }  // ❌ risky

// ✅ SAFER — install via npm in the pipeline stage
sh 'npm install -g allure-commandline --quiet'
```

---

## SECTION 8: Imports — Must Use ES Modules

```js
// ❌ WRONG — CommonJS require() (project is "type": "module")
const { test, expect } = require('@playwright/test');

// ✅ CORRECT — ES module import
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { waitForSFLoad, switchToAllRecords } from '../utils/sf-helpers.js';
import { captureScreenshot, sfStep } from '../utils/reporter-utils.js';
import { fillLookup, selectPicklist, getDatePlusDays, uniqueName } from '../utils/locator-utils.js';
```

---

## SECTION 9: Quick Grep Checklist (run before review complete)

```bash
# 1. Find forbidden CSS locators
grep -rn "locator('\." tests/ --include="*.spec.js"
grep -rn "locator(\"\\." tests/ --include="*.spec.js"

# 2. Find Allure v2 attachment style
grep -rn "allure\.attachment.*'image\|allure\.attachment.*'text\|allure\.attachment.*'application" tests/

# 3. Find missing await on allure labels
grep -rn "allure\.epic\|allure\.feature\|allure\.story" tests/ | grep -v "await"

# 4. Find hardcoded dates
grep -rn "'2024\|'2025\|'2026\|'2027" tests/ --include="*.spec.js"

# 5. Find hardcoded emails that won't be unique
grep -rn "@gmail\|@yahoo\|@example\|@test\.com" tests/ --include="*.spec.js" | grep -v "Date\.now\|timestamp\|uniqueName"

# 6. Find missing storageState
grep -rn "test\.describe" tests/UI/ --include="*.spec.js" -l | xargs grep -L "storageState"

# 7. Find waitForTimeout (flag every occurrence)
grep -rn "waitForTimeout" tests/ --include="*.spec.js"

# 8. Find require() in ES module project
grep -rn "require(" tests/ --include="*.spec.js"

# 9. Find missing afterEach failure screenshot
grep -rn "test\.describe" tests/UI/ --include="*.spec.js" -l | xargs grep -L "afterEach"

# 10. Check for hardcoded Salesforce IDs (15 or 18 char alphanumeric)
grep -rn "'[a-zA-Z0-9]\{15,18\}'" tests/ --include="*.spec.js"
```