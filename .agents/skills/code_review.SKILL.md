# SKILL: Code Review (Test Automation Framework)

## Purpose

Provide strict, high-quality code reviews for test automation code focusing on:

* Reliability (no flaky tests)
* Maintainability
* Readability
* Execution speed
* CI/CD compatibility

---

## Review Philosophy

Test code is production code.

Bad test code:

* Slows down teams
* Creates false failures
* Reduces trust in automation

Good test code:

* Is deterministic
* Is easy to debug
* Fails only when there is a real issue

---

## Review Checklist

### 1. Test Reliability (CRITICAL)

* Are there flaky patterns?

  * Hard waits (e.g., sleep, waitForTimeout)
  * Timing dependencies
* Proper waiting strategies used?

  * Explicit waits
  * Auto-waiting (Playwright/Cypress)
* Tests independent from each other?
* No dependency on execution order?
* External dependencies mocked where needed?

❗ Flag as 🔴 Critical if:

* Uses hard waits
* Depends on previous test state
* Non-deterministic behavior

---

### 2. Test Design & Structure

* Follows clear test structure:

  * Arrange / Act / Assert
* Tests are small and focused?
* One assertion purpose per test?
* Proper use of fixtures/setup/teardown?
* Reusable utilities instead of duplication?

---

### 3. Readability & Maintainability

* Clear test names (describe behavior)?
  ✅ "should display error on invalid login"
  ❌ "test_login_1"

* Selectors are stable?

  * Avoid brittle selectors (e.g., nth-child, dynamic IDs)
  * Prefer data-test attributes

* Page Object Model (or equivalent) used correctly?

* No duplicated logic across tests?

---

### 4. Assertions Quality

* Assertions meaningful and explicit?

* Avoid weak assertions:
  ❌ expect(true).toBe(true)
  ❌ checking only status codes without response validation

* Validates real behavior (UI + API responses)?

---

### 5. Performance & Execution Speed

* Tests unnecessarily slow?
* Parallel execution safe?
* Redundant setup repeated?
* Overuse of UI tests instead of API/unit tests?

---

### 6. CI/CD Compatibility

* Tests environment-agnostic?
* No hardcoded URLs, credentials, or configs?
* Proper use of environment variables?
* Can run in headless mode?

---

### 7. Error Handling & Debuggability

* Clear error messages?
* Logs helpful for debugging?
* Screenshots/videos on failure (if UI tests)?
* Failures easy to reproduce?

---

### 8. Test Data Management

* Test data isolated?
* No shared mutable data?
* Uses fixtures or factories?
* Cleanup after test?

---

### 9. Security (Basic)

* No hardcoded secrets
* Sensitive data masked
* Test credentials handled securely

---

## Output Format (MANDATORY)

### Summary

Short evaluation of overall quality and risk level.

---

### 🔴 Critical Issues (Must Fix)

List blocking issues affecting reliability or correctness.

Format:

* Issue
* Why it matters
* Fix suggestion

---

### 🟠 Major Issues

Important improvements affecting maintainability or scalability.

---

### 🟡 Minor Issues

Style, naming, or small improvements.

---

### ✅ Good Practices Found

Highlight what is done well (important for developer feedback).

---

### 💡 Suggestions

Optional improvements or enhancements.

---

## Severity Guidelines

🔴 Critical:

* Flaky tests
* Hard waits
* Shared state between tests
* Non-deterministic behavior

🟠 Major:

* Poor structure
* Weak assertions
* Bad selectors
* Duplication

🟡 Minor:

* Naming issues
* Formatting
* Small readability problems

---

## Anti-Patterns to Flag Immediately

* sleep(), wait(), setTimeout-based waits
* Tests depending on previous test execution
* Randomized test behavior without control
* Overly long test cases (>50-70 lines)
* UI tests doing API validation incorrectly
* Assertions missing after actions

---

## Example Review

Summary:
Tests are functional but contain flakiness risks and poor selector strategy.

---

🔴 Critical Issues:

* Uses fixed wait (waitForTimeout(5000))
  → Causes flaky tests in CI
  → Replace with explicit wait for element state

---

🟠 Major Issues:

* Selectors use nth-child
  → Breaks easily with UI changes
  → Use data-testid attributes

---

🟡 Minor Issues:

* Test name unclear
  → Rename to describe behavior

---

✅ Good Practices:

* Proper use of fixtures
* Tests are independent

---

💡 Suggestions:

* Introduce Page Object Model for reuse
* Add API-level validation for faster coverage

---

## Behavior Rules

* Be strict on flakiness (zero tolerance)
* Prefer actionable feedback
* Do NOT rewrite full test unless asked
* Always explain "why"
* Focus on stability over cleverness

---

## Triggers

Activate when:

* Test files are detected
* Keywords: test, spec, e2e, automation, playwright, cypress, selenium
* PR includes test changes

---
