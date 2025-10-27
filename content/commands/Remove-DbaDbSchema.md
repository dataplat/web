---
title: "Remove-DbaDbSchema"
slug: "Remove-DbaDbSchema"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Removes database schemas from one or more SQL Server databases."
tags:
  - "Schema"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSchema.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbSchema"
draft: false
---

# Remove-DbaDbSchema

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbSchema](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSchema.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbSchema](https://dataplat.github.io/boh#Remove-DbaDbSchema).

## Synopsis

Removes database schemas from one or more SQL Server databases.

## Description

Removes database schemas from SQL Server databases using the DROP SCHEMA T-SQL command. This function is useful for cleaning up unused schemas during database maintenance, development environment resets, or application decommissioning. The schema must be completely empty before removal - any tables, views, functions, or other objects within the schema will prevent the drop operation from succeeding. You'll need to remove or relocate all schema objects first before running this command.

## Syntax

```powershell
Remove-DbaDbSchema
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-Schema] <String[]>
    [[-InputObject] <Database[]>]
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
PS C:\> Remove-DbaDbSchema -SqlInstance sqldev01 -Database example1 -Schema TestSchema1
```

Removes the TestSchema1 schema in the example1 database in the sqldev01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01, sqldev02 -Database example1 | Remove-DbaDbSchema -Schema TestSchema1, TestSchema2
```

Passes in the example1 db via pipeline and removes the TestSchema1 and TestSchema2 schemas.<br>

### Required Parameters

##### -Schema

Specifies the name(s) of the schema(s) to remove from the target databases. The schema must be completely empty before removal.  
Any tables, views, functions, stored procedures, or other objects within the schema must be dropped or moved first.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

Specifies the target database(s) where schemas will be removed. Required when using SqlInstance parameter.  
Use this to limit schema removal to specific databases rather than affecting all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input. Use this when you need to work with pre-filtered database collections.  
Eliminates the need to specify SqlInstance and Database parameters when database objects are already available.

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
