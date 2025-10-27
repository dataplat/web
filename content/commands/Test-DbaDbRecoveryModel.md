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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDbRecoveryModel</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbRecoveryModel.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@ClaudioESSilva)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaDbRecoveryModel -SqlInstance sql2005" }

Shows all databases where the configured recovery model is FULL and indicates whether or not they are really in FULL recovery model.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance . | Where-Object {$_.ActualRecoveryModel -ne "FULL"}
```
{: data-copyable="true" data-clean-code="Test-DbaDbRecoveryModel -SqlInstance . | Where-Object {$_.ActualRecoveryModel -ne &quot;FULL&quot;}" }

Only shows the databases that are functionally in 'simple' mode.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance sql2008 -RecoveryModel Bulk_Logged | Sort-Object Server  -Descending
```
{: data-copyable="true" data-clean-code="Test-DbaDbRecoveryModel -SqlInstance sql2008 -RecoveryModel Bulk_Logged | Sort-Object Server  -Descending" }

Shows all databases where the configured recovery model is BULK_LOGGED and sort them by server name descending<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaDbRecoveryModel -SqlInstance localhost | Select-Object -Property *
```
{: data-copyable="true" data-clean-code="Test-DbaDbRecoveryModel -SqlInstance localhost | Select-Object -Property *" }

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
