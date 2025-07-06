# Dr. Islam Website - Deployment Guide

## Quick Deploy
```bash
cd D:\Github-work\dr-islam-website
wrangler publish
```

## Custom Domain Setup
✅ **ACTIVE**: https://dr-elsagher.com

### To change domain:
1. Cloudflare Dashboard → Workers & Pages
2. Select `dr-islam-website`
3. Custom Domains → Manage
4. Update DNS settings as needed

## Environment Variables
None required (static site)

## Rollback Process
```bash
# List versions
wrangler deployments list

# Rollback to previous
wrangler rollback [deployment-id]
```

## Monitoring
- Analytics: GA4 Dashboard
- Errors: Cloudflare Dashboard → Workers → Logs
- Performance: Chrome DevTools → Lighthouse

## Troubleshooting
| Issue | Solution |
|-------|----------|
| 1101 Error | Worker too large, remove unused files |
| Slow load | Check image sizes, optimize |
| RTL broken | Test CSS with `dir="rtl"` |
| Forms fail | Check Formspree endpoint |