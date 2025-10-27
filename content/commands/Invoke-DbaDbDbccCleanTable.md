---
title: "Invoke-DbaDbDbccCleanTable"
slug: "Invoke-DbaDbDbccCleanTable"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Reclaims disk space from dropped variable-length columns in tables and indexed views"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccCleanTable.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbDbccCleanTable"
draft: false
---

# Invoke-DbaDbDbccCleanTable

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbDbccCleanTable](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccCleanTable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbDbccCleanTable](https://dataplat.github.io/boh#Invoke-DbaDbDbccCleanTable).

## Synopsis

Reclaims disk space from dropped variable-length columns in tables and indexed views

## Description

Executes DBCC CLEANTABLE to reclaim disk space after variable-length columns (varchar, nvarchar, varbinary, text, ntext, image, xml, or CLR user-defined types) have been dropped from tables or indexed views.  
  
When you drop variable-length columns, SQL Server doesn't immediately reclaim the space those columns occupied. This function runs the necessary DBCC command to physically remove that unused space and compact the remaining data, which can significantly reduce table size and improve performance.  
  
The function accepts either table names (like 'dbo.TableName') or table object IDs for processing. You can control the operation through batch processing to minimize impact on production systems, and optionally suppress informational messages for cleaner output.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-cleantable-transact-sql

## Syntax

```powershell
Invoke-DbaDbDbccCleanTable
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Object] <String[]>]
    [[-BatchSize] <Int32>]
    [-NoInformationalMessages]
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
PS C:\> Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -Database CurrentDB -Object 'dbo.SomeTable'
```

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CLEANTABLE('CurrentDB', 'dbo.SomeTable') to reclaim space after variable-length columns have <br>
been dropped.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -Database CurrentDB -Object 34636372 -BatchSize 5000
```

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CLEANTABLE('CurrentDB', 34636372, 5000) to reclaim space from table with Table_Id = 34636372 <br>
after variable-length columns have been dropped.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Object 'dbo.SomeTable'  -NoInformationalMessages
```

Connects to CurrentDB on instance SqlServer2017 using sqladmin credential and runs the command DBCC CLEANTABLE('CurrentDB', 'dbo.SomeTable') WITH NO_INFOMSGS to reclaim space after variable-length <br>
columns have been dropped.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccCleanTable -Object 'dbo.SomeTable' -BatchSize 5000
```

Runs the command DBCC CLEANTABLE('DatabaseName', 'dbo.SomeTable', 5000) against all databases on Sql1 and Sql2/sqlexpress.<br>

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

Specifies which databases to include in the clean table operation. Accepts multiple database names.  
When omitted, the operation runs against all accessible databases on the instance.  
Use this to target specific databases where you know variable-length columns have been dropped recently.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Object

Specifies the table or indexed view names to clean, or their object IDs for more precise targeting.  
Accepts schema-qualified names like 'dbo.TableName' or numeric object IDs like 34636372.  
This parameter is required since DBCC CLEANTABLE must target specific objects, not entire databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BatchSize

Controls how many rows are processed per transaction during the clean operation.  
Use smaller batch sizes (like 5000-10000) on production systems to reduce lock duration and transaction log impact.  
When omitted, processes the entire table in a single transaction which is faster but holds locks longer.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -NoInformationalMessages

Suppresses informational messages from the DBCC CLEANTABLE output, showing only errors and warnings.  
Use this in automated scripts or when processing multiple tables to reduce console output volume.  
Equivalent to adding WITH NO_INFOMSGS to the DBCC command.

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
