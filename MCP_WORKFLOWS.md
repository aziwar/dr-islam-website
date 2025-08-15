# MCP Server Workflows - Dr. Islam Website

## 🎯 Auto-Activation Rules (Already Built into SuperClaude)

### Automatic MCP Server Triggers

| Scenario | Auto-Activates | MCP Servers |
|----------|---------------|-------------|
| `import React from 'react'` | When detected | Context7 (docs) |
| "create booking component" | UI keywords | Magic + Context7 |
| "debug appointment system" | Complex debug | Sequential + Serena |
| "test booking flow" | Test keywords | Playwright + Sequential |
| "analyze performance" | Analysis request | Serena + Sequential |
| "implement API endpoint" | Backend work | Context7 + Serena |

## 🚀 Custom Project Commands

### Quick Commands for This Project

```yaml
# UI Components
/ui [component]:
  auto-activates: Magic + Context7
  example: "/ui booking-widget"
  
# Documentation Lookup  
/docs [library]:
  auto-activates: Context7
  example: "/docs cloudflare-workers"

# Testing Workflows
/test [feature]:
  auto-activates: Playwright + Sequential
  example: "/test appointment-form"

# Code Analysis
/analyze [target]:
  auto-activates: Serena + Sequential
  example: "/analyze src/templates/"

# Performance Check
/perf [component]:
  auto-activates: Serena + Playwright + Sequential
  example: "/perf hero-section"
```

## 🔧 Task-Based MCP Combinations

### Common Workflows

#### 1. Building New Features
```bash
# Automatically uses: Magic + Context7 + Serena
"implement appointment calendar with Arabic support"
# Magic: UI generation
# Context7: Library patterns  
# Serena: Integration with existing code
```

#### 2. Debugging Issues
```bash
# Automatically uses: Sequential + Serena
"fix Arabic text rendering in mobile view"
# Sequential: Root cause analysis
# Serena: Code inspection and fixes
```

#### 3. Testing Features
```bash
# Automatically uses: Playwright + Sequential
"test booking form on mobile devices"
# Playwright: Browser automation
# Sequential: Test planning
```

## 📝 Persistent Workflow Configuration

### Add to CLAUDE.md for Auto-Activation:

```markdown
## MCP Server Rules

### Always Use:
- Context7: When importing libraries or asking about frameworks
- Sequential: For debugging or complex analysis (--think flag)
- Magic: For UI/component creation (/ui command)
- Playwright: For testing (/test command)
- Serena: For codebase analysis and refactoring

### Project-Specific Triggers:
- "booking" → Magic + Context7 (UI patterns)
- "Arabic" → Serena (RTL analysis) + Context7 (i18n patterns)
- "mobile" → Playwright (device testing) + Magic (responsive UI)
- "security" → Sequential (threat analysis) + Serena (code audit)

### Performance Optimization:
- Use --no-mcp for simple file edits
- Use --c7 for documentation-heavy tasks
- Use --seq for complex problem solving
- Use --all-mcp only for comprehensive analysis
```

## 🎨 Smart Persona-MCP Mappings

| Persona | Primary MCP | Secondary MCP | Use Case |
|---------|------------|---------------|----------|
| Frontend | Magic | Context7, Playwright | UI components |
| Backend | Serena | Context7, Sequential | API development |
| Analyzer | Sequential | Serena | Debugging |
| QA | Playwright | Sequential | Testing |
| Architect | Sequential | Context7, Serena | System design |

## 💡 Pro Tips

1. **Let SuperClaude Auto-Detect**: The framework is smart enough to activate the right servers based on keywords and context

2. **Use Flags for Control**:
   - `--no-mcp`: Disable all MCP servers for speed
   - `--c7`: Force Context7 for documentation
   - `--seq`: Force Sequential for complex thinking
   - `--all-mcp`: Enable all servers (use sparingly)

3. **Combine with Personas**:
   - `--persona-frontend` auto-prefers Magic
   - `--persona-analyzer` auto-prefers Sequential
   - `--persona-qa` auto-prefers Playwright

4. **Leverage Commands**:
   - `/analyze` → Sequential + Serena
   - `/build` → Magic + Context7
   - `/test` → Playwright + Sequential
   - `/improve` → Serena + Sequential

## 🔄 Workflow Examples

### Example 1: Building Desktop Booking Widget
```bash
# Auto-activates: Magic (UI) + Context7 (patterns) + Serena (integration)
"implement desktop booking widget with WhatsApp integration"
```

### Example 2: Fixing Mobile Issues
```bash
# Auto-activates: Playwright (testing) + Serena (code fix)
"fix mobile menu not closing on Arabic version"
```

### Example 3: Performance Optimization
```bash
# Auto-activates: Sequential (analysis) + Serena (optimization)
/improve --perf hero-section
```

## 📋 Testing the Workflow

1. Try: "create appointment modal" → Should auto-use Magic
2. Try: "analyze security vulnerabilities" → Should auto-use Sequential + Serena
3. Try: "test mobile responsiveness" → Should auto-use Playwright
4. Try: "how to use Cloudflare KV" → Should auto-use Context7

---
*The SuperClaude framework intelligently selects MCP servers based on context. You don't need to manually specify them - just describe what you want to build!*