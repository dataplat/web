---
title: "Get-DbaDbIdentity"
slug: "Get-DbaDbIdentity"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves current identity values from tables without reseeding using DBCC CHECKIDENT"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbIdentity.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbIdentity"
draft: false
---

# Get-DbaDbIdentity

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbIdentity](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbIdentity.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbIdentity](https://dataplat.github.io/boh#Get-DbaDbIdentity).

## Synopsis

Retrieves current identity values from tables without reseeding using DBCC CHECKIDENT

## Description

Executes DBCC CHECKIDENT with the NORESEED option to retrieve current identity seed and column values from specified tables without modifying anything. This provides a safe way to inspect identity column status across multiple tables, databases, and instances simultaneously.  
  
DBAs use this when troubleshooting identity gaps, planning bulk operations, or auditing identity column usage before performing maintenance tasks. Unlike running DBCC CHECKIDENT manually, this command structures the output into readable PowerShell objects that show both the current identity value and the actual highest value in the column.  
  
The NORESEED option ensures no changes are made to your tables - it's purely informational. The function parses the DBCC output to extract specific identity metrics, making it ideal for scripted monitoring and reporting workflows.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql

## Syntax

```powershell
Get-DbaDbIdentity
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
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
PS C:\> Get-DbaDbIdentity -SqlInstance SQLServer2017 -Database AdventureWorks2014 -Table 'Production.ScrapReason'
```

Connects to AdventureWorks2014 on instance SqlServer2017 using Windows Authentication and runs the command DBCC CHECKIDENT('Production.ScrapReason', NORESEED) to return the current identity value.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbIdentity -SqlCredential $cred -Database AdventureWorks2014 -Table 'Production.ScrapReason'
```

Connects to AdventureWorks2014 on instances Sql1 and Sql2/sqlexpress using sqladmin credential and runs the command DBCC CHECKIDENT('Production.ScrapReason', NORESEED) to return the current identity <br>
value.<br>

#####  Example:  3 

```powershell
PS C:\> $query = "Select Quotename(Schema_Name(t.schema_id)) +'.' + QuoteName(t.name) as TableName from sys.columns c INNER JOIN sys.tables t on t.object_id = c.object_id WHERE is_identity = 1 and
```

is_memory_optimized = 0"<br>

```powershell
PS C:\> $IdentityTables = Invoke-DbaQuery -SqlInstance SQLServer2017 -Database AdventureWorks2014 -Query $query -As SingleValue
PS C:\> Get-DbaDbIdentity -SqlInstance SQLServer2017 -Database AdventureWorks2014 -Table $IdentityTables
```

Checks the current identity value for all non memory optimized tables with an Identity in the AdventureWorks2014 database on the SQLServer2017 instance.<br>

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

Specifies which databases to check for identity column values. If not specified, all accessible databases on the instance are processed.  
Use this to focus on specific databases when you don't need identity information from every database on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies the table names to check for current identity seed and column values. Accepts schema-qualified names like 'Production.ScrapReason'.  
This parameter is required since DBCC CHECKIDENT must target specific tables. Use a query against sys.columns to find all tables with identity columns if needed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
