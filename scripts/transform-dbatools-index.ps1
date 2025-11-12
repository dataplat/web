#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Transforms dbatools-index.json into the format needed by the website
.DESCRIPTION
    Downloads dbatools-index.json and transforms it to match the structure
    expected by static/commands.json with proper categories, verbs, and URLs
#>

$IndexUrl = "https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json"
$IndexPath = Join-Path $PSScriptRoot "dbatools-index.json"
$OutputPath = Join-Path $PSScriptRoot ".." "static" "commands.json"

Write-Host "dbatools Command Index Transformer" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Download the index
Write-Host "Downloading dbatools-index.json..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $IndexUrl -OutFile $IndexPath -UseBasicParsing
    Write-Host "✓ Downloaded successfully" -ForegroundColor Green
} catch {
    Write-Error "Failed to download index: $_"
    exit 1
}

# Load the index
Write-Host "Loading command index..." -ForegroundColor Yellow
$sourceCommands = Get-Content $IndexPath -Raw | ConvertFrom-Json
Write-Host "✓ Found $($sourceCommands.Count) commands in source" -ForegroundColor Green
Write-Host ""

# Category assignment function based on analysis
function Get-CommandCategory {
    param(
        [string]$CommandName,
        [array]$Tags
    )

    # Extract verb and noun
    if ($CommandName -match '^([A-Z][a-z]+)-Dba(.+)$') {
        $verb = $matches[1]
        $noun = $matches[2]
    } else {
        return "Utilities"
    }

    # Convert tags to lowercase for comparison (handle null/empty tags)
    if ($null -eq $Tags -or $Tags.Count -eq 0) {
        $tagsLower = @()
    } else {
        $tagsLower = $Tags | Where-Object { $_ } | ForEach-Object { $_.ToLower() }
    }

    # Priority 1: Verb-based categorization (highest accuracy)
    if ($verb -in @('Copy', 'Export')) {
        return "Migration"
    }
    if ($verb -in @('Backup', 'Restore')) {
        return "Backup & Restore"
    }

    # Priority 2: Tag-based categorization
    if ($tagsLower -contains 'agent') {
        return "Agent & Jobs"
    }
    if ($tagsLower -match 'certificate|encryption|login|permission|credential|audit') {
        return "Security"
    }
    if ($tagsLower -contains 'backup') {
        return "Backup & Restore"
    }

    # Priority 3: Domain/Noun-based categorization
    # Performance monitoring
    if ($noun -match 'Cpu|Memory|Wait|Latch|PlanCache|Trace|Queue|PowerPlan|Performance|Statistic|XE') {
        return "Performance"
    }

    # Advanced Features (AG, Replication, etc.)
    if ($noun -match 'Ag[A-Z]|Replica|Replication|Endpoint|Hadr|AvailabilityGroup') {
        return "Advanced Features"
    }

    # Data operations
    if ($noun -match 'TableData|DataGenerator|DataMasking|Csv') {
        return "Data Operations"
    }

    # Server Management
    if ($tagsLower -contains 'instance' -or $noun -match 'Instance|Service|Spn|Certificate') {
        return "Server Management"
    }

    # Database Operations
    if ($tagsLower -contains 'database' -or $noun -match '^Database|DbFile|DbState|DbOwner') {
        return "Database Operations"
    }

    # Default fallback
    return "Utilities"
}

# Transform each command
Write-Host "Transforming commands to website format..." -ForegroundColor Yellow
$transformedCommands = @()
$count = 0

foreach ($cmd in $sourceCommands) {
    # Extract verb from command name
    $verb = "Other"
    if ($cmd.CommandName -match '^([A-Z][a-z]+)-') {
        $verb = $matches[1]
    }

    # Derive category
    $category = Get-CommandCategory -CommandName $cmd.CommandName -Tags $cmd.Tags

    # Build transformed command object
    $cmdTags = @()
    if ($null -ne $cmd.Tags -and $cmd.Tags.Count -gt 0) {
        $cmdTags = @($cmd.Tags | Where-Object { $_ } | ForEach-Object { $_.ToLower() })
    }

    $transformed = [PSCustomObject]@{
        name = $cmd.CommandName
        description = $cmd.Description
        category = $category
        tags = $cmdTags
        verb = $verb
        popular = $false
        url = "/$($cmd.CommandName)"
        popularityRank = 0
        synopsis = $cmd.Synopsis
        fullContent = ""  # Will be filled by enrich-commands-json.ps1
    }

    $transformedCommands += $transformed
    $count++

    if ($count % 100 -eq 0) {
        Write-Host "  Transformed $count commands..." -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✓ Transformed $count commands" -ForegroundColor Green
Write-Host ""

# Show category distribution
Write-Host "Category Distribution:" -ForegroundColor Cyan
$transformedCommands | Group-Object category |
    Sort-Object Count -Descending |
    ForEach-Object {
        $percentage = [math]::Round(($_.Count / $transformedCommands.Count) * 100, 1)
        Write-Host "  $($_.Name): $($_.Count) ($percentage%)" -ForegroundColor Gray
    }
Write-Host ""

# Save the transformed JSON
Write-Host "Saving to static/commands.json..." -ForegroundColor Yellow
$transformedCommands | ConvertTo-Json -Depth 10 | Out-File -FilePath $OutputPath -Encoding utf8 -NoNewline
Write-Host "✓ Saved successfully" -ForegroundColor Green
Write-Host ""

# Cleanup
if (Test-Path $IndexPath) {
    Remove-Item $IndexPath -Force
}

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "✓ Transformation complete!" -ForegroundColor Green
Write-Host "  Output: $OutputPath" -ForegroundColor Gray
Write-Host "  Next: Run enrich-commands-json.ps1 to add fullContent" -ForegroundColor Gray
Write-Host "  Then: Run update-popular-commands.ps1 to mark popular commands" -ForegroundColor Gray
Write-Host ""
