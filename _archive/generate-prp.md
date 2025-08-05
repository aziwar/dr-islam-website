# Generate Website Feature PRP

Create a comprehensive PRP (Product Requirements Prompt) for website features using project patterns.

## Process

1. **Understand the Feature**
   - Read $ARGUMENTS (feature description or INITIAL.md)
   - Check WEBSITE_FIX_TODO.md for context
   - Identify affected components (desktop/mobile/arabic)
   - Note performance implications

2. **Research Project Patterns**
   - Check examples/successful_fixes/ for similar implementations
   - Review src/ for current patterns
   - Identify potential conflicts
   - Extract working solutions from completed tasks

3. **External Research** (if needed)
   - Use context7 for latest patterns: "responsive CSS 2025", "RTL best practices"
   - Search for accessibility guidelines
   - Find performance optimization techniques

4. **Generate PRP Structure**
   - Use appropriate template from PRPs/templates/
   - Include all project-specific gotchas from CLAUDE.md
   - Add validation loops for each requirement
   - Reference successful patterns from examples/
   - Output to PRPs/active/[feature-name].md

## Focus Areas
- Mobile-first implementation (375px baseline)
- Arabic RTL compatibility (query parameter support)
- Performance impact (maintain Lighthouse 95+)
- Accessibility (WCAG 2.1 AA, 48px touch targets)
- Cross-browser testing (Safari, Chrome, Firefox)
- Security considerations (no hardcoded tokens)

## PRP Quality Checklist
- [ ] Clear goal and requirements
- [ ] All necessary context included
- [ ] Validation loops defined
- [ ] Success criteria measurable
- [ ] References to working examples
- [ ] Time estimate realistic

Remember: Context is king - include ALL necessary examples and patterns for one-pass implementation success!