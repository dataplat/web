---
title: "Get-DbaFeature"
slug: "Get-DbaFeature"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Discovers installed SQL Server features and components across multiple servers"
tags:
  - "Feature"
  - "Component"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFeature.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaFeature"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaFeature</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFeature.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Discovers installed SQL Server features and components across multiple servers

## Description

Executes SQL Server's built-in feature discovery report to inventory all installed SQL Server components, editions, and instances across one or more servers. This function automates the manual process of running setup.exe /Action=RunDiscovery and parsing the resulting XML report, making it perfect for compliance auditing, license tracking, and environment documentation.  
  
The function returns structured data showing exactly what SQL Server features are installed, which instances they belong to, their versions, editions, and configuration status. This is essential for DBAs who need to understand their SQL Server landscape without manually checking each server or running discovery reports individually.  
  
Inspired by Dave Mason's (@BeginTry) post at  
https://itsalljustelectrons.blogspot.be/2018/04/SQL-Server-Discovery-Report.html  
  
Assumptions:  
1. The sub-folder "Microsoft SQL Server" exists in [System.Environment]::GetFolderPath("ProgramFiles"),  
even if SQL was installed to a non-default path. This has been  
verified on SQL 2008R2 and SQL 2012. Further verification may be needed.  
2. The discovery report displays installed components for the version of SQL  
Server associated with setup.exe, along with installed components of all  
lesser versions of SQL Server that are installed.

## Syntax

```powershell
Get-DbaFeature
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
PS C:\> Get-DbaFeature -ComputerName sql2017, sql2016, sql2005
```
{: data-copyable="true" data-clean-code="Get-DbaFeature -ComputerName sql2017, sql2016, sql2005" }

Gets all SQL Server features for all instances on sql2017, sql2016 and sql2005.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFeature -Verbose
```
{: data-copyable="true" data-clean-code="Get-DbaFeature -Verbose" }

Gets all SQL Server features for all instances on localhost. Outputs to screen if no instances are found.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFeature -ComputerName sql2017 -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Get-DbaFeature -ComputerName sql2017 -Credential ad\sqldba" }

Gets all SQL Server features for all instances on sql2017 using the ad\sqladmin credential (which has access to the Windows Server).<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows computer names where you want to discover SQL Server features and components. Accepts multiple computers for bulk discovery operations.  
Use this when you need to inventory SQL Server installations across your environment for compliance auditing or license tracking.  
Requires PowerShell remoting to be enabled on remote computers. Note that this targets the Windows host, not SQL instance names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to servers using alternative credentials. To use:  
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


&nbsp;
