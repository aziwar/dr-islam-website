# PowerShell test script for performance monitoring
Write-Host "=== TESTING PERFORMANCE MONITORING ===" -ForegroundColor Green
Write-Host "Making requests to trigger console.log outputs..." -ForegroundColor Yellow
Write-Host ""

# Make requests to various endpoints
$endpoints = @(
    @{Name="HTML Page"; Url="http://localhost:8787/"},
    @{Name="Arabic Page"; Url="http://localhost:8787/ar/"},
    @{Name="CSS File"; Url="http://localhost:8787/styles.css"},
    @{Name="Robots.txt"; Url="http://localhost:8787/robots.txt"},
    @{Name="Sitemap"; Url="http://localhost:8787/sitemap.xml"},
    @{Name="Manifest"; Url="http://localhost:8787/manifest-en.json"},
    @{Name="Service Worker"; Url="http://localhost:8787/sw.js"},
    @{Name="Image"; Url="http://localhost:8787/assets/images/logo-en.png"}
)

foreach ($endpoint in $endpoints) {
    Write-Host "Testing: $($endpoint.Name)" -ForegroundColor Cyan
    try {
        $response = Invoke-WebRequest -Uri $endpoint.Url -UseBasicParsing -TimeoutSec 5
        Write-Host "   ✓ Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "   ✗ Error: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== CHECK DEV SERVER CONSOLE ===" -ForegroundColor Green
Write-Host "The console running 'npm run dev' should show performance logs like:" -ForegroundColor White
Write-Host "{" -ForegroundColor Gray
Write-Host "  url: 'http://localhost:8787/...'," -ForegroundColor Gray
Write-Host "  method: 'GET'," -ForegroundColor Gray
Write-Host "  timestamp: '2025-07-20T...'," -ForegroundColor Gray
Write-Host "  operation: 'html|css|image|etc'," -ForegroundColor Gray
Write-Host "  duration: 12.5" -ForegroundColor Gray
Write-Host "}" -ForegroundColor Gray