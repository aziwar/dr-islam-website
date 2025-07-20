# PowerShell test script for performance monitoring
Write-Host "=== TESTING PERFORMANCE MONITORING ===" -ForegroundColor Green
Write-Host "Making requests to trigger console.log outputs..." -ForegroundColor Yellow
Write-Host ""

# Test HTML page
Write-Host "1. Testing HTML page" -ForegroundColor Cyan
$null = Invoke-WebRequest -Uri "http://localhost:8787/" -UseBasicParsing
Write-Host "   Done" -ForegroundColor Green

# Test Arabic page  
Write-Host "2. Testing Arabic page" -ForegroundColor Cyan
$null = Invoke-WebRequest -Uri "http://localhost:8787/ar/" -UseBasicParsing
Write-Host "   Done" -ForegroundColor Green

# Test CSS
Write-Host "3. Testing CSS" -ForegroundColor Cyan
$null = Invoke-WebRequest -Uri "http://localhost:8787/styles.css" -UseBasicParsing
Write-Host "   Done" -ForegroundColor Green

# Test robots
Write-Host "4. Testing robots.txt" -ForegroundColor Cyan
$null = Invoke-WebRequest -Uri "http://localhost:8787/robots.txt" -UseBasicParsing
Write-Host "   Done" -ForegroundColor Green

# Test image
Write-Host "5. Testing image (will show detailed metrics)" -ForegroundColor Cyan
try {
    $null = Invoke-WebRequest -Uri "http://localhost:8787/assets/images/logo-en.png" -UseBasicParsing
    Write-Host "   Done" -ForegroundColor Green
} catch {
    Write-Host "   Image not found (expected if no R2 locally)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== NOW CHECK DEV SERVER CONSOLE ===" -ForegroundColor Green
Write-Host "Performance logs should appear in the terminal running npm run dev" -ForegroundColor White