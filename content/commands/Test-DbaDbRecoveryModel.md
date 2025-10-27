---
title: "Test-DbaDbRecoveryModel"
slug: "Test-DbaDbRecoveryModel"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva)"
availability: "Windows, Linux, macOS"
synopsis: "Validates whether databases are truly operating in their configured recovery model"
tags:
  - "DisasterRecovery"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbRecoveryModel.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbRecoveryModel"
draft: false
---

# Test-DbaDbRecoveryModel

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbRecoveryModel](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbRecoveryModel.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbRecoveryModel](https://dataplat.github.io/boh#Test-DbaDbRecoveryModel).

## Synopsis

Validates whether databases are truly operating in their configured recovery model

## Description

When you switch a database into FULL recovery model, it will behave like a SIMPLE recovery model until a full backup is taken in order to begin a log backup chain. This function identifies the gap between configured and actual recovery model behavior.  
  
For FULL recovery databases, the function checks if a log backup chain has been established by examining the last_log_backup_lsn in sys.database_recovery_status. Databases without this value are functionally operating in SIMPLE mode despite being configured for FULL recovery.  
  
This validation is critical for DBAs who need to ensure point-in-time recovery capabilities are actually available, not just configured. It also allows validation of SIMPLE or BULK_LOGGED recovery models on an instance.  
  
Inspired by Paul Randal's post (http://www.sqlskills.com/blogs/paul/new-script-is-that-database-really-in-the-full-recovery-mode/)

## Syntax

```powershell
Test-DbaDbRecoveryModel
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-SqlCredential] <PSCredential>]
    [[-RecoveryModel] <Object>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance sql2005
```

Shows all databases where the configured recovery model is FULL and indicates whether or not they are really in FULL recovery model.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance . | Where-Object {$_.ActualRecoveryModel -ne "FULL"}
```

Only shows the databases that are functionally in 'simple' mode.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance sql2008 -RecoveryModel Bulk_Logged | Sort-Object Server  -Descending
```

Shows all databases where the configured recovery model is BULK_LOGGED and sort them by server name descending<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance localhost | Select-Object -Property *
```

Shows all of the properties for the databases that have Full Recovery Model<br>

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

##### -Database

Specifies which databases to test for recovery model validation. Accepts multiple database names and supports wildcards.  
When specified, only these databases will be evaluated instead of all databases on the instance.  
Useful when you need to verify recovery model behavior for specific databases or troubleshoot particular applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip during recovery model validation. Accepts multiple database names and supports wildcards.  
Use this to exclude system databases, test databases, or databases you know are properly configured when testing large instances.

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

##### -RecoveryModel

Specifies which recovery model to validate against configured settings. Valid values are Full, Simple, or Bulk_Logged.  
Defaults to Full recovery model, which also checks if databases have established a log backup chain for true point-in-time recovery.  
Use Simple or Bulk_Logged when auditing databases that should be configured for those specific recovery models.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Full,Simple,Bulk_Logged |

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


&nbsp;
