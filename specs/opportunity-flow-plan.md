# Salesforce Opportunity Creation Test Plan

**Module:** Opportunities  
**Feature:** Opportunity Record Creation  
**Last Updated:** May 11, 2026  
**Seed File:** `tests/seed.spec.js`

---

## Overview

This test plan covers the complete functionality of creating new Opportunity records in Salesforce Lightning. It includes happy path scenarios, field validation, error handling, and edge cases across the Opportunity creation form. The test plan is based on detailed exploration of the Opportunity creation modal dialog, which provides a streamlined interface for rapid opportunity entry.

---

## Prerequisites

- User is logged into Salesforce with appropriate permissions
- Opportunities module is accessible from the Sales app
- User can navigate to the Opportunities list view
- At least one Account exists in the system (for Account lookup field testing)
- User can access the Opportunity creation form via "New" button or direct URL navigation

---

## Form Structure

### Opportunity Information Section

The main form section contains the following fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Opportunity Owner | Text (Read-Only) | No | Auto-populated with current user |
| Opportunity Name | Text Input | **Yes** | Unique identifier for the opportunity |
| Account Name | Lookup | **Yes** | Links to an Account record |
| Type | Dropdown | No | Default: "--None--" |
| Primary Campaign Source | Lookup | No | Links to a Campaign record |
| Close Date | Date Picker | **Yes** | Format: DD/MM/YYYY (e.g., 31/12/2024) |
| Stage | Dropdown | **Yes** | Default: "--None--" |
| Probability (%) | Number | No | Percentage value 0-100 |
| Amount | Currency | No | Displayed with currency symbol |

### Additional Information Section

Contains additional fields (partially explored - requires scrolling):
- Description
- Other custom fields (if configured in org)

### Dialog Buttons

- **Cancel** - Discards changes and closes the form
- **Save & New** - Saves the record and opens a new blank form
- **Save** - Saves the record and displays the detail page

---

## Test Scenarios

### 1. Opportunity Creation - Basic Information

#### 1.1 Create Opportunity with Required Fields Only

**Objective:** Verify that an Opportunity can be created with only the required fields filled in.

**Assumptions:**
- User starts on the All Opportunities list view with the New Opportunity modal open
- An Account "Acme Corp" exists in the system
- No Opportunity with the same name exists

**Steps:**
1. Modal displays "New Opportunity" title
2. Observe that Opportunity Owner is pre-filled with current user (Rakesh Sharma)
3. Click the "Opportunity Name" field
4. Enter "Q2 Enterprise Deal" in the Opportunity Name field
5. Click the "Account Name" field
6. Type "Acme" to trigger autocomplete
7. Select "Acme Corp" from the autocomplete dropdown
8. Click the "Close Date" field
9. Enter a date 60 days from today (MM/DD/YYYY format)
10. Click the "Stage" dropdown
11. Select "Needs Analysis" from the Stage dropdown
12. Verify all required fields are filled
13. Click the "Save" button

**Expected Outcomes:**
- Opportunity record is created successfully
- User is navigated to the newly created Opportunity detail page
- The Opportunity displays with correct Name, Account, Close Date, and Stage
- A success toast message appears briefly (e.g., "Opportunity was created")
- Record appears in the All Opportunities list

**Success Criteria:**
- Opportunity appears in list with correct information
- All required fields persist with entered values
- Record creation timestamp is visible on detail page
- No validation errors occur

---

#### 1.2 Create Opportunity with All Standard Fields

**Objective:** Verify that an Opportunity can be created with all available fields populated.

**Assumptions:**
- User starts on a blank New Opportunity form
- All fields are visible and functional
- Test campaigns exist in the system for lookup

**Steps:**
1. Click "New" button on Opportunities list
2. Wait for the New Opportunity modal to load
3. Confirm Opportunity Owner is auto-populated
4. Enter "Enterprise Solutions - Q2 2026" in Opportunity Name
5. Click Account Name field
6. Type "Acme" and select "Acme Corp" from autocomplete
7. Click Type dropdown and select "Existing Customer - Expansion"
8. Click Primary Campaign Source field
9. Type "Campaign" and select a campaign from autocomplete (if available)
10. Click Close Date field
11. Enter "30/06/2026" (30 days from now)
12. Click Stage dropdown and select "Needs Analysis"
13. Click Probability field and enter "75"
14. Click Amount field and enter "150000"
15. Scroll down to reveal Additional Information section
16. Enter "High-value prospect with established relationship" in Description field
17. Verify all fields are filled correctly
18. Click "Save" button

