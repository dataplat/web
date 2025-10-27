---
title: "Set-DbaDbIdentity"
slug: "Set-DbaDbIdentity"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Checks and resets identity column values using DBCC CHECKIDENT"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbIdentity.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbIdentity"
draft: false
---

# Set-DbaDbIdentity

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbIdentity](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbIdentity.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbIdentity](https://dataplat.github.io/boh#Set-DbaDbIdentity).

## Synopsis

Checks and resets identity column values using DBCC CHECKIDENT

## Description

Executes DBCC CHECKIDENT to verify the current identity value for tables with identity columns and optionally reseed them to a specific value.  
This is essential after bulk data operations, imports, or deletes that can leave identity values out of sync with actual table data.  
When run without ReSeedValue, it reports the current identity value and the maximum value in the identity column.  
When ReSeedValue is specified, it resets the identity counter to prevent duplicate key errors or close identity gaps.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql

## Syntax

```powershell
Set-DbaDbIdentity
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [[-ReSeedValue] <Int32>]
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
PS C:\> Set-DbaDbIdentity -SqlInstance SQLServer2017 -Database AdventureWorks2014 -Table 'Production.ScrapReason'
```

Connects to AdventureWorks2014 on instance SqlServer2017 using Windows Authentication and runs the command DBCC CHECKIDENT('Production.ScrapReason') to return the current identity value.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> 'Sql1','Sql2/sqlexpress' | Set-DbaDbIdentity -SqlCredential $cred -Database AdventureWorks2014 -Table 'Production.ScrapReason'
```

Connects to AdventureWorks2014 on instances Sql1 and Sql2/sqlexpress using sqladmin credential and runs the command DBCC CHECKIDENT('Production.ScrapReason') to return the current identity value.<br>

#####  Example:  3 

```powershell
PS C:\> $query = "Select Schema_Name(t.schema_id) +'.' + t.name as TableName from sys.columns c INNER JOIN sys.tables t on t.object_id = c.object_id WHERE is_identity = 1"
PS C:\> $IdentityTables = Invoke-DbaQuery -SqlInstance SQLServer2017 -Database AdventureWorks2014 -Query $query
PS C:\> foreach ($tbl in $IdentityTables) {
PS C:\> Set-DbaDbIdentity -SqlInstance SQLServer2017 -Database AdventureWorks2014 -Table $tbl.TableName
PS C:\> }
```

Checks the current identity value for all tables with an Identity in the AdventureWorks2014 database on the SQLServer2017 and, if it is needed, changes the identity value.<br>

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

Specifies which databases to check for identity values. If not specified, all databases on the instance will be processed.  
When using ReSeedValue, only a single database can be specified since reseeding requires targeting a specific table location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies which tables with identity columns to check or reseed. Use schema.table format for tables not in the default schema.  
When using ReSeedValue, only a single table can be specified since each table's identity must be reseeded individually.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReSeedValue

Sets the next identity value that will be assigned to new rows in the specified table.  
Use this after bulk operations, deletes, or imports that leave gaps in identity sequences or when the identity value needs correction.

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
