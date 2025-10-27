---
title: "Set-DbaExtendedProperty"
slug: "Set-DbaExtendedProperty"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Updates the value of existing extended properties on SQL Server database objects"
tags:
  - "General"
  - "ExtendedProperties"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaExtendedProperty.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaExtendedProperty"
draft: false
---

# Set-DbaExtendedProperty

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaExtendedProperty](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaExtendedProperty.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaExtendedProperty](https://dataplat.github.io/boh#Set-DbaExtendedProperty).

## Synopsis

Updates the value of existing extended properties on SQL Server database objects

## Description

Updates the value of existing extended properties on SQL Server database objects. Extended properties store custom metadata like application versions, documentation, or business rules directly with database objects. This function modifies the values of properties that already exist, making it useful for maintaining application version numbers, updating documentation, or batch-modifying metadata across multiple objects.  
  
Works with extended properties on all SQL Server object types including databases, tables, views, stored procedures, functions, columns, indexes, schemas, and many others. The function accepts extended property objects from Get-DbaExtendedProperty through the pipeline, so you can easily filter and update specific properties across your environment.

## Syntax

```powershell
Set-DbaExtendedProperty
    [-InputObject] <ExtendedProperty[]>
    [-Value] <String>
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
PS C:\> Get-DbaDatabase -SqlInstance localhost -Database mydb | Get-DbaExtendedProperty -Name appversion | Set-DbaExtendedProperty -Value "1.1.0"
```

Sets the value of appversion to 1.1.0 on the mydb database<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance localhost -Database mydb -Table mytable | Get-DbaExtendedProperty -Name appversion | Set-DbaExtendedProperty -Value "1.1.0"
```

Sets the value of appversion to 1.1.0 on the mytable table of the mydb database<br>

### Required Parameters

##### -InputObject

Accepts extended property objects from Get-DbaExtendedProperty to update their values. Use this to pipeline specific extended properties that you want to modify.  
Typically used after filtering extended properties by name, object type, or other criteria to batch update property values across multiple database objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Value

Specifies the new value to assign to the extended property. Accepts any string value including version numbers, descriptions, or configuration data.  
Common uses include updating application version numbers, modifying documentation text, or changing configuration values stored as extended properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

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
