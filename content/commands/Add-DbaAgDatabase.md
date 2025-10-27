---
title: "Add-DbaAgDatabase"
slug: "Add-DbaAgDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net | Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Adds databases to an Availability Group with automated backup, restore, and synchronization handling."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaAgDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaAgDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaAgDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net , Andreas Jordan (@JordanOrdix), ordix.de</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Adds databases to an Availability Group with automated backup, restore, and synchronization handling.

## Description

Adds databases to an Availability Group and handles the complete process from backup through synchronization. This command eliminates the manual steps typically required when expanding Availability Groups with new databases, automatically managing seeding modes, backup/restore operations, and replica synchronization.  
  
The command executes a comprehensive five-step process for each database:  
* Step 1: Setting seeding mode if needed.  
  - If -SeedingMode is used and the current seeding mode of the replica is not in the desired mode, the seeding mode of the replica is changed.  
  - The seeding mode will not be changed back but stay in this mode.  
  - If the seeding mode is changed to Automatic, the necessary rights to create databases will be granted.  
* Step 2: Running backup and restore if needed.  
  - Action is only taken for replicas with a desired seeding mode of Manual and where the database does not yet exist.  
  - If -UseLastBackup is used, the restore will be performed based on the backup history of the database.  
  - Otherwise a full and log backup will be taken at the primary and those will be restored at the replica using the same folder structure.  
* Step 3: Add the database to the Availability Group on the primary replica.  
  - This step is skipped, if the database is already part of the Availability Group.  
* Step 4: Add the database to the Availability Group on the secondary replicas.  
  - This step is skipped for those replicas, where the database is already joined to the Availability Group.  
* Step 5: Wait for the database to finish joining the Availability Group on the secondary replicas.  
  
Use Test-DbaAvailabilityGroup with -AddDatabase to test if all prerequisites are met before running this command.  
  
For custom backup and restore requirements, perform those operations with Backup-DbaDatabase and Restore-DbaDatabase in advance, ensuring the last log backup has been restored before running Add-DbaAgDatabase.

## Syntax

```powershell
Add-DbaAgDatabase
    [-SqlInstance] <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    -AvailabilityGroup <String>
    -Database <String[]>
    [-Secondary <DbaInstanceParameter[]>]
    [-SecondarySqlCredential <PSCredential>]
    [-SeedingMode <String>]
    [-SharedPath <String>]
    [-UseLastBackup]
    [-AdvancedBackupParams <Hashtable>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Add-DbaAgDatabase
    [-AvailabilityGroup] <String>
    [-Secondary <DbaInstanceParameter[]>]
    [-SecondarySqlCredential <PSCredential>]
    -InputObject <Database[]>
    [-SeedingMode <String>]
    [-SharedPath <String>]
    [-UseLastBackup]
    [-AdvancedBackupParams <Hashtable>]
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
PS C:\> Add-DbaAgDatabase -SqlInstance sql2017a -AvailabilityGroup ag1 -Database db1, db2 -Confirm
```
{: data-copyable="true" data-clean-code="Add-DbaAgDatabase -SqlInstance sql2017a -AvailabilityGroup ag1 -Database db1, db2 -Confirm" }

Adds db1 and db2 to ag1 on sql2017a. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017a | Out-GridView -Passthru | Add-DbaAgDatabase -AvailabilityGroup ag1
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2017a | Out-GridView -Passthru | Add-DbaAgDatabase -AvailabilityGroup ag1" }

