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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDiskAllocation</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDiskAllocation.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Test-DbaDiskAllocation -ComputerName sqlserver2014a" }

Scans all disks on server sqlserver2014a for best practice allocation unit size.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDiskAllocation -ComputerName sqlserver2014 | Select-Output *
```
{: data-copyable="true" data-clean-code="Test-DbaDiskAllocation -ComputerName sqlserver2014 | Select-Output *" }

Scans all disks on server sqlserver2014a for allocation unit size and returns detailed results for each.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDiskAllocation -ComputerName sqlserver2014a -NoSqlCheck
```
{: data-copyable="true" data-clean-code="Test-DbaDiskAllocation -ComputerName sqlserver2014a -NoSqlCheck" }

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
