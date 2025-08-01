#!/usr/bin/env bash

# SuperClaude Test Script
echo "Testing SuperClaude Configuration..."

# Check if Claude Code directory exists
if [ -d "$HOME/.claude" ]; then
    echo "✅ Claude Code directory found"
else
    echo "❌ Claude Code directory not found"
    exit 1
fi

# Check SuperClaude installation
if [ -f "$HOME/.claude/CLAUDE.md" ]; then
    echo "✅ SuperClaude core files found"
else
    echo "❌ SuperClaude core files missing"
    exit 1
fi

# Check commands directory
if [ -d "$HOME/.claude/commands/sc" ]; then
    echo "✅ SuperClaude commands directory found"
    echo "Commands available:"
    ls -1 "$HOME/.claude/commands/sc/" | grep -E "\.md$" | sed 's/\.md$//' | sed 's/^/  \/sc:/'
else
    echo "❌ SuperClaude commands directory missing"
    exit 1
fi

# Check metadata
if [ -f "$HOME/.claude/.superclaude-metadata.json" ]; then
    echo "✅ SuperClaude metadata found"
    echo "Version: $(grep -o '"version": "[^"]*"' "$HOME/.claude/.superclaude-metadata.json" | head -1 | cut -d'"' -f4)"
else
    echo "❌ SuperClaude metadata missing"
fi

echo ""
echo "SuperClaude installation appears to be complete!"
echo "Try using commands like: /sc:analyze, /sc:build, /sc:troubleshoot"
