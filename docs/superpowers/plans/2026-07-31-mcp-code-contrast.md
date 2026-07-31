# MCP Code Contrast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make fenced Markdown code on `/mcp/` readable while preserving Hugo's existing Monokai rendering.

**Architecture:** Add one page-local cascade correction to `mcp.css`: code inside prose preformatted blocks inherits the foreground established by its `<pre>` parent. Protect the behavior with a Node test that builds the actual Hugo site, serves the generated output locally, and measures computed browser contrast in the Microsoft Learn Bash example.

**Tech Stack:** Hugo 0.111+, CSS, Node.js built-in test runner, Puppeteer 24.

## Global Constraints

- Keep Hugo's existing Monokai background and syntax-token colors.
- Leave inline code, the MCP client-install widget, and pages outside `/mcp/` unchanged.
- Do not add dependencies or change Hugo's global Markdown configuration.
- The fenced Bash block's computed contrast must be at least 4.5:1.

---

### Task 1: Correct and lock down fenced-code contrast

**Files:**
- Create: `tests/mcp-code-contrast.test.js`
- Modify: `static/css/mcp.css:6`

**Interfaces:**
- Consumes: the Hugo-generated `/mcp/` page and its existing `css/tailwind.css` and `css/mcp.css` assets.
- Produces: a page-local `.prose pre code { color: inherit; }` cascade rule and a browser regression test runnable through `npm test`.

- [x] **Step 1: Write the failing browser regression test**

Create `tests/mcp-code-contrast.test.js` with this complete test. A production change that restores `prose-code:text-theme-text` as the winning declaration must make it fail.

```js
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { createServer } = require('node:http');
const { mkdtempSync, readFileSync, rmSync, statSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { extname, join, normalize } = require('node:path');
const { after, before, test } = require('node:test');
const puppeteer = require('puppeteer');

const siteRoot = mkdtempSync(join(tmpdir(), 'dbatools-mcp-contrast-'));
let browser;
let server;
let origin;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

function relativeAssetPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const requested = decoded.endsWith('/') ? `${decoded}index.html` : decoded;
  return normalize(requested).replace(/^([/\\])+/, '');
}

function contrastRatio(foreground, background) {
  const luminance = (color) => {
    const channels = color.match(/\d+/g).slice(0, 3).map(Number).map((value) => {
      const normalized = value / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };

  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

before(async () => {
  execFileSync('hugo', ['--destination', siteRoot], { stdio: 'pipe' });

  server = createServer((request, response) => {
    try {
      const assetPath = join(siteRoot, relativeAssetPath(request.url));
      if (!statSync(assetPath).isFile()) throw new Error('Not a file');
      response.writeHead(200, {
        'Content-Type': contentTypes[extname(assetPath)] || 'application/octet-stream'
      });
      response.end(readFileSync(assetPath));
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
});

after(async () => {
  if (browser) await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  rmSync(siteRoot, { recursive: true, force: true });
});

test('fenced Bash code on /mcp/ has readable contrast', async () => {
  const page = await browser.newPage();
  await page.goto(`${origin}/mcp/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => {
    const loadedStylesheets = Array.from(document.styleSheets)
      .filter((sheet) => sheet.href && new URL(sheet.href).origin === location.origin)
      .filter((sheet) => sheet.cssRules.length > 0)
      .map((sheet) => new URL(sheet.href).pathname);
    return loadedStylesheets.includes('/css/tailwind.css')
      && loadedStylesheets.includes('/css/mcp.css');
  });

  const colors = await page.evaluate(() => {
    const code = Array.from(document.querySelectorAll('article pre code'))
      .find((element) => element.textContent.includes('microsoft-learn'));
    if (!code) throw new Error('Microsoft Learn Bash block not found');

    return {
      foreground: getComputedStyle(code).color,
      background: getComputedStyle(code.parentElement).backgroundColor
    };
  });

  assert.ok(
    contrastRatio(colors.foreground, colors.background) >= 4.5,
    `expected at least 4.5:1 contrast, got ${contrastRatio(colors.foreground, colors.background).toFixed(2)}:1`
  );
});
```

- [x] **Step 2: Run the focused test and verify RED**

Run:

```powershell
node --test tests/mcp-code-contrast.test.js
```

Expected: FAIL with `expected at least 4.5:1 contrast, got 1.06:1`.

- [x] **Step 3: Add the minimal cascade correction**

Insert this rule near the top of `static/css/mcp.css`, after the file comment and before the install-widget rules:

```css
/* Hugo sets the fenced-block foreground on <pre>; keep prose code from overriding it. */
.prose pre code {
  color: inherit;
}
```

Because `mcp.css` loads after Tailwind and only on the MCP layout, the rule fixes fenced blocks on `/mcp/` without changing other pages. The later `.mcp-code pre code` rule remains the install widget's explicit foreground.

- [x] **Step 4: Run the focused test and verify GREEN**

Run:

```powershell
node --test tests/mcp-code-contrast.test.js
```

Expected: PASS.

- [x] **Step 5: Run the complete automated verification**

Run:

```powershell
npm test
npm run build
```

Expected: all Node tests pass; Tailwind and Hugo production builds exit successfully without warnings or errors.

- [x] **Step 6: Verify the rendered page in both themes**

Start the Hugo preview, open `http://localhost:1313/mcp/`, and inspect the Microsoft Learn Bash, JSON, and text blocks in light and dark mode. Confirm that base text is readable, syntax-token colors remain present, inline code is unchanged, and the client-install widget retains its existing colors.

- [x] **Step 7: Commit the implementation**

```powershell
git add tests/mcp-code-contrast.test.js static/css/mcp.css docs/superpowers/plans/2026-07-31-mcp-code-contrast.md
git commit -m "fix: restore MCP code block contrast"
```
