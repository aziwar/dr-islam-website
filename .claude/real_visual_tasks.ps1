# REAL Visual Tasks - Using Available Tools Only

Write-Host "=== VISUAL UPGRADES WITH REAL TOOLS ===" -ForegroundColor Green

# Task 1: Hero Gradient
Write-Host "`nTask 1: Adding gradient animation" -ForegroundColor Yellow
$css = Get-Content "css\style.css" -Raw
$gradient = @"
`n/* Animated gradient */
.hero {
    background: linear-gradient(-45deg, #BEB093, #777669, #8B7F6B, #9A8E77);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
"@
$css += $gradient
Set-Content "css\style.css" $css
Write-Host "[DONE] Gradient added" -ForegroundColor Green

# Task 2: Glass Cards  
Write-Host "`nTask 2: Glassmorphism cards" -ForegroundColor Yellow
Add-Content "css\style.css" @"
`n/* Glassmorphism */
.service-card {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}
"@
Write-Host "[DONE] Glass effect added" -ForegroundColor Green

# Task 3: Typography
Write-Host "`nTask 3: Adding Poppins font" -ForegroundColor Yellow
$html = Get-Content "index-en.html" -Raw
$fontLink = '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
if ($html -notmatch "Poppins") {
    $html = $html -replace '</head>', "$fontLink`n</head>"
    Set-Content "index-en.html" $html
}
Write-Host "[DONE] Font added" -ForegroundColor Green

Write-Host "`n=== ALL TASKS COMPLETE ===" -ForegroundColor Green