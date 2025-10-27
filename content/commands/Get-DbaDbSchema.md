---
title: "Get-DbaDbSchema"
slug: "Get-DbaDbSchema"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database schema objects from SQL Server instances for inventory, security auditing, and management tasks"
tags:
  - "Database"
  - "Schema"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSchema.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbSchema"
draft: false
---

# Get-DbaDbSchema

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbSchema](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSchema.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbSchema](https://dataplat.github.io/boh#Get-DbaDbSchema).

## Synopsis

Retrieves database schema objects from SQL Server instances for inventory, security auditing, and management tasks

## Description

Returns SQL Server Management Object (SMO) schema objects from one or more databases, allowing you to inspect schema ownership, enumerate database organization, and identify schema-level security configurations. This function is essential for database documentation, security auditing when you need to track who owns which schemas, and migration planning where schema ownership and structure must be preserved. You can filter results by specific schema names, schema owners, or databases, and optionally include system schemas like dbo, sys, and INFORMATION_SCHEMA which are excluded by default.

## Syntax

```powershell
Get-DbaDbSchema
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Schema] <String[]>]
    [[-SchemaOwner] <String[]>]
    [-IncludeSystemDatabases]
    [-IncludeSystemSchemas]
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
PS C:\> Get-DbaDbSchema -SqlInstance localhost
```

Gets all non-system database schemas from all user databases on the localhost instance. Note: the dbo schema is a system schema and won't be included in the output from this example. To include the <br>
dbo schema specify -IncludeSystemSchemas<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -Schema dbo -IncludeSystemSchemas
```

Returns the dbo schema from the databases on the localhost instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -IncludeSystemDatabases -IncludeSystemSchemas
```

Gets all database schemas from all databases on the localhost instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -Schema TestSchema
```

Finds and returns the TestSchema schema from the localhost instance.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -SchemaOwner DBUser1
```

Finds and returns the schemas owned by DBUser1 from the localhost instance.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -Database TestDB -SchemaOwner DBUser1
```

Finds and returns the schemas owned by DBUser1 in the TestDB database from the localhost instance.<br>

#####  Example:  7 

```powershell
PS C:\> $schema = Get-DbaDbSchema -SqlInstance localhost -Database TestDB -Schema TestSchema
PS C:\> $schema.Owner = DBUser2
PS C:\> $schema.Alter()
```

Finds the TestSchema in the TestDB on the localhost instance and then changes the schema owner to DBUser2<br>

#####  Example:  8 

```powershell
PS C:\> $schema = Get-DbaDbSchema -SqlInstance localhost -Database TestDB -Schema TestSchema
PS C:\> $schema.Drop()
```

Finds the TestSchema in the TestDB on the localhost instance and then drops it. Note: to drop a schema all objects must be transferred to another schema or dropped.<br>

#####  Example:  9 

```powershell
PS C:\> $db = Get-DbaDatabase -SqlInstance localhost -Database TestDB
PS C:\> $schema = $db | Get-DbaDbSchema -Schema TestSchema
```

Finds the TestSchema in the TestDB which is passed via pipeline into the Get-DbaDbSchema command.<br>

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

Specifies which databases to retrieve schemas from. Accepts wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters results to include only schemas with the specified names. Accepts multiple schema names.  
Use this when you need to check specific schemas like custom application schemas or verify particular schema configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SchemaOwner

Filters results to schemas owned by the specified database users or roles. Accepts multiple owner names.  
Use this for security audits to identify all schemas owned by specific users, or when troubleshooting schema ownership issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystemDatabases

Includes system databases (master, model, msdb, tempdb) in the schema retrieval.  
Use this when you need to audit or document schema configurations across all databases including system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemSchemas

Includes built-in system schemas like dbo, sys, guest, and INFORMATION_SCHEMA in the results.  
Use this when you need complete schema inventory including system schemas, or when specifically working with dbo schema objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from Get-DbaDatabase via pipeline input for processing.  
Use this to chain database operations or when you already have database objects and want to retrieve their schemas efficiently.

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
