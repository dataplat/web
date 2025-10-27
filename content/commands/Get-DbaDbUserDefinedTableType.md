---
title: "Get-DbaDbUserDefinedTableType"
slug: "Get-DbaDbUserDefinedTableType"
date: 2024-01-01
layout: "single"
author: "Ant Green (@ant_green)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves user-defined table types from SQL Server databases"
tags:
  - "Database"
  - "UserDefinedTableType"
  - "Type"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUserDefinedTableType.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbUserDefinedTableType"
draft: false
---

# Get-DbaDbUserDefinedTableType

| Property | Value |
| --- | --- |
| **Author** | Ant Green (@ant_green) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbUserDefinedTableType](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbUserDefinedTableType.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbUserDefinedTableType](https://dataplat.github.io/boh#Get-DbaDbUserDefinedTableType).

## Synopsis

Retrieves user-defined table types from SQL Server databases

## Description

Retrieves user-defined table types from SQL Server databases, which are custom data types used as table-valued parameters in stored procedures and functions. This command helps DBAs audit these schema-bound objects, document their structure and usage, or identify dependencies before making database changes. Returns detailed information including column definitions, ownership, and creation dates across multiple databases and instances.

## Syntax

```powershell
Get-DbaDbUserDefinedTableType
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Type] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbUserDefinedTableType -SqlInstance sql2016
```

Gets all database user defined table types in all the databases<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbUserDefinedTableType -SqlInstance Server1 -Database db1
```

Gets all the user defined table types for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbUserDefinedTableType -SqlInstance Server1 -Database db1 -Type type1
```

Gets type1 user defined table type from db1 database<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

Specifies which databases to retrieve user-defined table types from. Accepts database names and supports wildcards for pattern matching.  
Use this when you need to examine table types in specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from the search for user-defined table types. Accepts database names and wildcards.  
Use this when you want to scan most databases but skip specific ones like system databases or inactive databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Filters results to include only specific user-defined table type names. Accepts an array of type names for multiple selections.  
Use this when you need to examine particular table types across databases, such as auditing usage of a specific custom type.

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
