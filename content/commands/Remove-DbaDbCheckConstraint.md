---
title: "Remove-DbaDbCheckConstraint"
slug: "Remove-DbaDbCheckConstraint"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes check constraints from SQL Server database tables"
tags:
  - "Check"
  - "Constraint"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbCheckConstraint.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbCheckConstraint"
draft: false
---

# Remove-DbaDbCheckConstraint

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbCheckConstraint](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbCheckConstraint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbCheckConstraint](https://dataplat.github.io/boh#Remove-DbaDbCheckConstraint).

## Synopsis

Removes check constraints from SQL Server database tables

## Description

Removes check constraints from database tables across one or more SQL Server instances. Check constraints enforce data integrity by validating that column values meet specific criteria before allowing INSERT or UPDATE operations.  
  
This function is useful when modifying table schemas, removing outdated business rules, or preparing databases for data migration where existing constraints might block bulk operations. You can target specific databases or remove constraints across multiple instances simultaneously.  
  
Supports piping from Get-DbaDbCheckConstraint to remove only specific constraints that match your criteria, such as constraints containing particular patterns or on specific tables.

## Syntax

```powershell
Remove-DbaDbCheckConstraint
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-ExcludeSystemTable]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbCheckConstraint
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-ExcludeSystemTable]
    -InputObject <Check[]>
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
PS C:\> Remove-DbaDbCheckConstraint -SqlInstance localhost, sql2016 -Database db1, db2
```

Removes all check constraints from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  2 

```powershell
PS C:\> $chkcs = Get-DbaDbCheckConstraint -SqlInstance localhost, sql2016 -Database db1, db2
PS C:\> $chkcs | Remove-DbaDbCheckConstraint
```

Removes all check constraints from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbCheckConstraint -SqlInstance localhost, sql2016 -Database db1, db2 -ExcludeSystemTable
```

Removes all check constraints except those in system tables from db1 and db2 on the local and sql2016 SQL Server instances.<br>

### Required Parameters

##### -InputObject

Accepts check constraint objects from Get-DbaDbCheckConstraint for targeted removal operations.  
Use this to remove only specific constraints that match your filtering criteria, such as constraints with certain patterns or on particular tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

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

Specifies which databases to target for check constraint removal. Accepts wildcards and arrays for multiple databases.  
Use this when you need to remove constraints from specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from check constraint removal operations. Accepts wildcards and arrays for multiple databases.  
Use this to protect critical databases like master, msdb, or production databases when running against multiple instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemTable

Excludes check constraints on system tables from the removal operation, focusing only on user-created tables.  
Use this switch when you want to modify only business logic constraints while preserving SQL Server's built-in constraints.

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
This is the default. Use -Confirm:$false to suppress these prompts.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
