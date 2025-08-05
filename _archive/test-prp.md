# Generate Test Infrastructure PRP

Create comprehensive PRPs specifically for test infrastructure and validation.

## Process

1. **Analyze Test Requirements**
   - Read $ARGUMENTS (test type or coverage area)
   - Check package.json for expected test scripts
   - Review existing test patterns (tests/security/admin-auth.test.js)
   - Identify missing test coverage

2. **Research Testing Patterns**
   - Use context7: "Vitest Cloudflare Workers 2025"
   - Find Playwright best practices for responsive testing
   - Research accessibility testing with WCAG guidelines
   - Look up performance testing with Lighthouse CI

3. **Generate Test PRP**
   - Use PRPs/templates/test_suite_template.md
   - Include setup requirements (Vitest, Playwright)
   - Define test scenarios for each breakpoint
   - Add Arabic/RTL specific test cases
   - Reference successful test patterns

## Test Categories to Cover

### Integration Tests
- Gallery API endpoints
- Authentication flows
- Language switching (?lang=ar parameter)
- Form submissions
- KV namespace operations

### Performance Tests
- Core Web Vitals (LCP, FID, CLS)
- Lighthouse scores maintenance
- Bundle size monitoring
- Loading performance at different network speeds

### Accessibility Tests
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation
- Touch target sizes (48px minimum)

### Mobile Tests
- Touch interactions
- Viewport behavior
- Virtual keyboard handling
- Swipe gestures
- Haptic feedback

## Test PRP Structure
- Test framework setup
- Mock/stub requirements
- Test data preparation
- Assertion patterns
- Coverage targets
- CI/CD integration

Remember: Tests should be fast, isolated, and deterministic!