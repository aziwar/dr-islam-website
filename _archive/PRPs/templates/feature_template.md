# Website Feature PRP Template

**Name:** [Feature Name]  
**Priority:** [🔴 HIGH / 🟡 MEDIUM / 🟢 LOW]  
**Time Estimate:** [X hours]

## Goal
[Clear description of what needs to be built]

## Requirements
- [ ] Desktop implementation (1200px+)
- [ ] Tablet responsive (768px-1199px)  
- [ ] Mobile responsive (375px-767px)
- [ ] Arabic RTL support
- [ ] Touch targets 48px minimum
- [ ] Lighthouse 95+ maintained

## Context & References

### Must Check
- file: `examples/successful_fixes/` - Working patterns
- file: `src/content/css/` - Current styles
- file: `WEBSITE_FIX_TODO.md` - Task context

### Known Patterns
- CSS: Use 3-file architecture (core/components/enhancements)
- Security: No hardcoded tokens, use env variables
- Arabic: Query parameter support (?lang=ar)
- Mobile: 48px minimum touch targets

## Implementation Steps
1. Research with context7 if needed
2. Check examples/ for similar patterns
3. Implement mobile-first
4. Add Arabic support
5. Test all breakpoints

## Validation
- [ ] Playwright tests at 375px, 768px, 1200px
- [ ] Arabic RTL verification
- [ ] Lighthouse audit
- [ ] Cross-browser check

## Success Criteria
- Feature works across all devices
- No performance regression
- Arabic parity maintained
- Accessibility compliant