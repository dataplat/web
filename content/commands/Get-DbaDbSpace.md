---
title: "Get-DbaDbSpace"
slug: "Get-DbaDbSpace"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed space usage metrics for all database files including used space, free space, and growth settings."
tags:
  - "Database"
  - "Space"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSpace.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSpace"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbSpace</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSpace.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Michael Fal (@Mike_Fal), mikefal.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves detailed space usage metrics for all database files including used space, free space, and growth settings.

## Description

Queries sys.database_files and FILEPROPERTY to return comprehensive space information for data and log files across databases. Shows current usage, available free space, autogrowth configuration, and space remaining until maximum file size limits are reached. Essential for capacity planning, identifying files approaching size limits, and monitoring database storage consumption patterns.  
  
File free space script borrowed and modified from Glenn Berry's DMV scripts (http://www.sqlskills.com/blogs/glenn/category/dmv-queries/)

## Syntax

```powershell
Get-DbaDbSpace
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-IncludeSystemDBs]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaDbSpace -SqlInstance localhost" }

Returns all user database files and free space information for the localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost | Where-Object {$_.PercentUsed -gt 80}
```
{: data-copyable="true" data-clean-code="Get-DbaDbSpace -SqlInstance localhost | Where-Object {$_.PercentUsed -gt 80}" }

Returns all user database files and free space information for the local host. Filters the output object by any files that have a percent used of greater than 80%.<br>

#####  Example:  3 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbSpace
```
{: data-copyable="true" data-clean-code="'localhost','localhost\namedinstance' | Get-DbaDbSpace" }

Returns all user database files and free space information for the localhost and localhost\namedinstance SQL Server instances. Processes data via the pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost -Database db1, db2 | Where-Object { $_.SpaceUntilMaxSize.Megabyte -lt 1 }
```
{: data-copyable="true" data-clean-code="Get-DbaDbSpace -SqlInstance localhost -Database db1, db2 | Where-Object { $_.SpaceUntilMaxSize.Megabyte -lt 1 }" }

Returns database files and free space information for the db1 and db2 on localhost where there is only 1MB left until the space is maxed out<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSpace -SqlInstance localhost -Database db1, db2 | Where-Object { $_.SpaceUntilMaxSize.Gigabyte -lt 1 }
```
{: data-copyable="true" data-clean-code="Get-DbaDbSpace -SqlInstance localhost -Database db1, db2 | Where-Object { $_.SpaceUntilMaxSize.Gigabyte -lt 1 }" }

Returns database files and free space information for the db1 and db2 on localhost where there is only 1GB left until the space is maxed out<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Limits space analysis to specific databases by name. Accepts multiple values and supports wildcards.  
Use this when monitoring space usage for critical databases or investigating specific capacity issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from space analysis by name. Accepts multiple values and supports wildcards.  
Useful for skipping test databases, staging environments, or databases with known space issues when doing server-wide capacity reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDBs

This parameter is deprecated and will cause the function to stop with an error message.  
To include system databases in space analysis, pipe results from Get-DbaDatabase with the -IncludeSystem parameter instead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for space analysis.  
This allows for advanced filtering scenarios, such as analyzing only databases with specific properties like recovery models or creation dates.

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
