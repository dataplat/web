const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function runBuildsScript(data) {
  let capturedRows;

  const table = {
    rows: {
      add(rows) {
        capturedRows = rows;
        return table;
      }
    },
    draw() {
      return table;
    },
    columns() {
      return {
        search() { return this; },
        columns() { return this; },
        draw() { return this; }
      };
    },
    search() {
      return table;
    },
    button() {
      return { trigger() {} };
    }
  };

  function jquery() {
    return {
      DataTable() { return table; },
      on() { return this; },
      text() { return this; },
      data() { return undefined; },
      hasClass() { return false; },
      removeClass() { return this; },
      addClass() { return this; }
    };
  }

  jquery.ajax = ({ success }) => success({
    LastUpdated: '2026-07-20T00:00:00Z',
    Data: data
  });

  const lodash = {
    forEach: (items, callback) => items.forEach(callback),
    isArray: Array.isArray,
    reverse: (items) => items.reverse(),
    filter: (items, predicate) => items.filter(predicate)
  };

  const source = fs.readFileSync(
    path.join(root, 'static/js/builds.js'),
    'utf8'
  );
  vm.runInNewContext(source, { $: jquery, _: lodash, console });
  return capturedRows;
}

test('maps ReleaseDate to the date-only row column', () => {
  const base = {
    Name: '2022',
    SP: 'RTM',
    CU: '',
    SupportedUntil: '2033-01-11T00:00:00Z',
    KBList: null,
    Retired: false
  };
  const rows = runBuildsScript([
    {
      ...base,
      Version: '16.0.1000.6',
      ReleaseDate: '2022-11-16T00:00:00Z'
    },
    {
      ...base,
      Version: '16.0.1000.5',
      ReleaseDate: null
    },
    {
      ...base,
      Version: '16.0.1000.4',
      ReleaseDate: '2026-99-99T00:00:00Z'
    }
  ]);

  assert.equal(rows[0][5], '2022-11-16');
  assert.equal(rows[1][5], '.');
  assert.equal(rows[2][5], '.');
  assert.equal(rows[0].length, 12);
});

test('keeps the Release Date header and cache version aligned', () => {
  const layout = fs.readFileSync(
    path.join(root, 'themes/dbatools2025/layouts/page/builds.html'),
    'utf8'
  );

  assert.match(
    layout,
    /<th>CU<\/th>\s*<th>Release Date<\/th>\s*<th>End Of Support<\/th>/
  );
  assert.match(layout, /js\/builds\.js" \| relURL \}\}\?v=9/);
});
