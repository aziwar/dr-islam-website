# Quick command to purge Cloudflare cache for CSS
# Run this in PowerShell after getting your API token

$headers = @{
    "Authorization" = "Bearer YOUR_CF_API_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    files = @(
        "https://dr-elsagher.com/styles.css",
        "https://www.dr-elsagher.com/styles.css"
    )
} | ConvertTo-Json

$zoneId = "YOUR_ZONE_ID"  # Get from Cloudflare dashboard

Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/purge_cache" -Method POST -Headers $headers -Body $body

Write-Host "Cache purged. Wait 2-5 minutes for global propagation."