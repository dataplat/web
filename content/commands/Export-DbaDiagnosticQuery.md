---
title: "Export-DbaDiagnosticQuery"
slug: "Export-DbaDiagnosticQuery"
date: 2024-01-01
layout: "single"
author: "Andre Kamman (@AndreKamman), clouddba.io"
availability: "Windows, Linux, macOS"
synopsis: "Converts diagnostic query results from Invoke-DbaDiagnosticQuery into CSV or Excel files"
tags:
  - "Community"
  - "GlennBerry"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDiagnosticQuery.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaDiagnosticQuery"
draft: false
---

# Export-DbaDiagnosticQuery

| Property | Value |
| --- | --- |
| **Author** | Andre Kamman (@AndreKamman), clouddba.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaDiagnosticQuery](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDiagnosticQuery.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaDiagnosticQuery](https://dataplat.github.io/boh#Export-DbaDiagnosticQuery).

## Synopsis

Converts diagnostic query results from Invoke-DbaDiagnosticQuery into CSV or Excel files

## Description

Processes the PowerShell objects returned by Glenn Berry's diagnostic queries and saves them as CSV files or Excel worksheets for analysis, reporting, and sharing with vendors.  
Automatically extracts execution plans as separate .sqlplan files and query text as .sql files, which can be opened directly in SQL Server Management Studio.  
This is useful when you need file-based output for compliance documentation, performance analysis, or when working with teams that prefer traditional file formats over PowerShell objects.  
CSV output creates individual files per query while Excel output consolidates results into worksheets within a single workbook.

## Syntax

```powershell
Export-DbaDiagnosticQuery
    [-InputObject] <Object[]>
    [[-ConvertTo] <String>]
    [[-Path] <FileInfo>]
    [[-Suffix] <String>]
    [-NoPlanExport]
    [-NoQueryExport]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance sql2016 | Export-DbaDiagnosticQuery -Path c:\temp
```

Converts output from Invoke-DbaDiagnosticQuery to multiple CSV files<br>

#####  Example:  2 

```powershell
PS C:\> $output = Invoke-DbaDiagnosticQuery -SqlInstance sql2016
PS C:\> Export-DbaDiagnosticQuery -InputObject $output -ConvertTo Excel
```

Converts output from Invoke-DbaDiagnosticQuery to Excel worksheet(s) in the Documents folder<br>

### Required Parameters

##### -InputObject

Specifies the diagnostic query results from Invoke-DbaDiagnosticQuery to convert to files.  
Accepts pipeline input directly from Invoke-DbaDiagnosticQuery or stored results in a variable.  
Each object contains query results, execution plans, and metadata needed for file export.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ConvertTo

Specifies the output format for diagnostic query results. Valid choices are Excel and CSV with CSV as the default.  
Use Excel when you need consolidated results in worksheets for easier analysis and sharing with non-technical stakeholders.  
Choose CSV when you need individual files per query for automated processing or importing into other tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Csv |
| Accepted Values | Excel,Csv |

##### -Path

Specifies the directory path where exported files will be created. Must be a directory, not a filename.  
Defaults to the configured dbatools export path if not specified.  
The function creates separate files for each diagnostic query result within this directory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -Suffix

Specifies a suffix to append to all generated filenames for uniqueness. Defaults to a timestamp in yyyyMMddHHmmssms format.  
Use this when running exports multiple times to prevent filename conflicts or when you need custom file identification.  
Helps organize multiple export runs when tracking performance trends over time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$(Get-Date -format 'yyyyMMddHHmmssms')" |

##### -NoPlanExport

Suppresses the export of execution plans as separate .sqlplan files. These files can be opened directly in SQL Server Management Studio for plan analysis.  
Use this switch when you only need the query results data and not the execution plan details.  
Reduces file clutter when performing bulk exports where execution plans are not required for analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoQueryExport

Suppresses the export of query text as separate .sql files. These files contain the actual SQL statements from the diagnostic queries.  
Use this switch when you only need the result data and not the source query text.  
Helpful when exporting large result sets where the query text is not needed for your analysis workflow.

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
