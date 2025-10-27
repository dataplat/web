---
title: "Export-DbaBinaryFile"
slug: "Export-DbaBinaryFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Extracts binary data from SQL Server tables and writes it to physical files"
tags:
  - "Migration"
  - "Backup"
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaBinaryFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaBinaryFile"
draft: false
---

# Export-DbaBinaryFile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaBinaryFile](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaBinaryFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaBinaryFile](https://dataplat.github.io/boh#Export-DbaBinaryFile).

## Synopsis

Extracts binary data from SQL Server tables and writes it to physical files

## Description

Retrieves binary data stored in SQL Server tables and writes it as files to the filesystem. This is useful for extracting documents, images, or other files that have been stored in database columns using binary, varbinary, or image datatypes.  
  
The function automatically detects filename and binary data columns based on column names and datatypes, but you can specify custom columns if needed. It supports streaming large files efficiently and can process multiple tables or databases in a single operation.  
  
If specific filename and binary columns aren't specified, the command will guess based on the datatype (binary/image) for the binary column and a match for "name" as the filename column.

## Syntax

```powershell
Export-DbaBinaryFile
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [[-Schema] <String[]>]
    [[-FileNameColumn] <String>]
    [[-BinaryColumn] <String>]
    [[-Path] <String>]
    [[-Query] <String>]
    [[-FilePath] <String>]
    [[-InputObject] <Table[]>]
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
PS C:\> Export-DbaBinaryFile -SqlInstance sqlcs -Database test -Path C:\temp\exports
```

Exports all binary files from the test database on sqlcs to C:\temp\exports. Guesses the columns based on datatype and column name.<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaBinaryFile -SqlInstance sqlcs -Database employees -Table photos  -Path C:\temp\exports
```

Exports all binary files from the photos table in the employees database on sqlcs to C:\temp\exports. Guesses the columns based on datatype and column name.<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaBinaryFile -SqlInstance sqlcs -Database employees -Table photos -FileNameColumn fname -BinaryColumn data -Path C:\temp\exports
```

Exports all binary files from the photos table in the employees database on sqlcs to C:\temp\exports. Uses the fname and data columns for the filename and binary data.<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaBinaryFile -SqlInstance sqlcs -Database employees -Table photos -Query "SELECT [FileName], [Data] FROM [employees].[dbo].[photos] WHERE FirstName = 'Potato' and LastName =
```

'Qualitee'" -FilePath C:\temp\PotatoQualitee.jpg<br>
Exports the binary file from the photos table in the employees database on sqlcs to C:\temp\PotatoQualitee.jpg. Uses the query to determine the filename and binary data.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaBinaryFileTable -SqlInstance sqlcs -Database test | Out-GridView -Passthru | Export-DbaBinaryFile -Path C:\temp
```

Allows you to pick tables with columns to be exported by Export-DbaBinaryFile<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

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

Specifies which databases to scan for tables containing binary data. Accepts wildcards for pattern matching.  
Use this to limit the export scope when you only need files from specific databases instead of scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies the table(s) containing binary data to export. Supports three-part naming (database.schema.table) and wildcards.  
Use this when you know exactly which tables contain your stored files, such as document management or attachment tables.  
Wrap table names with special characters in square brackets, like [Documents.Archive] for tables with periods in the name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Limits the search to tables within specific schemas. Useful in databases with multiple schemas for organizing different application areas.  
Common schemas include dbo, app, archive, or custom business schemas where file storage tables are organized.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileNameColumn

Identifies which column contains the original filename or file identifier for the stored binary data.  
The function auto-detects columns with 'name' in the column name, but specify this when your filename column has a different naming pattern like 'DocumentName' or 'FileID'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BinaryColumn

Identifies which column contains the actual binary file data to export.  
The function auto-detects binary, varbinary, and image columns, but specify this when you have multiple binary columns or non-standard column names like 'DocumentData' or 'FileContent'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Sets the target directory where exported files will be saved using their original filenames from the database.  
The directory will be created if it doesn't exist. Use this when exporting multiple files and want to preserve their original names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Query

Provides a custom SQL query to retrieve specific files based on complex criteria or joins.  
Use this when you need to filter files by metadata, join with other tables, or when the auto-detection doesn't work with your table structure.  
Your query must return exactly two columns: filename and binary data in that order.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FilePath

Specifies the exact path and filename for a single exported file, overriding the stored filename.  
Use this when exporting one specific file or when you need to rename the output file to a standardized naming convention.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts table objects from the pipeline, typically from Get-DbaDbTable or Get-DbaBinaryFileTable.  
Use this for advanced scenarios where you need to pre-filter or analyze tables before exporting their binary content.

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
