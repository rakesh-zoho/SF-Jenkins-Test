# Salesforce Lead Creation Test Plan

**Module:** Leads  
**Feature:** Lead Record Creation  
**Last Updated:** April 1, 2026  
**Seed File:** `tests/seed.spec.js`

---

## Overview

This test plan covers the complete functionality of creating new Lead records in Salesforce. It includes happy path scenarios, field validation, error handling, and edge cases across the Lead creation form.

---

## Prerequisites

- User is logged into Salesforce with appropriate permissions
- Leads module is accessible
- User can navigate to the Leads list view
- User can access the Lead creation form via "New" button

---

## Test Scenarios

### 1. Lead Creation - Basic Information

#### 1.1 Create Lead with Required Fields Only

**Objective:** Verify that a Lead can be created with only the required fields filled in.

**Assumptions:**
- User starts on a blank/fresh Leads list view
- No lead with the same name exists in the system

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "John" in the First Name field
3. Enter "Doe" in the Last Name field
4. Enter "Acme Corporation" in the Company field
5. Click the "Save" button

**Expected Outcomes:**
- Lead record is created successfully
- User is redirected to the newly created Lead detail view
- The Lead displays with First Name: "John", Last Name: "Doe", Company: "Acme Corporation"
- A success message is displayed

**Success Criteria:**
- Lead appears in the Leads list with correct information
- Lead ID is generated and visible on detail page
- Record creation timestamp is recorded

---

#### 1.2 Create Lead with All Standard Fields

**Objective:** Verify that a Lead can be created with all standard fields populated.

**Assumptions:**
- User starts on a blank Lead creation form
- All fields are visible and functional

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "Jane" in the First Name field
3. Enter "Smith" in the Last Name field
4. Enter "Tech Innovations Inc" in the Company field
5. Enter "Manager" in the Title field
6. Enter "jane.smith@techinnovations.com" in the Email field
7. Enter "(555) 123-4567" in the Phone field
8. Enter "San Francisco" in the City field
9. Enter "CA" in the State field
10. Enter "94105" in the Postal Code field
11. Enter "United States" in the Country field
12. Select "Other" from the Lead Source dropdown
13. Select "$10,000 to $50,000" from the Annual Revenue dropdown
14. Select "Purchased List" from the Lead Status dropdown
15. Select "Warm" from the Rating dropdown
16. Enter "High priority prospect for Q2" in the Description field
17. Click the "Save" button

**Expected Outcomes:**
- All fields are saved correctly
- Lead record displays all entered information on the detail view
- No data truncation or loss occurs
- All dropdowns retain selected values

**Success Criteria:**
- Record shows all populated fields with correct values
- No validation errors occur
- Lead appears in list views with searchable information

---

### 2. Lead Creation - Field Validation

#### 2.1 Attempt to Save Lead Without Required Fields

**Objective:** Verify that the system prevents saving a Lead when required fields are empty.

**Assumptions:**
- User is on the Lead creation form
- Required fields are clearly marked

**Steps:**
1. Click the "New" button on the Leads list view
2. Leave all fields empty
3. Click the "Save" button

**Expected Outcomes:**
- Save action is prevented
- Error message appears indicating required fields
- Fields are highlighted in red or with error indicator
- User remains on the creation form

**Success Criteria:**
- No Lead record is created
- Clear error message specifies missing required fields
- User can correct and retry

---

#### 2.2 Enter Only First Name and Attempt Save

**Objective:** Verify validation catches missing required fields (Last Name).

**Assumptions:**
- Last Name is a required field
- User starts on blank form

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "Michael" in the First Name field
3. Leave Last Name empty
4. Click the "Save" button

**Expected Outcomes:**
- Save action fails
- Error for missing Last Name is displayed
- First Name is retained in the form

**Success Criteria:**
- Validation correctly identifies missing required field
- Error message is specific about the missing field

---

#### 2.3 Enter Only Last Name and Company and Attempt Save

**Objective:** Verify that First Name is required even when other fields are filled.

**Assumptions:**
- First Name is marked as required
- Company is also a required field

