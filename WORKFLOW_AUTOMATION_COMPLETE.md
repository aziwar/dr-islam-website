# DR-ISLAM-WEBSITE AUTOMATED WORKFLOW

## 🚀 Quick Start
```powershell
npm start  # Opens interactive menu
```

## 📱 Mobile-First Development
1. **Always** test at these breakpoints FIRST:
   - 375px (iPhone SE)
   - 768px (iPad)
   - 1280px (Desktop)

2. **Never** deploy without running:
   ```powershell
   npm run test:mobile
   ```

## 🔧 Daily Workflow
```powershell
# Morning
npm run dev              # Start local development
# Make changes...
npm run test:mobile      # Test all breakpoints
npm run lint:css         # Fix CSS issues

# Ready to deploy?
npm run deploy:prod      # Automated validation + deploy
```

## 🐛 Common Issues Fixed

### CSS Not Updating?
The deployment script now:
- Generates BUILD_VERSION automatically
- Forces cache revalidation
- Monitors for stale cache every 5 minutes

### Mobile Layout Broken?
Mobile tests run BEFORE deployment:
- WhatsApp button position check
- Emergency banner font size validation
- Viewport responsiveness test

### Manual Deployment Errors?
Everything is automated:
- Syntax validation
- Local testing
- Cache busting
- Deployment confirmation

## 📊 Monitoring
Your site is checked every 5 minutes for:
- Uptime status
- Cache headers
- Critical UI elements
- Response time

Deploy monitor once:
```powershell
npm run monitor
```

## 💡 Key Rules
1. **NO** manual `wrangler deploy` commands
2. **NO** CSS edits without viewport testing  
3. **NO** production pushes without validation
4. **ALWAYS** use npm scripts

---
Setup completed: 2025-07-18
By: Claude (Opus 4)