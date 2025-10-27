---
title: "New-DbaDbTable"
slug: "New-DbaDbTable"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Creates database tables with columns and constraints using PowerShell hashtables or SMO objects"
tags:
  - "table"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbTable.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbTable"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbTable</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbTable.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates database tables with columns and constraints using PowerShell hashtables or SMO objects

## Description

Creates new tables in SQL Server databases with specified columns, data types, constraints, and properties. You can define table structure using simple PowerShell hashtables for columns or pass in pre-built SMO column objects for advanced scenarios. The function handles all common column properties including data types, nullability, default values, identity columns, and decimal precision/scale. It also supports advanced table features like memory optimization, temporal tables, file tables, and external tables. If the specified schema doesn't exist, it will be created automatically.

## Syntax

```powershell
New-DbaDbTable
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Name] <String>]
    [[-Schema] <String>]
    [[-ColumnMap] <Hashtable[]>]
    [[-ColumnObject] <Column[]>]
    [-AnsiNullsStatus]
    [-ChangeTrackingEnabled]
    [[-DataSourceName] <String>]
    [[-Durability] {SchemaOnly | SchemaAndData}]
    [[-ExternalTableDistribution] {Sharded | Replicated | RoundRobin | None}]
    [[-FileFormatName] <String>]
    [[-FileGroup] <String>]
    [[-FileStreamFileGroup] <String>]
    [[-FileStreamPartitionScheme] <String>]
    [[-FileTableDirectoryName] <String>]
    [[-FileTableNameColumnCollation] <String>]
    [-FileTableNamespaceEnabled]
    [[-HistoryTableName] <String>]
    [[-HistoryTableSchema] <String>]
    [-IsExternal]
    [-IsFileTable]
    [-IsMemoryOptimized]
    [-IsSystemVersioned]
    [[-Location] <String>]
    [[-LockEscalation] {Table | Disable | Auto}]
    [[-Owner] <String>]
    [[-PartitionScheme] <String>]
    [-QuotedIdentifierStatus]
    [[-RejectSampleValue] <Double>]
    [[-RejectType] {Value | Percentage | None}]
    [[-RejectValue] <Double>]
    [[-RemoteDataArchiveDataMigrationState] {Disabled | PausedOutbound | PausedInbound | Outbound | Inbound | Paused}]
    [-RemoteDataArchiveEnabled]
    [[-RemoteDataArchiveFilterPredicate] <String>]
    [[-RemoteObjectName] <String>]
    [[-RemoteSchemaName] <String>]
    [[-RemoteTableName] <String>]
    [-RemoteTableProvisioned]
    [[-ShardingColumnName] <String>]
    [[-TextFileGroup] <String>]
    [-TrackColumnsUpdatedEnabled]
    [[-HistoryRetentionPeriod] <Int32>]
    [[-HistoryRetentionPeriodUnit] {Day | Week | Month | Year | Undefined | Infinite}]
    [[-DwTableDistribution] {Undefined | None | Hash | Replicate | RoundRobin}]
    [[-RejectedRowLocation] <String>]
    [-OnlineHeapOperation]
    [[-LowPriorityMaxDuration] <Int32>]
    [-DataConsistencyCheck]
    [[-LowPriorityAbortAfterWait] {None | Blockers | Self}]
    [[-MaximumDegreeOfParallelism] <Int32>]
    [-IsNode]
    [-IsEdge]
    [-IsVarDecimalStorageFormatEnabled]
    [-Passthru]
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
PS C:\> $col = @{
>> Name      = 'test'
>> Type      = 'varchar'
>> MaxLength = 20
>> Nullable  = $true
>> }
PS C:\> New-DbaDbTable -SqlInstance sql2017 -Database tempdb -Name testtable -ColumnMap $col
```
{: data-copyable="true" data-clean-code="$col = @{
Name      = 'test'
Type      = 'varchar'
MaxLength = 20
Nullable  = $true
}
New-DbaDbTable -SqlInstance sql2017 -Database tempdb -Name testtable -ColumnMap $col" }

Creates a new table on sql2017 in tempdb with the name testtable and one column<br>

#####  Example:  2 

