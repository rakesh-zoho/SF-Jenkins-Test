#!/usr/bin/env node
import 'dotenv/config';
import path from 'path';
import { chromium } from 'playwright';
import fs from 'fs';

const authStatePath = path.resolve(process.cwd(), 'reports/.auth-state.json');
const authState = JSON.parse(fs.readFileSync(authStatePath, 'utf-8'));

async function debug() {
  const browser = await chromium.launch({ headless: false });
  
  try {
    const context = await browser.newContext({
      storageState: authState,
    });

    const page = await context.newPage();

    const lightningHome = new URL('/lightning/page/home', process.env.SF_URL).toString();
    console.log('Navigating to home:', lightningHome);
    
    await page.goto(lightningHome, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait for page to settle
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      console.log('Network idle timeout, continuing anyway');
    });

    console.log('✅ On home page');
    console.log('Page URL:', page.url());

    // Click on app launcher to find Leads
    const appLauncher = page.locator('[title="App Launcher"]').first();
    const isVisible = await appLauncher.isVisible().catch(() => false);
    console.log('App Launcher visible:', isVisible);

    if (isVisible) {
      await appLauncher.click();
      await page.waitForTimeout(1000);
      
      // Try to find Leads option
      const leadsOption = page.locator('span:has-text("Leads")').first();
      if (await leadsOption.isVisible().catch(() => false)) {
        console.log('Found Leads option in app launcher');
        await leadsOption.click();
        await page.waitForTimeout(2000);
        
        console.log('Page URL after clicking Leads:', page.url());
        
        // Now check for New button
        const newButtons = page.getByRole('button', { name: /^New$/i });
        const count = await newButtons.count();
        console.log(`Found ${count} "New" buttons`);
        
        for (let i = 0; i < Math.min(count, 3); i++) {
          const button = newButtons.nth(i);
          const visible = await button.isVisible().catch(() => false);
          const text = await button.textContent().catch(() => 'unknown');
          console.log(`  Button ${i}: visible=${visible}, text="${text}"`);
        }
      }
    }

    await page.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

debug().catch(console.error);
