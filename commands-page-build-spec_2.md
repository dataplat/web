# dbatools Commands Page: Build Spec for AI Coding Assistant

## Overview
Build a single-page command browser/index for dbatools.io with smart search, filtering, and visual polish. This is the landing page that helps users discover and navigate to existing command documentation pages at docs.dbatools.io/*.html. Modern, fast, no bullshit.

## Technical Stack
- **Framework**: Static HTML/CSS/JS (or React if you prefer)
- **Search**: Client-side with Fuse.js for fuzzy matching
- **Data**: JSON file with all commands + metadata
- **Style**: Clean, developer-focused, dark mode optional
- **Performance**: Lazy load command cards, instant search feedback

## Page Layout

### Header Section
```
┌─────────────────────────────────────────────────────────┐
│  dbatools Commands                                      │
│  PowerShell tools for SQL Server automation             │
│                                                          │
│  [Search: Find any command...]                   🔍     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Main Content Area

**Left Sidebar (20% width, sticky)**
```
Categories
□ All Commands (697)
□ Backup & Restore (45)
□ Migration (38)
□ Security (81)
□ Performance (67)
□ Database Ops (37)
□ Server Management (75)
□ Data Operations (29)
□ Agent & Jobs (24)
□ Advanced Features (51)

Actions (multi-select)
□ Get (retrieve info)
□ Set (configure)
□ Copy (migrate)
□ Test (validate)
□ Invoke (execute)
□ New (create)
□ Remove (delete)
□ Export/Import

🌟 Popular Commands
```

**Main Content (80% width)**
```
┌────────────────────────────────────────────┐
│  Showing 697 commands                      │
│  [Sort: Alphabetical ▼]                    │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Backup-DbaDatabase              ⭐   │ │
│  │ Creates database backups with...     │ │
│  │ #backup #database                    │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Copy-DbaDatabase                ⭐   │ │
│  │ Copies databases between servers     │ │
│  │ #migration #database                 │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [More command cards...]                   │
│                                            │
└────────────────────────────────────────────┘
```

## Data Structure

### commands.json
```json
[
  {
    "name": "Backup-DbaDatabase",
    "description": "Creates database backups with flexible options for full, differential, and log backups",
    "category": "Backup & Restore",
    "tags": ["backup", "database", "disaster-recovery"],
    "verb": "Backup",
    "popular": true,
    "url": "https://docs.dbatools.io/Backup-DbaDatabase.html"
  },
  {
    "name": "Copy-DbaLogin",
    "description": "Migrates SQL Server logins between instances including passwords and permissions",
    "category": "Migration",
    "tags": ["migration", "security", "login"],
    "verb": "Copy",
    "popular": true,
    "url": "https://docs.dbatools.io/Copy-DbaLogin.html"
  }
  // ... all 697 commands
]
```

## Feature Requirements

### 1. Instant Search (Primary Feature)
- **As user types**: Filter results in real-time, no delay
- **Fuzzy matching**: "bakup" finds "Backup-DbaDatabase"
- **Search across**: Command name, description, tags
- **Highlight**: Match terms in results
- **Empty state**: "No commands found. Try different keywords."
- **Clear button**: X icon to reset search

**Search Examples to Test:**
- "backup" → shows all backup-related commands
- "copy database" → Copy-DbaDatabase, Copy-DbaDbTableData, etc.
- "migrate logins" → Copy-DbaLogin, Export-DbaLogin, Sync-DbaLoginPermission
- "performance" → all perf monitoring commands
- "availabilty" (typo) → still finds Availability Group commands

### 2. Category Filtering
- **Click category**: Show only those commands, update count
- **Visual feedback**: Selected category highlighted
- **URL state**: `/commands?category=backup-restore` (shareable links)
- **Combine with search**: Can search within a category

### 3. Action Filter (Multi-Select)
- **Checkboxes**: Multiple actions can be selected
- **Logic**: Show commands matching ANY selected action (OR logic)
- Example: Select "Copy" + "Export" → shows Copy-DbaDatabase, Export-DbaLogin, etc.
- **Clear filters**: "Reset" button to start fresh

### 4. Popular Commands Badge
- Mark commands with `popular: true` in JSON
- Show ⭐ icon on popular command cards
- "Popular Commands" quick filter in sidebar shows only starred commands
- Popular = roughly top 50 by usage (you'll define this in the JSON)

### 5. Command Cards
Each card should display:
- **Command name** (large, bold)
- **One-line description** (concise, scannable)
- **Tags** (small pills/chips, subtle color)
- **Popular badge** (⭐ if applicable)
- **Hover effect**: Slight elevation, cursor pointer
- **Click**: Links to individual command page

**Card Design Notes:**
- Keep it minimal, lots of whitespace
- Use monospace font for command names
- Tags should be subtle, not distracting
- Grid layout: 1 column on mobile, 2 columns on tablet, 3 columns on desktop

### 6. Sorting Options
Dropdown in header:
- Alphabetical (default)
- Popular first (starred commands at top)
- Category (grouped)

### 7. Performance Optimizations
- **Virtual scrolling** or **lazy loading**: Don't render all 697 cards at once
- **Debounce search**: Wait 150ms after user stops typing
- **Memoize filters**: Cache filtered results
- **Fast initial load**: Render above-fold content first

### 8. Responsive Design
- **Mobile (<768px)**: Single column, collapsible sidebar (hamburger menu)
- **Tablet (768-1024px)**: 2 column grid
- **Desktop (>1024px)**: 3 column grid with persistent sidebar

## Visual Style

### Color Palette (Suggestions)
```
Background: #0f1419 (dark) or #ffffff (light)
Cards: #1a1f2e (dark) or #f8f9fa (light)
Primary accent: #3b82f6 (blue)
Text: #e5e7eb (dark) or #1f2937 (light)
Command names: #10b981 (green, for PowerShell vibe)
Tags: #6b7280 (gray, subtle)
```

### Typography
- **Headers**: Inter or System UI font, 600 weight
- **Command names**: JetBrains Mono or Fira Code (monospace)
- **Body**: Inter or System UI, 400 weight
- **Size scale**: 14px body, 20px command name, 32px page title

### Spacing
- Card padding: 20px
- Grid gap: 24px
- Section spacing: 40px
- Generous whitespace everywhere

## Edge Cases to Handle

1. **No search results**: Show helpful message, suggest browsing categories
2. **Slow connection**: Show loading state, skeleton cards
3. **URL with invalid category**: Redirect to all commands
4. **Multiple filters active**: Clear indication of what's filtered, easy to reset
5. **Very long command names**: Truncate gracefully, full name on hover
6. **Mobile keyboard**: Search input doesn't get hidden behind virtual keyboard

## Optional Enhancements (If You Have Time)

### Keyboard Shortcuts
- `/` to focus search
- `Esc` to clear search
- Arrow keys to navigate results
- `Enter` to open focused command

### Recent Searches
Store last 5 searches in localStorage, show as suggestions when search is focused

### "Did you mean?"
If search has no results but is close to a valid term, suggest: "Did you mean 'backup'?"

### Analytics Event Tracking (Optional)
If you want to track usage:
- Search terms entered
- Categories clicked
- Commands viewed
- Filters applied

## Implementation Steps for AI Coding Assistant

1. **Set up project structure**
   - Create HTML file with semantic markup
   - Link CSS file for styles
   - Link JS file for functionality
   - Create commands.json data file

2. **Build static layout first**
   - Header with search bar
   - Sidebar with categories and filters
   - Main content area with sample command cards
   - Test responsive breakpoints

3. **Implement search functionality**
   - Install/include Fuse.js library
   - Create search handler with debouncing
   - Filter command array based on search term
   - Re-render cards with filtered results
   - Highlight matched terms

4. **Add category filtering**
   - Click handlers on category items
   - Filter commands by selected category
   - Update URL with query param
   - Update "Showing X commands" counter

5. **Add action filters (multi-select)**
   - Checkbox handlers
   - Filter logic for multiple selected actions
   - Combine with other active filters

6. **Implement sorting**
   - Dropdown change handler
   - Sort functions for each option
   - Re-render sorted results

7. **Add popular badge feature**
   - Read `popular` flag from JSON
   - Conditionally render ⭐ icon
   - "Popular Commands" quick filter

8. **Polish and optimize**
   - Add loading states
   - Implement virtual scrolling or pagination
   - Test on different screen sizes
   - Smooth animations for filter changes

9. **Test thoroughly**
   - Search with various queries
   - Try all filter combinations
   - Test on mobile device
   - Check performance with all 697 commands

## Example Prompts for Your AI Coding Assistant

**Initial build:**
"Create an HTML page with a search bar, left sidebar with categories, and a grid of cards displaying command names and descriptions. Use the attached commands.json file for data. Make it responsive and modern-looking."

**Add search:**
"Implement real-time search using Fuse.js that filters the command cards as I type. Search should match against command names, descriptions, and tags. Add debouncing so it doesn't re-render on every keystroke."

**Add filters:**
"Add multi-select checkboxes for 'Actions' that filter commands by verb (Get, Set, Copy, etc.). Multiple actions can be selected at once. Update the results when filters change."

**Polish:**
"Add smooth transitions when cards appear/disappear during filtering. Add a loading skeleton for initial page load. Make sure it looks great in dark mode."

## Commands JSON File

I'll generate this with the proper structure including:
- All 697 command names
- One-line descriptions for each
- Category assignments
- Tags extracted from command names
- Verbs extracted from command names
- Popular flag for top 50 commands

You'll get this as a separate JSON file to use in your implementation.

## Success Criteria

✅ User can find any command in under 5 seconds
✅ Search is instant (no lag)
✅ Filters work correctly in combination
✅ Page loads fast (<2s on slow connection)
✅ Works perfectly on mobile
✅ Looks professional and polished
✅ No JavaScript errors in console
✅ URL is shareable (preserves filters/category)

Build this and you'll have the best command reference in the PowerShell ecosystem. Clean, fast, useful.
