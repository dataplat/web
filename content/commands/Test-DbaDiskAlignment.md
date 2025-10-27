---
title: "Test-DbaDiskAlignment"
slug: "Test-DbaDiskAlignment"
date: 2024-01-01
layout: "single"
author: "Constantine Kokkinos (@mobileck), constantinekokkinos.com"
availability: "Windows, Linux, macOS"
synopsis: "Tests disk partition alignment to identify I/O performance issues that can impact SQL Server."
tags:
  - "Storage"
  - "Disk"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskAlignment.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDiskAlignment"
draft: false
---

# Test-DbaDiskAlignment

| Property | Value |
| --- | --- |
| **Author** | Constantine Kokkinos (@mobileck), constantinekokkinos.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDiskAlignment](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskAlignment.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDiskAlignment](https://dataplat.github.io/boh#Test-DbaDiskAlignment).

## Synopsis

Tests disk partition alignment to identify I/O performance issues that can impact SQL Server.

## Description

Tests disk partition alignment by checking if partition starting offsets align properly with common stripe unit sizes (64KB, 128KB, 256KB, 512KB, 1024KB). Misaligned disk partitions can cause significant SQL Server I/O performance degradation, particularly on high-transaction systems.  
  
The function connects to Windows computers via CIM and examines each disk partition's starting offset. It can optionally focus only on partitions that contain SQL Server data or log files. Results show whether each partition follows alignment best practices and calculates the modulo for common stripe sizes.  
  
Returns detailed alignment analysis including partition size, offset calculations, and recommendations. This helps identify storage configuration issues before they impact database performance.  
  
Please refer to your storage vendor best practices before following any advice below.  
  
By default issues with disk alignment should be resolved by a new installation of Windows Server 2008, Windows Vista, or later operating systems, but verifying disk alignment continues to be recommended as a best practice.  
While some versions of Windows use different starting alignments, if you are starting anew 1MB is generally the best practice offset for current operating systems (because it ensures that the partition offset % common stripe unit sizes == 0 )  
  
Caveats:  
* Dynamic drives (or those provisioned via third party software) may or may not have accurate results when polled by any of the built in tools, see your vendor for details.  
* Windows does not have a reliable way to determine stripe unit Sizes. These values are obtained from vendor disk management software or from your SAN administrator.  
* System drives in versions previous to Windows Server 2008 cannot be aligned, but it is generally not recommended to place SQL Server databases on system drives.

## Syntax

```powershell
Test-DbaDiskAlignment
    [-ComputerName] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-SqlCredential] <PSCredential>]
    [-NoSqlCheck]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDiskAlignment -ComputerName sqlserver2014a
```

Tests the disk alignment of a single server named sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDiskAlignment -ComputerName sqlserver2014a, sqlserver2014b, sqlserver2014c
```

Tests the disk alignment of multiple servers<br>

### Required Parameters

##### -ComputerName

Specifies the Windows computer(s) to test for disk partition alignment issues. Accepts multiple server names for batch processing.  
Use this to identify storage configuration problems that could impact SQL Server I/O performance across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Specifies an alternate Windows account to use when enumerating drives on the server. May require Administrator privileges. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -NoSqlCheck

Tests alignment on all disk partitions instead of limiting the check to only those containing SQL Server data or log files.  
Use this when you want a comprehensive disk alignment assessment for the entire server, not just SQL Server storage.

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
