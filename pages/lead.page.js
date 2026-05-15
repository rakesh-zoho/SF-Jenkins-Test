import { expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { fillField, selectPicklist, fillLookup, getDatePlusDays, uniqueName } from '../utils/locator-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';

/**
 * LeadPage — Encapsulates all Lead creation, management, and conversion operations
 * Handles form filling, field selection, and verification for Lead Conversion flow
 */
export class LeadPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.newButton = page.getByRole('button', { name: /^New$/i }).first();
    this.newDialog = page.getByRole('dialog');
    this.convertButton = page.getByRole('button', { name: /^Convert$/i });
    this.convertModal = page.getByRole('dialog', { name: /convert/i });
  }

  // ==================== NAVIGATION ====================

  async navigate() {
    // Navigate to Leads app using App Launcher
    await this.navigateToApp('Leads');
  }

  async switchToAllLeads() {
    // Switch list view to "All Leads"
    try {
      await this.page.getByRole('button', { name: /Select a List View/i }).click();
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: /^All Leads$/i }).click();
      await this.waitForSFLoad();
    } catch {
      // Already on All Leads or selector unavailable
    }
  }

  async searchLeadByName(leadName) {
    // Search for a lead by name in the list view
    const searchField = this.page.getByPlaceholder(/search/i);
    if (await searchField.isVisible().catch(() => false)) {
      await searchField.fill(leadName);
      await this.page.waitForTimeout(800);
    }
  }

  async openLeadByName(leadName) {
    // Click on a lead name to open its detail page
    const leadLink = this.page.getByRole('link', { name: new RegExp(leadName, 'i') }).first();
    await expect(leadLink).toBeVisible({ timeout: 15000 });
    await leadLink.click();
    await this.waitForSFLoad();
    await expect(this.page).toHaveURL(/\/Lead\/[a-zA-Z0-9]{15,18}/, { timeout: 30000 });
  }

  // ==================== NEW LEAD FORM ====================

  async openNewLeadDialog() {
    // Click New button and wait for dialog to appear
    // HEALED: Increased timeouts from 15s to 20s to handle slow Salesforce instances
    await expect(this.newButton).toBeVisible({ timeout: 20000 });
    await this.newButton.click();
    await this.waitForSFLoad();
    await expect(this.newDialog).toBeVisible({ timeout: 20000 });
  }

  async fillFirstName(firstName) {
    await fillField(this.page, /first name/i, firstName);
  }

  async fillLastName(lastName) {
    await fillField(this.page, /last name/i, lastName);
  }

  async fillCompany(company) {
    await fillField(this.page, /company/i, company);
  }

  async fillEmail(email) {
    await fillField(this.page, /email/i, email);
  }

  async fillPhone(phone) {
    await fillField(this.page, /phone/i, phone);
  }

  async fillTitle(title) {
    await fillField(this.page, /title/i, title);
  }

  async fillDescription(description) {
    await fillField(this.page, /description/i, description);
  }

  async selectLeadSource(source) {
    await selectPicklist(this.page, /lead source/i, source);
  }

  async selectStatus(status) {
    await selectPicklist(this.page, /status/i, status);
  }

  async selectRating(rating) {
    await selectPicklist(this.page, /rating/i, rating);
  }

  async saveNewLead() {
    // Click Save button and wait for response
    const saveButton = this.newDialog.getByRole('button', { name: 'Save' }).first();
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    await this.waitForSFLoad();
    
    // Wait for success toast
    const toast = this.page.locator('.toastMessage');
    await expect(toast).toBeVisible({ timeout: 15000 });
    const toastText = await toast.textContent();
    return toastText || '';
  }

  // ==================== CONVERT LEAD FORM ====================

  async openConvertModal() {
    // Click Convert button on lead detail page
    await expect(this.convertButton).toBeVisible({ timeout: 15000 });
    await this.convertButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.convertModal).toBeVisible({ timeout: 15000 });
  }

  async selectCreateNewAccount() {
    // Select "Create New Account" radio button
    const dialog = this.page.getByRole('dialog');
    const createNewRadio = dialog.locator('input[type="radio"]').nth(0);
    await createNewRadio.check();
  }

  async selectChooseExistingAccount() {
    // Select "Choose Existing Account" radio button
    const dialog = this.page.getByRole('dialog');
    const chooseExistingRadio = dialog.locator('input[type="radio"]').nth(1);
    await chooseExistingRadio.check();
  }

  async fillConversionAccountName(accountName) {
    // Fill Account Name field in conversion modal
    const dialog = this.page.getByRole('dialog');
    const accountNameField = dialog.getByLabel('Account Name*');
    await accountNameField.clear();
    await accountNameField.fill(accountName);
  }

  async searchAndSelectAccount(accountName) {
    // Search for and select an existing account in conversion modal
    const dialog = this.page.getByRole('dialog');
    const accountSearch = dialog.getByPlaceholder('Search for matching accounts');
    await accountSearch.click();
    await accountSearch.fill(accountName);
    await this.page.waitForTimeout(900);
    
    // Click first matching option
    const option = this.page.getByRole('option').filter({ hasText: accountName }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    await this.page.waitForTimeout(600);
  }

  async selectCreateNewContact() {
    // Select "Create New Contact" radio button in conversion modal
    const dialog = this.page.getByRole('dialog');
    const radioButtons = dialog.locator('input[type="radio"]');
    const count = await radioButtons.count();
    // Contact radios are typically at indices 2-3
    await radioButtons.nth(2).check();
  }

  async selectChooseExistingContact() {
    // Select "Choose Existing Contact" radio button in conversion modal
    const dialog = this.page.getByRole('dialog');
    const radioButtons = dialog.locator('input[type="radio"]');
    await radioButtons.nth(3).check();
  }

  async fillConversionContactLastName(lastName) {
    // Fill Contact Last Name field in conversion modal
    const dialog = this.page.getByRole('dialog');
    const lastNameField = dialog.getByLabel('Last Name*');
    await lastNameField.fill(lastName);
  }

  async searchAndSelectContact(contactName) {
    // Search for and select an existing contact in conversion modal
    const dialog = this.page.getByRole('dialog');
    const contactSearch = dialog.getByPlaceholder('Search for matching contacts');
    await contactSearch.click();
    await contactSearch.fill(contactName);
    await this.page.waitForTimeout(900);
    
    // Click first matching option
    const option = this.page.getByRole('option').filter({ hasText: contactName }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    await this.page.waitForTimeout(600);
  }

  async selectCreateNewOpportunity() {
    // Select "Create New Opportunity" radio button in conversion modal
    const dialog = this.page.getByRole('dialog');
    const radioButtons = dialog.locator('input[type="radio"]');
    const count = await radioButtons.count();
    // Opportunity radios are typically at indices 4-5
    await radioButtons.nth(4).check();
  }

  async selectChooseExistingOpportunity() {
    // Select "Choose Existing Opportunity" radio button
    const dialog = this.page.getByRole('dialog');
    const radioButtons = dialog.locator('input[type="radio"]');
    await radioButtons.nth(5).check();
  }

  async fillConversionOpportunityName(opportunityName) {
    // Fill Opportunity Name field in conversion modal
    const dialog = this.page.getByRole('dialog');
    const oppNameField = dialog.getByLabel('Opportunity Name*');
    await oppNameField.clear();
    await oppNameField.fill(opportunityName);
  }

  async checkDontCreateOpportunity() {
    // Check "Don't create an opportunity" checkbox
    const dialog = this.page.getByRole('dialog');
    const checkbox = dialog.getByLabel(/Don't create an opportunity/i);
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (!isChecked) {
      await checkbox.check();
    }
  }

  async uncheckDontCreateOpportunity() {
    // Uncheck "Don't create an opportunity" checkbox
    const dialog = this.page.getByRole('dialog');
    const checkbox = dialog.getByLabel(/Don't create an opportunity/i);
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (isChecked) {
      await checkbox.uncheck();
    }
  }

  async selectConvertedStatus(status) {
    // Select *Converted Status picklist in conversion modal
    const dialog = this.page.getByRole('dialog');
    const statusField = dialog.getByLabel('*Converted Status');
    await statusField.click();
    await this.page.waitForTimeout(500);
    const option = this.page.getByRole('option', { name: status });
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    await this.page.waitForTimeout(600);
  }

  async checkUpdateLeadSource() {
    // Check "Update Lead Source" checkbox in conversion modal
    const dialog = this.page.getByRole('dialog');
    const checkbox = dialog.getByLabel('Update Lead Source');
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (!isChecked) {
      await checkbox.check();
    }
  }

  async submitConversion() {
    // Click Convert button in the modal
    const dialog = this.page.getByRole('dialog');
    const convertBtn = dialog.locator('button[type="button"].slds-button_brand').first();
    
    // Try normal click, then force click if needed
    try {
      await convertBtn.click({ timeout: 5000 });
    } catch {
      await convertBtn.click({ timeout: 10000, force: true });
    }
    
    await this.page.waitForTimeout(2000);
    await this.waitForSFLoad();
  }

  async cancelConversion() {
    // Click Cancel button in the modal
    const dialog = this.page.getByRole('dialog');
    const cancelBtn = dialog.getByRole('button', { name: 'Cancel' });
    await cancelBtn.click();
    await this.page.waitForTimeout(500);
  }

  // ==================== CONVERSION SUCCESS VERIFICATION ====================

  async verifyConversionSuccessScreen() {
    // Verify "Your lead has been converted" message
    const successMsg = this.page.getByText('Your lead has been converted');
    await expect(successMsg).toBeVisible({ timeout: 15000 });
  }

  async getCreatedAccountName() {
    // Extract Account name from success screen
    const accountSection = this.page.getByText('ACCOUNT').locator('..').first();
    const accountLink = accountSection.getByRole('link').first();
    return await accountLink.textContent();
  }

  async getCreatedContactName() {
    // Extract Contact name from success screen
    const contactSection = this.page.getByText('CONTACT').locator('..').first();
    const contactLink = contactSection.getByRole('link').first();
    return await contactLink.textContent();
  }

  async getCreatedOpportunityName() {
    // Extract Opportunity name from success screen
    try {
      const oppSection = this.page.getByText('OPPORTUNITY').locator('..').first();
      const oppLink = oppSection.getByRole('link').first();
      return await oppLink.textContent();
    } catch {
      return null; // Opportunity not created
    }
  }

  async verifyAccountOnSuccessScreen(expectedName) {
    // Verify Account card is visible with expected name
    const accountSection = this.page.getByText('ACCOUNT').locator('..');
    await expect(accountSection).toBeVisible();
    const accountLink = accountSection.getByRole('link', { name: new RegExp(expectedName, 'i') });
    await expect(accountLink).toBeVisible();
  }

  async verifyContactOnSuccessScreen(expectedName) {
    // Verify Contact card is visible with expected name
    const contactSection = this.page.getByText('CONTACT').locator('..');
    await expect(contactSection).toBeVisible();
    const contactLink = contactSection.getByRole('link', { name: new RegExp(expectedName, 'i') });
    await expect(contactLink).toBeVisible();
  }

  async verifyOpportunityOnSuccessScreen(expectedName) {
    // Verify Opportunity card is visible with expected name
    const oppSection = this.page.getByText('OPPORTUNITY').locator('..');
    await expect(oppSection).toBeVisible();
    const oppLink = oppSection.getByRole('link', { name: new RegExp(expectedName, 'i') });
    await expect(oppLink).toBeVisible();
  }

  async verifyNoOpportunityOnSuccessScreen() {
    // Verify Opportunity section is NOT visible
    const oppSection = this.page.getByText('OPPORTUNITY');
    const isVisible = await oppSection.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  }

  async clickGoToLeads() {
    // Click "Go to Leads" button on success screen
    const btn = this.page.getByRole('button', { name: 'Go to Leads' });
    await expect(btn).toBeVisible({ timeout: 15000 });
    await btn.click();
    await this.waitForSFLoad();
  }

  // ==================== LEAD DETAIL PAGE ====================

  async verifyLeadDetailPageLoaded(leadName) {
    // Verify we're on the lead detail page
    await expect(this.page).toHaveURL(/\/Lead\/[a-zA-Z0-9]{15,18}/, { timeout: 30000 });
    const heading = this.page.getByRole('heading', { name: new RegExp(leadName, 'i') });
    await expect(heading).toBeVisible({ timeout: 15000 });
  }

  async verifyLeadStatus(expectedStatus) {
    // Verify the lead's status field
    const statusField = this.page.getByText(expectedStatus);
    await expect(statusField).toBeVisible({ timeout: 15000 });
  }

  async verifyLeadStatusInListView(leadName, expectedStatus) {
    // Search for lead in list view and verify its status
    await this.searchLeadByName(leadName);
    const leadRow = this.page.getByRole('row').filter({ has: this.page.getByText(leadName) }).first();
    const statusCell = leadRow.getByText(expectedStatus);
    await expect(statusCell).toBeVisible({ timeout: 15000 });
  }

  // ==================== ERROR HANDLING ====================

  async verifyConversionErrorToast(expectedErrorText) {
    // Verify an error toast appears with expected message
    const errorToast = this.page.locator('.slds-notify--toast.slds-notify--error');
    await expect(errorToast).toBeVisible({ timeout: 15000 });
    const toastText = await errorToast.textContent();
    expect(toastText).toContain(expectedErrorText);
  }

  async verifyLastNameFieldRequired() {
    // Verify Last Name field is marked as required
    const dialog = this.page.getByRole('dialog');
    const lastNameLabel = dialog.getByLabel(/last name/i);
    const labelText = await lastNameLabel.locator('..').textContent();
    expect(labelText).toContain('*');
  }

  async verifyConversionModalVisible() {
    // Verify the Convert modal is open
    await expect(this.convertModal).toBeVisible({ timeout: 15000 });
  }

  async verifyConversionModalClosed() {
    // Verify the Convert modal is closed
    const modal = this.page.getByRole('dialog', { name: /convert/i });
    const isVisible = await modal.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  }
}
