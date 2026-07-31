---
title: "dbatools MCP Server"
date: 2026-07-30
slug: "mcp"
layout: "mcp"
aliases:
  - /mcp/
  - /mcp/index.html
draft: false
description: "A free, read-only MCP server that gives your AI assistant the real dbatools documentation - every command, parameter and published example. No signup, no API key."
---

Ask an AI assistant how to restore a database with dbatools and you will usually get
something that looks right. Then you run it and find out `-RecoveryTime` was never a
parameter, or that the command it confidently recommended does not exist.

This server fixes that. Point your assistant at it and it searches the real dbatools
documentation - 700-odd commands with their syntax, parameters and published examples,
plus the articles on this site - and cites the page each answer came from, so you can
check it.

**Endpoint:** `https://mcp.dbatools.io`

There is no signup, no API key and no account. Add the URL and it works.

It exists because of [Microsoft's Learn MCP
server](#install-microsofts-learn-server-too), which does the same job for SQL Server
itself and left an obvious gap where dbatools should have been. Install that one too -
details below.

## Add it to your client

{{< mcp-install >}}

Once it is connected, ask your assistant to list its tools. You should see three names
beginning with `dbatools_`.

## What to ask it

You never have to name a tool. Ask the question you actually have and your assistant
will reach for the server on its own:

- *How do I restore a database to a point in time with dbatools?*
- *What is the difference between `-SqlCredential` and `-Credential`?*
- *Show me a worked example of backing up to Azure blob storage.*
- *Which dbatools commands run on Linux?*
- *I need to copy logins between two instances without copying passwords.*

It is at its best on the questions models get wrong from memory: exact parameter names,
which switches are mutually exclusive, and whether a command exists at all.

## The three tools

| Tool | What it returns |
|---|---|
| `dbatools_docs_search` | Up to 10 commands and articles, each with an excerpt and its dbatools.io URL |
| `dbatools_code_sample_search` | Up to 20 worked PowerShell examples, taken from the examples published with each command |
| `dbatools_docs_fetch` | One complete command page or article as markdown, by URL or by bare command name |

## What it can't do

It reads documentation. That is the whole job.

It cannot connect to a SQL Server instance, cannot run a dbatools command, and holds no
credentials of any kind - there is nowhere to put them and nothing that would use them.
The search never leaves the process, because the documentation is compiled into the
deployment artifact and searched in memory.

All three tools are declared read-only in the protocol, so most clients will let you
auto-approve them and stop asking. That is the truthful description of the server, not a
convenience setting.

If what you want is an MCP server that *does* run dbatools commands against your
instances, that is
[dbatools-mcp-server](https://github.com/dataplat/dbatools-mcp-server) - a separate
project that runs locally on your own machine. You can install both at once; their tool
names do not overlap.

## Where it falls short

It is a search engine over a pile of documentation, and it is worth knowing exactly how
narrow that is before you rely on it.

**It has no notion of meaning - it has a vocabulary.** Queries and documents are both
stemmed, so "migrate", "migrating" and "migration" count as one word, and a curated list
of about 120 phrases maps the words DBAs type onto the words the module uses. That is why
"moving a database to another server" does reach the migration commands: because somebody
wrote that mapping down, not because anything understood the question. A phrasing nobody
anticipated falls back to plain word matching and can still come back empty. When it
does, try again in the words the documentation itself would use.

**It cannot tell reading from writing.** Ask which port an instance is listening on and
`Set-DbaTcpPort` may well rank above `Get-DbaTcpPort`, because nothing in the ranking
distinguishes a command that reports something from one that changes it. Check the verb
on anything you are about to run.

**It only knows what is published on this site.** Command help and articles. Not the
GitHub issues, not the Slack channel, not the source code, and not the book. Plenty of
the best dbatools knowledge lives in those and none of it is in here.

**It is only as good as the docs are.** Where a command's help is thin or out of date,
the answer is thin or out of date. Nothing in this server checks the documentation
against the module's actual behaviour.

Platform support is the clearest case. Every command carries the same `Availability:
Windows, Linux, macOS` in its help - `Get-DbaDiskSpace` and `Get-DbaFirewallRule`
included, though both lean on WMI or remoting and do not work on Linux. The real answer
is in [dbatools & SQL on Linux](https://dbatools.io/linux/), which the server does return
for that question: the pure-SQL commands work, the ones that reach into Windows do not,
and the article puts the split at about three quarters. Trust the article, not the field.

**It knows nothing about you.** Not your SQL Server version, not which dbatools version
you have installed, not your instances. Every answer is the general case.

**It can be a day behind.** The index rebuilds daily, so a command merged this morning
may not be findable until tomorrow.

Results are capped, too: ten documents per search, twenty code samples. That is a
deliberate ceiling on how much of your context window one call can eat.

### What it costs your context

The three tool definitions and the server's instructions add up to roughly 640 tokens per
session - about 0.3% of a 200K window, which is nothing. Clients that defer tool schemas
until a tool is actually used bring that down to about 30 tokens for the three names.

The real cost is in results, not definitions. `dbatools_docs_fetch` returns a whole
command page, and a page like `Backup-DbaDatabase` runs to thousands of tokens on its
own. A ten-hit search with excerpts costs more than the tool definitions did for the
entire session. If your context is tight, fetch deliberately rather than reflexively.

## What it records

Tool calls are logged to Application Insights: the query text, how many results came
back, the top hit, how long the search took, plus your user agent and IP address. The
queries that come back empty get read most closely, because they are the fastest way to
find out what the documentation is missing.

Secret-shaped values are stripped before anything is stored - passwords and keys in a
pasted connection string, long token-shaped strings, email addresses. That redaction is
best effort rather than a guarantee, so treat the search box the way you would treat any
other: do not paste a real connection string into it.

Nothing is sold or shared with anyone, and there is no account for it to be attached to.

## Install Microsoft's Learn server too

If you only add one MCP server this week, make it Microsoft's rather than this one.

The [Microsoft Learn MCP server](https://learn.microsoft.com/training/support/mcp-get-started)
puts the whole of Microsoft Learn in front of your assistant: SQL Server itself, T-SQL,
Azure SQL, PowerShell, Windows, the lot. It is free, hosted by Microsoft, and needs no
sign-in. We use it constantly, and it is genuinely the reason this server exists - once
you have watched an assistant stop guessing about SQL Server, the fact that it was still
guessing about dbatools becomes impossible to ignore.

```bash
claude mcp add --transport http microsoft-learn https://learn.microsoft.com/api/mcp
```

Or in VS Code, in `.vscode/mcp.json`:

```json
{
  "servers": {
    "microsoft-learn": {
      "type": "http",
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

Claude Code and Copilot CLI users can install their plugin instead, which brings the
server plus three skills that teach the assistant when to reach for it:

```text
/plugin marketplace add microsoftdocs/mcp
/plugin install microsoft-docs@microsoft-docs-marketplace
```

The two servers answer different halves of the same question. Learn tells you what SQL
Server does and why; this one tells you which dbatools command does it and what the
parameter is actually called. Run both. Their tool names do not collide, and the shape of
this server - search, code samples, fetch - is copied from theirs on purpose, because it
was the right design and there was no reason to invent a worse one.

## How it stays current

The index is rebuilt from three public sources every day at 09:00 UTC, and again on
every deploy:

| Source | Provides |
|---|---|
| [`dbatools-index.json`](https://raw.githubusercontent.com/dataplat/dbatools/master/bin/dbatools-index.json) | Syntax, parameters and examples, straight from the module |
| [`commands.json`](https://dbatools.io/commands.json) | Descriptions, categories and canonical URLs |
| [`articles.json`](https://dbatools.io/articles.json) | Blog posts and pages from this site |

Search is lexical BM25, with stemming, stop words and the synonym map sitting in front of
it. There are no embeddings and no vector database. Storing vectors would be cheap, but
embedding your query at request time would mean either a 25 MB model loaded in the
cold-start path or an API round trip on every single call, and a documentation search
does not need to cost that. The whole corpus fits in memory instead, so a query costs
nothing and returns the same results every time.
