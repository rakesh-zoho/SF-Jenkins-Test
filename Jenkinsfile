pipeline {
  agent any

  /* ── Tools ─────────────────────────────────────────────────────────
   * NodeJS Plugin: configure a tool named 'Node20' pointing to Node 20.x
   * Allure Plugin:  configure a tool named 'allure' pointing to 2.30.x
   * ─────────────────────────────────────────────────────────────────── */
  tools {
    nodejs 'Node20'
   allure  'allure'
  }

  /* ── Parameters — selectable from Jenkins "Build with Parameters" UI */
  parameters {
    choice(
      name: 'TEST_SUITE',
      choices: ['all', 'lead', 'account', 'opportunity'],
      description: 'Which test suite to run'
    )
    booleanParam(
      name: 'HEADED',
      defaultValue: false,
      description: 'Run browser in headed mode (requires Xvfb on agent)'
    )
    string(
      name: 'RETRIES',
      defaultValue: '2',
      description: 'Playwright retry count on failure'
    )
  }

  /* ── Environment ───────────────────────────────────────────────────── */
  environment {
    CI         = 'true'
    HEADLESS   = "${!params.HEADED}"
    ALLURE_DIR = 'reports/allure-results'
    NODE_PATH  = "${WORKSPACE}/node_modules"
  }

  /* ── Options ───────────────────────────────────────────────────────── */
  options {
    timeout(time: 60, unit: 'MINUTES')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timestamps()
  }

  /* ── Triggers ──────────────────────────────────────────────────────── */
  triggers {
    cron('H 2 * * *')   // nightly at ~2 AM
  }

  /* ── Stages ────────────────────────────────────────────────────────── */
  stages {

    stage('Checkout') {
      steps {
        checkout scm
        bat '''
          echo "Branch: ${GIT_BRANCH}"
          echo "Commit: ${GIT_COMMIT}"
          node --version
          npm  --version
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
        // Skip this stage if using the official Playwright Docker agent
        // (mcr.microsoft.com/playwright) — browsers are already in the image
        bat 'npx playwright install chromium --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        // Inject SF credentials from Jenkins credential store
        withCredentials([
          string(credentialsId: 'SF_URL',            variable: 'SF_URL'),
          string(credentialsId: 'SF_USERNAME',        variable: 'SF_USERNAME'),
          string(credentialsId: 'SF_PASSWORD',        variable: 'SF_PASSWORD'),
            ]) {
          script {
            // Build the Playwright command based on the TEST_SUITE parameter
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
                // 'all' — run everything inside tests/
                break
            }

            bat cmd
          }
        }
      }
      post {
        always {
          // Stash results so the Reporting stage always has them
          stash includes: 'reports/**', name: 'test-results', allowEmpty: true
        }
      }
    }

    stage('Generate Reports') {
      steps {
        unstash 'test-results'
        bat '''
          allure generate reports/allure-results \
            -o reports/allure-report --clean || true
        '''
      }
    }

  }

  /* ── Post Actions ──────────────────────────────────────────────────── */
  post {
    always {
      // Allure plugin — renders the report in the build sidebar
      allure([
        includeProperties: false,
        jdk: '',
        results: [[path: 'reports/allure-results']],
        report: 'reports/allure-report',
        reportBuildPolicy: 'ALWAYS'
      ])

      // JUnit results — powers the test trend graph on the job page
      junit(
        testResults: 'reports/junit-results.xml',
        allowEmptyResults: true
      )

      // Archive failure screenshots and Playwright traces
      archiveArtifacts(
        artifacts: 'reports/test-results/**,screenshots/**',
        allowEmptyArchive: true
      )

      // Playwright HTML report as a clickable sidebar link
      publishHTML(target: [
        allowMissing:          true,
        alwaysLinkToLastBuild: true,
        keepAll:               true,
        reportDir:             'reports/playwright-report',
        reportFiles:           'index.html',
        reportName:            'Playwright Report'
      ])
    }

    success {
      echo '✅ All SF tests passed!'
    }

    failure {
      echo '❌ Tests failed — check Allure report and archived screenshots.'
    }

    unstable {
      echo '⚠️  Some tests are unstable (flaky). Review the Allure trend.'
    }
  }
}