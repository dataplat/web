---
title: "Write-DbaDbTableData"
slug: "Write-DbaDbTableData"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Performs high-speed bulk inserts of data into SQL Server tables using SqlBulkCopy."
tags:
  - "Table"
  - "Data"
  - "Insert"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Write-DbaDbTableData.ps1"
bohUrl: "https://dataplat.github.io/boh#Write-DbaDbTableData"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Write-DbaDbTableData</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Write-DbaDbTableData.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Performs high-speed bulk inserts of data into SQL Server tables using SqlBulkCopy.

## Description

Imports data from various sources (CSV files, DataTables, DataSets, PowerShell objects) into SQL Server tables using SqlBulkCopy for optimal performance. This command handles the heavy lifting of data type conversion from PowerShell to SQL Server, automatically creates missing tables when needed, and provides fine-grained control over bulk copy operations. Commonly used for data migration, ETL processes, and importing large datasets where INSERT statements would be too slow.

## Syntax

```powershell
Write-DbaDbTableData -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    [-Database <Object>]
    -InputObject <Object>
    [-Table] <String>
    [[-Schema] <String>]
    [-BatchSize <Int32>]
    [-NotifyAfter <Int32>]
    [-AutoCreateTable]
    [-NoTableLock]
    [-CheckConstraints]
    [-FireTriggers]
    [-KeepIdentity]
    [-KeepNulls]
    [-Truncate]
    [-BulkCopyTimeOut <Int32>]
    [-ColumnMap <Hashtable>]
    [-EnableException]
    [-UseDynamicStringLength]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $DataTable = Import-Csv C:\temp\customers.csv
PS C:\> Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Table mydb.dbo.customers
```
{: data-copyable="true" data-clean-code="$DataTable = Import-Csv C:\temp\customers.csv
Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Table mydb.dbo.customers" }

Performs a bulk insert of all the data in customers.csv into database mydb, schema dbo, table customers. A progress bar will be shown as rows are inserted. If the destination table does not exist, <br>
the import will be halted.<br>

#####  Example:  2 

```powershell
PS C:\> $tableName = "MyTestData"
PS C:\> $query = "SELECT name, create_date, owner_sid FROM sys.databases"
PS C:\> $dataset = Invoke-DbaQuery -SqlInstance 'localhost,1417' -SqlCredential $containerCred -Database master -Query $query -As DataSet
PS C:\> $dataset | Write-DbaDbTableData -SqlInstance 'localhost,1417' -SqlCredential $containerCred -Database tempdb -Table $tableName -AutoCreateTable
```
{: data-copyable="true" data-clean-code="$tableName = &quot;MyTestData&quot;
$query = &quot;SELECT name, create_date, owner_sid FROM sys.databases&quot;
$dataset = Invoke-DbaQuery -SqlInstance 'localhost,1417' -SqlCredential $containerCred -Database master -Query $query -As DataSet
$dataset | Write-DbaDbTableData -SqlInstance 'localhost,1417' -SqlCredential $containerCred -Database tempdb -Table $tableName -AutoCreateTable" }

Pulls data from a SQL Server instance and then performs a bulk insert of the dataset to a new, auto-generated table tempdb.dbo.MyTestData.<br>

#####  Example:  3 

```powershell
PS C:\> $DataTable = Import-Csv C:\temp\customers.csv
PS C:\> Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Table mydb.dbo.customers -AutoCreateTable -Confirm
```
{: data-copyable="true" data-clean-code="$DataTable = Import-Csv C:\temp\customers.csv
Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Table mydb.dbo.customers -AutoCreateTable -Confirm" }

Performs a bulk insert of all the data in customers.csv. If mydb.dbo.customers does not exist, it will be created with inefficient but forgiving DataTypes.<br>
Prompts for confirmation before a variety of steps.<br>

#####  Example:  4 

```powershell
PS C:\> $DataTable = Import-Csv C:\temp\customers.csv
PS C:\> Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Table mydb.dbo.customers -Truncate
```
{: data-copyable="true" data-clean-code="$DataTable = Import-Csv C:\temp\customers.csv
Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Table mydb.dbo.customers -Truncate" }

Performs a bulk insert of all the data in customers.csv. Prior to importing into mydb.dbo.customers, the user is informed that the table will be truncated and asks for confirmation. The user is <br>
prompted again to perform the import.<br>

#####  Example:  5 

```powershell
PS C:\> $DataTable = Import-Csv C:\temp\customers.csv
PS C:\> Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Database mydb -Table customers -KeepNulls
```
{: data-copyable="true" data-clean-code="$DataTable = Import-Csv C:\temp\customers.csv
Write-DbaDbTableData -SqlInstance sql2014 -InputObject $DataTable -Database mydb -Table customers -KeepNulls" }

Performs a bulk insert of all the data in customers.csv into mydb.dbo.customers. Because Schema was not specified, dbo was used. NULL values in the destination table will be preserved.<br>

#####  Example:  6 

```powershell
PS C:\> $passwd = (Get-Credential NoUsernameNeeded).Password
PS C:\> $AzureCredential = New-Object System.Management.Automation.PSCredential("AzureAccount"),$passwd)
PS C:\> $DataTable = Import-Csv C:\temp\customers.csv
PS C:\> Write-DbaDbTableData -SqlInstance AzureDB.database.windows.net -InputObject $DataTable -Database mydb -Table customers -KeepNulls -SqlCredential $AzureCredential -BulkCopyTimeOut 300
```
{: data-copyable="true" data-clean-code="$passwd = (Get-Credential NoUsernameNeeded).Password
$AzureCredential = New-Object System.Management.Automation.PSCredential(&quot;AzureAccount&quot;),$passwd)
$DataTable = Import-Csv C:\temp\customers.csv
Write-DbaDbTableData -SqlInstance AzureDB.database.windows.net -InputObject $DataTable -Database mydb -Table customers -KeepNulls -SqlCredential $AzureCredential -BulkCopyTimeOut 300" }

This performs the same operation as the previous example, but against a SQL Azure Database instance using the required credentials.<br>

#####  Example:  7 

```powershell
PS C:\> $process = Get-Process
PS C:\> Write-DbaDbTableData -InputObject $process -SqlInstance sql2014 -Table "[[DbName]]].[Schema.With.Dots].[`"[Process]]`"]" -AutoCreateTable
```
{: data-copyable="true" data-clean-code="$process = Get-Process
Write-DbaDbTableData -InputObject $process -SqlInstance sql2014 -Table &quot;[[DbName]]].[Schema.With.Dots].[`&quot;[Process]]`&quot;]&quot; -AutoCreateTable" }

Creates a table based on the Process object with over 60 columns, converted from PowerShell data types to SQL Server data types. After the table is created a bulk insert is performed to add process <br>
information into the table<br>
Writes the results of Get-Process to a table named: "[Process]" in schema named: Schema.With.Dots in database named: [DbName]<br>
The Table name, Schema name and Database name must be wrapped in square brackets [ ]<br>
Special characters like " must be escaped by a ` character.<br>
In addition any actual instance of the ] character must be escaped by being duplicated.<br>
This is an example of the type conversion in action. All process properties are converted, including special types like TimeSpan. Script properties are resolved before the type conversion starts <br>
thanks to ConvertTo-DbaDataTable.<br>

#####  Example:  8 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance SRV1
PS C:\> $server.Invoke("CREATE TABLE tempdb.dbo.test (col1 INT, col2 VARCHAR(100))")
PS C:\> $data = Invoke-DbaQuery -SqlInstance $server -Query "SELECT 123 AS value1, 'Hello world' AS value2" -As DataSet
PS C:\> $data | Write-DbaDbTableData -SqlInstance $server -Table 'tempdb.dbo.test' -ColumnMap @{ value1 = 'col1' ; value2 = 'col2' }
```
{: data-copyable="true" data-clean-code="$server = Connect-DbaInstance -SqlInstance SRV1
$server.Invoke(&quot;CREATE TABLE tempdb.dbo.test (col1 INT, col2 VARCHAR(100))&quot;)
$data = Invoke-DbaQuery -SqlInstance $server -Query &quot;SELECT 123 AS value1, 'Hello world' AS value2&quot; -As DataSet
$data | Write-DbaDbTableData -SqlInstance $server -Table 'tempdb.dbo.test' -ColumnMap @{ value1 = 'col1' ; value2 = 'col2' }" }

The dataset column 'value1' is inserted into SQL column 'col1' and dataset column value2 is inserted into the SQL Column 'col2'. All other columns are ignored and therefore null or default values.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts various data formats including DataTable, DataSet, CSV files, or PowerShell objects for bulk insertion.  
Use DataSet for optimal performance as all records import in a single SqlBulkCopy call. DataTable also performs well but avoid piping directly as it converts to slower DataRow processing.  
PowerShell objects are automatically converted to DataTable format before import.

| Property | Value |
| --- | --- |
| Alias | DataTable |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Table

Specifies the destination table using one, two, or three-part naming (database.schema.table). Supports temp tables with # prefix.  
Use square brackets for special characters: [Schema.Name].[Table]] for tables containing brackets. Three-part names override the Database parameter.  
Combine with -AutoCreateTable to create missing tables, though manual table creation provides better data type control.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

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

Specifies the target database for the bulk insert operation. Required when using one or two-part table names.  
Use this when you need to target a specific database different from the default connection database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Sets the schema for the destination table when not specified in the table name. Defaults to 'dbo'.  
Use this when working with non-default schemas or when security policies require specific schema targeting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -BatchSize

Controls how many rows are sent to SQL Server in each batch operation. Defaults to 50,000 rows.  
Lower values (5,000-10,000) work better for wide tables or limited memory, while higher values improve performance for narrow tables with sufficient resources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50000 |

##### -NotifyAfter

Determines how frequently progress notifications appear during the import operation. Defaults to every 5,000 rows.  
Set higher for less frequent updates on large imports, or lower for more granular progress tracking on smaller datasets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5000 |

##### -AutoCreateTable

Automatically creates the destination table when it doesn't exist, using data types inferred from the source data.  
Convenient for quick imports but creates generic data types like NVARCHAR(MAX). For production use, manually create tables with appropriate data types and constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoTableLock

Disables the default TABLOCK hint during bulk insert operations, allowing concurrent access to the destination table.  
Use when importing to tables that need concurrent read access, though this may reduce import performance compared to the default exclusive lock.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CheckConstraints

Enforces check constraints during the bulk insert operation instead of the default behavior of bypassing them.  
Use when data integrity validation is critical, though this reduces import performance. Constraints are normally checked after bulk operations complete.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FireTriggers

Executes INSERT triggers during the bulk copy operation instead of bypassing them for performance.  
Essential when triggers maintain audit trails, calculated fields, or related table updates. Significantly impacts import speed but preserves all database logic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepIdentity

Preserves identity column values from the source data instead of generating new sequential values.  
Critical for maintaining referential integrity when importing related tables or restoring data with existing identity dependencies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepNulls

Maintains NULL values from source data instead of replacing them with column default values.  
Use when NULL has specific business meaning in your data or when you need to preserve exact source data representation including missing values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Truncate

Removes all existing data from the destination table before performing the bulk insert operation.  
Useful for refreshing tables with new data while maintaining table structure, indexes, and permissions. Always prompts for confirmation before execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BulkCopyTimeOut

Sets the maximum time in seconds to wait for the bulk copy operation to complete. Defaults to 5,000 seconds.  
Increase for very large datasets or slow storage systems. Set to 0 for unlimited timeout when importing millions of rows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 5000 |

##### -ColumnMap

Defines custom mapping between source and destination columns using a hashtable when automatic column mapping fails.  
Use when column names differ between source and target, or when you need to import only specific columns. Format: @{SourceColumn='DestColumn'}.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -UseDynamicStringLength

Creates string columns with lengths based on source data MaxLength property instead of defaulting to NVARCHAR(MAX).  
Improves storage efficiency and query performance when AutoCreateTable is used, but requires source data to provide accurate length information.

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
