# Cloudflare Workers CI/CD Builds Setup

## The Correct Deployment Method

Based on [Cloudflare's official documentation](https://developers.cloudflare.com/workers/ci-cd/builds/), we should use **Cloudflare's Git integration** instead of GitHub Actions.

## 🔧 Required Setup Steps

### Step 1: Connect Repository via Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**
   - Navigate to [Cloudflare Workers](https://dash.cloudflare.com/)
   - Click on **Workers & Pages**

2. **Create/Connect Worker**
   - Click **Create application**
   - Choose **Workers** tab
   - Select **Connect to Git**
   - Choose **GitHub** as your Git provider

3. **Repository Selection**
   - Select your repository: `aziwar/dr-islam-website`
   - Choose branch: `master`
   - Cloudflare will automatically detect the `wrangler.toml` configuration

### Step 2: Configure Worker Settings

1. **Worker Name Configuration**
   - **CRITICAL**: The Worker name in Cloudflare dashboard must match the `name` in `wrangler.toml`
   - Our current config: `name = "dr-islam-website"`
   - Ensure dashboard worker is also named `"dr-islam-website"`

2. **Build Settings**
   - **Framework preset**: None (we have custom build)
   - **Build command**: `npm run build` (our existing build script)
   - **Output directory**: `.` (root directory)

3. **Environment Variables**
   - No additional environment variables needed for basic deployment
   - R2 bucket will work automatically if enabled in account

### Step 3: Configure Contact Form Worker

Repeat the process for the contact form worker:
1. **Create second Worker application**
2. **Connect same repository**: `aziwar/dr-islam-website`
3. **Set custom build command**: `npm run build`
4. **Set custom wrangler config**: Use `wrangler-contact.toml`
5. **Worker name**: Must match `"dr-islam-contact-form"` from `wrangler-contact.toml`

### Step 4: Custom Domain Configuration

1. **Add Custom Domain**
   - In each Worker settings
   - Add routes for `dr-elsagher.com/*` and `www.dr-elsagher.com/*`
   - Contact form: `dr-elsagher.com/api/contact`

2. **DNS Configuration**
   - Ensure `dr-elsagher.com` is managed by Cloudflare
   - DNS records will be handled automatically

## ✅ Benefits of Cloudflare Builds

- **Automatic Deployment**: Pushes to `master` trigger builds automatically
- **No GitHub Secrets**: Authentication handled by Cloudflare
- **Better Integration**: Direct access to Cloudflare services
- **Build History**: View build logs and history in dashboard
- **Preview URLs**: Test deployments before going live

## 🔧 Current Repository Configuration

Our repository is already properly configured:

- ✅ `wrangler.toml` - Main worker configuration
- ✅ `wrangler-contact.toml` - Contact form worker configuration  
- ✅ `package.json` - Build scripts for `npm run build`
- ✅ Source code in `src/` directory
- ✅ Custom domain routing configured

## 🚨 Migration from GitHub Actions

Once Cloudflare Builds is set up:

1. **Disable GitHub Actions**
   - The existing `.github/workflows/deploy.yml` can be disabled
   - Cloudflare will handle deployments automatically

2. **Remove API Token Requirements**
   - No need for `CLOUDFLARE_API_TOKEN` secrets
   - Authentication handled by dashboard connection

3. **Monitor Builds**
   - Check build status in Cloudflare Workers dashboard
   - View build logs for troubleshooting

## 🔄 Expected Workflow

1. **Developer pushes to `master` branch**
2. **Cloudflare detects the push**
3. **Runs `npm run build` automatically**
4. **Deploys both workers with proper routing**
5. **Site is live at `https://dr-elsagher.com`**

## 📋 Next Steps

1. Set up Cloudflare Git integration through dashboard
2. Configure both workers with proper names and settings
3. Test deployment with a small change
4. Disable GitHub Actions workflows once confirmed working

This approach aligns with Cloudflare's recommended best practices and should resolve all deployment issues.

---

**Source**: [Cloudflare Workers CI/CD Builds Documentation](https://developers.cloudflare.com/workers/ci-cd/builds/)  
**Last Updated**: August 1, 2025