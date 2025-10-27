---
title: "Set-DbaDbQueryStoreOption"
slug: "Set-DbaDbQueryStoreOption"
date: 2024-01-01
layout: "single"
author: "Enrico van de Laar (@evdlaar) | Tracy Boggiano (@TracyBoggiano)"
availability: "Windows, Linux, macOS"
synopsis: "Configures Query Store settings to control query performance data collection and retention."
tags:
  - "QueryStore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbQueryStoreOption.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbQueryStoreOption"
draft: false
---

# Set-DbaDbQueryStoreOption

| Property | Value |
| --- | --- |
| **Author** | Enrico van de Laar (@evdlaar) , Tracy Boggiano (@TracyBoggiano) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbQueryStoreOption](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbQueryStoreOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbQueryStoreOption](https://dataplat.github.io/boh#Set-DbaDbQueryStoreOption).

## Synopsis

Configures Query Store settings to control query performance data collection and retention.

## Description

Modifies Query Store configuration options for one or more databases, allowing you to control how SQL Server captures, stores, and manages query execution statistics. Query Store acts as a performance data recorder, tracking query plans and runtime statistics over time for performance analysis and plan regression troubleshooting.  
  
This function lets you set the operational state (enabled/disabled), adjust data collection intervals, configure storage limits, control which queries get captured, and manage data retention policies. You can also enable wait statistics capture and configure advanced custom capture policies in SQL Server 2019 and later.

## Syntax

```powershell
Set-DbaDbQueryStoreOption
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-AllDatabases]
    [[-State] <String[]>]
    [[-FlushInterval] <Int64>]
    [[-CollectionInterval] <Int64>]
    [[-MaxSize] <Int64>]
    [[-CaptureMode] <String[]>]
    [[-CleanupMode] <String[]>]
    [[-StaleQueryThreshold] <Int64>]
    [[-MaxPlansPerQuery] <Int64>]
    [[-WaitStatsCaptureMode] <String[]>]
    [[-CustomCapturePolicyExecutionCount] <Int64>]
    [[-CustomCapturePolicyTotalCompileCPUTimeMS] <Int64>]
    [[-CustomCapturePolicyTotalExecutionCPUTimeMS] <Int64>]
    [[-CustomCapturePolicyStaleThresholdHours] <Int64>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaDbQueryStoreOption -SqlInstance ServerA\SQL -State ReadWrite -FlushInterval 600 -CollectionInterval 10 -MaxSize 100 -CaptureMode All -CleanupMode Auto -StaleQueryThreshold 100
```

-AllDatabases<br>
Configure the Query Store settings for all user databases in the ServerA\SQL Instance.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbQueryStoreOption -SqlInstance ServerA\SQL -FlushInterval 600
```

Only configure the FlushInterval setting for all Query Store databases in the ServerA\SQL Instance.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbQueryStoreOption -SqlInstance ServerA\SQL -Database AdventureWorks -State ReadWrite -FlushInterval 600 -CollectionInterval 10 -MaxSize 100 -CaptureMode all -CleanupMode Auto
```

-StaleQueryThreshold 100<br>
Configure the Query Store settings for the AdventureWorks database in the ServerA\SQL Instance.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbQueryStoreOption -SqlInstance ServerA\SQL -Exclude AdventureWorks -State ReadWrite -FlushInterval 600 -CollectionInterval 10 -MaxSize 100 -CaptureMode all -CleanupMode Auto
```

-StaleQueryThreshold 100<br>
Configure the Query Store settings for all user databases except the AdventureWorks database in the ServerA\SQL Instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

SqlLogin to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to configure Query Store options for. Accepts database names, wildcards, or database objects from Get-DbaDatabase.  
Use this when you need to configure Query Store for specific databases instead of all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from Query Store configuration changes. System databases (master, tempdb, model) are automatically excluded.  
Useful when you want to configure most databases but skip certain ones like staging or temporary databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Configures Query Store options for all user databases on the instance. System databases are automatically excluded.  
Use this switch when you want to apply consistent Query Store settings across all user databases without specifying individual database names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -State

Controls Query Store operational state: ReadWrite enables full data collection, ReadOnly preserves existing data but stops new collection, Off disables Query Store completely.  
Set to ReadWrite to start collecting query performance data, or ReadOnly when troubleshooting performance issues without adding new data overhead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ReadWrite,ReadOnly,Off |

##### -FlushInterval

Sets how frequently Query Store flushes runtime statistics from memory to disk, in seconds. Default is 900 seconds (15 minutes).  
Lower values provide more real-time data persistence but increase disk I/O; higher values reduce I/O but risk losing recent data during unexpected shutdowns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CollectionInterval

Defines how often Query Store aggregates runtime statistics into discrete time intervals, in minutes. Default is 60 minutes.  
Shorter intervals provide finer granularity for performance analysis but consume more storage; longer intervals reduce storage overhead but provide less detailed trending data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxSize

Sets the maximum storage space Query Store can consume in the database, in megabytes. Default is 100 MB.  
Configure based on your database size and query volume; busy OLTP databases may need several GB, while smaller databases can use the default.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CaptureMode

Determines which queries Query Store captures: Auto captures relevant queries based on execution count and resource consumption, All captures every query, None captures no new queries, Custom uses   
defined capture policies (SQL 2019+).  
Use Auto for most production environments to avoid capturing trivial queries; use All for comprehensive troubleshooting or development environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Auto,All,None,Custom |

##### -CleanupMode

Controls automatic cleanup of old Query Store data when approaching the MaxSize limit: Auto removes oldest data first, Off disables automatic cleanup.  
Set to Auto to prevent Query Store from reaching capacity and stopping data collection; use Off only when you want manual control over data retention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Auto,Off |

##### -StaleQueryThreshold

Specifies how many days Query Store retains data for queries that haven't executed recently, used by automatic cleanup processes.  
Set to 30-90 days for most environments; longer retention helps with historical analysis but consumes more space, shorter retention frees space faster.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxPlansPerQuery

Limits how many execution plans Query Store retains for each individual query. Default is 200 plans per query (SQL Server 2017+).  
Higher values help track plan variations in dynamic environments but consume more space; lower values reduce storage but may miss important plan changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -WaitStatsCaptureMode

Enables or disables wait statistics collection in Query Store (SQL Server 2017+). Options are On or Off.  
Enable wait stats capture when you need detailed performance analysis including what queries are waiting for; disable to reduce overhead in high-throughput systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | On,Off |

##### -CustomCapturePolicyExecutionCount

Sets minimum execution count threshold for capturing queries when CaptureMode is Custom (SQL Server 2019+). Queries must execute at least this many times to be captured.  
Use values like 5-10 to capture queries that run regularly but avoid one-time or rarely executed queries that don't impact performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CustomCapturePolicyTotalCompileCPUTimeMS

Sets minimum compilation CPU time threshold in milliseconds for capturing queries when CaptureMode is Custom (SQL Server 2019+).  
Set to values like 1000ms (1 second) to capture queries with significant compilation overhead, helping identify queries that need plan guides or parameter optimization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CustomCapturePolicyTotalExecutionCPUTimeMS

Sets minimum total execution CPU time threshold in milliseconds for capturing queries when CaptureMode is Custom (SQL Server 2019+).  
Use values like 100ms to focus on queries consuming significant CPU resources, filtering out lightweight queries that don't impact overall performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CustomCapturePolicyStaleThresholdHours

Defines how many hours a query can remain inactive before Query Store stops tracking new statistics for it when CaptureMode is Custom (SQL Server 2019+).  
Set to 24-168 hours (1-7 days) to balance between capturing actively used queries and avoiding resource consumption on dormant queries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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

##### -WhatIf

Shows what would happen if the command were to run

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts for confirmation of every step. For example:  
Are you sure you want to perform this action?  
Performing the operation "Changing Desired State" on target "pubs on SQL2016\VNEXT".  
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
