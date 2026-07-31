# Optimizing a Technical Docs Site for LLMs: Primary-Source Notes

Date: 2026-07-31

Scope: what the organizations that actually operate the crawlers and answer
engines say, plus first-party log measurements, applied to dbatools.io. Every
claim links to the party that owns it. Where sources contradict each other the
disagreement is shown rather than resolved by preference.

## Bottom line

1. **There is no separate "LLM channel" to optimize for.** Google states
   flatly that pages become eligible for AI Overviews and AI Mode by being
   indexed and snippet-eligible, with "no additional technical requirements."
2. **The one hard technical divide is JavaScript.** OpenAI's, Anthropic's and
   Perplexity's crawlers fetch JS files but do not execute them. Anything
   rendered client-side is invisible to them. Google and Apple render; the
   others do not.
3. **`llms.txt` is not supported by any answer engine that owns one**, and log
   studies show almost nothing fetches it. It is cheap, but it is not the
   lever.
4. **Chunk-level retrieval is the actual mechanism at Bing/Copilot**, which
   makes heading structure, tables and self-contained sections the highest-value
   content work.
5. **dbatools.io's own Search Console data shows the gap is real and
   measurable**: generative-AI impressions run at ~11% of Web impressions
   per day, but `/commands/` — the site's single highest-impression page — picks
   up AI impressions at roughly a quarter of the site-wide rate. That page is
   100% client-rendered.

---

## 1. How LLM systems actually reach a docs site

Three distinct paths, with different rules and different bots. Conflating them
is the most common source of bad advice.

### Path A — training corpus

Content is fetched once and folded into model weights. Controlled by `GPTBot`
(OpenAI) and `ClaudeBot` (Anthropic).

- OpenAI: "Disallowing GPTBot indicates a site's content should not be used in
  training generative AI foundation models."
  ([OpenAI, Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots))
- Anthropic: ClaudeBot is for "gathering data from the public web for model
  development."
  ([Anthropic support: does Anthropic crawl data from the web](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler))
