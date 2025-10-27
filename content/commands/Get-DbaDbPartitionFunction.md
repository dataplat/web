---
title: "Get-DbaDbPartitionFunction"
slug: "Get-DbaDbPartitionFunction"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves partition function definitions and metadata from SQL Server databases."
tags:
  - "Database"
  - "Partition"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPartitionFunction.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbPartitionFunction"
draft: false
---

# Get-DbaDbPartitionFunction

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbPartitionFunction](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbPartitionFunction.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbPartitionFunction](https://dataplat.github.io/boh#Get-DbaDbPartitionFunction).

## Synopsis

Retrieves partition function definitions and metadata from SQL Server databases.

## Description

Retrieves partition function definitions and their metadata from one or more SQL Server databases. Partition functions define how table or index data is distributed across multiple partitions based on the values of a partitioning column. This function returns details like creation date, function name, and number of partitions, making it useful for documenting partitioning schemes, analyzing partition distribution strategies, and auditing partitioned table configurations before maintenance operations.

## Syntax

```powershell
Get-DbaDbPartitionFunction
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-PartitionFunction] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbPartitionFunction -SqlInstance sql2016
```

Gets all database partition functions.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbPartitionFunction -SqlInstance Server1 -Database db1
```

Gets the partition functions for the db1 database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbPartitionFunction -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the partition functions for all databases except db1.<br>

#####  Example:  4 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbPartitionFunction
```

Gets the partition functions for the databases on Sql1 and Sql2/sqlexpress.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbPartitionFunction -SqlInstance localhost -Database TestDB -PartitionFunction partFun01
```

Gets the partition function partFun01 for the TestDB on localhost.<br>

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

Specifies which databases to search for partition functions. Accepts multiple database names as an array.  
Use this when you need to examine partition functions in specific databases rather than scanning all accessible databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip when searching for partition functions. Accepts multiple database names as an array.  
Use this to avoid scanning system databases or databases where you know partition functions don't exist, improving performance on instances with many databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PartitionFunction

Specifies which partition functions to retrieve by name. Accepts multiple function names as an array and supports wildcards.  
Use this when you need details about specific partition functions rather than retrieving all partition functions from the target databases.

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
