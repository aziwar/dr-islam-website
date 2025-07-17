# Upload favicon and logo files to R2

Write-Host "Uploading favicon files..." -ForegroundColor Green
npx wrangler r2 object put dr-islam-images/favicon.ico --file favicon.ico
npx wrangler r2 object put dr-islam-images/assets/images/favicon-16x16.png --file assets/images/favicon-16x16.png
npx wrangler r2 object put dr-islam-images/assets/images/favicon-32x32.png --file assets/images/favicon-32x32.png
npx wrangler r2 object put dr-islam-images/assets/images/favicon-48x48.png --file assets/images/favicon-48x48.png
npx wrangler r2 object put dr-islam-images/assets/images/favicon-64x64.png --file assets/images/favicon-64x64.png
npx wrangler r2 object put dr-islam-images/assets/images/favicon-128x128.png --file assets/images/favicon-128x128.png
npx wrangler r2 object put dr-islam-images/assets/images/favicon-256x256.png --file assets/images/favicon-256x256.png
npx wrangler r2 object put dr-islam-images/assets/images/apple-touch-icon.png --file assets/images/apple-touch-icon.png

Write-Host "Uploading icon-style logo files..." -ForegroundColor Green
npx wrangler r2 object put dr-islam-images/assets/images/logo-main.png --file assets/images/logo-main.png
npx wrangler r2 object put dr-islam-images/assets/images/logo-mobile.png --file assets/images/logo-mobile.png
npx wrangler r2 object put dr-islam-images/assets/images/logo-white.png --file assets/images/logo-white.png
npx wrangler r2 object put dr-islam-images/assets/images/logo-icon.png --file assets/images/logo-icon.png

Write-Host "All favicon and logo files uploaded to R2!" -ForegroundColor Green
