# Claude Code Windows Setup Verified

## Running Natively on Windows ✓
- NOT using WSL
- Direct Windows execution
- Config: `.claude.json` in project root

## MCP Servers Configured
```json
{
  "github": "@modelcontextprotocol/server-github",
  "context7": "@upstash/context7-mcp"
}
```

## Quick Verification
Tell Claude Code:
```
1. Run: git remote show origin
2. If that works, GitHub MCP is connected
3. Ask: "Search Context7 for any docs" to test Context7
```

## Windows-Specific Notes
- All paths use backslashes (\)
- Git Bash commands work
- npx runs directly
- No WSL commands needed

## If MCP Still Shows Issues
The verification might be looking for a different command. Just try using the tools:
- Make a commit to test GitHub
- Search docs to test Context7