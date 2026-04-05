#!/usr/bin/env node
import fs from 'fs/promises';
import { execSync } from 'child_process';

console.log('\n🔧 SF Agentic Framework Setup\n');
const dirs = ['.github/chatmodes','.github/workflows','.vscode','config','memory','tasks','specs','tests','utils','scripts','reports/allure-results','reports/allure-report','screenshots'];
for (const dir of dirs) { await fs.mkdir(dir, { recursive: true }); console.log(`  ✅ ${dir}/`); }
try { await fs.access('.env'); console.log('\n  ✅ .env exists'); }
catch { await fs.copyFile('.env.example', '.env'); console.log('\n  📄 .env created — fill in credentials!'); }
const node = parseInt(process.version.slice(1));
console.log(node >= 20 ? `\n  ✅ Node ${process.version}` : `\n  ⚠️  Upgrade to Node 20+`);
console.log('\n🎉 Done!\n');
console.log('Next:\n  1. Fill .env\n  2. npm run agents:init\n  3. Open VS Code Copilot Chat\n');
