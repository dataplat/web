---
title: "Test-DbaMaxDop"
slug: "Test-DbaMaxDop"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva)"
availability: "Windows, Linux, macOS"
synopsis: "Tests SQL Server MAXDOP configuration against recommended values based on CPU cores and NUMA topology."
tags:
  - "MaxDop"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMaxDop.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaMaxDop"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaMaxDop</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaMaxDop.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@claudioessilva)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Tests SQL Server MAXDOP configuration against recommended values based on CPU cores and NUMA topology.

## Description

Analyzes your SQL Server's Max Degree of Parallelism (MAXDOP) settings and compares them against Microsoft's recommended values based on your server's hardware configuration. This function examines CPU cores, NUMA topology, and SQL Server version to calculate optimal MAXDOP settings for query performance.  
  
The function helps you identify instances where MAXDOP may be misconfigured, which can lead to poor query performance, excessive parallelism overhead, or CXPACKET waits. It automatically detects single vs multi-NUMA configurations and applies version-specific calculation rules.  
  
For SQL Server 2016 and higher, the function also examines database-level MAXDOP settings, since these versions support per-database parallelism configuration that can override instance-level settings.  
  
Results include current settings, recommended values, and guidance notes about whether changes should be considered. The recommendations follow Microsoft's official guidelines but include warnings for scenarios where custom MAXDOP values may be intentionally set for specific applications.  
  
Inspired by Sakthivel Chidambaram's MAXDOP Calculator methodology and Microsoft's official guidance (KB 2806535).  
  
More info:  
https://support.microsoft.com/en-us/kb/2806535  
https://blogs.msdn.microsoft.com/sqlsakthi/2012/05/23/wow-we-have-maxdop-calculator-for-sql-server-it-makes-my-job-easier/

## Syntax

```powershell
Test-DbaMaxDop
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sql2008, sqlserver2012
```
{: data-copyable="true" data-clean-code="Test-DbaMaxDop -SqlInstance sql2008, sqlserver2012" }

Get Max DOP setting for servers sql2008 and sqlserver2012 and also the recommended one.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sql2014 | Select-Object *
```
{: data-copyable="true" data-clean-code="Test-DbaMaxDop -SqlInstance sql2014 | Select-Object *" }

Shows Max DOP setting for server sql2014 with the recommended value. Piping the output to Select-Object * will also show the 'NumaNodes' and 'NumberOfCores' of each instance<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaMaxDop -SqlInstance sqlserver2016 | Select-Object *
```
{: data-copyable="true" data-clean-code="Test-DbaMaxDop -SqlInstance sqlserver2016 | Select-Object *" }

Get Max DOP setting for servers sql2016 with the recommended value. Piping the output to Select-Object * will also show the 'NumaNodes' and 'NumberOfCores' of each instance. Because it is an 2016 <br>
instance will be shown 'InstanceVersion', 'Database' and 'DatabaseMaxDop' columns.<br>

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
