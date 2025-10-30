Audit and update this dbatools blog post. The blog covers dbatools, a PowerShell module for SQL Server automation.

CONTEXT:
- dbatools maintains backward compatibility: supports PowerShell 3+ and SQL Server 2000+
- The module has evolved significantly with 600+ commands and 7.5M+ downloads
- Current year is 2025
- Local blog repository is at C:\github\blog
- dbatools repository is available locally for reference

IMPORTANT: THIS TASK REQUIRES NUANCE

Updating old blog posts is not a mechanical find-and-replace operation. These posts are historical documents that capture:
- What was true at the time they were written
- The author's voice and communication style
- The context of the SQL Server/PowerShell ecosystem at that moment
- Teaching approaches that may have been intentionally simplified for the audience

Exercise judgment throughout. When in doubt:
- Preserve the original rather than "improving" it
- Fix actual problems (broken links, wrong info) not stylistic preferences
- Ask yourself: "Does this change make the post more accurate/useful, or just different?"
- Remember that "old" doesn't mean "wrong" - many posts are intentionally timeless

The goal is to maintain the blog's integrity while fixing genuine issues, not to rewrite history or impose 2025 standards on 2016 content.

CHECK AND FIX:

1. FRONTMATTER:
   - If you make any substantive changes to the post, add or update the lastmod field with today's date
   - Format: lastmod: 2025-10-29
   - Place it after the date field in the frontmatter
   - Do NOT add lastmod if you only fixed minor things like a single broken link

2. LINKS:
   - Test all external links, replace dead/broken ones
   - Update Microsoft Docs URLs if they've been reorganized
   - Fix any broken internal links or image references
   - Update any links to GitHub code if paths have changed
   - For any remote images (including Twitter/X hosted images):
     * Download the image to the static/images directory
     * Update the markdown to reference the local path
     * Use descriptive filenames based on the post content

3. TWITTER/X CONTENT:
   - Remove all Twitter embeds and links
   - Convert tweets to concise paraphrased statements like "Jeffrey Snover once tweeted that..."
   - Do NOT quote tweets verbatim
   - Summarize the key point being made
   - Replace Twitter profile links for @psdbatools or similar with https://bsky.app/profile/dbatools.io

4. CODE EXAMPLES:
   - Leave T-SQL code blocks alone - don't change them
   - For PowerShell code blocks with commands that have more than 3 parameters, consider converting to splatting format
   - SPLATTING REQUIRES NUANCE:
     * DO convert when: 4+ parameters in a reusable example/template, part of a script where readability matters, teaching proper practices
     * DO NOT convert when: quick one-liner demo, interactive console usage, showing ad-hoc usage, would make example less clear for beginners, post's tone is casual and splatting feels overly formal, showing "quick win" commands where simplicity is the point
     * Example to convert: `$params = @{ SqlInstance = 'sql01'; Database = 'master'; ExcludeSystem = $true }; Get-DbaDatabase @params`
     * When in doubt, preserve the original format - the author chose that style for a reason
   - Verify command syntax is still valid in current dbatools
   - Check if parameters have been renamed or deprecated
   - Remove any hardcoded credentials, server names, or sensitive paths
   - Ensure examples still work with PS3+ and SQL Server 2000+

