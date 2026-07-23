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
    console.log('Navigating to:', lightningHome);
    
    await page.goto(lightningHome, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    console.log('Page title:', await page.title());
    console.log('Page URL:', page.url());

    // Wait for page to be ready
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
      console.log('Network idle timeout, continuing anyway');
    });

    // Check for various app launcher selectors
    const selectors = [
      '[title="App Launcher"]',
      '[aria-label="App Launcher"]',
      'button[title*="App"]',
      '[data-app-launcher]',
      '.slds-app-launcher',
      'button[aria-label*="Launcher"]',
    ];

    for (const sel of selectors) {
      const count = await page.locator(sel).count();
      console.log(`Selector "${sel}": ${count} elements found`);
      if (count > 0) {
        const visible = await page.locator(sel).first().isVisible().catch(() => false);
        console.log(`  - First element visible: ${visible}`);
      }
    }

    // Show page content
    const html = await page.content();
    console.log('\nPage HTML (looking for App Launcher):');
    const launcher = html.match(/App Launcher[^<]*/gi);
    if (launcher) {
      console.log('Found App Launcher text:', launcher.slice(0, 5));
    } else {
      console.log('No "App Launcher" text found in HTML');
    }

    await page.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

debug().catch(console.error);
