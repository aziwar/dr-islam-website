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

## Next Task
See TODO.md - Start with Desktop Booking Widget (2 hours)

## Test Everything
- Mobile: 375px
- Tablet: 768px  
- Desktop: 1200px
- Arabic: ?lang=ar

## When Stuck
Use `/sc:troubleshoot` with context7 for latest patterns

---
*Keep it simple. Ship features. Show customer.*