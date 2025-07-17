$files = @(
    "assets/before-after/case2-after.jpg",
    "assets/before-after/case3-before.jpg",
    "assets/before-after/case3-after.jpg",
    "assets/images/logo-mobile.png",
    "assets/images/logo-white.png",
    "assets/images/logo-dark.png"
)

foreach ($file in $files) {
    Write-Host "Uploading $file..." -ForegroundColor Yellow
    npx wrangler r2 object put "dr-islam-images/$file" --file $file
}

Write-Host "All uploads complete!" -ForegroundColor Green