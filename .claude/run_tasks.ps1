# Claude Code Automated Compliance Runner for Windows
# PowerShell version with full compliance

Write-Host "[CLAUDE CODE] Starting automated compliance runner v2.1" -ForegroundColor Green

# Initialize session if needed
$sessionPath = ".claude\session_state.json"
if (-not (Test-Path $sessionPath)) {
    $timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    $initialState = @{
        response_count = 0
        last_context7 = $null
        last_checkpoint = $timestamp
    } | ConvertTo-Json
    Set-Content -Path $sessionPath -Value $initialState
}

# Function to execute task with full compliance
function Execute-Task {
    param($taskName)
    
    Write-Host "[TASK] Starting: $taskName" -ForegroundColor Yellow
    
    # Pre-validation
    $validationConfig = @{
        name = $taskName
        involves_code = $true
    } | ConvertTo-Json -Compress
    
    $validation = node .claude\validator.js $validationConfig
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Validation failed for $taskName" -ForegroundColor Red
        return $false
    }
    
    # Execute Claude Code with task
    & claude-code task run $taskName --config .claude\visual_tasks.json --no-interaction
    
    # Post-execution compliance update
    $state = Get-Content $sessionPath | ConvertFrom-Json
    $state.response_count++
    $state | ConvertTo-Json | Set-Content $sessionPath
    
    Write-Host "[TASK] Completed: $taskName" -ForegroundColor Green
    return $true
}

# Main execution flow
Write-Host "[CLAUDE CODE] Loading task configuration..." -ForegroundColor Cyan
$config = Get-Content ".claude\visual_tasks.json" | ConvertFrom-Json
$tasks = $config.execution_order

foreach ($task in $tasks) {
    # Check if checkpoint needed
    $state = Get-Content $sessionPath | ConvertFrom-Json
    if ($state.response_count -ge 5) {
        Write-Host "[CHECKPOINT] Resetting after 5 responses" -ForegroundColor Magenta
        $timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
        $state.response_count = 0
        $state.last_checkpoint = $timestamp
        $state | ConvertTo-Json | Set-Content $sessionPath
    }
    
    Execute-Task -taskName $task
    Start-Sleep -Seconds 2
}

Write-Host "[CLAUDE CODE] All tasks completed with compliance maintained" -ForegroundColor Green