#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Updates the popular commands in commands.json based on popularity rankings
.DESCRIPTION
    This script assigns popularity ranks to all commands in commands.json
    based on the rankings.txt file, marking the top 50 as popular
#>

$jsonPath = Join-Path $PSScriptRoot ".." "static" "commands.json"
$rankingsPath = Join-Path $PSScriptRoot ".." "rankings.txt"

Write-Host "Updating popular commands in commands.json..." -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Load the JSON file
Write-Host "Loading commands.json..." -ForegroundColor Yellow
$commands = Get-Content $jsonPath -Raw | ConvertFrom-Json
Write-Host "✓ Loaded $($commands.Count) commands" -ForegroundColor Green
Write-Host ""

# Load rankings from rankings.txt
Write-Host "Loading rankings from rankings.txt..." -ForegroundColor Yellow
if (-not (Test-Path $rankingsPath)) {
    Write-Warning "rankings.txt not found at $rankingsPath"
    Write-Host "Using fallback top 50 list instead" -ForegroundColor Yellow
    # Fallback to hardcoded top 50 if rankings.txt is missing
    $rankings = @()
    $fallbackTop50 = @(
        "Copy-DbaLogin", "Invoke-DbaQuery", "Restore-DbaDatabase", "Copy-DbaDatabase",
        "Backup-DbaDatabase", "Start-DbaMigration", "Get-DbaDatabase", "Connect-DbaInstance",
        "Copy-DbaAgentJob", "Export-DbaScript", "Set-DbatoolsInsecureConnection", "Copy-DbaDbTableData",
        "Write-DbaDbTableData", "Import-DbaCsv", "Add-DbaAgDatabase", "Update-DbaInstance",
        "Get-DbaLogin", "Export-DbaLogin", "Reset-DbaAdmin", "Get-DbaAgentJob",
        "Get-DbaProductKey", "Install-DbaInstance", "Copy-DbaLinkedServer", "Find-DbaInstance",
        "New-DbaConnectionString", "Sync-DbaAvailabilityGroup", "Update-Dbatools", "Export-DbaUser",
        "Test-DbaConnection", "Copy-DbaCredential", "Get-DbaDbTable", "Get-DbaAvailabilityGroup",
        "Get-DbaDbUser", "Get-DbaService", "Copy-DbaDbMail", "New-DbaLogin",
        "Get-DbaDbBackupHistory", "Sync-DbaLoginPermission", "Get-DbaUserPermission", "Export-DbaDbTableData",
        "Add-DbaDbRoleMember", "Export-DbaInstance", "Install-DbaMaintenanceSolution", "Install-DbaFirstResponderKit",
        "Install-DbaSqlWatch", "Get-DbaBuild", "Get-DbaDiskSpace", "Test-DbaLastBackup",
        "Repair-DbaDbOrphanUser", "Get-DbaPermission"
    )
    for ($i = 0; $i -lt $fallbackTop50.Count; $i++) {
        $rankings += @{ Name = $fallbackTop50[$i]; Rank = $i + 1 }
    }
} else {
    # Parse rankings.txt (PowerShell hashtable format)
    $rankingsContent = Get-Content $rankingsPath -Raw
    $rankings = @()

    # Extract command rankings using regex
    $matches = [regex]::Matches($rankingsContent, '@\{\s*Name\s*=\s*"([^"]+)";\s*Rank\s*=\s*(\d+)\s*\}')
    foreach ($match in $matches) {
        $rankings += @{
            Name = $match.Groups[1].Value
            Rank = [int]$match.Groups[2].Value
        }
    }

    Write-Host "✓ Loaded $($rankings.Count) ranked commands" -ForegroundColor Green
}
Write-Host ""

# Reset all commands to not popular and rank 0
Write-Host "Resetting all commands to not popular..." -ForegroundColor Yellow
foreach ($cmd in $commands) {
    $cmd.popular = $false
    if (-not ($cmd.PSObject.Properties.Name -contains 'popularityRank')) {
        $cmd | Add-Member -MemberType NoteProperty -Name 'popularityRank' -Value 0
    } else {
        $cmd.popularityRank = 0
    }
}
Write-Host "✓ Reset complete" -ForegroundColor Green
Write-Host ""

# Apply rankings to all commands
Write-Host "Applying popularity rankings..." -ForegroundColor Yellow
$rankedCount = 0
$popularCount = 0
$notFoundCommands = @()

# Create a lookup hashtable for faster access
$commandLookup = @{}
foreach ($cmd in $commands) {
    $commandLookup[$cmd.name] = $cmd
}

# Apply all rankings
foreach ($ranking in $rankings) {
    $cmdName = $ranking.Name
    $rank = $ranking.Rank

    if ($commandLookup.ContainsKey($cmdName)) {
        $cmd = $commandLookup[$cmdName]
        $cmd.popularityRank = $rank
        $rankedCount++

        # Mark top 50 as popular (use 51 to account for missing #44 in rankings)
        if ($rank -le 51) {
            $cmd.popular = $true
            $popularCount++
            Write-Host "  ✓ #$rank $cmdName (popular)" -ForegroundColor Green
        } elseif ($rank -le 100) {
            Write-Host "  ✓ #$rank $cmdName" -ForegroundColor Gray
        }
    } else {
        $notFoundCommands += $cmdName
    }
}

Write-Host ""
Write-Host "✓ Applied rankings to $rankedCount commands" -ForegroundColor Green
Write-Host "✓ Marked $popularCount commands as popular (top 50)" -ForegroundColor Green
Write-Host ""

# Report any ranked commands not found in JSON
if ($notFoundCommands.Count -gt 0) {
    Write-Host "⚠ Warning: $($notFoundCommands.Count) ranked commands not found in commands.json:" -ForegroundColor Yellow
    $notFoundCommands | Select-Object -First 10 | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Yellow
    }
    if ($notFoundCommands.Count -gt 10) {
        Write-Host "  ... and $($notFoundCommands.Count - 10) more" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Save the updated JSON
Write-Host "Saving updated commands.json..." -ForegroundColor Yellow
$commands | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath -Encoding utf8 -NoNewline
Write-Host "✓ Saved successfully" -ForegroundColor Green
Write-Host ""

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Done! Applied $rankedCount rankings, marked $popularCount as popular" -ForegroundColor Green
Write-Host ""
