---
title: "New-DbaDbTransfer"
slug: "New-DbaDbTransfer"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Creates a configured SMO Transfer object for copying database objects between SQL Server instances"
tags:
  - "General"
  - "Transfer"
  - "Object"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbTransfer.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbTransfer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbTransfer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbTransfer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates a configured SMO Transfer object for copying database objects between SQL Server instances

## Description

Returns a configured SMO Transfer object that defines what database objects to copy and how to copy them between SQL Server instances.  
This function prepares the transfer configuration but does not execute the actual copy operation - you must call .TransferData() on the returned object or pipe it to Invoke-DbaDbTransfer to perform the transfer.  
Useful for database migrations, environment refreshes, or selective object deployment where you need to copy specific tables, views, stored procedures, users, or other database objects.  
Supports copying schema only, data only, or both, with configurable batch sizes and timeout values for large data transfers.

## Syntax

```powershell
New-DbaDbTransfer
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-DestinationSqlInstance] <DbaInstanceParameter>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-DestinationDatabase] <String>]
    [[-BatchSize] <Int32>]
    [[-BulkCopyTimeOut] <Int32>]
    [[-ScriptingOption] <ScriptingOptions>]
    [[-InputObject] <NamedSmoObject[]>]
    [-CopyAllObjects]
    [[-CopyAll] <String[]>]
    [-SchemaOnly]
    [-DataOnly]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaDbTransfer -SqlInstance sql1 -Destination sql2 -Database mydb -CopyAll Tables
```
{: data-copyable="true" data-clean-code="New-DbaDbTransfer -SqlInstance sql1 -Destination sql2 -Database mydb -CopyAll Tables" }

Creates a transfer object that, when invoked, would copy all tables from database sql1.mydb to sql2.mydb<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql1 -Database MyDb -Table a, b, c | New-DbaDbTransfer -SqlInstance sql1 -Destination sql2 -Database mydb
```
{: data-copyable="true" data-clean-code="Get-DbaDbTable -SqlInstance sql1 -Database MyDb -Table a, b, c | New-DbaDbTransfer -SqlInstance sql1 -Destination sql2 -Database mydb" }

Creates a transfer object to copy specific tables from database sql1.mydb to sql2.mydb<br>

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

Specifies the target SQL Server instance where database objects will be transferred. The function configures the SMO Transfer object to connect to this destination.  
You must have appropriate permissions to create the specified objects on the target server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance. Accepts PowerShell credential objects created with Get-Credential.  
Only SQL Server authentication is supported for the destination connection. When not specified, uses Windows Authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the source database containing the objects to transfer. This database must exist on the source SQL Server instance.  
Use this to define which database serves as the source for the transfer operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationDatabase

Specifies the target database where objects will be transferred. The database should already exist on the destination instance.  
When not specified, uses the same database name as the source database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $Database |

##### -BatchSize

Sets the number of rows to transfer in each batch during data copy operations. Controls memory usage and transaction log growth on the destination.  
Larger batch sizes improve performance but use more memory. Smaller batches reduce memory pressure but may slow transfer speed. Default is 50,000 rows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50000 |

##### -BulkCopyTimeOut

Sets the timeout in seconds for each bulk copy operation before it times out and fails. Prevents long-running transfers from hanging indefinitely.  
Increase this value when transferring large tables or working with slower network connections. Default is 5000 seconds.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5000 |

##### -ScriptingOption

Provides custom scripting options that control how database objects are scripted during the transfer. Must be created using New-DbaScriptingOption.  
Use this to control object scripting behavior such as including permissions, check constraints, triggers, or indexes in the transfer.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts specific database objects (tables, views, stored procedures, etc.) to transfer via pipeline input from other dbatools commands.  
Use this to transfer only selected objects instead of entire object types. Objects must be SMO objects from the source database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -CopyAllObjects

Includes all transferable database objects in the transfer operation, regardless of object type. This is the broadest transfer scope available.  
Use this for complete database migrations or when you need to transfer everything except system objects and data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CopyAll

Specifies which types of database objects to include in the transfer operation. You can specify multiple object types to transfer specific categories.  
Common values include Tables, Views, StoredProcedures, UserDefinedFunctions, Users, and Roles for typical database migrations. Use this for selective transfers instead of copying all objects.  
Allowed values: FullTextCatalogs, FullTextStopLists, SearchPropertyLists, Tables, Views, StoredProcedures, UserDefinedFunctions, UserDefinedDataTypes, UserDefinedTableTypes, PlanGuides, Rules,   
Defaults, Users, Roles, PartitionSchemes, PartitionFunctions, XmlSchemaCollections, SqlAssemblies, UserDefinedAggregates, UserDefinedTypes, Schemas, Synonyms, Sequences, DatabaseTriggers,   
DatabaseScopedCredentials, ExternalFileFormats, ExternalDataSources, Logins, ExternalLibraries

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | FullTextCatalogs,FullTextStopLists,SearchPropertyLists,Tables,Views,StoredProcedures,UserDefinedFunctions,UserDefinedDataTypes,UserDefinedTableTypes,PlanGuides,Rules,Defaults,Users,Roles,PartitionSchemes,PartitionFunctions,XmlSchemaCollections,SqlAssemblies,UserDefinedAggregates,UserDefinedTypes,Schemas,Synonyms,Sequences,DatabaseTriggers,DatabaseScopedCredentials,ExternalFileFormats,ExternalDataSources,Logins,ExternalLibraries |

##### -SchemaOnly

Transfers only the structure and definitions of database objects without copying any table data. Creates empty tables with all constraints, indexes, and triggers.  
Use this for setting up database structure in development environments or when data will be loaded separately.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DataOnly

Transfers only table data without creating or modifying database object structures. Assumes that tables and other objects already exist on the destination.  
Use this for data refresh scenarios where the database schema is already in place and you only need to update the data.

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


&nbsp;
