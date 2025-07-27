# GitHub Secrets Configuration

## Cloudflare API Token
```
7MPZFH6M1xsHv7544K6_rNrFo9c11CNZsgc6ZG9Y
```

## Manual Steps Required

Since GitHub CLI is not installed, you need to add this secret manually:

1. Go to: https://github.com/aziwar/dr-islam-website/settings/secrets/actions

2. Click "New repository secret"

3. Add the following secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: `7MPZFH6M1xsHv7544K6_rNrFo9c11CNZsgc6ZG9Y`

4. Click "Add secret"

5. Also add your Cloudflare Account ID:
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: `9a55d808300cfa4186a82af70ebbde03`

## Verification

After adding both secrets:
1. Go to Actions tab: https://github.com/aziwar/dr-islam-website/actions
2. Click on the latest workflow run
3. It should show both deployments (main site + contact form)

## Security Note
This token has been saved locally for reference. Make sure to:
- Keep it secure
- Rotate it periodically
- Never commit it to the repository