**Steps:**
1. Click the "New" button on the Leads list view
2. Leave First Name empty
3. Enter "Johnson" in the Last Name field
4. Enter "Global Enterprises" in the Company field
5. Click the "Save" button

**Expected Outcomes:**
- Save fails due to missing First Name
- Error message indicates First Name is required
- User can correct and save

**Success Criteria:**
- System enforces all required field validation
- User can iterate until all required fields are filled

---

#### 2.4 Enter Invalid Email Format

**Objective:** Verify email field validation for proper format.

**Assumptions:**
- Email field has format validation
- Email is not a required field

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "Sarah" in the First Name field
3. Enter "Williams" in the Last Name field
4. Enter "Digital Solutions" in the Company field
5. Enter "invalid-email-format" in the Email field (missing @ symbol)
6. Click the "Save" button

**Expected Outcomes:**
- Either save is prevented with email validation error, OR
- Lead saves but email field shows validation warning
- Invalid email is not accepted

**Success Criteria:**
- Email format validation functions correctly
- User receives clear message about required format

---

#### 2.5 Enter Valid Email Address

**Objective:** Verify that properly formatted emails are accepted.

**Assumptions:**
- Valid email format is required
- Email field accepts standard email addresses

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "Robert" in the First Name field
3. Enter "Brown" in the Last Name field
4. Enter "Enterprise Corp" in the Company field
5. Enter "robert.brown@enterprisecorp.com" in the Email field
6. Click the "Save" button

**Expected Outcomes:**
- Email is accepted and saved
- No validation errors appear
- Email appears on Lead detail view

**Success Criteria:**
- Valid email format passes validation
- Email is searchable and linkable

---

### 3. Lead Creation - Dropdown and Picklist Selection

#### 3.1 Select Values from Lead Source Dropdown

**Objective:** Verify dropdown selections are properly saved.

**Assumptions:**
- Lead Source dropdown contains standard options
- User can select from available options

**Steps:**
1. Click the "New" button on the Leads list view
2. Choose the Salutation as Mr.
3. Enter "Emily" in the First Name field
4. Enter "Davis" in the Last Name field
5. Enter "Growth Ventures" in the Company field
6. Click the Lead Source dropdown
7. Select "Website" from the dropdown
8. Click the "Save" button

**Expected Outcomes:**
- "Website" is selected in the dropdown
- Lead saves successfully
- Lead Source appears as "Website" on detail view

**Success Criteria:**
- Dropdown selection is captured and persisted
- Selected value displays correctly after save

---

#### 3.2 Select Different Picklist Value - Rating

**Objective:** Verify the Rating picklist accepts selections.

**Assumptions:**
- Rating field has standard values (Hot, Warm, Cold)
- Field is optional

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "David" in the First Name field
3. Enter "Miller" in the Last Name field
4. Enter "Premier Industries" in the Company field
5. Click the Rating dropdown
6. Select "Cold" from the dropdown
7. Click the "Save" button

**Expected Outcomes:**
- "Cold" is selected
- Lead saves with Cold rating
- Rating displays as "Cold" on detail page

**Success Criteria:**
- Picklist value is correctly stored
- Visual indicator matches selection

---

#### 3.3 Change Picklist Value After Initial Selection

**Objective:** Verify that picklist values can be changed before saving.

**Assumptions:**
- User is on the Lead form before saving
- Multiple dropdown changes can be made

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "Jessica" in the First Name field
3. Enter "Taylor" in the Last Name field
4. Enter "Creative Agency" in the Company field
5. Click the Rating dropdown and select "Hot"
6. Click the Rating dropdown again and change to "Warm"
7. Click the "Save" button

**Expected Outcomes:**
- Final selection "Warm" is saved
- Previous selection "Hot" is not saved
- No duplicate records created

**Success Criteria:**
- Only final selection is persisted
- No partial data saved

---

### 4. Lead Creation - Text Field Handling

#### 4.1 Enter Text with Special Characters

**Objective:** Verify that special characters are properly handled in text fields.

