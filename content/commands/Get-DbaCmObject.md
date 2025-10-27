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

# Get-DbaCmObject

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaCmObject](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCmObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaCmObject](https://dataplat.github.io/boh#Get-DbaCmObject).

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

Retrieves the common operating system information from the local computer.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCmObject -Computername "sql2014" -ClassName Win32_OperatingSystem -Credential $cred -DoNotUse CimRM
```

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
