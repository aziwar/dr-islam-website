# Critical: Fix console.error syntax error in index.js

## Bug Location
`src/index.js:270` - Incomplete console.error statement

## Current Code
```javascript
console.error
imageMetrics.error = error.message;
```

## Fix Required
```javascript
console.error('Image fetch error:', error);
imageMetrics.error = error.message;
```

## Impact
This syntax error could cause the Worker to fail when handling image errors.

**Labels**: bug, critical, auto-assign
**Assignee**: @ai-agent