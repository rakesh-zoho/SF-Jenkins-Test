pipeline {
agent any

tools {
nodejs 'Node20'
allure  'allure'
}

parameters {
choice(
name: 'TEST_SUITE',
choices: ['all', 'lead', 'account', 'opportunity'],
description: 'Which test suite to run'
)
booleanParam(
name: 'HEADED',
defaultValue: false,
description: 'Run browser in headed mode'
)
string(
name: 'RETRIES',
defaultValue: '2',
description: 'Retry count on failure'
)
}

environment {
CI         = 'true'
HEADLESS   = "${!params.HEADED}"
ALLURE_DIR = 'reports/allure-results'
NODE_PATH  = "${WORKSPACE}/node_modules"
}

options {
timeout(time: 60, unit: 'MINUTES')
disableConcurrentBuilds()
buildDiscarder(logRotator(numToKeepStr: '20'))
timestamps()
}

triggers {
cron('H 2 * * *')
}

stages {

```
stage('Checkout') {
  steps {
    checkout scm
    bat '''
      echo "Branch: %GIT_BRANCH%"
      echo "Commit: %GIT_COMMIT%"
      node --version
      npm --version
    '''
  }
}

stage('Install Dependencies') {
  steps {
    bat 'npm ci'
  }
}

stage('Install Playwright Browsers') {
  steps {
    bat 'npx playwright install chromium --with-deps'
  }
}

stage('Run Tests') {
  steps {
    withCredentials([
      string(credentialsId: 'SF_URL',      variable: 'SF_URL'),
      string(credentialsId: 'SF_USERNAME', variable: 'SF_USERNAME'),
      string(credentialsId: 'SF_PASSWORD', variable: 'SF_PASSWORD'),
    ]) {
      script {
        def cmd = 'npx playwright test --config=config/playwright.config.js'
        cmd += " --retries=${params.RETRIES}"

        switch (params.TEST_SUITE) {
          case 'lead':
            cmd += ' tests/lead-creation.spec.js'
            break
          case 'opportunity':
            cmd += ' tests/opportunity-flow.spec.js'
            break
          case 'account':
            cmd += ' tests/account-creation.spec.js'
            break
          default:
            break
        }

        bat cmd
      }
    }
  }
  post {
    always {
      stash includes: 'reports/**', name: 'test-results', allowEmpty: true
    }
  }
}

stage('Generate Allure Report') {
  steps {
    unstash 'test-results'
    bat '''
      allure generate reports/allure-results ^
        -o reports/allure-report --clean || exit 0
    '''
  }
}
```

}

post {
always {

```
  // ✅ Allure Report (Primary)
  allure([
    includeProperties: false,
    jdk: '',
    results: [[path: 'reports/allure-results']],
    report: 'reports/allure-report',
    reportBuildPolicy: 'ALWAYS'
  ])

  // ✅ JUnit Report
  junit(
    testResults: 'reports/junit-results.xml',
    allowEmptyResults: true
  )

  // ✅ Archive Playwright + Test Results
  archiveArtifacts(
    artifacts: 'reports/**',
    allowEmptyArchive: true
  )

  // ✅ Playwright HTML Report (may be partially rendered in Jenkins)
  publishHTML(target: [
    allowMissing: true,
    alwaysLinkToLastBuild: true,
    keepAll: true,
    reportDir: 'reports/playwright-report',
    reportFiles: 'index.html',
    reportName: 'Playwright Report',
    escapeUnderscores: false
  ])
}

success {
  echo '✅ All tests passed!'
}

failure {
  echo '❌ Tests failed — check Allure + artifacts.'
}

unstable {
  echo '⚠️ Some tests are flaky.'
}
```

}
}
