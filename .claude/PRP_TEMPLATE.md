# Product Requirements Prompt (PRP) Template
For dr-islam-website features

## Feature: [Feature Name]
Status: [ Planning | In Progress | Testing | Deployed ]

## Documentation & References
```yaml
context7_validation:
  library: [name]
  version: [version]
  trust_score: X.X/10
  timestamp: [ISO-8601]
  
dependencies:
  - [library@version]
  - [library@version]
  
references:
  - [URL or doc link]
  - [URL or doc link]
```

## Requirements
### User Story
As a [type of user]
I want [goal]
So that [benefit]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] RTL compatibility verified
- [ ] Mobile responsive (320px-1920px)
- [ ] Loads in <100ms

## Known Gotchas
- **RTL Issues**: [Specific CSS properties to avoid]
- **Cloudflare Limits**: [Worker size, CPU time]
- **Browser Support**: [Specific compatibility notes]
- **Arabic Text**: [Font or rendering issues]

## Implementation Blueprint
```javascript
// PLAN Phase
// 1. Environment check
// 2. Resource validation
// 3. Dependency verification

// PSEUDOCODE
function implementFeature() {
  // Step 1: Setup
  
  // Step 2: Core logic
  
  // Step 3: RTL handling
  
  // Step 4: Error handling
}

// ACTION Phase
// Execute only after approval
```

## Validation Loops
### Development
- [ ] Local test (Arabic)
- [ ] Local test (English)
- [ ] Worker size check (<1MB)
- [ ] Performance audit

### Staging
- [ ] Deploy to test worker
- [ ] Cross-browser check
- [ ] Mobile devices test
- [ ] RTL visual regression

### Production
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Performance metrics
- [ ] User feedback

## Rollback Plan
1. Previous worker version ID: ________
2. Rollback command: `wrangler rollback`
3. Verification steps: [List checks]

## Notes
[Any additional context, decisions, or rationale]