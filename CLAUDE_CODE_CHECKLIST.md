# Claude Code Task Checklist

## Setup (First Time)
- [ ] Read CLAUDE_CODE_CONTEXT.md
- [ ] Verify Git credentials
- [ ] Check current branch

## For Each Task
1. [ ] State the specific change needed
2. [ ] Identify affected files
3. [ ] Make minimal, focused edits
4. [ ] Test locally if possible
5. [ ] Commit with clear message
6. [ ] Push to GitHub
7. [ ] Report commit hash to user

## DON'T
- Don't analyze entire codebase
- Don't refactor unnecessarily  
- Don't wait for deployment
- Don't verify Cloudflare

## DO
- Keep changes surgical
- Use existing patterns
- Commit frequently
- Let Claude Desktop verify

## End Message Template
"Completed: [task description]
Commit: [hash]
Ready for Cloudflare verification"