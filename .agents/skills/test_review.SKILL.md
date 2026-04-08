# Test Review Skill

## Overview
This document outlines the process and criteria for reviewing tests to ensure quality, reliability, and maintainability.

---

## Objectives
- Ensure test cases cover required functionality
- Identify gaps in test coverage
- Validate correctness and clarity of test cases
- Improve maintainability and readability

---

## Review Checklist

### 1. Test Coverage
- [ ] Are all functional requirements covered?
- [ ] Are edge cases included?
- [ ] Are negative test cases present?
- [ ] Is boundary value testing applied where needed?

### 2. Test Clarity
- [ ] Are test cases clearly written and understandable?
- [ ] Are inputs and expected outputs well defined?
- [ ] Is the purpose of each test obvious?

### 3. Test Structure
- [ ] Are tests logically organized?
- [ ] Is there duplication that can be reduced?
- [ ] Are reusable components or helpers used?

### 4. Assertions & Validation
- [ ] Are assertions meaningful and correct?
- [ ] Do tests validate the right behavior (not implementation details)?
- [ ] Are error messages helpful?

### 5. Maintainability
- [ ] Is the code easy to update?
- [ ] Are naming conventions consistent?
- [ ] Is unnecessary complexity avoided?

### 6. Performance & Reliability
- [ ] Are tests efficient?
- [ ] Do tests avoid flaky behavior?
- [ ] Are external dependencies mocked where appropriate?

---

## Common Issues to Watch For
- Missing edge cases
- Overly complex tests
- Hardcoded values
- Lack of assertions
- Flaky tests due to timing or environment

---

## Review Process
1. Understand the feature or functionality
2. Compare test cases against requirements
3. Run tests (if applicable)
4. Provide feedback with clear suggestions
5. Approve or request changes

---

## Example Feedback

**Issue:** Missing edge case for empty input  
**Suggestion:** Add a test case where input is empty to verify system behavior  

---

## Conclusion
A good test review ensures high-quality software by catching issues early and improving overall test effectiveness.