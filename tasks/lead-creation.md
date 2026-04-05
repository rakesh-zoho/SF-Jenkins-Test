# Task: Automate Salesforce Lead Creation Flow

## Metadata
- Feature: Lead Management
- Priority: P1
- Allure Epic: CRM
- Allure Feature: Lead Management
- Allure Story: Create New Lead
- Allure Severity: critical
- Output Plan: specs/lead-creation-plan.md
- Output Spec: tests/lead-creation.spec.js

## Objective
Automate the complete end-to-end Lead creation flow in Salesforce Lightning.
Create a new Lead via the UI and verify it persists in the list view.

## Preconditions
- Use auth from tests/seed.spec.js (storageState: reports/.auth-state.json)
- Sales app accessible, Leads tab visible in navigation

## Steps to Automate

### Step 1: Navigate to Leads Tab
- Navigate to Salesforce Lightning URL
- Click "Leads" in the top navigation bar
- Wait for Leads list view to load (call waitForSFLoad)
- Screenshot: leads-list-view

### Step 2: Open New Lead Form
- Click the "New" button
- Wait for the Lead creation modal (role=dialog) to be visible
- Screenshot: new-lead-modal-open

### Step 3: Fill Lead Form
Scope all interactions to the dialog element.

| Field       | Value                              | Locator method |
|-------------|------------------------------------|----------------|
| First Name  | Agentic                            | getByLabel     |
| Last Name   | Test-[Date.now() timestamp]        | getByLabel     |
| Company     | SF Agentic Framework Inc.          | getByLabel     |
| Email       | agentic.test@sf-framework.com      | getByLabel     |
| Phone       | +91-9876543210                     | getByLabel     |
| Lead Source | Web                                | picklist       |
| Status      | Open - Not Contacted               | picklist       |

Screenshot: lead-form-filled

### Step 4: Save the Lead
- Click the Save button in the dialog
- Immediately assert success toast visible
- Assert toast contains "Lead" and "created"
- Screenshot: lead-toast-success

### Step 5: Verify Lead Detail Page
- Wait for the record detail page to load (waitForSFLoad)
- Assert the page heading contains the full lead name
- Screenshot: lead-detail-page

### Step 6: Verify in List View
- Click the Leads navigation tab
- Switch list view to "All Leads" (switchToAllRecords)
- Assert the record link is visible by full name
- Screenshot: lead-in-list-view

## Required Assertions (all must be present in generated spec)
1. Success toast is visible after save
2. Toast text contains "was created"
3. Detail page heading matches saved lead name
4. Lead record appears by name link in All Leads list view
5. No error toast or error message appears at any step

## Agent Instructions
- ONLY use: getByRole / getByLabel / getByText / getByPlaceholder locators
- Call waitForSFLoad(page) after every navigation
- Call captureScreenshot(page, 'step-name') after every major action
- Wrap every step in sfStep('Step description', page, async () => { ... })
- Use uniqueName('Agentic Test') from utils/locator-utils.js for test data
- afterEach: captureScreenshot on failure + attach to test.info()

