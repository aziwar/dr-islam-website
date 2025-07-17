# Upload images to R2 using wrangler r2 commands

Write-Host "Uploading logo images..." -ForegroundColor Green
wrangler r2 object put dr-islam-images/assets/images/logo-main.png --file assets/images/logo-main.png
wrangler r2 object put dr-islam-images/assets/images/logo-mobile.png --file assets/images/logo-mobile.png
wrangler r2 object put dr-islam-images/assets/images/logo-white.png --file assets/images/logo-white.png
wrangler r2 object put dr-islam-images/assets/images/logo-dark.png --file assets/images/logo-dark.png

Write-Host "Uploading gallery images..." -ForegroundColor Green
wrangler r2 object put dr-islam-images/assets/before-after/case1-before.jpg --file assets/before-after/case1-before.jpg
wrangler r2 object put dr-islam-images/assets/before-after/case1-after.jpg --file assets/before-after/case1-after.jpg
wrangler r2 object put dr-islam-images/assets/before-after/case2-before.jpg --file assets/before-after/case2-before.jpg
wrangler r2 object put dr-islam-images/assets/before-after/case2-after.jpg --file assets/before-after/case2-after.jpg
wrangler r2 object put dr-islam-images/assets/before-after/case3-before.jpg --file assets/before-after/case3-before.jpg
wrangler r2 object put dr-islam-images/assets/before-after/case3-after.jpg --file assets/before-after/case3-after.jpg

Write-Host "All images uploaded to R2!" -ForegroundColor Green