#!/bin/bash

# Script to create Jules-compatible GitHub issues for Dr. Islam website
# Run: bash create-jules-issues.sh

echo "Creating Jules AI issues for dr-islam-website..."

# Issue 1: Mobile Booking Widget Fix
gh issue create \
  --title "Fix mobile responsive booking widget issues" \
  --body "The booking widget needs responsive fixes for mobile devices.

## Requirements:
- Fix layout issues at 375px (mobile)
- Ensure proper display at 768px (tablet)
- Test on 1200px (desktop)
- Verify Arabic RTL layout works correctly
- Ensure form inputs are accessible on touch devices
- Fix any overflow or scrolling issues

## Test URLs:
- English: http://127.0.0.1:8787
- Arabic: http://127.0.0.1:8787?lang=ar

## Files to check:
- src/content/css/core.css.js
- src/content/css/components.css.js
- src/content/js/mobile-ux.js" \
  --label "jules,bug,high-priority"

# Issue 2: Complete Booking Functionality
gh issue create \
  --title "Implement missing booking system features" \
  --body "Complete the booking system implementation with customer-visible features.

## Requirements:
- Add date/time picker for appointments
- Implement form validation (phone, email)
- Add confirmation modal after submission
- Store booking data (use localStorage for now)
- Send confirmation email (mock for development)
- Add loading states during submission
- Implement error handling with user feedback

## Technical Notes:
- Use existing form structure
- Maintain Arabic/English support
- Follow existing CSS patterns" \
  --label "jules,enhancement,high-priority"

# Issue 3: Generate Test Suite
gh issue create \
  --title "Create comprehensive test suite for booking system" \
  --body "Generate tests for the booking widget and form validation.

## Requirements:
- Unit tests for form validation functions
- Test email validation regex
- Test phone number formatting
- Test date/time selection logic
- Integration tests for booking flow
- Test both English and Arabic versions
- Add accessibility tests (ARIA labels, keyboard nav)

## Testing Framework:
- Use Jest or Vitest
- Add to package.json scripts
- Ensure CI/CD compatibility" \
  --label "jules,testing"

# Issue 4: Refactor Headers
gh issue create \
  --title "Refactor duplicate header code" \
  --body "Extract common header functionality to reduce duplication.

## Requirements:
- Identify duplicate code in English/Arabic headers
- Create shared header utilities
- Extract common navigation logic
- Maintain existing functionality
- Ensure no visual changes
- Update imports across all files

## Files involved:
- src/templates/en/header.js
- src/templates/ar/header.js
- src/templates/shared/modern-header.js" \
  --label "jules,refactoring"

# Issue 5: Optimize CSS
gh issue create \
  --title "Optimize and consolidate CSS modules" \
  --body "Improve CSS architecture for better performance.

## Requirements:
- Combine related CSS modules
- Remove duplicate styles
- Implement CSS custom properties for theming
- Optimize for production (minification ready)
- Ensure mobile-first approach
- Maintain existing visual design

## Current structure:
- core.css.js
- components.css.js
- enhancements.css.js
- modern-header.css.js" \
  --label "jules,performance,refactoring"

echo "✅ Jules issues created successfully!"
echo "Next steps:"
echo "1. Go to https://jules.google.com"
echo "2. Connect your GitHub account"
echo "3. Select dr-islam-website repository"
echo "4. Jules will automatically pick up issues with 'jules' label"