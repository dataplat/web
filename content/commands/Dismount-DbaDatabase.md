---
title: "Dismount-DbaDatabase"
slug: "Dismount-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Detaches one or more databases from a SQL Server instance with built-in safety checks and validation."
tags:
  - "Detach"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Dismount-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Dismount-DbaDatabase"
draft: false
---

# Dismount-DbaDatabase

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Dismount-DbaDatabase](https://github.com/dataplat/dbatools/blob/master/public/Dismount-DbaDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Dismount-DbaDatabase](https://dataplat.github.io/boh#Dismount-DbaDatabase).

## Synopsis

Detaches one or more databases from a SQL Server instance with built-in safety checks and validation.

## Description

Safely detaches databases from SQL Server instances while performing comprehensive validation checks before detachment. This function automatically validates that databases aren't system databases, replicated, or have active snapshots, preventing common detachment failures. When databases are part of mirroring or Availability Groups, the -Force parameter allows automatic cleanup by breaking mirrors and removing databases from AGs before detaching. Active user connections can also be forcibly terminated when needed. This command is essential for database migration scenarios, decommissioning databases, or moving databases between instances without using backup/restore methods.

## Syntax

```powershell
Dismount-DbaDatabase
    [-SqlCredential <PSCredential>]
    [-UpdateStatistics]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Dismount-DbaDatabase -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -Database <String[]>
    [-UpdateStatistics]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Dismount-DbaDatabase
    [-SqlCredential <PSCredential>]
    -InputObject <Database[]>
    [-UpdateStatistics]
    [-Force]
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
PS C:\> Detach-DbaDatabase -SqlInstance sql2016b -Database SharePoint_Config, WSS_Logging
```

Detaches SharePoint_Config and WSS_Logging from sql2016b<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016b -Database 'PerformancePoint Service Application_10032db0fa0041df8f913f558a5dc0d4' | Detach-DbaDatabase -Force
```

Detaches 'PerformancePoint Service Application_10032db0fa0041df8f913f558a5dc0d4' from sql2016b. Since Force was specified, if the database is part of mirror, the mirror will be broken prior to <br>
detaching.<br>
If the database is part of an Availability Group, it will first be dropped prior to detachment.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016b -Database WSS_Logging | Detach-DbaDatabase -Force -WhatIf
```

Shows what would happen if the command were to execute (without actually executing the detach/break/remove commands).<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the name(s) of databases to detach from the SQL Server instance. Accepts wildcards for pattern matching.  
Use this when you need to detach specific databases by name rather than passing database objects through the pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline for detachment operations. Typically used with Get-DbaDatabase output.  
This allows you to filter and select databases using Get-DbaDatabase before detaching them, providing more control over the selection process.

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

##### -UpdateStatistics

Updates database statistics before detaching the database to ensure optimal performance if the database is later reattached.  
Use this when you plan to reattach the database later and want to maintain current statistics for query optimization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses safety checks and handles blocking conditions that prevent database detachment. Automatically breaks database mirroring, removes databases from Availability Groups, and terminates active   
user connections.  
Use this when you need to detach databases that are part of high availability configurations or have active connections that cannot be closed gracefully.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