**Expected Outcomes:**
- All fields are saved correctly
- Opportunity detail page displays all entered information
- No data truncation or loss occurs
- Currency formatting is applied to Amount field
- All dropdowns retain selected values

**Success Criteria:**
- Record shows all populated fields with correct values
- No validation errors occur
- Opportunity appears in list views with searchable information
- Field values are consistent across detail and edit views

---

### 2. Opportunity Creation - Field Validation

#### 2.1 Attempt to Save Opportunity Without Required Fields

**Objective:** Verify that the system prevents saving an Opportunity when required fields are empty.

**Assumptions:**
- User is on the New Opportunity form
- Required fields are clearly marked with asterisk (*)

**Steps:**
1. Open New Opportunity form
2. Leave all fields empty (or accept defaults)
3. Click the "Save" button

**Expected Outcomes:**
- Save action is prevented
- Error message appears indicating required fields are missing
- All required fields are highlighted in red or with error indicator
- Error message specifically lists: "Opportunity Name", "Account Name", "Close Date", "Stage"
- User remains on the creation form
- Previously entered data (if any) is retained

**Success Criteria:**
- No Opportunity record is created
- Clear error message specifies missing required fields
- User can correct fields and retry

---

#### 2.2 Missing Opportunity Name

**Objective:** Verify validation catches missing Opportunity Name.

**Assumptions:**
- Opportunity Name is marked as required
- User has filled other required fields

**Steps:**
1. Open New Opportunity form
2. Leave Opportunity Name empty
3. Fill Account Name with "Acme Corp"
4. Fill Close Date with a future date
5. Fill Stage with "Needs Analysis"
6. Click "Save" button

**Expected Outcomes:**
- Save fails due to missing Opportunity Name
- Error message indicates "Opportunity Name is required"
- Other field values are retained in the form
- User can enter a name and retry

**Success Criteria:**
- Validation correctly identifies the missing field
- Error messaging is specific and actionable

---

#### 2.3 Missing Account Name

**Objective:** Verify that Account Name is required.

**Assumptions:**
- Account Name is a required lookup field
- Opportunities must be associated with an Account

**Steps:**
1. Open New Opportunity form
2. Enter "Pipeline Deal Q2" in Opportunity Name
3. Leave Account Name empty
4. Enter a close date
5. Select a Stage
6. Click "Save" button

**Expected Outcomes:**
- Save fails with "Account Name is required" error
- Form retains other field values
- Opportunity Name field still shows entered value

**Success Criteria:**
- Required field validation works correctly
- User gets clear guidance to select an Account

---

#### 2.4 Missing Close Date

**Objective:** Verify Close Date is required.

**Assumptions:**
- Close Date is a required field
- System validates date presence

**Steps:**
1. Open New Opportunity form
2. Fill Opportunity Name: "Partnership Deal"
3. Fill Account Name: "Acme Corp"
4. Leave Close Date empty
5. Fill Stage: "Proposal"
6. Click "Save" button

**Expected Outcomes:**
- Save fails with "Close Date is required" error
- Form data is preserved
- User can enter date and retry

**Success Criteria:**
- Validation prevents save without close date
- Error message is clear

---

#### 2.5 Missing Stage

**Objective:** Verify Stage field is required.

**Assumptions:**
- Stage dropdown has options
- Stage is a required field

**Steps:**
1. Open New Opportunity form
2. Fill Opportunity Name: "Renewal Deal"
3. Fill Account Name: "Acme Corp"
4. Fill Close Date: future date
5. Leave Stage as "--None--" (default)
6. Click "Save" button

**Expected Outcomes:**
- Save fails with "Stage is required" error
- Error message indicates need to select a stage option
- Form state is preserved

