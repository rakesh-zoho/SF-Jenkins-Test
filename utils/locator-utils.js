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
  const field = page.getByLabel(label);
  try {
    await field.selectOption(value, { timeout: 3000 });
  } catch {
    await field.click();
    await page.getByRole('option', { name: value }).click();
  }
}

/**
 * Fill a lookup field (e.g. Account Name).
 * Types the value, waits for autocomplete, clicks the first match.
 */
export async function fillLookup(page, label, value) {
  await page.getByLabel(label).fill(value);
  await page.waitForTimeout(600); // SF autocomplete debounce
  await page.getByRole('option', { name: value }).first().click();
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
