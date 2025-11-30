---
title: "A New CSV Library: 20% Faster Thanks to Claude Code"
date: 2025-11-30
author: "Chrissy LeMaire"
slug: "new-csv-library"
categories: [announcements]
tags: [csv, import, export, performance]
draft: true
---

This post is about a pretty big update to the CSV import (and now export!) capabilities in [dbatools](https://dbatools.io). If you've used [Import-DbaCsv](https://dbatools.io/Import-DbaCsv), you've been using the LumenWorks CSV library under the hood for years. It's been rock solid and I've sung its praises many times. But LumenWorks was last updated [7-8 years ago](https://github.com/phatcher/CsvReader), and .NET has come a *long* way since then.

I've been using [Claude Code](https://claude.ai/code) for various projects and had a Max 20x account when Anthropic announced they'd be pretty much giving away Opus 4.5 for a week. PERFECT time to use its ultra big brain to rewrite the CSV library!

## The backstory

Way back in 2015, I was obsessed with CSV import speed. I [wrote about testing three different methods](https://blog.netnerds.net/2015/01/powershell-high-performance-techniques-for-importing-csv-to-sql-server/) and eventually settled on a multithreaded approach that could hit 260,000 rows per second. It was glorious! Except... sometimes 4 rows out of millions would go missing. ¯\\_(ツ)_/¯

Ultimately, I gave in and admitted that it wasn't all about speed but rather, reliability. So I [switched to LumenWorks](https://dbatools.io/import-csv-design) and accepted the performance hit in exchange for imports that actually worked.

That was nice and all but then we'd get requests and I couldn't fulfill them because I don't know C# and even if I did, Lumenworks never got updated anyway.

## Enter Claude Code

I asked Claude to create a replacement for LumenWorks that takes advantage of modern .NET features. Here was my initial prompt:

> Create a replacement for LumenWorks.Framework.IO.dll PLUS the additional functionality requested in dbatools issues on GitHub. This library was written over a decade ago. Considering the advances in .NET and SqlClient, please add a CSV reader of better quality (more functionality often seen in paid systems, faster) using recent .NET and Microsoft Data best practices.

What came back was genuinely impressive. The new library uses things like `Span<T>`, `ArrayPool`, and proper async patterns that simply didn't exist when LumenWorks was written. And it shows.

## The results

In my admittedly limited testing, the new Dataplat.Dbatools.Csv library is **20%+ faster than LumenWorks**. Here's a benchmark with 1.17 million rows (229 MB):

| Mode | Rows/Second | Throughput |
|------|-------------|------------|
| Sequential | ~25,000 | 4.8 MB/s |
| Parallel | ~25,300 | 5.5 MB/s |

Twenty percent might not sound like much, but when you're importing tens of millions of rows, it adds up fast. And honestly, even if it were the same speed, I'd still be excited because of all the new features.

## What's new

So. Many. Features. Here are my favorites:

### Multi-character delimiters

You know those weird exports where fields are separated by `::` or `||`? LumenWorks couldn't handle those. Now we can:

```powershell
Import-DbaCsv -Path data.csv -SqlInstance sql01 -Database tempdb -Delimiter "::" -AutoCreateTable
```

### Built-in compression support

Need to import a 2GB CSV but only have 500MB of disk space? Save it as `.csv.gz` and import it directly:

```powershell
Import-DbaCsv -Path huge-data.csv.gz -SqlInstance sql01 -Database staging -AutoCreateTable
```

The decompression happens on-the-fly. No extracting to disk. Supports GZip, Deflate, Brotli (.NET 8+), and ZLib (.NET 8+).

### Parallel processing

For really large files, you can enable parallel parsing:

```powershell
Import-DbaCsv -Path massive.csv -SqlInstance sql01 -Database warehouse -Table BigData -Parallel
```

This spreads the parsing work across your CPU cores. On my 8-core machine, it helped quite a bit with the 10M+ row files.

### Lenient quote handling

Real-world CSVs are messy. Embedded quotes that aren't properly escaped, smart quotes from Word, you name it. The new `-QuoteMode Lenient` option handles these gracefully instead of throwing errors:

```powershell
Import-DbaCsv -Path messy-export.csv -SqlInstance sql01 -Database tempdb -QuoteMode Lenient -AutoCreateTable
```

### Static columns for metadata

Ever wanted to add a "SourceFile" or "ImportDate" column to every row during import? Now you can:

```powershell
$metadata = @{ SourceFile = "sales_q4.csv"; ImportDate = (Get-Date); Region = "EMEA" }
Import-DbaCsv -Path sales.csv -SqlInstance sql01 -Database sales -Table SalesData -StaticColumns $metadata
```

### Custom date parsing

Importing data from Oracle with those fun `dd-MMM-yyyy` dates? No problem:

```powershell
Import-DbaCsv -Path oracle_export.csv -SqlInstance sql01 -Database tempdb -DateTimeFormats @("dd-MMM-yyyy") -AutoCreateTable
```

### Culture-aware parsing

German CSV with comma as decimal separator? French dates? We got you:

```powershell
Import-DbaCsv -Path german_data.csv -SqlInstance sql01 -Database tempdb -Culture "de-DE" -AutoCreateTable
```

## A brand new command: Export-DbaCsv

This one's been requested for years ([GitHub issue #8646](https://github.com/dataplat/dbatools/issues/8646)). We finally have a proper Export-DbaCsv with compression support:

```powershell
# Export a query to compressed CSV
Export-DbaCsv -SqlInstance sql01 -Database Northwind -Query "SELECT * FROM Orders" -Path orders.csv.gz -CompressionType GZip

# Export a whole table
Export-DbaCsv -SqlInstance sql01 -Database Sales -Table "dbo.Customers" -Path customers.csv

# Pipe from other commands
Invoke-DbaQuery -SqlInstance sql01 -Database master -Query "SELECT * FROM sys.databases" |
    Export-DbaCsv -Path databases.csv -DateTimeFormat "yyyy-MM-dd"
```

The output tells you what happened:

```
Path            : C:\exports\orders.csv.gz
RowsExported    : 830000
FileSizeBytes   : 12582912
FileSizeMB      : 12.00
CompressionType : GZip
Elapsed         : 00:00:14.2341234
RowsPerSecond   : 58327.1
```

## Standalone NuGet package

If you're a .NET developer and want to use this outside of PowerShell, the CSV library is available as a standalone NuGet package:

```bash
dotnet add package Dataplat.Dbatools.Csv
```

[![NuGet](https://img.shields.io/nuget/v/Dataplat.Dbatools.Csv.svg)](https://www.nuget.org/packages/Dataplat.Dbatools.Csv)

Full documentation is in the [project README](https://github.com/dataplat/dbatools.library/blob/main/project/Dataplat.Dbatools.Csv/README.md), and if you're migrating from LumenWorks, there's a complete [migration guide](https://github.com/dataplat/dbatools.library/blob/main/project/Dataplat.Dbatools.Csv/MIGRATING-FROM-LUMENWORKS.md).

## What I learned

Working with Claude Code on this project was genuinely interesting. The back-and-forth felt like pair programming with someone who'd read every .NET performance blog ever written. It knew about ArrayPool for reducing allocations, proper use of Span for parsing without creating garbage, and all sorts of optimizations I wouldn't have thought of.

Would I trust it to write production code without review? No way. But as a collaborator that can rapidly prototype ideas and implement patterns correctly? It's been incredibly useful.

## Try it out

All of this is included in the latest version of dbatools:

```powershell
Update-Module dbatools, dbatools.library
```

Or if you're starting fresh:

```powershell
Install-Module dbatools
```

Let us know what you think! File issues on our [GitHub repository](https://github.com/dataplat/dbatools) if you run into any problems.

\- Chrissy
