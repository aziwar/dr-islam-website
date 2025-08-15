# Jules AI Tasks for Dr. Islam Website

## How to Use Jules with This Project

1. **Access Jules**: Visit [jules.google.com](https://jules.google.com)
2. **Connect Repository**: Link this GitHub repository
3. **Assign Tasks**: Use the issues below or create new ones with `jules` label

## Priority Tasks Queue

### 🚨 Critical (Do First)

#### Issue #1: Fix Mobile Booking Widget
```markdown
Title: Fix mobile responsive booking widget issues
Label: jules, bug, high-priority

Description:
The booking widget needs responsive fixes for mobile devices.

Requirements:
- Fix layout issues at 375px (mobile)
- Ensure proper display at 768px (tablet)
- Test on 1200px (desktop)
- Verify Arabic RTL layout works correctly
- Ensure form inputs are accessible on touch devices
- Fix any overflow or scrolling issues

Test URLs:
- English: http://127.0.0.1:8787
- Arabic: http://127.0.0.1:8787?lang=ar
```

#### Issue #2: Complete Missing Booking Functionality
```markdown
Title: Implement missing booking system features
Label: jules, enhancement, high-priority

Description:
Complete the booking system implementation with customer-visible features.

Requirements:
- Add date/time picker for appointments
- Implement form validation (phone, email)
- Add confirmation modal after submission
- Store booking data (use localStorage for now)
- Send confirmation email (mock for development)
- Add loading states during submission
- Implement error handling with user feedback
```

### 🧪 Testing (Do Second)

#### Issue #3: Generate Test Suite
```markdown
Title: Create comprehensive test suite for booking system
Label: jules, testing

Description:
Generate tests for the booking widget and form validation.

Requirements:
- Unit tests for form validation functions
- Test email validation regex
- Test phone number formatting
- Test date/time selection logic
- Integration tests for booking flow
- Test both English and Arabic versions
- Add accessibility tests (ARIA labels, keyboard nav)
```

### 🔧 Refactoring (Do Third)

#### Issue #4: Refactor Header Components
```markdown
Title: Refactor duplicate header code
Label: jules, refactoring

Description:
Extract common header functionality to reduce duplication.

Requirements:
- Identify duplicate code in English/Arabic headers
- Create shared header utilities
- Extract common navigation logic
- Maintain existing functionality
- Ensure no visual changes
- Update imports across all files
```

#### Issue #5: Optimize CSS Architecture
```markdown
Title: Optimize and consolidate CSS modules
Label: jules, performance, refactoring

Description:
Improve CSS architecture for better performance.

Requirements:
- Combine related CSS modules
- Remove duplicate styles
- Implement CSS custom properties for theming
- Optimize for production (minification ready)
- Ensure mobile-first approach
- Maintain existing visual design
```

### ✨ Enhancements (Do Fourth)

#### Issue #6: Add Loading Animations
```markdown
Title: Implement loading states and animations
Label: jules, enhancement, ux

Description:
Add professional loading states throughout the application.

Requirements:
- Add skeleton loaders for content
- Implement smooth transitions
- Add loading spinner for forms
- Create progress indicators
- Ensure animations are accessible (respect prefers-reduced-motion)
- Keep animations under 60fps target
```

#### Issue #7: Implement Service Worker
```markdown
Title: Add service worker for offline support
Label: jules, enhancement, performance

Description:
Implement service worker for better performance and offline capability.

Requirements:
- Cache static assets
- Implement offline fallback page
- Cache API responses where appropriate
- Add update notification for new versions
- Ensure proper cache invalidation
- Test on mobile devices
```

## Jules Workflow Commands

### Quick Task Assignment
```bash
# In Jules interface, use these prompts:

"Fix the mobile responsive issues in the booking widget, ensuring it works at 375px, 768px, and 1200px breakpoints"

"Generate comprehensive unit and integration tests for the booking form validation"

"Refactor the duplicate code between English and Arabic header components while maintaining functionality"

"Add loading animations and skeleton screens for better UX"
```

### Verification Checklist
After Jules completes each task:
- [ ] Review the generated PR
- [ ] Test on local development server
- [ ] Check mobile responsiveness
- [ ] Verify Arabic version still works
- [ ] Run any generated tests
- [ ] Check for console errors
- [ ] Validate accessibility

## Integration with Current Workflow

### Daily Workflow
1. **Morning**: Assign 3-5 tasks to Jules
2. **Focus Time**: Work on complex features while Jules handles routine tasks
3. **Afternoon**: Review Jules' PRs and merge approved changes
4. **Evening**: Deploy updates to production

### Task Prioritization
- **Jules Handles**: Bug fixes, tests, refactoring, documentation
- **You Handle**: Business logic, design decisions, complex features

## Monitoring Jules' Work

### Quality Gates
- Always review generated code before merging
- Test on multiple devices
- Verify Arabic/English parity
- Check performance metrics
- Validate accessibility standards

### Rollback Plan
If Jules' changes cause issues:
1. Revert the PR immediately
2. Create a more specific issue with constraints
3. Re-assign to Jules with clearer requirements

## Tips for Better Jules Results

1. **Be Specific**: Include exact breakpoints, file paths, and requirements
2. **Provide Context**: Share existing patterns and conventions
3. **Set Constraints**: Specify what NOT to change
4. **Include Tests**: Ask Jules to generate tests with code changes
5. **Review Incrementally**: Merge small PRs frequently vs large changes

## Current Project Context for Jules

```yaml
Project: Dr. Islam Dental Website
Stack: Cloudflare Workers, Vanilla JS, CSS-in-JS
Languages: English, Arabic (RTL)
Status: 44% complete
Priority: Customer-visible features
Testing: Manual (needs automation)
Deployment: Auto-deploy on git push
Live URL: https://dr-elsagher.com
```

## Next Steps

1. Create these issues in GitHub
2. Add `jules` label to each
3. Start with Issue #1 (mobile fixes)
4. Let Jules work while you focus on complex features
5. Review and merge PRs daily