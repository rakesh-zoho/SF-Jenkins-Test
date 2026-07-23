# Task: Manual Creation of Student Leads in Salesforce

## Metadata
- Feature: Lead Management / Manual Creation
- Priority: P1
- Allure Epic: CRM
- Allure Feature: Lead Management
- Allure Story: Create New Lead (Manual)
- Allure Severity: normal
- Output Plan: specs/lead-creation-plan.md
- Output Spec: tests/lead-creation.spec.js

## Objective
Automate the manual Lead creation flow in Salesforce Lightning to verify that users can create student Leads from the Leads tab. The test will validate required fields, data entry (phone, email, city, rating), picklist selections (Lead Source, Rating), and the success confirmation flow.

## Preconditions
- Use auth from tests/seed.spec.js (storageState: reports/.auth-state.json)
- Sales app accessible in SF Lightning — Leads tab visible in the top navigation
- The user's Lead Page Layout includes `Last Name` and `City` fields
- No existing data dependencies; tests create a new Lead record

## Steps to Automate

### Step 1: Navigate to Leads Tab
- Navigate to Salesforce Lightning URL: process.env.SF_URL
- Open the App Launcher and search for "Sales" (or the configured app where Leads is available)
- Click "Leads" tab in the top navigation bar
- Wait for Leads list view to load — call waitForSFLoad(page)
- Screenshot: lead-list-view

### Step 2: Open New Lead Form
- Click the "New" button (getByRole 'button' name 'New')
- Wait for the Lead creation modal (role=dialog) to be visible
- Screenshot: new-lead-modal-open

### Step 3: Fill Lead Form
Scope all interactions to the dialog element (page.getByRole('dialog')).

| Field        | Value                                    | Locator method |
|--------------|------------------------------------------|----------------|
| Last Name    | uniqueName('Student')                    | getByLabel     |
| Company      | "Individual" (or provided value)        | getByLabel     |
| Lead Status  | "Open" (default)                        | picklist       |
| Phone        | "+<countryCode>1234567890" (unique)    | getByLabel     |
| Email        | uniqueName('student') + '@example.com'   | getByLabel     |
| Rating       | "Hot" or "Cold"                       | picklist       |
| City         | "Test City" (or dynamic value)         | getByLabel     |
| Lead Source  | "Web" or "Other"                      | picklist       |

Screenshot: lead-form-filled

### Step 4: Save the Lead
- Click the Save button inside the dialog (getByRole 'button' name 'Save' exact:true)
- Immediately assert success toast is visible (.toastMessage)
- Assert toast contains "Lead was created" or "Lead was created" substring
- Screenshot: lead-save-success

### Step 5: Verify Lead Detail Page
- Wait for the record detail page to load — call waitForSFLoad(page)
- Assert the page heading contains the full Lead name (Last Name or combined name)
- Assert `Phone`, `Email`, `City`, `Rating`, `Lead Source` values match the submitted values
- Screenshot: lead-detail-page

### Step 6: Verify in List View
- Click the Leads navigation tab
- Switch list view from "Recently Viewed" to "All Leads" — call switchToAllRecords(page, 'Leads')
- Assert the new record link is visible by the full Lead name
- Screenshot: lead-in-list-view

## Required Assertions (all must be present in generated spec)
1. Success toast is visible immediately after clicking Save
2. Toast text contains "Lead was created"
3. Detail page heading matches the saved Lead name
4. Lead record appears as a clickable link in All Leads list view
5. No error toast or error message appears at any step
6. Required fields validation prevents save when Last Name or Company is missing
7. Email input enforces valid email format

## Agent Instructions
- ONLY use: getByRole / getByLabel / getByText / getByPlaceholder locators
- Never use CSS classes (only exception: .toastMessage for toast assertions)
- Call waitForSFLoad(page) after every click, navigation, and form save
- Call captureScreenshot(page, 'step-name') after every major action
- Wrap every step in sfStep('Step description', page, async () => { ... })
- Use uniqueName('Student') from utils/seed.js for names and emails
- afterEach: captureScreenshot on failure + attach to test.info()
- Toast assertion must come BEFORE waitForSFLoad — toast disappears in ~3s
- Scope all form fills to dialog: const dialog = page.getByRole('dialog')

## Notes / Questions
- Jira did not include an explicit Priority field; mapped to P1 by default. If priority should be P0, tell me and I will update the metadata.
- Confirm the target app name if it's not "Sales" so I can update the navigation step.
