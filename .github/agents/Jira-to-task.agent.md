---
name: jira-to-tasks
description: >
  Reads a Jira story via Atlassian Rovo MCP and converts it into a
  structured task.md file in the exact format the Planner agent expects.
  The output format matches the SF Agentic Framework task standard.
tools:'com.atlassian/atlassian-mcp-server/*', 'atlassian/*'
[edit/editFiles, search/codebase, 'com.atlassian/atlassian-mcp-server/*', 'atlassian/*']
---

# Jira to Tasks Agent

## Step 1 — Load Context

Read before doing anything:
1. `memory/framework-memory.md`
2. `memory/agent-context.md`

## Step 2 — Fetch the Story

User will say: "Fetch SF-45" or "Get story SF-45 and create task file".

Use `jira_get_issue` with the key. Extract:
- **Summary** → becomes the task title
- **Description** → Objective and Preconditions
- **Acceptance Criteria** → Steps to Automate + Required Assertions
- **Priority** (Blocker/Critical/High/Medium/Low) → map to P0/P1/P2
- **Labels / Components** → Allure Epic and Feature
- **Issue type** → Story/Bug/Task

## Step 3 — Identify the Salesforce Object and Flow

From the story summary and description, identify:
- Which SF object: Lead / Opportunity / Account / Contact / Case / Campaign
- Which flow: Create / Edit / Convert / Delete / List View / Report
- Which app: Sales / Service / Marketing

## Step 4 — Write the Task File

Write to: `tasks/[object]-[flow]-task.md`
Examples: `tasks/lead-creation-task.md`, `tasks/opportunity-conversion-task.md`

**Follow this exact structure — fill every section with content from the Jira story:**

``
# Task: [Paste the Jira story summary here]

## Metadata
- Feature: [Object + flow — e.g. Lead Management / Opportunity Pipeline]
- Priority: [P0 for Blocker/Critical/High | P1 for Medium | P2 for Low]
- Allure Epic: [CRM / Sales Cloud / Service Cloud — pick based on object]
- Allure Feature: [e.g. Lead Management / Case Management]
- Allure Story: [Short scenario name — e.g. Create New Lead / Convert Lead]
- Allure Severity: [blocker for P0 | critical for P1 | normal for P2]
- Output Plan: specs/[object]-[flow]-plan.md
- Output Spec: tests/[object]-[flow].spec.js

## Objective
[2-3 sentences from the Jira description explaining WHAT is being automated and WHY.
Be specific: name the SF object, the UI flow, and what business outcome is verified.]

## Preconditions
- Use auth from tests/seed.spec.js (storageState: reports/.auth-state.json)
- [App name] app accessible in SF Lightning — [Object] tab visible in navigation
- [Any org-specific setup from the Jira story — e.g. "Custom fields must be configured"]
- [Any data dependency — e.g. "An existing Account record must be available"]

## Steps to Automate

### Step 1: Navigate to [Object] Tab
- Navigate to Salesforce Lightning URL: process.env.SF_URL
- Open the App Launcher and search for "[App Name]"
- Click "[Object]" tab in the top navigation bar
- Wait for [Object] list view to load — call waitForSFLoad(page)
- Screenshot: [object]-list-view

### Step 2: Open New [Object] Form
- Click the "New" button (getByRole 'button' name 'New')
- Wait for the [Object] creation modal (role=dialog) to be visible
- Screenshot: new-[object]-modal-open

### Step 3: Fill [Object] Form
Scope all interactions to the dialog element (page.getByRole('dialog')).

[BUILD THIS TABLE FROM THE JIRA STORY FIELDS / ACCEPTANCE CRITERIA]
[Every field mentioned in the story goes here with its locator strategy]

| Field        | Value                                    | Locator method |
|--------------|------------------------------------------|----------------|
| [Field 1]    | [Value from story — use uniqueName() for names] | getByLabel |
| [Field 2]    | [Value — use Date.now() for emails]      | getByLabel     |
| [Picklist 1] | [Picklist value from story]              | picklist       |
| [Lookup 1]   | [Lookup value from story]                | lookup         |

Screenshot: [object]-form-filled

