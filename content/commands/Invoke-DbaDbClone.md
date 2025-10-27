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

# Invoke-DbaDbClone

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbClone](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbClone.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbClone](https://dataplat.github.io/boh#Invoke-DbaDbClone).

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

Clones mydb to myclone on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database mydb | Invoke-DbaDbClone -CloneDatabase myclone, myclone2 -UpdateStatistics
```

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
