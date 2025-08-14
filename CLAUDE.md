# Claude Code Memory - Dr. Islam Website

## Quick Context
Medical website, 44% complete, needs customer-visible features shipped fast.

## Current State
- **Live at**: https://dr-elsagher.com
- **Dev**: http://127.0.0.1:8787 (`npm run dev`)
- **What works**: Security ✅ Arabic ✅ Mobile ✅ Forms ✅

## Project Patterns
```javascript
// Security: Always check .valid
if (!authResult.valid) return error;

// Arabic: Query param first
const lang = url.searchParams.get('lang');

// CSS: 3 files only
core.css.js → components.css.js → enhancements.css.js

// Git: Auto-deploys
git commit -m "feat: booking widget" && git push
```

## MCP Server Auto-Activation Rules

### Quick Commands
- `/ui [component]` → Magic + Context7 (UI generation)
- `/test [feature]` → Playwright + Sequential (testing)
- `/analyze [code]` → Serena + Sequential (analysis)
- `/docs [library]` → Context7 (documentation)

### Auto-Triggers
- "booking/appointment" → Magic + Context7
- "Arabic/RTL" → Serena + Context7
- "mobile/responsive" → Playwright + Magic
- "debug/fix" → Sequential + Serena
- "import/library" → Context7

### Performance Tips
- Simple edits: Use `--no-mcp` for speed
- Complex tasks: Let auto-activation handle it
- Testing: Always uses Playwright automatically

## Next Task
See TODO.md - Start with Desktop Booking Widget (2 hours)

## Test Everything
- Mobile: 375px
- Tablet: 768px  
- Desktop: 1200px
- Arabic: ?lang=ar

## When Stuck
Use `/analyze` for code issues or `/docs` for library help

---
*Keep it simple. Ship features. Show customer.*