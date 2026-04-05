import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

/**
 * REPORTER UTILITIES
 * Used by all agent-generated tests for screenshots and Allure steps.
 */

/**
 * Capture a full-page screenshot and attach to:
 * 1. Playwright HTML report (via test.info().attach)
 * 2. Allure report (via allure.attachment)
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} name - descriptive step name
 */
export async function captureScreenshot(page, name = 'screenshot') {
  try {
    const screenshot = await page.screenshot({ fullPage: true });

    // Attach to Playwright HTML report
    await test.info().attach(name, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Attach to Allure report
    await allure.attachment(name, screenshot, 'image/png');

  } catch (err) {
    console.warn(`  ⚠️  Screenshot "${name}" failed:`, err.message);
  }
}

/**
 * Wrap a test action in an Allure step.
 * Auto-captures screenshot after the step completes.
 *
 * Usage:
 *   await sfStep('Click New Lead button', page, async () => {
 *     await page.getByRole('button', { name: 'New' }).click();
 *   });
 */
export async function sfStep(name, page, fn) {
  return allure.step(name, async () => {
    await fn();
    await captureScreenshot(page, name.toLowerCase().replace(/\s+/g, '-'));
  });
}

/**
 * Set Allure environment metadata for the report.
 * Call in beforeEach or at test start.
 */
export async function setAllureMeta({ epic, feature, story, severity = 'normal' }) {
  await allure.epic(epic);
  await allure.feature(feature);
  await allure.story(story);
  await allure.severity(severity);
}
