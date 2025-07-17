$logos = @(
    "logo-main.png",
    "logo-mobile.png", 
    "logo-favicon.png",
    "logo-icon.png",
    "logo-white.png",
    "logo-clear.png",
    "logo-main.webp"
)

cd D:\Github-work\dr-islam-website

foreach ($logo in $logos) {
    Write-Host "Uploading $logo..." -ForegroundColor Cyan
    npx wrangler r2 object put "dr-islam-images/assets/images/$logo" --file "assets/images/$logo"
}

Write-Host "`nAll logos uploaded to R2!" -ForegroundColor Green