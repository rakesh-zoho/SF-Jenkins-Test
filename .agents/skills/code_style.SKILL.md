# SKILL: Code Style & Clean Code

## Purpose

Ensure code is clean, consistent, and easy to maintain.

---

## Core Principles

* Readability > brevity
* Consistency > personal preference
* Explicit > implicit

---

## Naming Conventions

* Variables: descriptive and meaningful
  ❌ data, temp, val
  ✅ userProfile, loginResponse

* Functions:

  * Verb-based
    ✅ getUserData()
    ✅ validateLogin()

* Booleans:
  ✅ isLoggedIn, hasAccess

---

## Functions

* Single responsibility
* Max ~30 lines
* Avoid deep nesting (>3 levels)
* Use early returns

---

## Structure

* Logical file organization
* Group related logic
* Avoid large files (>300-400 lines)

---

## DRY Principle

* No duplication
* Extract reusable logic
* Avoid copy-paste coding

---

## Comments

* Explain WHY, not WHAT
* Avoid redundant comments

❌ i = i + 1 // increment i
✅ // retry logic for flaky API

---

## Formatting

* Consistent indentation
* Proper spacing
* Follow linter rules

---

## Anti-Patterns

* God functions
* Magic numbers
* Deep nesting
* Unused variables
* Commented-out code

---

## Output

* Violations
* Suggested fixes

---

## Severity

🟠 Major:

* Large functions
* Poor structure

🟡 Minor:

* Naming
* Formatting

---
