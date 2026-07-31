#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Shared helper for working out which dbatools commands are Windows-only
.DESCRIPTION
    The Availability field in bin/dbatools-index.json says "Windows, Linux, macOS"
    for every single command, so it is useless to us.

    The cause is upstream: dbatools.psm1 defines $script:xplat, $script:windowsonly
    and $script:noncoresmo inside an "if ($PSVersionTable.PSVersion.Major -lt 5)"
    block, so on PowerShell 5.1 and 7.x they are all $null. Get-DbaHelp then tests
    "$Name -in $script:windowsonly" against $null, that is always false, and every
    command falls through to the cross-platform default that gets baked into the
    index at release time.

    Until that ships fixed upstream, read the lists straight out of the module
    source instead.
#>

function Get-DbatoolsWindowsOnlyCommand {
    [CmdletBinding()]
    param(
        [string]$ModuleUrl = "https://raw.githubusercontent.com/dataplat/dbatools/development/dbatools.psm1"
    )

    Write-Host "Downloading dbatools.psm1 for platform lists..." -ForegroundColor Yellow
    try {
        $moduleSource = (Invoke-WebRequest -Uri $ModuleUrl -UseBasicParsing).Content
    } catch {
        throw "Failed to download dbatools.psm1: $_"
    }

    $windowsOnly = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
    foreach ($listName in 'windowsonly', 'noncoresmo') {
        $listMatch = [regex]::Match($moduleSource, "(?m)\`$script:$listName\s*=\s*@\((?<body>[\s\S]*?)^\s*\)\s*$")
        if (-not $listMatch.Success) {
            throw "Could not parse `$script:$listName out of dbatools.psm1 -- the module layout changed"
        }
        foreach ($entry in [regex]::Matches($listMatch.Groups['body'].Value, "'([\w-]+)'")) {
            $null = $windowsOnly.Add($entry.Groups[1].Value)
        }
    }

    # Guard against a silently-empty parse quietly marking every command cross-platform
    if ($windowsOnly.Count -lt 100) {
        throw "Only found $($windowsOnly.Count) Windows-only commands, expected 150+. Refusing to continue."
    }

    Write-Host "✓ $($windowsOnly.Count) Windows-only commands" -ForegroundColor Green
    return $windowsOnly
}
