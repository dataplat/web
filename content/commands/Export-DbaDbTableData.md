---
title: "Export-DbaDbTableData"
slug: "Export-DbaDbTableData"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates INSERT statements from table data for migration and deployment scripts"
tags:
  - "Migration"
  - "Backup"
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDbTableData.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaDbTableData"
draft: false
---

# Export-DbaDbTableData

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaDbTableData](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDbTableData.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaDbTableData](https://dataplat.github.io/boh#Export-DbaDbTableData).

## Synopsis

Generates INSERT statements from table data for migration and deployment scripts

## Description

Creates executable INSERT statements from existing table data, making it easy to move data between SQL Server instances or environments. This is particularly useful for migrating reference tables, lookup data, or configuration tables where you need the actual data values rather than just the table structure. The generated scripts include proper USE database context and can be saved to files or piped to other commands for further processing.

## Syntax

```powershell
Export-DbaDbTableData
    [-InputObject] <Table[]>
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Encoding] <String>]
    [[-BatchSeparator] <String>]
    [-NoPrefix]
    [-Passthru]
    [-NoClobber]
    [-Append]
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
PS C:\> Get-DbaDbTable -SqlInstance sql2017 -Database AdventureWorks2014 -Table EmployeePayHistory | Export-DbaDbTableData
```

Exports data from EmployeePayHistory in AdventureWorks2014 in sql2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql2017 -Database AdventureWorks2014 -Table EmployeePayHistory | Export-DbaDbTableData -FilePath C:\temp\export.sql -Append
```

Exports data from EmployeePayHistory in AdventureWorks2014 in sql2017 using a trusted connection - Will append the output to the file C:\temp\export.sql if it already exists<br>
Script does not include Batch Separator and will not compile<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance sql2016 -Database MyDatabase -Table 'dbo.Table1', 'dbo.Table2' -SqlCredential sqladmin | Export-DbaDbTableData -FilePath C:\temp\export.sql -Append
```

Exports only data from 'dbo.Table1' and 'dbo.Table2' in MyDatabase to C:\temp\export.sql and uses the SQL login "sqladmin" to login to sql2016<br>

### Required Parameters

##### -InputObject

Accepts table objects from Get-DbaDbTable through the pipeline.  
Use this to process specific tables you've already identified rather than specifying table names again.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Path

Sets the directory where output files will be created when not using FilePath.  
Defaults to the dbatools export directory configured in module settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete path and filename for the output SQL script.  
Use this when you need the INSERT statements saved to a specific file location for deployment or version control.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Encoding

Controls the character encoding of the exported SQL file. Defaults to UTF8.  
Use UTF8 for compatibility with most modern SQL tools, or ASCII for older systems that don't support Unicode.  
Valid values are:  
  - ASCII: Uses the encoding for the ASCII (7-bit) character set.  
  - BigEndianUnicode: Encodes in UTF-16 format using the big-endian byte order.  
  - Byte: Encodes a set of characters into a sequence of bytes.  
  - String: Uses the encoding type for a string.  
  - Unicode: Encodes in UTF-16 format using the little-endian byte order.  
  - UTF7: Encodes in UTF-7 format.  
  - UTF8: Encodes in UTF-8 format.  
  - Unknown: The encoding type is unknown or invalid. The data can be treated as binary.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -BatchSeparator

Adds batch separators (like GO) between INSERT statements in the output script.  
Use this when creating deployment scripts that will be executed in SQL Server Management Studio or sqlcmd.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoPrefix

Excludes the USE database statement and other prefixes from the generated script.  
Use this when combining output with other scripts or when the database context is already established.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Passthru

Displays the generated INSERT statements in the PowerShell console in addition to file output.  
Useful for reviewing the script content before execution or when piping to other commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoClobber

Prevents overwriting existing files at the specified FilePath.  
Use this as a safety measure to avoid accidentally replacing important deployment scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the INSERT statements to the end of an existing file instead of creating a new one.  
Useful when building comprehensive deployment scripts from multiple table exports or combining with other SQL operations.

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

Shows what would happen if the command were to run. No actions are actually performed

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
