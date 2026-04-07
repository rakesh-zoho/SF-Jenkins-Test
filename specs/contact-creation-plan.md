# Contact Creation Test Plan

## Metadata
- Feature: Contact Management
- Priority: P1
- Allure Epic: CRM
- Allure Feature: Contact Management
- Allure Story: Create New Contact
- Allure Severity: critical

## Preconditions
- Auth from seed fixture
- Contacts tab visible
- Account "Acme Corp" exists (create via API in beforeAll if needed)

## Steps

### Step 1: Navigate to Contacts Tab
- Action: Click "Contacts" in navigation
- Locator: `page.getByRole('link', { name: 'Contacts', exact: true })`
- Wait: `await waitForSFLoad(page);`
- Screenshot: contacts-list-view

### Step 2: Open New Contact Form
- Action: Click "New" button
- Locator: `page.getByRole('button', { name: 'New' })`
- Wait: `await page.getByRole('dialog').waitFor({ state: 'visible' });`
- Screenshot: new-contact-modal

### Step 3: Fill Contact Form
- Salutation: `await page.getByRole('combobox', { name: 'Salutation' }).click(); await page.getByRole('option', { name: 'Mr.' }).click();`
- First Name: `await page.getByLabel('First Name').fill('Agentic');`
- Last Name: `await page.getByLabel('Last Name').fill('Contact-[timestamp]');`
- Account Name: `await page.getByRole('combobox', { name: 'Account Name' }).fill('Acme Corp'); await page.waitForTimeout(600); await page.getByRole('option', { name: 'Acme Corp' }).first().click();`
- Title: `await page.getByLabel('Title').fill('QA Automation Engineer');`
- Department: `await page.getByLabel('Department').fill('Engineering');`
- Email: `await page.getByRole('textbox', { name: 'Email' }).fill('agentic.contact@sf-framework.com');`
- Business Phone: `await page.getByRole('textbox', { name: 'Phone', exact: true }).fill('+91-9800000002');`
- Mobile: `await page.getByLabel('Mobile').fill('+91-9800000003');`
- Lead Source: `await page.getByRole('combobox', { name: 'Lead Source' }).click(); await page.getByRole('option', { name: 'Web' }).click();`
- Mailing Street: `await page.getByLabel('Mailing Street').fill('456 Agent Lane');`
- Mailing City: `await page.getByLabel('Mailing City').fill('Bangalore');`
- Mailing State: `await page.getByLabel('Mailing State/Province').fill('Karnataka');`
- Mailing Zip: `await page.getByLabel('Mailing Zip/Postal Code').fill('560001');`
- Mailing Country: `await page.getByLabel('Mailing Country').fill('India');`
- Screenshot: contact-form-filled

### Step 4: Save + Assert
- Action: Click Save
- Locator: `page.getByRole('button', { name: 'Save', exact: true })`
- Wait: `await page.locator('.toastMessage').waitFor({ state: 'visible', timeout: 15000 });`
- Assert: `await expect(page.locator('.toastMessage')).toContainText('Contact'); await expect(page.locator('.toastMessage')).toContainText('created');`
- Screenshot: contact-toast

### Step 5: Verify Detail Page
- Assert: `await expect(page.getByRole('heading', { name: 'Mr. Agentic Contact-[timestamp]' })).toBeVisible();`
- Assert: `await expect(page.getByText('Acme Corp')).toBeVisible();`
- Assert: `await expect(page.getByText('QA Automation Engineer')).toBeVisible();`
- Screenshot: contact-detail

### Step 6: Verify in List View
- Action: Click Contacts tab
- Locator: `page.getByRole('link', { name: 'Contacts', exact: true })`
- Action: Switch to "All Contacts" if available, else Recently Viewed
- Locator for switch: `page.getByRole('button', { name: 'Select list display' }).click();` then `page.getByRole('option', { name: 'All Contacts' }).click();` (if exists)
- Assert: `await expect(page.getByRole('link', { name: 'Mr. Agentic Contact-[timestamp]' })).toBeVisible();`
- Screenshot: contact-in-list

### Step 7: Send Email (Activity)
- On detail page, click "New Task"
- Locator: `page.getByRole('button', { name: 'New Task' }).click();`
- Fill subject: `await page.getByLabel('Subject').fill('Follow up - [timestamp]');`
- Set Due Date: `await page.getByLabel('Due Date').fill(getDatePlusDays(7));`
- Save: `await page.getByRole('button', { name: 'Save' }).click();`
- Assert: `await expect(page.locator('.activityTimeline')).toContainText('Follow up - [timestamp]');`
- Screenshot: contact-activity-created

## Required Assertions
1. Toast visible after create
2. Detail page shows correct name, Account, Title
3. Contact visible in "All Contacts" list view
4. Activity created and visible in timeline