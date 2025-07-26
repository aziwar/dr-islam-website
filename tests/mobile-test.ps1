# Mobile UI/UX Automated Test - Single File Solution
$url = "http://127.0.0.1:8787"
$mobile_ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
$pass = 0
$fail = 0

Write-Host "Mobile UI/UX Test Starting..." -ForegroundColor Cyan

# Get mobile version with mobile user agent
$response = Invoke-WebRequest -Uri $url -UserAgent $mobile_ua -UseBasicParsing
$html = $response.Content

# Test 1: Viewport meta tag
if ($html -match '<meta name="viewport".*width=device-width') {
    Write-Host "[PASS] Mobile viewport configured" -ForegroundColor Green
    $pass++
} else {
    Write-Host "[FAIL] No mobile viewport" -ForegroundColor Red
    $fail++
}

# Test 2: Critical mobile elements exist
$mobileChecks = @{
    "WhatsApp button" = "wa\.me|whatsapp"
    "Phone number" = "98563711|9856\s*3711"
    "Mobile menu" = "menu-toggle|hamburger|mobile-menu"
    "Touch-friendly buttons" = "btn|button.*padding|touch"
}

foreach ($check in $mobileChecks.GetEnumerator()) {    if ($html -match $check.Value) {
        Write-Host "[PASS] $($check.Key) found" -ForegroundColor Green
        $pass++
    } else {
        Write-Host "[FAIL] $($check.Key) missing" -ForegroundColor Red
        $fail++
    }
}

# Test 3: Mobile CSS media queries
$css_response = Invoke-WebRequest -Uri "$url/css/style.css?v=test" -UseBasicParsing
$css = $css_response.Content
if ($css -match "@media.*max-width:\s*(768|640|480|375)px") {
    Write-Host "[PASS] Mobile breakpoints detected" -ForegroundColor Green
    $pass++
} else {
    Write-Host "[FAIL] No mobile CSS breakpoints" -ForegroundColor Red
    $fail++
}

# Test 4: Image responsiveness
if ($html -match 'img.*srcset|picture.*source') {
    Write-Host "[PASS] Responsive images configured" -ForegroundColor Green
    $pass++
} else {
    Write-Host "[WARN] No responsive images detected" -ForegroundColor Yellow
}

# Test 5: Arabic mobile version
$ar_response = Invoke-WebRequest -Uri "$url/ar/" -UserAgent $mobile_ua -UseBasicParsing
if ($ar_response.Content -match 'dir="rtl"' -and $ar_response.Content -match "98563711") {
    Write-Host "[PASS] Arabic mobile version works" -ForegroundColor Green
    $pass++
} else {
    Write-Host "[FAIL] Arabic mobile issues" -ForegroundColor Red  
    $fail++
}

# Final verdict
Write-Host "`n===== MOBILE TEST RESULTS =====" -ForegroundColor Cyan
Write-Host "Passed: $pass | Failed: $fail" -ForegroundColor $(if($fail -eq 0){"Green"}else{"Red"})
if ($fail -eq 0) {
    Write-Host "`nMOBILE UI/UX: READY FOR DEPLOYMENT" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`nMOBILE UI/UX: NEEDS FIXES" -ForegroundColor Red
    exit 1
}