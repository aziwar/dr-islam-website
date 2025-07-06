# Tool Verification System
# Real impact, not claims

function Test-ToolAvailability {
    param([string]$ToolName)
    
    $results = @{
        Tool = $ToolName
        Exists = $false
        Path = $null
        Version = $null
        PublicAccess = $null
    }
    
    # Check existence
    $cmd = Get-Command $ToolName -ErrorAction SilentlyContinue
    if ($cmd) {
        $results.Exists = $true
        $results.Path = $cmd.Source
        try {
            $results.Version = & $ToolName --version 2>&1
        } catch {}
    }
    
    return $results | ConvertTo-Json
}

# Test critical tools NOW
Write-Host "=== TOOL VERIFICATION ===" -ForegroundColor Cyan
@("claude-code", "git", "node", "npm", "code") | ForEach-Object {
    Test-ToolAvailability $_
}