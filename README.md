# SF Agentic Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.59+-blue.svg)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-3.3+-purple.svg)](https://allurereport.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Salesforce Automation Framework** — AI-powered test generation and execution using Playwright Test Agents, designed for Salesforce Lightning applications.

## 🚀 Overview

SF Agentic Framework is a cutting-edge automation solution that combines:
- **AI-Powered Test Generation** using Microsoft's official Playwright Test Agents
- **Salesforce Lightning Expertise** with robust selectors and patterns
- **Comprehensive Reporting** with Allure 3.0 and Playwright HTML reports
- **CI/CD Integration** with Jenkins pipeline support
- **VS Code Integration** with GitHub Copilot Chat agents

## 🏗️ Architecture

```
├── .github/agents/           # AI Agent definitions (Planner/Generator/Healer)
├── config/                   # Playwright configuration
├── memory/                   # Framework knowledge base
├── scripts/                  # Setup and utility scripts
├── specs/                    # Test plans and specifications
├── tasks/                    # Task definitions for agents
├── tests/                    # Generated test files
├── utils/                    # Helper utilities and locators
└── reports/                  # Test results and reports
```

## ✨ Key Features

### 🤖 AI-Powered Test Generation
- **Planner Agent**: Analyzes requirements and creates comprehensive test plans
- **Generator Agent**: Converts plans into executable Playwright tests
- **Healer Agent**: Automatically fixes broken tests and selectors

### 🎯 Salesforce Lightning Optimized
- **Robust Selectors**: Uses semantic locators (`getByRole`, `getByLabel`, `getByText`)
- **Lightning Patterns**: Built-in knowledge of Salesforce UI behaviors
- **Authentication**: Automated login with session reuse
- **Toast Handling**: Proper success/error message validation

### 📊 Advanced Reporting
- **Allure 3.0**: Beautiful, interactive test reports
- **Playwright HTML**: Detailed execution reports
- **JUnit XML**: CI/CD integration support
- **Screenshots & Videos**: Automatic failure capture

### 🔧 Developer Experience
- **VS Code Integration**: Native Copilot Chat agent support
- **Hot Reload**: Real-time test execution feedback
- **Debug Mode**: Headed browser testing with breakpoints
- **TypeScript**: Full type safety and IntelliSense

## 🛠️ Quick Start

### Prerequisites
- **Node.js** 20.x or higher
- **VS Code** 1.105+ with GitHub Copilot Chat
- **Salesforce Org** with Lightning Experience enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sf-agentic-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Salesforce credentials
   ```

4. **Initialize Playwright Test Agents**
   ```bash
   npm run agents:init
   ```

5. **Setup Salesforce authentication**
   ```bash
   npm run setup
   ```

## 📋 Configuration

### Environment Variables (.env)

```env
# Salesforce Credentials
SF_URL=https://your-org.lightning.force.com
SF_USERNAME=your@email.com
SF_PASSWORD=YourPassword123
SF_SECURITY_TOKEN=YourSecurityToken

# Test Configuration
BASE_URL=https://your-org.lightning.force.com
HEADLESS=true
SLOW_MO=0
TIMEOUT=60000

# Reporting
ALLURE_RESULTS_DIR=./reports/allure-results
```

### Playwright Configuration

The framework uses a comprehensive Playwright configuration (`config/playwright.config.js`) with:
- **Global Setup**: Automated Salesforce authentication
- **Multiple Reporters**: Allure, HTML, JUnit
- **Cross-browser Support**: Chromium (expandable to Firefox/WebKit)
- **Screenshot/Video Capture**: Automatic failure evidence
- **Custom Timeouts**: Optimized for Salesforce Lightning

## 🎯 Usage

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:lead
npm run test:opportunity

# Run in headed mode (visible browser)
npm run test:headed

# Debug mode with breakpoints
npm run test:debug

# UI mode for test exploration
npm run test:ui
```

### AI Agent Workflow

1. **Plan**: Use Planner Agent to analyze requirements
2. **Generate**: Use Generator Agent to create test code
3. **Execute**: Run tests with comprehensive reporting
4. **Heal**: Use Healer Agent to fix any broken tests

### Example Test Generation

```javascript
// AI Agent generates this from natural language requirements
sfTest('Create Lead with Required Fields Only', async ({ sfPage: page }) => {
  await sfStep('Navigate to Leads app', page, async () => {
    await navigateToApp(page, 'Leads');
  });

  await sfStep('Click New button', page, async () => {
    await page.getByRole('button', { name: /^New$/i }).click();
    await waitForSFLoad(page);
  });

  // ... robust, maintainable test code
});
```

