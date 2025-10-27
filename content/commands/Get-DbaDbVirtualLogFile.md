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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbVirtualLogFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbVirtualLogFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaDbVirtualLogFile -SqlInstance sqlcluster" }

Returns all user database virtual log file details for the sqlcluster instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbVirtualLogFile -SqlInstance sqlserver | Group-Object -Property Database | Where-Object Count -gt 50
```
{: data-copyable="true" data-clean-code="Get-DbaDbVirtualLogFile -SqlInstance sqlserver | Group-Object -Property Database | Where-Object Count -gt 50" }

Returns user databases that have 50 or more VLFs.<br>

#####  Example:  3 

```powershell
PS C:\> 'sqlserver','sqlcluster' | Get-DbaDbVirtualLogFile
```
{: data-copyable="true" data-clean-code="'sqlserver','sqlcluster' | Get-DbaDbVirtualLogFile" }

Returns all VLF information for the sqlserver and sqlcluster SQL Server instances. Processes data via the pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbVirtualLogFile -SqlInstance sqlcluster -Database db1, db2
```
{: data-copyable="true" data-clean-code="Get-DbaDbVirtualLogFile -SqlInstance sqlcluster -Database db1, db2" }

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
