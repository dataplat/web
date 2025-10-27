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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaCmConnection</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaCmConnection.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Test-DbaCmConnection -ComputerName sql2014" }

Performs a full-spectrum connection test against the computer sql2014. The results will be reported and registered. Future calls from Get-DbaCmObject will recognize the results and optimize the query.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaCmConnection -ComputerName sql2014 -Credential $null -Type CimDCOM, CimRM
```
{: data-copyable="true" data-clean-code="Test-DbaCmConnection -ComputerName sql2014 -Credential $null -Type CimDCOM, CimRM" }

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
