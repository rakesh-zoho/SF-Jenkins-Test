# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lead-creation.spec.js >> 2. Lead Creation - Field Validation >> 2.1 Attempt to Save Lead Without Required Fields
- Location: tests\lead-creation.spec.js:143:3

# Error details

```
TimeoutError: locator.click: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('option', { name: /^Leads$/i })

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic [ref=e2]:
      - generic [ref=e3]:
        - link "Skip to Navigation" [ref=e4] [cursor=pointer]:
          - /url: javascript:void(0);
        - link "Skip to Main Content" [ref=e5] [cursor=pointer]:
          - /url: javascript:void(0);
        - generic [ref=e6]:
          - button "Search" [ref=e12]:
            - img [ref=e14]
            - text: Search...
          - navigation "Global Header" [ref=e17]:
            - list [ref=e19]:
              - listitem [ref=e20]:
                - group [ref=e21]:
                  - button "This item doesn't support favorites" [ref=e23] [cursor=pointer]:
                    - generic [ref=e24]:
                      - img [ref=e28]
                      - tooltip "This item doesn't support favorites"
                  - button "Favorites list" [ref=e32] [cursor=pointer]:
                    - generic [ref=e33]:
                      - img [ref=e37]
                      - tooltip "Favorites list"
              - listitem [ref=e40]:
                - button "Global Actions" [disabled] [ref=e42]:
                  - img [ref=e46]
              - listitem [ref=e49]:
                - button "Guidance Center" [ref=e51] [cursor=pointer]:
                  - generic [ref=e52]:
                    - img [ref=e56]
                    - tooltip "Guidance Center"
              - listitem [ref=e59]:
                - button "Salesforce Help" [ref=e62] [cursor=pointer]:
                  - generic [ref=e63]:
                    - img [ref=e67]
                    - tooltip "Salesforce Help"
              - listitem [ref=e70]:
                - button "Setup" [ref=e76] [cursor=pointer]:
                  - generic [ref=e77]:
                    - img [ref=e81]
                    - tooltip "Setup"
              - listitem [ref=e84]:
                - button "2 Notifications" [ref=e87] [cursor=pointer]:
                  - generic [ref=e88]:
                    - generic [ref=e89]:
                      - img [ref=e93]
                      - generic [ref=e97]: "2"
                    - tooltip "Notifications"
                - generic [ref=e98]: 2 new notifications
              - listitem [ref=e99]:
                - button "View profile" [ref=e102] [cursor=pointer]:
                  - generic [ref=e103]:
                    - tooltip "View profile"
      - generic [ref=e107]:
        - generic [ref=e110]:
          - generic [ref=e112]:
            - navigation "App" [ref=e113]:
              - button "App Launcher" [expanded] [ref=e115] [cursor=pointer]:
                - generic [ref=e126]: App Launcher
            - heading "Sales" [level=1] [ref=e127]:
              - generic "Sales" [ref=e128]
          - navigation "Global" [ref=e131]:
            - list [ref=e132]:
              - listitem [ref=e133] [cursor=pointer]:
                - link "Home" [ref=e134]:
                  - /url: /lightning/page/home
                  - generic [ref=e135]: Home
              - listitem [ref=e136]:
                - link "Opportunities" [ref=e137] [cursor=pointer]:
                  - /url: /lightning/o/Opportunity/home
                  - generic [ref=e138]: Opportunities
                - button "Opportunities List" [ref=e142] [cursor=pointer]:
                  - img [ref=e146]
                  - generic [ref=e149]: Opportunities List
              - listitem [ref=e150]:
                - link "Leads" [ref=e151] [cursor=pointer]:
                  - /url: /lightning/o/Lead/home
                  - generic [ref=e152]: Leads
                - button "Leads List" [ref=e156] [cursor=pointer]:
                  - img [ref=e160]
                  - generic [ref=e163]: Leads List
              - listitem [ref=e164]:
                - link "Tasks" [ref=e165] [cursor=pointer]:
                  - /url: /lightning/o/Task/home
                  - generic [ref=e166]: Tasks
                - button "Tasks List" [ref=e170] [cursor=pointer]:
                  - img [ref=e174]
                  - generic [ref=e177]: Tasks List
              - listitem [ref=e178]:
                - link "Files" [ref=e179] [cursor=pointer]:
                  - /url: /lightning/o/ContentDocument/home
                  - generic [ref=e180]: Files
                - button "Files List" [ref=e184] [cursor=pointer]:
                  - img [ref=e188]
                  - generic [ref=e191]: Files List
              - listitem [ref=e192]:
                - link "Accounts" [ref=e193] [cursor=pointer]:
                  - /url: /lightning/o/Account/home
                  - generic [ref=e194]: Accounts
                - button "Accounts List" [ref=e198] [cursor=pointer]:
                  - img [ref=e202]
                  - generic [ref=e205]: Accounts List
              - listitem [ref=e206]:
                - link "Contacts" [ref=e207] [cursor=pointer]:
                  - /url: /lightning/o/Contact/home
                  - generic [ref=e208]: Contacts
                - button "Contacts List" [ref=e212] [cursor=pointer]:
                  - img [ref=e216]
                  - generic [ref=e219]: Contacts List
              - listitem [ref=e220]:
                - link "Campaigns" [ref=e221] [cursor=pointer]:
                  - /url: /lightning/o/Campaign/home
                  - generic [ref=e222]: Campaigns
                - button "Campaigns List" [ref=e226] [cursor=pointer]:
                  - img [ref=e230]
                  - generic [ref=e233]: Campaigns List
              - listitem [ref=e234]:
                - link "Dashboards" [ref=e235] [cursor=pointer]:
                  - /url: /lightning/o/Dashboard/home
                  - generic [ref=e236]: Dashboards
                - button "Dashboards List" [ref=e240] [cursor=pointer]:
                  - img [ref=e244]
                  - generic [ref=e247]: Dashboards List
              - listitem [ref=e248]:
                - link "Reports" [ref=e249] [cursor=pointer]:
                  - /url: /lightning/o/Report/home
                  - generic [ref=e250]: Reports
                - button "Reports List" [ref=e254] [cursor=pointer]:
                  - img [ref=e258]
                  - generic [ref=e261]: Reports List
              - listitem [ref=e262]:
                - link "Chatter" [ref=e263] [cursor=pointer]:
                  - /url: /lightning/page/chatter
                  - generic [ref=e264]: Chatter
              - listitem [ref=e265]:
                - button "Show more navigation items" [ref=e267] [cursor=pointer]:
                  - generic [ref=e268]: More
                  - img [ref=e272]
                  - generic [ref=e275]: Show more navigation items
              - listitem [ref=e276]:
                - button "Edit nav items" [ref=e278] [cursor=pointer]:
                  - img [ref=e280]
                  - generic [ref=e283]: Edit nav items
        - main [ref=e285]:
          - generic [ref=e293]:
            - heading "Home" [level=1] [ref=e294]
            - article [ref=e296]:
              - heading "Seller HomeGood afternoon, Rakesh. Let's get selling!" [level=1] [ref=e297]
            - generic [ref=e298]:
              - article [ref=e301]:
                - heading "Close Deals" [level=2] [ref=e305]
                - generic [ref=e306]:
                  - generic [ref=e307]: Opportunities owned by me and closing this quarter
                  - generic [ref=e308]:
                    - generic [ref=e311]:
                      - img [ref=e313]
                      - generic [ref=e315]:
                        - generic [ref=e316]: ₹0
                        - generic [ref=e317]: Total Pipeline
                    - generic [ref=e319]:
                      - generic [ref=e325]: ₹0 Open
                      - generic [ref=e331]: ₹0 Won
                      - generic [ref=e337]: ₹0 Lost
                - button "View Opportunities (opens in new tab)" [ref=e339] [cursor=pointer]: View Opportunities
              - article [ref=e342]:
                - heading "Plan My Accounts" [level=2] [ref=e346]
                - generic [ref=e347]:
                  - generic [ref=e348]: Accounts owned by me
                  - generic [ref=e349]:
                    - generic [ref=e352]:
                      - img [ref=e354]
                      - generic [ref=e356]:
                        - generic [ref=e357]: "0"
                        - generic [ref=e358]: Accounts
                    - generic [ref=e360]:
                      - generic [ref=e366]: 0 Upcoming Activity
                      - generic [ref=e372]: 0 Past Activity
                      - generic [ref=e378]: 0 No Activity
                - button "View Accounts (opens in new tab)" [ref=e380] [cursor=pointer]: View Accounts
              - article [ref=e383]:
                - heading "Grow Relationships" [level=2] [ref=e387]
                - generic [ref=e388]:
                  - generic [ref=e389]: Contacts owned by me and created in the last 90 days
                  - generic [ref=e390]:
                    - generic [ref=e393]:
                      - img [ref=e395]
                      - generic [ref=e397]:
                        - generic [ref=e398]: "0"
                        - generic [ref=e399]: Contacts
                    - generic [ref=e401]:
                      - generic [ref=e407]: 0 Upcoming Activity
                      - generic [ref=e413]: 0 Past Activity
                      - generic [ref=e419]: 0 No Activity
                - button "View Contacts (opens in new tab)" [ref=e421] [cursor=pointer]: View Contacts
              - article [ref=e424]:
                - heading "Build Pipeline" [level=2] [ref=e428]
                - generic [ref=e429]:
                  - generic [ref=e430]: Leads owned by me and created in the last 30 days
                  - generic [ref=e431]:
                    - generic [ref=e434]:
                      - img [ref=e436]
                      - generic [ref=e438]:
                        - generic [ref=e439]: "61"
                        - generic [ref=e440]: Leads
                    - generic [ref=e442]:
                      - generic [ref=e448]: 0 Upcoming Activity
                      - generic [ref=e454]: 0 Past Activity
                      - generic [ref=e460]: 61 No Activity
                - button "View Leads (opens in new tab)" [ref=e462] [cursor=pointer]: View Leads
              - generic [ref=e465]:
                - article [ref=e468]:
                  - generic [ref=e471]:
                    - heading "My Goals" [level=2] [ref=e472]:
                      - generic [ref=e473]: My Goals
                    - button "Edit my goals" [ref=e475] [cursor=pointer]:
                      - img [ref=e477]
                  - generic [ref=e480]:
                    - generic [ref=e481]: Set personal weekly or monthly goals for emails, calls, and meetings.
                    - button "Set goals" [ref=e483] [cursor=pointer]
                - article [ref=e486]:
                  - heading "Set Goals" [level=2] [ref=e490]:
                    - generic [ref=e491]: Set Goals
                  - generic [ref=e492]:
                    - generic [ref=e493]:
                      - generic [ref=e497]:
                        - generic [ref=e498]: Meetings
                        - spinbutton "Meetings" [disabled] [ref=e500]
                      - generic [ref=e504]:
                        - generic [ref=e505]: Calls
                        - spinbutton "Calls" [disabled] [ref=e507]
                      - generic [ref=e511]:
                        - generic [ref=e512]: Emails
                        - spinbutton "Emails" [disabled] [ref=e514]
                      - generic [ref=e517]:
                        - generic [ref=e519]: Time Frame
                        - generic [ref=e523]:
                          - combobox "Time Frame" [disabled] [ref=e524]:
                            - generic [ref=e525]: Monthly
                          - img [ref=e529]
                        - status
                    - generic [ref=e532]:
                      - generic:
                        - button "Cancel" [disabled]
                      - generic:
                        - button "Save" [disabled]
              - article [ref=e535]:
                - heading "Today's Events" [level=2] [ref=e539]:
                  - generic "Today's Events" [ref=e540]
                - generic [ref=e544]:
                  - img [ref=e545]
                  - generic [ref=e546]: Looks like you're free and clear the rest of the day.
                - button "View Calendar" [ref=e548] [cursor=pointer]
              - article [ref=e551]:
                - generic [ref=e552]:
                  - heading "Today’s Tasks" [level=2] [ref=e555]:
                    - generic "Today’s Tasks" [ref=e556]
                  - button "Select a view of your tasks" [ref=e559] [cursor=pointer]:
                    - img [ref=e561]
                    - generic [ref=e564]: Select a view of your tasks
                - generic [ref=e568]:
                  - img [ref=e569]
                  - generic [ref=e570]: Nothing due today. Be a go-getter, and check back soon.
                - button "View All Tasks" [ref=e572] [cursor=pointer]: View All
              - article [ref=e575]:
                - heading "Recent Records" [level=2] [ref=e579]:
                  - generic "Recent Records" [ref=e580]
                - list [ref=e582]:
                  - listitem [ref=e583]:
                    - generic [ref=e584]:
                      - img [ref=e588]
                      - link "Jane Smith" [ref=e591] [cursor=pointer]:
                        - /url: /lightning/r/00QdN00000DnKCbUAN/view
                  - listitem [ref=e592]:
                    - generic [ref=e593]:
                      - img [ref=e597]
                      - link "John Doe" [ref=e600] [cursor=pointer]:
                        - /url: /lightning/r/00QdN00000DnJWgUAN/view
                  - listitem [ref=e601]:
                    - generic [ref=e602]:
                      - img [ref=e606]
                      - link "Mark Wilson" [ref=e609] [cursor=pointer]:
                        - /url: /lightning/r/00QdN00000DnK1JUAV/view
                  - listitem [ref=e610]:
                    - generic [ref=e611]:
                      - img [ref=e615]
                      - link "François O'Sullivan" [ref=e618] [cursor=pointer]:
                        - /url: /lightning/r/00QdN00000DnJzhUAF/view
                  - listitem [ref=e619]:
                    - generic [ref=e620]:
                      - img [ref=e624]
                      - link "David Miller" [ref=e627] [cursor=pointer]:
                        - /url: /lightning/r/00QdN00000DnJy5UAF/view
                - button "View All Recent Records" [ref=e629] [cursor=pointer]: View All
              - article [ref=e632]:
                - heading "Salesblazer" [level=2] [ref=e636]
                - generic [ref=e637]:
                  - 'heading "Salesblazers: A Path to Success for Small Business Owners (Link opens in new window)" [level=3] [ref=e638]':
                    - 'link "Salesblazers: A Path to Success for Small Business Owners (Link opens in new window)" [ref=e641] [cursor=pointer]':
                      - /url: /HelpAndTrainingDoor?version=2&resource=https%3A%2F%2Fwww.salesforce.com%2Fblog%2Fsalesblazer-for-small-business%2F
                      - generic [ref=e643]:
                        - text: "Salesblazers: A Path to Success for Small Business Owners"
                        - generic [ref=e645]:
                          - img [ref=e647]
                          - generic [ref=e650]: (Link opens in new window)
                  - generic [ref=e651]: Learn how to power your small business growth through community and innovation.
                  - paragraph [ref=e652]: 22 minute read
                - button "Join the Community linkNewWindowAssistiveTextLabel" [ref=e654] [cursor=pointer]:
                  - text: Join the Community
                  - generic [ref=e656]:
                    - img [ref=e658]
                    - generic [ref=e661]: linkNewWindowAssistiveTextLabel
      - generic:
        - contentinfo "Utility Bar":
          - list [ref=e664]:
            - listitem [ref=e665]:
              - button "To Do List" [ref=e668] [cursor=pointer]:
                - img [ref=e672]
                - generic [ref=e675]: To Do List
    - dialog "App Launcher" [ref=e677]:
      - generic [ref=e678]:
        - generic [ref=e679]:
          - heading "App Launcher" [level=2] [ref=e680]
          - button "Close" [ref=e681] [cursor=pointer]:
            - img [ref=e683]
            - generic [ref=e686]: Close
        - generic [ref=e689]:
          - generic [ref=e690]:
            - generic [ref=e693]:
              - generic [ref=e694]: Search apps and items...
              - generic [ref=e695]:
                - combobox "Search apps and items..." [expanded] [active] [ref=e696]: Leads
                - img [ref=e697]
                - button "Clear" [ref=e700] [cursor=pointer]:
                  - img [ref=e702]
                  - generic [ref=e705]: Clear
            - generic [ref=e706]: No results for "Leads"
          - heading "Apps" [level=3] [ref=e707]
          - generic:
            - status:
              - generic [ref=e708]: Loading menu items...
          - listbox "Apps"
          - heading "Items" [level=3] [ref=e711]
          - generic:
            - status:
              - generic [ref=e712]: Loading menu items...
          - listbox "Items"
          - button "View All Applications" [ref=e716] [cursor=pointer]: View All
  - generic:
    - status
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import * as allure from 'allure-js-commons';
  3   | import 'dotenv/config';
  4   | import { sfTest } from './seed.spec.js';
  5   | import { setAllureMeta } from '../utils/reporter-utils.js';
  6   | import { fillField, selectPicklist } from '../utils/locator-utils.js';
  7   | import { waitForSFLoad } from '../utils/sf-helpers.js';
  8   | import fs from 'fs';
  9   | import path from 'path';
  10  | 
  11  | /**
  12  |  * LEAD CREATION TEST SUITE
  13  |  * Robust navigation to Leads app with error handling
  14  |  * Epic: CRM, Feature: Lead Management, Story: Create Lead, Severity: Critical
  15  |  *
  16  |  * spec: specs/lead-creation-plan.md
  17  |  * seed: tests/seed.spec.js
  18  |  */
  19  | 
  20  | const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');
  21  | if (!fs.existsSync(screenshotDir)) {
  22  |   fs.mkdirSync(screenshotDir, { recursive: true });
  23  | }
  24  | 
  25  | test.beforeEach(async () => {
  26  |   await setAllureMeta({
  27  |     epic: 'CRM',
  28  |     feature: 'Lead Management',
  29  |     story: 'Create Lead',
  30  |     severity: 'critical',
  31  |   });
  32  | });
  33  | 
  34  | // HEALED: Improved failure screenshot capture and logging
  35  | test.afterEach(async ({ page }, testInfo) => {
  36  |   if (testInfo.status !== 'passed') {
  37  |     try {
  38  |       const failureScreenshot = await page.screenshot({ fullPage: true });
  39  |       const testName = testInfo.title.replace(/\s+/g, '-').toLowerCase();
  40  |       fs.writeFileSync(
  41  |         path.join(screenshotDir, `${testName}-FAILED.png`),
  42  |         failureScreenshot
  43  |       );
  44  |       await testInfo.attach('failure-screenshot', {
  45  |         body: failureScreenshot,
  46  |         contentType: 'image/png',
  47  |       });
  48  |     } catch (err) {
  49  |       console.warn('Failed to capture failure screenshot:', err.message);
  50  |     }
  51  |   }
  52  | });
  53  | 
  54  | /**
  55  |  * Helper: Navigate to Leads app with robust selector handling
  56  |  * Uses App Launcher + search for reliability across SF orgs
  57  |  */
  58  | async function navigateToLeads(page) {
  59  |   // HEALED: Replaced navigateToApp() with direct App Launcher interaction  
  60  |   await page.getByTitle('App Launcher').click({ timeout: 10000 });
  61  |   await page.waitForTimeout(500);
  62  |   await page.getByPlaceholder(/search/i).fill('Leads', { timeout: 5000 });
  63  |   await page.waitForTimeout(500);
> 64  |   await page.getByRole('option', { name: /^Leads$/i }).click({ timeout: 5000 });
      |                                                        ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
  65  |   await waitForSFLoad(page);
  66  | }
  67  | 
  68  | /**
  69  |  * SECTION 1: LEAD CREATION - BASIC INFORMATION
  70  |  */
  71  | test.describe('1. Lead Creation - Basic Information', () => {
  72  | 
  73  |   sfTest('1.1 Create Lead with Required Fields Only', async ({ sfPage: page }, testInfo) => {
  74  |     await allure.description('Create a Lead with only required fields (First Name, Last Name, Company)');
  75  | 
  76  |     // Navigate to Leads
  77  |     await navigateToLeads(page);
  78  |     
  79  |     // Open New Lead form
  80  |     await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
  81  |     await waitForSFLoad(page);
  82  |     // HEALED: Check for dialog heading instead of form element
  83  |     await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });
  84  | 
  85  |     // Fill form
  86  |     await fillField(page, /first name/i, 'John');
  87  |     await fillField(page, /last name/i, 'Doe');
  88  |     await fillField(page, /company/i, 'Acme Corporation');
  89  |     
  90  |     // Save and wait for URL change
  91  |     await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
  92  |     await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
  93  |     
  94  |     // Capture success screenshot
  95  |     await page.waitForTimeout(500);
  96  |     const screenshot = await page.screenshot({ fullPage: true });
  97  |     fs.writeFileSync(path.join(screenshotDir, '1.1-Required-Fields-PASSED.png'), screenshot);
  98  |     await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  99  |   });
  100 | 
  101 |   sfTest('1.2 Create Lead with All Standard Fields', async ({ sfPage: page }, testInfo) => {
  102 |     await allure.description('Create a Lead with all standard fields populated');
  103 | 
  104 |     // Navigate
  105 |     await navigateToLeads(page);
  106 |     
  107 |     await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
  108 |     await waitForSFLoad(page);
  109 |     // HEALED: Check for dialog heading instead of form element
  110 |     await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });
  111 | 
  112 |     // Fill all fields
  113 |     await fillField(page, /first name/i, 'Jane');
  114 |     await fillField(page, /last name/i, 'Smith');
  115 |     await fillField(page, /company/i, 'Tech Innovations Inc');
  116 |     
  117 |     try {
  118 |       await fillField(page, /title/i, 'Manager');
  119 |       await fillField(page, /email/i, 'jane.smith@techinnovations.com');
  120 |       await fillField(page, /phone/i, '(555) 123-4567');
  121 |     } catch {
  122 |       // Optional fields may not exist or be visible
  123 |     }
  124 | 
  125 |     // Save
  126 |     await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
  127 |     await page.waitForURL(/Lightning|savepointId|\/Lead\//, { timeout: 8000 });
  128 |     
  129 |     // Screenshot
  130 |     await page.waitForTimeout(500);
  131 |     const screenshot = await page.screenshot({ fullPage: true });
  132 |     fs.writeFileSync(path.join(screenshotDir, '1.2-All-Fields-PASSED.png'), screenshot);
  133 |     await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  134 |   });
  135 | 
  136 | });
  137 | 
  138 | /**
  139 |  * SECTION 2: FIELD VALIDATION
  140 |  */
  141 | test.describe('2. Lead Creation - Field Validation', () => {
  142 | 
  143 |   sfTest('2.1 Attempt to Save Lead Without Required Fields', async ({ sfPage: page }, testInfo) => {
  144 |     await allure.description('Verify validation prevents saving Lead without required fields');
  145 | 
  146 |     // Navigate
  147 |     await navigateToLeads(page);
  148 |     
  149 |     await page.getByRole('button', { name: /new/i }).click({ timeout: 5000 });
  150 |     await waitForSFLoad(page);
  151 |     // HEALED: Check for dialog heading instead of form element
  152 |     await expect(page.getByRole('heading', { name: /new/i })).toBeVisible({ timeout: 10000 });
  153 | 
  154 |     // Try to save empty form
  155 |     await page.getByRole('button', { name: 'Save', exact: true }).click({ timeout: 5000 });
  156 |     await page.waitForTimeout(2000);
  157 | 
  158 |     // HEALED: Verify save failed (URL should not have record ID)
  159 |     expect(page.url()).not.toMatch(/\/Lead\/[a-zA-Z0-9]{15,18}/);
  160 |     
  161 |     // Look for validation errors
  162 |     const alerts = page.getByRole('alert');
  163 |     if (await alerts.count() > 0) {
  164 |       await expect(alerts.first()).toBeVisible({ timeout: 5000 });
```