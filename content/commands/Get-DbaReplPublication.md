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

# Get-DbaReplPublication

| Property | Value |
| --- | --- |
| **Author** | Colin Douglas |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaReplPublication](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaReplPublication.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaReplPublication](https://dataplat.github.io/boh#Get-DbaReplPublication).

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

Return all publications for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance sql2008 -Database TestDB
```

Return all publications on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance sql2008 -Type Transactional
```

Return all transactional publications on server sql2008.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaReplPublication -SqlInstance mssql1 -Name Merge
```

Returns the Mergey publications on server mssql1<br>

#####  Example:  5 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance mssql1 | Get-DbaReplPublication
```

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
