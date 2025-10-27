---
title: "Get-DbaDbFile"
slug: "Get-DbaDbFile"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive database file information including size, growth, I/O statistics, and storage details."
tags:
  - "Storage"
  - "Data"
  - "File"
  - "Log"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFile"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves comprehensive database file information including size, growth, I/O statistics, and storage details.

## Description

Retrieves detailed information about database files (data and log files) from SQL Server instances using direct T-SQL queries for optimal performance. This function provides comprehensive file metadata including current size, used space, growth settings, I/O statistics, and volume free space information that DBAs need for capacity planning, performance analysis, and storage management. Unlike SMO-based approaches, this command avoids costly enumeration operations and provides faster results when analyzing file configurations across multiple databases.

## Syntax

```powershell
Get-DbaDbFile
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-FileGroup] <Object[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaDbFile -SqlInstance sql2016" }

Will return an object containing all file groups and their contained files for every database on the sql2016 SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016 -Database Impromptu
```
{: data-copyable="true" data-clean-code="Get-DbaDbFile -SqlInstance sql2016 -Database Impromptu" }

Will return an object containing all file groups and their contained files for the Impromptu Database on the sql2016 SQL Server instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016 -Database Impromptu, Trading
```
{: data-copyable="true" data-clean-code="Get-DbaDbFile -SqlInstance sql2016 -Database Impromptu, Trading" }

Will return an object containing all file groups and their contained files for the Impromptu and Trading databases on the sql2016 SQL Server instance<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database Impromptu, Trading | Get-DbaDbFile
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2016 -Database Impromptu, Trading | Get-DbaDbFile" }

Will accept piped input from Get-DbaDatabase and return an object containing all file groups and their contained files for the Impromptu and Trading databases on the sql2016 SQL Server instance<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbFile -SqlInstance sql2016 -Database AdventureWorks2017 -FileGroup Index
```
{: data-copyable="true" data-clean-code="Get-DbaDbFile -SqlInstance sql2016 -Database AdventureWorks2017 -FileGroup Index" }

Return any files that are in the Index filegroup of the AdventureWorks2017 database.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Database

Specifies which databases to analyze for file information. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases rather than scanning all databases on the instance.  
Particularly useful for capacity planning or troubleshooting file growth issues on targeted databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the file analysis. Accepts wildcards for pattern matching.  
Use this to skip system databases, test databases, or databases you don't need to analyze.  
Helpful when performing routine file space reviews while avoiding databases that don't require monitoring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroup

Filters results to show only files within the specified filegroup name.  
Use this when analyzing specific filegroups for space utilization, I/O patterns, or growth planning.  
Particularly valuable when troubleshooting performance issues or planning filegroup-specific storage migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from other dbatools commands like Get-DbaDatabase.  
Use this for advanced filtering scenarios or when chaining multiple dbatools commands together.  
Allows you to pre-filter databases using complex criteria before analyzing their file information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
