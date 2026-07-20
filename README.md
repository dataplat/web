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
