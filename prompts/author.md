# Add Author to Migrated Hugo Blog Post

You are updating a Hugo markdown blog post to add missing author information.

## Task

Given a migrated blog post file, add the correct author to the frontmatter.

## Instructions

1. **Read the input file** provided in the prompt

2. **Check existing frontmatter** for author field
   - If author already exists and is not empty, EXIT - no changes needed
   - If author is missing or empty, proceed

3. **Determine the author** using this hierarchy:

   **Method 1: Analyze content**
   - Check for signature at end of post (e.g., "Chrissy", "- Rob", etc.)
   - Look for first-person references that might indicate author
   - Check for bylines near the title

   **Method 2: Search dbatools.io website**
   - Extract the slug from the frontmatter (the `slug:` field)
   - Use web_fetch to retrieve `https://dbatools.io/{slug}/`
   - Parse the HTML for author information:
     - Look for `<meta name="author">` tags
     - Look for byline elements (class="author", class="byline", etc.)
     - Look for "Posted by" or "Written by" text
     - Check for author links or profile references

   **Method 3: Default handling**
   - If no author can be determined, set author to `"dbatools team"`

4. **Update the frontmatter**
   - Add `author: "Author Name"` after the `date:` field
   - Maintain proper YAML formatting
   - Preserve all existing frontmatter fields
   - Keep proper indentation and spacing

5. **Write the updated file**
   - **CRITICAL: OVERWRITE the original file with the updated content**
   - Use `str_replace` or recreate the entire file
   - Preserve all content exactly except for the added author field
   - Ensure no formatting is lost

## Example frontmatter structure

```yaml
---
title: "Three ways to track logins using dbatools"
date: 2018-04-10
author: "Chrissy LeMaire"
slug: "track-logins"
aliases:
  - /track-logins/
  - /track-logins/index.html
categories: [announcements]
tags: [party]
draft: false
---
```

## Important notes

- **Always write changes back to the file** - do not just display output
- If fetching from dbatools.io fails or times out, proceed with content analysis or default
- Common dbatools authors include: Chrissy LeMaire, Rob Sewell, Claudio Silva, Jess Pomfret, and others
- The author field should be a string, not a list
- Preserve exact formatting of the rest of the file

## Output

After completing the update, confirm:
- Author added: [Author Name]
- File updated: [filepath]
- Method used: [content analysis / website fetch / default]