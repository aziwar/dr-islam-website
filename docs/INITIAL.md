# INITIAL.md - Feature Request Template
<!-- Use this template to describe new features before generating PRPs -->

## FEATURE:
[Describe what you want to build - be specific about functionality and requirements]

## EXAMPLES:
[List relevant files from examples/ folder and explain how they should be used]

## DOCUMENTATION:
[Include Context7 docs, Cloudflare Workers docs, or other relevant resources]

## OTHER CONSIDERATIONS:
[Mention gotchas, performance requirements, or common mistakes]

---

# CURRENT TASK: CSS Modularization

## FEATURE:
Split src/content/styles.js (1,556 lines) into 3 modular CSS files for better maintainability

## EXAMPLES:
- examples/css-modular.js - Shows proper CSS module structure
- examples/worker-pattern.js - Shows how to import modules in Workers

## DOCUMENTATION:
- DEV_RULES.md - CSS modularization guidelines
- Context7 Cloudflare Workers best practices

## OTHER CONSIDERATIONS:
- Maintain all existing styles functionality
- Test all responsive breakpoints
- Ensure Arabic RTL styles work correctly
- Keep file sizes under 500 lines each