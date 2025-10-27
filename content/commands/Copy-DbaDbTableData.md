---
title: "Copy-DbaDbTableData"
slug: "Copy-DbaDbTableData"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Streams table data between SQL Server instances using high-performance bulk copy operations."
tags:
  - "Table"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbTableData.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDbTableData"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaDbTableData</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbTableData.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Simone Bizzotto (@niphlod)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Streams table data between SQL Server instances using high-performance bulk copy operations.

## Description

Copies data between SQL Server tables using SQL Bulk Copy for maximum performance and minimal memory usage.  
Unlike Invoke-DbaQuery and Write-DbaDbTableData which buffer entire table contents in memory, this function streams data directly from source to destination.  
This approach prevents memory exhaustion when copying large tables and provides the fastest data transfer method available.  
Supports copying between different servers, databases, and schemas while preserving data integrity options like identity values, constraints, and triggers.  
Can automatically create destination tables based on source table structure, making it ideal for data migration, ETL processes, and table replication tasks.

## Syntax

```powershell
Copy-DbaDbTableData
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-Destination] <DbaInstanceParameter[]>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-DestinationDatabase] <String>]
    [[-Table] <String[]>]
    [[-View] <String[]>]
    [[-Query] <String>]
    [-AutoCreateTable]
    [[-BatchSize] <Int32>]
    [[-NotifyAfter] <Int32>]
    [[-DestinationTable] <String>]
    [-NoTableLock]
    [-CheckConstraints]
    [-FireTriggers]
    [-KeepIdentity]
    [-KeepNulls]
    [-Truncate]
    [[-BulkCopyTimeout] <Int32>]
    [[-CommandTimeout] <Int32>]
    [-UseDefaultFileGroup]
    [[-InputObject] <TableViewBase[]>]
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
PS C:\> Copy-DbaDbTableData -SqlInstance sql1 -Destination sql2 -Database dbatools_from -Table dbo.test_table
```
{: data-copyable="true" data-clean-code="Copy-DbaDbTableData -SqlInstance sql1 -Destination sql2 -Database dbatools_from -Table dbo.test_table" }

Copies all the data from table dbo.test_table (2-part name) in database dbatools_from on sql1 to table test_table in database dbatools_from on sql2.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDbTableData -SqlInstance sql1 -Destination sql2 -Database dbatools_from -DestinationDatabase dbatools_dest -Table [Schema].[test table]
```
{: data-copyable="true" data-clean-code="Copy-DbaDbTableData -SqlInstance sql1 -Destination sql2 -Database dbatools_from -DestinationDatabase dbatools_dest -Table [Schema].[test table]" }

Copies all the data from table [Schema].[test table] (2-part name) in database dbatools_from on sql1 to table [Schema].[test table] in database dbatools_dest on sql2<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql1 -Database tempdb -Table tb1, tb2 | Copy-DbaDbTableData -DestinationTable tb3
```
{: data-copyable="true" data-clean-code="Get-DbaDbTable -SqlInstance sql1 -Database tempdb -Table tb1, tb2 | Copy-DbaDbTableData -DestinationTable tb3" }

