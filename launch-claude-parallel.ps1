# Multi-Terminal Claude Code Launcher
# Usage: .\launch-claude-parallel.ps1

$projectPath = "D:\Github-work\dr-islam-website"

Write-Host "🚀 Launching 4 Claude Code sessions for parallel execution..." -ForegroundColor Green

# Terminal 1: Frontend Development
Write-Host "📱 Terminal 1: Frontend (Mobile) Development" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $projectPath; Write-Host 'TERMINAL 1: Frontend Development' -ForegroundColor Yellow; Write-Host 'Focus: HTML, CSS, JavaScript, Mobile' -ForegroundColor Gray; npx @anthropic-ai/claude-code"

# Terminal 2: Backend/Config Tasks
Write-Host "⚙️ Terminal 2: Backend (Workers) Development" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $projectPath; Write-Host 'TERMINAL 2: Backend Development' -ForegroundColor Yellow; Write-Host 'Focus: Cloudflare Workers, API, Config' -ForegroundColor Gray; npx @anthropic-ai/claude-code"

# Terminal 3: Python/GPU Processing
Write-Host "🔥 Terminal 3: Python/GPU Development" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $projectPath; Write-Host 'TERMINAL 3: Python/GPU Development' -ForegroundColor Yellow; Write-Host 'Focus: GPU processing, Python scripts' -ForegroundColor Gray; npx @anthropic-ai/claude-code"

# Terminal 4: Testing/Documentation
Write-Host "📚 Terminal 4: Testing/Documentation" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $projectPath; Write-Host 'TERMINAL 4: Testing/Documentation' -ForegroundColor Yellow; Write-Host 'Focus: Tests, Documentation, Assets' -ForegroundColor Gray; npx @anthropic-ai/claude-code"

Write-Host "✅ All terminals launched successfully!" -ForegroundColor Green
Write-Host "💡 Each terminal is focused on a specific domain for optimal parallel execution." -ForegroundColor White
Write-Host "📋 Check QUICK_START_PARALLEL.md for suggested commands for each terminal." -ForegroundColor White
