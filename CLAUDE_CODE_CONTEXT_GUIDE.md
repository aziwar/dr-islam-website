# Claude Code Context Management Guide

## 🎯 CODEBASE GUIDANCE METHODS

### 1. **Project Structure Documentation**
- Use `.claudeproject` file to define project context
- Include architecture overview
- Specify main directories and files
- Document current focus areas

### 2. **Explicit File References**
```bash
# When updating files, always specify full context
claude "Update the mobile CSS in css/mobile.css to improve responsive design for the header section"

# Instead of vague requests like:
claude "fix the mobile issues"
```

### 3. **Context Anchoring**
```bash
# Reference related files explicitly
claude "Update js/logo-processor.js to work with the GPU enhancements from gpu_enhancements.py"

# Specify dependencies
claude "Modify wrangler.toml to support the new image processing features in src/image-handler.js"
```

### 4. **Progressive Context Building**
```bash
# Start with overview
claude "Review the current project structure and identify areas for mobile optimization"

# Then specific tasks
claude "Based on the review, update the CSS grid system in css/main.css for better mobile responsiveness"
```

## 🔧 BEST PRACTICES

### **Before Each Session:**
1. Reference key files: `index.html`, `package.json`, `.claudeproject`
2. Specify current working branch/state
3. Mention recent changes or context

### **During Updates:**
1. Always specify file paths explicitly
2. Reference related files that might be affected
3. Mention testing requirements

### **File Organization Tips:**
- Keep related files in same directories
- Use descriptive file names
- Document dependencies in comments
- Maintain consistent naming conventions

## 📝 EXAMPLE WORKFLOW

### **Good Context Guidance:**
```bash
# Clear, specific, contextual
claude "Update the logo extraction functionality in logo_extractor_gui.py to integrate with the new GPU processing pipeline from gpu_enhancements.py, ensuring compatibility with the Cloudflare Workers deployment in wrangler.toml"
```

### **Poor Context Guidance:**
```bash
# Vague, no context
claude "fix the logo stuff"
```

## 🎪 CONTEXT PRESERVATION

### **Session Continuity:**
- Reference previous changes in same session
- Build on established context
- Maintain consistent terminology

### **Cross-Session Context:**
- Document completed work in session notes
- Reference key decisions and implementations
- Maintain project state awareness
