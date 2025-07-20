# CLAUDE.md - AI Assistant Rules
<!-- THIS FILE CONTAINS PROJECT-WIDE RULES FOR ALL AI AGENTS -->

## MANDATORY WORKFLOW
1. Read all files in docs/ before any task
2. Check TODO_TRACKER.md for current status
3. Follow DEV_RULES.md for technical standards
4. Use examples/ folder patterns

## PROJECT AWARENESS
- **Stack:** Cloudflare Workers + R2
- **Deploy:** GitHub → Auto-deploy (NEVER direct to Cloudflare)
- **Live:** https://dr-elsagher.com
- **Critical:** CSS modularization needed (1,556 lines)

## CODE STANDARDS
- Max file size: 500 lines
- CSS: Split into critical/components/responsive
- Security headers: All 6 mandatory
- Performance: Time I/O operations only

## NEVER DO
- Direct deploy to Cloudflare
- Time CPU operations (always 0)
- Use IP for rate limiting
- Hardcode secrets
- Create files > 500 lines

## ALWAYS DO
- Test locally first: `npm run dev`
- Commit to GitHub for deploy
- Add timestamps to tasks
- Use examples/ patterns