# dbatools Social Card Generator Prompt

Use this prompt with AI tools to generate social cards for individual dbatools commands.

## Input Required

For each command, you need to extract the following from the PowerShell command file:

1. **Command Name** - The full command name (e.g., `Get-DbaAgentJobOutputFile`)
2. **Author** - From the `.NOTES` section, extract just the name (no Twitter handles, no URLs)
3. **Synopsis** - The `.SYNOPSIS` text
4. **Category/Tags** - From the `Tags:` line in `.NOTES`
5. **Example** - The first or most representative example from `.EXAMPLE`

## Template Selection

Both templates share the same header layout with author and OS compatibility boxes. The difference is in the example formatting:

### Template A: Short Commands (Inline Example)
Use for commands with:
- Examples with 3 or fewer parameters
- Use inline example format on a single line

### Template B: Long Commands (Splat Example)
Use for commands with:
- Examples with 4+ parameters
- Use splat format with aligned `=` signs

## Prompt for AI Tool

```
You are generating a social card HTML file for a dbatools PowerShell command.

Given the following command information, generate a complete HTML file based on the appropriate template.

## Command Information:
- Command Name: {COMMAND_NAME}
- Author: {AUTHOR_NAME}
- Synopsis: {SYNOPSIS}
- Primary Tag/Category: {PRIMARY_TAG}
- Tags: {TAG1}, {TAG2}, {TAG3}, {TAG4}
- Example: {EXAMPLE_CODE}

## Rules:

### 1. Template Selection
- **Short commands** (≤3 params): Use Template A (inline example format)
- **Long commands** (4+ params): Use Template B (splat example format)

### 2. Command Name Sizing
Based on the command name length, choose the appropriate size class:
- `size-small` (58px): up to 18 characters (e.g., Get-DbaDatabase)
- `size-medium` (50px): 19-26 characters (e.g., Copy-DbaDbTableData)
- `size-large` (42px): 27-34 characters (e.g., Get-DbaAgentJobOutputFile)
- `size-xl` (36px): 35+ characters

### 3. Synopsis
- Keep it to 1-2 sentences max
- If the original is longer, truncate intelligently at a sentence boundary
- The CSS will auto-truncate with ellipsis after 2 lines

### 4. Example Formatting
Choose ONE of two formats based on parameter count:

**Format A: Inline (3 or fewer parameters)**
```html
<code class="example-code"><span class="cmd">Copy-DbaDatabase</span> <span class="param">-Source</span> <span class="value">sql2014</span> <span class="param">-Destination</span> <span class="value">sql2022</span></code>
```

**Format B: Splat (4+ parameters)**
```html
<code class="example-code"><span class="var">$splat</span> <span class="eq">=</span> <span class="bracket">@{</span>
    <span class="key">SqlInstance</span> <span class="eq">=</span> <span class="value">"sql2014"</span>
    <span class="key">Job</span>         <span class="eq">=</span> <span class="value">"Daily Maintenance"</span>
    <span class="key">StepName</span>    <span class="eq">=</span> <span class="value">"Step 1"</span>
<span class="bracket">}</span>
<span class="cmd">Get-DbaAgentJobOutputFile</span> <span class="splat">@splat</span></code>
```

**Splat Alignment Rules:**
- Align all `=` signs vertically
- Use spaces (not tabs) for alignment
- Maximum 4-5 parameters in the splat
- Keep values concise - truncate long strings if needed

### 5. Author Name
- Extract just the name, no Twitter handles (@username), no URLs
- If multiple authors, use the first one
- Example: "Chrissy LeMaire" not "Chrissy LeMaire (@cl)"

### 6. Tags
- Use the first tag as the PRIMARY tag (highlighted in orange in footer)
- Include 3-4 relevant tags total in the footer
- Keep tags short (1-2 words each)
- Primary tag uses `.tag.primary` class (orange), others use `.tag` class (gray)


## Output

Generate the complete HTML file. Save it as: `social-card-{CommandName}.html`

Example filename: `social-card-Get-DbaAgentJobOutputFile.html`
```

