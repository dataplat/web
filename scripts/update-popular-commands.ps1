#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Updates the popular commands in commands.json based on analytics data
.DESCRIPTION
    This script marks the top 50 most viewed commands as popular in commands.json
    based on actual page view analytics data
#>

$jsonPath = Join-Path $PSScriptRoot ".." "static" "commands.json"

Write-Host "Updating popular commands in commands.json..." -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Load the JSON file
Write-Host "Loading commands.json..." -ForegroundColor Yellow
$commands = Get-Content $jsonPath -Raw | ConvertFrom-Json

Write-Host "✓ Loaded $($commands.Count) commands" -ForegroundColor Green
Write-Host ""

# The top 50 commands by page views (excluding the main docs page)
$popularCommands = @(
    "Restore-DbaDatabase",
    "Copy-DbaLogin",
    "Copy-DbaDatabase",
    "Invoke-DbaQuery",
    "Reset-DbaAdmin",
    "Install-DbaFirstResponderKit",
    "Backup-DbaDatabase",
    "Start-DbaMigration",
    "Connect-DbaInstance",
    "Copy-DbaAgentJob",
    "Copy-DbaDbTableData",
    "Get-DbaDatabase",
    "Export-DbaScript",
    "Export-DbaLogin",
    "Update-DbaInstance",
    "Import-DbaCsv",
    "Install-DbaInstance",
    "Set-DbatoolsInsecureConnection",
    "Get-DbaLogin",
    "Copy-DbaLinkedServer",
    "Write-DbaDbTableData",
    "Sync-DbaAvailabilityGroup",
    "Add-DbaAgDatabase",
    "Get-DbaAgentJob",
    "Export-DbaUser",
    "Install-DbaSqlWatch",
    "Get-DbaService",
    "Sync-DbaLoginPermission",
    "Copy-DbaDbMail",
    "Test-DbaConnection",
    "Get-DbaDbTable",
    "Export-DbaInstance",
    "Find-DbaInstance",
    "Get-DbaProductKey",
    "Get-DbaUserPermission",
    "Set-DbaNetworkCertificate",
    "Get-DbaAvailabilityGroup",
    "Copy-DbaCredential",
    "Install-DbaMaintenanceSolution",
    "Test-DbaLastBackup",
    "Update-Dbatools",
    "Add-DbaDbRoleMember",
    "New-DbaLogin",
    "Repair-DbaDbOrphanUser",
    "Get-DbaDbBackupHistory",
    "Get-DbaDiskSpace",
    "Set-DbaDbState",
    "Get-DbaDbUser",
    "Set-DbaLogin",
    "Invoke-DbaDbShrink"
)

# Reset all commands to not popular
Write-Host "Resetting all commands to not popular..." -ForegroundColor Yellow
foreach ($cmd in $commands) {
    $cmd.popular = $false
    # Add popularityRank property if it doesn't exist, set to 0 (not ranked)
    if (-not ($cmd.PSObject.Properties.Name -contains 'popularityRank')) {
        $cmd | Add-Member -MemberType NoteProperty -Name 'popularityRank' -Value 0
    } else {
        $cmd.popularityRank = 0
    }
}
Write-Host "✓ Reset complete" -ForegroundColor Green
Write-Host ""

# Mark the top 50 as popular with their rank
Write-Host "Marking top 50 commands as popular..." -ForegroundColor Yellow
$markedCount = 0
$notFoundCommands = @()

for ($i = 0; $i -lt $popularCommands.Count; $i++) {
    $popularCmd = $popularCommands[$i]
    $rank = $i + 1  # Rank starts at 1

    foreach ($cmd in $commands) {
        if ($cmd.name -eq $popularCmd) {
            $cmd.popular = $true
            $cmd.popularityRank = $rank
            $markedCount++
            Write-Host "  ✓ #$rank $($cmd.name)" -ForegroundColor Green
            break
        }
    }
}

Write-Host ""
Write-Host "✓ Marked $markedCount commands as popular" -ForegroundColor Green
Write-Host ""

# Check if any popular commands weren't found
foreach ($popularCmd in $popularCommands) {
    $found = $false
    foreach ($cmd in $commands) {
        if ($cmd.name -eq $popularCmd) {
            $found = $true
            break
        }
    }
    if (-not $found) {
        $notFoundCommands += $popularCmd
    }
}

if ($notFoundCommands.Count -gt 0) {
    Write-Host "⚠ Warning: The following commands were not found in commands.json:" -ForegroundColor Yellow
    foreach ($cmd in $notFoundCommands) {
        Write-Host "  - $cmd" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Save the updated JSON
Write-Host "Saving updated commands.json..." -ForegroundColor Yellow
$commands | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath -Encoding utf8 -NoNewline
Write-Host "✓ Saved successfully" -ForegroundColor Green
Write-Host ""

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Done! Updated $markedCount commands as popular" -ForegroundColor Green
Write-Host ""