### Step 4: Save the [Object]
- Click the Save button inside the dialog (getByRole 'button' name 'Save' exact:true)
- Immediately assert success toast is visible (.toastMessage — DO NOT wait before asserting)
- Assert toast contains "was created"
- Screenshot: [object]-save-success

### Step 5: Verify [Object] Detail Page
- Wait for the record detail page to load — call waitForSFLoad(page)
- Assert the page heading contains the full [object] name
- [Add any field-level assertions from the Jira ACs — e.g. assert Status = 'Open']
- Screenshot: [object]-detail-page

### Step 6: Verify in List View
- Click the [Object] navigation tab
- Switch list view from "Recently Viewed" to "All [Objects]" — call switchToAllRecords(page, '[Objects]')
- Assert the new record link is visible by the full [object] name
- Screenshot: [object]-in-list-view

[ADD MORE STEPS IF THE JIRA STORY COVERS ADDITIONAL FLOWS]
[e.g. Step 7: Verify field mapping / Step 8: Test duplicate detection]

## Required Assertions (all must be present in generated spec)
[DERIVE THESE DIRECTLY FROM THE JIRA ACCEPTANCE CRITERIA]
[Number them — each AC item becomes at least one assertion]

1. Success toast is visible immediately after clicking Save
2. Toast text contains "was created"
3. Detail page heading matches the saved [object] name
4. [Object] record appears as a clickable link in All [Objects] list view
5. No error toast or error message appears at any step
[6. Add one line per AC item from the Jira story]

## Agent Instructions
- ONLY use: getByRole / getByLabel / getByText / getByPlaceholder locators
- Never use CSS classes (only exception: .toastMessage for toast assertions)
- Call waitForSFLoad(page) after every click, navigation, and form save
- Call captureScreenshot(page, 'step-name') after every major action
- Wrap every step in sfStep('Step description', page, async () => { ... })
- Use uniqueName('[Prefix]') from utils/locator-utils.js for names and emails
- afterEach: captureScreenshot on failure + attach to test.info()
- Toast assertion must come BEFORE waitForSFLoad — toast disappears in ~3s
- Scope all form fills to dialog: const dialog = page.getByRole('dialog')
- [Add any SF-specific notes extracted from the Jira story or ACs]
``

## Step 5 — How to Map Jira Content to Task Sections

Use these rules when reading the Jira story:

**Summary → Task Title**
Jira: "As a Sales rep I want to create Leads from the UI"
Task: `# Task: Automate Salesforce Lead Creation Flow`

**Priority → P level and Severity**
- Blocker / Critical → P0 / blocker
- High → P0 / critical
- Medium → P1 / normal
- Low → P2 / minor

**Description → Objective**
Extract the business purpose. Drop Jira-specific language.
Write 2-3 plain sentences about what the test does and why it matters.

**Acceptance Criteria → Steps + Assertions**
Each AC item becomes either a Step (if it's an action) or an Assertion (if it's a check).

Example AC: "Given I am on the Leads tab, when I click New and fill all required fields and click Save, then the Lead is created and I see a success toast"
→ Step 2: Open New Lead Form
→ Step 3: Fill Lead Form (table)
→ Step 4: Save the Lead
→ Assertion 1: Success toast visible
→ Assertion 2: Toast contains "was created"

**Fields mentioned in story → Field table rows**
AC: "The form must accept First Name, Last Name, Company, Email, Phone, Lead Source"
→ One row per field in the Step 3 table

**Locator method column rules:**
- Text input → getByLabel
- Dropdown/picklist → picklist
- Related record field → lookup
- Search field → getByPlaceholder
- Checkbox → getByLabel (check)

## Step 6 — Comment Back on Jira

Use `jira_add_comment` after creating the file:

``
🤖 SF Agentic Framework — Task file created

File: tasks/[filename]-task.md

To generate the test plan:
  Open VS Code Copilot Chat → Agent mode
  Select @🎭 planner
  Prompt: "Read tasks/[filename]-task.md and memory/framework-memory.md.
           Explore Salesforce and write the plan to specs/[filename]-plan.md"

Verify auth works first:
  npx playwright test tests/seed.spec.js --project=chromium
``

## Step 7 — Report to User

Tell the user:
1. File created: `tasks/[filename]-task.md`
2. Any fields or steps you could not determine from the story (ask for clarification)
3. The exact prompt to give the Planner agent next