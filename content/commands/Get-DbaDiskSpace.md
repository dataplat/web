---
title: "Get-DbaDiskSpace"
slug: "Get-DbaDiskSpace"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net | Jakob Bindslet"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves disk space and filesystem details from SQL Server host systems for capacity monitoring and performance analysis."
tags:
  - "Storage"
  - "Disk"
  - "Space"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDiskSpace.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDiskSpace"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDiskSpace</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDiskSpace.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net , Jakob Bindslet</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves disk space and filesystem details from SQL Server host systems for capacity monitoring and performance analysis.

## Description

Queries Windows disk volumes on SQL Server systems using WMI to gather critical storage information for database administration. Returns comprehensive disk details including capacity, free space, filesystem type, and optional fragmentation analysis.  
  
Essential for SQL Server capacity planning, this function helps DBAs monitor disk space before growth limits impact database operations. Use it to verify adequate space for backup operations, identify performance bottlenecks from fragmented volumes hosting data or log files, and maintain compliance documentation for storage utilization.  
  
By default, only local disks and removable disks are shown (DriveType 2 and 3), which covers most SQL Server storage scenarios. Hidden system volumes are excluded unless the Force parameter is used.  
  
Requires Windows administrator access on target SQL Server systems.

## Syntax

```powershell
Get-DbaDiskSpace
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Unit] <String>]
    [[-SqlCredential] <PSCredential>]
    [[-ExcludeDrive] <String[]>]
    [-CheckFragmentation]
    [-Force]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042
```
{: data-copyable="true" data-clean-code="Get-DbaDiskSpace -ComputerName srv0042" }

Get disk space for the server srv0042.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042 -Unit MB
```
{: data-copyable="true" data-clean-code="Get-DbaDiskSpace -ComputerName srv0042 -Unit MB" }

Get disk space for the server srv0042 and displays in megabytes (MB).<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042, srv0007 -Unit TB
```
{: data-copyable="true" data-clean-code="Get-DbaDiskSpace -ComputerName srv0042, srv0007 -Unit TB" }

Get disk space from two servers and displays in terabytes (TB).<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042 -Force
```
{: data-copyable="true" data-clean-code="Get-DbaDiskSpace -ComputerName srv0042 -Force" }

Get all disk and volume space information.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042 -ExcludeDrive 'C:\'
```
{: data-copyable="true" data-clean-code="Get-DbaDiskSpace -ComputerName srv0042 -ExcludeDrive 'C:\'" }

Get all disk and volume space information.<br>

### Optional Parameters

##### -ComputerName

Specifies the SQL Server host systems to query for disk space information. Accepts multiple computer names for bulk monitoring.  
Use this to check storage capacity across your SQL Server environment before database growth or backup operations impact available space.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Unit

This parameter has been deprecated and will be removed in 1.0.0.  
All size properties (Bytes, KB, MB, GB, TB, PB) are now available simultaneously in the output object but hidden by default for cleaner display.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | GB |
| Accepted Values | Bytes,KB,MB,GB,TB,PB |

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

##### -ExcludeDrive

Specifies drive letters to exclude from the disk space report, using the format 'C:\' or 'D:\'.  
Use this to skip system drives or non-SQL storage when focusing on database file locations, or to exclude network drives that may cause timeouts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CheckFragmentation

Enables filesystem fragmentation analysis for all volumes, which can impact SQL Server I/O performance when database or log files are stored on fragmented drives.  
This significantly increases runtime (seconds to minutes per volume) but provides critical data for troubleshooting slow database operations or planning defragmentation maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Includes all drive types and hidden volumes in the results, not just local and removable disks (DriveType 2 and 3).  
Use this when you need complete storage visibility including network drives, CD/DVD drives, or system volumes that might host SQL Server components like backup locations or tempdb files.

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
