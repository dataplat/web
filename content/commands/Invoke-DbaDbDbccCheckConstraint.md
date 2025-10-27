---
title: "Invoke-DbaDbDbccCheckConstraint"
slug: "Invoke-DbaDbDbccCheckConstraint"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Validates constraint integrity by checking for constraint violations in SQL Server databases"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccCheckConstraint.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbDbccCheckConstraint"
draft: false
---

# Invoke-DbaDbDbccCheckConstraint

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbDbccCheckConstraint](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccCheckConstraint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbDbccCheckConstraint](https://dataplat.github.io/boh#Invoke-DbaDbDbccCheckConstraint).

## Synopsis

Validates constraint integrity by checking for constraint violations in SQL Server databases

## Description

Executes DBCC CHECKCONSTRAINTS to identify rows that violate CHECK, FOREIGN KEY, and other constraints in your databases. This command helps DBAs verify data integrity after bulk imports, constraint modifications, or when troubleshooting data quality issues. You can target specific tables, individual constraints, or scan entire databases for violations. The command returns detailed information about any rows that don't meet constraint requirements, including the table, constraint name, and violating data criteria.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkconstraints-transact-sql

## Syntax

```powershell
Invoke-DbaDbDbccCheckConstraint
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Object] <String>]
    [-AllConstraints]
    [-AllErrorMessages]
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
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017
```

Runs the command DBCC CHECKCONSTRAINTS to check all enabled constraints on all tables for all databases for the instance SqlServer2017. Connect using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB
```

Connect to instance SqlServer2017 using Windows Authentication and run the command DBCC CHECKCONSTRAINTS to check all enabled constraints on all tables in the CurrentDB database.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB -Object Sometable
```

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CHECKCONSTRAINTS(SometableId) to check all enabled constraints in the table.<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB -Object ConstraintId
```

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CHECKCONSTRAINTS(ConstraintId) to check the constraint with constraint_id = ConstraintId.<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Object TableId -AllConstraints -AllErrorMessages -NoInformationalMessages
```

Connects to CurrentDB on instance SqlServer2017 using sqladmin credential and runs the command DBCC CHECKCONSTRAINTS(TableId) WITH ALL_CONSTRAINTS, ALL_ERRORMSGS, NO_INFOMSGS to check all enabled and <br>
disabled constraints on the table with able_id = TableId. Returns all rows that violate constraints.<br>

#####  Example:  6 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccCheckConstraint -WhatIf
```

Displays what will happen if command DBCC CHECKCONSTRAINTS is called against all databases on Sql1 and Sql2/sqlexpress.<br>

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

Specifies which databases to check for constraint violations. Accepts multiple database names and supports wildcards for pattern matching.  
If not specified, all accessible databases on the instance will be processed. Use this when you need to target specific databases instead of checking the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Object

Specifies the table or constraint to check for violations. Accepts either table names, constraint names, or their numeric IDs.  
When targeting a table, all enabled constraints on that table are validated. When targeting a specific constraint, only that constraint is checked.  
Use this when you need to focus on a specific table after bulk data operations or when investigating a known problematic constraint.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllConstraints

Forces checking of both enabled and disabled constraints on the specified table or all tables in the database.  
By default, only enabled constraints are validated. Use this when you need to verify data integrity against all constraint definitions, including those temporarily disabled during maintenance   
operations.  
Has no effect when checking a specific constraint by name or ID.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AllErrorMessages

Returns all constraint violation rows instead of limiting output to the first 200 violations per constraint.  
Use this when you need a complete inventory of data quality issues, especially after bulk imports or when preparing comprehensive data cleanup reports.  
Be cautious with large tables as this can generate extensive output.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoInformationalMessages

Suppresses informational messages like "DBCC execution completed" and processing status updates.  
Use this when automating constraint checks in scripts where you only want to capture actual constraint violations, not DBCC status messages.  
Helpful for cleaner output when processing multiple databases or integrating results into monitoring systems.

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
