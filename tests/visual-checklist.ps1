# Visual UI/UX Test Report
Write-Host "`nPreparing Visual UI/UX Test..." -ForegroundColor Cyan
Write-Host "This will open the website in your browser for manual inspection." -ForegroundColor Yellow

# Ensure dev server is running
Write-Host "`nDev server should be running at: http://127.0.0.1:8787" -ForegroundColor Green

# Test checklist
Write-Host "`n" + ("="*60) -ForegroundColor Cyan
Write-Host "VISUAL UI/UX CHECKLIST" -ForegroundColor Cyan
Write-Host ("="*60) -ForegroundColor Cyan

Write-Host "`nDesktop View:" -ForegroundColor Yellow
Write-Host "[ ] Logo displays correctly"
Write-Host "[ ] Navigation menu works"
Write-Host "[ ] Hero section loads with proper background"
Write-Host "[ ] Service cards display in grid"
Write-Host "[ ] Contact information visible"
Write-Host "[ ] WhatsApp button functional"
Write-Host "[ ] Language switcher works (AR/EN)"
Write-Host "[ ] Footer displays correctly"

Write-Host "`nMobile View (resize to 375px width):" -ForegroundColor Yellow
Write-Host "[ ] Mobile menu hamburger appears"
Write-Host "[ ] Touch targets are 48x48px minimum"
Write-Host "[ ] Content readable without horizontal scroll"
Write-Host "[ ] WhatsApp button remains accessible"
Write-Host "[ ] Cards stack vertically"
Write-Host "[ ] Images scale properly"