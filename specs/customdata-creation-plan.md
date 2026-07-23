# Salesforce Account Creation Test Plan

## Objective
Verify the end-to-end Salesforce Lightning Account creation experience, including form entry, record save, detail page validation, list view visibility, and inline editing.

## Preconditions
- Salesforce Lightning org is available at `SF_URL`.
- User is authenticated via `reports/.auth-state.json`.
- Accounts tab is visible in the Salesforce navigation bar.
- `waitForSFLoad(page)` is available and used after each major navigation.

## Test Data
- Account Name: `Agentic Corp [timestamp]`
- Phone: `+91-9800000001`
- Website: `https://agentic-framework.com`
- Industry: `Technology`
- Type: `Prospect`
- Billing Street: `123 Test Street`
- Billing City: `Jaipur`
- Billing State: `Rajasthan`
- Billing Zip: `302001`
- Billing Country: `India`
- Employees: `500`
- Annual Revenue: `5000000`
- Description: `Created by SF Agentic Framework`

## Locator Strategy
Use only the supported selector patterns:
- `page.getByRole('button', { name: 'New' })`
- `page.getByLabel('Account Name')`
- `page.getByRole('dialog')`
- `page.getByText('Save')`
- `page.getByText('Accounts')`
- `page.getByRole('option', { name: 'Customer - Direct' })`

Do not use CSS class selectors or XPath selectors except for the SF toast fallback.

## Scenario 1: Create a New Account

### Steps
1. Navigate to Salesforce Lightning and click the `Accounts` tab.
   - Wait for the Accounts list page to load using `waitForSFLoad(page)`.
   - Screenshot: `accounts-list-view`
2. Click the `New` button to open the Account creation dialog.
   - Wait for the modal dialog to appear.
   - Screenshot: `new-account-modal`
3. Fill the Account creation form inside the dialog:
   - `Account Name` → `Agentic Corp [timestamp]`
   - `Phone` → `+91-9800000001`
   - `Website` → `https://agentic-framework.com`
   - `Industry` → `Technology`
   - `Type` → `Prospect`
   - `Billing Street` → `123 Test Street`
   - `Billing City` → `Jaipur`
   - `Billing State` → `Rajasthan`
   - `Billing Zip` → `302001`
   - `Billing Country` → `India`
   - `Employees` → `500`
   - `Annual Revenue` → `5000000`
   - `Description` → `Created by SF Agentic Framework`
   - Screenshot: `account-form-filled`
4. Click the `Save` button within the dialog.
   - Assert a success toast appears and contains `Account` and `created`.
   - Screenshot: `account-toast-success`

### Expected Results
- The Account is created successfully.
- A toast confirms creation.
- The app navigates to the new Account detail page.

## Scenario 2: Verify Account Detail Page

### Steps
1. After save, wait for the detail page to load with `waitForSFLoad(page)`.
2. Assert the page heading contains the new Account name.
3. Assert the detail fields show:
   - `Industry` = `Technology`
   - `Type` = `Prospect`
4. Screenshot: `account-detail-page`

### Expected Results
- The detail page header contains the exact Account name.
- Industry and Type display the expected values.

## Scenario 3: Verify Account Appears in List View

### Steps
1. Click the `Accounts` tab again to return to the list view.
   - Wait for `waitForSFLoad(page)`.
2. Switch the list view to `All Accounts` if not already selected.
3. Assert the new Account record is visible by its Account Name.
4. Screenshot: `account-in-list-view`

### Expected Results
- The new Account appears in the `All Accounts` list.
- The record is selectable by name.

## Scenario 4: Inline Edit Account Type

### Steps
1. Open the new Account detail page if not already on it.
2. Click the `Edit` button on the detail page.
3. Change `Type` from `Prospect` to `Customer - Direct`.
4. Save the record.
5. Assert the toast confirms the update.
6. Assert the Account detail shows `Type` = `Customer - Direct`.
7. Screenshot: `account-edited`

### Expected Results
- The record save completes successfully.
- The toast confirms the update.
- The Type field persists the new selection.

## Validation Notes
- Always call `waitForSFLoad(page)` after navigation or major UI transitions.
- Use `captureScreenshot(page, '<step-name>')` at every step for traceability.
- On failure, the framework should capture a final screenshot in `afterEach`.

## Follow-up Exploration
If the Lead Conversion wizard must be validated, add a related scenario after this Account creation flow that:
- locates a qualified Lead record,
- initiates `Convert` from the Lead detail page,
- confirms the Account lookup is prepopulated,
- verifies the new Account is created and the Lead is converted.
