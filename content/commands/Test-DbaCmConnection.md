---
title: "Test-DbaCmConnection"
slug: "Test-DbaCmConnection"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Tests remote computer management connectivity using multiple protocols and caches optimal connection methods"
tags:
  - "ComputerManagement"
  - "CIM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaCmConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaCmConnection"
draft: false
---

# Test-DbaCmConnection

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaCmConnection](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaCmConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaCmConnection](https://dataplat.github.io/boh#Test-DbaCmConnection).

## Synopsis

Tests remote computer management connectivity using multiple protocols and caches optimal connection methods

## Description

Tests remote computer connectivity across four different management protocols to determine the most reliable connection method for SQL Server administration tasks.  
  
This function evaluates connectivity for:  
- CIM over WinRM (Windows Remote Management)  
- CIM over DCOM (Distributed Component Object Model)  
- WMI (Windows Management Instrumentation)  
- PowerShell Remoting  
  
Results are cached and automatically used by other dbatools commands like Get-DbaCmObject and Invoke-DbaCmMethod to optimize future connections. This eliminates the need to test connectivity repeatedly and ensures faster execution of subsequent operations. The connectivity cache is dynamically updated as other dbatools commands discover working or failing connection methods.  
  
This function bypasses global configuration settings that might restrict certain protocols, allowing you to test all available connection types regardless of your dbatools configuration.

## Syntax

```powershell
Test-DbaCmConnection
    [[-ComputerName] <DbaCmConnectionParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Type] {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-Force]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaCmConnection -ComputerName sql2014
```

Performs a full-spectrum connection test against the computer sql2014. The results will be reported and registered. Future calls from Get-DbaCmObject will recognize the results and optimize the query.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaCmConnection -ComputerName sql2014 -Credential $null -Type CimDCOM, CimRM
```

This test will run a connectivity test of CIM over DCOM and CIM over WinRM against the computer sql2014 using Windows Authentication.<br>
The results will be reported and registered. Future calls from Get-DbaCmObject will recognize the results and optimize the query.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computers to test management connectivity against. Accepts computer names, IP addresses, or FQDN formats.  
Use this to validate which remote management protocols work before running other dbatools commands that require computer management access.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

The credentials to use when running the test. Bad credentials are automatically cached as non-working. This behavior can be disabled by the 'Cache.Management.Disable.BadCredentialList' configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies which remote management protocols to test for connectivity. Tests all four protocols by default.  
Use this to focus testing on specific protocols when troubleshooting connectivity issues or when you know certain protocols are blocked in your environment.  
Available options: CimRM (CIM over WinRM), CimDCOM (CIM over DCOM), Wmi (legacy WMI), PowerShellRemoting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @("CimRM", "CimDCOM", "Wmi", "PowerShellRemoting") |

##### -Force

Forces testing even when credentials are cached as previously failed. Removes bad credential cache entries and retests connectivity.  
Use this when credentials have been updated or when network connectivity issues have been resolved since the last test.

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
