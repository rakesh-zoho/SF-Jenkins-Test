import { expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { fillField, selectPicklist, fillLookup } from '../utils/locator-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';

/**
 * CasesPage — Encapsulates all Case creation and management operations
 * Handles form filling, lookups, picklists, and verification
 */
export class CasesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // HEALED: Use regex to match exact "New" text to avoid strict mode violations
    this.newButton = page.getByRole('button', { name: /^New$/ }).first();
    this.newCaseDialog = page.getByRole('dialog', { name: /new case/i });
  }

  async navigate() {
    // Navigate to Cases app using App Launcher
    await this.navigateToApp('Cases');
  }

  async openNewCaseDialog() {
    // HEALED: Use .first() to get the primary New button (for creating records)
    // Avoid strict mode by being specific about which button we want
    const newButton = this.page.getByRole('button', { name: /^New$/ }).first();
    
    await expect(newButton).toBeVisible({ timeout: 15000 });
    await newButton.click();
    await this.waitForSFLoad();
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 15000 });
    await expect(dialog.getByText(/new case/i)).toBeVisible({ timeout: 15000 });
  }

  async fillLookupByFirstResult(fieldLabel, searchTerm) {
    // Fill lookup field with search term and select first result
    await fillLookup(this.page, fieldLabel, searchTerm);
    const dialog = this.page.getByRole('dialog');
    const lookup = dialog.getByRole('combobox', { name: fieldLabel }).first();
    await expect(lookup).not.toHaveValue('', { timeout: 10000 });
  }

  async fillContactName(searchTerm) {
    // HEALED: Use string label instead of regex for fillLookup compatibility
    await fillLookup(this.page, 'Contact Name', searchTerm);
    const dialog = this.page.getByRole('dialog');
    const contactField = dialog.getByRole('combobox', { name: /contact name/i }).first();
    await expect(contactField).not.toHaveValue('', { timeout: 10000 });
  }

  async fillAccountName(searchTerm) {
    // HEALED: Use string label instead of regex for fillLookup compatibility
    await fillLookup(this.page, 'Account Name', searchTerm);
    const dialog = this.page.getByRole('dialog');
    const accountField = dialog.getByRole('combobox', { name: /account name/i }).first();
    await expect(accountField).not.toHaveValue('', { timeout: 10000 });
  }

  async fillSubject(subject) {
    // HEALED: Use string label instead of regex for fillField compatibility
    await fillField(this.page, 'Subject', subject);
  }

  async fillDescription(description) {
    // HEALED: Use string label instead of regex for fillField compatibility
    await fillField(this.page, 'Description', description);
  }

  async selectStatus(status) {
    // HEALED: Use string label instead of regex for selectPicklist compatibility
    await selectPicklist(this.page, 'Status', status);
  }

  async selectPriority(priority) {
    // HEALED: Use string label instead of regex for selectPicklist compatibility
    await selectPicklist(this.page, 'Priority', priority);
  }

  async selectCaseOrigin(origin) {
    // HEALED: Use string label instead of regex for selectPicklist compatibility
    await selectPicklist(this.page, 'Case Origin', origin);
  }

  async selectFirstValidOption(fieldLabel) {
    // Select first non-"--None--" option from picklist
    const dialog = this.page.getByRole('dialog');
    const field = dialog.getByRole('combobox', { name: fieldLabel }).first();
    await expect(field).toBeVisible({ timeout: 15000 });
    await field.click();
    const option = this.page.getByRole('option').filter({ hasText: /^(?!\-\-None\-\-).+/ }).first();
    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
  }

  async save() {
    // Click Save button and wait for confirmation
    const saveButton = this.page.getByRole('dialog').getByRole('button', { name: 'Save' }).first();
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    await this.waitForSFLoad();
  }

  async expectToastCreated() {
    // Assert success toast appears
    const toast = this.page.locator('.toastMessage');
    await expect(toast).toBeVisible({ timeout: 15000 });
    await expect(toast).toContainText('was created');
  }

  async verifyCaseVisible(caseSubject) {
    // Verify Case is visible in list view
    const caseLink = this.page.getByRole('link', { name: caseSubject });
    await expect(caseLink).toBeVisible({ timeout: 10000 });
  }
}
