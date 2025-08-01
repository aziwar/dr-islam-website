# Remove Console Logs from Production
# Preserves console.logs in test files and specific directories

$projectPath = "D:\Github-work\dr-islam-website"
$testPatterns = @("*test*.js", "*Test*.js", "tests\*", "playwright*", "deployment-verification.js", "performance-test.js")
$productionFiles = @()

Write-Host "Scanning for production JavaScript files..." -ForegroundColor Yellow

# Get all JS files except test files
Get-ChildItem -Path $projectPath -Filter "*.js" -Recurse -Force | ForEach-Object {
    $isTestFile = $false
    $relativePath = $_.FullName.Replace("$projectPath\", "")
    
    # Check if it's a test file
    foreach ($pattern in $testPatterns) {
        if ($relativePath -like $pattern) {
            $isTestFile = $true
            break
        }
    }
    
    # Skip node_modules and test files
    if (-not $isTestFile -and $relativePath -notlike "node_modules\*") {
        $productionFiles += $_
    }
}

Write-Host "Found $($productionFiles.Count) production JavaScript files" -ForegroundColor Green
# Process each production file
$totalRemoved = 0
$filesModified = 0
$modifiedFiles = @()

foreach ($file in $productionFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $removedCount = 0
    
    # Remove console statements with regex
    # Match console.log/error/warn/info/debug on its own line
    $content = $content -replace '(?m)^\s*console\.(log|error|warn|info|debug|trace)\s*\([^)]*\);?\s*\r?\n', ''
    
    # Count how many were removed
    $removedCount = ([regex]::Matches($originalContent, 'console\.(log|error|warn|info|debug|trace)')).Count - ([regex]::Matches($content, 'console\.(log|error|warn|info|debug|trace)')).Count
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $relPath = $file.FullName.Replace("$projectPath\", "")
        Write-Host "Modified: $relPath - Removed $removedCount console statements" -ForegroundColor Green
        $totalRemoved += $removedCount
        $filesModified++
        $modifiedFiles += $relPath
    }
}
Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Files modified: $filesModified" -ForegroundColor Yellow
Write-Host "Total console statements removed: $totalRemoved" -ForegroundColor Yellow

# Create a backup record
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$reportContent = @"
Console Log Removal Report
Generated: $timestamp
Files Modified: $filesModified
Statements Removed: $totalRemoved

Modified Files:
"@

foreach ($modFile in $modifiedFiles) {
    $reportContent += "`n- $modFile"
}

# Save removal report
$reportPath = Join-Path $projectPath "scripts\console-removal-report_$timestamp.txt"
Set-Content -Path $reportPath -Value $reportContent

Write-Host ""
Write-Host "Report saved to: scripts\console-removal-report_$timestamp.txt" -ForegroundColor Cyan