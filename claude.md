# Notes for Claude

This is the dbatools.io website — a Hugo static site with Tailwind CSS.

## Commands page pipeline

### What it is
The `/commands` page and all individual `/{CommandName}` pages are built from
data pulled out of the dbatools PowerShell module's GitHub repo. The pipeline runs automatically via `.github/workflows/deploy.yml` in this same repo
(`dataplat/web`) on every push to `main` or `html`, and can be re-run locally at any time.

### Related repos (do not confuse)
- `dataplat/docs` — the **legacy** `docs.dbatools.io` site. Separate repo, separate CI
  (`update-assets.yml`, triggered by `repository_dispatch`). Generates raw `.html` files
  via `assets/templates/to_md.ps1`. Nothing in `dataplat/web` reads from it.
- `dataplat/dataplat.github.io` — stores raw data assets (builds ref, dbatools-index)
  pulled daily from the dbatools `development` branch. Feeds the `/builds` page, not
  the commands pipeline. The commands pipeline fetches directly from `dataplat/dbatools`
  `master` branch at build time — it does not use the cached copy here.

### Source of truth
```
https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json
```
(also used from the `development` branch by `generate-command-pages.ps1`)

### Pipeline — scripts run in this order
1. `scripts/transform-dbatools-index.ps1`
   - Downloads `dbatools-index.json`, transforms it into `static/commands.json`
   - Derives category, verb, url, popular, popularityRank fields
   - fullContent is left empty at this stage

2. `scripts/generate-command-pages.ps1`
   - Downloads same index, generates `content/commands/*.md` (one per command)
   - YAML front matter includes: title, slug, author, **availability** (e.g.
     "Windows, Linux, macOS"), synopsis, tags, sourceUrl
   - Content: synopsis, description, syntax, examples, parameter tables

3. `scripts/enrich-commands-json.ps1`
   - Reads each .md file, strips HTML/markdown, writes plain text into
     `fullContent` in `static/commands.json` for Fuse.js search

4. `scripts/update-popular-commands.ps1`
   - Reads `rankings.txt` (page-view analytics data)
   - Sets `popularityRank` on all commands; marks top 50 as `popular: true`

5. `scripts/update-commands-urls.ps1`
   - Normalises all `url` values to `/{CommandName}` format

### How "runs on Linux" is shown
The `Availability` field in `dbatools-index.json` contains a string like
`"Windows, Linux, macOS"`. Step 2 writes it as `availability:` in each
command's YAML front matter. The individual command layout
(`themes/dbatools2025/layouts/commands/single.html`) renders it as a
platform badge. It is **not** derived by the website — it comes directly from
the dbatools module metadata.

### Key files
- `static/commands.json` — the JSON database consumed by the browser JS
- `static/js/commands-page.js` — Fuse.js search + filter logic for /commands
- `themes/dbatools2025/layouts/page/commands.html` — /commands listing template
- `themes/dbatools2025/layouts/commands/single.html` — individual command template
- `static/css/commands-page.css` — styles for listing page
- `static/css/command-single.css` — sidebar/layout for individual pages
- `static/css/command-docs.css` — article content styling for individual pages
- `rankings.txt` — popularity data (do not overwrite without new analytics)
- `scripts/README.md` — detailed pipeline documentation
- `COMMAND_PAGES_README.md` — layout file reference and "do not create" warnings

### Things to avoid
- Do NOT create `layouts/page/command-detail.html` or
  `static/css/command-detail.css` — these are not used and cause confusion.
- Do NOT edit `static/commands.json` directly; re-run the pipeline scripts.
- The commands layout is `layouts/commands/single.html`, NOT
  `layouts/_default/single.html` — Hugo picks it up automatically because
  content is in `content/commands/`.
