# CLAUDE.md - dr-islam-website

## Methodology
READ → PLAN → ACTION

## Communication
- Direct only, no fluff
- ONE solution, no options
- "I don't know" when uncertain

## Project
- **URL**: dr-elsagher.com  
- **Stack**: Cloudflare Workers
- **Repo**: ahmedziwar/dr-islam-website
- **Colors**: #BEB093, #777669
- **RTL-first**: Arabic primary

## Key Files
- `/src/worker.js` - Main worker
- `/src/content/ar.js` - Arabic
- `/src/content/en.js` - English  
- `/src/content/styles.js` - Styles

## Your Job
1. Edit code (surgical changes)
2. Git commit + push
3. Report: "Done. Commit: [hash]"

## Your Tools
- GitHub MCP - Push commits
- Context7 - Get latest docs

## NOT Your Job
- Deployment (Claude Desktop)
- Big refactors
- Architecture changes

## RTL Rules
- No `position: absolute`
- Use `margin-inline-start`
- Test Arabic first

## Git Format
```
type: description

- Change 1
- Change 2
```

## Workflow
1. Read task
2. Minimal edits
3. Commit
4. Push
5. Report hash

## End Message
"Completed: [task]
Commit: [hash]
Ready for deployment check"