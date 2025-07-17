# Context7 MCP Server - Universal Setup Complete

## ✅ SETUP STATUS: WORKING GLOBALLY

### **CONFIGURATION LOCATION**
- **Global Config**: `C:\Users\zewar\.claude.json`
- **Status**: ✅ Updated to only include Context7 MCP server with HTTP transport
- **Scope**: Works in ALL project folders

### **CURRENT CONFIGURATION**
```json
{
  "mcpServers": {
    "context7-server": {
      "type": "http",
      "url": "http://localhost:3000",
      "command": "C:\\Program Files\\nodejs\\npx.cmd",
      "args": [
        "-y",
        "@upstash/context7-mcp",
        "--transport",
        "http",
        "--port",
        "3000"
      ],
      "env": {
        "PATH": "C:\\Program Files\\nodejs;C:\\Users\\zewar\\AppData\\Roaming\\npm;C:\\Users\\zewar\\AppData\\Local\\npm;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0",
        "NODE_PATH": "C:\\Program Files\\nodejs",
        "HOME": "C:\\Users\\zewar",
        "USER": "zewar",
        "USERPROFILE": "C:\\Users\\zewar"
      }
    }
  }
}
```

### **VERIFICATION COMMANDS**
```bash
# Check MCP servers (should show only Context7)
npx @anthropic-ai/claude-code mcp list

# Expected output:
# context7-server: http://localhost:3000 (HTTP)
```

### **USAGE INSTRUCTIONS**

#### **1. Start Context7 Server (One-time per session)**
```bash
# In any terminal window
npx @upstash/context7-mcp --transport http --port 3000

# Expected output:
# Context7 Documentation MCP Server running on HTTP at http://localhost:3000/mcp
```

#### **2. Use Claude Code (In any project folder)**
```bash
# Navigate to any project folder
cd D:\your-project-folder

# Use Claude Code with Context7 MCP server
npx @anthropic-ai/claude-code "your prompt here"
```

### **FEATURES AVAILABLE**
- ✅ **Documentation Search**: Access to library documentation
- ✅ **Context7 Database**: Comprehensive tech documentation
- ✅ **HTTP Transport**: Stable Windows-compatible communication
- ✅ **Global Access**: Works in any project folder
- ✅ **No stdio Issues**: Bypasses Windows stdio transport problems

### **REMOVED SERVERS**
- ❌ **GitHub MCP** (stdio only, Windows incompatible)
- ❌ **Filesystem MCP** (stdio issues)
- ❌ **Brave Search MCP** (stdio issues)
- ❌ **Memory MCP** (stdio issues)

### **TROUBLESHOOTING**

#### **If Context7 server fails to start:**
```bash
# Check if port 3000 is already in use
netstat -an | findstr :3000

# Use alternative port
npx @upstash/context7-mcp --transport http --port 3001
# (Update config file accordingly)
```

#### **If Claude Code doesn't see MCP servers:**
```bash
# Verify global configuration
npx @anthropic-ai/claude-code mcp list

# Should show: context7-server: http://localhost:3000 (HTTP)
```

### **USAGE WORKFLOW**
1. **Once per Windows session**: Start Context7 server
2. **In any project folder**: Use Claude Code normally
3. **MCP functionality**: Automatically available globally

### **ADVANTAGES OF THIS SETUP**
- **Universal**: Works in all project folders
- **Stable**: HTTP transport eliminates Windows stdio issues
- **Simple**: Only one working MCP server
- **Reliable**: No configuration conflicts
- **Documented**: Full library documentation access

### **TEMPLATE FOR NEW PROJECTS**
No need for project-specific .claude.json files - global configuration handles everything!

---
**Result**: Claude Code now works with Context7 MCP server in any project folder using stable HTTP transport.