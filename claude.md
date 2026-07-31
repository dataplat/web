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
**Do not trust the `Availability` field in `dbatools-index.json`.** It says
`"Windows, Linux, macOS"` for all 718 commands, so it carries no information.

The cause is upstream. `dbatools.psm1` defines `$script:xplat`,
`$script:windowsonly` and `$script:noncoresmo` inside an
`if ($PSVersionTable.PSVersion.Major -lt 5)` block, so on PowerShell 5.1 and 7.x
they are all `$null`. `Get-DbaHelp` then tests `$Name -in $script:windowsonly`
against `$null`, which is always false, and every command falls through to the
cross-platform default that gets baked into the index at release time. This has
been the case since dbatools 2.0 (commit `0eb72452`, Nov 2022) and affects the
legacy docs.dbatools.io site too.

So the website derives it instead. `scripts/lib-platform-lists.ps1` fetches
`dbatools.psm1` and parses `$script:windowsonly` (128) + `$script:noncoresmo`
(31) = 159 Windows-only commands, and throws if the parse returns under 100 so a
regex break can't silently mark everything cross-platform. Both
`transform-dbatools-index.ps1` and `generate-command-pages.ps1` use it.

Where it surfaces:
- `content/commands/*.md` — `availability:` front matter, plus the badge HTML
  that `generate-command-pages.ps1` writes into the page body (the badge is in
  the generated markdown, *not* in `layouts/commands/single.html`)
- `static/commands.json` — `availability` (display string) and `windowsOnly`
  (boolean), used by the Platform filter and card badge on /commands

Once the upstream psm1 fix ships, the index's own `Availability` becomes
trustworthy and `lib-platform-lists.ps1` can be retired.

## Machine-readable output (LLMs and AI crawlers)

Research and evidence: `research/optimizing-docs-sites-for-llms-2026-07-31.md`.
Read that before changing anything below — it records which claims come from
Google/Microsoft/OpenAI/Anthropic directly and which are contested.

The one load-bearing fact: **OpenAI's, Anthropic's and Perplexity's crawlers
fetch JavaScript but do not execute it.** Anything rendered client-side is
invisible to them. Google and Apple render; nobody else does. So any list or
navigation that matters must exist in the HTML at build time.

What the site emits:

- `/commands/` — the card grid and all three sidebar filter lists are rendered
  by Hugo from `static/commands.json` at build time
  (`layouts/page/commands.html` + `partials/command-card.html`).
  `commands-page.js` then replaces the same markup for search and filtering. If
  `commands.json` fails to load, the JS bails out and leaves the static list.
  **`partials/command-card.html` must stay in sync with `createCommandCard()`
  in `static/js/commands-page.js`.**
- `/<page>/index.md` — markdown mirror of every page, via the `MD` output
  format. Command pages use `layouts/commands/single.md`, which strips the
  header card, the on-this-page nav and the anchor-wrapped headings out of the
  generated body. If `generate-command-pages.ps1` changes the shape of that
  body, the three regexes in that template are what breaks.
- `/commands/index.md` — the full command index as markdown
  (`layouts/page/commands.md`), because `content/page/cmd.md` has no body.
- `/llms.txt` — `layouts/index.llms.txt`. Cheap hedge, not a strategy; no
  answer engine documents using it.
- `/robots.txt` — `layouts/robots.txt`. Names each AI crawler explicitly and
  carries the `Sitemap:` line. Per RFC 9309 a bot uses only its own group and
  ignores `*`, so each named bot needs its own `Allow`.
- JSON-LD — `partials/structured-data.html`. `APIReference` on command pages
  (with `targetPlatform` from the derived Windows-only list), `TechArticle` on
  posts, `WebSite` + `SoftwareApplication` on the home page, plus
  `BreadcrumbList`. Do **not** add `HowTo` or `FAQPage`: Google removed HowTo
  rich results and restricted FAQ to government and health sites in 2023.
- `<link rel="canonical">` and `<link rel="alternate" type="text/markdown">` in
  `_default/baseof.html`.

Examples on command pages are `h3.example-heading` with the example's own
description in the heading text, so each one is a passage that can be retrieved
and quoted alone. That is deliberate — Microsoft's guidance is that AI search
retrieves passages, not pages.

Not done, and not doable from this repo: GitHub Pages cannot emit custom
response headers, so `Accept: text/markdown` content negotiation and
`Link: rel="canonical"` headers are out unless routed through Cloudflare.

### Key files
- `scripts/lib-platform-lists.ps1` — shared Windows-only command list parser
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
- Do NOT make `/commands/` client-rendered again. That page has the site's
  highest impression count and the lowest generative-AI pickup of any top page
  (see the research note); the static grid is the fix.
- The commands layout is `layouts/commands/single.html`, NOT
  `layouts/_default/single.html` — Hugo picks it up automatically because
  content is in `content/commands/`.
