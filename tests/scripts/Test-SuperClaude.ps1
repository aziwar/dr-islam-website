# SuperClaude Configuration Test Script
Write-Host "Testing SuperClaude Configuration..." -ForegroundColor Yellow

# Check if Claude Code directory exists
if (Test-Path "C:\Users\zewar\.claude") {
    Write-Host "✅ Claude Code directory found" -ForegroundColor Green
} else {
    Write-Host "❌ Claude Code directory not found" -ForegroundColor Red
    exit 1
}

# Check SuperClaude installation
if (Test-Path "C:\Users\zewar\.claude\CLAUDE.md") {
    Write-Host "✅ SuperClaude core files found" -ForegroundColor Green
} else {
    Write-Host "❌ SuperClaude core files missing" -ForegroundColor Red
    exit 1
}

# Check commands directory
if (Test-Path "C:\Users\zewar\.claude\commands\sc") {
    Write-Host "✅ SuperClaude commands directory found" -ForegroundColor Green
    Write-Host "Commands available:" -ForegroundColor Cyan
    Get-ChildItem "C:\Users\zewar\.claude\commands\sc\*.md" | ForEach-Object {
        $cmdName = $_.BaseName
        Write-Host "  /sc:$cmdName" -ForegroundColor White
    }
} else {
    Write-Host "❌ SuperClaude commands directory missing" -ForegroundColor Red
    exit 1
}

# Check metadata
if (Test-Path "C:\Users\zewar\.claude\.superclaude-metadata.json") {
    Write-Host "✅ SuperClaude metadata found" -ForegroundColor Green
    $metadata = Get-Content "C:\Users\zewar\.claude\.superclaude-metadata.json" | ConvertFrom-Json
    Write-Host "Version: $($metadata.framework.version)" -ForegroundColor Cyan
} else {
    Write-Host "❌ SuperClaude metadata missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "SuperClaude installation appears to be complete!" -ForegroundColor Green
Write-Host "Try using commands like: /sc:analyze, /sc:build, /sc:troubleshoot" -ForegroundColor Yellow

# Test Claude Code executable
Write-Host ""
Write-Host "Testing Claude Code executable..." -ForegroundColor Yellow
try {
    $claudeVersion = & "C:\Users\zewar\AppData\Roaming\npm\claude.cmd" --version
    Write-Host "✅ Claude Code version: $claudeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Claude Code executable test failed" -ForegroundColor Red
}
