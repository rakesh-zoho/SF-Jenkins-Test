# Task: Automate Salesforce Opportunity Creation Flow

## Metadata
- Feature: Opportunity Management
- Priority: P1
- Allure Epic: CRM
- Allure Feature: Opportunity Management
- Allure Story: Create New Opportunity
- Allure Severity: critical
- Output Plan: specs/opportunity-flow-plan.md
- Output Spec: tests/opportunity-flow.spec.js

## Objective
Create a new Opportunity via Salesforce Lightning UI, link it to an Account,
and verify the record appears in the Opportunities list view.

## Preconditions
- Auth from seed fixture (storageState: reports/.auth-state.json)
- Use Account "Acme Corp" — create it via UI if it doesn't exist
- Opportunities tab visible in navigation

## Steps to Automate

### Step 1: Navigate to Opportunities
- Navigate to SF Lightning → click "Opportunities" in nav
- Wait for list view to load
- Screenshot: opportunities-list

### Step 2: Click New & Wait for Modal
- Click the "New" button
- Wait for the Opportunity creation modal (role=dialog)
- Screenshot: new-opportunity-modal

### Step 3: Fill Opportunity Form
| Field            | Value                          | Locator method      |
|------------------|--------------------------------|---------------------|
| Opportunity Name | Agentic Test [timestamp]       | getByLabel          |
| Account Name     | Acme Corp                      | fillLookup (lookup) |
| Close Date       | today + 30 days MM/DD/YYYY     | getByLabel          |
| Stage            | Needs Analysis                 | picklist            |
| Amount           | 50000                          | getByLabel          |

Screenshot: opportunity-form-filled

### Step 4: Save + Assert Toast
- Click Save
- Assert toast: "Opportunity was created"
- Screenshot: opportunity-saved

### Step 5: Verify Detail Page
- Assert heading contains "Agentic Test"
- Assert Stage shows "Needs Analysis"
- Screenshot: opportunity-detail

### Step 6: Verify in List View
- Click Opportunities nav tab
- Switch to "All Opportunities" view
- Assert record link visible by name
- Screenshot: opportunity-in-list

## Required Assertions
1. Toast visible and contains "was created"
2. Detail heading contains "Agentic Test"
3. Stage field shows "Needs Analysis" on detail page
4. Record appears in "All Opportunities" list view

## Notes for Agent
- Use getDatePlusDays(30) from utils/locator-utils.js for Close Date
- Account Name is a lookup: use fillLookup(page, 'Account Name', 'Acme Corp')
- Amount renders as currency automatically — enter digits only
