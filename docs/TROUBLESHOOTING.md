# Troubleshooting Guide - Dr Islam Website

## CI/CD Pipeline Issues

### Common GitHub Actions Deployment Failures

#### Issue: `npx failed with exit code 1`
**Root Causes:**
1. Missing `npm ci` step - wrangler not installed
2. Invalid Cloudflare secrets (API token/Account ID)
3. wrangler-action@v3 compatibility issues

**Solution Pattern:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'

- name: Install dependencies
  run: npm ci

- name: Verify Wrangler
  run: |
    npx wrangler --version
    npx wrangler whoami

- name: Deploy
  run: npx wrangler deploy
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Project Structure Requirements

#### Essential Files:
- `wrangler.toml` - Cloudflare Worker configuration
- `package.json` - Must include wrangler in devDependencies
- `src/index.js` - Worker entry point
- `.github/workflows/deploy.yml` - Deployment workflow

#### Critical Dependencies:
```json
{
  "devDependencies": {
    "wrangler": "^4.25.0"
  }
}
```

### Debugging Methodology

1. **Start Local**: Test `npx wrangler --version` locally
2. **Add Verification**: Include debug steps in workflows
3. **Use Direct Commands**: Prefer `npx` over GitHub Actions
4. **Check Secrets**: Verify API tokens in repository settings
5. **Analyze Patterns**: Look for consistent failure timing/messages

### Key Learnings

- **Don't over-optimize workflows** - "unnecessary" steps are often required
- **Use `npm ci` not `npm install`** - for reproducible builds
- **Direct commands > GitHub Actions** - for better error visibility
- **Always include debugging steps** - to isolate issues quickly
- **Environment variables > action parameters** - more reliable

### Emergency Fixes

If deployment fails:
1. Check GitHub repository secrets (Settings > Secrets)
2. Verify wrangler.toml configuration
3. Test locally: `npx wrangler deploy`
4. Add debugging to workflow and re-run
5. Consider reverting to last working commit

---
*Last updated: Based on troubleshooting session resolving persistent CI/CD failures*