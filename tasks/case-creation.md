# Task: Automate Salesforce Case Creation Flow

## Metadata

* Feature: Case Management
* Priority: P1
* Allure Epic: CRM
* Allure Feature: Case Management
* Allure Story: Create New Case
* Allure Severity: critical
* Output Plan: specs/case-creation-plan.md
* Output Spec: tests/case-creation.spec.js

## Objective

Automate the complete end-to-end Case creation flow in Salesforce Lightning.
Create a new Case via the UI and verify it persists in the list view.

## Preconditions

* Use auth from tests/seed.spec.js (storageState: reports/.auth-state.json)
* Service app accessible, Cases tab visible in navigation

## Steps to Automate

### Step 1: Navigate to Cases Tab

* Navigate to Salesforce Lightning URL
* Click "Cases" in the top navigation bar
* Wait for Cases list view to load (call waitForSFLoad)
* Screenshot: cases-list-view

### Step 2: Open New Case Form

* Click the "New" button
* Wait for the Case creation modal (role=dialog) to be visible
* Screenshot: new-case-modal-open

### Step 3: Fill Case Form

Scope all interactions to the dialog element.

| Field        | Value                              | Locator method |
| ------------ | ---------------------------------- | -------------- |
| Contact Name | Agentic Test Contact               | getByLabel     |
| Account Name | SF Agentic Framework Inc.          | getByLabel     |
| Status       | New                                | picklist       |
| Priority     | Medium                             | picklist       |
| Case Origin  | Web                                | picklist       |
| Subject      | Test Case - [Date.now() timestamp] | getByLabel     |
| Description  | Automated test case creation flow  | getByLabel     |

Screenshot: case-form-filled

### Step 4: Save the Case

* Click the Save button in the dialog
* Immediately assert success toast visible
* Assert toast contains "Case" and "created"
* Screenshot: case-toast-success

### Step 5: Verify Case Detail Page

* Wait for the record detail page to load (waitForSFLoad)
* Assert the page heading contains the Case Subject
* Screenshot: case-detail-page

### Step 6: Verify in List View

* Click the Cases navigation tab
* Switch list view to "All Cases" (switchToAllRecords)
* Assert the record link is visible by Subject
* Screenshot: case-in-list-view

## Required Assertions (all must be present in generated spec)

1. Success toast is visible after save
2. Toast text contains "was created"
3. Detail page heading matches saved case subject
4. Case record appears by subject link in All Cases list view
5. No error toast or error message appears at any step

## Agent Instructions

* ONLY use: getByRole / getByLabel / getByText / getByPlaceholder locators
* Call waitForSFLoad(page) after every navigation
* Call captureScreenshot(page, 'step-name') after every major action
* Wrap every step in sfStep('Step description', page, async () => { ... })
* Use uniqueName('Agentic Case') from utils/locator-utils.js for test data
* afterEach: captureScreenshot on failure + attach to test.info()
