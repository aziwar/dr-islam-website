# Brand Identity Implementation Script

Write-Host "1. Copying brand logos..." -ForegroundColor Green
Copy-Item "identity logo Dr.islam\logo\logo-dr-islam-brown1.jpg" -Destination "assets\images\logo-main-brand.jpg" -Force
Copy-Item "identity logo Dr.islam\icon\icon-dr-islam-png.png" -Destination "assets\images\logo-icon.png" -Force
Copy-Item "identity logo Dr.islam\logo SM\identity-logo-Dr.islam-logo.jpg" -Destination "assets\images\logo-social.jpg" -Force

Write-Host "2. Copying before/after images..." -ForegroundColor Green
Copy-Item "identity logo Dr.islam\Frames and post\p1.png" -Destination "assets\before-after\real-case1.png" -Force
Copy-Item "identity logo Dr.islam\Frames and post\p2.png" -Destination "assets\before-after\real-case2.png" -Force
Copy-Item "identity logo Dr.islam\Frames and post\p3.png" -Destination "assets\before-after\real-case3.png" -Force
Copy-Item "identity logo Dr.islam\Frames and post\b-and-a.png" -Destination "assets\before-after\showcase.png" -Force

Write-Host "3. Uploading to R2..." -ForegroundColor Green
npx wrangler r2 object put dr-islam-images/assets/images/logo-main-brand.jpg --file assets/images/logo-main-brand.jpg
npx wrangler r2 object put dr-islam-images/assets/images/logo-icon.png --file assets/images/logo-icon.png
npx wrangler r2 object put dr-islam-images/assets/before-after/real-case1.png --file assets/before-after/real-case1.png
npx wrangler r2 object put dr-islam-images/assets/before-after/real-case2.png --file assets/before-after/real-case2.png
npx wrangler r2 object put dr-islam-images/assets/before-after/real-case3.png --file assets/before-after/real-case3.png

Write-Host "4. Brand assets ready!" -ForegroundColor Green