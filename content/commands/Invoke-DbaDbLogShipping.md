---
title: "Invoke-DbaDbLogShipping"
slug: "Invoke-DbaDbLogShipping"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Invoke-DbaDbLogShipping sets up log shipping for one or more databases"
tags:
  - "LogShipping"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbLogShipping.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbLogShipping"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbLogShipping</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbLogShipping.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad), sqlstad.nl</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Invoke-DbaDbLogShipping sets up log shipping for one or more databases

## Description

Invoke-DbaDbLogShipping helps to easily set up log shipping for one or more databases.  
  
This function will make a lot of decisions for you assuming you want default values like a daily interval for the schedules with a 15 minute interval on the day.  
There are some settings that cannot be made by the function and they need to be prepared before the function is executed.  
  
The following settings need to be made before log shipping can be initiated:  
- Backup destination (the folder and the privileges)  
- Copy destination (the folder and the privileges)  
  
* Privileges  
Make sure your agent service on both the primary and the secondary instance is an Active Directory account.  
Also have the credentials ready to set the folder permissions  
  
** Network share  
The backup destination needs to be shared and have the share privileges of FULL CONTROL to Everyone.  
  
** NTFS permissions  
The backup destination must have at least read/write permissions for the primary instance agent account.  
The backup destination must have at least read permissions for the secondary instance agent account.  
The copy destination must have at least read/write permission for the secondary instance agent account.

## Syntax

