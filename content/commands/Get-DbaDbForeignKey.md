---
title: "Get-DbaDbForeignKey"
slug: "Get-DbaDbForeignKey"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves foreign key constraints from SQL Server database tables"
tags:
  - "Database"
  - "ForeignKey"
  - "Table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbForeignKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbForeignKey"
draft: false
---

# Get-DbaDbForeignKey

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbForeignKey](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbForeignKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbForeignKey](https://dataplat.github.io/boh#Get-DbaDbForeignKey).

## Synopsis

Retrieves foreign key constraints from SQL Server database tables

## Description

Retrieves all foreign key constraint definitions from tables across one or more SQL Server databases.  
Essential for documenting referential integrity relationships, analyzing table dependencies before migrations, and troubleshooting cascade operations.  
Returns detailed foreign key properties including referenced tables, schema information, and constraint status (enabled/disabled, checked/unchecked).  
Supports filtering by database and excluding system tables to focus on user-defined constraints.

## Syntax

```powershell
Get-DbaDbForeignKey
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemTable]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbForeignKey -SqlInstance sql2016
```

Gets all database Foreign Keys.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbForeignKey -SqlInstance Server1 -Database db1
```

Gets the Foreign Keys for the db1 database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbForeignKey -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the Foreign Keys for all databases except db1.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbForeignKey -SqlInstance Server1 -ExcludeSystemTable
```

Gets the Foreign Keys from all tables that are not system objects from all databases.<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbForeignKey
```

Gets the Foreign Keys for the databases on Sql1 and Sql2/sqlexpress.<br>

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

Specifies which databases to scan for foreign key constraints. Accepts database names, wildcards, or arrays.  
Use this when you need to focus on specific databases rather than scanning all accessible databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the foreign key scan. Useful for skipping large databases, test environments, or databases known to have no relevant constraints.  
Commonly used to exclude system databases like master, model, msdb, and tempdb when focusing on user databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemTable

Excludes system tables from the foreign key analysis, focusing only on user-created tables.  
Use this switch when documenting application schemas or analyzing business logic relationships, as system table foreign keys are typically not relevant for most DBA tasks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