## HTML Template (Both Short and Long Commands)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dbatools - {COMMAND_NAME}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
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
            padding: 44px 56px;
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
            color: rgba(249, 115, 22, 0.04);
            font-family: 'JetBrains Mono', monospace;
            pointer-events: none;
            user-select: none;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
            z-index: 1;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .logo {
            width: 48px;
            height: 48px;
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
            z-index: 1;
            min-height: 0;
        }

        .command-name {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            color: #f0f6fc;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 58px;
            line-height: 1.1;
        }

        .command-name.size-small { font-size: 58px; }
        .command-name.size-medium { font-size: 50px; }
        .command-name.size-large { font-size: 42px; }
        .command-name.size-xl { font-size: 36px; }

        .command-name .verb { color: #4ade80; }
        .command-name .noun { color: #f0f6fc; }

        .synopsis {
            font-size: 22px;
            color: #c9d1d9;
            line-height: 1.4;
            margin-bottom: 36px;
            max-width: 900px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .example {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 18px 24px;
            max-width: 680px;
            flex-shrink: 0;
        }

        .example-label {
            font-size: 11px;
            color: #8b949e;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            font-weight: 600;
        }

        .example-code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre;
        }

        .example-code .var { color: #ffa657; }
        .example-code .eq { color: #8b949e; }
        .example-code .bracket { color: #8b949e; }
        .example-code .key { color: #79c0ff; }
        .example-code .value { color: #a5d6ff; }
        .example-code .cmd { color: #7ee787; }
        .example-code .splat { color: #ffa657; }
        .example-code .param { color: #79c0ff; }

        .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 1;
            padding-top: 20px;
            margin-top: auto;
            border-top: 1px solid #30363d;
        }

        .tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            max-width: 70%;
        }

        .tag {
            background: rgba(139, 148, 158, 0.1);
            color: #8b949e;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
            border: 1px solid rgba(139, 148, 158, 0.2);
            white-space: nowrap;
        }

        .tag.primary {
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border-color: rgba(249, 115, 22, 0.3);
            font-weight: 600;
        }

        .url {
            font-size: 15px;
            color: #8b949e;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
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
                <!-- Author box -->
                <div class="meta-box">
                    <svg viewBox="0 0 16 16"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path></svg>
                    {AUTHOR_NAME}
                </div>
                <!-- OS compat box -->
                <div class="meta-box">
                    <svg viewBox="0 0 16 16"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5Zm-8 10H1.75a.25.25 0 0 1-.25-.25V6.5H5v8.5Z"/></svg>
                    Windows, Linux, macOS
                </div>
            </div>
        </div>

        <div class="command-section">
            <h1 class="command-name {SIZE_CLASS}">
                <span class="verb">{VERB}</span>-<span class="noun">{NOUN}</span>
            </h1>

            <p class="synopsis">{SYNOPSIS}</p>

            <div class="example">
                <div class="example-label">Example</div>
                {EXAMPLE_CODE_HTML}
            </div>
        </div>

        <div class="footer">
            <div class="tags">
                <span class="tag primary">{PRIMARY_TAG}</span>
                <span class="tag">{TAG2}</span>
                <span class="tag">{TAG3}</span>
                <span class="tag">{TAG4}</span>
            </div>
            <div class="url">
                <svg class="github-icon" viewBox="0 0 16 16"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
                dbatools.io
            </div>
        </div>
    </div>
</body>
</html>
```

## Example: Processing a Command File

Given this command file content:

```powershell
function Get-DbaAgentJobOutputFile {
    <#
    .SYNOPSIS
        Returns the Output File for each step of one or more SQL Agent Jobs with the Job Names provided dynamically.

    .DESCRIPTION
        This function returns the output file value for steps of SQL Agent Jobs...

    .NOTES
        Tags: Agent, Job, Output
        Author: Chrissy LeMaire (@cl), netnerds.net

    .EXAMPLE
        PS C:\> Get-DbaAgentJobOutputFile -SqlInstance sql2014 -Job 'Daily Maintenance', 'Weekly Backup'

        Returns the output files for the specified jobs.
    #>
}
```

**Extracted values:**
- Command Name: `Get-DbaAgentJobOutputFile`
- Author: `Chrissy LeMaire`
- Synopsis: `Returns the Output File for each step of one or more SQL Agent Jobs with the Job Names provided dynamically.`
- Primary Tag: `Agent`
- Tags: `Agent`, `Job`, `Output`
- Size Class: `size-large` (27 characters)

**Example HTML (splat format, 2 params but showing splat for demo):**
```html
<code class="example-code"><span class="var">$splat</span> <span class="eq">=</span> <span class="bracket">@{</span>
    <span class="key">SqlInstance</span> <span class="eq">=</span> <span class="value">"sql2014"</span>
    <span class="key">Job</span>         <span class="eq">=</span> <span class="value">"Daily Maintenance", "Weekly Backup"</span>
<span class="bracket">}</span>
<span class="cmd">Get-DbaAgentJobOutputFile</span> <span class="splat">@splat</span></code>
```

## Batch Processing Script

To process all commands, use this PowerShell approach:

```powershell
# Get all public commands
$commands = Get-ChildItem -Path ".\public\*.ps1"

foreach ($cmd in $commands) {
    $content = Get-Content $cmd.FullName -Raw

    # Extract command name
    $commandName = $cmd.BaseName

    # Extract synopsis
    if ($content -match '\.SYNOPSIS\s*\r?\n\s*(.+?)(?=\r?\n\s*\.)') {
        $synopsis = $Matches[1].Trim()
    }

    # Extract author (name only, no twitter/url)
    if ($content -match 'Author:\s*([^(@\r\n]+)') {
        $author = $Matches[1].Trim().TrimEnd(',')
    }

    # Extract tags
    if ($content -match 'Tags:\s*(.+)') {
        $tags = $Matches[1].Trim() -split ',\s*'
    }

    # Extract first example
    if ($content -match '\.EXAMPLE\s*\r?\n\s*PS C:\\>\s*(.+?)(?=\r?\n\s*\r?\n|\r?\n\s*\.)') {
        $example = $Matches[1].Trim()
    }

    # Output for AI processing
    [PSCustomObject]@{
        CommandName = $commandName
        Author      = $author
        Synopsis    = $synopsis
        Tags        = $tags
        Example     = $example
    }
}
```

## Taking Screenshots with Puppeteer

After generating the HTML files, use Puppeteer for automated batch screenshots.

### Quick Setup

```bash
npm install puppeteer
```

### Screenshot Script (screenshot-cards.js)

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 628;
const HTML_DIR = './static/images/social-cards';
const OUTPUT_DIR = './static/images/social-cards';

async function screenshotCards() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: CARD_WIDTH, height: CARD_HEIGHT });

    // Get all HTML files
    const htmlFiles = fs.readdirSync(HTML_DIR)
        .filter(f => f.endsWith('.html'));

    console.log(`Found ${htmlFiles.length} HTML files to process`);

    for (const htmlFile of htmlFiles) {
        const htmlPath = path.join(HTML_DIR, htmlFile);
        const pngFile = htmlFile.replace('.html', '.png');
        const pngPath = path.join(OUTPUT_DIR, pngFile);

        try {
            // Load HTML file
            await page.goto(`file://${path.resolve(htmlPath)}`, {
                waitUntil: 'networkidle0'
            });

            // Wait for fonts to load
            await page.evaluateHandle('document.fonts.ready');

            // Take screenshot
            await page.screenshot({
                path: pngPath,
                type: 'png',
                clip: { x: 0, y: 0, width: CARD_WIDTH, height: CARD_HEIGHT }
            });

            console.log(`✓ ${pngFile}`);
        } catch (err) {
            console.error(`✗ ${htmlFile}: ${err.message}`);
        }
    }

    await browser.close();
    console.log('\nDone!');
}

screenshotCards();
```

### Usage

```bash
# Run from the web directory
node screenshot-cards.js

# Or screenshot a single card
node -e "
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 628 });
    await page.goto('file://' + process.argv[1], { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({ path: process.argv[1].replace('.html', '.png') });
    await browser.close();
})();
" "./static/images/social-cards/Copy-DbaDatabase.html"
```

### PowerShell Wrapper (optional)

```powershell
# Convert-SocialCardsToPng.ps1
param(
    [string]$HtmlPath = ".\static\images\social-cards",
    [string[]]$CommandName
)

$htmlFiles = Get-ChildItem -Path $HtmlPath -Filter "*.html"

if ($CommandName) {
    $htmlFiles = $htmlFiles | Where-Object {
        $name = $_.BaseName
        foreach ($pattern in $CommandName) {
            if ($name -like $pattern) { return $true }
        }
        return $false
    }
}

foreach ($html in $htmlFiles) {
    $png = $html.FullName -replace '\.html$', '.png'
    Write-Host "Converting $($html.Name)..." -ForegroundColor Cyan

    $script = @"
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 628 });
    await page.goto('file://$($html.FullName -replace '\\', '/')', { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    await page.screenshot({ path: '$($png -replace '\\', '/')' });
    await browser.close();
})();
"@

    $script | node
    Write-Host "  Created: $($html.BaseName).png" -ForegroundColor Green
}
```

### Important Notes

- Card dimensions: **1200x628 pixels** (Twitter/X optimal)
- `networkidle0` ensures external fonts (Google Fonts) are loaded
- `document.fonts.ready` waits for font rendering
- PNG format preserves quality for social media
- The `thor.png` logo file must be in the same directory as the HTML files
