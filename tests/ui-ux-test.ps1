# UI/UX Test Script for dr-islam-website
# Tests all critical functionality before deployment

Write-Host "Starting UI/UX Tests..." -ForegroundColor Cyan
$baseUrl = "http://127.0.0.1:8787"
$errors = @()

# Test 1: Homepage loads
Write-Host "`nTest 1: Homepage Load" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $baseUrl -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "[PASS] Homepage loads successfully" -ForegroundColor Green
    }
} catch {
    $errors += "Homepage failed to load: $_"
    Write-Host "[FAIL] Homepage load failed" -ForegroundColor Red
}

# Test 2: Language switching
Write-Host "`nTest 2: Language Versions" -ForegroundColor Yellow
$languages = @("/", "/ar/", "/en/")
foreach ($lang in $languages) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$lang" -UseBasicParsing
        Write-Host "[PASS] $lang loads successfully" -ForegroundColor Green
    } catch {
        $errors += "$lang failed: $_"
        Write-Host "[FAIL] $lang failed" -ForegroundColor Red
    }
}
# Test 3: CSS Loading
Write-Host "`nTest 3: CSS Loading" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/css/style.css?v=mobile-fix-2025-07-20-v2" -UseBasicParsing
    $size = $response.RawContentLength
    if ($response.StatusCode -eq 200 -and $size -gt 0) {
        Write-Host "[PASS] CSS loads successfully ($size bytes)" -ForegroundColor Green
    }
} catch {
    $errors += "CSS failed to load: $_"
    Write-Host "[FAIL] CSS load failed" -ForegroundColor Red
}

# Test 4: Service Worker
Write-Host "`nTest 4: Service Worker" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/sw.js" -UseBasicParsing
    Write-Host "[PASS] Service Worker loads successfully" -ForegroundColor Green
} catch {
    $errors += "Service Worker failed: $_"
    Write-Host "[FAIL] Service Worker failed" -ForegroundColor Red
}

# Test 5: PWA Manifests
Write-Host "`nTest 5: PWA Manifests" -ForegroundColor Yellow
$manifests = @("/manifest-ar.json", "/manifest-en.json")
foreach ($manifest in $manifests) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$manifest" -UseBasicParsing        $json = $response.Content | ConvertFrom-Json
        if ($json.name -and $json.icons) {
            Write-Host "[PASS] $manifest valid" -ForegroundColor Green
        }
    } catch {
        $errors += "$manifest failed: $_"
        Write-Host "[FAIL] $manifest failed" -ForegroundColor Red
    }
}

# Test 6: Cache Headers
Write-Host "`nTest 6: Cache Headers" -ForegroundColor Yellow
$endpoints = @("/", "/css/style.css?v=test", "/sw.js", "/manifest-en.json", "/offline.html")
foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl$endpoint" -Method Head -UseBasicParsing
        $cacheControl = $response.Headers["Cache-Control"]
        if ($cacheControl) {
            Write-Host "[PASS] $endpoint : $cacheControl" -ForegroundColor Green
        } else {
            Write-Host "[WARN] $endpoint : No cache headers" -ForegroundColor Yellow
        }
    } catch {
        $errors += "Cache test failed for $endpoint"
    }
}
# Test 7: Mobile Responsiveness
Write-Host "`nTest 7: Mobile Viewport Check" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $baseUrl -UseBasicParsing
    if ($response.Content -match 'viewport.*width=device-width') {
        Write-Host "[PASS] Mobile viewport meta tag present" -ForegroundColor Green
    } else {
        $errors += "Mobile viewport tag missing"
        Write-Host "[FAIL] Mobile viewport missing" -ForegroundColor Red
    }
} catch {
    $errors += "Mobile check failed: $_"
}

# Test 8: Critical Content
Write-Host "`nTest 8: Critical Content Check" -ForegroundColor Yellow
$criticalContent = @("WhatsApp", "+965 9729 4040")
try {
    $arResponse = Invoke-WebRequest -Uri "$baseUrl/ar/" -UseBasicParsing
    $enResponse = Invoke-WebRequest -Uri "$baseUrl/en/" -UseBasicParsing
    
    foreach ($content in $criticalContent) {
        if ($arResponse.Content -match [regex]::Escape($content) -or $enResponse.Content -match [regex]::Escape($content)) {
            Write-Host "[PASS] Found: $content" -ForegroundColor Green
        } else {
            $errors += "Missing critical content: $content"
            Write-Host "[FAIL] Missing: $content" -ForegroundColor Red
        }
    }
} catch {    $errors += "Content check failed: $_"
}

# Summary
Write-Host "`n" -NoNewline
Write-Host ("=" * 50) -ForegroundColor Cyan
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Cyan

if ($errors.Count -eq 0) {
    Write-Host "`n[SUCCESS] ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host "Website is ready for deployment." -ForegroundColor Green
} else {
    Write-Host "`n[FAILURE] TESTS FAILED: $($errors.Count) errors found" -ForegroundColor Red
    Write-Host "`nErrors:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host "`n[WARNING] DO NOT DEPLOY until all issues are fixed!" -ForegroundColor Yellow
}

Write-Host "`nTest completed at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "Test location: http://127.0.0.1:8787" -ForegroundColor Gray