```powershell
Invoke-DbaDbLogShipping
    [-SourceSqlInstance] <DbaInstanceParameter>
    [-DestinationSqlInstance] <DbaInstanceParameter[]>
    [[-SourceSqlCredential] <PSCredential>]
    [[-SourceCredential] <PSCredential>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-DestinationCredential] <PSCredential>]
    [-Database] <Object[]>
    [-SharedPath] <String>
    [[-LocalPath] <String>]
    [[-BackupJob] <String>]
    [[-BackupRetention] <Int32>]
    [[-BackupSchedule] <String>]
    [-BackupScheduleDisabled]
    [[-BackupScheduleFrequencyType] <Object>]
    [[-BackupScheduleFrequencyInterval] <Object[]>]
    [[-BackupScheduleFrequencySubdayType] <Object>]
    [[-BackupScheduleFrequencySubdayInterval] <Int32>]
    [[-BackupScheduleFrequencyRelativeInterval] <Object>]
    [[-BackupScheduleFrequencyRecurrenceFactor] <Int32>]
    [[-BackupScheduleStartDate] <String>]
    [[-BackupScheduleEndDate] <String>]
    [[-BackupScheduleStartTime] <String>]
    [[-BackupScheduleEndTime] <String>]
    [[-BackupThreshold] <Int32>]
    [-CompressBackup]
    [[-CopyDestinationFolder] <String>]
    [[-CopyJob] <String>]
    [[-CopyRetention] <Int32>]
    [[-CopySchedule] <String>]
    [-CopyScheduleDisabled]
    [[-CopyScheduleFrequencyType] <Object>]
    [[-CopyScheduleFrequencyInterval] <Object[]>]
    [[-CopyScheduleFrequencySubdayType] <Object>]
    [[-CopyScheduleFrequencySubdayInterval] <Int32>]
    [[-CopyScheduleFrequencyRelativeInterval] <Object>]
    [[-CopyScheduleFrequencyRecurrenceFactor] <Int32>]
    [[-CopyScheduleStartDate] <String>]
    [[-CopyScheduleEndDate] <String>]
    [[-CopyScheduleStartTime] <String>]
    [[-CopyScheduleEndTime] <String>]
    [-DisconnectUsers]
    [[-FullBackupPath] <String>]
    [-GenerateFullBackup]
    [[-HistoryRetention] <Int32>]
    [-NoRecovery]
    [-NoInitialization]
    [[-PrimaryMonitorServer] <String>]
    [[-PrimaryMonitorCredential] <PSCredential>]
    [[-PrimaryMonitorServerSecurityMode] <Object>]
    [-PrimaryThresholdAlertEnabled]
    [[-RestoreDataFolder] <String>]
    [[-RestoreLogFolder] <String>]
    [[-RestoreDelay] <Int32>]
    [[-RestoreAlertThreshold] <Int32>]
    [[-RestoreJob] <String>]
    [[-RestoreRetention] <Int32>]
    [[-RestoreSchedule] <String>]
    [-RestoreScheduleDisabled]
    [[-RestoreScheduleFrequencyType] <Object>]
    [[-RestoreScheduleFrequencyInterval] <Object[]>]
    [[-RestoreScheduleFrequencySubdayType] <Object>]
    [[-RestoreScheduleFrequencySubdayInterval] <Int32>]
    [[-RestoreScheduleFrequencyRelativeInterval] <Object>]
    [[-RestoreScheduleFrequencyRecurrenceFactor] <Int32>]
    [[-RestoreScheduleStartDate] <String>]
    [[-RestoreScheduleEndDate] <String>]
    [[-RestoreScheduleStartTime] <String>]
    [[-RestoreScheduleEndTime] <String>]
    [[-RestoreThreshold] <Int32>]
    [[-SecondaryDatabasePrefix] <String>]
    [[-SecondaryDatabaseSuffix] <String>]
    [[-SecondaryMonitorServer] <String>]
    [[-SecondaryMonitorCredential] <PSCredential>]
    [[-SecondaryMonitorServerSecurityMode] <Object>]
    [-SecondaryThresholdAlertEnabled]
    [-Standby]
    [[-StandbyDirectory] <String>]
    [-UseExistingFullBackup]
    [[-UseBackupFolder] <String>]
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
PS C:\> $params = @{
>> SourceSqlInstance = 'sql1'
>> DestinationSqlInstance = 'sql2'
>> Database = 'db1'
>> SharedPath= '\\sql1\logshipping'
>> LocalPath= 'D:\Data\logshipping'
>> BackupScheduleFrequencyType = 'daily'
>> BackupScheduleFrequencyInterval = 1
>> CompressBackup = $true
>> CopyScheduleFrequencyType = 'daily'
>> CopyScheduleFrequencyInterval = 1
>> GenerateFullBackup = $true
>> RestoreScheduleFrequencyType = 'daily'
>> RestoreScheduleFrequencyInterval = 1
>> SecondaryDatabaseSuffix = 'LS'
>> CopyDestinationFolder = '\\sql2\logshippingdest'
>> Force = $true
>> }
>>
PS C:\> Invoke-DbaDbLogShipping @params
```
{: data-copyable="true" data-clean-code="$params = @{
SourceSqlInstance = 'sql1'
DestinationSqlInstance = 'sql2'
Database = 'db1'
SharedPath= '\\sql1\logshipping'
LocalPath= 'D:\Data\logshipping'
BackupScheduleFrequencyType = 'daily'
BackupScheduleFrequencyInterval = 1
CompressBackup = $true
CopyScheduleFrequencyType = 'daily'
CopyScheduleFrequencyInterval = 1
GenerateFullBackup = $true
RestoreScheduleFrequencyType = 'daily'
RestoreScheduleFrequencyInterval = 1
SecondaryDatabaseSuffix = 'LS'
CopyDestinationFolder = '\\sql2\logshippingdest'
Force = $true
}
Invoke-DbaDbLogShipping @params" }

Sets up log shipping for database "db1" with the backup path to a network share allowing local backups.<br>
It creates daily schedules for the backup, copy and restore job with all the defaults to be executed every 15 minutes daily.<br>
The secondary database will be called "db1_LS".<br>

#####  Example:  2 

```powershell
PS C:\> $params = @{
>> SourceSqlInstance = 'sql1'
>> DestinationSqlInstance = 'sql2'
>> Database = 'db1'
>> SharedPath= '\\sql1\logshipping'
>> GenerateFullBackup = $true
>> Force = $true
>> }
>>
PS C:\> Invoke-DbaDbLogShipping @params
```
{: data-copyable="true" data-clean-code="$params = @{
SourceSqlInstance = 'sql1'
DestinationSqlInstance = 'sql2'
Database = 'db1'
SharedPath= '\\sql1\logshipping'
GenerateFullBackup = $true
Force = $true
}
Invoke-DbaDbLogShipping @params" }

Sets up log shipping with all defaults except that a backup file is generated.<br>
The script will show a message that the copy destination has not been supplied and asks if you want to use the default which would be the backup directory of the secondary server with the folder <br>
"logshipping" i.e. "D:\SQLBackup\Logshiping".<br>

### Required Parameters

##### -SourceSqlInstance

Source SQL Server instance which contains the databases to be log shipped.  
You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias | SourceServerInstance,SourceSqlServerSqlServer,Source |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlInstance

