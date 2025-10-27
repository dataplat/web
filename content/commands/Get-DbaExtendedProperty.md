---
title: "Get-DbaExtendedProperty"
slug: "Get-DbaExtendedProperty"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves custom metadata and documentation stored as extended properties on SQL Server objects"
tags:
  - "General"
  - "ExtendedProperty"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExtendedProperty.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaExtendedProperty"
draft: false
---

# Get-DbaExtendedProperty

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaExtendedProperty](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExtendedProperty.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaExtendedProperty](https://dataplat.github.io/boh#Get-DbaExtendedProperty).

## Synopsis

Retrieves custom metadata and documentation stored as extended properties on SQL Server objects

## Description

Retrieves extended properties that contain custom metadata, documentation, and business descriptions attached to SQL Server objects. Extended properties are commonly used by DBAs and developers to store object documentation, version information, business rules, and compliance notes directly within the database schema.  
  
This function discovers what documentation and metadata exists across your database objects, making it invaluable for database documentation audits, compliance reporting, and understanding legacy systems. You can retrieve properties from databases by default, or pipe in any SQL Server object from other dbatools commands to examine its custom metadata.  
  
Works with all major SQL Server object types including databases, tables, columns, stored procedures, functions, views, indexes, schemas, triggers, and many others. The command handles both direct database queries and piped objects seamlessly, so you can easily incorporate extended property discovery into broader database analysis workflows.  
  
Perfect for discovering undocumented business logic, finding objects with compliance tags, or building comprehensive database documentation reports from existing metadata.

## Syntax

```powershell
Get-DbaExtendedProperty
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Name] <String[]>]
    [[-InputObject] <PSObject[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaExtendedProperty -SqlInstance sql2016
```

Gets all extended properties on all databases<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaExtendedProperty -SqlInstance Server1 -Database db1
```

Gets the extended properties for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaExtendedProperty -SqlInstance Server1 -Database db1 -Name info1, info2
```

Gets the info1 and info2 extended properties within the db1 database<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance localhost -Database tempdb | Get-DbaExtendedProperty
```

Get the extended properties for all stored procedures in the tempdb database<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance localhost -Database mydb -Table mytable | Get-DbaExtendedProperty
```

Get the extended properties for the mytable table in the mydb database<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

Specifies which databases to search for extended properties. Only applies when connecting directly to SqlInstance.  
Use this when you need to examine extended properties from specific databases rather than all accessible databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Filters results to extended properties with specific names. Accepts multiple property names.  
Use this when you know the exact property names you're looking for, such as finding all objects tagged with 'Description' or 'Version' properties.

| Property | Value |
| --- | --- |
| Alias | Property |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Server objects piped from other dbatools commands to examine their extended properties.  
Use this to discover metadata on specific objects like tables, stored procedures, or views returned from commands like Get-DbaDbTable or Get-DbaDbStoredProcedure.

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
