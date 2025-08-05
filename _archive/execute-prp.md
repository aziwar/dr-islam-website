# Execute Website Feature PRP

Implement a feature using the specified PRP file with validation loops.

## Process

1. **Load and Analyze PRP**
   - Read the PRP from $ARGUMENTS (e.g., PRPs/active/feature-name.md)
   - Understand all requirements and success criteria
   - Review referenced examples and patterns
   - Note validation loops to execute

2. **Pre-Implementation Checks**
   - Verify development server running (http://127.0.0.1:8787)
   - Check current git status
   - Review affected files mentioned in PRP
   - Ensure no conflicting work in progress

3. **Implementation Steps**
   - Follow the implementation blueprint in the PRP
   - Use patterns from examples/successful_fixes/
   - Apply project-specific gotchas from CLAUDE.md
   - Implement mobile-first, then enhance for larger screens
   - Ensure Arabic RTL support at each step

4. **Validation Execution**
   - Run each validation loop defined in the PRP
   - Test at all breakpoints: 375px, 768px, 1200px
   - Verify Arabic functionality with ?lang=ar
   - Check console for errors
   - Measure performance impact

5. **Post-Implementation**
   - Update WEBSITE_FIX_TODO.md with completion status
   - Commit with conventional format: "fix: [description]"
   - Move PRP from active/ to completed/
   - Document any new patterns discovered

## Quality Checks
- [ ] All requirements from PRP completed
- [ ] Validation loops passed
- [ ] No console errors
- [ ] Performance maintained (Lighthouse 95+)
- [ ] Arabic/English feature parity
- [ ] Mobile touch targets >= 48px

## Common Patterns to Apply
- CSS specificity from navigation fix
- Security patterns from auth fixes
- Arabic routing with query parameters
- Progressive enhancement approach

Remember: Test thoroughly at each step - it's easier to fix issues immediately than after full implementation!