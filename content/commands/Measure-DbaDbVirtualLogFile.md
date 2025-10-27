---
title: "Measure-DbaDbVirtualLogFile"
slug: "Measure-DbaDbVirtualLogFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Measures Virtual Log File (VLF) counts in transaction logs to identify performance bottlenecks"
tags:
  - "Diagnostic"
  - "VLF"
  - "LogFile"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaDbVirtualLogFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Measure-DbaDbVirtualLogFile"
draft: false
---

# Measure-DbaDbVirtualLogFile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Measure-DbaDbVirtualLogFile](https://github.com/dataplat/dbatools/blob/master/public/Measure-DbaDbVirtualLogFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Measure-DbaDbVirtualLogFile](https://dataplat.github.io/boh#Measure-DbaDbVirtualLogFile).

## Synopsis

Measures Virtual Log File (VLF) counts in transaction logs to identify performance bottlenecks

## Description

Analyzes Virtual Log File (VLF) fragmentation across databases by counting total, active, and inactive VLFs in transaction logs. This function helps identify databases with excessive VLF counts that can severely impact performance.  
  
High VLF counts (typically over 50-100) cause transaction log backups to slow down, extend database recovery times, and in extreme cases can affect insert/update/delete operations. This commonly happens when transaction logs auto-grow frequently in small increments rather than being pre-sized appropriately.  
  
The function returns VLF counts along with log file growth settings, making it easy to spot databases that need log file maintenance. Use this for regular health checks, performance troubleshooting, or before major maintenance windows.  
  
References:  
http://www.sqlskills.com/blogs/kimberly/transaction-log-vlfs-too-many-or-too-few/  
http://blogs.msdn.com/b/saponsqlserver/archive/2012/02/22/too-many-virtual-log-files-vlfs-can-cause-slow-database-recovery.aspx  
  
If you've got a high number of VLFs, you can use Expand-SqlTLogResponsibly to reduce the number.

## Syntax

```powershell
Measure-DbaDbVirtualLogFile
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-IncludeSystemDBs]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Measure-DbaDbVirtualLogFile -SqlInstance sqlcluster
```

Returns all user database virtual log file counts for the sqlcluster instance.<br>

#####  Example:  2 

```powershell
PS C:\> Measure-DbaDbVirtualLogFile -SqlInstance sqlserver | Where-Object {$_.Total -ge 50}
```

Returns user databases that have 50 or more VLFs.<br>

#####  Example:  3 

```powershell
PS C:\> @('sqlserver','sqlcluster') | Measure-DbaDbVirtualLogFile
```

Returns all VLF information for the sqlserver and sqlcluster SQL Server instances. Processes data via the pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Measure-DbaDbVirtualLogFile -SqlInstance sqlcluster -Database db1, db2
```

Returns VLF counts for the db1 and db2 databases on sqlcluster.<br>

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

Specifies which databases to analyze for VLF counts. Accepts database names, wildcards, or arrays of database names.  
Use this to focus VLF analysis on specific databases when troubleshooting performance issues or during targeted maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during VLF analysis. Accepts database names, wildcards, or arrays of database names.  
Use this to exclude problematic databases or those you know are healthy when running instance-wide VLF checks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDBs

Includes system databases (master, model, msdb, tempdb) in the VLF analysis.  
By default only user databases are analyzed since system database VLF counts are typically less critical for performance tuning.

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


&nbsp;
