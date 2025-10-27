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

# Test-DbaDbCompression

| Property | Value |
| --- | --- |
| **Author** | Jason Squires (@js_0505), jstexasdba@gmail.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbCompression](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCompression.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbCompression](https://dataplat.github.io/boh#Test-DbaDbCompression).

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

Returns results of all potential compression options for all databases for the default instance on the local host. Returns a recommendation of either Page, Row or NO_GAIN<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA
```

Returns results of all potential compression options for all databases on the instance ServerA<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -Database DBName | Out-GridView
```

Returns results of all potential compression options for a single database DBName with the recommendation of either Page or Row or NO_GAIN in a nicely formatted GridView<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -ExcludeDatabase MyDatabase -SqlCredential $cred
```

Returns results of all potential compression options for all databases except MyDatabase on instance ServerA using SQL credentials to authentication to ServerA.<br>
Returns the recommendation of either Page, Row or NO_GAIN<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -Schema Test -Table MyTable
```

Returns results of all potential compression options for the Table Test.MyTable in instance ServerA on ServerA and ServerB.<br>
Returns the recommendation of either Page, Row or NO_GAIN.<br>
Returns a result for each partition of any Heap, Clustered or NonClustered index.<br>

#####  Example:  6 

```powershell
PS C:\> Test-DbaDbCompression -SqlInstance ServerA, ServerB -ResultSize 10
```

Returns results of all potential compression options for all databases on ServerA and ServerB.<br>
Returns the recommendation of either Page, Row or NO_GAIN.<br>
Returns results for the top 10 partitions by TotalPages used per database.<br>

#####  Example:  7 

```powershell
PS C:\> ServerA | Test-DbaDbCompression -Schema Test -ResultSize 10 -Rank UsedPages -FilterBy Table
```

Returns results of all potential compression options for all databases on ServerA containing a schema Test<br>
Returns results for the top 10 Tables by Used Pages per database.<br>
Results are split by Table, Index and Partition so more than 10 results may be returned.<br>

#####  Example:  8 

```powershell
PS C:\> $servers = 'Server1','Server2'
PS C:\> $servers | Test-DbaDbCompression -Database DBName | Out-GridView
```

Returns results of all potential compression options for a single database DBName on Server1 or Server2<br>
Returns the recommendation of either Page, Row or NO_GAIN in a nicely formatted GridView<br>

#####  Example:  9 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Test-DbaDbCompression -SqlInstance ServerA -Database MyDB -SqlCredential $cred -Schema Test -Table Test1, Test2
```

Returns results of all potential compression options for objects in Database MyDb on instance ServerA using SQL credentials to authentication to ServerA.<br>
Returns the recommendation of either Page, Row or NO_GAIN for tables with Schema Test and name in Test1 or Test2<br>

#####  Example:  10 

```powershell
PS C:\> $servers = 'Server1','Server2'
PS C:\> foreach ($svr in $servers) {
>> Test-DbaDbCompression -SqlInstance $svr | Export-Csv -Path C:\temp\CompressionAnalysisPAC.csv -Append
>> }
```

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
