import { expect } from '@playwright/test';

/**
 * LOCATOR UTILITIES — Salesforce Lightning
 *
 * Helper functions for common SF interactions.
 * Generator agent imports these into generated tests.
 * All locators use semantic selectors only (role/label/text).
 */

/**
 * Fill a Salesforce form field by label.
 * Scoped to a dialog if one is open.
 */
export async function fillField(page, label, value) {
  const dialog = page.getByRole('dialog');
  const isDialogOpen = await dialog.isVisible().catch(() => false);
  const scope = isDialogOpen ? dialog : page;
  await scope.getByLabel(label).fill(value);
}

/**
 * Select a picklist value.
 * Tries selectOption first (native), falls back to click+option (SF custom).
 */
export async function selectPicklist(page, label, value) {
  const dialog = page.getByRole('dialog');
  const isDialogOpen = await dialog.isVisible().catch(() => false);
  const scope = isDialogOpen ? dialog : page;
  let field = scope.getByRole('combobox', { name: label }).first();
  if ((await field.count()) === 0) {
    field = scope.getByLabel(label).first();
  }

  await expect(field).toBeVisible({ timeout: 15000 });

  try {
    await field.selectOption(value, { timeout: 3000 });
    return;
  } catch {
    await field.scrollIntoViewIfNeeded();
    await field.click({ timeout: 5000 });
    await page.waitForTimeout(500);
    const listbox = page.locator('div[role="listbox"]:visible').first();
    await expect(listbox).toBeVisible({ timeout: 10000 });

    let option = listbox.getByRole('option', { name: value }).first();
    if ((await option.count()) === 0) {
      option = listbox.getByText(value, { exact: true }).first();
    }
    if ((await option.count()) === 0) {
      option = listbox.locator(`lightning-base-combobox-item[data-value="${value}"]`).first();
    }
    if ((await option.count()) === 0) {
      option = listbox.locator('lightning-base-combobox-item').filter({ hasText: value }).first();
    }

    await expect(option).toBeVisible({ timeout: 10000 });
    await option.scrollIntoViewIfNeeded();
    try {
      await option.click({ timeout: 10000 });
    } catch {
      const handle = await option.elementHandle();
      if (handle) {
        await handle.evaluate((node) => node.click());
      } else {
        throw new Error(`Could not click option '${value}'`);
      }
    }

    await page.keyboard.press('Escape').catch(() => null);
    await page.waitForTimeout(250);
    await page.click('body', { position: { x: 10, y: 10 }, timeout: 3000 }).catch(() => null);
    await page.waitForTimeout(250);

    await listbox.waitFor({ state: 'hidden', timeout: 10000 }).catch(async () => {
      await page.keyboard.press('Escape').catch(() => null);
    });
  }
}

/**
 * Fill a lookup field (e.g. Account Name).
 * Types the value, waits for autocomplete, clicks the first match.
 */
export async function fillLookup(page, label, value) {
  const dialog = page.getByRole('dialog');
  const isDialogOpen = await dialog.isVisible().catch(() => false);
  const scope = isDialogOpen ? dialog : page;
  const lookup = scope.getByRole('combobox', { name: label }).first();
  await expect(lookup).toBeVisible({ timeout: 15000 });
  await lookup.click();
  await lookup.fill(value);
  await page.waitForTimeout(900); // SF autocomplete debounce

  const secondOption = page
    .getByRole('option')
    .filter({ hasText: /^(?!\-\-None\-\-).+/ })
    .nth(1);

  if (await secondOption.isVisible().catch(() => false)) {
    await secondOption.click();
  } else {
    await lookup.press('ArrowDown');
    await lookup.press('Enter');
  }

  await page.waitForTimeout(600);
}

/**
 * Wait for and assert a Salesforce success toast.
 * Toast auto-dismisses — assert immediately after save.
 */
export async function assertSuccessToast(page, expectedText) {
  const toast = page.locator('.toastMessage');
  await toast.waitFor({ state: 'visible', timeout: 15000 });
  await toast.waitFor({ state: 'visible' });
  const text = await toast.textContent();
  if (expectedText && !text.includes(expectedText)) {
    throw new Error(`Toast text "${text}" did not contain "${expectedText}"`);
  }
  return text;
}

/**
 * Get today's date + N days in MM/DD/YYYY format (SF date field format).
 */
export function getDatePlusDays(days = 30) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

/**
 * Generate a unique test data name with timestamp.
 * Prevents data collision between test runs.
 */
export function uniqueName(prefix = 'Agentic Test') {
  return `${prefix}-${Date.now()}`;
}
