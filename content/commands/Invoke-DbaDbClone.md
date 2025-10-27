---
title: "Invoke-DbaDbClone"
slug: "Invoke-DbaDbClone"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates lightweight database clones containing schema and statistics but no table data"
tags:
  - "Statistics"
  - "Performance"
  - "Clone"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbClone.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbClone"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbClone</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbClone.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates lightweight database clones containing schema and statistics but no table data

## Description

Creates schema-only database clones using SQL Server's DBCC CLONEDATABASE command. The cloned database contains all database objects (tables, indexes, views, procedures) and statistics, but no actual table data.  
  
This is particularly valuable for performance troubleshooting scenarios where you need to analyze query execution plans and optimizer behavior without the storage overhead of copying entire tables. DBAs commonly use this for reproducing performance issues in test environments or sharing database structures with vendors for support cases.  
  
Read more:  
    - https://sqlperformance.com/2016/08/sql-statistics/expanding-dbcc-clonedatabase  
    - https://support.microsoft.com/en-us/help/3177838/how-to-use-dbcc-clonedatabase-to-generate-a-schema-and-statistics-only  
  
Thanks to Microsoft Tiger Team for the code and idea https://github.com/Microsoft/tigertoolbox/

## Syntax

```powershell
Invoke-DbaDbClone
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
    [[-CloneDatabase] <String[]>]
    [-ExcludeStatistics]
    [-ExcludeQueryStore]
    [-UpdateStatistics]
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
PS C:\> Invoke-DbaDbClone -SqlInstance sql2016 -Database mydb -CloneDatabase myclone
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbClone -SqlInstance sql2016 -Database mydb -CloneDatabase myclone" }

Clones mydb to myclone on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database mydb | Invoke-DbaDbClone -CloneDatabase myclone, myclone2 -UpdateStatistics
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 -Database mydb | Invoke-DbaDbClone -CloneDatabase myclone, myclone2 -UpdateStatistics" }

Updates the statistics of mydb then clones to myclone and myclone2<br>

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

Specifies the source database(s) to clone from the SQL Server instance. Accepts multiple database names for batch operations.  
Use this when connecting directly to an instance rather than piping database objects from Get-DbaDatabase.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline, allowing for filtered operations.  
This method provides more flexibility than the Database parameter for complex database selection scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -CloneDatabase

Specifies the name(s) for the new cloned database(s). If not provided, defaults to adding '_clone' suffix to the source database name.  
Each clone must have a unique name on the target instance and cannot already exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeStatistics

Excludes table and index statistics from the cloned database, creating only the schema structure without statistical metadata.  
Use this when you only need the database structure for schema comparison or when statistics would interfere with your testing scenario. Requires SQL Server 2014 SP2 CU3+ or SQL Server 2016 SP1+.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeQueryStore

Excludes Query Store data from the cloned database, preventing historical query execution data from being copied.  
Use this when you want a clean slate for query performance analysis or when Query Store data is not relevant to your testing scenario. Requires SQL Server 2016 SP1 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UpdateStatistics

Updates column store index statistics in the source database before cloning using Microsoft Tiger Team methodology.  
Use this when working with column store indexes to ensure the clone contains current statistical information for accurate query plan generation.

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
