---
title: "Copy-DbaBackupDevice"
slug: "Copy-DbaBackupDevice"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates SQL Server backup devices between instances including both device definitions and physical files"
tags:
  - "Migration"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaBackupDevice.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaBackupDevice"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaBackupDevice</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaBackupDevice.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Migrates SQL Server backup devices between instances including both device definitions and physical files

## Description

Copies SQL Server backup devices from one instance to another, handling both the logical device definition and the physical backup files. This simplifies server migrations and disaster recovery setup by ensuring backup devices are available on target instances.  
  
Physical backup files are transferred using admin shares, and if the original directory structure doesn't exist on the destination, files are automatically placed in SQL Server's default backup directory. Existing backup devices are skipped unless -Force is specified to overwrite them.

## Syntax

```powershell
Copy-DbaBackupDevice
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-BackupDevice] <Object[]>]
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
PS C:\> Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster" }

Copies all server backup devices from sqlserver2014a to sqlcluster using Windows credentials. If backup devices with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster -BackupDevice backup01 -SourceSqlCredential $cred -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster -BackupDevice backup01 -SourceSqlCredential $cred -Force" }

Copies only the backup device named backup01 from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a    and Windows credentials for sqlcluster. If a backup device with the same <br>
name exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the backup devices to copy. The source instance must be SQL Server 2000 or higher with sysadmin access required.  
Use this when migrating backup devices from an existing SQL Server to consolidate backup infrastructure or during server migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies one or more destination SQL Server instances where backup devices will be created. Each destination instance must be SQL Server 2000 or higher with sysadmin access required.  
Use this to specify target servers during migrations, disaster recovery setup, or when standardizing backup device configurations across multiple instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Specifies alternative credentials for connecting to the source SQL Server instance. Accepts PowerShell credentials created with Get-Credential.  
Use this when the source server requires different authentication than your current Windows session, such as SQL Server authentication or a different domain account.  
Supports Windows Authentication, SQL Server Authentication, Active Directory Password, and Active Directory Integrated. For MFA support, use Connect-DbaInstance first.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies alternative credentials for connecting to the destination SQL Server instances. Accepts PowerShell credentials created with Get-Credential.  
Use this when destination servers require different authentication than your current Windows session, such as SQL Server authentication or different domain accounts.  
Supports Windows Authentication, SQL Server Authentication, Active Directory Password, and Active Directory Integrated. For MFA support, use Connect-DbaInstance first.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupDevice

Specifies which backup devices to copy from the source instance. Accepts an array of backup device names and supports tab completion with available devices.  
Use this to selectively copy specific backup devices instead of migrating all devices, which is helpful when you only need certain backup configurations on the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces the recreation of backup devices that already exist on the destination instance by dropping them first. Without this switch, existing backup devices are skipped.  
Use this when you need to overwrite existing backup device configurations with updated settings from the source, such as changing file paths or device properties during migrations.

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
