# Task: Automate Salesforce Lead Conversion Flow

## Metadata

* Feature: Lead Management
* Priority: P1
* Allure Epic: CRM
* Allure Feature: Lead Conversion
* Allure Story: Convert Lead to Account/Contact/Opportunity
* Allure Severity: critical
* Output Plan: specs/lead-conversion-plan.md
* Output Spec: tests/lead-conversion.spec.js

## Objective

Automate the complete end-to-end Lead Conversion flow in Salesforce Lightning.
Convert an existing Lead into Account, Contact, and optionally Opportunity, and verify all records are created correctly.

## Preconditions

* Use auth from tests/seed.spec.js (storageState: reports/.auth-state.json)
* Sales app accessible, Leads tab visible in navigation
* At least one Lead record exists (or create via API/seed)
* User has permission to convert Leads

## Steps to Automate

### Step 1: Navigate to Leads Tab

* Navigate to Salesforce Lightning URL
* Click "Leads" in the top navigation bar
* Wait for Leads list view to load (call waitForSFLoad)
* Screenshot: leads-list-view

### Step 2: Open Lead Record

* Select an existing Lead from the list view
* Click on Lead name link
* Wait for Lead detail page to load
* Capture Lead Name for later assertions
* Screenshot: lead-detail-page

### Step 3: Click Convert Button

* Click the "Convert" button
* Wait for Convert dialog (role=dialog) to be visible
* Screenshot: convert-modal-open

### Step 4: Configure Conversion Options

Scope all interactions to the dialog element.

| Field                | Value                          | Locator method |
| -------------------- | ------------------------------ | -------------- |
| Account Name         | Use existing or auto-filled    | getByLabel     |
| Contact Name         | Auto-populated from Lead       | getByLabel     |
| Opportunity Name     | Test Opportunity - [timestamp] | getByLabel     |
| Opportunity Creation | Checked (Create Opportunity)   | checkbox       |

* Ensure "Create Opportunity" is checked (if required)
* Optionally test unchecking for negative scenario

Screenshot: conversion-form-filled

### Step 5: Confirm Conversion

* Click "Convert" button inside dialog
* Wait for success toast
* Assert toast contains "converted"
* Screenshot: conversion-toast-success

### Step 6: Verify Account Record

* Wait for Account page to load
* Assert Account Name matches expected value
* Screenshot: account-record-page

### Step 7: Verify Contact Record

* Navigate to related Contact (via related tab or link)
* Assert Contact Name matches Lead name
* Screenshot: contact-record-page

### Step 8: Verify Opportunity Record

* Navigate to Opportunity record
* Assert Opportunity Name matches input value
* Screenshot: opportunity-record-page

### Step 9: Verify Lead is Converted

* Navigate back to Leads tab
* Search or filter for the Lead
* Assert Lead status is "Converted"
* Screenshot: lead-converted-status

## Required Assertions (all must be present in generated spec)

1. Convert modal is visible after clicking Convert
2. Success toast is visible after conversion
3. Toast text contains "converted"
4. Account record is created with correct name
5. Contact record matches Lead name
6. Opportunity record is created with correct name (if enabled)
7. Lead status is updated to "Converted"
8. No error toast or error message appears at any step

## Agent Instructions

* ONLY use: getByRole / getByLabel / getByText / getByPlaceholder locators
* Call waitForSFLoad(page) after every navigation
* Call captureScreenshot(page, 'step-name') after every major action
* Wrap every step in sfStep('Step description', page, async () => { ... })
* Use uniqueName('Conversion Test') from utils/locator-utils.js for test data
* Store dynamic values (Lead Name, Opportunity Name) for assertions
* afterEach: captureScreenshot on failure + attach to test.info()