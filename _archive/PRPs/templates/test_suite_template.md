# Test Suite PRP Template

**Name:** [Test Category] Implementation  
**Priority:** 🔴 CRITICAL  
**Time Estimate:** [X hours]

## Goal
Implement comprehensive test coverage for [specific functionality]

## Context
- Package.json expects: `npm test`, `npm run test:[category]`
- Existing pattern: `tests/security/admin-auth.test.js`
- Framework: Vitest + Playwright

## Requirements
- [ ] Unit tests for [components/utilities]
- [ ] Integration tests for [API endpoints]
- [ ] E2E tests for [user flows]
- [ ] Performance benchmarks
- [ ] Accessibility validation

## Test Structure
```
tests/
├── [category]/
│   ├── unit/
│   ├── integration/
│   └── e2e/
```

## Implementation Blueprint
```javascript
// Based on successful admin-auth.test.js pattern
import { describe, it, expect } from 'vitest';

describe('[Feature] Tests', () => {
    it('should [expected behavior]', async () => {
        // Arrange
        // Act  
        // Assert
    });
});
```

## Validation Loops
1. Run tests locally: `npm test`
2. Check coverage: `npm run test:coverage`
3. Verify CI/CD integration
4. Test across environments

## Success Criteria
- 80%+ code coverage
- All tests passing
- No flaky tests
- Fast execution (<30s)