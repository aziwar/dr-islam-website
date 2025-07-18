# Dr-Islam-Website Quick Commands

Write-Host "🚀 Dr-Islam-Website Development Helper" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host "`nAvailable Commands:" -ForegroundColor Yellow
Write-Host "1. Start Development (npm run dev)"
Write-Host "2. Test Mobile Views (npm run test:mobile)"
Write-Host "3. Fix CSS Issues (npm run lint:css)"
Write-Host "4. Deploy to Staging (npm run deploy:staging)"
Write-Host "5. Deploy to Production (npm run deploy:prod)"
Write-Host "6. Deploy Monitor (npm run monitor)"
Write-Host "7. Check Git Status"
Write-Host "8. Exit"

do {
    $choice = Read-Host "`nSelect option (1-8)"
    
    switch ($choice) {
        '1' { npm run dev }
        '2' { npm run test:mobile }
        '3' { npm run lint:css }
        '4' { npm run deploy:staging }
        '5' { npm run deploy:prod }
        '6' { npm run monitor }
        '7' { git status }
        '8' { exit }
        default { Write-Host "Invalid option" -ForegroundColor Red }
    }
} while ($choice -ne '8')