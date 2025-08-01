# Cloudflare Workers & Pages Deployment Guide

This project uses **Cloudflare Workers and Pages CI/CD Builds** for automatic deployment as described in the [official documentation](https://developers.cloudflare.com/workers/ci-cd/builds/).

## 🚀 Deployment Method

**Cloudflare GitHub App Integration** - Automatic deployment when you push to your repository.

❌ **No GitHub Actions workflows**  
❌ **No API tokens required**  
❌ **No manual wrangler commands**  
✅ **Automatic deployment on push**  
✅ **Dashboard-based configuration**  
✅ **Integrated build logs**  

## 📋 Setup Instructions

### Step 1: Connect Repository to Cloudflare

1. **Go to Cloudflare Dashboard**
   - Navigate to [Workers & Pages](https://dash.cloudflare.com/)
   - Click **"Create application"**

2. **Connect to Git Repository**
   - Select **"Pages"** tab
   - Click **"Connect to Git"**
   - Choose **GitHub** as your Git provider
   - Select repository: `aziwar/dr-islam-website`
   - Choose branch: `master`

### Step 2: Configure Build Settings

**Framework preset**: None  
**Build command**: `npm run build`  
**Build output directory**: `.` (root)  
**Root directory**: `/` (leave empty)

### Step 3: Configure Workers

After connecting the repository, you need to set up both workers:

#### Main Website Worker
- **Worker name**: `dr-islam-website` (must match `wrangler.toml`)
- **Script path**: `src/index.js` 
- **Custom domains**: 
  - `dr-elsagher.com`  
  - `www.dr-elsagher.com`

#### Contact Form Worker  
- **Worker name**: `dr-islam-contact-form` (must match `wrangler-contact.toml`)
- **Script path**: `workers/contact-form-handler.js`
- **Custom routes**:
  - `dr-elsagher.com/api/contact`
  - `www.dr-elsagher.com/api/contact`

### Step 4: Environment Variables (Optional)

If needed, you can set environment variables in the Cloudflare dashboard:
- **NODE_ENV**: `production`
- **CLINIC_EMAIL**: `dr.islam_elsagher@gmail.com`

## 📁 Project Structure

The repository is properly configured for Cloudflare Builds:

```
dr-islam-website/
├── src/
│   ├── index.js              # Main worker entry point
│   ├── content/              # Website content (HTML, CSS, JS)
│   └── utils/                # Utility modules
├── workers/
│   └── contact-form-handler.js # Contact form worker
├── wrangler.toml             # Main worker configuration
├── wrangler-contact.toml     # Contact form worker configuration
├── package.json              # Dependencies and build scripts
└── README.md
```

## ⚙️ Configuration Files

### Main Worker (`wrangler.toml`)
```toml
name = "dr-islam-website"
main = "src/index.js"
compatibility_date = "2024-01-01"

# R2 bucket binding for image storage
[[r2_buckets]]
binding = "IMAGES"
bucket_name = "dr-islam-images"

# Custom domain routes
[[routes]]
pattern = "dr-elsagher.com/*"
zone_name = "dr-elsagher.com"

[[routes]]
pattern = "www.dr-elsagher.com/*"
zone_name = "dr-elsagher.com"
```

### Contact Form Worker (`wrangler-contact.toml`)
```toml
name = "dr-islam-contact-form"
main = "workers/contact-form-handler.js"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[vars]
NODE_ENV = "production"
CLINIC_EMAIL = "dr.islam_elsagher@gmail.com"
FROM_EMAIL = "noreply@dr-elsagher.com"

# Custom domain routing
[[routes]]
pattern = "dr-elsagher.com/api/contact"
zone_name = "dr-elsagher.com"

[[routes]]
pattern = "www.dr-elsagher.com/api/contact"
zone_name = "dr-elsagher.com"
```

## 🔄 Deployment Workflow

1. **Developer pushes code** to `master` branch
2. **Cloudflare detects the push** via GitHub App
3. **Build process runs**:
   - `npm clean-install` (install dependencies)
   - `npm run build` (remove console.logs)
   - `wrangler deploy` (deploy workers)
4. **Workers are deployed** with proper routing
5. **Site is live** at `https://dr-elsagher.com`

## 📊 Monitoring & Logs

### Build Logs
- **Location**: Cloudflare Workers & Pages dashboard  
- **Access**: Project → Deployments → View build logs
- **Information**: Build output, deployment status, error messages

### Worker Logs  
- **Location**: Cloudflare Workers dashboard
- **Access**: Workers → Select worker → Logs
- **Information**: Runtime logs, requests, errors

### Analytics
- **Performance**: Workers dashboard → Analytics
- **Traffic**: Pages dashboard → Analytics  
- **Custom domains**: DNS dashboard → Analytics

## 🛠️ Build Scripts

The repository includes optimized build scripts:

### `package.json` Scripts
```json
{
  "scripts": {
    "prebuild": "echo 'Preparing build...'",
    "build": "node scripts/build.js",
    "postbuild": "echo 'Build completed!'",
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "node tests/unit/test-runner.js",
    "test:integration": "node tests/integration/test-runner.js"
  }
}
```

### Build Process (`scripts/build.js`)
- Removes all `console.log` statements from production code
- Optimizes JavaScript files for Workers runtime
- Generates build report with statistics
- Ensures clean, production-ready code

## 🔍 Troubleshooting

### Common Issues

**Build fails with "Worker name mismatch"**
- **Solution**: Ensure worker names in dashboard match `wrangler.toml` exactly

**Custom domain not working**  
- **Solution**: Verify `dr-elsagher.com` is active in your Cloudflare account

**Contact form not receiving emails**
- **Solution**: Configure email service (SendGrid/Resend) API keys in dashboard

**Build takes too long**
- **Solution**: Check build logs for specific bottlenecks

### Getting Help

1. **Build Logs**: Check Cloudflare dashboard for detailed error messages
2. **Worker Logs**: Monitor runtime issues in Workers dashboard  
3. **Community**: [Cloudflare Workers Discord](https://discord.gg/cloudflaredev)
4. **Documentation**: [Workers CI/CD Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)

## ✅ Success Indicators

When properly configured, you should see:
- ✅ **Successful builds** in Cloudflare dashboard
- ✅ **Website accessible** at `https://dr-elsagher.com`
- ✅ **Contact form working** at `https://dr-elsagher.com/api/contact`
- ✅ **Automatic deployments** on every push to `master`
- ✅ **Build history** visible in dashboard

---

**Deployment Method**: Cloudflare Workers & Pages CI/CD Builds  
**Documentation**: https://developers.cloudflare.com/workers/ci-cd/builds/  
**Last Updated**: August 1, 2025