param([string]$Command = ".\.claude\run_tasks.ps1")

Write-Host ""
Write-Host "=== Claude Code Safe Launcher ===" -ForegroundColor Cyan

# Check conflicts
$ports = netstat -an | Select-String ":8080|:8081|:8082"
if ($ports) {
    Write-Host "Warning: Ports in use" -ForegroundColor Yellow
}

# Create config if needed
if (-not (Test-Path ".claude\config.json")) {
    $config = @{
        preview_port = 8080
        api_port = 8081
        websocket_port = 8082
        isolation_mode = $true
    }
    $config | ConvertTo-Json | Set-Content ".claude\config.json"
}

# Execute
Write-Host "Executing: $Command" -ForegroundColor Green
& $Command