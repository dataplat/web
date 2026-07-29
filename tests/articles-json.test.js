const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const articlesPath = path.join(root, 'public', 'articles.json');

function loadArticles() {
  if (!fs.existsSync(articlesPath)) {
    throw new Error('public/articles.json missing - run `npm run build` first');
  }
  return JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
}

function draftSlugs() {
  const postDir = path.join(root, 'content', 'post');
  return fs
    .readdirSync(postDir)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => {
      const body = fs.readFileSync(path.join(postDir, f), 'utf8');
      const frontMatter = body.split('---')[1] || '';
      return /^draft:\s*true\s*$/m.test(frontMatter);
    })
    .map((f) => f.replace(/\.md$/, ''));
}

test('articles.json is a non-empty array', () => {
  const articles = loadArticles();
  assert.ok(Array.isArray(articles), 'expected an array');
  assert.ok(articles.length > 50, `expected more than 50 articles, got ${articles.length}`);
});

test('articles.json exposes the fields the MCP corpus builder expects', () => {
  const articles = loadArticles();
  for (const key of ['title', 'url', 'summary', 'content', 'date', 'type', 'tags', 'categories']) {
    assert.ok(key in articles[0], `missing field: ${key}`);
  }
});

test('articles.json contains no drafts', () => {
  const articles = loadArticles();
  const drafts = draftSlugs();

  // The fixture must be meaningful: if nothing is a draft, this proves nothing.
  assert.ok(drafts.length > 0, 'expected at least one draft post to exist');

  for (const slug of drafts) {
    const hit = articles.find((a) => a.url.includes(`/${slug}`));
    assert.equal(hit, undefined, `draft leaked into articles.json: ${slug}`);
  }
});

test('articles.json excludes command pages', () => {
  const articles = loadArticles();
  assert.ok(!articles.some((a) => a.type === 'commands'), 'command pages must not be indexed here');
});

test('articles.json does not truncate content the way search.json does', () => {
  const articles = loadArticles();
  const longest = articles.reduce((m, a) => Math.max(m, a.content.length), 0);
  assert.ok(longest > 500, `expected full text, longest content was ${longest} chars`);
});

test('articles.json uses absolute URLs', () => {
  const articles = loadArticles();
  assert.ok(
    articles.every((a) => a.url.startsWith('https://dbatools.io/')),
    'every url must be absolute'
  );
});
