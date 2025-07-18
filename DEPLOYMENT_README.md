# Dr. Islam Website - Deployment Workflow

## ⚠️ CRITICAL: Always Use GitHub-First Workflow

### ✅ CORRECT Workflow:
1. Make changes locally
2. `git add -A`
3. `git commit -m "Your message"`
4. `git push origin master`
5. Auto-deploy via GitHub Actions (or manual `npx wrangler deploy`)

### ❌ NEVER DO THIS:
- `npx wrangler deploy` without committing to GitHub first
- Direct Cloudflare dashboard edits
- Any deployment that bypasses Git

## Setup GitHub Actions Auto-Deploy

Add these secrets to your GitHub repository:
1. Go to Settings → Secrets → Actions
2. Add `CLOUDFLARE_API_TOKEN` - Get from Cloudflare dashboard
3. Add `CLOUDFLARE_ACCOUNT_ID` - Your account ID

## Manual Deployment (if Actions not set up)
```bash
# After pushing to GitHub:
npx wrangler deploy
```

## Key Files
- `src/index.js` - Main worker logic
- `src/content/en.js` - English content
- `src/content/ar.js` - Arabic content  
- `src/content/styles.js` - CSS styles
- `wrangler.toml` - Cloudflare config

## Remember
**ALWAYS commit and push to GitHub before deploying!**
