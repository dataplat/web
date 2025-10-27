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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaDiagnosticQuery</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaDiagnosticQuery.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andre Kamman (@AndreKamman), clouddba.io</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance sql2016 | Export-DbaDiagnosticQuery -Path c:\temp" }

Converts output from Invoke-DbaDiagnosticQuery to multiple CSV files<br>

#####  Example:  2 

```powershell
PS C:\> $output = Invoke-DbaDiagnosticQuery -SqlInstance sql2016
PS C:\> Export-DbaDiagnosticQuery -InputObject $output -ConvertTo Excel
```
{: data-copyable="true" data-clean-code="$output = Invoke-DbaDiagnosticQuery -SqlInstance sql2016
Export-DbaDiagnosticQuery -InputObject $output -ConvertTo Excel" }

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
