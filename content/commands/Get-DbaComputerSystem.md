---
title: "Get-DbaComputerSystem"
slug: "Get-DbaComputerSystem"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive hardware and system information from Windows computers hosting SQL Server instances."
tags:
  - "Management"
  - "Computer"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaComputerSystem.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaComputerSystem"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaComputerSystem</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaComputerSystem.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Shawn Melton (@wsmelton), wsmelton.github.io</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves comprehensive hardware and system information from Windows computers hosting SQL Server instances.

## Description

Collects detailed system specifications including processor details, memory configuration, domain membership, and hardware information from target computers. This function is essential for SQL Server capacity planning, pre-installation system verification, and troubleshooting performance issues by providing complete hardware inventory data.  
  
The function queries WMI classes (Win32_ComputerSystem and Win32_Processor) to gather CPU details, determines hyperthreading status, checks total physical memory, and identifies domain roles. It also detects pending reboots that could affect SQL Server operations and optionally retrieves AWS EC2 metadata for cloud-hosted instances.  
  
Use this command when documenting SQL Server environments, verifying system requirements before installations or upgrades, or investigating hardware-related performance bottlenecks.

## Syntax

```powershell
Get-DbaComputerSystem
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-IncludeAws]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaComputerSystem
```
{: data-copyable="true" data-clean-code="Get-DbaComputerSystem" }

Returns information about the local computer's computer system<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaComputerSystem -ComputerName sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaComputerSystem -ComputerName sql2016" }

Returns information about the sql2016's computer system<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaComputerSystem -ComputerName sql2016 -IncludeAws
```
{: data-copyable="true" data-clean-code="Get-DbaComputerSystem -ComputerName sql2016 -IncludeAws" }

Returns information about the sql2016's computer system and includes additional properties around the EC2 instance.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to collect system information from. Defaults to the local computer when not specified.  
Use this to inventory multiple SQL Server hosts at once or to gather system details from remote servers for capacity planning and troubleshooting.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Alternate credential object to use for accessing the target computer(s).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeAws

Retrieves additional AWS EC2 metadata when the target computer is hosted on Amazon Web Services. Adds properties like AMI ID, instance type, availability zone, and IAM role information.  
Use this switch when documenting cloud-hosted SQL Server environments or when you need AWS-specific details for compliance or cost management purposes.

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
