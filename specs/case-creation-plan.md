# Case Creation Test Plan

## Feature
Case Management

## Objective
Create a new Salesforce Case from the Cases list view and verify that it persists in the All Cases list.

## Preconditions
- Salesforce Lightning app is available at `SF_URL` from `.env`
- Auth session is available via `reports/.auth-state.json`
- User is already logged in or login state is reused via `tests/seed.spec.js`
- Cases tab is visible in the global navigation

## Assumptions
- `waitForSFLoad(page)` must be called after every navigation or UI action that changes the page.
- `captureScreenshot(page, '<step-name>')` is taken after each major interaction.
- `uniqueName('Agentic Case')` is used to create a non-colliding Subject.
- The app uses Salesforce Lightning accessible selectors.

## Test Data
- Contact Name search term: `contact`
- Account Name search term: `agentic`
- Status: `New`
- Type: select the first available non-`--None--` value
- Case Reason: select the first available non-`--None--` value
- Priority: `Medium`
- Case Origin: `Web`
- Subject: dynamic unique text using `uniqueName('Agentic Case')`
- Description: `Automated test case creation flow`

## Test Scenarios

### 1. Case Creation - Happy Path

#### 1.1 Create Case with Required Fields
**Objective:** Verify that a Case can be created with the minimum required fields.
**Steps:**
1. Navigate to the Cases tab and wait for the list view.
2. Click `New` and wait for the `New Case` dialog.
3. Fill `Contact Name` by searching `contact` and selecting the first lookup result.
4. Fill `Account Name` by searching `agentic` and selecting the first lookup result.
5. Select `Status = New`, `Priority = Medium`, `Case Origin = Web`, `Type = Problem` (or first valid non-`--None--`), `Case Reason = New Problem` (or first valid non-`--None--`).
6. Fill `Subject` with `uniqueName('Agentic Case')` and `Description` with `Automated test case creation flow`.
7. Save the case.
**Expected Outcomes:**
- New Case dialog closes.
- Success toast appears and contains `was created`.
- User is navigated to the Case detail page.
- The created Subject is visible on the detail page.
- Screenshot points: `cases-list-view`, `new-case-modal-open`, `case-form-filled`, `case-toast-success`, `case-detail-page`.

#### 1.2 Create Case with All Standard Fields
**Objective:** Verify that non-required Case fields can be populated and saved.
**Steps:**
1. Open the `New Case` dialog.
2. Fill the required lookups and subject/description as in 1.1.
3. Populate additional fields if present: `Type`, `Case Reason`, `Priority`, `Case Origin`, `Status`.
4. Save and verify the detail page shows all populated values.
**Expected Outcomes:**
- All selected values persist after save.
- Detail page reflects `Type` and `Case Reason` selections.

### 2. Case Creation - Validation and Negative Flows

#### 2.1 Prevent Save without Contact Name
**Objective:** Verify required lookup validation for Contact Name.
**Steps:**
1. Open the `New Case` dialog.
2. Leave `Contact Name` empty.
3. Fill `Account Name` and required picklists and text fields.
4. Click `Save`.
**Expected Outcomes:**
- Save action is blocked.
- Error message appears for `Contact Name`.
- The form remains open.
- Screenshot point: `case-validation-no-contact`.

#### 2.2 Prevent Save without Subject
**Objective:** Verify required text field validation for Subject.
**Steps:**
1. Open the `New Case` dialog.
2. Fill all required lookups and picklists except `Subject`.
3. Click `Save`.
**Expected Outcomes:**
- Save action is blocked.
- Subject field validation error is shown.
- User can enter a Subject and retry.
- Screenshot point: `case-validation-no-subject`.

#### 2.3 Prevent Save with Empty Required Picklists
**Objective:** Verify missing picklist validation prevents save.
**Steps:**
1. Open the `New Case` dialog.
2. Fill lookups, Subject, and Description.
3. Leave `Status`, `Case Origin`, or `Priority` unset.
4. Click `Save`.
**Expected Outcomes:**
- Validation messages identify the missing required picklist fields.
- No case is created.
- Screenshot point: `case-validation-missing-picklists`.

#### 2.4 Account Lookup Fallback Behavior
**Objective:** Verify that lookup autocomplete returns first result and can be selected.
**Steps:**
1. Search `agentic` in `Account Name`.
2. Wait for autocomplete results.
3. Select the first visible option.
4. Save the case.
**Expected Outcomes:**
- Lookup chooses the first non-empty account.
- Case saves successfully.
- Authoritative behavior is defined for fuzzy lookup searches.

### 3. Case Creation - Edge Cases

#### 3.1 Create Case with Long Description
**Objective:** Verify long text in Description is handled correctly.
**Steps:**
1. Open the `New Case` dialog.
2. Fill required fields normally.
3. Enter a Description with 500+ characters.
4. Save the case.
**Expected Outcomes:**
- Description is either accepted or trimmed gracefully.
- No validation error occurs unless a length limit is enforced.
- Saved detail page displays the description appropriately.
- Screenshot point: `case-long-description`.

#### 3.2 Create Case with Special Characters
**Objective:** Verify subject and description accept accented and symbol characters.
**Steps:**
1. Set `Subject` to `Agentic Case – Q4 “Test”`.
2. Set `Description` to `Contains special chars: é, ñ, &, %, $`.
3. Save the case.
**Expected Outcomes:**
- Special characters persist after save.
- No encoding or truncation issues are observed.