Destination SQL Server instance which contains the databases to be log shipped.  
You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias | DestinationServerInstance,DestinationSqlServer,Destination |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which database(s) to configure for log shipping. The database must be in FULL recovery model.  
Use this to target specific databases rather than setting up log shipping for all databases on the source instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SharedPath

Specifies the network share path where transaction log backup files will be stored. Must be in UNC format (\\server\\share).  
The function automatically creates a subdirectory for each database under this path. Both source and destination instances need access to this location.

| Property | Value |
| --- | --- |
| Alias | BackupNetworkPath |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalPath

Sets the local backup path on the source server when different from the shared path.  
Use this when the source server accesses the backup location via a local path but other servers need to access it via the network share.

| Property | Value |
| --- | --- |
| Alias | BackupLocalPath |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupJob

Specifies the prefix for the SQL Agent backup job name that performs transaction log backups.  
The database name is automatically appended to create the full job name. Defaults to 'LSBackup_' if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupRetention

Sets how long backup files are retained before deletion, specified in minutes.  
Defaults to 4320 minutes (72 hours). Consider storage capacity and recovery requirements when setting this value.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BackupSchedule

Name of the backup schedule created for the backup job.  
The parameter works as a prefix where the name of the database will be added to the backup job schedule name.  
Default is "LSBackupSchedule_[databasename]"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupScheduleDisabled

Creates the backup job schedule in a disabled state, preventing automatic execution.  
Use this when you want to manually control when log shipping backup jobs start running.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BackupScheduleFrequencyType

Controls how often the backup job runs. Accepts 'Daily' (most common), 'AgentStart', or 'IdleComputer'.  
Daily scheduling allows for regular transaction log backups to maintain the log shipping chain.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Daily,Weekly,AgentStart,IdleComputer |

##### -BackupScheduleFrequencyInterval

The number of type periods to occur between each execution of the backup job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupScheduleFrequencySubdayType

Specifies the units for the sub-day FrequencyInterval.  
Allowed values are "Time", "Seconds", "Minutes", "Hours"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Time,Seconds,Minutes,Hours |

##### -BackupScheduleFrequencySubdayInterval

Specifies the interval between backup job executions within a day when using Minutes, Seconds, or Hours frequency.  
For example, setting 15 with FrequencySubdayType of 'Minutes' creates backups every 15 minutes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BackupScheduleFrequencyRelativeInterval

A job's occurrence of FrequencyInterval in each month, if FrequencyInterval is 32 (monthlyrelative).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Unused,First,Second,Third,Fourth,Last |

##### -BackupScheduleFrequencyRecurrenceFactor

The number of weeks or months between the scheduled execution of a job. FrequencyRecurrenceFactor is used only if FrequencyType is 8, "Weekly", 16, "Monthly", 32 or "MonthlyRelative".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -BackupScheduleStartDate

The date on which execution of a job can begin.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupScheduleEndDate

The date on which execution of a job can stop.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupScheduleStartTime

The time on any day to begin execution of a job. Format HHMMSS / 24 hour clock.  
Example: '010000' for 01:00:00 AM.  
Example: '140000' for 02:00:00 PM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupScheduleEndTime

The time on any day to end execution of a job. Format HHMMSS / 24 hour clock.  
Example: '010000' for 01:00:00 AM.  
Example: '140000' for 02:00:00 PM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupThreshold

Sets the alert threshold in minutes for detecting backup delays. An alert is raised if no backup occurs within this timeframe.  
Defaults to 60 minutes. Use shorter intervals for critical databases requiring frequent log backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CompressBackup

Enables backup compression for transaction log backups to reduce file size and network transfer time.  
Only available on SQL Server 2008 and later. Uses server default compression setting if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyDestinationFolder

Specifies the destination folder path where backup files are copied on the secondary server.  
The function creates a database-specific subdirectory under this path. Defaults to the secondary server's backup directory if not provided.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyJob

Name of the copy job that will be created in the SQL Server agent.  
The parameter works as a prefix where the name of the database will be added to the copy job name.  
The default is "LSBackup_[databasename]"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyRetention

The copy retention period in minutes. Default is 4320 / 72 hours

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CopySchedule

Name of the backup schedule created for the copy job.  
The parameter works as a prefix where the name of the database will be added to the copy job schedule name.  
Default is "LSCopy_[DestinationServerName]_[DatabaseName]"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyScheduleDisabled

