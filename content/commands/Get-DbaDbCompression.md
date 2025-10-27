---
title: "Get-DbaDbCompression"
slug: "Get-DbaDbCompression"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves compression settings, sizes, and row counts for tables and indexes across SQL Server databases."
tags:
  - "Compression"
  - "Table"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCompression.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbCompression"
draft: false
---

# Get-DbaDbCompression

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbCompression](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCompression.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbCompression](https://dataplat.github.io/boh#Get-DbaDbCompression).

## Synopsis

Retrieves compression settings, sizes, and row counts for tables and indexes across SQL Server databases.

## Description

This function analyzes data compression usage across your SQL Server databases by examining tables, indexes, and their physical partitions. It returns detailed information including current compression type (None, Row, Page, Columnstore), space usage, and row counts for each object. This is essential for compression optimization analysis, identifying candidates for compression to save storage space, and generating compliance reports on compression usage across your database environment.

## Syntax

```powershell
Get-DbaDbCompression
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Table] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbCompression -SqlInstance localhost
```

Returns objects size and current compression level for all user databases.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbCompression -SqlInstance localhost -Database TestDatabase
```

Returns objects size and current compression level for objects within the TestDatabase database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbCompression -SqlInstance localhost -ExcludeDatabase TestDatabases
```

Returns objects size and current compression level for objects in all databases except the TestDatabase database.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbCompression -SqlInstance localhost -ExcludeDatabase TestDatabases -Table table1, table2
```

Returns objects size and current compression level for table1 and table2 in all databases except the TestDatabase database.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

Specifies which databases to analyze for compression information. Accepts multiple database names as an array.  
Use this when you want to focus compression analysis on specific databases rather than scanning all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip during compression analysis. Accepts multiple database names as an array.  
Use this to exclude system databases, maintenance databases, or other databases you don't want included in compression reporting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies which tables to analyze for compression information. Accepts multiple table names as an array.  
Use this when you need compression details for specific tables rather than all tables in the target databases, particularly useful for large databases where you want to focus on specific objects.

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
