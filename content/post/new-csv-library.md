---
title: "A New CSV Library: Built for SQL Server"
date: 2025-11-30
author: "Chrissy LeMaire"
slug: "new-csv-library"
categories: [announcements]
tags: [csv, import, export, performance]
draft: false
images: ["https://dataplat.dbatools.io/csv-social.png"]
---

This post is about a huge update to the CSV import (and now export!) capabilities in dbatools. If you've used [Import-DbaCsv](https://dbatools.io/Import-DbaCsv), you've been using the LumenWorks CSV library under the hood for years. It's been rock solid and I've sung its praises many times. But LumenWorks was last updated [7-8 years ago](https://github.com/phatcher/CsvReader), and .NET has come a *long* way since then.

I've been using [Claude Code](https://claude.ai/code) for various projects and had a Max 20x account when Anthropic announced they'd be pretty much giving away Opus 4.5 for a week. Opus is known for its exceptional quality when it comes to software architecture so this is a PERFECT time to use its ultra big brain to rewrite the CSV library!

## The backstory

Way back in 2015, I was obsessed with CSV import speed. I [wrote about testing three different methods](https://blog.netnerds.net/2015/01/powershell-high-performance-techniques-for-importing-csv-to-sql-server/) and eventually settled on a multithreaded approach that could hit 260,000 rows per second. It was glorious! Except... sometimes 4 rows out of millions would go missing. ¯\\_(ツ)_/¯

Ultimately, I gave in and admitted that it wasn't all about speed but rather, reliability. So I [switched to LumenWorks](https://dbatools.io/import-csv-design) and accepted the performance hit in exchange for imports that actually worked.

That was nice and all but then we'd get requests and I couldn't fulfill them because I don't know C# and even if I did, Lumenworks never got updated anyway.

## Enter Claude Code

I asked Claude to create a replacement for LumenWorks that takes advantage of modern .NET features. Here was my initial prompt:

> Create a replacement for LumenWorks.Framework.IO.dll PLUS the additional functionality requested in dbatools issues on GitHub. This library was written over a decade ago. Considering the advances in .NET and SqlClient, please add a CSV reader of better quality (more functionality often seen in paid systems, faster) using recent .NET and Microsoft Data best practices.

What came back was fast as 🔥 and used several patterns (apparently `Span<T>`, `ArrayPool`, along with proper async) that simply didn't exist when LumenWorks was written. I'm a PowerShell developer so that doesn't mean much to me other than I love the speed.

## The results

Using Claude to figure out benchmarking, I ran proper benchmarks comparing Dataplat.Dbatools.Csv against not just LumenWorks, but also the modern CSV libraries: Sep, Sylvan, and CsvHelper.

**Benchmark: 100,000 rows × 10 columns (.NET 8, AVX-512)**

Here's the interesting thing: performance varies dramatically depending on how you access the data.

**Single column read (typical SqlBulkCopy/IDataReader pattern):**

| Library | Time (ms) | vs Dataplat |
|---------|-----------|-------------|
| Sep | 18 ms | 3.7x faster |
| Sylvan | 27 ms | 2.5x faster |
| **Dataplat** | **67 ms** | **baseline** |
| CsvHelper | 76 ms | 1.1x slower |
| LumenWorks | 395 ms | **5.9x slower** |

**All columns read (full row processing):**

| Library | Time (ms) | vs Dataplat |
|---------|-----------|-------------|
| Sep | 30 ms | 1.8x faster |
| Sylvan | 35 ms | 1.6x faster |
| **Dataplat** | **55 ms** | **baseline** |
| CsvHelper | 97 ms | 1.8x slower |
| LumenWorks | 102 ms | 1.9x slower |

For the single-column pattern (which is how SqlBulkCopy typically reads data), Dataplat is **~6x faster** than LumenWorks! For full row processing, we're **~1.9x faster**.

### Where we stand in 2025

Being honest, if pure parsing speed is your only concern, [Sep](https://github.com/nietras/Sep/) is faster. Sep can hit an insane 21 GB/s with AVX-512 SIMD. But our library isn't trying to be Sep. We're built for **database import workflows** where you need:

- **IDataReader interface** - Stream directly to SqlBulkCopy without intermediate allocations
- **Built-in compression** - Import `.csv.gz` files without extracting first
- **Real-world data handling** - Lenient parsing for messy enterprise exports
- **Progress reporting** - Know how far along your 10 million row import is
- **dbatools integration** - Works seamlessly with Import-DbaCsv

### The speed tradeoff

I asked Claude to explain why we can't match Sep/Sylvan, and it comes down to architecture. Sep uses `Span<T>` and only creates actual strings when you explicitly ask for them. But the `IDataReader` interface that SqlBulkCopy uses requires returning real objects from `GetValue()`. For string columns, that means allocating actual `string` instances—we can't just hand back a span.

Could we create a Sep-like API? Sure. But then you'd need to write your own IDataReader wrapper to use SqlBulkCopy, handle decompression yourself, implement progress reporting... you get the idea. We optimized for the complete workflow, not the micro-benchmark.

For `file.csv.gz → SqlBulkCopy → SQL Server` workflows, Dataplat's integrated pipeline is often comparable to combining Sep + manual decompression + manual IDataReader wrapping, while being simpler to use.

### Why is it so much faster?

For those of you who are into C#, the implementation uses:

- **SIMD-accelerated field search** via `SearchValues<char>` on .NET 8+
- **ArrayPool buffer management** - eliminates per-read buffer allocations
- **Span-based parsing** using `ReadOnlySpan<char>` for zero-copy string slicing
- **Hardware intrinsics** - leverages AVX-512 when available

I understood less than half of that when Claude explained it to me, but the benchmarks don't lie.

## What's new

So many new features that I added to Import-DbaCsv, as requested by users of dbatools! Here are some highlights:

### Multi-character delimiters

For weird exports where fields are separated by `::` or `||` -- LumenWorks couldn't handle those. Now we can:

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

### Progress reporting (v1.1.0)

For those big imports where you want to know what's happening:

```csharp
var options = new CsvReaderOptions
{
    ProgressReportInterval = 10000,
    ProgressCallback = progress =>
    {
        Console.WriteLine($"Processed {progress.RecordsRead:N0} records ({progress.RowsPerSecond:N0}/sec)");
    }
};
```

### Cancellation support (v1.1.0)

Long-running import and need to stop it? CancellationToken support is built in:

```csharp
var options = new CsvReaderOptions
{
    CancellationToken = cancellationTokenSource.Token
};
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

If you're a .NET developer and want to use this outside of PowerShell, the CSV library is available as a standalone NuGet package. Check out the gorrrrgeous [landing page](https://dataplat.dbatools.io/csv) for a quick overview of features and benchmarks.

```bash
dotnet add package Dataplat.Dbatools.Csv
```

[![NuGet](https://img.shields.io/nuget/v/Dataplat.Dbatools.Csv.svg)](https://www.nuget.org/packages/Dataplat.Dbatools.Csv)

### Basic C# usage

```csharp
using Dataplat.Dbatools.Csv.Reader;

// Simple file reading
using var reader = new CsvDataReader("data.csv");
while (reader.Read())
{
    var name = reader.GetString(0);
    var value = reader.GetInt32(1);
    Console.WriteLine($"{name}: {value}");
}
```

### Bulk loading to SQL Server

```csharp
using Dataplat.Dbatools.Csv.Reader;
using Microsoft.Data.SqlClient;

// Stream CSV directly to SQL Server with minimal memory
using var reader = new CsvDataReader("large-data.csv");
using var connection = new SqlConnection(connectionString);
connection.Open();

using var bulkCopy = new SqlBulkCopy(connection)
{
    DestinationTableName = "MyTable",
    BatchSize = 10000
};

bulkCopy.WriteToServer(reader);
Console.WriteLine($"Imported {reader.CurrentRecordIndex} rows");
```

### Reading compressed files

```csharp
// Automatically detects compression from extension (.gz, .br, .deflate, .zlib)
using var reader = new CsvDataReader("data.csv.gz");

// Or specify explicitly with security limits
var options = new CsvReaderOptions
{
    CompressionType = CompressionType.GZip,
    MaxDecompressedSize = 100 * 1024 * 1024  // 100MB limit for security
};
using var reader = new CsvDataReader(stream, options);
```

### Handling messy real-world data

```csharp
var options = new CsvReaderOptions
{
    Delimiter = ";",                                         // Custom delimiter
    Culture = CultureInfo.GetCultureInfo("de-DE"),          // German number formats
    DuplicateHeaderBehavior = DuplicateHeaderBehavior.Rename, // Name, Name_2, Name_3
    MismatchedFieldAction = MismatchedFieldAction.PadOrTruncate,
    QuoteMode = QuoteMode.Lenient,                          // Handle malformed quotes
    CollectParseErrors = true                               // Don't throw, collect errors
};

using var reader = new CsvDataReader("messy-export.csv", options);
while (reader.Read())
{
    // Process valid records
}

// Review any errors
foreach (var error in reader.ParseErrors)
{
    Console.WriteLine($"Row {error.RowIndex}: {error.Message}");
}
```

Full documentation is in the [project README](https://github.com/dataplat/dbatools.library/tree/main/project/Dataplat.Dbatools.Csv), and if you're migrating from LumenWorks, there's a complete [migration guide](https://github.com/dataplat/dbatools.library/blob/main/project/Dataplat.Dbatools.Csv/MIGRATING-FROM-LUMENWORKS.md).


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
