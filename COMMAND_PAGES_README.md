# Command Pages Structure

This document explains how command pages work in the dbatools website.

## Two Different Types of Command Pages

### 1. Commands Listing Page (`/commands`)
**URL**: `https://dbatools.io/commands`
**What it does**: Shows a searchable, filterable grid of ALL commands

**Files:**
- **Template**: `themes/dbatools2025/layouts/page/commands.html`
- **CSS**: `static/css/commands-page.css`
- **JS**: `static/js/commands-page.js`
- **Data**: `static/commands.json`

### 2. Individual Command Pages (e.g., `/Add-DbaAgDatabase`)
**URL**: `https://dbatools.io/Add-DbaAgDatabase`
**What it does**: Shows documentation for a single command with sidebar navigation

**Files:**
- **Template**: `themes/dbatools2025/layouts/commands/single.html`
- **CSS**:
  - `static/css/command-single.css` (sidebar, layout, filters)
  - `static/css/command-docs.css` (article content styling)
- **Data**: `static/commands.json` (used by sidebar JS)

## Important Notes

### Hugo Layout Precedence
Hugo automatically uses `layouts/commands/single.html` for individual command pages because:
1. Content files are in `content/commands/*.md`
2. Hugo looks for `layouts/commands/single.html` first
3. If not found, it would fall back to `layouts/_default/single.html`

### DO NOT Create These Files (They Will Cause Confusion)
- ❌ `layouts/page/command-detail.html` - NOT USED
- ❌ `static/css/command-detail.css` - NOT USED

### Editing Command Pages

**To edit the commands listing page:**
- Modify: `themes/dbatools2025/layouts/page/commands.html`
- CSS: `static/css/commands-page.css`
- JS: `static/js/commands-page.js`

**To edit individual command pages:**
- Modify: `themes/dbatools2025/layouts/commands/single.html`
- CSS: `static/css/command-single.css` or `static/css/command-docs.css`
- No separate JS file (inline in template)

## Rebuilding After Changes

### If you modified templates (`.html` files):
```bash
# Restart Hugo server
npm run dev
# Then hard refresh browser (Ctrl+Shift+R)
```

### If you modified CSS files:
```bash
# For Tailwind changes:
npm run build:css

# For regular CSS changes (command-single.css, commands-page.css, etc.):
# Just hard refresh browser (Ctrl+Shift+R)
# Hugo dev server auto-reloads static files
```

### If you modified JavaScript files:
```bash
# Just hard refresh browser (Ctrl+Shift+R)
# Hugo dev server auto-reloads static files
```

## Quick Reference

| Page Type | Template | CSS | JS |
|-----------|----------|-----|-----|
| `/commands` listing | `page/commands.html` | `commands-page.css` | `commands-page.js` |
| Individual command | `commands/single.html` | `command-single.css`<br>`command-docs.css` | Inline in template |

## CSS File Purposes

- **commands-page.css**: Grid layout, command cards, filters for listing page
- **command-single.css**: Sidebar, search, filters for individual command pages (NO SCROLLBAR)
- **command-docs.css**: Article content (headings, code blocks, tables) for individual command pages
