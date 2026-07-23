import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { waitForSFLoad } from '../utils/sf-helpers.js';

// Use saved auth state from globalSetup
test.use({ storageState: './reports/.auth-state.json' });

/**
 * EXPLORATION TEST — Opportunity Creation Flow
 * ─────────────────────────────────────────────
 * This test explores the Opportunity creation UI to map out
 * all fields, form structure, and interaction patterns.
 * 
 * Output: Screenshots and detailed field mapping for test plan.
 */

test('explore Opportunity creation flow', async ({ page }, testInfo) => {
  
  // Step 1: Navigate to Opportunities list
  console.log('\n✅ STEP 1: Navigate to Opportunities list');
  await page.goto(`${process.env.SF_URL}/lightning/o/Opportunity/list`, {
    waitUntil: 'domcontentloaded'
  });
  
  // Wait for SF to stabilize
  await page.waitForTimeout(2000);
  await waitForSFLoad(page);
  
  // Capture list view
  await page.screenshot({ path: `./test-results/01-opportunities-list.png` });
  console.log('📸 Screenshot: opportunities list');
  
  // Step 2: Switch to All Opportunities view if available
  console.log('\n✅ STEP 2: Switch to All Opportunities view');
  try {
    const viewSwitcher = page.getByRole('button', { name: /Select a List View/i });
    const isSwitcherVisible = await viewSwitcher.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isSwitcherVisible) {
      await viewSwitcher.click();
      await page.waitForTimeout(1000);
      const allOppsOption = page.getByRole('option', { name: 'All Opportunities' });
      const isOptionVisible = await allOppsOption.isVisible({ timeout: 2000 }).catch(() => false);
      if (isOptionVisible) {
        await allOppsOption.click();
        await waitForSFLoad(page);
        console.log('✓ Switched to All Opportunities');
      }
    }
  } catch (e) {
    console.log('⚠️ View switcher not available or already on all view:', e.message);
  }
  
  // Step 3: Locate and click New button
  console.log('\n✅ STEP 3: Click New button to open creation form');
  const newButton = page.getByRole('button', { name: 'New' });
  const isNewVisible = await newButton.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (!isNewVisible) {
    // Try alternative navigation
    console.log('⚠️ New button not visible, navigating directly to new Opportunity page');
    await page.goto(`${process.env.SF_URL}/lightning/o/Opportunity/new`);
    await page.waitForTimeout(3000);
  } else {
    await newButton.click();
    await page.waitForTimeout(2000);
  }
  
  await page.screenshot({ path: `./test-results/02-new-opp-modal-opened.png` });
  console.log('📸 Screenshot: new opportunity modal');
  
  // Step 4: Explore form fields using JavaScript to find all input elements
  console.log('\n✅ STEP 4: Explore and map form fields');
  
  // Wait for dialog to fully load
  const dialog = page.getByRole('dialog');
  const isDialogVisible = await dialog.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (isDialogVisible) {
    console.log('✓ Dialog is visible');
    
    // Use JavaScript to find all form fields in the dialog
    const formFields = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return [];
      
      // Find all input fields, textareas, selects, and labeled fields
      const fields = [];
      
      // Get all label elements to find associated fields
      const labels = dialog.querySelectorAll('label');
      labels.forEach(label => {
        const text = label.textContent.trim();
        if (text && text.length > 0 && !text.includes('Required')) {
          // Try to find associated input
          const inputId = label.getAttribute('for');
          let input = inputId ? dialog.querySelector(`#${inputId}`) : null;
          
          // Or look for next input/select
          if (!input) {
            const parent = label.closest('[class*="form"], [class*="field"]');
            if (parent) {
              input = parent.querySelector('input, textarea, select, [role="combobox"]');
            }
          }
          
          fields.push({
            label: text,
            found: !!input,
            type: input?.tagName || input?.getAttribute('role') || 'unknown'
          });
        }
      });
      
      return fields;
    });
    
    console.log('Fields found via label analysis:');
    formFields.forEach(f => {
      console.log(`  ${f.found ? '✓' : '✗'} ${f.label} (${f.type})`);
    });
    console.log(`\nTotal fields: ${formFields.length}`);
  } else {
    console.log('⚠️ Dialog not visible');
  }
  
  // Step 5: Try to fill Opportunity Name
  console.log('\n✅ STEP 5: Fill Opportunity Name field');
  const oppNameField = page.getByLabel('Opportunity Name');
  const isOppNameVisible = await oppNameField.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isOppNameVisible) {
    await oppNameField.fill('Test Opportunity - Exploration');
    console.log('✓ Filled Opportunity Name');
    await page.screenshot({ path: `./test-results/03-opp-name-filled.png` });
  } else {
    console.log('⚠️ Opportunity Name field not accessible');
  }
  
  // Step 6: Try to fill Account Name
  console.log('\n✅ STEP 6: Fill Account Name field');
  const accountField = page.getByLabel('Account Name');
  const isAccountVisible = await accountField.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isAccountVisible) {
    await accountField.click();
    await accountField.fill('Acme');
    await page.waitForTimeout(1000);
    
    // Try to select first autocomplete option
    try {
      const firstOption = page.getByRole('option').first();
      const isOptionVisible = await firstOption.isVisible({ timeout: 2000 }).catch(() => false);
      if (isOptionVisible) {
        await firstOption.click();
        console.log('✓ Selected account from autocomplete');
      }
    } catch (e) {
      console.log('⚠️ No autocomplete options visible');
    }
    
    await page.screenshot({ path: `./test-results/04-account-filled.png` });
  } else {
    console.log('⚠️ Account Name field not accessible');
  }
  
  // Step 7: Try to fill Close Date
  console.log('\n✅ STEP 7: Fill Close Date field');
  const closeDateField = page.getByLabel('Close Date');
  const isCloseDateVisible = await closeDateField.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isCloseDateVisible) {
    // Calculate date 30 days from now in MM/DD/YYYY format
    const today = new Date();
    const closeDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    const dateStr = `${String(closeDate.getMonth() + 1).padStart(2, '0')}/${String(closeDate.getDate()).padStart(2, '0')}/${closeDate.getFullYear()}`;
    
    await closeDateField.fill(dateStr);
    console.log(`✓ Filled Close Date: ${dateStr}`);
    await page.screenshot({ path: `./test-results/05-close-date-filled.png` });
  } else {
    console.log('⚠️ Close Date field not accessible');
  }
  
  // Step 8: Try to interact with Stage picklist
  console.log('\n✅ STEP 8: Interact with Stage picklist');
  const stageField = page.getByLabel('Stage');
  const isStageVisible = await stageField.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isStageVisible) {
    await stageField.click();
    await page.waitForTimeout(1000);
    
    // Try to select Needs Analysis
    try {
      const needsAnalysisOption = page.getByRole('option', { name: 'Needs Analysis' });
      const isOptionVisible = await needsAnalysisOption.isVisible({ timeout: 2000 }).catch(() => false);
      if (isOptionVisible) {
        await needsAnalysisOption.click();
        console.log('✓ Selected "Needs Analysis" from Stage');
        await page.screenshot({ path: `./test-results/06-stage-selected.png` });
      }
    } catch (e) {
      console.log('⚠️ Stage options not accessible');
    }
  } else {
    console.log('⚠️ Stage field not accessible');
  }
  
  // Step 9: Try to fill Amount
  console.log('\n✅ STEP 9: Fill Amount field');
  const amountField = page.getByLabel('Amount');
  const isAmountVisible = await amountField.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isAmountVisible) {
    await amountField.fill('50000');
    console.log('✓ Filled Amount: 50000');
    await page.screenshot({ path: `./test-results/07-amount-filled.png` });
  } else {
    console.log('⚠️ Amount field not accessible');
  }
  
  // Step 10: Look for Save button
  console.log('\n✅ STEP 10: Locate Save button');
  const saveButton = page.getByRole('button', { name: 'Save' });
  const isSaveVisible = await saveButton.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isSaveVisible) {
    console.log('✓ Save button found and visible');
    await page.screenshot({ path: `./test-results/08-form-complete.png` });
    
    // Don't save yet, just document
    console.log('\n✅ Form is complete and ready to save');
    console.log('⚠️ Not saving to avoid creating test data');
  } else {
    console.log('⚠️ Save button not found');
    await page.screenshot({ path: `./test-results/09-form-no-save-button.png` });
  }
  
  // Step 11: Document page structure
  console.log('\n✅ STEP 11: Document page structure');
  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      url: window.location.href,
      dialogCount: document.querySelectorAll('[role="dialog"]').length,
      buttonCount: document.querySelectorAll('button').length
    };
  });
  
  console.log('Page Info:', pageInfo);
  
  console.log('\n✅ Exploration complete!');
  console.log('Check ./test-results/ directory for screenshots');
});
