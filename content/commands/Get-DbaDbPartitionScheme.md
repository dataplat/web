---
title: "Get-DbaDbPartitionScheme"
slug: "Get-DbaDbPartitionScheme"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves partition schemes from SQL Server databases for table partitioning management."
tags:
  - "Database"
  - "Partition"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPartitionScheme.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbPartitionScheme"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbPartitionScheme</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPartitionScheme.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDbaKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves partition schemes from SQL Server databases for table partitioning management.

## Description

Retrieves partition scheme objects from one or more SQL Server databases, providing details about how partitioned tables and indexes are distributed across filegroups. Partition schemes define the physical storage mapping for partitioned tables by specifying which filegroups contain each partition's data. This function helps DBAs inventory existing partition schemes when planning table partitioning strategies, troubleshooting performance issues with partitioned tables, or preparing for partition maintenance operations.

## Syntax

```powershell
Get-DbaDbPartitionScheme
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-PartitionScheme] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaDbPartitionScheme -SqlInstance sql2016" }

Gets all database partition schemes.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance Server1 -Database db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbPartitionScheme -SqlInstance Server1 -Database db1" }

Gets the partition schemes for the db1 database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance Server1 -ExcludeDatabase db1
```
{: data-copyable="true" data-clean-code="Get-DbaDbPartitionScheme -SqlInstance Server1 -ExcludeDatabase db1" }

Gets the partition schemes for all databases except db1.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbPartitionScheme
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Get-DbaDbPartitionScheme" }

Gets the partition schemes for the databases on Sql1 and Sql2/sqlexpress.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance localhost -Database TestDB -PartitionScheme partSch01
```
{: data-copyable="true" data-clean-code="Get-DbaDbPartitionScheme -SqlInstance localhost -Database TestDB -PartitionScheme partSch01" }

Gets the partition scheme partSch01 for the TestDB on localhost.<br>

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

Specifies which databases to scan for partition schemes. Accepts multiple database names.  
Use this when you need to check partition schemes in specific databases rather than all accessible databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when scanning for partition schemes. Accepts multiple database names.  
Use this to exclude system databases or specific databases you don't want to check, such as development or staging databases during production audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PartitionScheme

Specifies which partition schemes to retrieve by name. Accepts multiple scheme names for targeted retrieval.  
Use this when you need to examine specific partition schemes rather than all schemes in the database, such as when troubleshooting performance issues with particular partitioned tables.

| Property | Value |
| --- | --- |
| Alias | Name |
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
