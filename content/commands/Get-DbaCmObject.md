---
title: "Get-DbaCmObject"
slug: "Get-DbaCmObject"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows system information from SQL Server hosts using WMI/CIM with intelligent connection fallback."
tags:
  - "ComputerManagement"
  - "CIM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCmObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaCmObject"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaCmObject</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCmObject.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves Windows system information from SQL Server hosts using WMI/CIM with intelligent connection fallback.

## Description

Queries Windows Management Instrumentation (WMI) or Common Information Model (CIM) classes on SQL Server hosts to gather system-level information like hardware specs, operating system details, services, and performance counters. This function automatically tries multiple connection protocols in order of preference (CIM over WinRM, CIM over DCOM, WMI, then WMI over PowerShell Remoting) and remembers which methods work for each server to optimize future connections.  
  
Essential for collecting host-level information that complements SQL Server monitoring, such as checking available memory, CPU utilization, disk space, or Windows service status across your SQL Server infrastructure. The intelligent credential and connection caching prevents repeated authentication failures and speeds up bulk operations across multiple servers.  
  
Much of its behavior can be configured using Test-DbaCmConnection to pre-test and configure optimal connection methods for your environment.

## Syntax

```powershell
Get-DbaCmObject
    [-ClassName] <String>
    [-ComputerName <DbaCmConnectionParameter[]>]
    [-Credential <PSCredential>]
    [-Namespace <String>]
    [-DoNotUse {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-Force]
    [-SilentlyContinue]
    [-EnableException]
    [<CommonParameters>]

Get-DbaCmObject -Query <String>
    [-ComputerName <DbaCmConnectionParameter[]>]
    [-Credential <PSCredential>]
    [-Namespace <String>]
    [-DoNotUse {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-Force]
    [-SilentlyContinue]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaCmObject win32_OperatingSystem
```
{: data-copyable="true" data-clean-code="Get-DbaCmObject win32_OperatingSystem" }

Retrieves the common operating system information from the local computer.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCmObject -Computername "sql2014" -ClassName Win32_OperatingSystem -Credential $cred -DoNotUse CimRM
```
{: data-copyable="true" data-clean-code="Get-DbaCmObject -Computername &quot;sql2014&quot; -ClassName Win32_OperatingSystem -Credential $cred -DoNotUse CimRM" }

Retrieves the common operating system information from the server sql2014.<br>
It will use the Credentials stored in $cred to connect, unless they are known to not work, in which case they will default to windows credentials (unless another default has been set).<br>

### Required Parameters

##### -ClassName

Specifies the WMI or CIM class name to query from the target servers. Common classes include Win32_OperatingSystem for OS details, Win32_ComputerSystem for hardware info, or Win32_Service for Windows   
services.  
Use this when you need to retrieve all instances and properties of a specific Windows management class across your SQL Server infrastructure.

| Property | Value |
| --- | --- |
| Alias | Class |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Query

Specifies a custom WQL (WMI Query Language) query to execute against the target servers. Allows for complex filtering and specific property selection beyond simple class retrieval.  
Use this when you need advanced filtering like "SELECT Name, State FROM Win32_Service WHERE StartMode='Auto'" to get specific data rather than entire class instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer names or SQL Server host names to query for Windows management information. Accepts multiple values and pipeline input.  
Defaults to the local machine when not specified, but typically used to gather system-level data from remote SQL Server hosts for infrastructure monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credentials to use. Invalid credentials will be stored in a credentials cache and not be reused.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Namespace

Specifies the WMI namespace path where the target class or query should be executed. The default "root\cimv2" contains most Windows system classes.  
Change this when querying specialized namespaces like "root\SQLSERVER" for SQL Server-specific WMI classes or "root\MSCluster" for cluster information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | root\cimv2 |

##### -DoNotUse

Excludes specific connection protocols from the automatic fallback sequence. Valid values are CimRM, CimDCOM, Wmi, and PowerShellRemoting.  
Use this when certain protocols are blocked by network policies or cause issues in your environment, forcing the function to skip problematic connection methods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |

##### -Force

Bypasses timeout protections on connections that have previously failed, allowing retry attempts on servers marked as problematic.  
Use this when you suspect connection issues have been resolved or when you need to override cached failure states during troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SilentlyContinue

Converts terminating connection failures into non-terminating errors when used with EnableException, allowing processing to continue with remaining servers.  
Use this when querying multiple servers where some may be unavailable, and you want to collect data from accessible servers rather than stopping on the first failure.

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
