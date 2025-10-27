#!/usr/bin/env pwsh
# Update commands.json URLs to point to /commands/{name} instead of docs.dbatools.io

$commandsJson = Join-Path $PSScriptRoot ".." "static" "commands.json"

Write-Host "Updating commands.json URLs..." -ForegroundColor Yellow

# Load the JSON
$commands = Get-Content $commandsJson | ConvertFrom-Json

Write-Host "Found $($commands.Count) commands" -ForegroundColor Cyan

# Update each URL
$updatedCount = 0
foreach ($cmd in $commands) {
    if ($cmd.url -like "https://docs.dbatools.io/*") {
        $cmd.url = "/commands/$($cmd.name)"
        $updatedCount++
    }
}

# Save back to file
$commands | ConvertTo-Json -Depth 10 | Out-File $commandsJson -Encoding utf8

Write-Host "✓ Updated $updatedCount command URLs" -ForegroundColor Green
Write-Host "✓ All URLs now point to /commands/{name}" -ForegroundColor Green
