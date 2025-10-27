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

# Get-DbaDbPartitionScheme

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbPartitionScheme](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPartitionScheme.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbPartitionScheme](https://dataplat.github.io/boh#Get-DbaDbPartitionScheme).

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

Gets all database partition schemes.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance Server1 -Database db1
```

Gets the partition schemes for the db1 database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the partition schemes for all databases except db1.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbPartitionScheme
```

Gets the partition schemes for the databases on Sql1 and Sql2/sqlexpress.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbPartitionScheme -SqlInstance localhost -Database TestDB -PartitionScheme partSch01
```

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
