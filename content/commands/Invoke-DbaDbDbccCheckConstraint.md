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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbDbccCheckConstraint</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccCheckConstraint.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017" }

Runs the command DBCC CHECKCONSTRAINTS to check all enabled constraints on all tables for all databases for the instance SqlServer2017. Connect using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB" }

Connect to instance SqlServer2017 using Windows Authentication and run the command DBCC CHECKCONSTRAINTS to check all enabled constraints on all tables in the CurrentDB database.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB -Object Sometable
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB -Object Sometable" }

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CHECKCONSTRAINTS(SometableId) to check all enabled constraints in the table.<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB -Object ConstraintId
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -Database CurrentDB -Object ConstraintId" }

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CHECKCONSTRAINTS(ConstraintId) to check the constraint with constraint_id = ConstraintId.<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Object TableId -AllConstraints -AllErrorMessages -NoInformationalMessages
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Invoke-DbaDbDbccCheckConstraint -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Object TableId -AllConstraints -AllErrorMessages -NoInformationalMessages" }

Connects to CurrentDB on instance SqlServer2017 using sqladmin credential and runs the command DBCC CHECKCONSTRAINTS(TableId) WITH ALL_CONSTRAINTS, ALL_ERRORMSGS, NO_INFOMSGS to check all enabled and <br>
disabled constraints on the table with able_id = TableId. Returns all rows that violate constraints.<br>

#####  Example:  6 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccCheckConstraint -WhatIf
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccCheckConstraint -WhatIf" }

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
