# Salesforce Lightning Selector Library
> Reference for all agents. Use these locators — do not invent others.

## Global Navigation
| Element | Playwright Locator |
|---|---|
| App Launcher | `page.locator('[title="App Launcher"]')` |
| Nav Tab | `page.getByRole('link', { name: 'OBJECT_NAME' })` |
| Global Search | `page.getByPlaceholder('Search...')` |

## Action Buttons
| Button | Locator |
|---|---|
| New | `page.getByRole('button', { name: 'New' })` |
| Save | `page.getByRole('button', { name: 'Save' })` |
| Cancel | `page.getByRole('button', { name: 'Cancel' })` |
| Delete | `page.getByRole('button', { name: 'Delete' })` |
| Edit | `page.getByRole('button', { name: 'Edit' })` |
| Clone | `page.getByRole('button', { name: 'Clone' })` |

## Feedback & UI State
| Element | Locator |
|---|---|
| Toast message | `page.locator('.toastMessage')` |
| Success toast | `page.locator('.slds-notify--toast .toastMessage')` |
| Error toast | `page.locator('.slds-notify--toast.slds-notify--error .toastMessage')` |
| SF Spinner | `page.locator('.forceListViewManagerSpinner')` |
| SLDS Spinner | `page.locator('.slds-spinner_container')` |
| Any dialog | `page.getByRole('dialog')` |
| Dialog title | `page.getByRole('dialog').getByRole('heading')` |
| Dialog Save | `page.getByRole('dialog').getByRole('button', { name: 'Save' })` |

## Lead Object
| Field | Locator |
|---|---|
| First Name | `page.getByLabel('First Name')` |
| Last Name | `page.getByLabel('Last Name')` |
| Company | `page.getByLabel('Company')` |
| Email | `page.getByLabel('Email')` |
| Phone | `page.getByLabel('Phone')` |
| Lead Source | `page.getByLabel('Lead Source')` |
| Status | `page.getByLabel('Status')` |
| Rating | `page.getByLabel('Rating')` |
| Title | `page.getByLabel('Title')` |
| Description | `page.getByLabel('Description')` |

## Opportunity Object
| Field | Locator |
|---|---|
| Opportunity Name | `page.getByLabel('Opportunity Name')` |
| Account Name | `page.getByLabel('Account Name')` |
| Close Date | `page.getByLabel('Close Date')` |
| Stage | `page.getByLabel('Stage')` |
| Amount | `page.getByLabel('Amount')` |
| Probability | `page.getByLabel('Probability')` |
| Description | `page.getByLabel('Description')` |

## Contact Object
| Field | Locator |
|---|---|
| First Name | `page.getByLabel('First Name')` |
| Last Name | `page.getByLabel('Last Name')` |
| Account Name | `page.getByLabel('Account Name')` |
| Email | `page.getByLabel('Email')` |
| Phone | `page.getByLabel('Business Phone')` |
| Title | `page.getByLabel('Title')` |

## List View
| Element | Locator |
|---|---|
| View switcher button | `page.getByRole('button', { name: /Select a List View/i })` |
| All Leads | `page.getByRole('option', { name: 'All Leads' })` |
| All Opportunities | `page.getByRole('option', { name: 'All Opportunities' })` |
| All Contacts | `page.getByRole('option', { name: 'All Contacts' })` |
| Record row link | `page.getByRole('link', { name: 'RECORD_NAME' })` |

## Record Detail Page
| Element | Locator |
|---|---|
| Page heading | `page.getByRole('heading', { name: 'RECORD_NAME' })` |
| Related tab | `page.getByRole('tab', { name: 'TAB_NAME' })` |
| Field value (read mode) | `page.getByText('VALUE').first()` |
