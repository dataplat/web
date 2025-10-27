---
title: "Set-DbaDbSchema"
slug: "Set-DbaDbSchema"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Changes the owner of database schemas to reassign security and object ownership responsibilities"
tags:
  - "Schema"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbSchema.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbSchema"
draft: false
---

# Set-DbaDbSchema

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbSchema](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbSchema.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbSchema](https://dataplat.github.io/boh#Set-DbaDbSchema).

## Synopsis

Changes the owner of database schemas to reassign security and object ownership responsibilities

## Description

Modifies the ownership of database schemas by updating the schema owner property in SQL Server. This is commonly needed when reorganizing database security, transferring ownership from developers to service accounts, or standardizing schema ownership after database migrations. The function works by retrieving the schema object and updating its Owner property through SQL Server Management Objects, then applying the change to the database.

## Syntax

```powershell
Set-DbaDbSchema
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-Schema] <String[]>
    [-SchemaOwner] <String>
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
PS C:\> Set-DbaDbSchema -SqlInstance sqldev01 -Database example1 -Schema TestSchema1 -SchemaOwner dbatools
```

Updates the TestSchema1 schema in the example1 database in the sqldev01 instance. The dbatools user will be the new owner of the schema.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01, sqldev02 -Database example1 | Set-DbaDbSchema -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```

Passes in the example1 db via pipeline and updates the TestSchema1 and TestSchema2 schemas and assigns the dbatools user as the owner of the schemas.<br>

### Required Parameters

##### -Schema

Specifies the name(s) of the database schemas whose ownership will be changed. Accepts multiple schema names.  
Common scenarios include transferring ownership from developers to service accounts or standardizing ownership after migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -SchemaOwner

Specifies the database user or role that will become the new owner of the specified schemas. Must be a valid database principal.  
Typically used to assign ownership to service accounts, application users, or standardized roles like db_owner.

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

Specifies which databases contain the schemas to be updated. Required when using SqlInstance parameter.  
Use this to target specific databases where you need to change schema ownership.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input. Use this to work with database objects already retrieved.  
Useful when you want to filter databases first or work with databases from multiple instances in a single operation.

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
