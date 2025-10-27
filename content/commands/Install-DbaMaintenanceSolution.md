---
title: "Install-DbaMaintenanceSolution"
slug: "Install-DbaMaintenanceSolution"
date: 2024-01-01
layout: "single"
author: "Viorel Ciucu, cviorel.com"
availability: "Windows, Linux, macOS"
synopsis: "Installs Ola Hallengren's Maintenance Solution stored procedures and optional SQL Agent jobs for automated database maintenance"
tags:
  - "Community"
  - "OlaHallengren"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaMaintenanceSolution.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaMaintenanceSolution"
draft: false
---

# Install-DbaMaintenanceSolution

| Property | Value |
| --- | --- |
| **Author** | Viorel Ciucu, cviorel.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Install-DbaMaintenanceSolution](https://github.com/dataplat/dbatools/blob/master/public/Install-DbaMaintenanceSolution.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Install-DbaMaintenanceSolution](https://dataplat.github.io/boh#Install-DbaMaintenanceSolution).

## Synopsis

Installs Ola Hallengren's Maintenance Solution stored procedures and optional SQL Agent jobs for automated database maintenance

## Description

Deploys Ola Hallengren's comprehensive maintenance framework including DatabaseBackup, DatabaseIntegrityCheck, IndexOptimize, and CommandExecute stored procedures to automate backup, DBCC checks, and index maintenance tasks. Optionally creates pre-configured SQL Agent jobs with intelligent scheduling for daily, weekly, and log backup routines. Replaces manual maintenance scripting with industry-standard procedures used by thousands of SQL Server environments worldwide.

## Syntax

```powershell
Install-DbaMaintenanceSolution
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-BackupLocation] <String>]
    [[-CleanupTime] <Int32>]
    [[-OutputFileDirectory] <String>]
    [-ReplaceExisting]
    [-LogToTable]
    [[-Solution] <String[]>]
    [-InstallJobs]
    [[-AutoScheduleJobs] <String[]>]
    [[-StartTime] <String>]
    [[-LocalFile] <String>]
    [-Force]
    [-InstallParallel]
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
PS C:\> Install-DbaMaintenanceSolution -SqlInstance RES14224 -Database DBA -InstallJobs -CleanupTime 72
```

Installs Ola Hallengren's Solution objects on RES14224 in the DBA database.<br>
Backups will default to the default Backup Directory.<br>
If the Maintenance Solution already exists, the script will be halted.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaMaintenanceSolution -SqlInstance RES14224 -Database DBA -InstallJobs -BackupLocation "Z:\SQLBackup" -CleanupTime 72
```

This will create the Ola Hallengren's Solution objects. Existing objects are not affected in any way.<br>

#####  Example:  3 

```powershell
PS C:\> $params = @{
>> SqlInstance = 'MyServer'
>> Database = 'maintenance'
>> ReplaceExisting = $true
>> InstallJobs = $true
>> LogToTable = $true
>> BackupLocation = 'C:\Data\Backup'
>> CleanupTime = 65
>> Verbose = $true
>> }
>> Install-DbaMaintenanceSolution @params
```

Installs Maintenance Solution to myserver in database. Adds Agent Jobs, and if any currently exist, they'll be replaced.<br>
Since the `LogToTable` switch is enabled, the CommandLog table will be dropped and recreated also.<br>
If the tables relating to `InstallParallel` are present, they will not be dropped.<br>

#####  Example:  4 

```powershell
PS C:\> $params = @{
>> SqlInstance = 'RES14224'
>> Database = 'DBA'
>> InstallJobs = $true
>> BackupLocation = 'Z:\SQLBackup'
>> CleanupTime = 72
>> ReplaceExisting = $true
>> }
PS C:\> Install-DbaMaintenanceSolution @params
```

This will drop and then recreate the Ola Hallengren's Solution objects<br>
The cleanup script will drop and recreate:<br>
- STORED PROCEDURE [dbo].[CommandExecute]<br>
- STORED PROCEDURE [dbo].[DatabaseBackup]<br>
- STORED PROCEDURE [dbo].[DatabaseIntegrityCheck]<br>
- STORED PROCEDURE [dbo].[IndexOptimize]<br>
The tables will not be dropped as the `LogToTable` and `InstallParallel` switches are not enabled.<br>
- [dbo].[CommandLog]<br>
- [dbo].[Queue]<br>
- [dbo].[QueueDatabase]<br>
The following SQL Agent jobs will be deleted:<br>
- 'Output File Cleanup'<br>
- 'IndexOptimize - USER_DATABASES'<br>
- 'sp_delete_backuphistory'<br>
- 'DatabaseBackup - USER_DATABASES - LOG'<br>
- 'DatabaseBackup - SYSTEM_DATABASES - FULL'<br>
- 'DatabaseBackup - USER_DATABASES - FULL'<br>
- 'sp_purge_jobhistory'<br>
- 'DatabaseIntegrityCheck - SYSTEM_DATABASES'<br>
- 'CommandLog Cleanup'<br>
- 'DatabaseIntegrityCheck - USER_DATABASES'<br>
- 'DatabaseBackup - USER_DATABASES - DIFF'<br>

#####  Example:  5 

```powershell
PS C:\> Install-DbaMaintenanceSolution -SqlInstance RES14224 -Database DBA -InstallParallel
```

This will create the Queue and QueueDatabase tables for uses when manually changing jobs to use the @DatabasesInParallel = 'Y' flag<br>

#####  Example:  6 

```powershell
PS C:\> $params = @{
>> SqlInstance = "localhost"
>> InstallJobs = $true
>> CleanupTime = 720
>> AutoSchedule = "WeeklyFull"
>> }
>> Install-DbaMaintenanceSolution @params
```

This will create the Ola Hallengren's Solution objects and the SQL Agent Jobs.<br>
WeeklyFull will create weekly full, daily differential and 15 minute log backups of _user_ databases.<br>
_System_ databases will be backed up daily.<br>
Databases will be backed up to the default location for the instance, and backups will be deleted after 720 hours (30 days).<br>
See https://github.com/dataplat/dbatools/pull/8911 for details on job schedules.<br>

#####  Example:  7 

```powershell
PS C:\> $params = @{
>> SqlInstance = "localhost"
>> InstallJobs = $true
>> CleanupTime = 720
>> AutoScheduleJobs = "DailyFull", "HourlyLog"
>> BackupLocation = "\\sql\backups"
>> StartTime = "231500"
>> }
PS C:\> Install-DbaMaintenanceSolution @params
```

This will create the Ola Hallengren's Solution objects and the SQL Agent Jobs.<br>
The jobs will be scheduled to run daily full user backups at 11:15pm, no differential backups will be created and hourly log backups will be made.<br>
System databases will be backed up at 1:15 am, two hours after the user databases.<br>
Databases will be backed up to a fileshare, and the backups will be deleted after 720 hours (30 days).<br>
See https://blog.netnerds.net/2023/05/install-dbamaintenancesolution-now-supports-auto-scheduling/ for more information.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance onto which the Maintenance Solution will be installed.

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

Specifies the database where Ola Hallengren's maintenance solution objects will be installed. Defaults to master.  
Consider using a dedicated DBA or maintenance database instead of master to keep system databases clean and simplify backup strategies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -BackupLocation

Sets the root directory path where backup files will be stored by the maintenance jobs. Defaults to the instance's default backup location.  
Specify this when you need backups in a specific location for storage policies, network shares, or disk space management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CleanupTime

Defines retention period in hours before backup files are automatically deleted by cleanup jobs.  
Only used when InstallJobs is specified. Common values: 168 hours (1 week), 720 hours (30 days), or 2160 hours (90 days).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OutputFileDirectory

Sets the directory path where SQL Agent jobs will write their output log files during maintenance operations.  
Use this to centralize job output logs for monitoring and troubleshooting maintenance activities.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReplaceExisting

Forces replacement of existing Ola Hallengren objects including stored procedures and SQL Agent jobs.  
Use this when upgrading to newer versions of the maintenance solution or when previous installations need to be refreshed.  
CommandLog and Queue tables are only dropped when LogToTable or InstallParallel switches are also specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LogToTable

Enables command logging to the CommandLog table for tracking maintenance operation history and performance.  
Essential for monitoring backup completion times, index maintenance duration, and troubleshooting failed operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Solution

Determines which maintenance components to install: All, Backup, IntegrityCheck, or IndexOptimize.  
Use specific components when you only need certain maintenance functions or want to install different parts on different servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Backup,IntegrityCheck,IndexOptimize |

##### -InstallJobs

Creates pre-configured SQL Agent jobs for automated execution of backup, integrity check, and index maintenance tasks.  
Without this switch, only the stored procedures are installed and must be scheduled manually or called from custom jobs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AutoScheduleJobs

Automatically creates optimized job schedules for backup operations. Valid values: WeeklyFull, DailyFull, NoDiff, FifteenMinuteLog, HourlyLog.  
WeeklyFull creates weekly full backups, daily differentials, and 15-minute log backups. DailyFull skips differentials. Use HourlyLog for less frequent transaction log backups.  
System databases are always backed up daily regardless of user database schedule. Automatically resolves schedule conflicts by adjusting start times.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | WeeklyFull,DailyFull,NoDiff,FifteenMinuteLog,HourlyLog |

##### -StartTime

Sets the preferred start time for automatically scheduled jobs in HHMMSS format. Defaults to 011500 (1:15 AM).  
The system automatically adjusts this time if conflicts exist with other scheduled jobs. Choose off-peak hours to minimize impact on production workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 011500 |

##### -LocalFile

Specifies path to a local zip file containing Ola Hallengren's maintenance solution instead of downloading from GitHub.  
Use this in environments without internet access or when you need to install a specific version for consistency across multiple servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces fresh download of the maintenance solution from GitHub, bypassing any locally cached version.  
Use this to ensure you're installing the latest version when the cache might contain an older release.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InstallParallel

Creates Queue and QueueDatabase tables required for parallel execution of maintenance operations across multiple databases.  
Enable this when you have many databases and want to run maintenance tasks concurrently to reduce overall completion time.

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