## 📊 Reporting

### Allure Reports
```bash
npm run report:allure
```
- Interactive dashboard with test trends
- Step-by-step execution details
- Screenshots and videos embedded
- Historical test data

### Playwright HTML Reports
```bash
npm run report:pw
```
- Detailed execution timeline
- Trace viewer integration
- Error stack traces
- Performance metrics

## 🔧 Development

### Project Structure

```
├── config/playwright.config.js    # Playwright configuration
├── utils/sf-helpers.js           # Salesforce utilities
├── utils/locator-utils.js        # Locator helpers
├── utils/reporter-utils.js       # Allure integration
├── memory/sf-selectors.md        # Selector reference
├── memory/framework-memory.md    # Framework knowledge
├── .github/agents/               # AI agent definitions
└── scripts/setup.js             # Environment setup
```

### Locator Strategy

**Priority Order (Non-negotiable):**
1. `page.getByRole('button', { name: 'New' })` ← Always first choice
2. `page.getByLabel('First Name')` ← For form fields
3. `page.getByPlaceholder('Search...')` ← For search inputs
4. `page.getByText('Success')` ← For text content
5. `page.locator('[aria-label="Close"]')` ← ARIA fallback
6. `page.locator('.toastMessage')` ← **ONLY** CSS exception

### Salesforce Patterns

```javascript
// After every navigation or click
await waitForSFLoad(page);

// Toast assertion (immediate - disappears in ~3s)
const toast = page.locator('.toastMessage');
await expect(toast).toBeVisible({ timeout: 15000 });

// Modal interactions
const dialog = page.getByRole('dialog');
await dialog.getByLabel('First Name').fill('value');
```

## 🚀 CI/CD Integration

### Jenkins Pipeline

The framework includes a complete Jenkins pipeline (`Jenkinsfile`) with:
- **Parameterized Builds**: Select test suites and modes
- **Allure Reporting**: Integrated test results
- **Artifact Management**: Screenshots and videos
- **Scheduled Runs**: Nightly regression testing

### GitHub Actions

Example workflow for GitHub Actions:
```yaml
name: Salesforce Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:ci
      - uses: allure-report/action@v1
        with:
          allure_results: reports/allure-results
```

## 🤖 AI Agents

### Planner Agent
- Analyzes business requirements
- Creates comprehensive test plans
- Identifies test scenarios and edge cases

### Generator Agent
- Converts test plans to executable code
- Applies Salesforce-specific patterns
- Generates robust, maintainable tests

### Healer Agent
- Automatically fixes broken selectors
- Updates tests for UI changes
- Maintains test reliability

## 📈 Best Practices

### Test Organization
- **One Concept Per Test**: Each test validates a single business rule
- **Descriptive Names**: Clear, actionable test names
- **Data Isolation**: Unique test data to avoid conflicts

### Selector Guidelines
- **Semantic First**: Always prefer `getByRole`, `getByLabel`, `getByText`
- **Avoid Fragile Selectors**: No CSS classes or XPath with IDs
- **Test Selector Robustness**: Use AI agents to validate selectors

### Error Handling
- **Explicit Assertions**: Clear pass/fail criteria
- **Screenshot on Failure**: Automatic evidence capture
- **Timeout Management**: Appropriate timeouts for Salesforce operations

## 🔍 Troubleshooting

### Common Issues

**Authentication Failures**
```bash
# Check auth state
ls -la reports/.auth-state.json
# Re-run setup
npm run setup
```

**Selector Failures**
```bash
# Use Healer Agent to fix
# Or check memory/sf-selectors.md for alternatives
```

**Timeout Issues**
```bash
# Increase timeout in .env
TIMEOUT=120000
# Or run in headed mode for debugging
npm run test:headed
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Add** tests for new functionality
4. **Run** the full test suite
5. **Submit** a pull request

### Development Setup
```bash
# Install dependencies
npm install

# Run tests in watch mode
npm run test:debug

# Generate reports
npm run report:allure
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft Playwright Team** for the Test Agents framework
- **Salesforce** for Lightning Experience patterns
- **Allure Framework** for comprehensive reporting
- **VS Code & GitHub Copilot** for AI-powered development

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/sf-agentic-framework/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/sf-agentic-framework/discussions)
- **Documentation**: [Wiki](https://github.com/your-org/sf-agentic-framework/wiki)

---

**Built with ❤️ for Salesforce testing excellence**