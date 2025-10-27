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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Measure-DbaBackupThroughput</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaBackupThroughput.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Measure-DbaBackupThroughput -SqlInstance sql2016" }

Parses every backup in msdb's backuphistory for stats on all databases.<br>

#####  Example:  2 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016 -Database AdventureWorks2014
```
{: data-copyable="true" data-clean-code="Measure-DbaBackupThroughput -SqlInstance sql2016 -Database AdventureWorks2014" }

Parses every backup in msdb's backuphistory for stats on AdventureWorks2014.<br>

#####  Example:  3 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2005 -Last
```
{: data-copyable="true" data-clean-code="Measure-DbaBackupThroughput -SqlInstance sql2005 -Last" }

Processes the last full, diff and log backups every backup for all databases on sql2005.<br>

#####  Example:  4 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2005 -Last -Type Log
```
{: data-copyable="true" data-clean-code="Measure-DbaBackupThroughput -SqlInstance sql2005 -Last -Type Log" }

Processes the last log backups every backup for all databases on sql2005.<br>

#####  Example:  5 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016 -Since (Get-Date).AddDays(-7) | Where-Object { $_.MinThroughput.Gigabyte -gt 1 }
```
{: data-copyable="true" data-clean-code="Measure-DbaBackupThroughput -SqlInstance sql2016 -Since (Get-Date).AddDays(-7) | Where-Object { $_.MinThroughput.Gigabyte -gt 1 }" }

Gets backup calculations for the last week and filters results that have a minimum of 1GB throughput<br>

#####  Example:  6 

```powershell
PS C:\> Measure-DbaBackupThroughput -SqlInstance sql2016 -Since (Get-Date).AddDays(-365) -Database bigoldb
```
{: data-copyable="true" data-clean-code="Measure-DbaBackupThroughput -SqlInstance sql2016 -Since (Get-Date).AddDays(-365) -Database bigoldb" }

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
