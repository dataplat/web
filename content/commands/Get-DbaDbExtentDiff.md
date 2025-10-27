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

# Get-DbaDbExtentDiff

| Property | Value |
| --- | --- |
| **Author** | Viorel Ciucu, cviorel.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbExtentDiff](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbExtentDiff.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbExtentDiff](https://dataplat.github.io/boh#Get-DbaDbExtentDiff).

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

Get the changes for the DBA database.<br>

#####  Example:  2 

```powershell
PS C:\> $Cred = Get-Credential sqladmin
PS C:\> Get-DbaDbExtentDiff -SqlInstance SQL2017N1, SQL2017N2, SQL2016 -Database DB01 -SqlCredential $Cred
```

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
