# Claude Code Execution Rules

## ALWAYS
- Execute commands, don't suggest
- Verify with actual file reads
- Apply patterns silently
- Work in project directory only

## NEVER  
- Ask how to proceed
- List multiple options
- Add unnecessary features
- Touch files outside project

## File Operations
```bash
# Read before edit
cat src/content/ar.js

# Edit surgical  
vim src/content/ar.js
# Make minimal change
# :wq

# Verify change
git diff
```

## PowerShell Available
If needed for Windows operations:
```powershell
# Use via wsl.exe
wsl.exe powershell.exe Get-ChildItem
```

## Session Memory
Check for previous work:
- Read git log
- Check recent commits
- Continue where left off

## Documentation
Use Context7 ONLY when:
- Uncertain about API syntax
- Need latest Cloudflare features
- CSS logical properties for RTL
Otherwise, apply existing knowledge

## Error Recovery
If something fails:
1. Read actual error
2. Fix root cause only
3. Don't add "defensive" code

## Testing
For visual changes:
```bash
# Local preview
npm run dev
# Check localhost:8787
```

## Measurement
Track your impact:
- Lines changed: minimal
- Files touched: focused
- Time to complete: fast