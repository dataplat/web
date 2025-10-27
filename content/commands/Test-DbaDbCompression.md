---
title: "Test-DbaDbCompression"
slug: "Test-DbaDbCompression"
date: 2024-01-01
layout: "single"
author: "Jason Squires (@js_0505), jstexasdba@gmail.com"
availability: "Windows, Linux, macOS"
synopsis: "Analyzes user tables and indexes to recommend optimal compression settings for storage space reduction."
tags:
  - "Compression"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCompression.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbCompression"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDbCompression</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCompression.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jason Squires (@js_0505), jstexasdba@gmail.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Analyzes user tables and indexes to recommend optimal compression settings for storage space reduction.

## Description

Performs comprehensive compression analysis on user tables and indexes to help DBAs identify storage optimization opportunities. Uses SQL Server's sp_estimate_data_compression_savings system procedure combined with workload pattern analysis to recommend the most effective compression type for each object.  
  
This function analyzes your database workload patterns (scan vs update ratios) and calculates potential space savings to recommend ROW compression, PAGE compression, or no compression. Longer server uptime provides more accurate workload statistics, so consider running Get-DbaUptime first to verify sufficient data collection time.  
  
The analysis examines operational statistics from sys.dm_db_index_operational_stats to determine usage patterns:  
- Percent_Update shows the percentage of update operations relative to total operations. Lower update percentages indicate better candidates for page compression.  
- Percent_Scan shows the percentage of scan operations relative to total operations. Higher scan percentages indicate better candidates for page compression.  
- Compression_Type_Recommendation provides specific guidance: 'PAGE', 'ROW', 'NO_GAIN' or '?' when the algorithm cannot determine the best option.  
  
The function automatically excludes tables that cannot be compressed: memory-optimized tables (SQL 2014+), tables with encrypted columns (SQL 2016+), graph tables (SQL 2017+), and tables with sparse columns. It only analyzes user tables with no existing compression and requires SQL Server 2016 SP1 or higher for non-Enterprise editions.  
  
Test-DbaDbCompression script derived from GitHub and the Tiger Team's repository: (https://github.com/Microsoft/tigertoolbox/tree/master/Evaluate-Compression-Gains)  
  
Be aware this may take considerable time on large databases as sp_estimate_data_compression_savings requires shared locks that can be blocked by concurrent activity. The analysis covers only ROW and PAGE compression options, not columnstore compression.

## Syntax

```powershell
Test-DbaDbCompression
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Schema] <String[]>]
    [[-Table] <String[]>]
    [[-ResultSize] <Int32>]
    [[-Rank] <String>]
    [[-FilterBy] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Test-DbaDbCompression -SqlInstance localhost" }

Returns results of all potential compression options for all databases for the default instance on the local host. Returns a recommendation of either Page, Row or NO_GAIN<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA
```
{: data-copyable="true" data-clean-code="Test-DbaDbCompression -SqlInstance ServerA" }

Returns results of all potential compression options for all databases on the instance ServerA<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -Database DBName | Out-GridView
```
{: data-copyable="true" data-clean-code="Test-DbaDbCompression -SqlInstance ServerA -Database DBName | Out-GridView" }

Returns results of all potential compression options for a single database DBName with the recommendation of either Page or Row or NO_GAIN in a nicely formatted GridView<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -ExcludeDatabase MyDatabase -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Test-DbaDbCompression -SqlInstance ServerA -ExcludeDatabase MyDatabase -SqlCredential $cred" }

Returns results of all potential compression options for all databases except MyDatabase on instance ServerA using SQL credentials to authentication to ServerA.<br>
Returns the recommendation of either Page, Row or NO_GAIN<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -Schema Test -Table MyTable
```
{: data-copyable="true" data-clean-code="Test-DbaDbCompression -SqlInstance ServerA -Schema Test -Table MyTable" }

Returns results of all potential compression options for the Table Test.MyTable in instance ServerA on ServerA and ServerB.<br>
Returns the recommendation of either Page, Row or NO_GAIN.<br>
Returns a result for each partition of any Heap, Clustered or NonClustered index.<br>

