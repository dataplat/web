---
title: "Invoke-DbaDbTransfer"
slug: "Invoke-DbaDbTransfer"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Transfers database objects and data between SQL Server instances or databases using SMO Transfer objects."
tags:
  - "General"
  - "Object"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbTransfer.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbTransfer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbTransfer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbTransfer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Transfers database objects and data between SQL Server instances or databases using SMO Transfer objects.

## Description

Transfers database objects and data between SQL Server instances or databases by executing an SMO Transfer object. This function handles database migrations, environment synchronization, and selective object deployment scenarios where you need to copy specific objects or data without doing a full database restore. You can transfer everything at once, copy only schema without data, copy only data without schema, or generate scripts for manual review. The function works with transfer objects created by New-DbaDbTransfer or generates them automatically based on the parameters you provide.

## Syntax

```powershell
Invoke-DbaDbTransfer
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-DestinationSqlInstance] <DbaInstanceParameter>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-DestinationDatabase] <String>]
    [[-BatchSize] <Int32>]
    [[-BulkCopyTimeOut] <Int32>]
    [[-ScriptingOption] <ScriptingOptions>]
    [[-InputObject] <Transfer>]
    [-CopyAllObjects]
    [[-CopyAll] <String[]>]
    [-SchemaOnly]
    [-DataOnly]
    [-ScriptOnly]
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
PS C:\> Invoke-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAll Tables -DestinationDatabase newdb
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAll Tables -DestinationDatabase newdb" }

Copies all tables from database mydb on sql1 to database newdb on sql2.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAllObjects
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAllObjects" }

Copies all objects from database mydb on sql1 to database mydb on sql2.<br>

#####  Example:  3 

```powershell
PS C:\> $transfer = New-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAllObjects
PS C:\> $transfer.Options.ScriptDrops = $true
PS C:\> $transfer.SchemaOnly = $true
PS C:\> $transfer | Invoke-DbaDbTransfer
```
{: data-copyable="true" data-clean-code="$transfer = New-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAllObjects
$transfer.Options.ScriptDrops = $true
$transfer.SchemaOnly = $true
$transfer | Invoke-DbaDbTransfer" }

Copies object schema from database mydb on sql1 to database mydb on sql2 using customized transfer parameters.<br>

#####  Example:  4 

```powershell
PS C:\> $options = New-DbaScriptingOption
PS C:\> $options.ScriptDrops = $true
PS C:\> $transfer = New-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAll StoredProcedures -ScriptingOption $options
PS C:\> $transfer | Invoke-DbaDbTransfer
```
{: data-copyable="true" data-clean-code="$options = New-DbaScriptingOption
$options.ScriptDrops = $true
$transfer = New-DbaDbTransfer -SqlInstance sql1 -DestinationSqlInstance sql2 -Database mydb -CopyAll StoredProcedures -ScriptingOption $options
$transfer | Invoke-DbaDbTransfer" }

Copies procedures from database mydb on sql1 to database mydb on sql2 using custom scripting parameters.<br>

### Optional Parameters

##### -SqlInstance

Source SQL Server instance name.

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

##### -DestinationSqlInstance

Target SQL Server instance where database objects will be transferred to. You must have appropriate permissions to create and modify objects on the destination server.  
Use this to specify a different server for migrations, environment promotions, or cross-server object synchronization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance. Accepts PowerShell credentials created with Get-Credential.  
Only SQL Server Authentication is supported for destination connections. When not specified, the function uses Windows Integrated Authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Source database name containing the objects to transfer. This database must exist on the source SQL Server instance.  
Specify the exact database name - wildcards are not supported for this parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationDatabase

Target database name where objects will be transferred to. If not specified, uses the same name as the source database.  
Use this when transferring objects to a database with a different name, such as during environment refreshes where databases have different naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $Database |

##### -BatchSize

Number of rows to transfer in each batch operation during data copy. Defaults to 50,000 rows per batch.  
Increase this value for faster transfers of large tables, or decrease it to reduce memory usage and lock duration on busy systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50000 |

##### -BulkCopyTimeOut

Timeout in seconds for bulk copy operations when transferring table data. Defaults to 5000 seconds.  
Increase this value when transferring very large tables that take longer than the default timeout to complete.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5000 |

##### -ScriptingOption

Custom scripting configuration created by New-DbaScriptingOption that controls how objects are scripted during transfer.  
Use this to customize object scripting behavior such as including permissions, indexes, triggers, or generating DROP statements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Pre-configured SMO Transfer object created by New-DbaDbTransfer that defines what to transfer and how.  
Use this when you need to customize transfer settings beyond what the direct parameters provide, or when reusing the same transfer configuration multiple times.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -CopyAllObjects

Transfers all database objects including tables, views, stored procedures, functions, users, roles, and other database-level objects.  
Use this for complete database migrations where you need to copy everything from the source database to the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyAll

Specific types of database objects to transfer. Accepts an array of object type names for selective copying.  
Use this when you only need certain object types instead of everything, such as copying only tables and views for a data warehouse refresh.  
Common values include Tables, Views, StoredProcedures, UserDefinedFunctions, Users, Roles, and Schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | FullTextCatalogs,FullTextStopLists,SearchPropertyLists,Tables,Views,StoredProcedures,UserDefinedFunctions,UserDefinedDataTypes,UserDefinedTableTypes,PlanGuides,Rules,Defaults,Users,Roles,PartitionSchemes,PartitionFunctions,XmlSchemaCollections,SqlAssemblies,UserDefinedAggregates,UserDefinedTypes,Schemas,Synonyms,Sequences,DatabaseTriggers,DatabaseScopedCredentials,ExternalFileFormats,ExternalDataSources,Logins,ExternalLibraries |

##### -SchemaOnly

Transfers only the structure and definitions of database objects without copying any table data.  
Use this for setting up new environments where you need the database structure but will populate data separately, or for schema synchronization between environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DataOnly

Transfers only table data without creating or modifying object schemas. Target objects must already exist in the destination database.  
Use this for data refreshes where the destination database structure is already in place and you only need to update the data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ScriptOnly

Generates T-SQL scripts for creating the selected objects without actually executing the transfer.  
Use this to review what would be created, save scripts for later execution, or integrate with deployment pipelines that require script artifacts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
