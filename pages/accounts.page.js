import { expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { fillField, selectPicklist } from '../utils/locator-utils.js';
import { waitForSFLoad } from '../utils/sf-helpers.js';

/**
 * AccountsPage — Encapsulates all Account creation and management operations
 * Handles form filling, field selection, and verification
 */
export class AccountsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    // HEALED: Use regex to match exact "New" text to avoid strict mode violations
    this.newButton = page.getByRole('button', { name: /^New$/ }).first();
    this.newDialog = page.getByRole('dialog');
  }

  async navigate() {
    // Navigate to Accounts app using App Launcher
    await this.navigateToApp('Accounts');
  }

  async openNewAccountDialog() {
    // Click New button and wait for dialog to appear
    await expect(this.newButton).toBeVisible({ timeout: 15000 });
    await this.newButton.click();
    await this.waitForSFLoad();
    await expect(this.newDialog).toBeVisible({ timeout: 15000 });
  }

  async fillAccountName(name) {
    await fillField(this.page, /account name/i, name);
  }

  async fillPhone(phone) {
    await fillField(this.page, /phone/i, phone);
  }

  async fillWebsite(website) {
    await fillField(this.page, /website/i, website);
  }

  async fillBillingStreet(street) {
    await fillField(this.page, /billing street/i, street);
  }

  async fillBillingCity(city) {
    await fillField(this.page, /billing city/i, city);
  }

  async fillBillingState(state) {
    await fillField(this.page, /billing state/i, state);
  }

  async fillBillingZip(zip) {
    await fillField(this.page, /billing postal code|billing zip/i, zip);
  }

  async fillBillingCountry(country) {
    await fillField(this.page, /billing country/i, country);
  }

  async fillShippingStreet(street) {
    await fillField(this.page, /shipping street/i, street);
  }

  async fillShippingCity(city) {
    await fillField(this.page, /shipping city/i, city);
  }

  async fillShippingState(state) {
    await fillField(this.page, /shipping state/i, state);
  }

  async fillShippingZip(zip) {
    await fillField(this.page, /shipping postal code|shipping zip/i, zip);
  }

  async fillShippingCountry(country) {
    await fillField(this.page, /shipping country/i, country);
  }

  async fillEmployees(count) {
    await fillField(this.page, /employees/i, count);
  }

  async fillAnnualRevenue(amount) {
    await fillField(this.page, /annual revenue/i, amount);
  }

  async fillDescription(description) {
    await fillField(this.page, /description/i, description);
  }

  async selectIndustry(industry) {
    await selectPicklist(this.page, /industry/i, industry);
  }

  async selectType(type) {
    await selectPicklist(this.page, /type/i, type);
  }

  async save() {
    // Click Save button and wait for response
    const saveButton = this.newDialog.getByRole('button', { name: 'Save' }).first();
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    await this.waitForSFLoad();
    
    // Wait for toast and return text
    const toast = this.page.locator('.toastMessage');
    await expect(toast).toBeVisible({ timeout: 15000 });
    const toastText = await toast.textContent();
    return toastText || '';
  }
}
