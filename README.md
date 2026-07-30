# web

dbatools.io website.

## SQL Server builds page

The `/builds/` page is a Hugo page with data populated in the browser:

- `content/page/builds.md` selects the `builds` layout.
- `themes/dbatools2025/layouts/page/builds.html` owns the page structure and
  table headers.
- `static/js/builds.js` fetches the build reference JSON, maps each entry into
  a DataTables row, and configures filtering and exports.
- The data comes from
  `https://dataplat.dbatools.io/assets/dbatools-buildref-index.json`.

The JavaScript uses indexed row arrays. When adding or moving a column, keep
the table headers, row-array positions, DataTables column definitions, filter
indexes, and latest-release marker indexes aligned. Date fields are displayed
as the first ten characters of their ISO value (`YYYY-MM-DD`); missing values
use the existing empty-cell marker.

After changing `static/js/builds.js`, bump its `?v=` query-string version in
the Hugo layout so deployed browsers do not keep a stale cached script.

Verify builds-page changes locally with:

```powershell
npm test
npm run build
```

## Commands page (`/commands` and individual command pages)

The commands section has two layers: a browsable index at `/commands` and individual pages at `/{CommandName}`.

### Data source

All command data originates from the dbatools PowerShell module repository:

```
https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json
```

Each entry in `dbatools-index.json` includes `CommandName`, `Description`, `Synopsis`, `Author`, `Availability` (e.g. `"Windows, Linux, macOS"`), `Tags`, `Syntax`, `Examples`, and `Params`.

### Build pipeline

Five PowerShell scripts in `scripts/` must be run in order. They run automatically in this repo's own CI pipeline (`.github/workflows/deploy.yml`) on every push to `main` or `html`.

> **Related repos** — `dataplat/docs` is the *separate* legacy site at `docs.dbatools.io` (raw HTML files, its own CI). `dataplat/dataplat.github.io` stores raw asset files (build-ref index, dbatools-index) on a daily cron — it is **not** the source for this pipeline.

| Step | Script | Output |
|------|--------|--------|
| 1 | `transform-dbatools-index.ps1` | `static/commands.json` — downloads the index, derives categories from verb/tag/noun patterns, sets `popular: false` and `popularityRank: 0` |
| 2 | `generate-command-pages.ps1` | `content/commands/*.md` — one Hugo markdown file per command with YAML front matter, synopsis, description, syntax, examples, and parameter tables |
| 3 | `enrich-commands-json.ps1` | Updates `static/commands.json` — reads each markdown file, strips formatting, stuffs plain text into `fullContent` for Fuse.js full-text search |
| 4 | `update-popular-commands.ps1` | Updates `static/commands.json` — reads `rankings.txt` (page-view analytics), applies `popularityRank` to all commands, marks the top 50 as `popular: true` |
| 5 | `update-commands-urls.ps1` | Normalises all `url` fields to `/{CommandName}` format |

Run locally:

```powershell
cd scripts
.\transform-dbatools-index.ps1
.\generate-command-pages.ps1
.\enrich-commands-json.ps1
.\update-popular-commands.ps1
.\update-commands-urls.ps1
cd ..
hugo serve
```

### Linux / macOS support display

The `Availability` field from `dbatools-index.json` (e.g. `"Windows, Linux, macOS"`) is written as `availability:` in each command's YAML front matter by `generate-command-pages.ps1`. The individual command layout (`themes/dbatools2025/layouts/commands/single.html`) reads that field and renders the platform badge on the page.

### Key files

| Purpose | File |
|---------|------|
| Index page template | `themes/dbatools2025/layouts/page/commands.html` |
| Index page styles | `static/css/commands-page.css` |
| Index page JS (Fuse.js search, filters) | `static/js/commands-page.js` |
| Individual command template | `themes/dbatools2025/layouts/commands/single.html` |
| Individual command styles | `static/css/command-single.css`, `static/css/command-docs.css` |
| Command data (JSON) | `static/commands.json` |
| Command markdown content | `content/commands/*.md` |
| Popularity rankings | `rankings.txt` |
| Pipeline detail | `scripts/README.md`, `COMMAND_PAGES_README.md` |

### commands.json schema

```json
{
  "name": "Backup-DbaDatabase",
  "description": "...",
  "synopsis": "...",
  "category": "Backup & Restore",
  "tags": ["backup", "database"],
  "verb": "Backup",
  "popular": true,
  "popularityRank": 5,
  "url": "/Backup-DbaDatabase",
  "fullContent": "plain text of the markdown page for Fuse.js search"
}
```

Categories are derived automatically: verb takes priority (`Copy`/`Export` → Migration, `Backup`/`Restore` → Backup & Restore), then tags, then noun patterns. See `transform-dbatools-index.ps1` for the full logic.