- Google separates training from Search with `Google-Extended`, which is
  distinct from the Search generative-AI control.
  ([Google, AI features and your website](https://developers.google.com/search/docs/appearance/ai-features))

This path is *not* where citations or traffic come from. Optimizing for it is
mostly about not blocking it.

### Path B — retrieval at answer time (this is the one that matters)

The assistant searches an index and grounds its answer in pages it retrieves
now, then cites them.

- OpenAI: `OAI-SearchBot` "surfaces websites in ChatGPT's search features," and
  "sites that are opted out of OAI-SearchBot will not be shown in ChatGPT
  search answers, though can still appear as navigational links."
  ([OpenAI](https://developers.openai.com/api/docs/bots))
- Anthropic: `Claude-SearchBot` "navigates the web to improve search result
  quality for users"; blocking it "may reduce your site's visibility and
  accuracy in user search results."
  ([Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler))
- Google's AI Overviews and AI Mode are grounded in the Search index; supporting
  links require the page to be "indexed and eligible to be shown in Google Search
  with a snippet."
  ([Google](https://developers.google.com/search/docs/appearance/ai-features))
- Microsoft's AI Performance report in Bing Webmaster Tools tracks citations
  across "Microsoft Copilot, AI-generated summaries in Bing, and select partner
  integrations."
  ([Bing Webmaster Blog, Feb 2026](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview))

### Path C — user-initiated fetch and browser agents

A user pastes a URL, or an agent drives a browser.

- OpenAI: `ChatGPT-User` "is not used for crawling the web in an automatic
  fashion. Because these actions are initiated by a user, robots.txt rules may
  not apply."
  ([OpenAI](https://developers.openai.com/api/docs/bots))
- Anthropic's `Claude-User` "enables Claude to access websites when users ask
  questions"; disabling it "prevents our system from retrieving your content in
  response to a user query."
  ([Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler))

Cloudflare measured the split across its network in July 2025: roughly **80% of
AI bot crawling was for training**, with user-action traffic under 5% of total
AI bot traffic — and within that user-action cohort, "OpenAI's ChatGPT-User bot
is responsible for nearly three quarters of the request traffic."
([Cloudflare, A deeper look at AI crawlers](https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/))

By June 2026 Cloudflare reported training had risen to 52% of *crawler
requests* with mixed-use crawlers over 36%, i.e. an increasing share of bots
whose intent cannot be distinguished at all.
([Cloudflare Radar / AI Insights](https://radar.cloudflare.com/ai-insights))

---

## 2. What Google says — and explicitly says not to do

Google published a dedicated optimization guide in May 2026.
([Announcement](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing),
[guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))

**Verbatim, on special AI files:**

> "You don't need to create new machine readable files, AI text files, markup,
> or Markdown to appear in Google Search (including its generative AI
> capabilities), as Google Search itself doesn't use them."

**Verbatim, on chunking:**

> "There's no requirement to break your content into tiny pieces for AI to
> better understand it. Google systems are able to understand the nuance of
> multiple topics on a page and show the relevant piece to users."

**What Google does recommend:** crawlable content, semantic HTML, JavaScript SEO
best practices if the site uses a JS framework, good page experience and low
latency, reduced duplicate content, unique first-hand content, and clear
structure with headings and sections.

**Eligibility and controls** ([AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)):

- "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a
  page must be indexed and eligible to be shown in Google Search with a snippet,
  fulfilling the Search technical requirements." There are "no additional
  technical requirements."
- `nosnippet`, `data-nosnippet`, `max-snippet` restrict what can be used;
  `noindex` removes the page entirely.
- The Search Console **Search generative AI control** defaults to inclusion;
  opting out means "no impressions or traffic from these AI-powered features"
  while leaving regular rankings unaffected.
  ([Search Console Help](https://support.google.com/webmasters/answer/16908024))

**Agents:** Google points to a browser-agent guide covering semantic HTML
(`<button>`/`<a>` over styled `<div>`s), `role`/`tabindex` when semantic HTML
isn't possible, stable layout, `for` attributes on `<label>`, interactive
targets larger than 8 square pixels, and `cursor: pointer` as an actionability
signal.
([web.dev, Prepare your site for AI agents](https://web.dev/articles/ai-agent-site-ux))

---

## 3. What Microsoft says — the chunking story

Microsoft's guidance directly contradicts Google's "no need to chunk" line,
because Bing/Copilot grounding is passage-level:

> "Headings are HTML tags that mark where one idea ends and another begins. For
> AI, they act like chapter titles that define clear content slices."

Ranking "is less about ordering entire pages and more about which pieces of
content earn a place in the final answer," with AI assistants breaking content
into "smaller, structured pieces" that are evaluated independently and
reassembled from multiple sources.
([Microsoft Advertising, Optimizing your content for inclusion in AI search answers, Oct 2025](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers))

Concrete Microsoft recommendations: clear H1/H2/H3, bulleted lists, numbered
steps and comparison tables; schema.org markup in JSON-LD; avoid "long walls of
text" and content hidden in tabs; page titles that summarize what the content
delivers, with H1 matching; measured facts over vague adjectives.

Microsoft also still treats sitemaps as load-bearing for AI discovery, paired
with IndexNow for speed.
([Bing Webmaster Blog, Keeping content discoverable with sitemaps in AI-powered search, Jul 2025](https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search))

**How to reconcile the two:** Google says you don't have to fragment pages into
separate URLs; Microsoft says the *internal* structure of a page determines
which slice gets quoted. Both are satisfied by one behavior — keep pages whole,
but make every section self-contained under an accurate heading. That is also
what makes a page readable by a human skimming it.

---

## 4. The measured behavior of AI crawlers

Vercel instrumented its network (nextjs.org plus customer sites) and published
per-bot behavior.
([Vercel, The rise of the AI crawler](https://vercel.com/blog/the-rise-of-the-ai-crawler))

**JavaScript execution — the single most consequential finding:**

| Operator | Renders JS? |
|---|---|
| OpenAI (GPTBot, OAI-SearchBot, ChatGPT-User) | **No** |
| Anthropic (ClaudeBot) | **No** |
| Perplexity, Meta, ByteDance | **No** |
| Google Gemini (via Googlebot infrastructure) | Yes |
| AppleBot | Yes |

> "ChatGPT and Claude crawlers do *fetch* JavaScript files" but do not execute
> them — ChatGPT 11.50% of requests, Claude 23.84%.

**Fetch mix:** ChatGPT is HTML-dominant (57.70%); Claude spends 35.17% of
requests on images. Googlebot's mix is HTML 31.00%, JSON 29.34%, plain text
20.77%.

**Waste:** ChatGPT burns 34.82% of requests on 404s and 14.36% on redirects;
Claude 34.16% on 404s. Googlebot: 8.22% and 1.49%. AI crawlers are far worse at
URL hygiene, so stale links, redirect chains and orphaned URLs cost
disproportionately more crawl budget than they do with Google.

**Vercel's recommendations:** server-side render critical content (main content,
metadata, navigation); reserve client-side rendering for non-essential widgets;
keep URL patterns consistent and sitemaps current.

Cloudflare's crawl-to-refer ratios show how lopsided the exchange is — for the
week of 1–7 Aug 2025: Anthropic ~50,000:1, OpenAI ~887:1, Perplexity ~118:1.
In the Computer & Electronics vertical (the closest to dbatools.io):
Anthropic 8,800:1, OpenAI 401.7:1, Perplexity 88:1.
([Cloudflare](https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/))

Read that as a planning constraint: **AI visibility is worth pursuing for
correctness of what assistants tell people about your project, not for referral
traffic.** For an OSS docs site whose real cost centre is people running wrong
commands, that is arguably the better prize anyway.

---

## 5. `llms.txt` — the contested one

**The proposal.** `/llms.txt` is a markdown file: optional BOM, required H1,
blockquote summary, optional prose, then H2-delimited link lists where "each
'file list' is a markdown list, containing a required markdown hyperlink
`[name](url)`, then optionally a ':' and notes about the file." It also proposes
serving a markdown version of each page at the same URL with `.md` appended.
Authored by Jeremy Howard (Answer.AI), published 2024-09-03.
([llmstxt.org](https://llmstxt.org/))

**It is genuinely deployed.** Verified live on 2026-07-31:

```
https://docs.claude.com/llms.txt         HTTP 200  text/plain  56,941 bytes
https://developers.cloudflare.com/llms.txt HTTP 200 text/plain  15,579 bytes
https://docs.stripe.com/llms.txt         HTTP 200  text/plain  93,340 bytes
```

**No answer engine that owns a crawler says it uses the file.** Google says so
explicitly (quoted in §2). OpenAI, Anthropic and Microsoft's crawler
documentation does not mention it at all. Google's John Mueller: "AFAIK none of
the AI services have said they're using LLMs.TXT (and you can tell when you look
at your server logs that they don't even check for it)."

**Log evidence agrees.** Ahrefs checked server logs from 137,210 domains with
traffic in May 2026: 28% published a valid `llms.txt`; **97% of those files
received zero requests that month**. Of requests to the 3% that saw any traffic,
96% were bots — and of those bot requests, SEO audit tools were the largest
category (21.7%), with AI agents at 10.5% and training crawlers at 5.3%.
([Ahrefs, We analyzed 137K sites, Jun 2026](https://ahrefs.com/blog/llmstxt-study/))

Note the interest disclosure on the other side: most enthusiastic `llms.txt`
advocacy comes from documentation vendors who auto-generate the file as a
product feature — Mintlify rolled it out across all hosted docs sites, which is
why adoption jumped overnight.
([Mintlify](https://www.mintlify.com/blog/simplifying-docs-with-llms-txt))
Their factual claims about *who serves the file* check out (verified above);
their claims about its *effect* are not corroborated by anyone operating a
retrieval system.

**Vercel's Agent Readability spec** is the most complete checklist on the
pro-`llms.txt` side, and is worth reading as a superset even if you skip the
`llms.txt` item: markdown mirrors at `.md` for every HTML page, `<link
rel="alternate" type="text/markdown">`, canonical links on every page,
JSON-LD with `dateModified` and `BreadcrumbList`, ≥3 headings per page,
text-to-HTML ratio above 15%, `language-*` classes on every `<pre><code>`
block, links to machine-readable API schemas, and an `AGENTS.md` at the root.
([Vercel KB, Agent Readability spec](https://vercel.com/kb/guide/agent-readability-spec))

**Verdict for a small team:** ship `llms.txt` only if it costs ~an hour, and
treat it as a hedge, not a strategy. The `.md`-mirror half of the same proposal
has a better argument behind it — it directly serves Path C (a human pasting a
URL into Claude or ChatGPT) regardless of whether any crawler ever looks for
`llms.txt`.

---

## 6. The standards layer

**robots.txt is a real standard now.** RFC 9309 (Standards Track, September 2022;
Koster, Illyes, Zeller, Sassman). User-agent matching is case-insensitive;
"the most specific match found MUST be used. The most specific match is the
match that has the most octets"; `allow` wins ties; parsers must handle at least
500 KiB; crawlers "SHOULD NOT use the cached version for more than 24 hours."
`Crawl-delay` and `Sitemap` are **not** part of the standard — crawlers "MAY
interpret other records."
([RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html))

Practical consequence: a `Sitemap:` line in robots.txt is an extension, but it
is universally honored and is the cheapest discovery signal available.
Anthropic separately documents honoring the `Crawl-delay` extension.

**Structured data.** Microsoft asks for JSON-LD; Google says it isn't required
for generative-AI visibility but remains the route to rich results. Relevant
types for a command-reference site:

- [`schema.org/APIReference`](https://schema.org/APIReference) — Thing >
  CreativeWork > Article > TechArticle > APIReference. Properties include
  `assemblyVersion`, `executableLibraryName`, `programmingModel`,
  `targetPlatform`. `targetPlatform` is a genuinely good fit for the
  Windows-only vs cross-platform distinction this site already derives.
- `schema.org/TechArticle`, `schema.org/SoftwareSourceCode`,
  `schema.org/SoftwareApplication`, `schema.org/BreadcrumbList`.

**Do not reach for HowTo or FAQPage.** Google removed HowTo entirely and
restricted FAQ rich results to "well-known, authoritative government and health
websites" in August 2023; unused structured data "does not cause problems for
Search, but also has no visible effects."
([Google, Changes to HowTo and FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes))

---

## 7. Applied to dbatools.io — audit as of 2026-07-31

Checked against the live site and the repo at commit `ecf1bbc`.

| Item | State | Source of the requirement |
|---|---|---|
| `robots.txt` | `User-agent: *` and nothing else — **no `Sitemap:` line**, no per-bot rules | RFC 9309 extension; Bing sitemaps guidance |
| `sitemap.xml` | Present, with `lastmod` | Vercel spec; Bing |
| JSON-LD | **Zero** occurrences anywhere in the theme | Microsoft; Vercel spec |
| `<link rel="canonical">` | **Absent** from `baseof.html` | Vercel spec |
| Individual command pages (719) | Server-rendered Hugo HTML — good | Vercel measurement |
| `/commands/` listing | **Zero command cards in the HTML**; entirely Fuse.js over `commands.json` | Vercel measurement |
| `llms.txt` | Absent | llmstxt.org (optional) |
| `articles.json` | Present, 783 KB, already an MCP corpus | — |
| MCP server | Live at `mcp.dbatools.io` with three `dbatools_*` tools | — |
| Hosting | GitHub Pages origin behind Fastly + Cloudflare | constrains header-level tricks |

The hosting note matters: GitHub Pages cannot emit custom response headers, so
`Accept: text/markdown` content negotiation and `Link: rel="canonical"` headers
from the Vercel spec are not directly available. Static `.md` files at parallel
URLs work fine, and Cloudflare Transform Rules could add headers if it ever
becomes worth it.

### What the Search Console exports show

Two exports in `docs/`, both filtered to Search type = Web:

- `dbatools.io-Performance-on-Search-2026-07-31/` — 198 days
  (2026-01-13 → 2026-07-29). 2,295,806 impressions, 62,371 clicks.
  Has `Queries.csv` and `Search appearance.csv`.
- `dbatools.io-Performance-on-Search-Generative-AI-Features-2026-07-31/` —
  **73 days only** (2026-05-18 → 2026-07-29). 94,667 impressions.
  **No `Queries.csv`, no clicks column** — the generative-AI report exposes
  impressions and nothing else.

Normalized per day: **1,297 genAI impressions/day vs 11,595 Web
impressions/day — 11.2%.** The trend is up: 1,149/day in May, 1,294 in June,
1,371 in July.

Indexing each page's genAI pickup against that 11.2% site-wide rate (1.00 =
average; the two windows differ, so treat this as relative, not absolute):

| Index | genAI impr. | Web impr. | Page |
|---:|---:|---:|---|
| 0.00 | 1 | 32,136 | `/Copy-DbaDatabase/` |
| 0.07 | 71 | 25,642 | `/Copy-DbaAgentProxy/` |
| **0.23** | 2,252 | **239,310** | **`/commands/`** |
| 0.25 | 404 | 39,616 | `/Set-DbaDbIdentity/` |
| 0.29 | 370 | 30,845 | `/Copy-DbaCredential/` |
| 0.49 | 1,743 | 85,595 | `/Restore-DbaDatabase/` |
| … | | | |
| 1.26 | 2,381 | 45,657 | `/install/` |
| 2.62 | 1,658 | 15,347 | `/Set-DbatoolsInsecureConnection/` |
| 2.62 | 18,391 | 170,304 | `/` (home) |

Two readings worth separating:

- **`/commands/` at 0.23 is the standout.** It is the site's highest-impression
  URL by a wide margin and it converts to AI impressions at a quarter of the
  site average. It is also the one page on the site with no server-rendered
  content. Google *does* render JS, so this is correlation rather than proof for
  the Google number — but for OpenAI, Anthropic and Perplexity the page is
  provably an empty shell, and 719 commands' worth of navigation goes with it.
- **Pages that over-index (home, `/install/`, `/Set-DbatoolsInsecureConnection/`,
  `/getting-started/`) are the ones that answer a whole question in prose.**
  Pages that under-index tend to be `Copy-*` command references — dense
  parameter tables, thin narrative. That is the Microsoft passage-retrieval
  story showing up in this site's own data.

One caveat on the numbers: Search Console de-duplicates totals differently from
per-page rows (the Pages.csv rows sum to more than the reported total), and the
two exports cover different windows. The ranking is trustworthy; the absolute
index values are approximate.

### Recommended changes, in priority order

**1. Server-render the command list on `/commands/`.** Emit all 719 commands as
real `<a>` links and card markup from Hugo at build time, then let Fuse.js
enhance/filter the existing DOM rather than create it. This is the only change
on this list that alters what non-JS crawlers can see at all, and it targets the
site's biggest page. Everything else is a refinement.

**2. Add a `Sitemap:` line to robots.txt, and be explicit about AI bots.**
Hugo's `enableRobotsTXT = true` is already set; add
`themes/dbatools2025/layouts/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://dbatools.io/sitemap.xml
```

Then decide deliberately whether to name `GPTBot`, `ClaudeBot`, `OAI-SearchBot`,
`Claude-SearchBot` and `Google-Extended`. For an OSS project whose goal is
correct answers about its own commands, allowing all of them is the coherent
choice — but it should be a decision, not a default.

**3. Add JSON-LD to command pages.** `APIReference` under `TechArticle`, with
`name`, `description` (the existing `synopsis`), `dateModified`,
`targetPlatform` (from the derived Windows-only list), `programmingLanguage:
PowerShell`, `isPartOf` a `SoftwareApplication` for dbatools, plus
`BreadcrumbList` matching the breadcrumbs already in the template. Skip HowTo
and FAQPage. This is the item both Microsoft and Vercel ask for and the site has
none of.

**4. Add `<link rel="canonical" href="{{ .Permalink }}">` to `baseof.html`.**
One line. The site has `aliases`, `_redirects` and a legacy `docs.dbatools.io`
that still surfaces in the genAI export (`docs.dbatools.io/Copy-DbaDbTableData.html`
appears with 15 impressions), so duplicate-URL disambiguation is not theoretical
here.

**5. Strengthen the under-performing command pages.** The `Copy-*` cluster
under-indexes badly. Adding a short "when to use this" paragraph and a worked
example under its own H2 — self-contained enough to be quoted alone — is exactly
what Microsoft's passage-retrieval guidance rewards, and it is generated content,
so it can be done once in `generate-command-pages.ps1` for all 719 pages.

**6. Publish `.md` mirrors of command pages.** The pipeline already produces
`content/commands/*.md`; a Hugo output format could expose them at
`/{Command}.md`. This serves the paste-a-URL-into-Claude case directly and costs
almost nothing given the existing pipeline. Higher value than `llms.txt` itself.

**7. `llms.txt`, last.** Generate it from `commands.json` — H1, blockquote
summary, then H2 sections for Commands / Guides / Articles. Cheap, plausibly
useful for the small share of agent fetches Ahrefs did observe, and honest about
its low expected return. Do not do this before items 1–4.

**8. Verify the Search Console generative AI control is set to include.** It
defaults to inclusion, but the site now has a report to check it against, and
it's a one-click failure mode.

Not recommended: rewriting content "for AI," fragmenting pages into smaller
URLs, or adding FAQPage/HowTo markup. Google names all three as non-requirements
or dead ends.

---

## Sources

Primary (crawler and answer-engine operators):

- [Google — Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — A new resource for optimizing for generative AI in Google Search (May 2026)](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing)
- [Google — Changes to HowTo and FAQ rich results (Aug 2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Google Search Console Help — Search generative AI control](https://support.google.com/webmasters/answer/16908024)
- [web.dev — Prepare your site for AI agents](https://web.dev/articles/ai-agent-site-ux)
- [OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic — Does Anthropic crawl data from the web?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Bing Webmaster Blog — AI Performance in Bing Webmaster Tools (Feb 2026)](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [Microsoft Advertising — Optimizing your content for inclusion in AI search answers (Oct 2025)](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers)
- [Bing Webmaster Blog — Keeping content discoverable with sitemaps in AI-powered search (Jul 2025)](https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search)

Standards:

- [RFC 9309 — Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html)
- [schema.org/APIReference](https://schema.org/APIReference)
- [llmstxt.org — the llms.txt proposal](https://llmstxt.org/)

First-party measurement:

- [Vercel — The rise of the AI crawler](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Vercel — Agent Readability specification](https://vercel.com/kb/guide/agent-readability-spec)
- [Cloudflare — A deeper look at AI crawlers: traffic by purpose and industry](https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry/)
- [Cloudflare Radar — AI Insights](https://radar.cloudflare.com/ai-insights)
- [Ahrefs — We analyzed 137K sites: 97% of llms.txt files never get read (Jun 2026)](https://ahrefs.com/blog/llmstxt-study/)

Vendor-interested (flagged as such):

- [Mintlify — Simplifying docs for AI with /llms.txt](https://www.mintlify.com/blog/simplifying-docs-with-llms-txt)

Site data:

- `docs/dbatools.io-Performance-on-Search-2026-07-31/`
- `docs/dbatools.io-Performance-on-Search-Generative-AI-Features-2026-07-31/`
