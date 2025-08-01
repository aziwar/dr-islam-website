# Comprehensive Console Log Removal Script
# Removes ALL console statements from production JS files

$projectPath = "D:\Github-work\dr-islam-website"
$testDirs = @("tests", "test-results", "playwright-report", ".wrangler")
$testFiles = @("*test*.js", "*Test*.js", "playwright*.js", "deployment-verification.js", "performance-test.js")

Write-Host "Starting comprehensive console statement removal..." -ForegroundColor Yellow

# Get all JS files
$allJsFiles = Get-ChildItem -Path $projectPath -Filter "*.js" -Recurse -Force

$processedCount = 0
$modifiedCount = 0
$totalRemoved = 0

foreach ($file in $allJsFiles) {
    $relativePath = $file.FullName.Replace("$projectPath\", "")
    
    # Skip test directories
    $skipFile = $false
    foreach ($testDir in $testDirs) {
        if ($relativePath -like "$testDir\*") {
            $skipFile = $true
            break
        }
    }
    
    # Skip test files
    if (-not $skipFile) {
        foreach ($testPattern in $testFiles) {
            if ($file.Name -like $testPattern) {
                $skipFile = $true
                break
            }
        }
    }    
    # Skip node_modules
    if ($relativePath -like "node_modules\*") {
        continue
    }
    
    if (-not $skipFile) {
        $processedCount++
        $content = Get-Content -Path $file.FullName -Raw
        $originalContent = $content
        
        # Multiple passes to ensure all console statements are removed
        # Pass 1: Remove single-line console statements
        $content = $content -replace '(?m)^\s*console\.(log|error|warn|info|debug|trace)\s*\([^;]*\);?\s*$', ''
        
        # Pass 2: Remove console statements that might span multiple lines
        $content = $content -replace '(?s)console\.(log|error|warn|info|debug|trace)\s*\([^)]*\);?', ''
        
        # Pass 3: Clean up any remaining console references
        $content = $content -replace 'console\.(log|error|warn|info|debug|trace)', '// console.$1'
        
        # Remove empty lines created by removal
        $content = $content -replace '(?m)^\s*$\r?\n', ''
        
        if ($content -ne $originalContent) {
            # Count removals
            $originalMatches = ([regex]::Matches($originalContent, 'console\.(log|error|warn|info|debug|trace)')).Count
            $newMatches = ([regex]::Matches($content, 'console\.(log|error|warn|info|debug|trace)')).Count
            $removed = $originalMatches - $newMatches
            
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "✓ $relativePath - Removed $removed console statements" -ForegroundColor Green
            $modifiedCount++
            $totalRemoved += $removed
        }
    }
}
Write-Host ""
Write-Host "=== REMOVAL COMPLETE ===" -ForegroundColor Cyan
Write-Host "Files processed: $processedCount" -ForegroundColor Yellow
Write-Host "Files modified: $modifiedCount" -ForegroundColor Yellow
Write-Host "Console statements removed: $totalRemoved" -ForegroundColor Yellow

# Verify removal in src directory
Write-Host ""
Write-Host "Verifying src directory..." -ForegroundColor Yellow

$srcFiles = Get-ChildItem -Path "$projectPath\src" -Filter "*.js" -Recurse -Force
$remainingCount = 0

foreach ($file in $srcFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $matches = ([regex]::Matches($content, 'console\.(log|error|warn|info|debug|trace)'))
    if ($matches.Count -gt 0) {
        Write-Host "⚠️ Still has console: $($file.FullName.Replace("$projectPath\", ''))" -ForegroundColor Red
        $remainingCount += $matches.Count
    }
}

if ($remainingCount -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS: All console statements removed from production!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️ WARNING: $remainingCount console statements still remain" -ForegroundColor Yellow
}

# Save report
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$report = @"
Console Removal Report - COMPREHENSIVE
Generated: $timestamp
Files Processed: $processedCount
Files Modified: $modifiedCount
Total Removed: $totalRemoved
Remaining in src/: $remainingCount
"@

$reportPath = "$projectPath\scripts\console-removal-complete_$timestamp.txt"
Set-Content -Path $reportPath -Value $report
Write-Host ""
Write-Host "Report saved to: scripts\console-removal-complete_$timestamp.txt" -ForegroundColor Cyan