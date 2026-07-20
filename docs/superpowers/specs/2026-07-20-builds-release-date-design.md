# Builds Release Date Design

## Goal

Show each SQL Server build's `ReleaseDate` on `/builds/` using the date-only
`YYYY-MM-DD` format supplied by the shared dbatools build-reference JSON.

## Current Architecture

Hugo renders the builds page from
`themes/dbatools2025/layouts/page/builds.html`. The browser then runs
`static/js/builds.js`, which fetches
`https://dataplat.dbatools.io/assets/dbatools-buildref-index.json`, converts
each `Data` entry into a DataTables row, and enables filtering and exports.

## Design

- Add a visible `Release Date` table header between `CU` and `End Of Support`.
- Format `ReleaseDate` inline while assembling each DataTables row, returning
  its first ten characters when populated and the page's existing empty-cell
  marker when missing or invalid.
- Insert the formatted release date into each row and update every affected
  DataTables column index.
- Keep the column searchable, sortable, and included in copy, Excel, and PDF
  exports through the existing DataTables defaults.
- Bump the `builds.js` query-string version in the Hugo layout so deployed
  browsers receive the changed script.

## Testing

- Add a focused Node test that asserts the table template and client-side row
  mapping include the inline date-only conversion and remain aligned.
- Run the focused tests and the full Hugo production build.
- Inspect the generated `/builds/` page to confirm the new header and script
  reference are present.

## Documentation

Expand the root `README.md` with a concise explanation of how `/builds/`
works, including the Hugo template, client script, external JSON source, field
mapping, cache-version requirement, and verification commands.

## Scope

This change does not alter the source JSON, filter behavior, table styling, or
the meaning of the page-level `LastUpdated` value.
