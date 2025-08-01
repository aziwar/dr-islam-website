# PowerShell test script for cache headers
Write-Host "=== TESTING CACHE HEADERS ===" -ForegroundColor Green
Write-Host ""

# Test HTML page
Write-Host "1. Testing HTML page (/):" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:8787/" -UseBasicParsing -Method Head
Write-Host "   Cache-Control: $($response.Headers['Cache-Control'])" -ForegroundColor Cyan
Write-Host ""

# Test Arabic page
Write-Host "2. Testing Arabic page (/ar/):" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:8787/ar/" -UseBasicParsing -Method Head
Write-Host "   Cache-Control: $($response.Headers['Cache-Control'])" -ForegroundColor Cyan
Write-Host ""

# Test CSS
Write-Host "3. Testing CSS (/styles.css):" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:8787/styles.css" -UseBasicParsing -Method Head
Write-Host "   Cache-Control: $($response.Headers['Cache-Control'])" -ForegroundColor Cyan
Write-Host ""

# Test robots.txt
Write-Host "4. Testing robots.txt:" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:8787/robots.txt" -UseBasicParsing -Method Head
Write-Host "   Cache-Control: $($response.Headers['Cache-Control'])" -ForegroundColor Cyan
Write-Host ""

# Test sitemap
Write-Host "5. Testing sitemap.xml:" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:8787/sitemap.xml" -UseBasicParsing -Method Head
Write-Host "   Cache-Control: $($response.Headers['Cache-Control'])" -ForegroundColor Cyan
Write-Host ""

# Test manifest
Write-Host "6. Testing manifest-en.json:" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri "http://localhost:8787/manifest-en.json" -UseBasicParsing -Method Head
Write-Host "   Cache-Control: $($response.Headers['Cache-Control'])" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== EXPECTED RESULTS ===" -ForegroundColor Green
Write-Host "All responses should include s-maxage directive" -ForegroundColor White
Write-Host "- HTML: s-maxage=86400"
Write-Host "- CSS: s-maxage=3600"
Write-Host "- Others: s-maxage=86400"