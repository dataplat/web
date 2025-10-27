---
title: "Get-DbaReplPublication"
slug: "Get-DbaReplPublication"
date: 2024-01-01
layout: "single"
author: "Colin Douglas"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves replication publications from SQL Server instances, including transactional, merge, and snapshot publications."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplPublication.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaReplPublication"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaReplPublication</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplPublication.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Colin Douglas</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves replication publications from SQL Server instances, including transactional, merge, and snapshot publications.

## Description

Scans SQL Server instances to identify and return all replication publications configured as publishers. This function examines each database's replication options to locate published databases, then retrieves detailed information about their publications including associated articles and subscriptions. DBAs use this to audit replication topology, troubleshoot publication configuration issues, and document existing replication setup across their environment. Results can be filtered by specific databases, publication names, or publication types to focus on particular replication components.

## Syntax

```powershell
Get-DbaReplPublication
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-Name] <String>]
    [[-Type] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance sql2008, sqlserver2012
```
{: data-copyable="true" data-clean-code="Get-DbaReplPublication -SqlInstance sql2008, sqlserver2012" }

Return all publications for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance sql2008 -Database TestDB
```
{: data-copyable="true" data-clean-code="Get-DbaReplPublication -SqlInstance sql2008 -Database TestDB" }

Return all publications on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance sql2008 -Type Transactional
```
{: data-copyable="true" data-clean-code="Get-DbaReplPublication -SqlInstance sql2008 -Type Transactional" }

Return all transactional publications on server sql2008.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance mssql1 -Name Merge
```
{: data-copyable="true" data-clean-code="Get-DbaReplPublication -SqlInstance mssql1 -Name Merge" }

Returns the Mergey publications on server mssql1<br>

#####  Example:  5 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance mssql1 | Get-DbaReplPublication
```
{: data-copyable="true" data-clean-code="Connect-DbaInstance -SqlInstance mssql1 | Get-DbaReplPublication" }

Returns all publications on server mssql1 using the pipeline.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to examine for replication publications. Accepts wildcards and multiple database names.  
Use this when you need to focus on specific databases instead of scanning all published databases on the instance.  
Only databases that have replication enabled will return publication information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Filters results to publications with the specified name. Accepts multiple publication names for batch processing.  
Use this when you need to check the status or configuration of specific publications rather than viewing all publications in a database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Limits results to specific publication types: Transactional, Merge, or Snapshot.  
Use this to focus on a particular replication methodology when troubleshooting or auditing specific replication scenarios.  
Transactional publications provide real-time data synchronization, while Merge publications handle bidirectional conflicts and Snapshot publications provide point-in-time data distribution.

| Property | Value |
| --- | --- |
| Alias | PublicationType |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Transactional,Merge,Snapshot |

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