Parameter to set the copy schedule to disabled upon creation.  
By default the schedule is enabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyScheduleFrequencyType

A value indicating when a job is to be executed.  
Allowed values are "Daily", "AgentStart", "IdleComputer"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Daily,Weekly,AgentStart,IdleComputer |

##### -CopyScheduleFrequencyInterval

The number of type periods to occur between each execution of the copy job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyScheduleFrequencySubdayType

Specifies the units for the subday FrequencyInterval.  
Allowed values are "Time", "Seconds", "Minutes", "Hours"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Time,Seconds,Minutes,Hours |

##### -CopyScheduleFrequencySubdayInterval

The number of subday type periods to occur between each execution of the copy job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CopyScheduleFrequencyRelativeInterval

A job's occurrence of FrequencyInterval in each month, if FrequencyInterval is 32 (monthlyrelative).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Unused,First,Second,Third,Fourth,Last |

##### -CopyScheduleFrequencyRecurrenceFactor

The number of weeks or months between the scheduled execution of a job. FrequencyRecurrenceFactor is used only if FrequencyType is 8, "Weekly", 16, "Monthly", 32 or "MonthlyRelative".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CopyScheduleStartDate

The date on which execution of a job can begin.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyScheduleEndDate

The date on which execution of a job can stop.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyScheduleStartTime

The time on any day to begin execution of a job. Format HHMMSS / 24 hour clock.  
Example: '010000' for 01:00:00 AM.  
Example: '140000' for 02:00:00 PM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CopyScheduleEndTime

The time on any day to end execution of a job. Format HHMMSS / 24 hour clock.  
Example: '010000' for 01:00:00 AM.  
Example: '140000' for 02:00:00 PM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisconnectUsers

Forces disconnection of users from the secondary database during transaction log restore operations.  
Use this with standby mode when you need to ensure restores complete successfully despite active connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FullBackupPath

Specifies the path to an existing full database backup to initialize the secondary database.  
Use this when you have a recent backup available and want to avoid creating a new full backup for initialization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -GenerateFullBackup

Creates a new full backup of the source database and restores it to initialize the secondary database.  
Use this when no existing backup is available or when you want to ensure the secondary starts with the most current data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -HistoryRetention

Sets how long log shipping history information is kept in the monitor server, specified in minutes.  
Defaults to 14420 minutes (approximately 10 days). Longer retention provides more historical data for troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -NoRecovery

Keeps the secondary database in NORECOVERY mode, making it unavailable for read access but ready for continuous log restores.  
This is the default mode and maintains the fastest restore performance for log shipping.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoInitialization

Skips secondary database initialization, assuming the database already exists in NORECOVERY mode on the destination.  
Use this when you have manually restored the database or used a different method to initialize it.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PrimaryMonitorServer

Specifies the SQL Server instance that monitors the primary server's log shipping operations.  
Defaults to the source instance itself. Use a dedicated monitor server in production environments for centralized monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PrimaryMonitorCredential

Allows you to login to enter a secure credential. Only needs to be used when the PrimaryMonitorServerSecurityMode is 0 or "sqlserver"  
To use: $scred = Get-Credential, then pass $scred object to the -PrimaryMonitorCredential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PrimaryMonitorServerSecurityMode

The security mode used to connect to the monitor server for the primary server. Allowed values are 0, "sqlserver", 1, "windows"  
The default is 1 or Windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,sqlserver,1,windows |

##### -PrimaryThresholdAlertEnabled

Enables the Threshold alert for the primary database

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RestoreDataFolder

Sets the destination folder for database data files during secondary database initialization.  
Only used with GenerateFullBackup or UseExistingFullBackup. Defaults to the secondary instance's default data directory if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreLogFolder

Sets the destination folder for database log files during secondary database initialization.  
Only used with GenerateFullBackup or UseExistingFullBackup. Defaults to the secondary instance's default log directory if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreDelay

Introduces a delay in minutes before applying transaction log restores on the secondary database.  
Defaults to 0 (no delay). Use this to create a time buffer for recovering from accidental data changes on the primary.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RestoreAlertThreshold

Sets the alert threshold in minutes for detecting restore operation delays on the secondary database.  
An alert is generated if no restore occurs within this timeframe. Defaults to 45 minutes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RestoreJob

