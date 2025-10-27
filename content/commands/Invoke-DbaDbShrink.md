---
title: "Invoke-DbaDbShrink"
slug: "Invoke-DbaDbShrink"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Reduces the physical size of database files by removing unused space from data and log files.  - Shrinks can cause severe index fragmentation (to the tune of 99%) - Shrinks can cause massive growth in the database's transaction log - Shrinks can require a lot of time and system resources to perform data movement"
tags:
  - "Shrink"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbShrink.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbShrink"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbShrink</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbShrink.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Reduces the physical size of database files by removing unused space from data and log files.  
  
- Shrinks can cause severe index fragmentation (to the tune of 99%)  
- Shrinks can cause massive growth in the database's transaction log  
- Shrinks can require a lot of time and system resources to perform data movement

## Description

Reduces database file sizes by removing unused space from data files, log files, or both. This function targets specific files within databases and can reclaim substantial disk space when databases have grown significantly beyond their current data requirements.  
  
Use this function sparingly and only when disk space recovery is critical, such as after large data deletions, index rebuilds, or when preparing databases for migration. The function supports chunked shrinking operations to minimize performance impact and provides detailed fragmentation statistics to help assess the operation's effects.  
  
Many awesome SQL people have written about why you should not shrink your data files. Paul Randal and Kalen Delaney wrote great posts about this topic:  
  
http://www.sqlskills.com/blogs/paul/why-you-should-not-shrink-your-data-files  
https://www.itprotoday.com/sql-server/shrinking-data-files  
  
However, there are some cases where a database will need to be shrunk. In the event that you must shrink your database:  
  
1. Ensure you have plenty of space for your T-Log to grow  
2. Understand that shrinks require a lot of CPU and disk resources  
3. Consider running DBCC INDEXDEFRAG or ALTER INDEX ... REORGANIZE after the shrink is complete.

## Syntax

```powershell
Invoke-DbaDbShrink
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllUserDatabases]
    [-PercentFreeSpace <Int32>]
    [-ShrinkMethod <String>]
    [-FileType <String>]
    [-StepSize <Int64>]
    [-StatementTimeout <Int32>]
    [-ExcludeIndexStats]
    [-ExcludeUpdateUsage]
    [-EnableException]
    [-InputObject <Database[]>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaDbShrink -SqlInstance sql2016 -Database Northwind,pubs,Adventureworks2014
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbShrink -SqlInstance sql2016 -Database Northwind,pubs,Adventureworks2014" }

Shrinks Northwind, pubs and Adventureworks2014 to have as little free space as possible.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbShrink -SqlInstance sql2014 -Database AdventureWorks2014 -PercentFreeSpace 50
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbShrink -SqlInstance sql2014 -Database AdventureWorks2014 -PercentFreeSpace 50" }

Shrinks AdventureWorks2014 to have 50% free space. So let's say AdventureWorks2014 was 1GB and it's using 100MB space. The database free space would be reduced to 50MB.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbShrink -SqlInstance sql2014 -Database AdventureWorks2014 -PercentFreeSpace 50 -FileType Data -StepSize 25MB
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbShrink -SqlInstance sql2014 -Database AdventureWorks2014 -PercentFreeSpace 50 -FileType Data -StepSize 25MB" }

Shrinks AdventureWorks2014 to have 50% free space, runs shrinks in 25MB chunks for improved performance.<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbShrink -SqlInstance sql2012 -AllUserDatabases
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbShrink -SqlInstance sql2012 -AllUserDatabases" }

Shrinks all user databases on SQL2012 (not ideal for production)<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2012 -Database Northwind,pubs | Invoke-DbaDbShrink
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2012 -Database Northwind,pubs | Invoke-DbaDbShrink" }

Shrinks all databases coming from a pre-filtered list via Get-DbaDatabase<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to the default instance on localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to shrink on the target instance. Accepts wildcard patterns and multiple database names.  
Use this when you need to shrink specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the shrink operation when processing multiple databases. Accepts wildcard patterns.  
Useful when shrinking all user databases but want to skip critical production databases or those with specific maintenance windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllUserDatabases

Targets all user databases on the instance, excluding system databases (master, model, msdb, tempdb).  
Use this for maintenance operations across an entire instance while preserving system database integrity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PercentFreeSpace

Sets the percentage of free space to maintain in the database files after shrinking, ranging from 0-99. Defaults to 0.  
Leave some free space (10-20%) to accommodate normal database growth and reduce the need for frequent auto-growth events.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ShrinkMethod

Controls how SQL Server performs the shrink operation. Default moves data pages and truncates files.  
EmptyFile migrates all data to other files in the filegroup. NoTruncate moves pages but doesn't truncate. TruncateOnly reclaims space without moving data.  
Use TruncateOnly when possible as it's the least resource-intensive and doesn't cause data movement or fragmentation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Default |
| Accepted Values | Default,EmptyFile,NoTruncate,TruncateOnly |

##### -FileType

Determines which database files to target for shrinking: All (data and log files), Data (only data files), or Log (only log files). Defaults to All.  
Use Data when you only need to reclaim space from data files after large deletions. Use Log to specifically target transaction log files after maintenance operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Data,Log |

##### -StepSize

Breaks large shrink operations into smaller chunks of the specified size. Use PowerShell size notation like 100MB or 1GB.  
Chunked shrinks reduce resource contention and allow for better progress monitoring during large shrink operations. Recommended for databases being shrunk by several gigabytes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -StatementTimeout

Sets the command timeout in minutes for the shrink operation. Defaults to 0 (infinite timeout).  
Large database shrinks can take hours to complete, so the default allows operations to run without timing out.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -ExcludeIndexStats

Skips collecting index fragmentation statistics before and after the shrink operation.  
Use this to speed up the shrink process when you don't need fragmentation analysis or are planning to rebuild indexes immediately afterward.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeUpdateUsage

Skips running DBCC UPDATEUSAGE before the shrink operation to ensure accurate space usage statistics.  
Use this to reduce operation time when space usage statistics are already current or when immediate shrinking is more important than precision.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase output.  
Use this for advanced filtering scenarios or when combining multiple database operations in a pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -WhatIf

Shows what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts for confirmation of every step. For example:  
Are you sure you want to perform this action?  
Performing the operation "Shrink database" on target "pubs on SQL2016\VNEXT".  
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
