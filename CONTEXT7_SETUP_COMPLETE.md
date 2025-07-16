# Context7 Added to Claude Code

## Configuration Updated
Added to `.claude.json`:
```json
"context7": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@context7/mcp-server"]
}
```

## Files Modified
1. `.claude.json` - Added Context7 MCP
2. `CLAUDE.md` - Listed as available tool
3. `EXECUTION_RULES.md` - When to use it
4. `QUICK_REFERENCE.md` - Example queries
5. `TOKEN_ECONOMICS.md` - Updated estimates
6. `READY_TO_START.md` - Check both MCPs

## New File Created
- `.claude/CONTEXT7_GUIDE.md` - Usage guide

## Why Context7?
- Latest Cloudflare Workers docs
- CSS logical properties for RTL
- No guessing API syntax
- Reduces debugging time

## Usage in Claude Code
```
"Search Context7 for Cloudflare Workers KV docs"
"Get HTMLRewriter examples"
"Find CSS logical properties for RTL"
```

## Still Efficient
- Only adds ~1K tokens when needed
- Saves debugging time
- Still cheaper than Opus 4
- Use only when uncertain