```powershell
PS C:\> $cols = @( )
>> $cols += @{
>>     Name              = 'Id'
>>     Type              = 'varchar'
>>     MaxLength         = 36
>>     DefaultExpression = 'NEWID()'
>> }
>> $cols += @{
>>     Name          = 'Since'
>>     Type          = 'datetime2'
>>     DefaultString = '2021-12-31'
>> }
PS C:\> New-DbaDbTable -SqlInstance sql2017 -Database tempdb -Name testtable -ColumnMap $cols
```
{: data-copyable="true" data-clean-code="$cols = @( )
$cols += @{
Name              = 'Id'
Type              = 'varchar'
MaxLength         = 36
DefaultExpression = 'NEWID()'
}
$cols += @{
Name          = 'Since'
Type          = 'datetime2'
DefaultString = '2021-12-31'
}
New-DbaDbTable -SqlInstance sql2017 -Database tempdb -Name testtable -ColumnMap $cols" }

Creates a new table on sql2017 in tempdb with the name testtable and two columns.<br>
Uses "DefaultExpression" to interpret the value "NEWID()" as an expression regardless of the data type of the column.<br>
Uses "DefaultString" to interpret the value "2021-12-31" as a string regardless of the data type of the column.<br>

#####  Example:  3 

```powershell
PS C:\> # Create collection
>> $cols = @()
>> # Add columns to collection
>> $cols += @{
>>     Name      = 'testId'
>>     Type      = 'int'
>>     Identity  = $true
>> }
>> $cols += @{
>>     Name      = 'test'
>>     Type      = 'varchar'
>>     MaxLength = 20
>>     Nullable  = $true
>> }
>> $cols += @{
>>     Name      = 'test2'
>>     Type      = 'int'
>>     Nullable  = $false
>> }
>> $cols += @{
>>     Name      = 'test3'
>>     Type      = 'decimal'
>>     MaxLength = 9
>>     Nullable  = $true
>> }
>> $cols += @{
>>     Name      = 'test4'
>>     Type      = 'decimal'
>>     Precision = 8
>>     Scale = 2
>>     Nullable  = $false
>> }
>> $cols += @{
>>     Name      = 'test5'
>>     Type      = 'Nvarchar'
>>     MaxLength = 50
>>     Nullable  =  $false
>>     Default  =  'Hello'
>>     DefaultName = 'DF_Name_test5'
>> }
>> $cols += @{
>>     Name      = 'test6'
>>     Type      = 'int'
>>     Nullable  =  $false
>>     Default  =  '0'
>> }
>> $cols += @{
>>     Name      = 'test7'
>>     Type      = 'smallint'
>>     Nullable  =  $false
>>     Default  =  100
>> }
>> $cols += @{
>>     Name      = 'test8'
>>     Type      = 'Nchar'
>>     MaxLength = 3
>>     Nullable  =  $false
>>     Default  =  'ABC'
>> }
>> $cols += @{
>>     Name      = 'test9'
>>     Type      = 'char'
>>     MaxLength = 4
>>     Nullable  =  $false
>>     Default  =  'XPTO'
>> }
>> $cols += @{
>>     Name      = 'test10'
>>     Type      = 'datetime'
>>     Nullable  =  $false
>>     Default  =  'GETDATE()'
>> }
PS C:\> New-DbaDbTable -SqlInstance sql2017 -Database tempdb -Name testtable -ColumnMap $cols
```
{: data-copyable="true" data-clean-code="# Create collection
$cols = @()
# Add columns to collection
$cols += @{
Name      = 'testId'
Type      = 'int'
Identity  = $true
}
$cols += @{
Name      = 'test'
Type      = 'varchar'
MaxLength = 20
Nullable  = $true
}
$cols += @{
Name      = 'test2'
Type      = 'int'
Nullable  = $false
}
$cols += @{
Name      = 'test3'
Type      = 'decimal'
MaxLength = 9
Nullable  = $true
}
$cols += @{
Name      = 'test4'
Type      = 'decimal'
Precision = 8
Scale = 2
Nullable  = $false
}
$cols += @{
Name      = 'test5'
Type      = 'Nvarchar'
MaxLength = 50
Nullable  =  $false
Default  =  'Hello'
DefaultName = 'DF_Name_test5'
}
$cols += @{
Name      = 'test6'
Type      = 'int'
Nullable  =  $false
Default  =  '0'
}
$cols += @{
Name      = 'test7'
Type      = 'smallint'
Nullable  =  $false
Default  =  100
}
$cols += @{
Name      = 'test8'
Type      = 'Nchar'
MaxLength = 3
Nullable  =  $false
Default  =  'ABC'
}
$cols += @{
Name      = 'test9'
Type      = 'char'
MaxLength = 4
Nullable  =  $false
Default  =  'XPTO'
}
$cols += @{
Name      = 'test10'
Type      = 'datetime'
Nullable  =  $false
Default  =  'GETDATE()'
}
New-DbaDbTable -SqlInstance sql2017 -Database tempdb -Name testtable -ColumnMap $cols" }

Creates a new table on sql2017 in tempdb with the name testtable and ten columns.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies the database where the new table will be created. Accepts multiple database names to create the same table across several databases.  
Use this when you need to deploy identical table structures to multiple databases in your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies the name for the new table. Must be a valid SQL Server identifier.  
Use standard naming conventions like avoiding spaces and reserved keywords for better maintainability.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the schema where the table will be created. Defaults to 'dbo' if not specified.  
Use this to organize tables by functional area or security requirements. The schema will be created automatically if it doesn't exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -ColumnMap

Defines table columns using PowerShell hashtables with properties like Name, Type, MaxLength, Nullable, Default, Identity, etc.  
This is the primary method for specifying column structure when you need simple, declarative table creation. See examples for supported hashtable properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ColumnObject

Accepts pre-built SMO Column objects for advanced scenarios requiring complex column configurations.  
Use this when you need features not supported by ColumnMap hashtables, such as computed columns or advanced constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AnsiNullsStatus

Controls ANSI_NULLS setting for the table, affecting how null comparisons are handled in queries.  
Enable this to ensure ANSI-compliant null handling behavior, which is recommended for modern applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ChangeTrackingEnabled

Enables SQL Server Change Tracking on the table to monitor data modifications.  
Use this when you need to track which rows have been inserted, updated, or deleted for synchronization scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DataSourceName

Specifies the external data source name for external tables in SQL Server 2016+ or Azure SQL.  
Required when creating external tables that reference data in Hadoop, Azure Blob Storage, or other external systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Durability

Sets the durability level for memory-optimized tables (SCHEMA_AND_DATA or SCHEMA_ONLY).  
Use SCHEMA_ONLY for temporary data that doesn't need to persist across server restarts, or SCHEMA_AND_DATA for permanent memory-optimized tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExternalTableDistribution

Specifies the distribution method for external tables in Azure SQL Data Warehouse or Parallel Data Warehouse.  
Choose between HASH, ROUND_ROBIN, or REPLICATE based on your query patterns and data size requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileFormatName

Specifies the external file format name for external tables that read from files.  
Required when creating external tables that reference structured files like CSV, Parquet, or ORC in external storage systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileGroup

Specifies the filegroup where the table data will be stored. Defaults to the database's default filegroup.  
Use this to control storage placement for performance optimization or to separate tables across different storage devices.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileStreamFileGroup

Specifies the FILESTREAM filegroup for tables that store large binary data as files.  
Required when creating tables with FILESTREAM columns for storing documents, images, or other large binary objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileStreamPartitionScheme

Specifies the partition scheme for FILESTREAM data in partitioned tables.  
Use this when you need to partition FILESTREAM data across multiple filegroups for performance or maintenance benefits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileTableDirectoryName

Sets the directory name for FileTable functionality, allowing Windows file system access to table data.  
Specify a meaningful name that will appear as a folder in the Windows file system when accessing the table through the file share.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileTableNameColumnCollation

Specifies the collation for the name column in FileTable to control file name sorting and comparison.  
Use a case-insensitive collation for Windows-compatible file name handling in FileTable scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileTableNamespaceEnabled

Enables the FileTable namespace, allowing file system access through Windows APIs.  
Set to true when you want applications to access table data through standard file operations like copy, move, and delete.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -HistoryTableName

Specifies the name of the history table for system-versioned temporal tables.  
Required when creating temporal tables that automatically track all data changes for point-in-time queries and auditing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -HistoryTableSchema

Specifies the schema for the history table in system-versioned temporal tables.  
Use this to organize history tables in a separate schema for better security and maintenance separation from current data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IsExternal

Creates an external table that references data stored outside SQL Server.  
Use this for querying data in Azure Blob Storage, Hadoop, or other external systems without importing the data into SQL Server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsFileTable

Creates a FileTable that combines relational data with Windows file system access.  
Enable this when you need applications to store and manage documents through both T-SQL and standard Windows file operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsMemoryOptimized

Creates an In-Memory OLTP table stored entirely in memory for high-performance scenarios.  
Use this for tables requiring extremely high transaction throughput with low latency, typically in OLTP workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsSystemVersioned

Creates a temporal table that automatically tracks all data changes with system-generated timestamps.  
Enable this for auditing requirements or when you need to query historical versions of data at any point in time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Location

Specifies the location path for external tables pointing to files or directories.  
Required for external tables to define where the actual data files are stored in the external system.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LockEscalation

Controls when SQL Server escalates row or page locks to table locks (TABLE, AUTO, or DISABLE).  
Set to DISABLE for high-concurrency scenarios where table-level locks would cause blocking, or AUTO for default behavior.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

Specifies the table owner, typically a database user or role with appropriate permissions.  
Use this to set explicit ownership for security or administrative purposes, though schema-contained objects are generally preferred.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PartitionScheme

Specifies the partition scheme for horizontally partitioning large tables across multiple filegroups.  
Use this for very large tables to improve query performance and enable parallel maintenance operations on partition boundaries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -QuotedIdentifierStatus

Controls QUOTED_IDENTIFIER setting for the table, affecting how double quotes are interpreted in queries.  
Enable this to use double quotes for identifiers containing spaces or reserved words, following ANSI SQL standards.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RejectSampleValue

Sets the sample size for reject value calculations in external tables with error handling.  
Specify the number of rows to sample when determining if reject thresholds have been exceeded during external data access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RejectType

Defines how reject values are calculated for external tables (VALUE or PERCENTAGE).  
Use VALUE for absolute row count limits or PERCENTAGE for proportional error thresholds when accessing external data sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RejectValue

Sets the maximum number or percentage of rejected rows allowed when querying external tables.  
Configure this to control query behavior when encountering data quality issues in external data sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RemoteDataArchiveDataMigrationState

Controls the data migration state for Stretch Database tables (INBOUND, OUTBOUND, or PAUSED).  
Use this to manage how historical data is migrated between on-premises SQL Server and Azure SQL Database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteDataArchiveEnabled

Enables Stretch Database functionality to automatically migrate cold data to Azure SQL Database.  
Use this for tables with historical data that can be moved to lower-cost cloud storage while remaining queryable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RemoteDataArchiveFilterPredicate

Defines the filter function determining which rows are eligible for Stretch Database migration.  
Specify a function that returns 1 for rows to migrate, typically based on date criteria for archiving old data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteObjectName

Specifies the name of the remote table or object for Stretch Database or external table scenarios.  
Use this when the remote table name differs from the local table name in federated or hybrid configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteSchemaName

Specifies the schema name in the remote database for Stretch Database tables.  
Define this when the remote Azure SQL Database uses a different schema structure than your local database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteTableName

Sets the table name in the remote Azure SQL Database for Stretch Database functionality.  
Specify this when you want the archived data to use a different table name in the cloud storage location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteTableProvisioned

Indicates whether the remote table for Stretch Database has already been created in Azure SQL Database.  
Set to true if the remote table structure already exists, preventing automatic provisioning during setup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ShardingColumnName

Specifies the column used for sharding data distribution in Azure SQL Database elastic pools.  
Define the column that determines how rows are distributed across multiple database shards for horizontal scaling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TextFileGroup

Specifies the filegroup for storing text, ntext, and image columns in SQL Server versions before 2016.  
Use this for legacy applications requiring separate storage for large text data, though newer data types are recommended.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TrackColumnsUpdatedEnabled

Enables column-level change tracking to identify which specific columns were modified.  
Use this when you need granular change information beyond just knowing that a row was updated, useful for selective synchronization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -HistoryRetentionPeriod

Sets the retention period for temporal table history data before automatic cleanup.  
Specify the number of time units (days, months, years) to retain historical data for compliance and storage management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -HistoryRetentionPeriodUnit

Defines the time unit for history retention period (DAYS, WEEKS, MONTHS, or YEARS).  
Use this with HistoryRetentionPeriod to control how long temporal table history is preserved before automatic deletion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DwTableDistribution

Specifies the distribution strategy for data warehouse tables (HASH, ROUND_ROBIN, or REPLICATE).  
Choose HASH for large fact tables, ROUND_ROBIN for staging tables, or REPLICATE for small dimension tables in analytical workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RejectedRowLocation

Specifies where to store rows that exceed reject thresholds when querying external tables.  
Define a location for storing problematic rows for later analysis and data quality troubleshooting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OnlineHeapOperation

Enables online operations for heap tables during index creation or rebuilding.  
Use this to minimize blocking and maintain table availability during maintenance operations on tables without clustered indexes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LowPriorityMaxDuration

Sets the maximum time in minutes for low-priority lock waits during online operations.  
Specify how long online operations should wait for locks before taking alternative action to balance performance and availability.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DataConsistencyCheck

Enables data consistency validation during online index operations.  
Use this to ensure data integrity is maintained during concurrent modifications to tables undergoing maintenance operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LowPriorityAbortAfterWait

Defines the action to take when low-priority operations exceed their maximum wait duration.  
Choose how to handle lock conflicts: continue waiting, abort the operation, or kill blocking transactions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaximumDegreeOfParallelism

Limits the number of processors used during table operations like index creation.  
Set this to control resource usage and prevent single operations from consuming all available CPU cores.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -IsNode

Creates a node table for SQL Server 2017+ Graph Database functionality.  
Enable this when building graph databases where the table will store entities and their properties for relationship modeling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsEdge

Creates an edge table for SQL Server 2017+ Graph Database functionality to store relationships.  
Enable this when building graph databases where the table will store connections between node tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsVarDecimalStorageFormatEnabled

Enables variable-length decimal storage format to reduce storage space for decimal and numeric columns.  
Use this for tables with many decimal columns containing leading zeros or small values to optimize storage efficiency.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Returns the T-SQL script for table creation instead of executing it immediately.  
Use this to review, modify, or save table creation scripts before deployment, or to generate scripts for version control.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for creating tables across multiple databases.  
Use this in pipeline scenarios where you want to apply table creation to a filtered set of databases.

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
