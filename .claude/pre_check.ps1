# Pre-Implementation Checklist
# Run BEFORE any task

param([string]$TaskName, [string]$RequiredTool)

$checks = @{
    TaskName = $TaskName
    Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    ToolCheck = $null
    TestRun = $null
    Alternative = $null
}

# 1. Tool exists?
$tool = Get-Command $RequiredTool -ErrorAction SilentlyContinue
$checks.ToolCheck = if ($tool) { "PASS: $($tool.Source)" } else { "FAIL: Not found" }

# 2. Alternative if failed
if (!$tool) {
    $checks.Alternative = switch ($RequiredTool) {
        "claude-code" { "Use manual CSS/JS editing" }
        "unknown-tool" { "Find working alternative" }
        default { "Research alternatives" }
    }
}

# 3. Output decision
$checks | ConvertTo-Json
if (!$tool) {
    Write-Host "STOP: Tool not available. Alternative: $($checks.Alternative)" -ForegroundColor Red
    exit 1
}