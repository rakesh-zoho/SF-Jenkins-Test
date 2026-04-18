import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

/**
 * REPORTER UTILITIES
 * Used by all agent-generated tests for screenshots and Allure steps.
 */

/**
 * Capture a full-page screenshot and attach to:
 * 1. Playwright HTML report
 * 2. Allure report
 * 3. Optional disk file for failure diagnostics
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} name - descriptive step name
 * @param {{ writeToFile?: boolean, testInfo?: import('@playwright/test').TestInfo }} [options]
 */
export async function captureScreenshot(page, name = 'screenshot', options = {}) {
  try {
    const screenshot = await page.screenshot({ fullPage: true });
    const attachmentName = name.replace(/\s+/g, '-').toLowerCase();

    // Attach to Playwright HTML report
    const info = options.testInfo || test.info();
    await info.attach(attachmentName, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Attach to Allure report
    await allure.attachment(attachmentName, screenshot, 'image/png');

    if (options.writeToFile) {
      const fileName = `${attachmentName}.png`;
      const filePath = path.join(screenshotDir, fileName);
      fs.writeFileSync(filePath, screenshot);
    }

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
