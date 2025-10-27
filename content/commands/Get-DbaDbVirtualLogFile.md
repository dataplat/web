---
title: "Get-DbaDbVirtualLogFile"
slug: "Get-DbaDbVirtualLogFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed virtual log file (VLF) metadata from transaction logs for performance analysis and troubleshooting."
tags:
  - "Diagnostic"
  - "VLF"
  - "Database"
  - "LogFile"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbVirtualLogFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbVirtualLogFile"
draft: false
---

# Get-DbaDbVirtualLogFile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbVirtualLogFile](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbVirtualLogFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbVirtualLogFile](https://dataplat.github.io/boh#Get-DbaDbVirtualLogFile).

## Synopsis

Retrieves detailed virtual log file (VLF) metadata from transaction logs for performance analysis and troubleshooting.

## Description

This function uses DBCC LOGINFO to return detailed metadata about each virtual log file (VLF) within database transaction logs. The output includes VLF size, file offsets, sequence numbers, status, and parity information that's essential for analyzing transaction log structure and performance.  
  
Having a transaction log file with too many virtual log files (VLFs) can hurt database performance. Too many VLFs can cause transaction log backups to slow down and can also slow down database recovery and, in extreme cases, even affect insert/update/delete performance.  
  
Common use cases include identifying databases with excessive VLF counts (typically over 50-100), analyzing VLF size distribution to spot fragmentation issues, and monitoring VLF status during active transactions. This data helps DBAs make informed decisions about log file growth settings and maintenance schedules.  
  
References:  
http://www.sqlskills.com/blogs/kimberly/transaction-log-vlfs-too-many-or-too-few/  
http://blogs.msdn.com/b/saponsqlserver/archive/2012/02/22/too-many-virtual-log-files-vlfs-can-cause-slow-database-recovery.aspx  
  
If you've got a high number of VLFs, you can use Expand-DbaDbLogFile to reduce the number.

## Syntax

```powershell
Get-DbaDbVirtualLogFile
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
PS C:\> Get-DbaDbVirtualLogFile -SqlInstance sqlcluster
```

Returns all user database virtual log file details for the sqlcluster instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbVirtualLogFile -SqlInstance sqlserver | Group-Object -Property Database | Where-Object Count -gt 50
```

Returns user databases that have 50 or more VLFs.<br>

#####  Example:  3 

```powershell
PS C:\> 'sqlserver','sqlcluster' | Get-DbaDbVirtualLogFile
```

Returns all VLF information for the sqlserver and sqlcluster SQL Server instances. Processes data via the pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbVirtualLogFile -SqlInstance sqlcluster -Database db1, db2
```

Returns the VLF counts for the db1 and db2 databases on sqlcluster.<br>

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

Specifies which databases to analyze for VLF information. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of checking all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip during VLF analysis. Accepts wildcards for pattern matching.  
Use this to exclude problematic databases or those you don't need to monitor for VLF issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDBs

Include system databases (master, model, msdb, tempdb) in the VLF analysis.  
By default, only user databases are checked since system database VLF counts are typically less critical for performance tuning.

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
