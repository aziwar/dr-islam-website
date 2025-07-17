# Quick Commands - dr-islam-website

## Navigation
```bash
# Already in project directory when you start Claude Code
dir
```

## Common Edits
```bash
# Arabic content
vim src/content/ar.js

# English content  
vim src/content/en.js

# Styles
vim src/content/styles.js

# Worker logic
vim src/worker.js
```

## Git Workflow
```bash
# Check status
git status

# Stage all
git add .

# Commit
git commit -m "fix: update hero gradient"

# Push
git push origin master

# View last commit
git log -1 --oneline
```

## Testing
```bash
# Install deps (first time)
npm install

# Run local
npm run dev

# Build check
npm run build
```

## Quick Fixes

### Context7 Queries
```
"Search Context7 for Cloudflare Workers cache API"
"Get Context7 docs on CSS margin-inline-start"
"Find HTMLRewriter documentation"
```

### RTL Issue
```javascript
// Bad
style: 'position: absolute; left: 20px;'

// Good  
style: 'margin-inline-start: 20px;'
```

### Arabic Text
```javascript
// In ar.js
heroTitle: 'د. إسلام الصاغر',
heroSubtitle: 'طب وجراحة الفم والأسنان',
```

### Cache Update
```javascript
// In worker.js
headers: {
  'Cache-Control': 'public, max-age=3600, s-maxage=86400'
}
```