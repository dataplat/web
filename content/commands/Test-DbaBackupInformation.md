---
title: "Test-DbaBackupInformation"
slug: "Test-DbaBackupInformation"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Validates backup history objects to ensure successful database restoration"
tags:
  - "Backup"
  - "Restore"
  - "DisasterRecovery"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaBackupInformation.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaBackupInformation"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaBackupInformation</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaBackupInformation.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Validates backup history objects to ensure successful database restoration

## Description

Performs comprehensive pre-restore validation on backup history objects to prevent restore failures before they occur. Input is typically from Format-DbaBackupInformation and gets parsed to verify restore readiness.  
  
This function runs critical validation tests including LSN chain integrity for transaction log backups, backup file accessibility by the SQL Server service account, database existence conflicts, and file path availability. It also creates necessary target directories and prevents file conflicts with existing databases.  
  
Use this before running Restore-DbaDatabase to catch configuration issues early, saving time during maintenance windows or disaster recovery scenarios. Validated backup sets are marked with IsVerified = $True so you can easily filter successful candidates for restoration.  
  
Tests performed include:  
  - Checking unbroken LSN chain for transaction log backups  
  - Verifying target database doesn't exist unless WithReplace is specified  
  - Ensuring backup files exist and are accessible by SQL Server service account  
  - Validating no file conflicts with existing databases  
  - Creating required target directories for database files  
  - Confirming backup files can be read from the specified locations

## Syntax

```powershell
Test-DbaBackupInformation
    [-BackupHistory] <Object[]>
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [-WithReplace]
    [-Continue]
    [-VerifyOnly]
    [-OutputScriptOnly]
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
PS C:\> $BackupHistory | Test-DbaBackupInformation -SqlInstance MyInstance
PS C:\> $PassedDbs = $BackupHistory | Where-Object {$_.IsVerified -eq $True}
PS C:\> $FailedDbs = $BackupHistory | Where-Object {$_.IsVerified -ne $True}
```
{: data-copyable="true" data-clean-code="$BackupHistory | Test-DbaBackupInformation -SqlInstance MyInstance
$PassedDbs = $BackupHistory | Where-Object {$_.IsVerified -eq $True}
$FailedDbs = $BackupHistory | Where-Object {$_.IsVerified -ne $True}" }

Pass in a BackupHistory object to be tested against MyInstance.<br>
Those records that pass are marked as verified. We can then use the IsVerified property to divide the failures and successes<br>

### Required Parameters

##### -BackupHistory

Backup history objects containing restore chain information, typically generated by Format-DbaBackupInformation. Each object represents a backup file with metadata needed for validation including   
database name, backup type, LSN values, and file paths.  
Pass the output from Format-DbaBackupInformation to validate the entire restore sequence before attempting restoration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The Sql Server instance that wil be performing the restore

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

##### -WithReplace

Allows restoration over an existing database with the same name. Without this switch, validation fails if the target database already exists on the destination instance.  
Use this when performing disaster recovery or refresh scenarios where you need to replace the current database with backup data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Continue

Indicates this is a continuation of an existing restore operation, typically used when applying additional transaction log backups. Skips LSN chain validation and allows restoration to databases that   
already exist in RESTORING state.  
Use this when performing point-in-time recovery scenarios where you're applying additional log backups after an initial restore.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -VerifyOnly

Performs limited validation focusing only on backup file accessibility and readability. Skips database existence checks, file path conflicts, and directory creation since no actual restore will occur.  
Use this when you only need to verify that backup files are valid and accessible without testing restore feasibility to the target instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OutputScriptOnly

Prevents automatic creation of missing target directories during validation. Missing paths generate warnings instead of being created automatically.  
Use this for testing restore scenarios without making changes to the file system, or when you need to verify permissions before allowing directory creation.

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
