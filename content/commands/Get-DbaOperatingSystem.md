---
title: "Get-DbaOperatingSystem"
slug: "Get-DbaOperatingSystem"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive Windows operating system details from SQL Server host machines."
tags:
  - "Management"
  - "OS"
  - "OperatingSystem"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOperatingSystem.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaOperatingSystem"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaOperatingSystem</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOperatingSystem.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves comprehensive Windows operating system details from SQL Server host machines.

## Description

Collects detailed operating system information from local or remote Windows computers hosting SQL Server instances. Returns comprehensive system details including OS version, memory configuration, power plans, time zones, and Windows Server Failover Clustering status. This information is essential for SQL Server environment assessments, capacity planning, and troubleshooting performance issues that may be related to the underlying OS configuration.

## Syntax

```powershell
Get-DbaOperatingSystem
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaOperatingSystem
```
{: data-copyable="true" data-clean-code="Get-DbaOperatingSystem" }

Returns information about the local computer's operating system<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaOperatingSystem -ComputerName sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaOperatingSystem -ComputerName sql2016" }

Returns information about the sql2016's operating system<br>

#####  Example:  3 

```powershell
PS C:\> $wincred = Get-Credential ad\sqladmin
PS C:\> 'sql2016', 'sql2017' | Get-DbaOperatingSystem -Credential $wincred
```
{: data-copyable="true" data-clean-code="$wincred = Get-Credential ad\sqladmin
'sql2016', 'sql2017' | Get-DbaOperatingSystem -Credential $wincred" }

Returns information about the sql2016 and sql2017 operating systems using alternative Windows credentials<br>

#####  Example:  4 

```powershell
PS C:\> Get-Content .\servers.txt | Get-DbaOperatingSystem
```
{: data-copyable="true" data-clean-code="Get-Content .\servers.txt | Get-DbaOperatingSystem" }

Returns information about all the servers operating system that are stored in the file. Every line in the file can only contain one hostname for a server.<br>

### Optional Parameters

##### -ComputerName

Specifies the computer names of SQL Server host machines to query for operating system information. Accepts multiple computer names, IP addresses, or SQL Server instance names.  
Use this when you need to collect OS details from remote servers for environment assessments, capacity planning, or troubleshooting. Defaults to the local computer if not specified.

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