#####  Example:  6 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA, ServerB -ResultSize 10
```
{: data-copyable="true" data-clean-code="Test-DbaDbCompression -SqlInstance ServerA, ServerB -ResultSize 10" }

Returns results of all potential compression options for all databases on ServerA and ServerB.<br>
Returns the recommendation of either Page, Row or NO_GAIN.<br>
Returns results for the top 10 partitions by TotalPages used per database.<br>

#####  Example:  7 

```powershell
PS C:\> ServerA | Test-DbaDbCompression -Schema Test -ResultSize 10 -Rank UsedPages -FilterBy Table
```
{: data-copyable="true" data-clean-code="ServerA | Test-DbaDbCompression -Schema Test -ResultSize 10 -Rank UsedPages -FilterBy Table" }

Returns results of all potential compression options for all databases on ServerA containing a schema Test<br>
Returns results for the top 10 Tables by Used Pages per database.<br>
Results are split by Table, Index and Partition so more than 10 results may be returned.<br>

#####  Example:  8 

```powershell
PS C:\> $servers = 'Server1','Server2'
PS C:\> $servers | Test-DbaDbCompression -Database DBName | Out-GridView
```
{: data-copyable="true" data-clean-code="$servers = 'Server1','Server2'
$servers | Test-DbaDbCompression -Database DBName | Out-GridView" }

Returns results of all potential compression options for a single database DBName on Server1 or Server2<br>
Returns the recommendation of either Page, Row or NO_GAIN in a nicely formatted GridView<br>

#####  Example:  9 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -Database MyDB -SqlCredential $cred -Schema Test -Table Test1, Test2
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Test-DbaDbCompression -SqlInstance ServerA -Database MyDB -SqlCredential $cred -Schema Test -Table Test1, Test2" }

Returns results of all potential compression options for objects in Database MyDb on instance ServerA using SQL credentials to authentication to ServerA.<br>
Returns the recommendation of either Page, Row or NO_GAIN for tables with Schema Test and name in Test1 or Test2<br>

#####  Example:  10 

```powershell
PS C:\> $servers = 'Server1','Server2'
PS C:\> foreach ($svr in $servers) {
>> Test-DbaDbCompression -SqlInstance $svr | Export-Csv -Path C:\temp\CompressionAnalysisPAC.csv -Append
>> }
```
{: data-copyable="true" data-clean-code="$servers = 'Server1','Server2'
foreach ($svr in $servers) {
Test-DbaDbCompression -SqlInstance $svr | Export-Csv -Path C:\temp\CompressionAnalysisPAC.csv -Append
}" }

This produces a full analysis of all your servers listed and is pushed to a csv for you to analyze.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to analyze for compression opportunities. Accepts multiple database names and supports wildcards.  
Use this to focus analysis on specific databases rather than scanning all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during compression analysis. Helpful when you want to analyze most databases but exclude specific ones.  
Commonly used to skip databases that are already compressed, read-only, or contain sensitive data requiring separate analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters analysis to specific database schemas only. Accepts multiple schema names for targeted analysis.  
Use this when you need compression recommendations for tables in specific schemas like 'dbo', 'sales', or custom application schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Filters analysis to specific table names only. Accepts multiple table names for focused compression analysis.  
Use this when investigating compression opportunities for known large tables or when validating compression recommendations for specific objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ResultSize

Limits the number of objects analyzed per database to control analysis scope and execution time. No limit applied when unspecified.  
Use this on large databases to focus on the biggest storage consumers first, as compression analysis can be time-intensive on systems with thousands of tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Rank

Determines how objects are prioritized when ResultSize limits are applied. Options are TotalPages (default), UsedPages, or TotalRows.  
TotalPages focuses on allocated storage, UsedPages targets actual data consumption, and TotalRows prioritizes by record count for different optimization strategies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | TotalPages |
| Accepted Values | TotalPages,UsedPages,TotalRows |

##### -FilterBy

Sets the granularity level for ResultSize filtering. Options are Partition (default), Index, or Table level filtering.  
Partition level provides most detailed analysis per partition, Index level groups by index, and Table level gives broader table-focused results.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Partition |
| Accepted Values | Partition,Index,Table |

##### -EnableException

By default, when something goes wrong we try to catch it, interpret it and give you a friendly warning message.  
This avoids overwhelming you with "sea of red" exceptions, but is inconvenient because it basically disables advanced scripting.  
Using this switch turns this "nice by default" feature off and enables you to catch exceptions with your own try/catch.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
