# Comprehensive test for dr-islam-website updates
Write-Host "=== DR-ISLAM-WEBSITE UPDATE VERIFICATION ===" -ForegroundColor Green
Write-Host "Testing cache headers and performance monitoring" -ForegroundColor White
Write-Host "Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host ""

$baseUrl = "http://localhost:8787"
$allPassed = $true

# Test 1: Cache Headers
Write-Host "[TEST 1] CACHE HEADERS IMPLEMENTATION" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

$cacheTests = @(
    @{Name="HTML Page"; Url="$baseUrl/"; Expected="s-maxage=86400"},
    @{Name="CSS File"; Url="$baseUrl/styles.css"; Expected="s-maxage=3600"},
    @{Name="Robots.txt"; Url="$baseUrl/robots.txt"; Expected="s-maxage=86400"},
    @{Name="Sitemap"; Url="$baseUrl/sitemap.xml"; Expected="s-maxage=86400"},
    @{Name="Manifest"; Url="$baseUrl/manifest-en.json"; Expected="s-maxage=86400"}
)

foreach ($test in $cacheTests) {
    try {
        $response = Invoke-WebRequest -Uri $test.Url -UseBasicParsing -Method Head
        $cacheControl = $response.Headers['Cache-Control']
        
        if ($cacheControl -match $test.Expected) {
            Write-Host "[PASS] $($test.Name)" -ForegroundColor Green
            Write-Host "       Cache-Control: $cacheControl" -ForegroundColor Gray
        } else {
            Write-Host "[FAIL] $($test.Name)" -ForegroundColor Red
            Write-Host "       Expected: $($test.Expected)" -ForegroundColor Gray
            Write-Host "       Actual: $cacheControl" -ForegroundColor Gray
            $allPassed = $false
        }
    } catch {
        Write-Host "[ERROR] $($test.Name): $_" -ForegroundColor Red
        $allPassed = $false
    }
}

Write-Host ""
Write-Host "[TEST 2] PERFORMANCE MONITORING" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

# Test various endpoints to trigger monitoring
$perfTests = @("$baseUrl/", "$baseUrl/ar/", "$baseUrl/styles.css", "$baseUrl/robots.txt")

Write-Host "Making requests to trigger performance logs..." -ForegroundColor White
foreach ($url in $perfTests) {
    try {
        $null = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "[OK] Requested: $url" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Failed: $url" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "[TEST 3] CODE VERIFICATION" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

# Check if key functions exist in index.js
$indexContent = Get-Content "D:\Github-work\dr-islam-website\src\index.js" -Raw

if ($indexContent -match "getCacheHeaders") {
    Write-Host "[PASS] getCacheHeaders() function found" -ForegroundColor Green
} else {
    Write-Host "[FAIL] getCacheHeaders() function missing" -ForegroundColor Red
    $allPassed = $false
}

if ($indexContent -match "performance\.now\(\)") {
    Write-Host "[PASS] Performance timing code found" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Performance timing code missing" -ForegroundColor Red
    $allPassed = $false
}

if ($indexContent -match "console\.log.*operation") {
    Write-Host "[PASS] Performance logging code found" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Performance logging code missing" -ForegroundColor Red
    $allPassed = $false
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Gray
if ($allPassed) {
    Write-Host "RESULT: ALL TESTS PASSED" -ForegroundColor Green
    Write-Host ""
    Write-Host "Both implementations are working correctly:" -ForegroundColor White
    Write-Host "1. Cache headers with s-maxage are properly set" -ForegroundColor White
    Write-Host "2. Performance monitoring code is in place" -ForegroundColor White
    Write-Host ""
    Write-Host "Ready for deployment!" -ForegroundColor Green
} else {
    Write-Host "RESULT: SOME TESTS FAILED" -ForegroundColor Red
    Write-Host "Please check the errors above" -ForegroundColor Yellow
}