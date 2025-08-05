# Claude Code Instructions - Dr. Islam Website

## 🚀 Quick Start
1. Open this project in Claude Code
2. Read CLAUDE.md first (39 lines - quick context)
3. Check TODO.md for next task
4. Update SHIPPED.md after completing each feature

## 🎯 Current Priority: Gallery Lightbox (1 hour)
**Why**: Desktop booking widget just completed. Gallery is next customer-visible feature.

## 📋 Work Pattern
```bash
# 1. Start dev server
npm run dev

# 2. Make changes (follow patterns in CLAUDE.md)

# 3. Test at these sizes
- Mobile: 375px
- Desktop: 1200px
- Arabic: Add ?lang=ar

# 4. Commit and auto-deploy
git commit -m "feat: gallery lightbox"
git push
```

## 🔄 Progress Updates
After each feature, update these files:
1. **SHIPPED.md** - Add completed feature with demo instructions
2. **TODO.md** - Move task to completed
3. **PROGRESS_LOG.md** - Add timestamp and what was done

## 📊 Current Status
- Live: https://dr-elsagher.com
- Progress: 24/52 tasks (46%)
- This Week Goal: Ship 3 visible features

## 🚨 Important Patterns
- Security: Always validate with .valid
- Arabic: Check url.searchParams.get('lang')
- CSS: Only edit the 3 CSS files (core/components/enhancements)
- Git: Commits auto-deploy to production

Start with TODO.md → Pick top task → Ship in 1-2 hours