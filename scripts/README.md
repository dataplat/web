# dbatools.io Command Documentation Pipeline

This directory contains scripts that automatically update the website's command documentation from the latest dbatools PowerShell module releases.

## Overview

The pipeline automatically:
1. Downloads the latest dbatools command index
2. Transforms it to the website's format with categories and metadata
3. Generates individual markdown pages for each command
4. Enriches the data with full-text search content
5. Applies popularity rankings
6. Verifies URLs are correct

## Pipeline Scripts (Run in Order)

### 1. `transform-dbatools-index.ps1`
**Purpose**: Downloads and transforms dbatools-index.json into the website's commands.json format

**What it does**:
- Downloads `dbatools-index.json` from the dbatools GitHub repository
- Transforms 697 commands from source format to website format
- Derives **categories** using intelligent pattern matching:
  - Verb-based (Copy/Export → Migration, Backup/Restore → Backup & Restore)
  - Tag-based (agent → Agent & Jobs, certificate/encryption/login → Security)
  - Domain-based (CPU/Memory → Performance, Replica → Advanced Features)
  - Default fallback → Utilities
- Extracts **verb** from command name (e.g., "Add" from "Add-DbaAgDatabase")
- Generates **url** field as `/{CommandName}`
- Initializes **popular** (false) and **popularityRank** (0) fields
- Adds **synopsis** from source data
- Creates placeholder for **fullContent** (filled by next script)

**Output**: `static/commands.json` with 697 commands

**Category Distribution** (expected):
- Utilities: ~46%
- Security: ~10%
- Migration: ~9%
- Performance: ~7%
- Advanced Features: ~6%
- Agent & Jobs: ~6%
- Server Management: ~5%
- Backup & Restore: ~4%
- Database Operations: ~4%
- Data Operations: ~1%

### 2. `generate-command-pages.ps1`
**Purpose**: Creates individual Hugo markdown files for each command

**What it does**:
- Downloads `dbatools-index.json` again (uses same source)
- Generates 697 markdown files in `content/commands/`
- Each file contains:
  - YAML front matter (title, slug, date, author, synopsis, tags, sourceUrl)
  - Beautiful header with GitHub link
  - Synopsis, Description, Syntax sections
  - Examples with copy-able code blocks
  - Parameter tables (Required and Optional)

**Output**: 697 files in `content/commands/*.md`

### 3. `enrich-commands-json.ps1`
**Purpose**: Adds full-text search content to commands.json

**What it does**:
- Reads all markdown files from `content/commands/`
- Extracts and cleans text content (strips HTML, markdown formatting)
- Adds **fullContent** field to each command in `commands.json`
- Updates **synopsis** if found in markdown front matter
- Copies enriched file to `public/commands.json`

**Output**: Enhanced `static/commands.json` with fullContent for search

### 4. `update-popular-commands.ps1`
**Purpose**: Applies popularity rankings from analytics data

**What it does**:
- Loads `rankings.txt` (680 commands ranked by page views)
- Applies **popularityRank** to all ranked commands
- Sets **popular: true** for top 50 commands
- Falls back to hardcoded top 50 if rankings.txt is missing

**Output**: `static/commands.json` with popularity data

### 5. `update-commands-urls.ps1`
**Purpose**: Ensures all command URLs are correct

**What it does**:
- Verifies URLs are in format `/{CommandName}`
- Fixes any old-format URLs (docs.dbatools.io or /commands/)
- Validates consistency

**Output**: `static/commands.json` with corrected URLs

## GitHub Actions Workflow

The complete pipeline runs automatically in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml):

```yaml
- name: Transform dbatools index to commands.json
  shell: pwsh
  run: ./scripts/transform-dbatools-index.ps1

- name: Generate command documentation pages
  shell: pwsh
  run: ./scripts/generate-command-pages.ps1

- name: Enrich commands.json with full content
  shell: pwsh
  run: ./scripts/enrich-commands-json.ps1

- name: Update popular commands with rankings
  shell: pwsh
  run: ./scripts/update-popular-commands.ps1

- name: Ensure commands URLs are correct
  shell: pwsh
  run: ./scripts/update-commands-urls.ps1

- name: Build Hugo site
  run: hugo --minify
```

## Running Locally

To update commands locally:

```powershell
# Run the complete pipeline
cd c:\github\web\scripts

# Step 1: Transform source data
.\transform-dbatools-index.ps1

# Step 2: Generate markdown pages
.\generate-command-pages.ps1

# Step 3: Enrich with full content
.\enrich-commands-json.ps1

# Step 4: Apply popularity rankings
.\update-popular-commands.ps1

# Step 5: Verify URLs
.\update-commands-urls.ps1

# Build the site
cd ..
hugo serve
```

