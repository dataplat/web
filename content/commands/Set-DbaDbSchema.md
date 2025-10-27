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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaDbSchema</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbSchema.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Set-DbaDbSchema -SqlInstance sqldev01 -Database example1 -Schema TestSchema1 -SchemaOwner dbatools" }

Updates the TestSchema1 schema in the example1 database in the sqldev01 instance. The dbatools user will be the new owner of the schema.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sqldev01, sqldev02 -Database example1 | Set-DbaDbSchema -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sqldev01, sqldev02 -Database example1 | Set-DbaDbSchema -Schema TestSchema1, TestSchema2 -SchemaOwner dbatools" }

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
