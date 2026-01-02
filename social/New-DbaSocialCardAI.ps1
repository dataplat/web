<#
.SYNOPSIS
    Generates social card HTML files for dbatools commands using AI (Haiku 4.5).

.DESCRIPTION
    Reads the dbatools-index.json file and uses Invoke-AITool with Haiku 4.5
    to generate beautiful social card HTML files. Output goes to a predictable
    path structure: static/social-cards/{CommandName}.html

    After HTML generation, use a screenshot tool to convert to PNG at:
    static/social-cards/{CommandName}.png

    Hugo templates can reference: /social-cards/{CommandName}.png

.PARAMETER CommandName
    Generate card for specific command(s). Supports wildcards.

.PARAMETER HtmlOutputPath
    Directory to save generated HTML files. Defaults to .\social.

.PARAMETER PngOutputPath
    Directory to save generated PNG files. Defaults to C:\github\web\static\images\social.

.PARAMETER IndexPath
    Path to dbatools-index.json file.

.PARAMETER First
    Process only the first N commands (useful for testing).

.EXAMPLE
    .\New-DbaSocialCardAI.ps1 -CommandName "Copy-DbaDatabase" -Verbose

.EXAMPLE
    .\New-DbaSocialCardAI.ps1 -First 10
    Generate cards for first 10 commands (for testing).

.EXAMPLE
    .\New-DbaSocialCardAI.ps1
    Generates cards for all ~700 commands using AI.
#>
[CmdletBinding()]
param(
    [string[]]$CommandName,
    [string]$HtmlOutputPath = "C:\github\web\social\card-html",
    [string]$PngOutputPath = "C:\github\web\static\images\social",
    [string]$IndexPath = "C:\github\dbatools\bin\dbatools-index.json",
    [string]$PromptPath = "C:\github\web\social\social-card-prompt.txt",
    [int]$First,
    [string]$Tool = "Claude",
    [string]$Model = "claude-haiku-4-5",
    [switch]$Force
)

# Import aitools module
Import-Module C:\github\aitools -Force

# Ensure output directories exist
if (-not (Test-Path $HtmlOutputPath)) {
    $null = New-Item -Path $HtmlOutputPath -ItemType Directory -Force
}
if (-not (Test-Path $PngOutputPath)) {
    $null = New-Item -Path $PngOutputPath -ItemType Directory -Force
}

# Read and parse JSON (handle UTF-16 encoding)
Write-Host "Reading command index from $IndexPath..." -ForegroundColor Cyan
$jsonContent = Get-Content -Path $IndexPath -Raw -Encoding Unicode
$commands = $jsonContent | ConvertFrom-Json

Write-Host "Found $($commands.Count) commands" -ForegroundColor Green

# Filter commands if specified
if ($CommandName) {
    $commands = $commands | Where-Object {
        $cmd = $_.CommandName
        foreach ($pattern in $CommandName) {
            if ($cmd -like $pattern) { return $true }
        }
        return $false
    }
    Write-Host "Filtered to $($commands.Count) commands matching pattern(s)" -ForegroundColor Yellow
}

# Limit if First is specified
if ($First -and $First -gt 0) {
    $commands = $commands | Select-Object -First $First
    Write-Host "Limited to first $($commands.Count) commands" -ForegroundColor Yellow
}

# Process each command
$count = 0
foreach ($cmd in $commands) {
    $count++
    $cmdName = $cmd.CommandName

    Write-Progress -Activity "Generating social cards" -Status $cmdName -PercentComplete (($count / $commands.Count) * 100)

    # HTML goes to social/ directory, PNG goes to static/images/social-cards/
    $htmlFile = Join-Path $HtmlOutputPath "$cmdName.html"
    $pngFile = Join-Path $PngOutputPath "$cmdName.png"

    # Skip if HTML file already exists (unless -Force is specified)
    if ((Test-Path $htmlFile) -and -not $Force) {
        Write-Verbose "Skipping $cmdName - HTML file already exists"
        continue
    }

    # Read prompt template fresh each iteration (allows live updates)
    $promptTemplate = Get-Content -Path $PromptPath -Raw

    # Replace placeholders with command data
    $prompt = $promptTemplate `
        -replace '\{\{CommandName\}\}', $cmdName `
        -replace '\{\{Author\}\}', $cmd.Author `
        -replace '\{\{Synopsis\}\}', $cmd.Synopsis `
        -replace '\{\{Availability\}\}', $cmd.Availability `
        -replace '\{\{Tags\}\}', ($cmd.Tags -join ", ") `
        -replace '\{\{Examples\}\}', $cmd.Examples `
        -replace '\{\{HtmlFile\}\}', $htmlFile

    # Call AI with prompt only
    $splatAI = @{
        Tool    = $Tool
        Model   = $Model
        Prompt  = $prompt
        Verbose = $VerbosePreference -eq "Continue"
    }

    try {
        Invoke-AITool @splatAI
        Write-Verbose "Generated HTML: $htmlFile"

        # Convert HTML to PNG using Puppeteer
        if (Test-Path $htmlFile) {
            $screenshotScript = Join-Path $PSScriptRoot "screenshot-card.js"

            if (Test-Path $screenshotScript) {
                node $screenshotScript $htmlFile $pngFile
                if (Test-Path $pngFile) {
                    Write-Verbose "Generated PNG: $pngFile"
                } else {
                    Write-Warning "Failed to generate PNG for $cmdName"
                }
            } else {
                Write-Warning "screenshot-card.js not found - skipping PNG generation"
            }
        }
    } catch {
        Write-Warning "Failed to generate card for $cmdName : $_"
    }
}

Write-Progress -Activity "Generating social cards" -Completed
Write-Host "`nGeneration complete!" -ForegroundColor Green
Write-Host "Generated $count social card(s)" -ForegroundColor Green
Write-Host "`nFile structure:" -ForegroundColor Cyan
Write-Host "  HTML: social/{CommandName}.html" -ForegroundColor Gray
Write-Host "  PNG:  static/images/social/{CommandName}.png" -ForegroundColor Gray
Write-Host "  URL:  /images/social/{CommandName}.png" -ForegroundColor Gray
Write-Host "`nDefault card: static/images/social/default.png" -ForegroundColor Gray
