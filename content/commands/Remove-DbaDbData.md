---
title: "Remove-DbaDbData"
slug: "Remove-DbaDbData"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Truncates all user tables in specified databases to remove all data while preserving table structure."
tags:
  - "Table"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbData.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbData"
draft: false
---

# Remove-DbaDbData

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbData](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbData.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbData](https://dataplat.github.io/boh#Remove-DbaDbData).

## Synopsis

Truncates all user tables in specified databases to remove all data while preserving table structure.

## Description

Removes all data from user tables by truncating each table in the specified databases. When foreign keys or views exist that would prevent truncation, the function automatically scripts them out, drops them temporarily, performs the truncation, then recreates the objects with their original definitions and permissions. This provides a fast way to clear databases for testing or development environments without having to rebuild schemas. The function excludes system databases and only processes user databases to prevent accidental damage to SQL Server internals.

## Syntax

```powershell
Remove-DbaDbData
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-InputObject] <Object[]>]
    [[-Path] <String>]
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
PS C:\> Remove-DbaDbData -SqlInstance localhost -Database dbname
```

Removes all data from the dbname database on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbData -SqlInstance mssql1 -ExcludeDatabase DBA -Confirm:$False
```

Removes all data from all databases on mssql1 except the DBA Database. Doesn't prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> $svr = Connect-DbaInstance -SqlInstance mssql1
PS C:\> $svr | Remove-DbaDbData -Database AdventureWorks2017
```

Removes all data from AdventureWorks2017 on the mssql1 SQL Server Instance, uses piped input from Connect-DbaInstance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance mssql1 -Database AdventureWorks2017 | Remove-DbaDbData
```

Removes all data from AdventureWorks2017 on the mssql1 SQL Server Instance, uses piped input from Get-DbaDatabase.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

Specifies which databases to clear of data. Accepts wildcards for pattern matching.  
When omitted, the function processes all user databases on the instance. System databases are always excluded for safety.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from data removal operations. Use this to protect important databases when clearing multiple databases.  
Commonly used with production or reference databases that should remain untouched during development environment resets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped database objects from Get-DbaDatabase or server connections from Connect-DbaInstance.  
Use this for pipeline operations when you need to filter databases with complex criteria before clearing data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Path

Sets the temporary directory for storing drop and create scripts during the data removal process.  
The function creates temporary SQL scripts for foreign keys and views, then automatically removes them when complete. Defaults to the configured dbatools export path.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
