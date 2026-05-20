# Task: Automate Salesforce Account Creation Flow

## Metadata
- Feature: Account Management
- Priority: P1
- Allure Epic: CRM
- Allure Feature: Account Management
- Allure Story: Create New Account
- Allure Severity: critical
- Output Plan: specs/account-creation-plan.md
- Output Spec: tests/UI/account-creation.spec.js

## Objective
Automate the end-to-end Account creation flow in Salesforce Lightning.
Create a new Account record and verify it appears in the Account list view.

## Preconditions
- Auth from tests/seed.spec.js (storageState: reports/.auth-state.json)
- Sales app accessible, Accounts tab visible in navigation

## Steps to Automate

### Step 1: Navigate to Accounts Tab
- Navigate to SF Lightning → click "Accounts" in the nav bar
- Wait for Accounts list view to load (waitForSFLoad)
- Screenshot: accounts-list-view

### Step 2: Open New Account Form
- Click the "New" button
- Wait for the Account creation modal (role=dialog) to be visible
- Screenshot: new-account-modal

### Step 3: Fill Account Form
| Field            | Value                              |
|------------------|------------------------------------|
| Account Name     | Agentic Corp [timestamp]           |
| Phone            | +91-9800000001                     |
| Website          | https://agentic-framework.com      |
| Industry         | Technology                         |
| Type             | Prospect                           |
| Billing Street   | 123 Test Street                    |
| Billing City     | Jaipur                             |
| Billing State    | Rajasthan                          |
| Billing Zip      | 302001                             |
| Billing Country  | India                              |
| Employees        | 500                                |
| Annual Revenue   | 5000000                            |
| Description      | Created by SF Agentic Framework    |

Screenshot: account-form-filled

### Step 4: Save + Assert Toast
- Click Save button in the dialog
- Assert success toast visible and contains "Account" + "created"
- Screenshot: account-toast-success

### Step 5: Verify Account Detail Page
- Wait for the record detail page (waitForSFLoad)
- Assert page heading contains "Agentic Corp"
- Assert Industry field shows "Technology"
- Assert Type field shows "Prospect"
- Screenshot: account-detail-page

### Step 6: Verify in List View
- Click Accounts navigation tab
- Switch list view to "All Accounts"
- Assert the record link is visible by Account Name
- Screenshot: account-in-list-view

### Step 7: Edit Account (Inline)
- On the detail page, click "Edit" button
- Change Type from "Prospect" to "Customer - Direct"
- Save
- Assert toast confirms update
- Assert Type field now shows "Customer - Direct"
- Screenshot: account-edited

## Required Assertions
1. Toast visible after create, contains "was created"
2. Detail page heading matches Account Name
3. All key fields saved correctly (Industry, Type)
4. Account appears in "All Accounts" list view by name
5. Edit flow updates Type field successfully

## Agent Instructions
- Use ONLY getByRole / getByLabel / getByText / getByPlaceholder
- waitForSFLoad(page) after every navigation
- captureScreenshot(page, 'step-name') after every step
- sfStep() wrappers for each step, allure annotations in beforeEach
- afterEach: screenshot on failure
- Use uniqueName('Agentic Corp') from utils/locator-utils.js
