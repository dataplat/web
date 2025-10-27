---
title: "Find-DbaDbDisabledIndex"
slug: "Find-DbaDbDisabledIndex"
date: 2024-01-01
layout: "single"
author: "Jason Squires, sqlnotnull.com"
availability: "Windows, Linux, macOS"
synopsis: "Identifies disabled indexes across SQL Server databases"
tags:
  - "Index"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbDisabledIndex.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaDbDisabledIndex"
draft: false
---

# Find-DbaDbDisabledIndex

| Property | Value |
| --- | --- |
| **Author** | Jason Squires, sqlnotnull.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaDbDisabledIndex](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDbDisabledIndex.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaDbDisabledIndex](https://dataplat.github.io/boh#Find-DbaDbDisabledIndex).

## Synopsis

Identifies disabled indexes across SQL Server databases

## Description

Scans SQL Server databases to locate indexes that have been disabled, returning detailed information including database, schema, table, and index names. Disabled indexes consume storage space but aren't maintained during data modifications, making them candidates for cleanup or re-enabling. This is useful for database maintenance, performance troubleshooting, and identifying indexes that were disabled during bulk operations but never re-enabled.

## Syntax

```powershell
Find-DbaDbDisabledIndex
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-NoClobber]
    [-Append]
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
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sql2005
```

Generates the SQL statements to drop the selected disabled indexes on server "sql2005".<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sqlserver2016 -SqlCredential $cred
```

Generates the SQL statements to drop the selected disabled indexes on server "sqlserver2016", using SQL Authentication to connect to the database.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sqlserver2016 -Database db1, db2
```

Generates the SQL Statement to drop selected indexes in databases db1 & db2 on server "sqlserver2016".<br>

#####  Example:  4 

```powershell
PS C:\> Find-DbaDbDisabledIndex -SqlInstance sqlserver2016
```

Generates the SQL statements to drop selected indexes on all user databases.<br>

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

Specifies which databases to scan for disabled indexes. Accepts multiple database names and supports wildcards.  
When not specified, all accessible user databases on the instance will be scanned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the disabled index scan. Useful when you want to scan most databases but skip certain ones like staging or temp databases.  
Accepts multiple database names to exclude from the operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoClobber

Prevents overwriting existing output files when used with file export functionality.  
Note: This parameter is currently not implemented in the function logic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Appends results to existing output files instead of overwriting them when used with file export functionality.  
Note: This parameter is currently not implemented in the function logic.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
