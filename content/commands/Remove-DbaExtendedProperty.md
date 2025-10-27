---
title: "Remove-DbaExtendedProperty"
slug: "Remove-DbaExtendedProperty"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes custom metadata and documentation stored as extended properties from SQL Server objects"
tags:
  - "extendedproperties"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaExtendedProperty.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaExtendedProperty"
draft: false
---

# Remove-DbaExtendedProperty

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaExtendedProperty](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaExtendedProperty.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaExtendedProperty](https://dataplat.github.io/boh#Remove-DbaExtendedProperty).

## Synopsis

Removes custom metadata and documentation stored as extended properties from SQL Server objects

## Description

Removes extended properties that contain custom metadata, documentation, and business descriptions from SQL Server objects. Extended properties are commonly used to store object documentation, version information, compliance tags, and business rules directly within the database schema.  
  
This function accepts piped input from Get-DbaExtendedProperty, making it easy to remove outdated documentation, clean up deprecated metadata, or bulk-remove properties during database restructuring projects. Works with all SQL Server object types including databases, tables, columns, stored procedures, and views.  
  
The command uses sp_dropextendedproperty internally and returns status information for each removed property, so you can verify successful cleanup operations or track what was removed for audit purposes.

## Syntax

```powershell
Remove-DbaExtendedProperty
    [-InputObject] <ExtendedProperty[]>
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
PS C:\> Get-DbaDatabase -SqlInstance localhost -Database mydb | Get-DbaExtendedProperty -Name appversion | Remove-DbaExtendedProperty
```

Removes the appversion extended property from the mydb database<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance localhost -Database mydb -Table mytable | Get-DbaExtendedProperty -Name appversion | Remove-DbaExtendedProperty -Confirm:$false
```

Removes the appversion extended property on the mytable table of the mydb database and does not prompt for confirmation<br>

### Required Parameters

##### -InputObject

Specifies the extended property objects to remove from SQL Server objects. Accepts ExtendedProperty objects from Get-DbaExtendedProperty.  
Use this to remove outdated documentation, compliance tags, or metadata stored as extended properties on databases, tables, columns, and other SQL Server objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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
