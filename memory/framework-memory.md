# Framework Memory — SF Agentic Automation
> Read this before every agent session. Updated after each run.

---

## Stack
- **Playwright Test Agents** v1.56+ (official Microsoft — `npx playwright init-agents --loop=vscode`)
- **VS Code** v1.105+ with GitHub Copilot Chat (agent mode)
- **Agent files**: `.github/agents/` — Planner, Generator, Healer `.chatmode.md`
- **MCP**: `.vscode/mcp.json` — connects Copilot to Playwright's browser tools
- **Auth**: `utils/sf-helpers.js` globalSetup → `reports/.auth-state.json` → all tests reuse
- **Reports**: Allure HTML + Playwright HTML + JUnit (for CI)

---

## Non-Negotiable Locator Rules
**NEVER use CSS class selectors or XPath with element IDs.**

Priority order for all locators:
1. `page.getByRole('button', { name: 'New' })` ← always first choice
2. `page.getByLabel('First Name')` ← for form fields
3. `page.getByPlaceholder('Search...')` ← for search inputs
4. `page.getByText('Success')` ← for text content
5. `page.locator('[aria-label="Close"]')` ← aria fallback
6. `page.locator('.toastMessage')` ← **ONLY** CSS exception (SF toast has no accessible selector)

---

## SF Lightning Patterns

### After every navigation or button click
```javascript
await waitForSFLoad(page);
```

### Toast assertion (assert immediately — toast disappears in ~3s)
```javascript
const toast = page.locator('.toastMessage');
await expect(toast).toBeVisible({ timeout: 15000 });
await expect(toast).toContainText('was created');
```

### Modal/Dialog interactions
```javascript
const dialog = page.getByRole('dialog');
await dialog.waitFor({ state: 'visible' });
// Scope all form interactions to the dialog:
await dialog.getByLabel('First Name').fill('value');
await dialog.getByRole('button', { name: 'Save' }).click();
```

### Picklist / Dropdown
```javascript
// Method A: Native select
await page.getByLabel('Stage').selectOption('Needs Analysis');

// Method B: SF custom picklist (click + option)
await page.getByLabel('Stage').click();
await page.getByRole('option', { name: 'Needs Analysis' }).click();
```

### Lookup field (Account Name etc.)
```javascript
await page.getByLabel('Account Name').fill('Acme Corp');
await page.waitForTimeout(600); // autocomplete debounce
await page.getByRole('option', { name: 'Acme Corp' }).first().click();
```

### Date field (SF requires MM/DD/YYYY)
```javascript
import { getDatePlusDays } from '../utils/locator-utils.js';
await page.getByLabel('Close Date').fill(getDatePlusDays(30));
```

### Switch list view to all records
```javascript
import { switchToAllRecords } from '../utils/sf-helpers.js';
await switchToAllRecords(page, 'Leads'); // or 'Opportunities', 'Contacts'
```

---

## Required Allure Annotations (every generated test)
```javascript
import * as allure from 'allure-js-commons';

test.beforeEach(async () => {
  await allure.epic('CRM');
  await allure.feature('Lead Management');
  await allure.story('Create New Lead');
  await allure.severity('critical');
});
```

## Required afterEach (every generated test)
```javascript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await captureScreenshot(page, `failure-${testInfo.title.replace(/\s+/g, '-')}`);
  }
});
```

---

## File Conventions
| File type | Location | Who creates it |
|-----------|----------|----------------|
| Task instructions | `tasks/*.md` | **You** |
| Test plans | `specs/*-plan.md` | 🤖 Planner agent |
| Playwright tests | `tests/*.spec.js` | 🤖 Generator agent |
| Healed tests | `tests/*.spec.js` (patched in place) | 🤖 Healer agent |
| Auth state | `reports/.auth-state.json` | globalSetup |

---

## Lessons Learned
- SF spinners must clear before interacting — `waitForSFLoad()` handles this
- Timestamp test data (`Date.now()`) prevents collision between runs
- List views default to "Recently Viewed" — always switch to "All [Object]" for reliable lookup
- Inline edit on SF detail page requires double-click on the field value
- Account Name lookup fields: type text → wait 600ms → click autocomplete
- `waitForLoadState('networkidle')` can hang on SF — prefer `waitForSFLoad()`
- Always scope interactions to `page.getByRole('dialog')` when a modal is open

---

## Agent Run History
| Date | Task | Plan | Spec | Result |
|------|------|------|------|--------|
| - | - | - | - | - |
