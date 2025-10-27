---
title: "Import-DbaCsv"
slug: "Import-DbaCsv"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Imports CSV files into SQL Server tables using high-performance bulk copy operations."
tags:
  - "Import"
  - "Data"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaCsv.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaCsv"
draft: false
---

# Import-DbaCsv

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Import-DbaCsv](https://github.com/dataplat/dbatools/blob/master/public/Import-DbaCsv.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Import-DbaCsv](https://dataplat.github.io/boh#Import-DbaCsv).

## Synopsis

Imports CSV files into SQL Server tables using high-performance bulk copy operations.

## Description

Import-DbaCsv uses .NET's SqlBulkCopy class to efficiently load CSV data into SQL Server tables, handling files of any size from small datasets to multi-gigabyte imports. The function wraps the entire operation in a transaction, so any failure or interruption rolls back all changes automatically.  
  
When the target table doesn't exist, you can use -AutoCreateTable to create it on the fly with basic nvarchar(max) columns. For production use, create your table first with proper data types and constraints. The function intelligently maps CSV columns to table columns by name, with fallback to ordinal position when needed.  
  
Supports various CSV formats including custom delimiters, quoted fields, gzip compression (.csv.gz files), and multi-line values within quoted fields. Column mapping lets you import specific columns or rename them during import, while schema detection can automatically place data in the correct schema based on filename patterns.  
  
Perfect for ETL processes, data migrations, or loading reference data where you need reliable, fast imports with proper error handling and transaction safety.

## Syntax

```powershell
Import-DbaCsv
    [[-Path] <Object[]>]
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Database] <String>
    [[-Table] <String>]
    [[-Schema] <String>]
    [-Truncate]
    [[-Delimiter] <Char>]
    [-SingleColumn]
    [[-BatchSize] <Int32>]
    [[-NotifyAfter] <Int32>]
    [-TableLock]
    [-CheckConstraints]
    [-FireTriggers]
    [-KeepIdentity]
    [-KeepNulls]
    [[-Column] <String[]>]
    [[-ColumnMap] <Hashtable>]
    [-KeepOrdinalOrder]
    [-AutoCreateTable]
    [-NoProgress]
    [-NoHeaderRow]
    [-UseFileNameForSchema]
    [[-Quote] <Char>]
    [[-Escape] <Char>]
    [[-Comment] <Char>]
    [[-TrimmingOption] <String>]
    [[-BufferSize] <Int32>]
    [[-ParseErrorAction] <String>]
    [[-Encoding] <String>]
    [[-NullValue] <String>]
    [[-MaxQuotedFieldLength] <Int32>]
    [-SkipEmptyLine]
    [-SupportsMultiline]
    [-UseColumnDefault]
    [-NoTransaction]
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
PS C:\> Import-DbaCsv -Path C:\temp\housing.csv -SqlInstance sql001 -Database markets
```

Imports the entire comma-delimited housing.csv to the SQL "markets" database on a SQL Server named sql001, using the first row as column names.<br>
Since a table name was not specified, the table name is automatically determined from filename as "housing".<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaCsv -Path .\housing.csv -SqlInstance sql001 -Database markets -Table housing -Delimiter "`t" -NoHeaderRow
```

Imports the entire tab-delimited housing.csv, including the first row which is not used for colum names, to the SQL markets database, into the housing table, on a SQL Server named sql001.<br>

#####  Example:  3 

```powershell
PS C:\> Import-DbaCsv -Path C:\temp\huge.txt -SqlInstance sqlcluster -Database locations -Table latitudes -Delimiter "|"
```

Imports the entire pipe-delimited huge.txt to the locations database, into the latitudes table on a SQL Server named sqlcluster.<br>

#####  Example:  4 

```powershell
PS C:\> Import-DbaCsv -Path c:\temp\SingleColumn.csv -SqlInstance sql001 -Database markets -Table TempTable -SingleColumn
```

Imports the single column CSV into TempTable<br>

#####  Example:  5 

```powershell
PS C:\> Get-ChildItem -Path \\FileServer\csvs | Import-DbaCsv -SqlInstance sql001, sql002 -Database tempdb -AutoCreateTable
```

Imports every CSV in the \\FileServer\csvs path into both sql001 and sql002's tempdb database. Each CSV will be imported into an automatically determined table name.<br>

#####  Example:  6 

```powershell
PS C:\> Get-ChildItem -Path \\FileServer\csvs | Import-DbaCsv -SqlInstance sql001, sql002 -Database tempdb -AutoCreateTable -WhatIf
```

Shows what would happen if the command were to be executed<br>

#####  Example:  7 

```powershell
PS C:\> Import-DbaCsv -Path c:\temp\dataset.csv -SqlInstance sql2016 -Database tempdb -Column Name, Address, Mobile
```

Import only Name, Address and Mobile even if other columns exist. All other columns are ignored and therefore null or default values.<br>

#####  Example:  8 

```powershell
PS C:\> Import-DbaCsv -Path C:\temp\schema.data.csv -SqlInstance sql2016 -database tempdb -UseFileNameForSchema
```

Will import the contents of C:\temp\schema.data.csv to table 'data' in schema 'schema'.<br>

#####  Example:  9 

```powershell
PS C:\> Import-DbaCsv -Path C:\temp\schema.data.csv -SqlInstance sql2016 -database tempdb -UseFileNameForSchema -Table testtable
```

Will import the contents of C:\temp\schema.data.csv to table 'testtable' in schema 'schema'.<br>

#####  Example:  10 

```powershell
PS C:\> $columns = @{
>> Text = 'FirstName'
>> Number = 'PhoneNumber'
>> }
PS C:\> Import-DbaCsv -Path c:\temp\supersmall.csv -SqlInstance sql2016 -Database tempdb -ColumnMap $columns
```

The CSV field 'Text' is inserted into SQL column 'FirstName' and CSV field Number is inserted into the SQL Column 'PhoneNumber'. All other columns are ignored and therefore null or default values.<br>

#####  Example:  11 

```powershell
PS C:\> $columns = @{
>> 0 = 'FirstName'
>> 1 = 'PhoneNumber'
>> }
PS C:\> Import-DbaCsv -Path c:\temp\supersmall.csv -SqlInstance sql2016 -Database tempdb -NoHeaderRow -ColumnMap $columns
```

If the CSV has no headers, passing a ColumnMap works when you have as the key the ordinal of the column (0-based).<br>
In this example the first CSV field is inserted into SQL column 'FirstName' and the second CSV field is inserted into the SQL Column 'PhoneNumber'.<br>

### Required Parameters

##### -SqlInstance

The SQL Server Instance to import data into.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the target database for the CSV import. The database must exist on the SQL Server instance.  
Use this to direct your data load to the appropriate database, whether it's a staging, ETL, or production database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Path

Specifies the file path to CSV files for import. Supports single files, multiple files, or pipeline input from Get-ChildItem.  
Accepts .csv files and compressed .csv.gz files for large datasets with automatic decompression.

| Property | Value |
| --- | --- |
| Alias | Csv,FullPath |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Table

Specifies the destination table name. If omitted, uses the CSV filename as the table name.  
The table will be created automatically with -AutoCreateTable using nvarchar(max) columns, but for production use, create the table first with proper data types and constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the target schema for the table. Defaults to 'dbo' if not specified.  
If the schema doesn't exist, it will be created automatically when using -AutoCreateTable. This parameter takes precedence over -UseFileNameForSchema.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Truncate

Removes all existing data from the destination table before importing. The truncate operation is part of the transaction.  
Use this for full data refreshes where you want to replace all existing data with the CSV contents.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Delimiter

Sets the field separator character used in the CSV file. Defaults to comma if not specified.  
Common values include comma (,), tab (`t), pipe (|), semicolon (;), or space for different export formats from various systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | , |

##### -SingleColumn

Indicates the CSV contains only one column of data without delimiters. Use this for simple lists or single-value imports.  
Prevents the function from failing when no delimiter is found in the file content.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSize

Controls how many rows are sent to SQL Server in each batch during the bulk copy operation. Defaults to 50,000.  
Larger batches are generally more efficient but use more memory, while smaller batches provide better granular control and error isolation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50000 |

##### -NotifyAfter

Sets how often progress notifications are displayed during the import, measured in rows. Defaults to 50,000.  
Lower values provide more frequent updates but may slow the import slightly, while higher values reduce overhead for very large files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50000 |

##### -TableLock

Acquires an exclusive table lock for the duration of the import instead of using row-level locks.  
Improves performance for large imports by reducing lock overhead, but blocks other operations on the table during the import.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CheckConstraints

Enforces check constraints, foreign keys, and other table constraints during the import. By default, constraints are not checked for performance.  
Enable this when data integrity validation is critical, but expect slower import performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -FireTriggers

Executes INSERT triggers on the destination table during the bulk copy operation. By default, triggers are not fired for performance.  
Use this when your triggers perform essential business logic like auditing, logging, or cascading updates that must run during import.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepIdentity

Preserves identity column values from the CSV instead of generating new ones. By default, the destination assigns new identity values.  
Use this when migrating data and you need to maintain existing primary key values or referential integrity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepNulls

