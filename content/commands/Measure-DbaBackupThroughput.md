---
title: "Measure-DbaBackupThroughput"
slug: "Measure-DbaBackupThroughput"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Calculates backup throughput statistics from msdb backup history to analyze backup performance."
tags:
  - "Backup"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaBackupThroughput.ps1"
bohUrl: "https://dataplat.github.io/boh#Measure-DbaBackupThroughput"
draft: false
---

# Measure-DbaBackupThroughput

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Measure-DbaBackupThroughput](https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaBackupThroughput.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Measure-DbaBackupThroughput](https://dataplat.github.io/boh#Measure-DbaBackupThroughput).

## Synopsis

Calculates backup throughput statistics from msdb backup history to analyze backup performance.

## Description

Analyzes backup history records from the msdb database to calculate detailed throughput statistics including average, minimum, and maximum backup speeds measured in megabytes per second. This function helps DBAs identify performance patterns, troubleshoot slow backups, and optimize backup strategies by examining historical backup performance data.  
  
The function processes backup records for specified databases and time periods, calculating throughput by dividing backup size by duration. Results include comprehensive statistics like average backup size, duration ranges, throughput metrics, and backup frequency counts. This data is essential for capacity planning, identifying storage bottlenecks, and ensuring backup windows meet your RTO requirements.  
  
Output includes detailed metrics per database showing average throughput, size patterns, duration statistics, and backup count summaries. You can filter by backup type (full, differential, log), time ranges, or specific databases to focus your performance analysis on particular scenarios or problem areas.  
  
Output looks like this:  
SqlInstance     : sql2016  
Database        : SharePoint_Config  
AvgThroughput   : 1.07 MB  
AvgSize         : 24.17  
AvgDuration     : 00:00:01.1000000  
MinThroughput   : 0.02 MB  
MaxThroughput   : 2.26 MB  
MinBackupDate   : 8/6/2015 10:22:01 PM  
MaxBackupDate   : 6/19/2016 12:57:45 PM  
BackupCount     : 10

## Syntax

```powershell
Measure-DbaBackupThroughput
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Since] <DateTime>]
    [-Last]
    [[-Type] <String>]
    [[-DeviceType] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016
```

Parses every backup in msdb's backuphistory for stats on all databases.<br>

#####  Example:  2 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016 -Database AdventureWorks2014
```

Parses every backup in msdb's backuphistory for stats on AdventureWorks2014.<br>

#####  Example:  3 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2005 -Last
```

Processes the last full, diff and log backups every backup for all databases on sql2005.<br>

#####  Example:  4 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2005 -Last -Type Log
```

Processes the last log backups every backup for all databases on sql2005.<br>

#####  Example:  5 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016 -Since (Get-Date).AddDays(-7) | Where-Object { $_.MinThroughput.Gigabyte -gt 1 }
```

Gets backup calculations for the last week and filters results that have a minimum of 1GB throughput<br>

#####  Example:  6 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016 -Since (Get-Date).AddDays(-365) -Database bigoldb
```

Gets backup calculations, limited to the last year and only the bigoldb database<br>

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

Specifies which databases to analyze for backup throughput statistics. Accepts wildcards for pattern matching.  
Use this when you need to focus performance analysis on specific databases rather than analyzing all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from throughput analysis. Accepts wildcards for pattern matching.  
Use this to remove system databases or problematic databases from your performance analysis without affecting other databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Since

Filters backup history to analyze only backups taken on or after the specified date and time.  
Use this to focus your throughput analysis on recent backups or compare performance before and after infrastructure changes. Accepts standard PowerShell datetime formats.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Last

Analyzes only the most recent backup for each database instead of processing the entire backup history.  
Use this for quick performance checks or when you only need current backup throughput statistics rather than historical trends.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Specifies which backup type to analyze for throughput calculations. Valid options include "Full", "Log", "Differential", "File", "Differential File", "Partial Full", and "Partial Differential".  
Use this to analyze specific backup types when troubleshooting performance issues or comparing different backup strategies. Defaults to "Full" backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Full |
| Accepted Values | Full,Log,Differential,File,Differential File,Partial Full,Partial Differential |

##### -DeviceType

Filters analysis to specific backup device types such as "Disk", "Tape", "Virtual Device", or their permanent counterparts.  
Use this to compare throughput performance between different backup destinations or troubleshoot specific backup infrastructure components. Accepts custom integer values for specialized backup   
devices.

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


&nbsp;
