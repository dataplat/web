#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Enriches commands.json with full text content from markdown files for search
.DESCRIPTION
    Reads all command markdown files and adds their full content to commands.json
    to enable comprehensive full-text search across all command documentation
#>

$jsonPath = Join-Path $PSScriptRoot ".." "static" "commands.json"
$contentPath = Join-Path $PSScriptRoot ".." "content" "commands"

Write-Host "Enriching commands.json with full content..." -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Load the JSON file
Write-Host "Loading commands.json..." -ForegroundColor Yellow
$commands = Get-Content $jsonPath -Raw | ConvertFrom-Json

Write-Host "✓ Loaded $($commands.Count) commands" -ForegroundColor Green
Write-Host ""

# Function to extract text content from markdown (strip HTML and front matter)
function Get-MarkdownTextContent {
    param([string]$content)

    # Remove YAML front matter
    $content = $content -replace '(?s)^---.*?---', ''

    # Remove HTML tags
    $content = $content -replace '<[^>]+>', ' '

    # Remove markdown code blocks but keep the code
    $content = $content -replace '```[a-z]*\s*', ' ' -replace '```', ' '

    # Remove markdown formatting
    $content = $content -replace '\*\*([^*]+)\*\*', '$1'  # Bold
    $content = $content -replace '\*([^*]+)\*', '$1'      # Italic
    $content = $content -replace '\[([^\]]+)\]\([^\)]+\)', '$1'  # Links
    $content = $content -replace '##+\s*', ''             # Headers
    $content = $content -replace '(?m)^\s*[-*+]\s+', ''   # List items

    # Remove multiple spaces and newlines
    $content = $content -replace '\s+', ' '

    # Trim
    return $content.Trim()
}

# Process each command
Write-Host "Processing command markdown files..." -ForegroundColor Yellow
$enrichedCount = 0
$notFoundCount = 0

foreach ($cmd in $commands) {
    $mdFile = Join-Path $contentPath "$($cmd.name).md"

    if (Test-Path $mdFile) {
        try {
            # Read the markdown file
            $mdContent = Get-Content $mdFile -Raw

            # Extract synopsis from front matter if available
            if ($mdContent -match '(?s)synopsis:\s*"([^"]*)"') {
                $synopsis = $matches[1]
                if ($synopsis -and -not $cmd.synopsis) {
                    $cmd | Add-Member -MemberType NoteProperty -Name 'synopsis' -Value $synopsis -Force
                }
            }

            # Get full text content for search
            $searchContent = Get-MarkdownTextContent -content $mdContent

            # Add or update the fullContent property
            if ($cmd.PSObject.Properties.Name -contains 'fullContent') {
                $cmd.fullContent = $searchContent
            } else {
                $cmd | Add-Member -MemberType NoteProperty -Name 'fullContent' -Value $searchContent
            }

            $enrichedCount++

            if ($enrichedCount % 50 -eq 0) {
                Write-Host "  Processed $enrichedCount commands..." -ForegroundColor Gray
            }
        } catch {
            Write-Warning "Failed to process $($cmd.name): $_"
        }
    } else {
        $notFoundCount++
        # Add empty fullContent for commands without markdown files
        if (-not ($cmd.PSObject.Properties.Name -contains 'fullContent')) {
            $cmd | Add-Member -MemberType NoteProperty -Name 'fullContent' -Value ""
        }
    }
}

Write-Host ""
Write-Host "✓ Enriched $enrichedCount commands with full content" -ForegroundColor Green

if ($notFoundCount -gt 0) {
    Write-Host "⚠ $notFoundCount commands had no markdown file" -ForegroundColor Yellow
}

Write-Host ""

# Save the enriched JSON
Write-Host "Saving enriched commands.json..." -ForegroundColor Yellow
$commands | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath -Encoding utf8 -NoNewline

Write-Host "✓ Saved successfully" -ForegroundColor Green
Write-Host ""

# Copy to public folder
$publicJsonPath = Join-Path $PSScriptRoot ".." "public" "commands.json"
if (Test-Path (Split-Path $publicJsonPath)) {
    Copy-Item $jsonPath $publicJsonPath -Force
    Write-Host "✓ Copied to public/commands.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Done! Commands.json is now enriched for full-text search" -ForegroundColor Green
Write-Host ""
