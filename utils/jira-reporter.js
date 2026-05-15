import axios from 'axios';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default class JiraReporter {
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
    console.log(`\n⚠️ Processing ${this.failedTests.length} failures for Jira...`);
    for (const { test, result } of this.failedTests) {
      await this.reportToJira(test, result);
    }
  }

  async reportToJira(test, result) {
    const { JIRA_HOST, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY } = process.env;
    const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
    const baseUrl = `https://${JIRA_HOST}/rest/api/2`;

    // Advanced Error Capture
    const errorMessage = result.error?.message || 'No error message';
    const stackTrace = result.error?.stack || 'No stack trace';
    // Captures the sequence of events leading to failure
    const stepSummary = result.steps.map(s => `${s.title} (${s.duration}ms)`).join('\n');

    try {
      // 1. CREATE TICKET
      const issueResponse = await axios.post(`${baseUrl}/issue`, {
        fields: {
          project: { key: JIRA_PROJECT_KEY },
          summary: `Automation Failure: ${test.title}`,
          description: `*Test Case:* ${test.title}\n\n*Error Summary:*\n{quote}${errorMessage}{quote}\n\n*Steps Executed:*\n{noformat}${stepSummary}{noformat}\n\n*Full Stack Trace:*\n{code:javascript}${stackTrace}{code}`,
          issuetype: { name: 'Bug' },
          labels: ['Automation_Failure', 'Playwright']
        }
      }, {
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' }
      });

      const issueKey = issueResponse.data.key;
      console.log(`✅ Ticket Created: ${issueKey}`);

      // 2. TRANSITION STATUS (Captured In Automation - ID: 41)
      await axios.post(`${baseUrl}/issue/${issueKey}/transitions`, {
        transition: { id: "41" } 
      }, {
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' }
      });
      console.log(`🔵 Status updated to "Captured In Automation" for ${issueKey}`);

      // 3. ATTACH SCREENSHOT
      const screenshot = result.attachments.find(a => a.name === 'screenshot');
      if (screenshot && fs.existsSync(screenshot.path)) {
        const form = new FormData();
        form.append('file', fs.createReadStream(screenshot.path));
        await axios.post(`${baseUrl}/issue/${issueKey}/attachments`, form, {
          headers: { 
            ...form.getHeaders(), 
            'Authorization': `Basic ${auth}`, 
            'X-Atlassian-Token': 'no-check' 
          }
        });
        console.log(`📸 Screenshot attached to ${issueKey}`);
      }
    } catch (err) {
      console.error(`❌ Jira Integration Error for ${test.title}:`, err.response?.data || err.message);
    }
  }
}