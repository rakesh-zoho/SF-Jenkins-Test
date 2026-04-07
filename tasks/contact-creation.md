# Task: Automate Salesforce Contact Creation Flow

## Metadata
- Feature: Contact Management
- Priority: P1
- Allure Epic: CRM
- Allure Feature: Contact Management
- Allure Story: Create New Contact
- Allure Severity: critical
- Output Plan: specs/contact-creation-plan.md
- Output Spec: tests/UI/contact-creation.spec.js

## Objective
Automate the full Contact creation flow in Salesforce Lightning.
Create a Contact linked to an existing Account and verify it.

## Preconditions
- Auth from seed fixture
- Contacts tab visible
- Account "Acme Corp" exists (create via API in beforeAll if needed)

## Steps to Automate

### Step 1: Navigate to Contacts Tab
- Click "Contacts" in navigation
- Wait for list view to load
- Screenshot: contacts-list-view

### Step 2: Open New Contact Form
- Click "New" button
- Wait for modal (role=dialog)
- Screenshot: new-contact-modal

### Step 3: Fill Contact Form
| Field          | Value                              |
|----------------|------------------------------------|
| Salutation     | Mr.                                |
| First Name     | Agentic                            |
| Last Name      | Contact-[timestamp]                |
| Account Name   | Acme Corp (lookup)                 |
| Title          | QA Automation Engineer             |
| Department     | Engineering                        |
| Email          | agentic.contact@sf-framework.com   |
| Business Phone | +91-9800000002                     |
| Mobile         | +91-9800000003                     |
| Lead Source    | Web                                |
| Mailing Street | 456 Agent Lane                     |
| Mailing City   | Bangalore                          |
| Mailing State  | Karnataka                          |
| Mailing Zip    | 560001                             |
| Mailing Country| India                              |

Screenshot: contact-form-filled

### Step 4: Save + Assert
- Click Save in dialog
- Assert toast: "Contact" + "created"
- Screenshot: contact-toast

### Step 5: Verify Detail Page
- Assert heading shows full contact name
- Assert Account Name shows "Acme Corp"
- Assert Title shows "QA Automation Engineer"
- Screenshot: contact-detail

### Step 6: Verify in List View
- Click Contacts tab
- Switch to "All Contacts"
- Assert contact record link visible
- Screenshot: contact-in-list

### Step 7: Send Email (Activity)
- On detail page, click "Send Email" or "New Task"
- Fill subject: "Follow up - [timestamp]"
- Set Due Date to today + 7 days
- Save
- Assert activity appears in Activity timeline
- Screenshot: contact-activity-created

## Required Assertions
1. Toast visible after create
2. Detail page shows correct name, Account, Title
3. Contact visible in "All Contacts" list view
4. Activity created and visible in timeline

## Agent Instructions
- Account Name is a lookup — use fillLookup(page, 'Account Name', 'Acme Corp')
- Salutation is a picklist — use selectPicklist
- waitForSFLoad after every navigation
- All screenshots via captureScreenshot(page, 'step-name')
- sfStep() wrappers, allure annotations
- Output spec goes to tests/UI/contact-creation.spec.js