Name of the restore job that will be created in the SQL Server agent.  
The parameter works as a prefix where the name of the database will be added to the restore job name.  
The default is "LSRestore_[databasename]"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreRetention

The backup retention period in minutes. Default is 4320 / 72 hours

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RestoreSchedule

Name of the backup schedule created for the restore job.  
The parameter works as a prefix where the name of the database will be added to the restore job schedule name.  
Default is "LSRestore_[DestinationServerName]_[DatabaseName]"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreScheduleDisabled

Parameter to set the restore schedule to disabled upon creation.  
By default the schedule is enabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RestoreScheduleFrequencyType

A value indicating when a job is to be executed.  
Allowed values are "Daily", "AgentStart", "IdleComputer"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Daily,Weekly,AgentStart,IdleComputer |

##### -RestoreScheduleFrequencyInterval

The number of type periods to occur between each execution of the restore job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreScheduleFrequencySubdayType

Specifies the units for the subday FrequencyInterval.  
Allowed values are "Time", "Seconds", "Minutes", "Hours"

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Time,Seconds,Minutes,Hours |

##### -RestoreScheduleFrequencySubdayInterval

The number of subday type periods to occur between each execution of the restore job.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RestoreScheduleFrequencyRelativeInterval

A job's occurrence of FrequencyInterval in each month, if FrequencyInterval is 32 (monthlyrelative).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Unused,First,Second,Third,Fourth,Last |

##### -RestoreScheduleFrequencyRecurrenceFactor

The number of weeks or months between the scheduled execution of a job. FrequencyRecurrenceFactor is used only if FrequencyType is 8, "Weekly", 16, "Monthly", 32 or "MonthlyRelative".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RestoreScheduleStartDate

The date on which execution of a job can begin.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreScheduleEndDate

The date on which execution of a job can stop.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreScheduleStartTime

The time on any day to begin execution of a job. Format HHMMSS / 24 hour clock.  
Example: '010000' for 01:00:00 AM.  
Example: '140000' for 02:00:00 PM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreScheduleEndTime

The time on any day to end execution of a job. Format HHMMSS / 24 hour clock.  
Example: '010000' for 01:00:00 AM.  
Example: '140000' for 02:00:00 PM.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RestoreThreshold

Specifies the maximum time in minutes allowed between restore operations before triggering an alert.  
Defaults to 45 minutes. Set this based on your RTO requirements and backup frequency.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SecondaryDatabasePrefix

Adds a prefix to the secondary database name to distinguish it from the primary database.  
Useful when the secondary database resides on the same instance as the primary or for naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondaryDatabaseSuffix

Adds a suffix to the secondary database name to distinguish it from the primary database.  
Common suffixes include '_LS' for log shipping or '_DR' for disaster recovery. Automatically applied when source and destination are the same instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondaryMonitorServer

Is the name of the monitor server for the secondary server.  
Defaults to monitor on the instance provided via DestinationSqlInstance param.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondaryMonitorCredential

Allows you to login to enter a secure credential. Only needs to be used when the SecondaryMonitorServerSecurityMode is 0 or "sqlserver"  
To use: $scred = Get-Credential, then pass $scred object to the -SecondaryMonitorCredential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecondaryMonitorServerSecurityMode

The security mode used to connect to the monitor server for the secondary server. Allowed values are 0, "sqlserver", 1, "windows"  
The default is 1 or Windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,sqlserver,1,windows |

##### -SecondaryThresholdAlertEnabled

Enables the Threshold alert for the secondary database

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Standby

Places the secondary database in STANDBY mode, allowing read-only access for reporting purposes.  
Users are disconnected during log restores. Alternative to NORECOVERY mode when you need read access to secondary data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StandbyDirectory

Specifies the directory where standby files (.tuf) are created when using STANDBY mode.  
Required when using the Standby parameter. These files contain uncommitted transactions that are temporarily backed out during restore operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UseExistingFullBackup

Uses the most recent full backup from backup history to initialize the secondary database.  
The function automatically locates and uses the latest full backup of the source database for initialization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UseBackupFolder

Specifies a folder containing backup files (full and/or differential) to initialize the secondary database.  
The function processes all backup files in the folder to bring the secondary database up to the latest available point in time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses confirmations and applies default values for missing parameters like copy destination folder.  
Also removes existing schedules with the same name and sets automatic database suffix when source and destination instances are identical.

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

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
