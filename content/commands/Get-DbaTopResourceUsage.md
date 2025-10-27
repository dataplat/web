---
title: "Get-DbaTopResourceUsage"
slug: "Get-DbaTopResourceUsage"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies the most resource-intensive cached queries from sys.dm_exec_query_stats for performance troubleshooting"
tags:
  - "Diagnostic"
  - "Performance"
  - "Query"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTopResourceUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaTopResourceUsage"
draft: false
---

# Get-DbaTopResourceUsage

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaTopResourceUsage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTopResourceUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaTopResourceUsage](https://dataplat.github.io/boh#Get-DbaTopResourceUsage).

## Synopsis

Identifies the most resource-intensive cached queries from sys.dm_exec_query_stats for performance troubleshooting

## Description

Analyzes cached query performance by examining sys.dm_exec_query_stats to find your worst-performing queries across four key metrics: total duration, execution frequency, IO operations, and CPU time. Each metric returns the top consumers (default 20) grouped by query hash, so you can quickly spot patterns in problematic queries that are dragging down server performance.  
  
When your SQL Server is running slowly, this command helps you skip the guesswork and zero in on the specific queries consuming the most resources. Instead of manually writing complex DMV queries, you get formatted results showing query text, execution plans, database context, and performance metrics in one output.  
  
You can focus on specific databases, exclude system objects like replication procedures, or analyze just one metric type (like Duration) when investigating particular performance issues. The results include actual query text and execution plans, so you can immediately start optimizing the problematic SQL.  
  
This command is based off of queries provided by Michael J. Swart at http://michaeljswart.com/go/Top20  
  
Per Michael: "I've posted queries like this before, and others have written many other versions of this query. All these queries are based on sys.dm_exec_query_stats."

## Syntax

```powershell
Get-DbaTopResourceUsage
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Type] <String[]>]
    [[-Limit] <Int32>]
    [-EnableException]
    [-ExcludeSystem]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaTopResourceUsage -SqlInstance sql2008, sql2012
```

Return the 80 (20 x 4 types) top usage results by duration, frequency, IO, and CPU servers for servers sql2008 and sql2012<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTopResourceUsage -SqlInstance sql2008 -Type Duration, Frequency -Database TestDB
```

Return the highest usage by duration (top 20) and frequency (top 20) for the TestDB on sql2008<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTopResourceUsage -SqlInstance sql2016 -Limit 30
```

Return the highest usage by duration (top 30) and frequency (top 30) for the TestDB on sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaTopResourceUsage -SqlInstance sql2008, sql2012 -ExcludeSystem
```

Return the 80 (20 x 4 types) top usage results by duration, frequency, IO, and CPU servers for servers sql2008 and sql2012 without any System Objects<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaTopResourceUsage -SqlInstance sql2016| Select-Object *
```

Return all the columns plus the QueryPlan column<br>

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

Specifies which databases to analyze for resource-intensive queries. Accepts multiple database names.  
Use this when troubleshooting performance issues in specific databases rather than analyzing server-wide query performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when analyzing query performance across the SQL Server instance.  
Use this to exclude test databases, archived databases, or other databases that aren't relevant to your performance investigation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies which resource usage metrics to analyze: Duration, Frequency, IO, CPU, or All (default).  
Use specific types when investigating particular performance symptoms - Duration for slow queries, Frequency for high-activity queries, IO for disk bottlenecks, or CPU for processor-intensive   
operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Duration,Frequency,IO,CPU |

##### -Limit

Controls how many top resource-consuming query hashes to return for each metric type (default is 20).  
Increase this value when you need to analyze more queries, or decrease it to focus on only the most problematic queries during initial performance triage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 20 |

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

##### -ExcludeSystem

Excludes system objects like replication procedures (sp_MS% objects) from the query analysis results.  
Use this when you want to focus on application queries rather than system maintenance operations that may consume resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