Adds selected databases from sql2017a to ag1<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSharePoint -SqlInstance sqlcluster | Add-DbaAgDatabase -AvailabilityGroup SharePoint
```
{: data-copyable="true" data-clean-code="Get-DbaDbSharePoint -SqlInstance sqlcluster | Add-DbaAgDatabase -AvailabilityGroup SharePoint" }

Adds SharePoint databases as found in SharePoint_Config on sqlcluster to ag1 on sqlcluster<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSharePoint -SqlInstance sqlcluster -ConfigDatabase SharePoint_Config_2019 | Add-DbaAgDatabase -AvailabilityGroup SharePoint
```
{: data-copyable="true" data-clean-code="Get-DbaDbSharePoint -SqlInstance sqlcluster -ConfigDatabase SharePoint_Config_2019 | Add-DbaAgDatabase -AvailabilityGroup SharePoint" }

Adds SharePoint databases as found in SharePoint_Config_2019 on sqlcluster to ag1 on sqlcluster<br>

#####  Example:  5 

```powershell
PS C:\> $adv_param = @{
>>    CompressBackup = $true
>>    FileCount = 3
>> }
PS C:\> $splat = @{
>>   SqlInstance = 'sql2017a'
>>   AvailabilityGroup = 'ag1'
>>   Database = 'db1'
>>   Secondary = 'sql2017b'
>>   SeedingMode = 'Manual'
>>   SharedPath = '\\FS\Backup'
>> }
PS C:\> Add-DbaAgDatabase @splat -AdvancedBackupParams $adv_param
```
{: data-copyable="true" data-clean-code="$adv_param = @{
CompressBackup = $true
FileCount = 3
}
$splat = @{
SqlInstance = 'sql2017a'
AvailabilityGroup = 'ag1'
Database = 'db1'
Secondary = 'sql2017b'
SeedingMode = 'Manual'
SharedPath = '\\FS\Backup'
}
Add-DbaAgDatabase @splat -AdvancedBackupParams $adv_param" }

Adds db1 to ag1 on sql2017a and sql2017b. Uses compression and three files while taking the backups.<br>

### Required Parameters

##### -SqlInstance

The primary replica of the Availability Group. Server version must be SQL Server version 2012 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies the target Availability Group name where databases will be added. The AG must already exist and be configured.  
Use this to identify which existing Availability Group should receive the new database members.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to add to the Availability Group. Accepts single database names, arrays, or wildcard patterns.  
Use this when you need to add specific databases rather than piping database objects from Get-DbaDatabase.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from pipeline input, typically from Get-DbaDatabase or Get-DbaDbSharePoint.  
Use this for workflow scenarios where you want to filter databases first, then pipe the results directly into the AG addition process.

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

##### -Secondary

Specifies secondary replica instances to target for database addition. Auto-discovered if not specified.  
Use this when replicas use non-standard ports or when you want to limit the operation to specific secondary replicas rather than all replicas in the AG.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondarySqlCredential

Authentication credentials for connecting to secondary replica instances when they require different credentials than the primary.  
Use this when secondary replicas are in different domains, use SQL authentication, or require service accounts with specific permissions for backup/restore operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SeedingMode

Controls how database data is transferred to secondary replicas during AG addition. Valid values are 'Automatic' or 'Manual'.  
Automatic seeding transfers data directly over the network without requiring backup/restore operations, but needs sufficient network bandwidth and proper endpoint configuration.  
Manual seeding uses traditional backup/restore through shared storage, giving you more control over timing and storage location but requiring accessible file shares.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Automatic,Manual |

##### -SharedPath

Specifies the UNC network path where backups are stored during manual seeding operations. Required when using Manual seeding mode.  
All SQL Server service accounts from primary and secondary replicas must have read/write access to this location. Backup files remain on the share after completion for potential reuse or cleanup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UseLastBackup

Uses existing backup history instead of creating new backups for manual seeding. The most recent log backup must be newer than the most recent full backup.  
Use this when you have recent backups available and want to avoid taking additional backups, reducing backup storage requirements and time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AdvancedBackupParams

Passes additional parameters to Backup-DbaDatabase as a hashtable when creating backups during manual seeding.  
Use this to control backup compression, file count, or other backup-specific settings like @{CompressBackup=$true; FileCount=4} for faster backup operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