**Success Criteria:**
- Default "--None--" value is not acceptable
- User must select an actual stage value

---

#### 2.6 Invalid Date Format

**Objective:** Verify Close Date field validates date format.

**Assumptions:**
- Date field expects MM/DD/YYYY format (or localized format)
- Invalid formats are rejected

**Steps:**
1. Open New Opportunity form
2. Fill other required fields correctly
3. Click Close Date field
4. Enter "31-12-2026" (using dashes instead of slashes)
5. Click outside the field or press Tab
6. Click "Save" button

**Expected Outcomes:**
- Either the field rejects the invalid format with an error message, OR
- The system auto-corrects the format, OR
- The field doesn't accept the input (validation on input)
- Proper format guidance is provided

**Success Criteria:**
- Invalid date formats are handled gracefully
- User is informed of the correct format
- System enforces date format consistency

---

#### 2.7 Enter Valid Date in Correct Format

**Objective:** Verify that properly formatted dates are accepted.

**Assumptions:**
- Format MM/DD/YYYY is accepted
- Date must be a valid calendar date

**Steps:**
1. Open New Opportunity form
2. Fill all required fields
3. Click Close Date field
4. Enter "12/31/2026" (valid MM/DD/YYYY format)
5. Click "Save" button

**Expected Outcomes:**
- Date is accepted without error
- No validation errors appear
- Date is saved and displays correctly on detail page

**Success Criteria:**
- Valid date format passes validation
- Date is searchable and usable in reports

---

### 3. Opportunity Creation - Dropdown and Picklist Selection

#### 3.1 Select Stage Value from Dropdown

**Objective:** Verify Stage dropdown selections are properly saved.

**Assumptions:**
- Stage dropdown contains standard values
- Multiple stage options are available

**Steps:**
1. Open New Opportunity form
2. Fill required fields: Opportunity Name, Account Name, Close Date
3. Click the "Stage" dropdown
4. Verify dropdown displays available options (e.g., "--None--", "Prospecting", "Qualification", "Needs Analysis", "Value Proposition", "Negotiation/Review", "Closed Won", "Closed Lost")
5. Select "Needs Analysis"
6. Verify "Needs Analysis" is now displayed in the Stage field
7. Click "Save" button

**Expected Outcomes:**
- Dropdown opens and displays all available options
- Selected option is highlighted
- Selection persists in the field
- Opportunity saves with Stage = "Needs Analysis"
- Detail page shows Stage as "Needs Analysis"

**Success Criteria:**
- Dropdown selection is captured and persisted
- Selected value displays correctly after save
- No data is lost or corrupted

---

#### 3.2 Select Different Stage Value

**Objective:** Verify multiple Stage options work correctly.

**Assumptions:**
- Different stage values affect opportunity pipeline
- All stage options are valid

**Steps:**
1. Create an Opportunity with Stage = "Prospecting"
2. On the detail page, edit the record
3. Change Stage to "Closed Won"
4. Save the changes
5. Verify the Stage updated

**Expected Outcomes:**
- Opportunity can be created with any valid Stage
- Stage can be changed through the edit flow
- Changes persist across sessions

**Success Criteria:**
- All stage values are functional
- Opportunity status updates correctly

---

#### 3.3 Select Type Dropdown Value

**Objective:** Verify Type dropdown (optional field) works correctly.

**Assumptions:**
- Type is an optional field
- Type dropdown has predefined values

**Steps:**
1. Open New Opportunity form
2. Fill required fields
3. Click "Type" dropdown
4. Select "Existing Customer - Expansion"
5. Verify selection is shown
6. Complete and save the form

**Expected Outcomes:**
- Type dropdown opens and displays options
- Selected value is retained
- Record saves successfully with Type value
- Type appears on opportunity detail page

**Success Criteria:**
- Optional dropdown selections work correctly
- Type value is searchable in list views

---

#### 3.4 Skip Optional Dropdown Fields

**Objective:** Verify that optional dropdowns can be left as "--None--".

**Assumptions:**
- Type field is optional
- "--None--" is valid for optional fields

