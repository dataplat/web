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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbSchema</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbSchema.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Get-DbaDbSchema -SqlInstance localhost" }

Gets all non-system database schemas from all user databases on the localhost instance. Note: the dbo schema is a system schema and won't be included in the output from this example. To include the <br>
dbo schema specify -IncludeSystemSchemas<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -Schema dbo -IncludeSystemSchemas
```
{: data-copyable="true" data-clean-code="Get-DbaDbSchema -SqlInstance localhost -Schema dbo -IncludeSystemSchemas" }

Returns the dbo schema from the databases on the localhost instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -IncludeSystemDatabases -IncludeSystemSchemas
```
{: data-copyable="true" data-clean-code="Get-DbaDbSchema -SqlInstance localhost -IncludeSystemDatabases -IncludeSystemSchemas" }

Gets all database schemas from all databases on the localhost instance.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -Schema TestSchema
```
{: data-copyable="true" data-clean-code="Get-DbaDbSchema -SqlInstance localhost -Schema TestSchema" }

Finds and returns the TestSchema schema from the localhost instance.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -SchemaOwner DBUser1
```
{: data-copyable="true" data-clean-code="Get-DbaDbSchema -SqlInstance localhost -SchemaOwner DBUser1" }

Finds and returns the schemas owned by DBUser1 from the localhost instance.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbSchema -SqlInstance localhost -Database TestDB -SchemaOwner DBUser1
```
{: data-copyable="true" data-clean-code="Get-DbaDbSchema -SqlInstance localhost -Database TestDB -SchemaOwner DBUser1" }

Finds and returns the schemas owned by DBUser1 in the TestDB database from the localhost instance.<br>

#####  Example:  7 

```powershell
PS C:\> $schema = Get-DbaDbSchema -SqlInstance localhost -Database TestDB -Schema TestSchema
PS C:\> $schema.Owner = DBUser2
PS C:\> $schema.Alter()
```
{: data-copyable="true" data-clean-code="$schema = Get-DbaDbSchema -SqlInstance localhost -Database TestDB -Schema TestSchema
$schema.Owner = DBUser2
$schema.Alter()" }

Finds the TestSchema in the TestDB on the localhost instance and then changes the schema owner to DBUser2<br>

#####  Example:  8 

```powershell
PS C:\> $schema = Get-DbaDbSchema -SqlInstance localhost -Database TestDB -Schema TestSchema
PS C:\> $schema.Drop()
```
{: data-copyable="true" data-clean-code="$schema = Get-DbaDbSchema -SqlInstance localhost -Database TestDB -Schema TestSchema
$schema.Drop()" }

Finds the TestSchema in the TestDB on the localhost instance and then drops it. Note: to drop a schema all objects must be transferred to another schema or dropped.<br>

#####  Example:  9 

```powershell
PS C:\> $db = Get-DbaDatabase -SqlInstance localhost -Database TestDB
PS C:\> $schema = $db | Get-DbaDbSchema -Schema TestSchema
```
{: data-copyable="true" data-clean-code="$db = Get-DbaDatabase -SqlInstance localhost -Database TestDB
$schema = $db | Get-DbaDbSchema -Schema TestSchema" }

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
