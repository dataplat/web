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
$IndexUrl = "https://raw.githubusercontent.com/dataplat/dbatools/bb18c537e2ce32fe09c9b0d767e467aa723649fa/bin/dbatools-index.json"
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
$commands = Get-Content $IndexPath -Raw | ConvertFrom-Json
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
    $null = $markdown.Add("bohUrl: `"https://dataplat.dbatools.io/boh#$($command.CommandName)`"")

    # SEO
    $null = $markdown.Add("draft: false")
    $null = $markdown.Add('---')
    $null = $markdown.Add('')

    # Beautiful Header Section with integrated metadata and GitHub link
    $null = $markdown.Add('<!-- Command Header Section -->')
    $null = $markdown.Add('<div class="command-header">')
    $null = $markdown.Add('  <div class="command-header-top">')
    $null = $markdown.Add("    <h1>$($command.CommandName)</h1>")
    $null = $markdown.Add("    <a href=`"https://github.com/dataplat/dbatools/blob/master/public/$($command.CommandName).ps1`" target=`"_blank`" rel=`"noopener noreferrer`" class=`"github-link`" title=`"View source on GitHub`">")
    $null = $markdown.Add('      <svg role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>')
    $null = $markdown.Add('      <span>View Source</span>')
    $null = $markdown.Add('    </a>')
    $null = $markdown.Add('  </div>')

    if ($command.Author -or $command.Availability) {
        $null = $markdown.Add('  <div class="command-meta">')
        if ($command.Author) {
            $author = $command.Author.Replace('|', ',')
            $null = $markdown.Add('    <div class="meta-item">')
            $null = $markdown.Add('      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>')
            $null = $markdown.Add("      <span>$author</span>")
            $null = $markdown.Add('    </div>')
        }
        if ($command.Availability) {
            $null = $markdown.Add('    <div class="meta-item">')
            $null = $markdown.Add('      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>')
            $null = $markdown.Add("      <span>$($command.Availability)</span>")
            $null = $markdown.Add('    </div>')
        }
        $null = $markdown.Add('  </div>')
    }

    $null = $markdown.Add('</div>')
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
        $cleanCode = New-Object System.Collections.ArrayList

        foreach ($row in $examples) {
            if ($row -like '*----*') {
                $null = $markdown.Add('')
                $null = $markdown.Add('##### ' + ($row -replace '-{4,}([^-]*)-{4,}', '$1').Replace('EXAMPLE', 'Example: '))
            } elseif (($row -like 'PS C:\>*') -or ($row -like '>>*')) {
                if ($inside -eq 0) {
                    $cleanCode.Clear()
                    $null = $markdown.Add('')
                    $null = $markdown.Add('```powershell')
                }
                # Add formatted line with prompt
                $null = $markdown.Add(($row.Trim() -replace 'PS C:\\>\s*', 'PS C:\> '))

                # Collect clean code without prompts
                $cleanLine = $row.Trim() -replace '^PS C:\\>\s*', '' -replace '^>>\s*', ''
                if ($cleanLine) {
                    $null = $cleanCode.Add($cleanLine)
                }
                $inside = 1
            } elseif ($row.Trim() -eq '' -or $row.Trim() -eq 'Description') {
                # Skip empty lines and Description headers
            } else {
                if ($inside -eq 1) {
                    $inside = 0
                    # Close code block (JavaScript will handle copy functionality)
                    $null = $markdown.Add('```')
                    $null = $markdown.Add('')
                }
                $null = $markdown.Add("$($row.Replace("`n", "  `n"))<br>")
            }
        }

        if ($inside -eq 1) {
            # Close final code block (JavaScript will handle copy functionality)
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

    # Outputs
    if ($command.Outputs) {
        $null = $markdown.Add('## Outputs')
        $null = $markdown.Add('')

        $outputText = $command.Outputs.Replace("`r`n", "`n").Replace("`r", "`n")
        $outputLines = $outputText.Split("`n")

        $firstLine = $true
        $inPropertyList = $false
        $paragraphBuffer = @()

        foreach ($line in $outputLines) {
            $trimmedLine = $line.Trim()

            # First non-empty line is typically the type name
            if ($firstLine -and -not [string]::IsNullOrEmpty($trimmedLine)) {
                $null = $markdown.Add("**$trimmedLine**")
                $null = $markdown.Add('')
                $firstLine = $false
                continue
            }

            # Lines starting with "- " are property descriptions
            if ($trimmedLine -match '^-\s+(.+)$') {
                # Flush paragraph buffer before starting list
                if ($paragraphBuffer.Count -gt 0) {
                    $null = $markdown.Add(($paragraphBuffer -join ' '))
                    $null = $markdown.Add('')
                    $paragraphBuffer = @()
                }
                $inPropertyList = $true
                $null = $markdown.Add("- $($Matches[1])")
            }
            # "Properties:" or similar headers ending with colon
            elseif ($trimmedLine -match '^[A-Z][^:]+:$') {
                # Flush paragraph buffer
                if ($paragraphBuffer.Count -gt 0) {
                    $null = $markdown.Add(($paragraphBuffer -join ' '))
                    $null = $markdown.Add('')
                    $paragraphBuffer = @()
                }
                $inPropertyList = $false
                $null = $markdown.Add('')
                $null = $markdown.Add("**$trimmedLine**")
                $null = $markdown.Add('')
            }
            # Empty line - paragraph break
            elseif ([string]::IsNullOrEmpty($trimmedLine)) {
                if ($paragraphBuffer.Count -gt 0) {
                    $null = $markdown.Add(($paragraphBuffer -join ' '))
                    $null = $markdown.Add('')
                    $paragraphBuffer = @()
                }
                $inPropertyList = $false
            }
            # Regular description text - accumulate into paragraph
            elseif (-not $firstLine) {
                $paragraphBuffer += $trimmedLine
            }
        }

        # Flush any remaining paragraph buffer
        if ($paragraphBuffer.Count -gt 0) {
            $null = $markdown.Add(($paragraphBuffer -join ' '))
        }
        $null = $markdown.Add('')
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
