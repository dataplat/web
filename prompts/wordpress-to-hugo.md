# WordPress to Hugo Markdown Migration

You are converting WordPress posts to Hugo-compliant markdown files.

## IMPORTANT: Skip Non-Blog Content

**STOP and return "SKIP: Not a blog post" if:**
- The page is a listing/archive (shows multiple posts, pagination links, or category/tag listings)
- The URL contains `/page/`, `/category/`, `/tag/`, `/author/`, or `/policies/`
- The file is a date archive (YYYY or YYYY/MM directories with no day - these list posts by month/year)
- It's a pagination page (previous/next navigation between multiple posts)
- It doesn't have actual blog post content (title, body, publication date)

**ONLY process if:**
- It's a single blog post or blog page (date-based like YYYY/MM/DD or slug-based like `/post-name/`)
- It has actual content (title, body text, publish date)
- It's not a listing, archive, category, or pagination page

## Instructions:

**CRITICAL: CREATE A NEW MARKDOWN FILE with the converted content. Save it with a .md extension in the same directory as the source file.**

1. **Check if it's a blog post** (see SKIP rules above)
   - If not a blog post, return "SKIP: Not a blog post" immediately and DO NOT create a file

2. **Parse the input**: This is a WordPress post (HTML or mixed HTML/text) and its file path

3. **Extract metadata**:
   - Title (from post title or h1)
   - Date (if available, format as YYYY-MM-DD)
   - Categories/Tags (if present)
   - **Original URL path from the file path provided** - this will become the alias

4. **Convert to Hugo Markdown**:
   - Create YAML frontmatter at the top:
```yaml
     ---
     title: "Post Title Here"
     date: YYYY-MM-DD
     slug: "post-slug-here"
     aliases:
       - /original/wordpress/path/
       - /original/wordpress/path/index.html
     categories: [category1, category2]
     tags: [tag1, tag2]
     draft: false
     ---
```
   - **For aliases**: Parse the file path to extract the WordPress URL structure
     - Example: If file is `2023/05/15/my-post/index.html`, aliases should be `/2023/05/15/my-post/` and `/2023/05/15/my-post/index.html`
     - Include both trailing-slash and index.html versions to catch all redirects
     - Remove any leading domain names, keep only the path portion

5. **HTML to Markdown conversion**:
   - Convert ALL HTML to proper Markdown:
     - `<p>` → plain text with blank lines
     - `<h1>`, `<h2>`, etc → `#`, `##`, etc
     - `<strong>`, `<b>` → `**text**`
     - `<em>`, `<i>` → `*text*`
     - `<a href="url">text</a>` → `[text](url)`
     - `<img src="url" alt="text">` → `![text](url)` (preserve images exactly as referenced)
     - `<code>` → backticks or code blocks
     - `<pre>` → triple backtick code blocks
     - `<ul>`, `<ol>` → markdown lists
     - `<blockquote>` → `> quote`
     - `<table>` → markdown tables
     - `<hr>` → `---`
     - Remove all other HTML tags

6. **Handle WordPress-specific content**:
   - WordPress shortcodes: Leave as HTML comments for manual review (e.g., `<!-- [gallery ids="1,2,3"] -->`)
   - Embedded media: Preserve as-is for manual review
   - Remove WordPress classes and IDs from elements
   - Remove empty paragraphs

7. **Image handling**:
   - Keep image references as-is: `![alt text](image-url)`
   - Note: Images should be moved to `/static/images/` separately
   - If image URLs are from WordPress CDN, preserve the full URL

8. **Clean up and validate**:
   - Ensure proper spacing between sections
   - Verify all links are properly formatted
   - Check image syntax is correct
   - Remove any remaining HTML artifacts

9. **DETERMINE OUTPUT LOCATION AND SAVE THE FILE**:
   - Analyze the content to determine if this is:
     - **Blog post**: Has publish date, tags/categories, or is news/announcement content → Save to: [OUTPUT_BASE]/post/
     - **Static page**: About, contact, getting-started, documentation, policy pages → Save to: [OUTPUT_BASE]/page/

   - **File naming**:
     - Use the slug from the original URL path as the filename (provided in the prompt)
     - Save as `[slug].md` directly in the post/ or page/ directory
     - Example: For slug `getting-started`, create `[OUTPUT_BASE]/page/getting-started.md`

   - **CREATE THE FILE**:
     - Create necessary subdirectories if they don't exist
     - Write the complete markdown content with frontmatter
     - DO NOT just output the content - WRITE IT TO A FILE
```

**Result:**
```
content/
├── post/
│   ├── _index.md
│   ├── dbatools-1-0-progress.md
│   ├── happy-belated-world-backup-day.md
│   └── introducing-dbachecks.md
└── page/
    ├── contact.md
    ├── getting-started.md
    └── team.md