#### 3.3 Create Case with Leading/Trailing Whitespace
**Objective:** Verify whitespace normalization on text fields.
**Steps:**
1. Enter `  Agentic Case  ` as the subject.
2. Save the case.
3. Verify the detail page displays the trimmed subject.
**Expected Outcomes:**
- The final saved subject is trimmed.
- Search and list views work with the normalized value.

#### 3.4 Use Save & New to Create Multiple Cases
**Objective:** Verify the form resets and allows back-to-back creation.
**Steps:**
1. Fill a new case and click `Save & New`.
2. Confirm the dialog resets.
3. Create a second case.
**Expected Outcomes:**
- First case saves successfully.
- The form clears for the next case.
- Second case can be created without residual values.
- Screenshot point: `case-save-and-new`.

#### 3.5 Cancel Case Creation
**Objective:** Verify cancel discards changes and returns to list view.
**Steps:**
1. Open the `New Case` dialog.
2. Enter test data in required fields.
3. Click `Cancel`.
**Expected Outcomes:**
- The dialog closes.
- No case is created.
- The list view remains unchanged.
- Screenshot point: `case-cancel-creation`.

### 4. Case Workflow and Verification

#### 4.1 Verify New Case Appears in All Cases
**Objective:** Confirm the created case is visible in the global list view.
**Steps:**
1. Return to the Cases tab after save.
2. Switch list view to `All Cases`.
3. Search for the created Subject.
**Expected Outcomes:**
- The new case appears as a record link.
- Case details are accessible from the list.
- Screenshot point: `case-in-list-view`.

#### 4.2 Verify Detail Page Values
**Objective:** Confirm saved field values render correctly on detail view.
**Steps:**
1. Open the saved case detail page.
2. Verify Subject, Status, Priority, Case Origin, Type, and Case Reason.
**Expected Outcomes:**
- All selected values match the creation input.
- No field value is missing or incorrect.
- Screenshot point: `case-detail-values`.

#### 4.3 Verify Toast and Post-Save Feedback
**Objective:** Ensure user receives clear confirmation after save.
**Steps:**
1. Save a case.
2. Observe the toast message.
**Expected Outcomes:**
- A success toast appears immediately.
- The toast text contains `Case` and `created`.
- No error toast is present.

### 5. Error and Resilience Scenarios

#### 5.1 Prevent Duplicate Contact Lookup Failures
**Objective:** Verify lookup handles multiple results and chooses the first match.
**Steps:**
1. Search for `contact` in `Contact Name`.
2. Select the first visible option.
3. Save the case.
**Expected Outcomes:**
- The first lookup result is used consistently.
- Case saves without lookup ambiguity.

#### 5.2 Handle Missing Required Field Errors Gracefully
**Objective:** Verify the UI reports missing required fields clearly.
**Steps:**
1. Attempt to save with one required field blank.
2. Observe validation behavior.
**Expected Outcomes:**
- The page shows a red error or inline validation.
- The form remains open for correction.

#### 5.3 Verify Session Stability on Navigation
**Objective:** Verify the user stays logged in after creating a case and returning to list view.
**Steps:**
1. Save a case.
2. Click the Cases tab.
3. Confirm the list view loads without re-login.
**Expected Outcomes:**
- No login prompt appears.
- The app remains in the same authenticated session.

### 6. Accessibility and UX Checks

#### 6.1 Keyboard Navigation through Case Form
**Objective:** Verify the new case form is keyboard accessible.
**Steps:**
1. Tab into the `New` button and open the dialog.
2. Tab through `Contact Name`, `Account Name`, picklists, `Subject`, and `Description`.
3. Activate `Save` with keyboard.
**Expected Outcomes:**
- All form controls are reachable with Tab.
- Keyboard activation works for save.
- Form fields are accessible and labeled.

#### 6.2 Verify Field Labels and Required Indicators
**Objective:** Confirm all case fields have clear labels and required markers.
**Steps:**
1. Inspect the `New Case` dialog labels.
2. Verify required fields show `* = Required Information` or equivalent.
**Expected Outcomes:**
- All visible fields have descriptive labels.
- Required fields are clearly indicated.

### 7. Post-conditions and Cleanup

#### 7.1 Verify Created Case is Searchable
**Objective:** Confirm the new case is searchable by its subject from the Cases list.
**Steps:**
1. Switch to `All Cases`.
2. Search the subject text if search is available.
**Expected Outcomes:**
- The created case appears in search results.
- The subject matches exactly.

#### 7.2 Confirm No Error Toasts Exist After Save
**Objective:** Ensure there are no error notifications once save completes.
**Steps:**
1. Observe toast notifications after save.
2. Verify only success feedback is present.
**Expected Outcomes:**
- No error toast is displayed.
- The UI state is stable.

## Expected Results
- The Cases list view opens successfully.
- The New Case dialog displays and all expected fields are present.
- Required and optional field selections persist after save.
- The new case saves successfully with a success toast.
- Validation prevents save when required fields are missing.
- The Case detail page loads and shows the created Subject and other selected values.
- The new case is visible in the `All Cases` list view.
- Lookup fields use the first valid autocomplete result.
- No error toast or error message appears during the happy path.

## Locator Strategy
- Use only semantic selectors: `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`.
- Do not use CSS class selectors or XPath for primary interactions.
- Use `waitForSFLoad(page)` after clicks or navigation.
- Scope actions to `page.getByRole('dialog')` when a modal is open.

## Screenshot Points
- `cases-list-view`
- `new-case-modal-open`
- `case-form-filled`
- `case-validation-no-contact`
- `case-validation-no-subject`
- `case-validation-missing-picklists`
- `case-long-description`
- `case-save-and-new`
- `case-cancel-creation`
- `case-detail-page`
- `case-in-list-view`
- `case-detail-values`
