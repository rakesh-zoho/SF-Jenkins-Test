import axios from 'axios';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default class TeamsReporter {
  constructor() {
    this.failedTests = [];
  }

  onTestEnd(test, result) {
    if (result.status === 'failed' || result.status === 'timedOut') {
      this.failedTests.push({ test, result });
    }
  }

  async onEnd() {
    if (this.failedTests.length === 0) return;

    console.log(`\n📢 Sending ${this.failedTests.length} failure alerts to Microsoft Teams...`);

    for (const { test, result } of this.failedTests) {
      await this.sendToTeams(test, result);
    }
  }

  async sendToTeams(test, result) {
    const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
    const errorMessage = result.error?.message || 'No error message';

    // Teams Adaptive Card JSON structure
    const cardPayload = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "d63333", // Red for failure
      "summary": "Automation Failure Alert",
      "sections": [{
        "activityTitle": "🚨 **Automation Test Failure**",
        "activitySubtitle": `Test: ${test.title}`,
        "facts": [
          { "name": "Status:", "value": "Failed" },
          { "name": "Duration:", "value": `${(result.duration / 1000).toFixed(2)}s` },
          { "name": "Project:", "value": "Salesforce Agentic Automation" }
        ],
        "text": `**Error Detail:**\n\`\`\`\n${errorMessage}\n\`\`\``,
        "markdown": true
      }]
    };

    try {
      await axios.post(webhookUrl, cardPayload);
      console.log(`✅ Teams alert sent: ${test.title}`);
    } catch (err) {
      console.error(`❌ Teams Webhook Error: ${err.message}`);
    }
  }
}