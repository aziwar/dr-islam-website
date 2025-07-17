# Windows Claude Code Instructions

## You're Running on Windows
- Claude Code is running natively on Windows
- Use Windows commands (dir, type, etc.)
- Git Bash commands also work
- npx commands work directly

## Test MCP Connections

### GitHub Test
```bash
git remote -v
git status
```

### Context7 Test
Ask: "Search Context7 for Cloudflare Workers docs"

## File Editing
- Use your preferred method
- Can open files with: `code filename`
- Or edit inline as needed

## Your Config
- Location: `.claude.json` (in project root)
- GitHub PAT: Already configured
- Context7: No API key needed

## Ready Check
1. Confirm you see this project structure
2. Try: `git log -1` to see last commit
3. You're ready to work!