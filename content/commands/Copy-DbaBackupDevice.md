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

# Copy-DbaBackupDevice

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaBackupDevice](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaBackupDevice.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaBackupDevice](https://dataplat.github.io/boh#Copy-DbaBackupDevice).

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

Copies all server backup devices from sqlserver2014a to sqlcluster using Windows credentials. If backup devices with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster -BackupDevice backup01 -SourceSqlCredential $cred -Force
```

Copies only the backup device named backup01 from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a    and Windows credentials for sqlcluster. If a backup device with the same <br>
name exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaBackupDevice -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

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
