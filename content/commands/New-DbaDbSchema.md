---
title: "New-DbaDbSchema"
slug: "New-DbaDbSchema"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Creates new database schemas with specified ownership for organizing objects and implementing security boundaries."
tags:
  - "Schema"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSchema.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbSchema"
draft: false
---

# New-DbaDbSchema

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbSchema](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSchema.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbSchema](https://dataplat.github.io/boh#New-DbaDbSchema).

## Synopsis

Creates new database schemas with specified ownership for organizing objects and implementing security boundaries.

## Description

Creates new database schemas within SQL Server databases, allowing you to organize database objects into logical groups and implement security boundaries. Schemas provide a way to separate tables, views, procedures, and other objects by ownership or function, which is essential for multi-tenant applications, security models, and organized database development. You can create multiple schemas across multiple databases in a single operation and specify the database user who will own each schema.

## Syntax

```powershell
New-DbaDbSchema
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Schema] <String[]>]
    [[-SchemaOwner] <String>]
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
PS C:\> New-DbaDbSchema -SqlInstance localhost -Database example1 -Schema TestSchema1
```

Creates the TestSchema1 schema in the example1 database in the localhost instance. The dbo user will be the owner of the schema.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSchema -SqlInstance localhost -Database example1 -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```

Creates the TestSchema1 and TestSchema2 schemas in the example1 database in the localhost instance and assigns the dbatools user as the owner of the schemas.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbSchema -SqlInstance localhost, localhost\sql2017 -Database example1 -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```

Creates the TestSchema1 and TestSchema2 schemas in the example1 database in the localhost and localhost\sql2017 instances and assigns the dbatools user as the owner of the schemas.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost, localhost\sql2017 -Database example1 | New-DbaDbSchema -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```

Passes in the example1 db via pipeline and creates the TestSchema1 and TestSchema2 schemas and assigns the dbatools user as the owner of the schemas.<br>

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

Specifies the target database(s) where the new schemas will be created. Accepts multiple database names.  
Required when using SqlInstance parameter, and supports wildcards for pattern matching across database names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the name(s) of the schema(s) to create within the target databases. Accepts multiple schema names for batch creation.  
Schema names must be valid SQL Server identifiers and will fail if they already exist in the target database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SchemaOwner

Specifies the database user who will own the created schema(s). Must be an existing user in the target database.  
When omitted, the schema owner defaults to 'dbo'. Use this to implement security boundaries or assign schemas to application users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input, eliminating the need to specify SqlInstance and Database parameters.  
Use this approach when you need to work with a pre-filtered set of databases or want to chain multiple dbatools commands together.

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
