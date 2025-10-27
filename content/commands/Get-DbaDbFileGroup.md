---
title: "Get-DbaDbFileGroup"
slug: "Get-DbaDbFileGroup"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves filegroup configuration and storage details from SQL Server databases"
tags:
  - "Storage"
  - "File"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFileGroup"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbFileGroup</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileGroup.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves filegroup configuration and storage details from SQL Server databases

## Description

Retrieves detailed filegroup information from one or more databases, including filegroup type, size, and configuration details. This function helps DBAs analyze database storage organization, plan storage capacity, and document database structure for compliance or migration planning. Returns filegroup objects that can be filtered by database or specific filegroup names, making it useful for targeted storage analysis and troubleshooting performance issues related to data distribution.

## Syntax

```powershell
Get-DbaDbFileGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-InputObject] <Database[]>]
    [[-FileGroup] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaDbFileGroup -SqlInstance sql2016" }

Return all FileGroups for all databases on instance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sql2016 -Database MyDB
```
{: data-copyable="true" data-clean-code="Get-DbaDbFileGroup -SqlInstance sql2016 -Database MyDB" }

Return all FileGroups for database MyDB on instance sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sql2016 -FileGroup Primary
```
{: data-copyable="true" data-clean-code="Get-DbaDbFileGroup -SqlInstance sql2016 -FileGroup Primary" }

Returns information on filegroup called Primary if it exists in any database on the server sql2016<br>

#####  Example:  4 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbFileGroup
```
{: data-copyable="true" data-clean-code="'localhost','localhost\namedinstance' | Get-DbaDbFileGroup" }

Returns information on all FileGroups for all databases on instances 'localhost','localhost\namedinstance'<br>

#####  Example:  5 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbFileGroup
```
{: data-copyable="true" data-clean-code="'localhost','localhost\namedinstance' | Get-DbaDbFileGroup" }

Returns information on all FileGroups for all databases on instances 'localhost','localhost\namedinstance'<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -ExcludeDatabase model,master | Get-DbaDbFileGroup
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -ExcludeDatabase model,master | Get-DbaDbFileGroup" }

Returns information on all FileGroups for all databases except model and master on instances SQL1\SQLExpress,SQL2<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

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

Specifies which databases to analyze for filegroup information. Accepts wildcards and multiple database names.  
Use this when you need to focus on specific databases instead of scanning all databases on the instance, which is helpful for large environments or targeted storage analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase pipeline input for processing filegroups.  
Use this when you want to chain database filtering with filegroup analysis, such as excluding system databases or filtering by database properties before examining storage structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -FileGroup

Filters results to specific filegroups by name, such as 'PRIMARY' or custom filegroups.  
Use this when troubleshooting storage issues with particular filegroups or when you need to verify configuration of specific data placement strategies.

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
