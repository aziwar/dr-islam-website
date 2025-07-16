# Token-Optimized Claude Workflow

## 1. Claude Code (Sonnet 4) - 95% of Work
- Analyze all files
- Make code changes
- Test locally
- Commit to Git
- Push to GitHub
- Report: "Pushed commit abc123"

## 2. Claude Desktop (Opus 4) - 5% Verification
Quick check only:
1. Verify GitHub commit exists
2. Check Cloudflare deployment status
3. Confirm: "Deployed successfully"

## Cost Savings
- Heavy lifting: Sonnet 4 (cheaper)
- Light verification: Opus 4 (expensive)
- Estimated savings: 70-80% on tokens

## Example Session
Claude Code: "I've analyzed 15 files, made RTL fixes, updated service worker, and pushed commit abc123"
Claude Desktop: "Verified - deployment live at dr-elsagher.com"