5. POWERSHELL SCREENSHOTS (CRITICAL):
   - Find any embedded PowerShell console screenshots (typically old blue Windows PowerShell screenshots)
   - Extract the PowerShell commands and output from these screenshots
   - Replace screenshots with the powershell-console shortcode:

   {{< powershell-console >}}
   PS C:\> Your-Command
   Output goes here
   {{< /powershell-console >}}

   - The shortcode automatically handles syntax highlighting for:
     * PS prompts (PS C:\>)
     * Commands
     * Property/value pairs (Property : Value)
     * Status keywords (Success, Failed, True, False, etc.)
     * Table headers and output
   - You can optionally specify a custom title: {{< powershell-console title="PowerShell 5.1" >}}
   - Do NOT convert regular markdown code blocks to this format
   - ONLY convert actual screenshot images to this shortcode format
   - Preserve the exact text from the screenshot including prompts, commands, and output

   TABLE ALIGNMENT IN POWERSHELL OUTPUT (CRITICAL):
   - PowerShell tables within {{< powershell-console >}} blocks MUST have properly aligned columns
   - Use monospace spacing - treat it like a grid where every character position matters
   - Process:
     * Identify all column headers (e.g., SqlInstance, JobName, LastRunDate, etc.)
     * Determine the width needed for each column based on the longest value
     * Add consistent spacing (typically 2 spaces minimum) between columns
     * Ensure header separator lines (----) match the column header width
     * Align all data rows to match the column positions

   Example of PROPER alignment:
   ```
   SqlInstance  JobName                                    LastRunDate               LastRunOutcome  IsEnabled
   -----------  -------                                    -----------               --------------  ---------
   MSSQLSERVER  DatabaseIntegrityCheck - USER_DATABASES    2017/04/13 12:00:00 AM    Failed          True
   MSSQLSERVER  DatabaseBackup - USER_DATABASES - FULL     2017/03/27 12:00:00 AM    Failed          True
   ```

   Example of IMPROPER alignment (DO NOT DO THIS):
   ```
   SqlInstance JobName              LastRunDate      LastRunOutcome IsEnabled
   ----------- -------              -----------      -------------- ---------
   MSSQLSERVER MSSQLSERVER 2017/04/13 12:00:00 AM Failed         True
   ```

   - The smaller font size (text-xs) and tighter spacing make proper alignment critical
   - Misaligned columns will look cramped and unprofessional
   - Take time to ensure each column vertically aligns under its header
   - HOW TO CHECK: After fixing, visually scan down each column - you should be able to draw a straight vertical line through each column from header to the last data row

6. TECHNICAL ACCURACY:
   - TIMELESS TOPICS (SQL Server features, agent jobs, backups, migrations, etc.):
     * Update "coming soon" or "beta" references if those features have now shipped
     * Note any workarounds for bugs that have since been fixed
     * Flag any security practices that have evolved

   - DBATOOLS-SPECIFIC CONTENT (releases, command counts, project milestones):
     * Leave version numbers and statistics exactly as written - they're historical facts
     * DO NOT update download counts, command counts, or version-specific announcements
     * These posts document what was true at that moment in time

   - EXCEPTION - ONGOING DBATOOLS PRACTICES:
     * Some dbatools-specific content IS worth updating if it's about ongoing practices
     * Topics like code signing, security processes, PowerShell Gallery presence, how the team operates
     * If the post is ABOUT one of these ongoing practices (like security or signing), DO research and update
     * Check blog.netnerds.net for current information about dbatools practices
     * You can copy files from the dbatools repository if needed for reference or to replace outdated content
     * If there are relevant screenshots in C:\github\blog, reuse those instead of old ones
     * Use judgment: "how we do things" = update if changed; "what happened in 2018" = leave it
     * Example: "We code sign our releases" = ongoing practice, update if changed
     * Example: "Six people can merge code" = historical trivia, leave it

PRESERVE:
- Original writing style and voice
- All T-SQL code blocks exactly as-is
- Working code (don't modernize just for syntax preferences)
- Historical context and perspective
- Post structure and flow

OUTPUT:
- Updated markdown file with changes
- Brief summary of what you changed and why
- Note if you added/updated lastmod in the frontmatter
- Note any PowerShell screenshots you found and converted to shortcode format
- Note any code examples converted to splatting format
- List any issues you couldn't fix automatically

NOTES:
- No need to change dbatools.io/slack to sqlps.io/slack. That link is valid and fine, skip it.
- Do not make backups unless you need them for something, I use git for source control.
- If you remove someone's twitter link, check if they have a Bluesky profile and link that instead. If not, try to figure out their blog and link that instead.
- If we're referring to a dbatools command that no longer works, such as Connect-DbaSqlInstance, which is now Connect-DbaInstance, try to find what we were referring to.
- "dbatools" is allowed to be capitalized as "Dbatools" when it's used within a command name like Invoke-DbatoolsRenameHelper (follows PowerShell PascalCase conventions for cmdlet names).
- The current docs location is dbatools.io/{commandname} so like dbatools.io/Get-DbaDatabase
- Dot not expand dbatools shortlinks