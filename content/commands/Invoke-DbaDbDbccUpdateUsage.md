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

# Invoke-DbaDbDbccUpdateUsage

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbDbccUpdateUsage](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccUpdateUsage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbDbccUpdateUsage](https://dataplat.github.io/boh#Invoke-DbaDbDbccUpdateUsage).

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

Runs the command DBCC UPDATEUSAGE to update the page or row counts or both for all objects in all databases for the instance SqlServer2017. Connect using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -Database CurrentDB
```

Runs the command DBCC UPDATEUSAGE to update the page or row counts or both for all objects in the CurrentDB database for the instance SqlServer2017. Connect using Windows Authentication<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -Database CurrentDB -Table Sometable
```

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC UPDATEUSAGE(SometableId) to update the page or row counts for all indexes in the table.<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbDbccUpdateUsage -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Table 'SometableId -Index IndexName -NoInformationalMessages -CountRows
```

Connects to CurrentDB on instance SqlServer2017 using sqladmin credential and runs the command DBCC UPDATEUSAGE(SometableId, IndexName) WITH NO_INFOMSGS, COUNT_ROWS to update the page or row counts.<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccUpdateUsage -WhatIf
```

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
