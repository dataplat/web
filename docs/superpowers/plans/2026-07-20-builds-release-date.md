# Builds Release Date Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a searchable, sortable, exportable date-only `Release Date` column to `/builds/` and document how the page is maintained.

**Architecture:** Keep the existing Hugo template and client-side DataTables architecture. Add the header in the template, format `ReleaseDate` inline while assembling row arrays in `builds.js`, and protect the index-based mapping with a Node regression test.

**Tech Stack:** Hugo, JavaScript, jQuery DataTables, Lodash, Node.js built-in test runner, npm

## Global Constraints

- Display populated `ReleaseDate` values as `YYYY-MM-DD`.
- Display a blank cell when `ReleaseDate` is missing or invalid.
- Keep `Release Date` searchable, sortable, and included in copy, Excel, and PDF exports.
- Do not alter the source JSON, filter behavior, table styling, or page-level `LastUpdated` meaning.
- Format the value inline; do not add a standalone formatter helper.
- Preserve unrelated workspace changes.

---

### Task 1: Add the Release Date column with a regression test

**Files:**
- Create: `tests/builds-release-date.test.js`
- Modify: `package.json`
- Modify: `themes/dbatools2025/layouts/page/builds.html`
- Modify: `static/js/builds.js`

**Interfaces:**
- Consumes: `Data[].ReleaseDate` from `https://dataplat.dbatools.io/assets/dbatools-buildref-index.json`.
- Produces: DataTables row index `5` as a `YYYY-MM-DD` string or `"."`; subsequent columns shift one index to the right.

- [x] **Step 1: Write the failing regression test**

Create `tests/builds-release-date.test.js` with a Node `vm` harness that runs the browser script against stubbed jQuery, DataTables, and Lodash APIs. Feed a valid ISO release date plus missing and invalid values, then assert:

```js
assert.equal(capturedRows[0][5], '2022-11-16');
assert.equal(capturedRows[1][5], '.');
assert.equal(capturedRows[2][5], '.');
assert.equal(capturedRows[0].length, 12);
assert.match(layout, /<th>CU<\/th>\s*<th>Release Date<\/th>\s*<th>End Of Support<\/th>/);
assert.match(layout, /js\/builds\.js" \| relURL \}\}\?v=9/);
```

Add the package script:

```json
"test": "node tests/builds-release-date.test.js"
```

- [x] **Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because row index `5` still contains the support date and the template does not contain `Release Date`.

- [x] **Step 3: Add the table header and inline row value**

In `themes/dbatools2025/layouts/page/builds.html`, insert:

```html
<th>Release Date</th>
```

between `CU` and `End Of Support`, and change the script URL from `?v=8` to `?v=9`.

In the `results.push` row in `static/js/builds.js`, insert at index `5`:

```js
typeof el.ReleaseDate === 'string' && el.ReleaseDate.length >= 10
  ? el.ReleaseDate.substring(0, 10)
  : '.',                  // 5: Release Date
```

Shift Support Until, marker, and KB comments to indexes `6` through `11`.

- [x] **Step 4: Realign every index-based DataTables operation**

Update `static/js/builds.js` as follows:

```js
targets: [7, 8, 9, 10] // SP?, CU?, Latest SP?, Latest CU?
targets: [3, 4, 5, 6]  // SP, CU, Release Date, Support columns
```

Use columns `7`, `8`, `9`, and `10` in `resetAttributeFilters()` and the four attribute-filter switch cases. Update latest-row calculations to:

```js
if (results[prevrow][8] !== '.') {
  results[prevrow][10] = 'X';
}

var spdata = _.filter(datareverse, function(o) { return o[7] === 'X'; });
results[el[0]][9] = 'X';

var cudata = _.filter(datareverse, function(o) { return o[8] === 'X'; });
results[el[0]][10] = 'X';
```

- [x] **Step 5: Run the focused test to verify it passes**

Run: `npm test`

Expected: two passing subtests and zero failures.

- [x] **Step 6: Commit the tested feature**

```bash
git add package.json tests/builds-release-date.test.js themes/dbatools2025/layouts/page/builds.html static/js/builds.js
git commit -m "feat: show build release dates"
```

### Task 2: Document and verify the builds page

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the implementation paths and commands from Task 1.
- Produces: contributor guidance for maintaining `/builds/`.

- [x] **Step 1: Expand the root README**

Document:

- `content/page/builds.md` selects the `builds` layout.
- `themes/dbatools2025/layouts/page/builds.html` owns the page and table headers.
- `static/js/builds.js` fetches and maps the external JSON into DataTables rows.
- The data source is `https://dataplat.dbatools.io/assets/dbatools-buildref-index.json`.
- Headers, row-array positions, column definitions, and filter indexes must stay aligned.
- Date fields use the first ten ISO characters for `YYYY-MM-DD`.
- The `builds.js` query-string version must be bumped after script changes.
- Verification commands are `npm test` and `npm run build`.

- [x] **Step 2: Run focused and production verification**

Run: `npm test`

Expected: all tests pass.

Run: `npm run build`

Expected: Tailwind and Hugo finish successfully with exit code `0`.

Run:

```powershell
Select-String -LiteralPath public\builds\index.html -Pattern 'Release Date','js/builds.js?v=9'
```

Expected: both patterns appear in the generated page.

- [x] **Step 3: Review the final diff**

Run: `git diff --check`

Expected: no output and exit code `0`.

Run: `git status --short`

Expected: only `README.md` remains modified, plus any unrelated pre-existing user files.

- [x] **Step 4: Commit the documentation**

```bash
git add README.md
git commit -m "docs: explain builds page maintenance"
```
