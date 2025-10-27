---
title: "Get-DbaBinaryFileTable"
slug: "Get-DbaBinaryFileTable"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies tables containing binary columns and their associated filename columns for file extraction operations."
tags:
  - "Migration"
  - "Backup"
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBinaryFileTable.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaBinaryFileTable"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaBinaryFileTable</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBinaryFileTable.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Identifies tables containing binary columns and their associated filename columns for file extraction operations.

## Description

Scans database tables to find those containing binary data columns (binary, varbinary, image) and automatically identifies potential filename columns for file extraction workflows. This function is essential when you need to extract files that have been stored as BLOBs in SQL Server tables but aren't sure which tables contain binary data or how the filenames are stored.  
  
The function enhances table objects by adding BinaryColumn and FileNameColumn properties, making it easy to pipe results directly to Export-DbaBinaryFile for automated file extraction. This is particularly useful for legacy applications where files were stored in the database rather than the file system, or when you need to audit what binary content exists across your databases.

## Syntax

```powershell
Get-DbaBinaryFileTable
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [[-Schema] <String[]>]
    [[-InputObject] <Table[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaBinaryFileTable -SqlInstance sqlcs -Database test
```
{: data-copyable="true" data-clean-code="Get-DbaBinaryFileTable -SqlInstance sqlcs -Database test" }

Returns a table with binary columns which can be used with Export-DbaBinaryFile and Import-DbaBinaryFile.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaBinaryFileTable -SqlInstance sqlcs -Database test | Out-GridView -Passthru | Export-DbaBinaryFile -Path C:\temp
```
{: data-copyable="true" data-clean-code="Get-DbaBinaryFileTable -SqlInstance sqlcs -Database test | Out-GridView -Passthru | Export-DbaBinaryFile -Path C:\temp" }

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

Specifies which databases to scan for tables containing binary columns. Accepts wildcards for pattern matching.  
Use this to limit the search scope when you know which databases might contain file storage tables, reducing scan time on large instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Targets specific tables to analyze for binary columns instead of scanning all tables in the database. Supports three-part naming (database.schema.table) and wildcards.  
Use this when you already know which tables contain binary data, such as document storage tables or attachment tables in applications.  
Wrap table names with special characters in square brackets, and escape actual ] characters by doubling them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Restricts the search to tables within specific database schemas. Accepts multiple schema names and wildcards.  
Useful for focusing on application-specific schemas that typically contain file storage tables, such as 'Documents' or 'Attachments' schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts table objects piped directly from Get-DbaDbTable, allowing you to pre-filter tables before binary column analysis.  
Use this approach when you want to combine complex table filtering with binary column detection in a pipeline workflow.

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


&nbsp;