Preserves NULL values from the CSV instead of replacing them with column default values.  
Use this when your data intentionally contains NULLs that should be maintained, rather than having them replaced by table defaults.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Column

Imports only the specified columns from the CSV file, ignoring all others. Column names must match exactly.  
Use this to selectively load data when you only need certain fields, reducing import time and storage requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ColumnMap

Maps CSV columns to different table column names using a hashtable. Keys are CSV column names, values are table column names.  
Use this when your CSV headers don't match your table structure or when importing from systems with different naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -KeepOrdinalOrder

Maps columns by position rather than by name matching. The first CSV column goes to the first table column, second to second, etc.  
Use this when column names don't match but the order is correct, or when dealing with files that have inconsistent header naming.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AutoCreateTable

Creates the destination table automatically if it doesn't exist, using nvarchar(max) for all columns.  
Convenient for quick imports or testing, but for production use, create tables manually with appropriate data types, indexes, and constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoProgress

Disables the progress bar display during import to improve performance, especially for very large files.  
Use this in automated scripts or when maximum import speed is more important than visual progress feedback.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoHeaderRow

Treats the first row as data instead of column headers. Use this when your CSV file starts directly with data rows.  
When enabled, columns are mapped by ordinal position and you'll need to ensure your target table column order matches the CSV.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UseFileNameForSchema

Extracts the schema name from the filename using the first period as a delimiter. For example, 'sales.customers.csv' imports to the 'sales' schema.  
If no period is found, defaults to 'dbo'. The schema will be created if it doesn't exist. This parameter is ignored if -Schema is explicitly specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Quote

Specifies the character used to quote fields containing delimiters or special characters. Defaults to double-quote (").  
Change this when your CSV uses different quoting conventions, such as single quotes from certain export tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | " |

##### -Escape

Specifies the character used to escape quote characters within quoted fields. Defaults to double-quote (").  
Modify this when dealing with CSV files that use different escaping conventions, such as backslash escaping.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | " |

##### -Comment

Specifies the character that marks comment lines to be ignored during import. Defaults to hashtag (#).  
Use this when your CSV files contain comment lines with metadata or instructions that should be skipped.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | # |

##### -TrimmingOption

Controls automatic whitespace removal from field values. Options are All, None, UnquotedOnly, or QuotedOnly.  
Use 'All' to clean up data with inconsistent spacing, or 'None' to preserve exact formatting when whitespace is significant.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |
| Accepted Values | All,None,UnquotedOnly,QuotedOnly |

##### -BufferSize

Sets the internal buffer size in bytes for reading the CSV file. Defaults to 4096 bytes.  
Increase this value for better performance with very large files, but it will use more memory during the import process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 4096 |

##### -ParseErrorAction

Determines how to handle malformed rows during import. 'ThrowException' stops the import, 'AdvanceToNextLine' skips bad rows.  
Use 'AdvanceToNextLine' for importing data with known quality issues where you want to load as much valid data as possible.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | ThrowException |
| Accepted Values | AdvanceToNextLine,ThrowException |

##### -Encoding

Specifies the text encoding of the CSV file. Defaults to UTF-8.  
Change this when dealing with files from legacy systems that use different encodings like ASCII or when dealing with international character sets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -NullValue

Specifies which text value in the CSV should be treated as SQL NULL. Common values include 'NULL', 'null', or empty strings.  
Use this when your source system exports NULL values as specific text strings that need to be converted to database NULLs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxQuotedFieldLength

Sets the maximum allowed length in bytes for quoted fields to prevent memory issues with malformed data.  
Increase this when working with legitimate large text fields, or decrease it to catch data quality issues early.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SkipEmptyLine

Ignores completely empty lines in the CSV file during import.  
Use this when your source files contain blank lines for formatting that should not create empty rows in your table.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SupportsMultiline

Allows field values to span multiple lines when properly quoted, such as addresses or comments with embedded line breaks.  
Enable this when your CSV contains multi-line text data that should be preserved as single field values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UseColumnDefault

Applies table column default values when CSV fields are missing or empty.  
Use this when your CSV doesn't include all table columns and you want defaults applied rather than NULLs or import failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoTransaction

Disables the automatic transaction wrapper, allowing partial imports to remain committed even if the operation fails.  
Use this for very large imports where you want to commit data in batches, but be aware that failed imports may leave partial data.

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
