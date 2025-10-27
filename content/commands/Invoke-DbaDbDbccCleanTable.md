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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbDbccCleanTable</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDbccCleanTable.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -Database CurrentDB -Object 'dbo.SomeTable'" }

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CLEANTABLE('CurrentDB', 'dbo.SomeTable') to reclaim space after variable-length columns have <br>
been dropped.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -Database CurrentDB -Object 34636372 -BatchSize 5000
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -Database CurrentDB -Object 34636372 -BatchSize 5000" }

Connects to CurrentDB on instance SqlServer2017 using Windows Authentication and runs the command DBCC CLEANTABLE('CurrentDB', 34636372, 5000) to reclaim space from table with Table_Id = 34636372 <br>
after variable-length columns have been dropped.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Object 'dbo.SomeTable'  -NoInformationalMessages
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Invoke-DbaDbDbccCleanTable -SqlInstance SqlServer2017 -SqlCredential $cred -Database CurrentDB -Object 'dbo.SomeTable'  -NoInformationalMessages" }

Connects to CurrentDB on instance SqlServer2017 using sqladmin credential and runs the command DBCC CLEANTABLE('CurrentDB', 'dbo.SomeTable') WITH NO_INFOMSGS to reclaim space after variable-length <br>
columns have been dropped.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccCleanTable -Object 'dbo.SomeTable' -BatchSize 5000
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Invoke-DbaDbDbccCleanTable -Object 'dbo.SomeTable' -BatchSize 5000" }

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
