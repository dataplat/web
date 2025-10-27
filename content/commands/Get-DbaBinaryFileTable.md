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

# Get-DbaBinaryFileTable

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaBinaryFileTable](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBinaryFileTable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaBinaryFileTable](https://dataplat.github.io/boh#Get-DbaBinaryFileTable).

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

Returns a table with binary columns which can be used with Export-DbaBinaryFile and Import-DbaBinaryFile.<br>

#####  Example:  2 

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
