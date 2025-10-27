---
title: "Invoke-DbaDbDbccUpdateUsage"
slug: "Invoke-DbaDbDbccUpdateUsage"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Corrects page and row count inaccuracies in SQL Server catalog views using DBCC UPDATEUSAGE"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccUpdateUsage.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbDbccUpdateUsage"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbDbccUpdateUsage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccUpdateUsage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Corrects page and row count inaccuracies in SQL Server catalog views using DBCC UPDATEUSAGE

## Description

Executes the DBCC UPDATEUSAGE command to identify and fix metadata inconsistencies in catalog views that track space usage information. When these internal counters become inaccurate, system procedures like sp_spaceused return incorrect database and table size reports, making capacity planning and troubleshooting difficult.  
  
This command is essential when you notice discrepancies between actual database file sizes and reported space usage, or when sp_spaceused shows unexpected results after bulk operations, index rebuilds, or database migrations. The function can target entire instances, specific databases, individual tables, or even single indexes depending on your troubleshooting needs.  
  
Common scenarios include fixing space reports after large data imports, resolving inconsistencies following database restores, and correcting metadata after index maintenance operations. The command reads actual page allocations and updates the system catalog views to reflect accurate usage statistics.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-updateusage-transact-sql

## Syntax

```powershell
Invoke-DbaDbDbccUpdateUsage
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String>]
    [[-Index] <String>]
    [-NoInformationalMessages]
    [-CountRows]
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
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017" }

Runs the command DBCC UPDATEUSAGE to update the page or row counts or both for all objects in all databases for the instance SqlServer2017. Connect using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -Database CurrentDB
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -Database CurrentDB" }

Runs the command DBCC UPDATEUSAGE to update the page or row counts or both for all objects in the CurrentDB database for the instance SqlServer2017. Connect using Windows Authentication<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -Database CurrentDB -Table Sometable
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -Database CurrentDB -Table Sometable" }

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC UPDATEUSAGE(SometableId) to update the page or row counts for all indexes in the table.<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Table 'SometableId -Index IndexName -NoInformationalMessages -CountRows
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Table 'SometableId -Index IndexName -NoInformationalMessages -CountRows" }

Connects to CurrentDB on instance SqlServer2017 using sqladmin credential and runs the command DBCC UPDATEUSAGE(SometableId, IndexName) WITH NO_INFOMSGS, COUNT_ROWS to update the page or row counts.<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccUpdateUsage -WhatIf
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccUpdateUsage -WhatIf" }

Displays what will happen if command DBCC UPDATEUSAGE is called against all databases on Sql1 and Sql2/sqlexpress.<br>

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

Specifies which databases to update usage statistics for. Accepts database names or IDs.  
When omitted, DBCC UPDATEUSAGE runs against all accessible databases on the instance.  
Use this to target specific databases when you know which ones have inaccurate space usage reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies a single table or indexed view to update usage statistics for. Accepts table names or object IDs.  
When omitted, DBCC UPDATEUSAGE processes all tables and indexed views in the specified database(s).  
Use this when sp_spaceused reports incorrect sizes for a specific table after bulk operations or index maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Index

Specifies a single index to update usage statistics for. Accepts index names or index IDs.  
Requires the Table parameter to be specified and updates statistics only for that specific index.  
Use this for targeted correction when you know a particular index has inaccurate metadata after rebuilds or reorganization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoInformationalMessages

Suppresses informational messages during DBCC UPDATEUSAGE execution using the NO_INFOMSGS option.  
Use this in automated scripts or when processing many objects to reduce output volume and focus on actual problems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CountRows

Forces DBCC UPDATEUSAGE to recalculate and update row counts in addition to page counts using the COUNT_ROWS option.  
Use this when sp_spaceused shows incorrect row counts, typically after bulk insert/delete operations or database restores.  
Note that this option increases execution time as SQL Server must physically count all rows in affected tables.

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

##### -WhatIf

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
