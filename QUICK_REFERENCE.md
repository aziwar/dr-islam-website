# 🚀 DR-ISLAM-WEBSITE QUICK REFERENCE

## Daily Commands
```powershell
npm start          # Opens menu
npm run dev        # Local development
npm run test:mobile # Test all viewports
npm run deploy:prod # Production deploy
```

## Golden Rules
1. **ALWAYS** test mobile first (375px)
2. **NEVER** deploy without npm run deploy:prod
3. **IGNORE** "quick fix" temptations
4. **TRUST** the automated workflow

## Problem → Solution
- CSS not updating? → BUILD_VERSION handles it
- Mobile broken? → test:mobile catches it
- Deployment failed? → deploy.ps1 validates first
- Site down? → monitor.js alerts in 5 min

## Emergency Fixes
```powershell
# Force cache clear
npm run deploy:prod  # Includes cache bust

# Check what's deployed
wrangler deployments list

# View live logs
wrangler tail
```

## Remember
Your old workflow: Dev → Deploy → Debug → Fix
Your new workflow: Dev → Test → Validate → Deploy ✓

---
Created: 2025-07-18 | One command to rule them all: npm start