---
title: "Get-DbaDbExtentDiff"
slug: "Get-DbaDbExtentDiff"
date: 2024-01-01
layout: "single"
author: "Viorel Ciucu, cviorel.com"
availability: "Windows, Linux, macOS"
synopsis: "Calculates the percentage of database extents modified since the last full backup"
tags:
  - "Backup"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbExtentDiff.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbExtentDiff"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbExtentDiff</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbExtentDiff.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Viorel Ciucu, cviorel.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Calculates the percentage of database extents modified since the last full backup

## Description

Analyzes database extents to determine how much data has changed since the last full backup, helping DBAs decide between differential and full backup strategies. The function examines extent-level modifications (groups of 8 pages) to provide accurate change percentages, which is essential for optimizing backup schedules and storage requirements.  
  
For SQL Server 2016 SP2 and later, uses the sys.dm_db_file_space_usage DMV for efficient analysis. For older versions, falls back to DBCC PAGE commands to examine differential bitmap pages directly.  
  
Based on the original script by Paul S. Randal: https://www.sqlskills.com/blogs/paul/new-script-how-much-of-the-database-has-changed-since-the-last-full-backup/

## Syntax

```powershell
Get-DbaDbExtentDiff
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbExtentDiff -SqlInstance SQL2016 -Database DBA
```
{: data-copyable="true" data-clean-code="Get-DbaDbExtentDiff -SqlInstance SQL2016 -Database DBA" }

Get the changes for the DBA database.<br>

#####  Example:  2 

```powershell
PS C:\> $Cred = Get-Credential sqladmin
PS C:\> Get-DbaDbExtentDiff -SqlInstance SQL2017N1, SQL2017N2, SQL2016 -Database DB01 -SqlCredential $Cred
```
{: data-copyable="true" data-clean-code="$Cred = Get-Credential sqladmin
Get-DbaDbExtentDiff -SqlInstance SQL2017N1, SQL2017N2, SQL2016 -Database DB01 -SqlCredential $Cred" }

Get the changes for the DB01 database on multiple servers.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance

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

##### -Database

Specifies which databases to analyze for extent changes since the last full backup. Accepts multiple database names and supports wildcards.  
Use this when you need to check specific databases rather than analyzing all databases on the instance, which is helpful for large environments or when focusing on particular applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the extent change analysis. Accepts multiple database names and supports wildcards.  
Use this to exclude system databases, read-only databases, or databases where you don't need backup planning analysis, reducing execution time and focusing on relevant databases.

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
