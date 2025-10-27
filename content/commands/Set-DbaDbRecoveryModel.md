---
title: "Set-DbaDbRecoveryModel"
slug: "Set-DbaDbRecoveryModel"
date: 2024-01-01
layout: "single"
author: "Viorel Ciucu (@viorelciucu), cviorel.com"
availability: "Windows, Linux, macOS"
synopsis: "Changes the recovery model for specified databases on SQL Server instances."
tags:
  - "RecoveryModel"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbRecoveryModel.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbRecoveryModel"
draft: false
---

# Set-DbaDbRecoveryModel

| Property | Value |
| --- | --- |
| **Author** | Viorel Ciucu (@viorelciucu), cviorel.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbRecoveryModel](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbRecoveryModel.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbRecoveryModel](https://dataplat.github.io/boh#Set-DbaDbRecoveryModel).

## Synopsis

Changes the recovery model for specified databases on SQL Server instances.

## Description

Changes the recovery model setting for one or more databases, allowing you to switch between Simple, Full, and BulkLogged recovery modes. This is commonly used when preparing databases for different backup strategies, reducing transaction log growth in development environments, or configuring production databases for point-in-time recovery. The function excludes tempdb and database snapshots automatically, and requires explicit database specification for safety.

## Syntax

```powershell
Set-DbaDbRecoveryModel
    [-SqlCredential <PSCredential>]
    -RecoveryModel <String>
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaDbRecoveryModel -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -RecoveryModel <String>
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaDbRecoveryModel
    [-SqlCredential <PSCredential>]
    -RecoveryModel <String>
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-AllDatabases]
    [-EnableException]
    -InputObject <Database[]>
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaDbRecoveryModel -SqlInstance sql2014 -RecoveryModel BulkLogged -Database model -Confirm:$true -Verbose
```

Sets the Recovery Model to BulkLogged for database [model] on SQL Server instance sql2014. User is requested to confirm the action.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2014 -Database TestDB | Set-DbaDbRecoveryModel -RecoveryModel Simple  -Confirm:$false
```

Sets the Recovery Model to Simple for database [TestDB] on SQL Server instance sql2014. Confirmation is not required.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbRecoveryModel -SqlInstance sql2014 -RecoveryModel Simple -Database TestDB -Confirm:$false
```

Sets the Recovery Model to Simple for database [TestDB] on SQL Server instance sql2014. Confirmation is not required.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbRecoveryModel -SqlInstance sql2014 -RecoveryModel Simple -AllDatabases -Confirm:$false
```

Sets the Recovery Model to Simple for ALL user and system databases (except TEMPDB) on SQL Server instance sql2014. Runs without asking for confirmation.<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaDbRecoveryModel -SqlInstance sql2014 -RecoveryModel BulkLogged -Database TestDB1, TestDB2 -Confirm:$false -Verbose
```

Sets the Recovery Model to BulkLogged for [TestDB1] and [TestDB2] databases on SQL Server instance sql2014. Runs without asking for confirmation.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -RecoveryModel

Sets the recovery model for the specified databases. Choose Simple for minimal transaction log usage in development environments, Full for production databases requiring point-in-time recovery, or   
BulkLogged for bulk operations with reduced logging.  
This change affects backup strategy requirements and transaction log growth patterns for the target databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Simple,Full,BulkLogged |

##### -InputObject

Accepts database objects from Get-DbaDatabase or similar commands through the pipeline.  
Use this when you need to apply recovery model changes to a filtered set of databases based on specific criteria like size, last backup date, or other properties.

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

Specifies which databases to change the recovery model for. Accepts database names as strings or wildcard patterns.  
Use this when you need to target specific databases instead of all databases on the instance. Required unless using -AllDatabases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when changing recovery models. Useful when combined with -AllDatabases to exclude specific databases.  
Commonly used to exclude databases that should maintain their current recovery model for operational reasons.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Required switch when you want to change the recovery model for all databases on the instance.  
This safety parameter prevents accidentally modifying all databases without explicit confirmation. Automatically excludes tempdb and database snapshots.

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

Prompts for confirmation. For example:  
Are you sure you want to perform this action?  
Performing the operation "ALTER DATABASE [model] SET RECOVERY Full" on target "[model] on WERES14224".  
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"):

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