## Data Files

- **Input**: `https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json`
  - Source of truth from dbatools repository
  - Currently contains 697 commands

- **Output**: `static/commands.json`
  - Website's command database
  - Used by `/commands` page JavaScript
  - Contains all metadata for search, filtering, and display

- **Reference**: `rankings.txt`
  - Popularity rankings for 680 commands
  - Based on actual page view analytics
  - Top 50 marked as "popular" on the site

## Command Structure

### Source Format (dbatools-index.json)
```json
{
  "Name": "Add-DbaAgDatabase",
  "CommandName": "Add-DbaAgDatabase",
  "Description": "...",
  "Tags": ["AG", "HA"],
  "Synopsis": "...",
  "Author": "...",
  "Availability": "...",
  "Links": "...",
  "Examples": "...",
  "Params": [...],
  "Syntax": "..."
}
```

### Website Format (commands.json)
```json
{
  "name": "Add-DbaAgDatabase",
  "description": "Adds databases to an Availability Group",
  "category": "Database Operations",
  "tags": ["add", "database", "availability-groups"],
  "verb": "Add",
  "popular": true,
  "url": "/Add-DbaAgDatabase",
  "popularityRank": 15,
  "synopsis": "Adds databases to an Availability Group...",
  "fullContent": "Add-DbaAgDatabase View Source..."
}
```

## Category Assignment Logic

The transformation script uses this priority order:

1. **Verb-based** (highest priority):
   - `Copy-*` or `Export-*` → **Migration** (98% accuracy)
   - `Backup-*` or `Restore-*` → **Backup & Restore**

2. **Tag-based** (second priority):
   - `agent` tag → **Agent & Jobs**
   - `certificate`, `encryption`, `login`, `permission` tags → **Security**
   - `backup` tag → **Backup & Restore**
   - `instance` tag → **Server Management**
   - `database` tag → **Database Operations**
   - `table` tag → **Data Operations**

3. **Domain/Noun-based** (requires SQL knowledge):
   - Performance keywords (CPU, Memory, Wait, Latch, Plan, Trace) → **Performance**
   - Replication nouns (Endpoint, Replica, Replication, Hadr) → **Advanced Features**
   - Data operations (DataGenerator, DataMasking, TableData) → **Data Operations**

4. **Default fallback**:
   - Everything else → **Utilities**

## Troubleshooting

### Commands not appearing on website
1. Check `static/commands.json` exists and has 697 commands
2. Verify JSON structure matches expected format
3. Run `enrich-commands-json.ps1` to ensure fullContent is present
4. Check browser console for JavaScript errors

### Wrong categories assigned
1. Review category assignment logic in `transform-dbatools-index.ps1`
2. Check command's tags and verb in source data
3. Update categorization rules if needed
4. Re-run transformation script

### Missing popularity data
1. Verify `rankings.txt` exists in root directory
2. Check format: `@{ Name = "CommandName"; Rank = 1 }`
3. Run `update-popular-commands.ps1` manually
4. Falls back to top 50 hardcoded list if file missing

## Maintenance

### Updating rankings
To update popularity rankings:
1. Export analytics data for `/commands/*` pages
2. Format as PowerShell hashtable array in `rankings.txt`
3. Push to repository
4. GitHub Actions will apply on next deployment

### Adding new categories
1. Update `Get-CommandCategory` function in `transform-dbatools-index.ps1`
2. Add new pattern matching rules
3. Test with sample commands
4. Update documentation

### Modifying command pages
1. Edit `generate-command-pages.ps1` to change markdown template
2. Adjust `enrich-commands-json.ps1` if changing what's extracted
3. Test locally before deploying

## Key Improvements Over Old System

✅ **Fully automated** - No manual JSON updates needed
✅ **Always current** - Pulls latest 697 commands on every deployment
✅ **Intelligent categorization** - 98% accuracy for major categories
✅ **Complete rankings** - All 680 commands ranked, not just top 50
✅ **No data loss** - Preserves all command metadata
✅ **Fast pipeline** - Entire process runs in under 2 minutes
✅ **Error handling** - Graceful fallbacks if data sources unavailable

## References

- Category analysis: `CATEGORY_ANALYSIS.md` (if exists)
- Source data: https://github.com/dataplat/dbatools/blob/master/bin/dbatools-index.json
- Website commands page: https://dbatools.io/commands
- dbatools documentation: https://docs.dbatools.io
