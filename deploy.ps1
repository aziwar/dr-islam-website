# Pre-deployment validation script for Windows PowerShell

Write-Host "🔍 Running pre-deployment checks..." -ForegroundColor Cyan

# 1. Check if in correct directory
if (!(Test-Path "wrangler.toml")) {
    Write-Host "❌ Not in dr-islam-website directory!" -ForegroundColor Red
    exit 1
}

# 2. Build hash for cache busting
$BUILD_HASH = git rev-parse --short HEAD
Write-Host "Build version: $BUILD_HASH" -ForegroundColor Green

# Create build version file
"export const BUILD_VERSION = '$BUILD_HASH';" | Out-File -FilePath "src\build-version.js" -Encoding utf8

# 3. Test Worker locally
Write-Host "Starting local Worker test..." -ForegroundColor Yellow
$worker = Start-Process -FilePath "wrangler" -ArgumentList "dev", "--local", "--port", "8787" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 5

# 4. Run mobile tests
Write-Host "Running mobile breakpoint tests..." -ForegroundColor Yellow
node tests\mobile-test.js

# 5. Kill test worker
Stop-Process -Id $worker.Id -Force

# 6. Check current deployment
Write-Host "`nCurrent deployment status:" -ForegroundColor Cyan
wrangler deployments list

# 7. Deployment decision
$response = Read-Host "Deploy to production? (y/n)"
if ($response -eq 'y') {
    Write-Host "Deploying to production..." -ForegroundColor Green
    wrangler deploy --env production
    Write-Host "✅ Deployed with version: $BUILD_HASH" -ForegroundColor Green
    
    # Clear CDN cache
    Write-Host "Clearing CDN cache..." -ForegroundColor Yellow
    # Add your CDN purge command here
} else {
    Write-Host "❌ Deployment cancelled" -ForegroundColor Red
}