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

# Get-DbaDiskSpace

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net , Jakob Bindslet |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDiskSpace](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDiskSpace.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDiskSpace](https://dataplat.github.io/boh#Get-DbaDiskSpace).

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

Get disk space for the server srv0042.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042 -Unit MB
```

Get disk space for the server srv0042 and displays in megabytes (MB).<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042, srv0007 -Unit TB
```

Get disk space from two servers and displays in terabytes (TB).<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042 -Force
```

Get all disk and volume space information.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDiskSpace -ComputerName srv0042 -ExcludeDrive 'C:\'
```

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
