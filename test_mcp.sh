#!/bin/bash
# Claude Code MCP Test Script

echo "Testing MCP connections..."

# Test GitHub
echo -e "\n1. GitHub MCP Test:"
git remote -v || echo "Git not configured"

# Test Context7  
echo -e "\n2. Context7 Ready"
echo "Ask: 'Search Context7 for Cloudflare Workers KV docs'"

echo -e "\nNote: Claude Code runs in WSL, not Windows CMD"
echo "Config location: .claude.json (project root)"