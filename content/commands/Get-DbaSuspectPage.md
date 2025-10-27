---
title: "Get-DbaSuspectPage"
slug: "Get-DbaSuspectPage"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves suspect page records from msdb database for corruption detection and analysis"
tags:
  - "Pages"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSuspectPage.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSuspectPage"
draft: false
---

# Get-DbaSuspectPage

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSuspectPage](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSuspectPage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSuspectPage](https://dataplat.github.io/boh#Get-DbaSuspectPage).

## Synopsis

Retrieves suspect page records from msdb database for corruption detection and analysis

## Description

Queries the msdb.dbo.suspect_pages table to identify database pages that have experienced corruption events such as checksum failures, torn pages, or I/O errors. SQL Server automatically logs corrupt pages to this system table when encountered during read operations, making this function essential for proactive corruption monitoring and troubleshooting. Returns detailed information including the specific database, file, page location, error type, occurrence count, and last detection date to help DBAs prioritize remediation efforts.

## Syntax

```powershell
Get-DbaSuspectPage
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Database] <Object>]
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSuspectPage -SqlInstance sql2016
```

Retrieve any records stored for Suspect Pages on the sql2016 SQL Server.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSuspectPage -SqlInstance sql2016 -Database Test
```

Retrieve any records stored for Suspect Pages on the sql2016 SQL Server and the Test database only.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Database

Filters suspect page results to a specific database name. When omitted, returns suspect pages from all databases on the instance.  
Use this when investigating corruption issues in a particular database or when you need to focus troubleshooting efforts on a single database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
