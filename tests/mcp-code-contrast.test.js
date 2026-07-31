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
