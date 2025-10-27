---
title: "Get-DbaLastGoodCheckDb"
slug: "Get-DbaLastGoodCheckDb"
date: 2024-01-01
layout: "single"
author: "Jakob Bindslet (jakob@bindslet.dk)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the last successful DBCC CHECKDB timestamp and integrity status for databases"
tags:
  - "CHECKDB"
  - "Database"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastGoodCheckDb.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLastGoodCheckDb"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaLastGoodCheckDb</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastGoodCheckDb.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Jakob Bindslet (jakob@bindslet.dk)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves the last successful DBCC CHECKDB timestamp and integrity status for databases

## Description

Retrieves and compares the timestamp for the last successful DBCC CHECKDB operation along with database creation dates. This helps DBAs monitor database integrity checking compliance and identify databases that need attention.  
  
The function returns comprehensive information including days since the last good CHECKDB, database creation date, current status assessment (Ok, New database not checked yet, or CheckDB should be performed), and data purity settings. Use this to quickly identify which databases are overdue for integrity checks in your maintenance routines.  
  
This function supports SQL Server 2005 and higher. For SQL Server 2008 and earlier, it uses DBCC DBINFO() WITH TABLERESULTS to extract the dbi_dbccLastKnownGood field. For newer versions, it uses the LastGoodCheckDbTime property from SMO.  
  
Please note that this script uses the DBCC DBINFO() WITH TABLERESULTS. DBCC DBINFO has several known weak points, such as:  
- DBCC DBINFO is an undocumented feature/command.  
- The LastKnowGood timestamp is updated when a DBCC CHECKFILEGROUP is performed.  
- The LastKnowGood timestamp is updated when a DBCC CHECKDB WITH PHYSICAL_ONLY is performed.  
- The LastKnowGood timestamp does not get updated when a database in READ_ONLY.  
  
An empty ($null) LastGoodCheckDb result indicates that a good DBCC CHECKDB has never been performed.  
  
SQL Server 2008R2 has a "bug" that causes each databases to possess two dbi_dbccLastKnownGood fields, instead of the normal one.  
  
This script will only display the newest timestamp. If -Verbose is specified, the function will announce every time more than one dbi_dbccLastKnownGood fields is encountered.

## Syntax

```powershell
Get-DbaLastGoodCheckDb
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLastGoodCheckDb -SqlInstance ServerA\sql987
```
{: data-copyable="true" data-clean-code="Get-DbaLastGoodCheckDb -SqlInstance ServerA\sql987" }

Returns a custom object displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLastGoodCheckDb -SqlInstance ServerA\sql987 -SqlCredential sqladmin | Format-Table -AutoSize
```
{: data-copyable="true" data-clean-code="Get-DbaLastGoodCheckDb -SqlInstance ServerA\sql987 -SqlCredential sqladmin | Format-Table -AutoSize" }

Returns a formatted table displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled. Authenticates using SQL Server <br>
authentication.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLastGoodCheckDb -SqlInstance sql2016 -ExcludeDatabase "TempDB" | Format-Table -AutoSize
```
{: data-copyable="true" data-clean-code="Get-DbaLastGoodCheckDb -SqlInstance sql2016 -ExcludeDatabase &quot;TempDB&quot; | Format-Table -AutoSize" }

Returns a formatted table displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled. All databases except for "TempDB" <br>
will be displayed in the output.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database DB1, DB2 | Get-DbaLastGoodCheckDb | Format-Table -AutoSize
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 -Database DB1, DB2 | Get-DbaLastGoodCheckDb | Format-Table -AutoSize" }

Returns a formatted table displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled. Only databases DB1 abd DB2 will be <br>
displayed in the output.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

Specifies which databases to check for their last good CHECKDB status. Accepts wildcards for pattern matching.  
When omitted, all user and system databases on the instance will be processed. Use this to focus on specific databases or groups of databases when monitoring CHECKDB compliance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the CHECKDB status check. Commonly used to skip system databases like TempDB or databases with known maintenance schedules.  
Accepts wildcards and multiple database names to filter out databases that don't need regular CHECKDB monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase, allowing for complex filtering scenarios before checking CHECKDB status.  
Use this when you need to apply advanced database filtering logic or when chaining multiple dbatools commands together.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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