Copies all data from tables tb1 and tb2 in tempdb on sql1 to tb3 in tempdb on sql1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql1 -Database tempdb -Table tb1, tb2 | Copy-DbaDbTableData -Destination sql2
```
{: data-copyable="true" data-clean-code="Get-DbaDbTable -SqlInstance sql1 -Database tempdb -Table tb1, tb2 | Copy-DbaDbTableData -Destination sql2" }

Copies data from tb1 and tb2 in tempdb on sql1 to the same table in tempdb on sql2<br>

#####  Example:  5 

```powershell
PS C:\> Copy-DbaDbTableData -SqlInstance sql1 -Destination sql2 -Database dbatools_from -Table test_table -KeepIdentity -Truncate
```
{: data-copyable="true" data-clean-code="Copy-DbaDbTableData -SqlInstance sql1 -Destination sql2 -Database dbatools_from -Table test_table -KeepIdentity -Truncate" }

Copies all the data in table test_table from sql1 to sql2, using the database dbatools_from, keeping identity columns and truncating the destination<br>

#####  Example:  6 

```powershell
PS C:\> $params = @{
>> SqlInstance = 'sql1'
>> Destination = 'sql2'
>> Database = 'dbatools_from'
>> DestinationDatabase = 'dbatools_dest'
>> Table = '[Schema].[Table]'
>> DestinationTable = '[dbo].[Table.Copy]'
>> KeepIdentity = $true
>> KeepNulls = $true
>> Truncate = $true
>> BatchSize = 10000
>> }
>>
PS C:\> Copy-DbaDbTableData @params
```
{: data-copyable="true" data-clean-code="$params = @{
SqlInstance = 'sql1'
Destination = 'sql2'
Database = 'dbatools_from'
DestinationDatabase = 'dbatools_dest'
Table = '[Schema].[Table]'
DestinationTable = '[dbo].[Table.Copy]'
KeepIdentity = $true
KeepNulls = $true
Truncate = $true
BatchSize = 10000
}
Copy-DbaDbTableData @params" }

Copies all the data from table [Schema].[Table] (2-part name) in database dbatools_from on sql1 to table [dbo].[Table.Copy] in database dbatools_dest on sql2<br>
Keeps identity columns and Nulls, truncates the destination and processes in BatchSize of 10000.<br>

#####  Example:  7 

```powershell
PS C:\> $params = @{
>> SqlInstance = 'server1'
>> Destination = 'server1'
>> Database = 'AdventureWorks2017'
>> DestinationDatabase = 'AdventureWorks2017'
>> DestinationTable = '[AdventureWorks2017].[Person].[EmailPromotion]'
>> BatchSize = 10000
>> Table = '[OtherDb].[Person].[Person]'
>> Query = "SELECT * FROM [OtherDb].[Person].[Person] where EmailPromotion = 1"
>> }
>>
PS C:\> Copy-DbaDbTableData @params
```
{: data-copyable="true" data-clean-code="$params = @{
SqlInstance = 'server1'
Destination = 'server1'
Database = 'AdventureWorks2017'
DestinationDatabase = 'AdventureWorks2017'
DestinationTable = '[AdventureWorks2017].[Person].[EmailPromotion]'
BatchSize = 10000
Table = '[OtherDb].[Person].[Person]'
Query = &quot;SELECT * FROM [OtherDb].[Person].[Person] where EmailPromotion = 1&quot;
}
Copy-DbaDbTableData @params" }

Copies data returned from the query on server1 into the AdventureWorks2017 on server1, using a 3-part name for the DestinationTable parameter. Copy is processed in BatchSize of 10000 rows.<br>
See the Query param documentation for more details.<br>

#####  Example:  8 

```powershell
PS C:\> Copy-DbaDbTableData -SqlInstance sql1 -Database tempdb -View [tempdb].[dbo].[vw1] -DestinationTable [SampleDb].[SampleSchema].[SampleTable] -AutoCreateTable
```
{: data-copyable="true" data-clean-code="Copy-DbaDbTableData -SqlInstance sql1 -Database tempdb -View [tempdb].[dbo].[vw1] -DestinationTable [SampleDb].[SampleSchema].[SampleTable] -AutoCreateTable" }

Copies all data from [tempdb].[dbo].[vw1] (3-part name) view on instance sql1 to an auto-created table [SampleDb].[SampleSchema].[SampleTable] on instance sql1<br>

### Optional Parameters

##### -SqlInstance

Source SQL Server.You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the source instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Destination

Target SQL Server instance where table data will be copied to. Accepts one or more SQL Server instances.  
Specify this when copying data to a different server than the source, or when doing cross-instance data transfers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Alternative credentials for authenticating to the destination instance. Required when your current Windows credentials don't have access to the target server.  
Use this for cross-domain scenarios, SQL authentication, or when the destination requires different security context than the source.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Source database containing the table or view to copy data from. Required when not using pipeline input.  
Must exist on the source instance and your account must have read permissions on the specified objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationDatabase

Target database where copied data will be inserted. Defaults to the same database name as the source.  
Use this when copying data to a different database name on the destination instance or for cross-database copies within the same server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Source table name to copy data from. Accepts 2-part ([schema].[table]) or 3-part ([database].[schema].[table]) names.  
Use square brackets for names with spaces or special characters. Cannot be used simultaneously with the View parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -View

Source view name to copy data from. Accepts 2-part ([schema].[view]) or 3-part ([database].[schema].[view]) names.  
Use square brackets for names with spaces or special characters. Cannot be used simultaneously with the Table parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Query

Custom SQL SELECT query to use as the data source instead of copying the entire table or view. Supports 3 or 4-part object names.  
Use this when you need to filter rows, join multiple tables, or transform data during the copy operation. Still requires specifying a Table or View parameter for metadata purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AutoCreateTable

Automatically creates the destination table if it doesn't exist, using the same structure as the source table.  
Essential for initial data migrations or when copying to new environments where destination tables haven't been created yet.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSize

Number of rows to process in each bulk copy batch. Defaults to 50000 rows.  
Reduce this value for memory-constrained systems or increase it for faster transfers when copying large tables with sufficient memory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50000 |

##### -NotifyAfter

Number of rows to process before displaying progress updates. Defaults to 5000 rows.  
Set to a lower value for frequent updates on small tables or higher for less verbose output on large table copies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5000 |

##### -DestinationTable

Target table name where data will be inserted. Defaults to the same name as the source table.  
Use this when copying to a table with a different name or schema, or when specifying 3-part names for cross-database operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoTableLock

Disables the default table lock (TABLOCK) on the destination table during bulk copy operations.  
Use this when you need to allow concurrent read access to the destination table, though it may reduce bulk copy performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CheckConstraints

Enables constraint checking during bulk copy operations. By default, constraints are ignored for performance.  
Use this when data integrity validation is more important than copy speed, particularly when copying from untrusted sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FireTriggers

Enables INSERT triggers to fire during bulk copy operations. By default, triggers are bypassed for performance.  
Use this when you need audit trails, logging, or other trigger-based business logic to execute during the data copy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepIdentity

Preserves the original identity column values from the source table. By default, the destination generates new identity values.  
Essential when copying reference tables or when you need to maintain exact ID relationships across systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepNulls

Preserves NULL values from the source data instead of replacing them with destination column defaults.  
Use this when you need exact source data reproduction, especially when NULL has specific business meaning versus default values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Truncate

Removes all existing data from the destination table before copying new data. Prompts for confirmation unless -Force is used.  
Essential for refresh scenarios where you want to replace all destination data with current source data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BulkCopyTimeout

Maximum time in seconds to wait for bulk copy operations to complete. Defaults to 5000 seconds (83 minutes).  
Increase this value when copying very large tables that may take longer than the default timeout period.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5000 |

##### -CommandTimeout

Maximum time in seconds to wait for the source query execution before timing out. Defaults to 0 (no timeout).  
Set this when querying large tables or complex views that may take longer to read than typical query timeouts allow.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -UseDefaultFileGroup

Creates new tables using the destination database's default filegroup instead of matching the source table's filegroup name.  
Use this when the destination database has different filegroup configurations or when you want all copied tables in the PRIMARY filegroup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts table or view objects from Get-DbaDbTable or Get-DbaDbView for pipeline operations.  
Use this to copy multiple tables efficiently by piping them from discovery commands.

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
