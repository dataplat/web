#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Generates Hugo markdown files for dbatools command documentation
.DESCRIPTION
    Downloads dbatools-index.json and creates individual markdown files
    for each command in the content/commands/ directory
#>

# Configuration
$OutputFolder = Join-Path $PSScriptRoot ".." "content" "commands"
$IndexUrl = "https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json"
$IndexPath = Join-Path $PSScriptRoot "dbatools-index.json"

Write-Host "dbatools Command Documentation Generator" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
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
$commands = Get-Content $IndexPath | ConvertFrom-Json
Write-Host "✓ Found $($commands.Count) commands" -ForegroundColor Green
Write-Host ""

# Ensure output directory exists
if (-not (Test-Path $OutputFolder)) {
    New-Item -ItemType Directory -Path $OutputFolder -Force | Out-Null
    Write-Host "✓ Created output directory: $OutputFolder" -ForegroundColor Green
}

# Function to escape YAML special characters
function ConvertTo-YamlSafe {
    param([string]$text)
    if ([string]::IsNullOrEmpty($text)) { return "" }

    # Escape double quotes and backslashes
    $text = $text.Replace('\', '\\').Replace('"', '\"')
    # Remove any problematic characters
    $text = $text.Replace("`r", "").Replace("`n", " ")
    return $text
}

# Function to generate markdown for a command
function New-CommandMarkdown {
    param($command)

    $markdown = New-Object System.Collections.ArrayList

    # YAML Front Matter
    $null = $markdown.Add('---')
    $null = $markdown.Add("title: `"$(ConvertTo-YamlSafe $command.CommandName)`"")
    $null = $markdown.Add("slug: `"$(ConvertTo-YamlSafe $command.CommandName)`"")
    $null = $markdown.Add("date: 2024-01-01")
    $null = $markdown.Add("layout: `"single`"")

    if ($command.Author) {
        $null = $markdown.Add("author: `"$(ConvertTo-YamlSafe $command.Author)`"")
    }

    if ($command.Availability) {
        $null = $markdown.Add("availability: `"$(ConvertTo-YamlSafe $command.Availability)`"")
    }

    if ($command.Synopsis) {
        $synopsis = ConvertTo-YamlSafe $command.Synopsis
        $null = $markdown.Add("synopsis: `"$synopsis`"")
    }

    # Tags
    if ($command.Tags) {
        $null = $markdown.Add("tags:")
        foreach ($tag in $command.Tags) {
            $null = $markdown.Add("  - `"$tag`"")
        }
    }

    # Links
    $null = $markdown.Add("sourceUrl: `"https://github.com/dataplat/dbatools/blob/master/public/$($command.CommandName).ps1`"")
    $null = $markdown.Add("bohUrl: `"https://dataplat.github.io/boh#$($command.CommandName)`"")

    # SEO
    $null = $markdown.Add("draft: false")
    $null = $markdown.Add('---')
    $null = $markdown.Add('')

    # Markdown Body
    $null = $markdown.Add("# $($command.CommandName)")
    $null = $markdown.Add('')

    # Author/Availability Table
    if ($command.Author -or $command.Availability) {
        $null = $markdown.Add('| Property | Value |')
        $null = $markdown.Add('| --- | --- |')
        if ($command.Author) {
            $author = $command.Author.Replace('|', ',')
            $null = $markdown.Add("| **Author** | $author |")
        }
        if ($command.Availability) {
            $null = $markdown.Add("| **Availability** | $($command.Availability) |")
        }
        $null = $markdown.Add('')
    }

    $null = $markdown.Add('&nbsp;')
    $null = $markdown.Add('')

    # Links to source and BOH
    $null = $markdown.Add("Want to see the source code for this command? Check out [$($command.CommandName)](https://github.com/dataplat/dbatools/blob/master/public/$($command.CommandName).ps1) on GitHub.")
    $null = $markdown.Add('<br>')
    $null = $markdown.Add("Want to see the Bill Of Health for this command? Check out [$($command.CommandName)](https://dataplat.github.io/boh#$($command.CommandName)).")
    $null = $markdown.Add('')

    # Synopsis
    $null = $markdown.Add('## Synopsis')
    $null = $markdown.Add('')
    if ($command.Synopsis) {
        $null = $markdown.Add($command.Synopsis.Replace("`n", "  `n"))
    }
    $null = $markdown.Add('')

    # Description
    $null = $markdown.Add('## Description')
    $null = $markdown.Add('')
    if ($command.Description) {
        $null = $markdown.Add($command.Description.Replace("`n", "  `n"))
    }
    $null = $markdown.Add('')

    # Syntax
    if ($command.Syntax) {
        $null = $markdown.Add('## Syntax')
        $null = $markdown.Add('')
        $null = $markdown.Add('```powershell')

        # Split parameter sets
        $splittedParamSets = @()
        foreach ($val in ($command.Syntax -split $command.CommandName)) {
            if ($val) {
                $splittedParamSets += $command.CommandName + $val
            }
        }

        foreach ($syntax in $splittedParamSets) {
            $x = 0
            foreach ($val in ($syntax.Replace("`r", '').Replace("`n", '') -split ' \[')) {
                if ($x -eq 0) {
                    $null = $markdown.Add($val)
                } else {
                    $xx = 0
                    foreach ($subparam in ($val -split ' -')) {
                        if ($xx -eq 0) {
                            $null = $markdown.Add('    [' + $subparam.Replace("`n", '').Replace("`r", ''))
                        } else {
                            $null = $markdown.Add('    -' + $subparam.Replace("`n", '').Replace("`r", ''))
                        }
                        $xx += 1
                    }
                }
                $x += 1
            }
            $null = $markdown.Add('')
        }

        $null = $markdown.Add('```')
        $null = $markdown.Add('')
        $null = $markdown.Add('&nbsp;')
        $null = $markdown.Add('')
    }

    # Examples
    $null = $markdown.Add('## Examples')
    $null = $markdown.Add('')
    $null = $markdown.Add('&nbsp;')
    $null = $markdown.Add('')

    if ($command.Examples) {
        $examples = $command.Examples.Replace("`r`n", "`n") -replace '(\r\n){2,8}', "`n"
        $examples = $examples.Replace("`r", '').Split("`n")
        $inside = 0

        foreach ($row in $examples) {
            if ($row -like '*----*') {
                $null = $markdown.Add('')
                $null = $markdown.Add('##### ' + ($row -replace '-{4,}([^-]*)-{4,}', '$1').Replace('EXAMPLE', 'Example: '))
            } elseif (($row -like 'PS C:\>*') -or ($row -like '>>*')) {
                if ($inside -eq 0) {
                    $null = $markdown.Add('')
                    $null = $markdown.Add('```powershell')
                }
                $null = $markdown.Add(($row.Trim() -replace 'PS C:\\>\s*', 'PS C:\> '))
                $inside = 1
            } elseif ($row.Trim() -eq '' -or $row.Trim() -eq 'Description') {
                # Skip empty lines and Description headers
            } else {
                if ($inside -eq 1) {
                    $inside = 0
                    $null = $markdown.Add('```')
                    $null = $markdown.Add('')
                }
                $null = $markdown.Add("$($row.Replace("`n", "  `n"))<br>")
            }
        }

        if ($inside -eq 1) {
            $null = $markdown.Add('```')
        }
    }

    $null = $markdown.Add('')

    # Parameters
    if ($command.Params) {
        # Required Parameters
        $filteredParams = @()
        foreach ($p in $command.Params) {
            if ($p[3] -eq $true) {
                $filteredParams += , $p
            }
        }

        if ($filteredParams.Count -gt 0) {
            $null = $markdown.Add('### Required Parameters')
            $null = $markdown.Add('')

            foreach ($el in $filteredParams) {
                $null = $markdown.Add("##### -$($el[0])")
                $null = $markdown.Add('')
                $null = $markdown.Add($el[1].Replace("`r", '').Replace("`n", "  `n"))
                $null = $markdown.Add('')
                $null = $markdown.Add('| Property | Value |')
                $null = $markdown.Add('| --- | --- |')
                $null = $markdown.Add("| Alias | $($el[2]) |")
                $null = $markdown.Add("| Required | $($el[3]) |")
                $null = $markdown.Add("| Pipeline | $($el[4]) |")
                $null = $markdown.Add("| Default Value | $($el[5]) |")
                if ($el[6]) {
                    $null = $markdown.Add("| Accepted Values | $($el[6]) |")
                }
                $null = $markdown.Add('')
            }
        }

        # Optional Parameters
        $filteredParams = @()
        foreach ($p in $command.Params) {
            if ($p[3] -eq $false) {
                $filteredParams += , $p
            }
        }

        if ($filteredParams.Count -gt 0) {
            $null = $markdown.Add('### Optional Parameters')
            $null = $markdown.Add('')

            foreach ($el in $filteredParams) {
                $null = $markdown.Add("##### -$($el[0])")
                $null = $markdown.Add('')
                $null = $markdown.Add($el[1].Replace("`r", '').Replace("`n", "  `n"))
                $null = $markdown.Add('')
                $null = $markdown.Add('| Property | Value |')
                $null = $markdown.Add('| --- | --- |')
                $null = $markdown.Add("| Alias | $($el[2]) |")
                $null = $markdown.Add("| Required | $($el[3]) |")
                $null = $markdown.Add("| Pipeline | $($el[4]) |")
                $null = $markdown.Add("| Default Value | $($el[5]) |")
                if ($el[6]) {
                    $null = $markdown.Add("| Accepted Values | $($el[6]) |")
                }
                $null = $markdown.Add('')
            }
        }
    }

    $null = $markdown.Add('')
    $null = $markdown.Add('&nbsp;')
    $null = $markdown.Add('')

    return $markdown -join "`n"
}

# Generate markdown for each command
Write-Host "Generating markdown files..." -ForegroundColor Yellow
$count = 0
$errors = 0

foreach ($cmd in $commands) {
    try {
        # Skip if the command would overwrite the _index.md file
        if ($cmd.CommandName -eq "_index") {
            Write-Warning "Skipping command named '_index' to preserve Hugo section index"
            continue
        }

        $markdown = New-CommandMarkdown -command $cmd
        $outputPath = Join-Path $OutputFolder "$($cmd.CommandName).md"

        # Additional safety check: don't overwrite _index.md
        if ((Split-Path -Leaf $outputPath) -eq "_index.md") {
            Write-Warning "Skipping file that would overwrite _index.md"
            continue
        }

        $markdown | Out-File -FilePath $outputPath -Encoding utf8 -NoNewline
        $count++

        if ($count % 50 -eq 0) {
            Write-Host "  Generated $count files..." -ForegroundColor Gray
        }
    } catch {
        Write-Warning "Failed to generate $($cmd.CommandName): $_"
        $errors++
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✓ Successfully generated: $count files" -ForegroundColor Green
if ($errors -gt 0) {
    Write-Host "✗ Errors: $errors files" -ForegroundColor Red
}
Write-Host "✓ Output directory: $OutputFolder" -ForegroundColor Green
Write-Host ""

# Cleanup
if (Test-Path $IndexPath) {
    Remove-Item $IndexPath -Force
}

Write-Host "Done!" -ForegroundColor Green
