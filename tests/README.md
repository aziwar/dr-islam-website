# Test Suite Organization

This directory contains all tests for the Dr. Islam Website project, organized by type and purpose.

## Directory Structure

### `/integration/`
End-to-end and integration tests that validate complete user workflows:
- `comprehensive-site-test.js` - Full site functionality testing
- `mobile-specific-test.js` - Mobile-specific UI/UX tests
- `html-validation-test.js` - HTML markup validation
- `w3c-clean-validation.js` - W3C compliance testing
- `find-inline-styles.js` - CSS validation and optimization
- `production-test.js` - Production environment testing
- `dr-islam-comprehensive-test.js` - Complete integration test suite
- `playwright-*.js` - Playwright-based browser automation tests
- `test-accessibility.js` - Accessibility compliance testing
- `*.html` - Manual testing pages and forms

### `/performance/`
Performance benchmarking and optimization tests:
- `performance-test.js` - Core performance metrics
- `test-performance.ps1` - PowerShell performance monitoring
- `test-perf-simple.ps1` - Simplified performance testing
- `test-cache-headers.*` - Caching strategy validation

### `/scripts/`
Testing automation and utility scripts:
- `Final-ClaudeTest.ps1` - Final validation script
- `Test-SuperClaude.ps1` - SuperClaude framework testing
- `Test-ClaudeCodeConfig.ps1` - Configuration testing
- `test-superclaude.sh` - Shell-based testing utilities

### `/results/`
Test execution results and reports:
- `*.json` - Test result data
- `*.log` - Test execution logs
- `*-report.*` - Generated test reports

## Running Tests

### Prerequisites
```bash
npm install  # Install dependencies including Playwright
```

### Integration Tests
```bash
# Run all integration tests
node tests/integration/comprehensive-site-test.js

# Run specific test suites
node tests/integration/mobile-specific-test.js
node tests/integration/production-test.js
```

### Performance Tests
```bash
# Node.js performance tests
node tests/performance/performance-test.js

# PowerShell performance monitoring (Windows)
powershell -File tests/performance/test-performance.ps1
```

### Accessibility Tests
```bash
node tests/integration/test-accessibility.js
```

### Manual Testing
Open the HTML test files in a browser:
- `tests/integration/mobile-ux-fixes-test.html`
- `tests/integration/test-booking-modal.html`
- `tests/integration/test-form-validation.html`

## Test Coverage

- ✅ **Frontend**: UI components, responsive design, accessibility
- ✅ **Backend**: Worker functionality, form handling, email delivery  
- ✅ **Integration**: End-to-end user workflows
- ✅ **Performance**: Load times, Core Web Vitals, caching
- ✅ **Compliance**: HTML validation, W3C standards, accessibility
- ✅ **Mobile**: Touch interfaces, responsive breakpoints
- ✅ **Security**: Form validation, rate limiting, CORS

## Continuous Integration

Tests are automatically executed in GitHub Actions:
- `.github/workflows/test.yml` - Automated test execution
- `.github/workflows/quality.yml` - Quality assurance checks

## Adding New Tests

1. **Integration Tests**: Add to `/integration/` directory
2. **Performance Tests**: Add to `/performance/` directory  
3. **Update package.json**: Add npm script if needed
4. **Update CI/CD**: Add to GitHub Actions if automated execution required

## Test Guidelines

- Use descriptive test names and clear assertions
- Include both positive and negative test cases
- Test edge cases and error conditions
- Maintain test independence (no test dependencies)
- Clean up after tests (close connections, reset state)
- Document complex test scenarios

## Dependencies

- **Playwright**: Browser automation and E2E testing
- **Node.js**: JavaScript test execution
- **PowerShell**: Windows-specific testing utilities
- **Standard Web APIs**: Fetch, DOM, etc.