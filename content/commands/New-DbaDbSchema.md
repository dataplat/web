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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbSchema</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSchema.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Adam Lancaster, github.com/lancasteradam</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="New-DbaDbSchema -SqlInstance localhost -Database example1 -Schema TestSchema1" }

Creates the TestSchema1 schema in the example1 database in the localhost instance. The dbo user will be the owner of the schema.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSchema -SqlInstance localhost -Database example1 -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```
{: data-copyable="true" data-clean-code="New-DbaDbSchema -SqlInstance localhost -Database example1 -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools" }

Creates the TestSchema1 and TestSchema2 schemas in the example1 database in the localhost instance and assigns the dbatools user as the owner of the schemas.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbSchema -SqlInstance localhost, localhost\sql2017 -Database example1 -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```
{: data-copyable="true" data-clean-code="New-DbaDbSchema -SqlInstance localhost, localhost\sql2017 -Database example1 -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools" }

Creates the TestSchema1 and TestSchema2 schemas in the example1 database in the localhost and localhost\sql2017 instances and assigns the dbatools user as the owner of the schemas.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost, localhost\sql2017 -Database example1 | New-DbaDbSchema -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance localhost, localhost\sql2017 -Database example1 | New-DbaDbSchema -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools" }

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
