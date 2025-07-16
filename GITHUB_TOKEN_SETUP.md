# GitHub Personal Access Token Setup

## For Claude Code GitHub MCP

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Claude Code - dr-islam-website"
4. Expiration: 90 days
5. Select scopes:
   - [x] repo (all)
   - [x] workflow
6. Generate token
7. Copy immediately (shown once!)

## Add to .claude.json
Replace YOUR_GITHUB_PAT with actual token

## Security Note
- Never commit .claude.json to Git
- Add to .gitignore if needed
- Token only needs push access