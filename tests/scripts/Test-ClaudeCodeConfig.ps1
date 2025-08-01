# Claude Code Configuration Test & Fix
Write-Host "Testing Claude Code Configuration..." -ForegroundColor Yellow
Write-Host ""

# Test Claude Code version and basic functionality
Write-Host "=== CLAUDE CODE STATUS ===" -ForegroundColor Cyan
try {
    $version = & claude --version 2>$null
    Write-Host "✅ Claude Code Version: $version" -ForegroundColor Green
} catch {
    Write-Host "❌ Claude Code executable not found" -ForegroundColor Red
}

# Check settings files
Write-Host ""
Write-Host "=== SETTINGS FILES ===" -ForegroundColor Cyan

$globalSettings = "C:\Users\zewar\.claude\settings.json"
$projectSettings = "D:\Github-work\dr-islam-website\.claude\settings.json"
$projectLocalSettings = "D:\Github-work\dr-islam-website\.claude\settings.local.json"

if (Test-Path $globalSettings) {
    Write-Host "✅ Global settings.json exists" -ForegroundColor Green
    $content = Get-Content $globalSettings -Raw | ConvertFrom-Json
    if ($content.PSObject.Properties.Name -contains "model") {
        Write-Host "  ✅ Valid format (model field found)" -ForegroundColor Green
    }
    if ($content.PSObject.Properties.Name -contains "superclaude" -or 
        $content.PSObject.Properties.Name -contains "components" -or 
        $content.PSObject.Properties.Name -contains "framework") {
        Write-Host "  ❌ Contains invalid SuperClaude fields" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Global settings.json missing" -ForegroundColor Red
}

if (Test-Path $projectSettings) {
    Write-Host "✅ Project settings.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ Project settings.json missing" -ForegroundColor Red
}

if (Test-Path $projectLocalSettings) {
    Write-Host "✅ Project settings.local.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ Project settings.local.json missing" -ForegroundColor Red
}

# Check SuperClaude installation
Write-Host ""
Write-Host "=== SUPERCLAUDE STATUS ===" -ForegroundColor Cyan

$claudeMd = "C:\Users\zewar\.claude\CLAUDE.md"
$commandsDir = "C:\Users\zewar\.claude\commands\sc"
$metadata = "C:\Users\zewar\.claude\.superclaude-metadata.json"

if (Test-Path $claudeMd) {
    Write-Host "✅ SuperClaude CLAUDE.md found" -ForegroundColor Green
} else {
    Write-Host "❌ SuperClaude CLAUDE.md missing" -ForegroundColor Red
}

if (Test-Path $commandsDir) {
    $commandCount = (Get-ChildItem "$commandsDir\*.md").Count
    Write-Host "✅ SuperClaude commands directory found ($commandCount commands)" -ForegroundColor Green
} else {
    Write-Host "❌ SuperClaude commands directory missing" -ForegroundColor Red
}

if (Test-Path $metadata) {
    Write-Host "✅ SuperClaude metadata found" -ForegroundColor Green
    $meta = Get-Content $metadata -Raw | ConvertFrom-Json
    Write-Host "  Version: $($meta.framework.version)" -ForegroundColor White
} else {
    Write-Host "❌ SuperClaude metadata missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== RECOMMENDATIONS ===" -ForegroundColor Yellow
Write-Host "1. Run: cd D:\Github-work\dr-islam-website && claude" -ForegroundColor White
Write-Host "2. Test SuperClaude with: /sc:analyze --help" -ForegroundColor White
Write-Host "3. If issues persist, run: claude /doctor" -ForegroundColor White
