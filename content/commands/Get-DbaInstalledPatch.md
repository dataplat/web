---
title: "Get-DbaInstalledPatch"
slug: "Get-DbaInstalledPatch"
date: 2024-01-01
layout: "single"
author: "Hiram Fleitas, @hiramfleitas, fleitasarts.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves installed SQL Server patches from Windows Registry for patch compliance and audit reporting."
tags:
  - "Deployment"
  - "Updates"
  - "Patches"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstalledPatch.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstalledPatch"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaInstalledPatch</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstalledPatch.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Hiram Fleitas, @hiramfleitas, fleitasarts.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves installed SQL Server patches from Windows Registry for patch compliance and audit reporting.

## Description

Queries the Windows Registry to retrieve a complete history of SQL Server patches installed on one or more computers. This includes Cumulative Updates (CUs), Service Packs, and Hotfixes that have been applied to any SQL Server instance on the target machines.  
  
Essential for patch compliance audits, pre-upgrade planning, and troubleshooting environments where you need to verify what patches have been installed and when. The function returns patch names, versions, and installation dates so you can quickly assess patch levels across your SQL Server estate without manually checking each server.  
  
To test if your build is up to date, use Test-DbaBuild.

## Syntax

```powershell
Get-DbaInstalledPatch
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
PS C:\> Get-DbaInstalledPatch -ComputerName HiramSQL1, HiramSQL2
```
{: data-copyable="true" data-clean-code="Get-DbaInstalledPatch -ComputerName HiramSQL1, HiramSQL2" }

Gets a list of SQL Server patches installed on HiramSQL1 and HiramSQL2.<br>

#####  Example:  2 

```powershell
PS C:\> Get-Content C:\Monitoring\Servers.txt | Get-DbaInstalledPatch
```
{: data-copyable="true" data-clean-code="Get-Content C:\Monitoring\Servers.txt | Get-DbaInstalledPatch" }

Gets the SQL Server patches from a list of computers in C:\Monitoring\Servers.txt.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaInstalledPatch -ComputerName SRV1 | Sort-Object InstallDate.Date
```
{: data-copyable="true" data-clean-code="Get-DbaInstalledPatch -ComputerName SRV1 | Sort-Object InstallDate.Date" }

Gets the SQL Server patches from SRV1 and orders by date. Note that we use<br>
a special customizable date datatype for InstallDate so you'll need InstallDate.Date<br>

### Optional Parameters

##### -ComputerName

Specifies the target computers to query for SQL Server patch information. Accepts single computer names, comma-separated lists, or pipeline input from text files.  
Use this to audit patch levels across multiple servers for compliance reporting or pre-upgrade planning.  
Defaults to the local computer when not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the Computer as a different user.

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
