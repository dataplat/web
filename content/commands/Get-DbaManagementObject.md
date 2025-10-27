---
title: "Get-DbaManagementObject"
slug: "Get-DbaManagementObject"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck), dbaduck.com"
availability: "Windows, Linux, macOS"
synopsis: "Discovers installed SQL Server Management Object (SMO) assemblies and their load status"
tags:
  - "SMO"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaManagementObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaManagementObject"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaManagementObject</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaManagementObject.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Ben Miller (@DBAduck), dbaduck.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Discovers installed SQL Server Management Object (SMO) assemblies and their load status

## Description

Scans the system for SQL Server Management Object (SMO) assemblies, SqlClient libraries, and SNI modules to help troubleshoot version conflicts and connectivity issues. This function checks both the Global Assembly Cache (GAC) and currently loaded assemblies in the PowerShell session, returning version information, load status, file paths, and ready-to-use Add-Type commands. Particularly useful when diagnosing why different SQL Server tools behave differently or when you need to load specific SMO versions in PowerShell scripts.

## Syntax

```powershell
Get-DbaManagementObject
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-VersionNumber] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaManagementObject
```
{: data-copyable="true" data-clean-code="Get-DbaManagementObject" }

Returns all versions of SMO on the computer<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaManagementObject -VersionNumber 13
```
{: data-copyable="true" data-clean-code="Get-DbaManagementObject -VersionNumber 13" }

Returns just the version specified. If the version does not exist then it will return nothing.<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows server(s) where you want to scan for SMO assemblies and SQL Client libraries.  
Use this when troubleshooting SMO version conflicts across multiple servers or when checking which SQL Server tools are installed on remote machines.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

This command uses Windows credentials. This parameter allows you to connect remotely as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -VersionNumber

Filters results to show only assemblies matching the specified major version number (e.g., 13 for SQL Server 2016, 14 for 2017, 15 for 2019).  
Use this when you need to verify if a specific SQL Server version's SMO libraries are installed, particularly when troubleshooting version compatibility issues between different SQL Server tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
