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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDiskAlignment</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskAlignment.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Constantine Kokkinos (@mobileck), constantinekokkinos.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaDiskAlignment -ComputerName sqlserver2014a" }

Tests the disk alignment of a single server named sqlserver2014a<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDiskAlignment -ComputerName sqlserver2014a, sqlserver2014b, sqlserver2014c
```
{: data-copyable="true" data-clean-code="Test-DbaDiskAlignment -ComputerName sqlserver2014a, sqlserver2014b, sqlserver2014c" }

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
