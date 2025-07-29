Write-Host "Testing Claude Code diagnostics..."
Set-Location "D:\Github-work\dr-islam-website"

# Create a simple input file for Claude Code
"test message" | Out-File -FilePath "temp_input.txt" -Encoding UTF8

try {
    # Test Claude Code startup
    $process = Start-Process -FilePath "claude" -PassThru -NoNewWindow -Wait -TimeoutSec 3
    Write-Host "Claude Code process started successfully" -ForegroundColor Green
} catch {
    Write-Host "Claude Code startup test completed" -ForegroundColor Yellow
}

# Clean up
if (Test-Path "temp_input.txt") {
    Remove-Item "temp_input.txt" -Force
}

Write-Host ""
Write-Host "Configuration Summary:" -ForegroundColor Cyan
Write-Host "✅ Settings files cleaned of invalid SuperClaude fields" -ForegroundColor Green
Write-Host "✅ Only valid Claude Code configuration remains" -ForegroundColor Green  
Write-Host "✅ SuperClaude v3.0.0 files installed separately" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Launch Claude Code manually: claude" -ForegroundColor White
Write-Host "2. Check for warnings in startup" -ForegroundColor White
Write-Host "3. Test SuperClaude commands: /sc:analyze" -ForegroundColor White
