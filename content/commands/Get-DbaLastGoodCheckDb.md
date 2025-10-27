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

# Get-DbaLastGoodCheckDb

| Property | Value |
| --- | --- |
| **Author** | Jakob Bindslet (jakob@bindslet.dk) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaLastGoodCheckDb](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLastGoodCheckDb.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaLastGoodCheckDb](https://dataplat.github.io/boh#Get-DbaLastGoodCheckDb).

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

Returns a custom object displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLastGoodCheckDb -SqlInstance ServerA\sql987 -SqlCredential sqladmin | Format-Table -AutoSize
```

Returns a formatted table displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled. Authenticates using SQL Server <br>
authentication.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLastGoodCheckDb -SqlInstance sql2016 -ExcludeDatabase "TempDB" | Format-Table -AutoSize
```

Returns a formatted table displaying Server, Database, DatabaseCreated, LastGoodCheckDb, DaysSinceDbCreated, DaysSinceLastGoodCheckDb, Status and DataPurityEnabled. All databases except for "TempDB" <br>
will be displayed in the output.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database DB1, DB2 | Get-DbaLastGoodCheckDb | Format-Table -AutoSize
```

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
