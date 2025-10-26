# Update Hugo Blog Post Titles and Migrate wp-content Images

You are updating Hugo markdown blog posts to fix title capitalization and migrate WordPress images to the correct Hugo directory structure.

## Task

Given a migrated blog post file:
1. Convert titles and subtitles to Title Case
2. Find all wp-content image references
3. Copy referenced images from WordPress directory to Hugo static directory
4. Update image paths in the markdown

## Instructions

### 1. Read the input file

Read the provided markdown file path.

### 2. Update Title Capitalization

- **Frontmatter title**: Convert to Title Case
  - Preserve acronyms (SQL, DBA, etc.)
  - Preserve brand names (dbatools, PowerShell, etc.)
  - Use proper title capitalization rules (lowercase articles, conjunctions, prepositions unless first/last word)

- **Markdown headers** (## Subtitle, ### Sub-subtitle):
  - Convert all headers to Title Case using same rules
  - Preserve code snippets in backticks unchanged

### 3. Find and Process wp-content Images

- **Scan the markdown** for all wp-content references:
  - Look for patterns like: `![alt](https://dbatools.io/wp-content/uploads/...)`
  - Look for HTML img tags: `<img src="https://dbatools.io/wp-content/uploads/...">`
  - Look for relative paths: `/wp-content/uploads/...`

- **For each wp-content reference found**:
  1. Extract the relative path after `/wp-content/`
  2. Build source path: `S:\github\old\web\wp-content\{relative-path}`
  3. Extract filename from path
  4. Build destination path: `static/images/{filename}` (root of static/images)
  5. **Copy the file** from source to destination
     - Use bash to copy: `cp "source" "destination"`
     - Handle missing source files gracefully (log warning, continue)
     - Don't overwrite if destination exists (unless filesizes differ)
  6. **Update the markdown** to reference new path:
     - Old: `https://dbatools.io/wp-content/uploads/2018/04/image.png`
     - New: `/images/image.png`

### 4. Write the updated file

- **CRITICAL: OVERWRITE the original file with the updated content**
- Use `str_replace` for targeted changes or recreate entire file
- Preserve all content exactly except for:
  - Title case conversions
  - Updated image paths
- Ensure no formatting is lost

## Example Transformation

**Before:**
```yaml
---
title: "three ways to track logins using dbatools"
date: 2018-04-10
---

## how to monitor your database

![screenshot](https://dbatools.io/wp-content/uploads/2018/04/login-tracking.png)
```

**After:**
```yaml
---
title: "Three Ways to Track Logins Using Dbatools"
date: 2018-04-10
---

## How to Monitor Your Database

![screenshot](/images/login-tracking.png)
```

**File operation:**
- Copied: `S:\github\old\web\wp-content\uploads\2018\04\login-tracking.png` → `static/images/login-tracking.png`

## Important Notes

- **Always write changes back to the file** - do not just display output
- Handle multiple images per file
- Preserve exact markdown formatting
- If image copy fails, note the error but continue processing
- Common WordPress image patterns:
  - `/wp-content/uploads/YYYY/MM/filename.ext`
  - Can be .png, .jpg, .jpeg, .gif, .webp, .svg
- Check if `static/images/` directory exists, create if needed
- If filename collision occurs in destination, check file sizes:
  - If identical size, skip copy
  - If different size, append number: `filename-2.png`

## Output

After completing the update, confirm:
- Title updated: [Old Title] → [New Title]
- Headers updated: [count]
- Images processed: [count]
  - Successfully copied: [count]
  - Failed/skipped: [count]
- File updated: [filepath]

## Error Handling

- Missing source images: Log warning, update path anyway (may be handled separately)
- Failed file copies: Log error, continue with remaining images
- Permission errors: Report clearly with full paths