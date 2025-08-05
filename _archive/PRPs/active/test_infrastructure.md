# Test Infrastructure Implementation - Active PRP

**Name:** Complete Test Infrastructure  
**Priority:** 🔴 CRITICAL  
**Time Estimate:** 2 hours

## Goal
Implement all missing test files referenced in package.json to enable proper CI/CD and quality assurance

## Context
Package.json defines test scripts that reference non-existent test files:
```json
"test": "vitest",
"test:integration": "vitest run tests/integration",
"test:performance": "vitest run tests/performance",
"test:accessibility": "vitest run tests/accessibility",
"test:mobile": "vitest run tests/mobile"
```

Existing pattern: `tests/security/admin-auth.test.js` shows successful TDD approach

## Requirements
- [ ] Create integration test suite for gallery API
- [ ] Create performance test suite with Lighthouse
- [ ] Create accessibility test suite for WCAG compliance
- [ ] Create mobile test suite for touch interactions
- [ ] Ensure all npm test scripts work

## Missing Test Files
```
tests/
├── integration/
│   ├── gallery.test.js      # Gallery API endpoints
│   └── routing.test.js      # Language routing
├── performance/
│   └── lighthouse.test.js   # Core Web Vitals
├── accessibility/
│   └── wcag.test.js        # WCAG 2.1 AA compliance
└── mobile/
    └── touch.test.js       # 48px targets, gestures
```

## Implementation Blueprint

### Integration Tests
```javascript
// tests/integration/gallery.test.js
import { describe, it, expect } from 'vitest';

describe('Gallery API Integration', () => {
    it('should require auth for admin endpoints', async () => {
        const response = await fetch('/api/gallery/list');
        expect(response.status).toBe(401);
    });
    
    it('should allow public gallery access', async () => {
        const response = await fetch('/api/gallery/public');
        expect(response.status).toBe(200);
    });
});
```

### Performance Tests
```javascript
// tests/performance/lighthouse.test.js
import lighthouse from 'lighthouse';

describe('Performance Metrics', () => {
    it('should maintain 95+ Lighthouse score', async () => {
        const result = await lighthouse('http://localhost:8787');
        expect(result.categories.performance.score).toBeGreaterThan(0.95);
    });
});
```

## Validation Loops
1. Run each test category individually
2. Run full test suite
3. Check coverage report
4. Verify CI/CD integration

## Success Criteria
- All test scripts in package.json work
- 80%+ code coverage achieved
- Tests run in <30 seconds
- No test failures in CI/CD
- Clear test output and reporting