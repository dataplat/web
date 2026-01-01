<#
.SYNOPSIS
    Generates social card HTML files for dbatools commands.

.DESCRIPTION
    Reads the dbatools-index.json file and generates beautiful social card
    HTML files for each command. Cards are optimized for Twitter/X sharing
    at 1200x628 pixels.

.PARAMETER CommandName
    Generate card for specific command(s). Supports wildcards.

.PARAMETER OutputPath
    Directory to save generated HTML files. Defaults to current directory.

.PARAMETER IndexPath
    Path to dbatools-index.json file.

.EXAMPLE
    .\New-DbaSocialCard.ps1 -CommandName "Copy-DbaDatabase"

.EXAMPLE
    .\New-DbaSocialCard.ps1 -CommandName "Get-Dba*" -OutputPath "C:\cards"

.EXAMPLE
    .\New-DbaSocialCard.ps1
    Generates cards for all commands.
#>
[CmdletBinding()]
param(
    [string[]]$CommandName,
    [string]$OutputPath = ".\cards",
    [string]$IndexPath = "C:\github\dbatools\bin\dbatools-index.json"
)

# Ensure output directory exists
if (-not (Test-Path $OutputPath)) {
    $null = New-Item -Path $OutputPath -ItemType Directory -Force
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

# HTML Template
$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dbatools - {{COMMAND_NAME}}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0d1117;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
        }

        .card {
            background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
            border: 1px solid #30363d;
            border-radius: 16px;
            width: 1200px;
            height: 628px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 50px 60px;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
        }

        .ps-decorator {
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 300px;
            font-weight: 800;
            color: rgba(59, 130, 246, 0.05);
            font-family: 'JetBrains Mono', monospace;
            pointer-events: none;
            user-select: none;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            z-index: 1;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
        }

        .brand-text {
            font-size: 20px;
            font-weight: 700;
            color: #8b949e;
        }

        .meta-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .meta-box {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(139, 148, 158, 0.08);
            border: 1px solid rgba(139, 148, 158, 0.2);
            border-radius: 8px;
            padding: 8px 14px;
            color: #8b949e;
            font-size: 13px;
            font-weight: 500;
        }

        .meta-box svg {
            width: 14px;
            height: 14px;
            fill: #8b949e;
            flex-shrink: 0;
        }

        .command-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 1;
        }

        .command-name {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            color: #f0f6fc;
            margin-bottom: 20px;
            letter-spacing: -1px;
        }

        .command-name.size-small { font-size: 64px; }
        .command-name.size-medium { font-size: 54px; }
        .command-name.size-large { font-size: 44px; }
        .command-name.size-xl { font-size: 36px; }

        .command-name .verb {
            color: #60a5fa;
        }

        .command-name .noun {
            color: #f0f6fc;
        }

        .synopsis {
            font-size: 24px;
            color: #c9d1d9;
            line-height: 1.5;
            max-width: 900px;
            margin-bottom: 30px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .example {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 20px 24px;
            max-width: 900px;
        }

        .example-label {
            font-size: 12px;
            color: #8b949e;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .example-code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            line-height: 1.5;
            white-space: pre;
            color: #7ee787;
        }

        .example-code .cmd { color: #7ee787; }
        .example-code .param { color: #79c0ff; }
        .example-code .value { color: #a5d6ff; }
        .example-code .var { color: #ffa657; }
        .example-code .eq { color: #8b949e; }
        .example-code .bracket { color: #8b949e; }
        .example-code .key { color: #79c0ff; }
        .example-code .splat { color: #ffa657; }

        .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 1;
            padding-top: 20px;
            border-top: 1px solid #30363d;
        }

        .tags {
            display: flex;
            gap: 10px;
        }

        .tag {
            background: rgba(139, 148, 158, 0.1);
            color: #8b949e;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
            border: 1px solid rgba(139, 148, 158, 0.2);
        }

        .tag.primary {
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border-color: rgba(249, 115, 22, 0.3);
            font-weight: 600;
        }

        .url {
            font-size: 16px;
            color: #8b949e;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .github-icon {
            width: 22px;
            height: 22px;
            fill: #8b949e;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="ps-decorator">></div>

        <div class="header">
            <div class="brand">
                <img src="thor.png" alt="dbatools" class="logo">
                <span class="brand-text">dbatools</span>
            </div>
            <div class="meta-right">
                <div class="meta-box">
                    <svg viewBox="0 0 16 16"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path></svg>
                    {{AUTHOR}}
                </div>
                <div class="meta-box">
                    <svg viewBox="0 0 16 16"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5Zm-8 10H1.75a.25.25 0 0 1-.25-.25V6.5H5v8.5Z"/></svg>
                    {{AVAILABILITY}}
                </div>
            </div>
        </div>

        <div class="command-section">
            <h1 class="command-name {{SIZE_CLASS}}">
                <span class="verb">{{VERB}}</span>-<span class="noun">{{NOUN}}</span>
            </h1>

            <p class="synopsis">{{SYNOPSIS}}</p>

            <div class="example">
                <div class="example-label">Example</div>
                <code class="example-code">{{EXAMPLE_CODE}}</code>
            </div>
        </div>

        <div class="footer">
            <div class="tags">
                {{TAGS_HTML}}
            </div>
            <div class="url">
                <svg class="github-icon" viewBox="0 0 16 16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                docs.dbatools.io/{{COMMAND_NAME}}
            </div>
        </div>
    </div>
</body>
</html>
'@

function Get-SizeClass {
    param([string]$CommandName)
    $length = $CommandName.Length
    if ($length -le 18) { return "size-small" }
    if ($length -le 26) { return "size-medium" }
    if ($length -le 34) { return "size-large" }
    return "size-xl"
}

function Get-CleanAuthor {
    param([string]$Author)
    # Remove Twitter handles, URLs, and clean up
    $clean = $Author -replace '\s*\(@[^)]+\)', '' -replace ',\s*\S+\.\S+', '' -replace '\s*\|.*$', ''
    $clean = $clean.Trim().TrimEnd(',')
    # Take first author if multiple
    if ($clean -match '^([^,|]+)') {
        return $Matches[1].Trim()
    }
    return $clean
}

function Get-FirstExample {
    param([string]$Examples)
    # Extract first example code (after PS C:\>)
    if ($Examples -match 'PS C:\\>(.+?)(?:\n\n|\n[A-Z]|$)') {
        $example = $Matches[1].Trim()
        # Clean up escape sequences
        $example = $example -replace '\\u003e', '>' -replace '\\u003c', '<' -replace '\\u0027', "'" -replace '\\r\\n', "`n" -replace '\\n', "`n"
        # Get just the first line if multiline
        $lines = $example -split "`n"
        return $lines[0].Trim()
    }
    return ""
}

function Format-ExampleHtml {
    param(
        [string]$Example,
        [string]$CommandName
    )

    if ([string]::IsNullOrWhiteSpace($Example)) {
        return "<span class=`"cmd`">$CommandName</span> <span class=`"param`">-SqlInstance</span> <span class=`"value`">localhost</span>"
    }

    # Parse and colorize the example
    $html = $Example

    # Escape HTML
    $html = $html -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'

    # Colorize command name
    $html = $html -replace "($CommandName)", '<span class="cmd">$1</span>'

    # Colorize parameters (words starting with -)
    $html = $html -replace '\s(-\w+)', ' <span class="param">$1</span>'

    # Colorize values after parameters (simple heuristic)
    $html = $html -replace '(</span>)\s+(\w+)', '$1 <span class="value">$2</span>'

    return $html
}

function Get-TagsHtml {
    param([array]$Tags)

    if (-not $Tags -or $Tags.Count -eq 0) {
        return '<span class="tag primary">PowerShell</span><span class="tag">SQL Server</span>'
    }

    $tagsHtml = @()
    $first = $true
    foreach ($tag in $Tags | Select-Object -First 4) {
        if ($first) {
            $tagsHtml += "<span class=`"tag primary`">$tag</span>"
            $first = $false
        } else {
            $tagsHtml += "<span class=`"tag`">$tag</span>"
        }
    }
    return $tagsHtml -join "`n                "
}

# Process each command
$count = 0
foreach ($cmd in $commands) {
    $count++
    $cmdName = $cmd.CommandName

    Write-Progress -Activity "Generating social cards" -Status $cmdName -PercentComplete (($count / $commands.Count) * 100)

    # Parse verb and noun
    if ($cmdName -match '^(\w+)-(.+)$') {
        $verb = $Matches[1]
        $noun = $Matches[2]
    } else {
        $verb = $cmdName
        $noun = ""
    }

    # Get values
    $sizeClass = Get-SizeClass -CommandName $cmdName
    $author = Get-CleanAuthor -Author $cmd.Author
    $availability = if ($cmd.Availability) { $cmd.Availability } else { "Windows, Linux, macOS" }
    $synopsis = $cmd.Synopsis
    $example = Get-FirstExample -Examples $cmd.Examples
    $exampleHtml = Format-ExampleHtml -Example $example -CommandName $cmdName
    $tagsHtml = Get-TagsHtml -Tags $cmd.Tags

    # Generate HTML
    $html = $template
    $html = $html -replace '{{COMMAND_NAME}}', $cmdName
    $html = $html -replace '{{VERB}}', $verb
    $html = $html -replace '{{NOUN}}', $noun
    $html = $html -replace '{{SIZE_CLASS}}', $sizeClass
    $html = $html -replace '{{AUTHOR}}', $author
    $html = $html -replace '{{AVAILABILITY}}', $availability
    $html = $html -replace '{{SYNOPSIS}}', $synopsis
    $html = $html -replace '{{EXAMPLE_CODE}}', $exampleHtml
    $html = $html -replace '{{TAGS_HTML}}', $tagsHtml

    # Save file
    $outputFile = Join-Path $OutputPath "social-card-$cmdName.html"
    $html | Out-File -FilePath $outputFile -Encoding UTF8 -Force

    Write-Verbose "Generated: $outputFile"
}

Write-Progress -Activity "Generating social cards" -Completed
Write-Host "`nGenerated $count social card(s) in $OutputPath" -ForegroundColor Green
Write-Host "Don't forget to copy thor.png to the output directory!" -ForegroundColor Yellow