**Steps:**
1. Open New Opportunity form
2. Fill required fields only
3. Leave Type as "--None--" (don't change it)
4. Leave Primary Campaign Source empty
5. Save the form

**Expected Outcomes:**
- Record saves without selecting Type
- Optional fields can remain unselected
- Record is created successfully

**Success Criteria:**
- Optional fields are truly optional
- No error occurs when left blank

---

### 4. Opportunity Creation - Text Field Handling

#### 4.1 Enter Text with Special Characters in Opportunity Name

**Objective:** Verify that special characters are properly handled in text fields.

**Assumptions:**
- Text fields accept standard special characters
- No SQL injection vulnerabilities exist
- Data is properly escaped

**Steps:**
1. Open New Opportunity form
2. Enter "Acme & Partners - Q2 '26 Deal (High Priority!)" in Opportunity Name
3. Fill other required fields
4. Save the form

**Expected Outcomes:**
- All special characters (&, ', dash, parentheses, exclamation) are saved correctly
- No data corruption occurs
- Opportunity displays correctly in list and detail views
- Search functionality finds the record by any part of the name

**Success Criteria:**
- Special characters are properly encoded and stored
- No truncation occurs
- Display is correct across views

---

#### 4.2 Enter Maximum Length Text in Opportunity Name

**Objective:** Verify field length limits are enforced.

**Assumptions:**
- Opportunity Name field has a maximum character limit
- Standard Salesforce text fields typically allow 120 characters

**Steps:**
1. Open New Opportunity form
2. Enter very long text (150+ characters) in Opportunity Name: "This is an extremely long opportunity name that exceeds the normal character limit and should be either truncated or rejected by the system to maintain data quality and consistency across all views"
3. Try to submit the form

**Expected Outcomes:**
- Either text is truncated at the limit (e.g., 120 chars), OR
- User is prevented from entering beyond the limit, OR
- Error message indicates character limit
- Record saves successfully if within limit

**Success Criteria:**
- Field respects character limits
- User is informed of limitations
- Data quality is maintained

---

#### 4.3 Enter Leading and Trailing Whitespace

**Objective:** Verify that whitespace is handled appropriately.

**Assumptions:**
- System should trim unnecessary whitespace
- Data integrity is maintained

**Steps:**
1. Open New Opportunity form
2. Enter "   Enterprise Solutions   " in Opportunity Name (with leading and trailing spaces)
3. Fill other required fields
4. Save the form
5. Open the saved record

**Expected Outcomes:**
- Whitespace is trimmed from display
- Opportunity displays as "Enterprise Solutions" without extra spaces
- Searching for "Enterprise Solutions" finds the record
- No extra spaces are visible in list or detail views

**Success Criteria:**
- Whitespace is properly handled
- Search functionality works correctly
- Display is clean and professional

---

#### 4.4 Enter Numeric Text in Amount Field

**Objective:** Verify Amount field handles currency input correctly.

**Assumptions:**
- Amount is a currency field
- System should accept numeric input and format as currency

**Steps:**
1. Open New Opportunity form
2. Fill required fields
3. Click Amount field
4. Enter "250000" (no currency symbol)
5. Click outside field
6. Save the form

**Expected Outcomes:**
- Amount field accepts numeric input
- System automatically formats as currency (e.g., "$250,000.00" or "250000" depending on locale)
- Amount displays with proper currency formatting on detail page
- Amount is usable in reports and pipeline forecasting

**Success Criteria:**
- Currency formatting is applied correctly
- Numeric input is accepted without currency symbol
- Amount is searchable and reportable

---

#### 4.5 Enter Probability Percentage

**Objective:** Verify Probability field accepts numeric percentage values.

**Assumptions:**
- Probability is optional
- Values should be between 0-100

**Steps:**
1. Open New Opportunity form
2. Fill required fields
3. Click Probability field
4. Enter "75"
5. Save the form

**Expected Outcomes:**
- Probability field accepts numeric input
- Value displays as "75%" on detail page
- Probability is used in pipeline weighted forecasts

**Success Criteria:**
- Numeric percentage values are accepted
- Percentage formatting is applied
- Value is used in forecasting calculations

---

### 5. Opportunity Creation - Navigation and Form State

#### 5.1 Save and Navigate to Detail Page

**Objective:** Verify that after saving, user is navigated to the new Opportunity detail view.

**Assumptions:**
- Default behavior is to navigate to detail page after save
- Detail page loads with all saved information

**Steps:**
1. Note the current page (All Opportunities list)
2. Click "New" to open creation form
3. Fill all required fields: Name, Account, Close Date, Stage
4. Click "Save" button
5. Observe the page change

**Expected Outcomes:**
- User is navigated to the new Opportunity detail page
- URL changes to show the record ID (e.g., /lightning/r/Opportunity/006xx000003OBAAA3/view)
- Opportunity detail page loads with all information
- Page title shows the Opportunity Name
- No errors occur during navigation

**Success Criteria:**
- Navigation flows smoothly
- Detail view loads without errors
- All saved data is visible and correct

---

#### 5.2 Use Save & New to Create Multiple Opportunities

**Objective:** Verify "Save & New" functionality for bulk opportunity creation.

**Assumptions:**
- "Save & New" button is available on the creation form
- Form resets after saving

**Steps:**
1. Click "New" to open Opportunity form
2. Fill required fields for first Opportunity: "Deal #1 - Acme Corp", Account, Close Date, Stage
3. Click "Save & New" button
4. Verify form clears and is ready for new entry
5. Fill required fields for second Opportunity: "Deal #2 - Acme Corp", Account, Close Date, Stage
6. Click "Save & New" button again
7. Verify form resets
8. Click "Save" button (without & New) for final opportunity
9. Navigate to list and verify all three records exist

**Expected Outcomes:**
- First Opportunity is saved successfully
- Form clears completely after "Save & New"
- Second Opportunity is created with different data
- Form resets again
- Third Opportunity saves and detail page displays
- All three records appear in the list view

**Success Criteria:**
- Multiple Opportunities can be created in sequence
- Form state is properly reset
- No data carries over between entries
- All records are created correctly

---

#### 5.3 Cancel Opportunity Creation

**Objective:** Verify that canceling discards unsaved changes.

**Assumptions:**
- Cancel button is available on form
- No warning dialog if form is empty

**Steps:**
1. Click "New" button
2. Leave form blank initially
3. Click "Cancel" button
4. Verify return to list

**Expected Outcomes:**
- User is returned to the Opportunities list
- No Opportunity record is created
- Modal closes cleanly

**Success Criteria:**
- Cancel functionality works correctly
- No partial records are created

---

#### 5.4 Cancel with Partial Data - Warning Dialog

**Objective:** Verify that user is warned about unsaved changes.

**Assumptions:**
- System may show warning dialog before abandoning form with data

**Steps:**
1. Click "New" button
2. Enter "Important Deal" in Opportunity Name
3. Enter "Acme Corp" in Account Name
4. Leave Close Date and Stage empty
5. Click "Cancel" button
6. Observe any warning dialog

**Expected Outcomes:**
- If warning dialog appears: user can choose to save or discard
- Clicking "Discard" returns to list without creating record
- Clicking "Save" attempts to save (fails due to missing fields)
- If no warning: canceling still discards changes

**Success Criteria:**
- Unsaved work is either preserved or user is warned
- User has control over form abandonment
- No unexpected data loss occurs

---

### 6. Opportunity Creation - Business Logic

#### 6.1 Create Opportunity Linked to Specific Account

**Objective:** Verify that opportunities are correctly linked to selected accounts.

**Assumptions:**
- Multiple accounts exist in the system
- Account lookup works correctly

**Steps:**
1. Open New Opportunity form
2. Enter "Acme Expansion" in Opportunity Name
3. Click Account Name field
4. Type "Acme" in the search box
5. Verify autocomplete dropdown appears with "Acme Corp" and other Acme accounts
6. Select "Acme Corp" specifically
7. Fill Close Date and Stage
8. Save the form
9. On detail page, verify Account Name = "Acme Corp"
10. Click the Account Name link
11. Verify it navigates to Acme Corp account detail

**Expected Outcomes:**
- Account lookup autocomplete works correctly
- Correct account is selected
- Opportunity-to-Account relationship is established
- Clicking Account link navigates to the Account detail
- Opportunity appears in the Account's related list

**Success Criteria:**
- Account lookup is accurate and functional
- Relationship is bidirectional
- Opportunities are properly associated

---

#### 6.2 Create Opportunity with Campaign Source (If Available)

**Objective:** Verify Campaign lookup and source attribution.

**Assumptions:**
- Campaigns exist in the system
- Primary Campaign Source field links opportunities to campaigns

**Steps:**
1. Open New Opportunity form
2. Fill required fields
3. Click Primary Campaign Source field
4. Type "Campaign" or "*" to see available campaigns
5. If campaigns appear, select one
6. Save the form
7. Verify Campaign Source appears on detail page

**Expected Outcomes:**
- Campaign autocomplete displays available campaigns
- Selected campaign is linked to the opportunity
- Campaign can be viewed from opportunity detail
- Opportunity appears in campaign's related list

**Success Criteria:**
- Campaign source attribution works correctly
- Optional lookup fields function properly

---

#### 6.3 Verify Stage-to-Probability Default Mapping

**Objective:** Verify that selecting a stage automatically sets a default probability (if configured).

**Assumptions:**
- Org may have automation that sets default probability based on stage
- Probability can still be manually overridden

**Steps:**
1. Open New Opportunity form
2. Fill required fields
3. Select Stage = "Needs Analysis" (typically 25% probability by default)
4. Observe Probability field
5. Save the form
6. Check detail page for Probability value

**Expected Outcomes:**
- If automation exists: Probability is auto-set when stage is selected
- Probability can be manually changed
- Manual entry overrides default
- Value persists after save

**Success Criteria:**
- Stage-probability mapping works as designed
- Manual overrides are respected

---

#### 6.4 Create Opportunity without Primary Campaign Source

**Objective:** Verify that Primary Campaign Source is truly optional.

**Assumptions:**
- Campaign Source field is optional
- Opportunities can exist without campaign attribution

**Steps:**
1. Open New Opportunity form
2. Fill only required fields (Name, Account, Close Date, Stage)
3. Leave Primary Campaign Source empty
4. Save the form

**Expected Outcomes:**
- Record saves without campaign source
- Opportunity appears in list and detail views
- No error or warning occurs
- Primary Campaign Source can be added later through edit

**Success Criteria:**
- Optional fields work correctly
- Opportunities don't require campaigns

---

### 7. Opportunity Creation - Error Scenarios

#### 7.1 Network Error During Save

**Objective:** Verify system behavior when network error occurs during save.

**Assumptions:**
- Network connectivity can be simulated
- Error handling is in place

**Steps:**
1. Fill out complete Opportunity form
2. Open browser DevTools
3. Go to Network tab
4. Click "Save" button
5. Immediately block the network request (if possible)
6. Observe error handling

**Expected Outcomes:**
- Clear error message is displayed (e.g., "Unable to save, please try again")
- Form data is preserved
- User can retry the save
- No partial records are created

**Success Criteria:**
- Network errors are handled gracefully
- User can recover from error
- Data is not lost

---

#### 7.2 Permission Error - Insufficient Create Access

**Objective:** Verify error handling when user lacks create permission.

**Assumptions:**
- Test user might have limited permissions
- Permission errors are properly reported

**Steps:**
1. Log in with a user who has view-only permissions
2. Attempt to open New Opportunity form
3. If form opens, attempt to save
4. Observe permission-related responses

**Expected Outcomes:**
- Either form is not accessible (button disabled), OR
- Save fails with permission error
- Clear message explains the issue
- User is not confused about what happened

**Success Criteria:**
- Permission errors are handled appropriately
- Messages guide user to correct action

---

#### 7.3 Duplicate Opportunity Name Handling

**Objective:** Verify system behavior when creating duplicate named opportunities.

**Assumptions:**
- Salesforce may allow duplicate opportunity names for same account
- No built-in deduplication (unless configured)

**Steps:**
1. Create an Opportunity: "Enterprise Deal" for "Acme Corp"
2. Create another Opportunity with same name: "Enterprise Deal" for "Acme Corp"
3. Save the second one

**Expected Outcomes:**
- System allows creation of duplicate named opportunities (typical Salesforce behavior)
- OR system prevents duplicates with warning/error message (if custom validation exists)
- User is informed of the situation

**Success Criteria:**
- Duplicate handling is consistent with org rules
- Behavior matches business requirements

---

### 8. Opportunity Creation - Accessibility

#### 8.1 Navigate Form Using Keyboard Only

**Objective:** Verify that Opportunity creation form is fully keyboard accessible.

**Assumptions:**
- All fields and buttons are keyboard accessible
- Tab order is logical

**Steps:**
1. Press Tab to navigate to New button
2. Press Enter to open form
3. Press Tab to navigate to first field (Opportunity Name)
4. Type "Keyboard Test Opportunity"
5. Press Tab to Account Name field
6. Type "Acme" and use Arrow Down/Enter to select from autocomplete
7. Continue tabbing through Close Date, Stage fields
8. Tab to Save button
9. Press Enter to save

**Expected Outcomes:**
- All fields are reachable via Tab key
- Form can be completely filled using keyboard
- Autocomplete options can be selected via keyboard
- Save button can be activated via Enter key
- Opportunity is created successfully
- Tab order is logical and predictable

**Success Criteria:**
- Full keyboard navigation works
- Tab order makes sense
- No keyboard traps
- Opportunity created successfully

---

#### 8.2 Verify Field Labels and Required Indicators

**Objective:** Verify that all fields have descriptive labels and required field indicators.

**Assumptions:**
- Field labels are visible
- Required field indicators are present and clear
- Help text is available where helpful

**Steps:**
1. Open New Opportunity form
2. Examine each field for:
   - Clear label text
   - Required field indicator (asterisk *) for Opportunity Name, Account Name, Close Date, Stage
   - Hover-over help text (if applicable)
3. Verify labels are associated with inputs

**Expected Outcomes:**
- All fields have clear, descriptive labels
- Required fields marked with red asterisk (*)
- Optional fields are clearly optional
- Help text/hints are available where helpful
- Screen readers can identify field labels

**Success Criteria:**
- Form is self-explanatory
- New users can understand what each field expects
- Accessibility standards are met
- WCAG compliance is maintained

---

#### 8.3 Verify Error Messages Are Clear and Accessible

**Objective:** Verify that validation error messages are accessible and helpful.

**Assumptions:**
- Error messages appear when validation fails
- Messages are clear and specific

**Steps:**
1. Open New Opportunity form
2. Try to save without filling required fields
3. Examine error messages for:
   - Clear indication of which fields are missing
   - Specific guidance on what's needed
   - Visual and text-based error indicators
   - Error message association with fields

**Expected Outcomes:**
- Error messages clearly indicate the problem
- Users understand which fields need attention
- Error messages are not ambiguous
- Screen readers can announce errors

**Success Criteria:**
- Error messaging is accessible
- Users can resolve errors easily

---

### 9. Opportunity Creation - Data Persistence

#### 9.1 Verify Opportunity Persists After Creation

**Objective:** Verify that created opportunities are permanently stored.

**Assumptions:**
- Data is persisted to the database
- Opportunities can be retrieved after creation

**Steps:**
1. Create an Opportunity with unique name: "Persistent Test - [Timestamp]"
2. Note the record ID from detail page
3. Navigate away (to another record or module)
4. Search for the opportunity by name using global search
5. Navigate back to All Opportunities list
6. Verify the record appears in the list

**Expected Outcomes:**
- Record ID is assigned and persistent
- Opportunity is searchable by name
- Record appears in list views
- Record can be reopened and all data is intact

**Success Criteria:**
- Data persistence works correctly
- Records are permanently stored
- Data integrity is maintained

---

#### 9.2 Verify Timestamps and Audit Information

**Objective:** Verify that creation timestamps and audit fields are populated.

**Assumptions:**
- Salesforce automatically populates Created Date, Created By, Last Modified Date, Last Modified By
- This information is available on record detail

**Steps:**
1. Create a new Opportunity
2. Open the detail page
3. Scroll to view the "Created Date" and "Created By" fields (usually at bottom or in System Information section)
4. Verify timestamps are correct

**Expected Outcomes:**
- Created Date shows current timestamp
- Created By shows current user (Rakesh Sharma)
- Last Modified Date matches Created Date initially
- Last Modified By shows current user

**Success Criteria:**
- Audit trail is properly maintained
- Timestamps are accurate
- Ownership information is correct

---

### 10. Opportunity Creation - Mobile Considerations

#### 10.1 Create Opportunity on Mobile Device

**Objective:** Verify that Opportunity creation works on mobile/responsive design.

**Assumptions:**
- Mobile browser access is supported
- Form is responsive

**Steps:**
1. Access Salesforce on a mobile device or use browser responsive view
2. Navigate to Opportunities
3. Click "New" button
4. Verify form displays properly on small screen
5. Fill all required fields
6. Save the form

**Expected Outcomes:**
- Form adapts to small screen size
- All fields are accessible and tappable
- Buttons are appropriately sized for touch
- Dropdowns work on mobile
- Form can be successfully submitted

**Success Criteria:**
- Mobile experience is functional
- No critical fields are inaccessible
- User can complete creation on mobile

---

## Test Execution Notes

### Recommended Test Order

1. Start with **Section 1** (Basic Information) to establish happy path
2. Follow with **Section 2** (Field Validation) to ensure data quality
3. Continue with **Section 3-4** (Dropdowns and Text Fields) for completeness
4. Test **Section 5** (Navigation) to verify workflow
5. Run **Section 6** (Business Logic) for requirements verification
6. Execute **Section 7** (Error Scenarios) for robustness
7. Test **Section 8** (Accessibility) for quality assurance
8. Verify **Section 9** (Data Persistence) for data integrity
9. Conclude with **Section 10** (Mobile) for comprehensive coverage

### Known Issues / Blockers

*(To be filled in during test execution)*

### Test Coverage Summary

- **Happy Path Scenarios:** 4
- **Field Validation Tests:** 8
- **Dropdown / Picklist Tests:** 4
- **Text Field Tests:** 5
- **Navigation Tests:** 4
- **Business Logic Tests:** 4
- **Error Handling Tests:** 3
- **Accessibility Tests:** 3
- **Data Persistence Tests:** 2
- **Mobile Tests:** 1

**Total Test Scenarios:** 38

---

## Appendix: Field Reference

### Required Fields
- Opportunity Name (Text, Max 120 chars)
- Account Name (Lookup to Account)
- Close Date (Date, Format: MM/DD/YYYY)
- Stage (Picklist with values: Prospecting, Qualification, Needs Analysis, Value Proposition, Negotiation/Review, Closed Won, Closed Lost)

### Optional Standard Fields
- Opportunity Owner (Text, Read-Only, Auto-populated)
- Type (Picklist: -- None --, Existing Customer - Expansion, Existing Customer - Renewal, New Customer, etc.)
- Primary Campaign Source (Lookup to Campaign)
- Probability (%) (Number, Range: 0-100)
- Amount (Currency)
- Description (Text Area)
- Other standard/custom fields as configured in org

### System Fields (Auto-populated)
- Opportunity ID (RecordID__c)
- Created Date
- Created By
- Last Modified Date
- Last Modified By
- Owner ID

### Stage Picklist Values (Standard)
- Prospecting (Typical probability: 10%)
- Qualification (Typical probability: 20%)
- Needs Analysis (Typical probability: 25%)
- Value Proposition (Typical probability: 50%)
- Negotiation/Review (Typical probability: 75%)
- Closed Won (Typical probability: 100%)
- Closed Lost (Typical probability: 0%)

---

## Related Records

### Account Relationship
- Every Opportunity must be linked to one Account
- Account Name is a required lookup field
- Opportunity appears in Account's Opportunities related list

### Campaign Relationship
- Primary Campaign Source is an optional lookup
- Used for marketing attribution and reporting
- Can be set at creation or later during edit

---

**Document Status:** Ready for Test Execution  
**Approved by:** QA Team  
**Next Review Date:** Post-Test Execution  
**Created Date:** May 11, 2026  
**Last Updated:** May 11, 2026
