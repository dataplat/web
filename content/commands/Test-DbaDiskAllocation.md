---
title: "Test-DbaDiskAllocation"
slug: "Test-DbaDiskAllocation"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Validates disk allocation unit sizes against SQL Server best practice recommendations."
tags:
  - "Storage"
  - "Disk"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskAllocation.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDiskAllocation"
draft: false
---

# Test-DbaDiskAllocation

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDiskAllocation](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskAllocation.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDiskAllocation](https://dataplat.github.io/boh#Test-DbaDiskAllocation).

## Synopsis

Validates disk allocation unit sizes against SQL Server best practice recommendations.

## Description

Examines all NTFS volumes on target servers to verify they are formatted with 64KB allocation units, which is the recommended cluster size for optimal SQL Server performance. When checking a single server, returns a simple true/false result. For multiple servers, returns detailed information including server name, disk details, and compliance status for each volume.  
  
The function can automatically detect SQL Server instances and identify which disks contain database files, helping you focus on storage that directly impacts SQL Server performance. System drives are automatically excluded from best practice validation since they typically don't require the 64KB allocation unit size.  
  
This validation is essential during SQL Server deployment planning and storage configuration audits, as improper allocation unit sizes can significantly impact database I/O performance.  
  
References:  
https://technet.microsoft.com/en-us/library/dd758814(v=sql.100).aspx - "The performance question here is usually not one of correlation per the formula, but whether the cluster size has been explicitly defined at 64 KB, which is a best practice for SQL Server."

## Syntax

```powershell
Test-DbaDiskAllocation
    [-ComputerName] <Object[]>
    [-NoSqlCheck]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
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
PS C:\> Test-DbaDiskAllocation -ComputerName sqlserver2014a
```

Scans all disks on server sqlserver2014a for best practice allocation unit size.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDiskAllocation -ComputerName sqlserver2014 | Select-Output *
```

Scans all disks on server sqlserver2014a for allocation unit size and returns detailed results for each.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDiskAllocation -ComputerName sqlserver2014a -NoSqlCheck
```

Scans all disks not hosting SQL Server data or log files on server sqlserver2014a for best practice allocation unit size.<br>

### Required Parameters

##### -ComputerName

Specifies the target server(s) to examine for disk allocation unit compliance. Accepts multiple server names for bulk validation.  
Use this to verify storage configuration across your SQL Server environment during deployment or storage audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -NoSqlCheck

Skips detection of SQL Server database files and examines all NTFS volumes regardless of their SQL Server usage.  
Use this when you want to validate allocation units on all drives, not just those containing SQL Server data or log files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

##### -Credential

Specifies an alternate Windows account to use when enumerating drives on the server. May require Administrator privileges. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

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
