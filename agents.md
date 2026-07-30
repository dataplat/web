# Notes for AI Agents

This is the **dbatools.io** Hugo static site. Key facts for agents working on
the commands section.

## Commands data pipeline

### Where command data comes from
All dbatools command metadata originates from the official module repository:
```
https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json
```
Fields include: `CommandName`, `Description`, `Synopsis`, `Author`,
`Availability`, `Tags`, `Syntax`, `Examples`, `Params`.

### Five-script build pipeline (`scripts/`)
Run in order — or they run automatically via `.github/workflows/deploy.yml` in this
repo (`dataplat/web`) on every push to `main` or `html`.

### Related repos — do NOT confuse with this pipeline
- `dataplat/docs` — the old `docs.dbatools.io` site. Has its own separate CI
  (`update-assets.yml`) triggered by `repository_dispatch`. Generates plain HTML
  files directly; nothing in `dataplat/web` depends on it.
- `dataplat/dataplat.github.io` — stores cached asset files (build-ref, index)
  pulled daily from the dbatools `development` branch. Feeds the `/builds` page.
  The commands pipeline here does **not** use this cache — it fetches
  `dbatools-index.json` directly from `dataplat/dbatools` `master` at CI run time.

```
1. transform-dbatools-index.ps1   → static/commands.json (initial transform)
2. generate-command-pages.ps1     → content/commands/*.md (one file per command)
3. enrich-commands-json.ps1       → adds fullContent to static/commands.json
4. update-popular-commands.ps1    → applies rankings.txt popularity data
5. update-commands-urls.ps1       → normalises URL format to /{CommandName}
```

### Platform support (Linux/macOS)
The `Availability` field from `dbatools-index.json` (e.g. "Windows, Linux,
macOS") is written into each command's YAML front matter as `availability:` by
`generate-command-pages.ps1`. The template at
`themes/dbatools2025/layouts/commands/single.html` renders it as a platform
badge. **Do not try to derive this from command names** — it comes from the
dbatools module source.

### Front-end architecture
- `/commands` listing: data from `static/commands.json` via
  `static/js/commands-page.js` using Fuse.js for fuzzy search
- Individual `/{CommandName}` pages: Hugo renders `content/commands/*.md`
  using `themes/dbatools2025/layouts/commands/single.html`
- The sidebar on individual pages also loads `commands.json` to render the
  command navigation list

### commands.json field reference
| Field | Type | Source |
|-------|------|--------|
| `name` | string | CommandName from index |
| `description` | string | Description from index |
| `synopsis` | string | Synopsis from index |
| `category` | string | Derived by transform script (verb > tags > noun) |
| `tags` | string[] | Tags from index, lowercased |
| `verb` | string | First word of command name (Add, Get, Set, …) |
| `popular` | bool | Top 50 by page views (rankings.txt) |
| `popularityRank` | int | Rank 1–680 from rankings.txt; 0 if unranked |
| `url` | string | `/{CommandName}` |
| `fullContent` | string | Plain-text dump of the markdown file for Fuse.js |

### Category derivation rules (transform-dbatools-index.ps1)
1. Verb: `Copy`/`Export` → Migration; `Backup`/`Restore` → Backup & Restore
2. Tags: `agent` → Agent & Jobs; `certificate`/`login`/etc → Security; `backup` → Backup & Restore
3. Noun patterns: `Cpu`/`Memory`/`Wait`/etc → Performance; `Ag*`/`Replica`/etc → Advanced Features
4. Default fallback → Utilities

### Do not
- Edit `static/commands.json` manually; re-run the pipeline.
- Create `layouts/page/command-detail.html` or `static/css/command-detail.css` (unused, causes confusion).
- Assume the individual command layout is `layouts/_default/single.html`; it is
  `layouts/commands/single.html`.

### Useful references inside the repo
- `scripts/README.md` — full pipeline docs
- `COMMAND_PAGES_README.md` — layout files, CSS files, and editing guide
- `commands-page-build-spec_2.md` — original design spec for the commands page
