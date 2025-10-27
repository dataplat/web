---
title: "Add-DbaExtendedProperty"
slug: "Add-DbaExtendedProperty"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Adds extended properties to SQL Server objects for metadata storage and documentation"
tags:
  - "General"
  - "ExtendedProperty"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaExtendedProperty.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaExtendedProperty"
draft: false
---

# Add-DbaExtendedProperty

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Add-DbaExtendedProperty](https://github.com/dataplat/dbatools/blob/master/public/Add-DbaExtendedProperty.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Add-DbaExtendedProperty](https://dataplat.github.io/boh#Add-DbaExtendedProperty).

## Synopsis

Adds extended properties to SQL Server objects for metadata storage and documentation

## Description

Creates custom metadata properties on SQL Server objects to store documentation, version information, business context, or compliance tags. Extended properties are stored in the database system catalogs and don't affect object performance but provide valuable context for DBAs managing complex environments.  
  
This command accepts piped input from any dbatools Get-Dba* command, making it easy to bulk-apply properties across multiple objects. You can add extended properties to databases directly or target specific object types, including:  
  
Aggregate  
Assembly  
Column  
Constraint  
Contract  
Database  
Event Notification  
Filegroup  
Function  
Index  
Logical File Name  
Message Type  
Parameter  
Partition Function  
Partition Scheme  
Procedure  
Queue  
Remote Service Binding  
Route  
Rule  
Schema  
Service  
Synonym  
Table  
Trigger  
Type  
View  
Xml Schema Collection

## Syntax

```powershell
Add-DbaExtendedProperty
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-Name] <String>
    [-Value] <String>
    [[-InputObject] <PSObject[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Add-DbaExtendedProperty -SqlInstance Server1 -Database db1 -Name version -Value "1.0.0"
```

Sets the version extended property for the db1 database to 1.0.0<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance localhost -Database tempdb | Add-DbaExtendedProperty -Name SPVersion -Value 10.2
```

Creates an extended property for all stored procedures in the tempdb database named SPVersion with a value of 10.2<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance localhost -Database mydb -Table mytable | Add-DbaExtendedProperty -Name MyExtendedProperty -Value "This is a test"
```

Creates an extended property named MyExtendedProperty for the mytable table in the mydb, with a value of "This is a test"<br>

### Required Parameters

##### -Name

Sets the name identifier for the extended property being created. Must be unique per object.  
Common examples include "Version", "Owner", "Purpose", "DataClassification", or "LastModified" for documentation and compliance tracking.

| Property | Value |
| --- | --- |
| Alias | Property |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Value

Defines the content stored in the extended property as a string value. Can contain any text including version numbers, descriptions, dates, or JSON data.  
Keep values concise as they're stored in system catalogs and are visible in SQL Server Management Studio object properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

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

Specifies which databases to target when adding extended properties directly to database objects. Accepts wildcards for pattern matching.  
Use this when you want to add metadata to entire databases rather than piping specific objects from Get-Dba* commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Server objects from any Get-Dba* command that supports extended properties. Works with tables, views, procedures, functions, and many other object types.  
This is the primary method for bulk-applying extended properties across multiple objects in your database environment.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