**Assumptions:**
- Text fields should accept standard special characters
- No injection vulnerabilities

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "François" in the First Name field
3. Enter "O'Sullivan" in the Last Name field
4. Enter "Société Générale & Partners" in the Company field
5. Enter "françois.o'sullivan@societe-generale.fr" in the Email field
6. Click the "Save" button

**Expected Outcomes:**
- All special characters (é, ', &, -) are saved correctly
- No data corruption occurs
- Names display correctly in list and detail views

**Success Criteria:**
- Special characters are properly encoded and stored
- No truncation occurs
- Display is correct across views

---

#### 4.2 Enter Maximum Length Text in Description Field

**Objective:** Verify field length limits are enforced.

**Assumptions:**
- Description field has a maximum character limit
- User is aware of or informed about limit

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "Patrick" in the First Name field
3. Enter "Sullivan" in the Last Name field
4. Enter "Longview Corp" in the Company field
5. Enter a very long description (500+ characters) in the Description field
6. Click the "Save" button

**Expected Outcomes:**
- Either text is truncated at the limit, OR
- User is prevented from entering beyond limit, OR
- Error message indicates character limit
- Record saves successfully if within limit

**Success Criteria:**
- Field respects character limits
- User is informed of limitations
- Data is not lost unexpectedly

---

#### 4.3 Enter Leading and Trailing Whitespace

**Objective:** Verify that whitespace is handled appropriately.

**Assumptions:**
- System should trim unnecessary whitespace
- Data integrity is maintained

**Steps:**
1. Click the "New" button on the Leads list view
2. Enter "  Christopher  " in the First Name field (with spaces)
3. Enter "Anderson" in the Last Name field
4. Enter "Tech Solutions" in the Company field
5. Click the "Save" button
6. Open the saved Lead record

**Expected Outcomes:**
- Whitespace is trimmed from display
- Lead displays as "Christopher Anderson" without extra spaces
- Searching for "Christopher" finds the record

**Success Criteria:**
- Whitespace is properly handled
- Search functionality works correctly
- Display is clean and professional

---

### 5. Lead Creation - Navigation and Form State

#### 5.1 Save and Navigate Away

**Objective:** Verify that after saving, user is navigated to the new Lead detail view.

**Assumptions:**
- User starts on Lead list or another page
- Navigation occurs automatically after save

**Steps:**
1. Note the current Leads list view
2. Click the "New" button
3. Enter "Mark" in the First Name field
4. Enter "Wilson" in the Last Name field
5. Enter "Innovation Labs" in the Company field
6. Click the "Save" button
7. Verify the page changes to the Lead detail view

**Expected Outcomes:**
- User is navigated to the new Lead detail page
- URL changes to show the Lead record
- Lead information is displayed
- No errors occur

**Success Criteria:**
- Navigation flows smoothly
- Detail view loads without errors
- All saved data is visible

---

#### 5.2 Use Save & New to Create Multiple Leads

**Objective:** Verify "Save & New" functionality for bulk lead creation.

**Assumptions:**
- "Save & New" button is available on the form
- Form resets after saving

**Steps:**
1. Click the "New" button
2. Enter "Lisa" in the First Name field
3. Enter "Garcia" in the Last Name field
4. Enter "Market Dynamics" in the Company field
5. Click "Save & New" button (if available)
6. Verify form is cleared
7. Enter "Kevin" in the First Name field for the second Lead
8. Enter "Martinez" in the Last Name field
9. Enter "Industry Leaders" in the Company field
10. Click "Save" button

**Expected Outcomes:**
- First Lead is saved
- Form resets for new entry
- Second Lead is created
- Both Leads appear in the list

**Success Criteria:**
- Multiple Leads can be created in sequence
- Form state is properly reset
- No data carries over between entries

---

#### 5.3 Cancel Lead Creation

**Objective:** Verify that canceling discards unsaved changes.

**Assumptions:**
- Cancel button is available on form
- No warning dialog if form is empty

**Steps:**
1. Click the "New" button
2. Enter "Rachel" in the First Name field
3. Enter "Lee" in the Last Name field
4. Enter "Progress Corp" in the Company field
5. Click the "Cancel" button
6. Verify that you return to the Leads list
7. Verify that no Lead with these names exists

**Expected Outcomes:**
- User is returned to the Leads list
- No Lead record is created
- Form data is discarded

**Success Criteria:**
- Cancel functionality works correctly
- No partial records are created

---

#### 5.4 Cancel with Unsaved Changes - Warning Dialog

**Objective:** Verify that user is warned about unsaved changes.

**Assumptions:**
- System may show warning dialog before abandon form

**Steps:**
1. Click the "New" button
2. Enter significant data in multiple fields
3. Click the "Cancel" button
4. Note any warning dialogs
5. If dialog appears, click "Discard" or "Continue"
6. Verify return to Leads list

**Expected Outcomes:**
- If warning dialog appears, user can choose to save or discard
- Canceling discards changes
- Returning to list doesn't show new record

**Success Criteria:**
- Data loss is prevented through appropriate warnings
- User has control over form abandonment

---

### 6. Lead Creation - Business Logic

#### 6.1 Verify Auto-Populated Fields (If Applicable)

**Objective:** Verify that system auto-populates certain fields based on defaults or context.

**Assumptions:**
- Some fields may have default values
- User or team may have default settings

**Steps:**
1. Click the "New" button
2. Note any pre-filled fields
3. Document what is pre-populated
4. Enter required fields: "Alan", "Harris", "Enterprise Systems"
5. Click "Save"

**Expected Outcomes:**
- Any auto-populated fields are clearly visible
- User can override defaults if needed
- Defaults are applied consistently

**Success Criteria:**
- Auto-population works as designed
- Values are appropriate for the context

---

#### 6.2 Verify Lead Deduplication (If Applicable)

**Objective:** Verify that system detects duplicate leads by name and company.

**Assumptions:**
- A Lead with name "John Smith" from "Acme Corp" already exists
- System may show duplicate warning

**Steps:**
1. Create a Lead with First Name: "John", Last Name: "Smith", Company: "Acme Corp"
2. Click "Save"
3. If duplicate warning appears, note the interface
4. Proceed with save or cancel as indicated

**Expected Outcomes:**
- System identifies duplicates
- User is warned before proceeding
- User can choose to save anyway or cancel

**Success Criteria:**
- Duplicate detection works
- User experience is intuitive
- Duplicates can be created if intentional

---

#### 6.3 Verify Related Records (If Applicable)

**Objective:** Verify that Accounts can be linked during Lead creation.

**Assumptions:**
- Lookup field to Account may exist
- User can search and select existing accounts

**Steps:**
1. Click the "New" button
2. Enter required Lead information: "Olivia", "Johnson", "Tech Partners Inc"
3. Look for Account lookup field
4. If present, search for and select an existing Account
5. Click "Save"

**Expected Outcomes:**
- Lead is created
- Related Account (if selected) is linked
- Relationship appears on both sides (if visible)

**Success Criteria:**
- Lead-Account relationship is established
- Data integrity is maintained

---

### 7. Lead Creation - Error Scenarios

#### 7.1 Network Error During Save

**Objective:** Verify system behavior when network error occurs during save.

**Assumptions:**
- Network connectivity can be simulated
- Error handling is in place

**Steps:**
1. Fill out complete Lead form
2. Click "Save" button
3. Simulate network disconnection during save
4. Observe error handling
5. Verify form state after error

**Expected Outcomes:**
- Clear error message is displayed
- Form data is preserved
- User can retry the save
- No partial records are created

**Success Criteria:**
- Error is handled gracefully
- User can recover from error
- Data is not lost

---

#### 7.2 Permission Error - Insufficient Access

**Objective:** Verify error handling when user lacks create permission.

**Assumptions:**
- Test user might have limited permissions in some scenarios
- Permission errors are properly reported

**Steps:**
1. Attempt to navigate to Lead creation with restricted user
2. If form loads, attempt to save
3. Note any permission-related error messages

**Expected Outcomes:**
- Either form is not accessible, OR
- Save fails with permission error
- Clear message explains the issue
- User is not confused about what happened

**Success Criteria:**
- Permission errors are handled appropriately
- Messages guide user to correct action

---

#### 7.3 Timeout During Large Form Save

**Objective:** Verify behavior when save request times out.

**Assumptions:**
- Long data entries or slow network could cause timeout
- Timeout handling is implemented

**Steps:**
1. Create Lead with maximum data entry
2. Simulate network delay
3. Click "Save"
4. Wait for timeout
5. Observe system response

**Expected Outcomes:**
- Timeout error is displayed
- Form state is preserved
- User can retry or cancel
- No partial save occurs

**Success Criteria:**
- Timeout is handled gracefully
- User experience is optimized

---

### 8. Lead Creation - Accessibility

#### 8.1 Navigate Form Using Keyboard Only

**Objective:** Verify that Lead creation form is fully keyboard accessible.

**Assumptions:**
- All fields and buttons are keyboard accessible
- Tab order is logical

**Steps:**
1. Click the "New" button (or Tab to it)
2. Use Tab to navigate to First Name field
3. Type "TabTest"
4. Tab to Last Name field
5. Type "User"
6. Tab to Company field
7. Type "Keyboard Corp"
8. Continue tabbing through remaining fields
9. Tab to "Save" button
10. Press Enter

**Expected Outcomes:**
- All fields are reachable via Tab key
- Form can be completely filled using keyboard
- Save button can be activated via Enter key
- Lead is created successfully
- Tab order is logical and predictable

**Success Criteria:**
- Full keyboard navigation works
- Tab order makes sense
- No keyboard traps
- Screen reader compatibility confirmed

---

#### 8.2 Verify Field Labels and Help Text

**Objective:** Verify that all fields have descriptive labels and help text where needed.

**Assumptions:**
- Field labels are visible
- Required field indicators are present

**Steps:**
1. Click the "New" button
2. Examine each field for:
   - Clear label text
   - Required field indicator (*)
   - Hover-over help text (if applicable)
3. Note any missing labels or unclear indicators

**Expected Outcomes:**
- All fields have clear, descriptive labels
- Required fields are marked
- Help text is available where helpful
- Labels are associated with inputs for accessibility

**Success Criteria:**
- Form is self-explanatory
- New users can understand what each field expects
- Accessibility standards are met

---

## Test Execution Notes

### Recommended Test Order

1. Start with **Section 1** (Basic Information) to establish happy path
2. Follow with **Section 2** (Field Validation) to ensure data quality
3. Continue with **Section 3-4** (Dropdowns and Text Fields) for completeness
4. Test **Section 5** (Navigation) to verify workflow
5. Run **Section 6** (Business Logic) for requirements verification
6. Execute **Section 7** (Error Scenarios) for robustness
7. Conclude with **Section 8** (Accessibility) for quality assurance

### Known Issues / Blockers

*(To be filled in during test execution)*

### Test Coverage Summary

- **Happy Path Scenarios:** 5
- **Field Validation Tests:** 5
- **Dropdown / Picklist Tests:** 3
- **Text Field Tests:** 3
- **Navigation Tests:** 4
- **Business Logic Tests:** 3
- **Error Handling Tests:** 3
- **Accessibility Tests:** 2

**Total Test Scenarios:** 28

---

## Appendix: Field Reference

### Required Fields
- First Name
- Last Name
- Company

### Optional Standard Fields
- Title
- Email
- Phone
- City
- State/Province
- Postal Code
- Country
- Lead Source (Dropdown)
- Annual Revenue (Dropdown)
- Lead Status (Dropdown)
- Rating (Dropdown)
- Description
- Account (Lookup - if available)

### System Fields (Auto-populated)
- Lead ID
- Created Date
- Created By
- Last Modified Date
- Last Modified By

---

**Document Status:** Ready for Test Execution  
**Approved by:** QA Team  
**Next Review Date:** Post-Test Execution
