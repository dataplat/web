---
title: "Import-DbaBinaryFile"
slug: "Import-DbaBinaryFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Loads binary files from the filesystem into SQL Server database tables"
tags:
  - "Migration"
  - "Backup"
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaBinaryFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaBinaryFile"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Import-DbaBinaryFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Import-DbaBinaryFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Loads binary files from the filesystem into SQL Server database tables

## Description

Reads binary files from disk and stores them in SQL Server tables with binary, varbinary, or image columns. This is useful for storing documents, images, executables, or any file type directly in the database for archival, content management, or application integration scenarios.  
  
The command automatically detects the appropriate columns for storing file data - it looks for binary-type columns (binary, varbinary, image) for the file contents and columns containing "name" for the filename. You can also specify exact column names or provide a custom INSERT statement for more complex scenarios.  
  
Files can be imported individually, from directories (with recursion), or piped in from Get-ChildItem. Each file is read as a byte array and inserted using parameterized queries to safely handle binary data of any size within SQL Server's limits.

## Syntax

```powershell
Import-DbaBinaryFile
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-Table] <String>]
    [[-Schema] <String>]
    [[-Statement] <String>]
    [[-FileNameColumn] <String>]
    [[-BinaryColumn] <String>]
    [-NoFileNameColumn]
    [[-InputObject] <Table[]>]
    [[-FilePath] <FileInfo[]>]
    [[-Path] <FileInfo[]>]
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
PS C:\> Get-ChildItem C:\photos | Import-DbaBinaryFile -SqlInstance sqlcs -Database employees -Table photos
```
{: data-copyable="true" data-clean-code="Get-ChildItem C:\photos | Import-DbaBinaryFile -SqlInstance sqlcs -Database employees -Table photos" }

Imports all photos from C:\photos into the photos table in the employees database on sqlcs. Automatically guesses the column names for the image and filename columns.<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaBinaryFile -SqlInstance sqlcs -Database tempdb -Table BunchOFiles -FilePath C:\azure\adalsql.msi
```
{: data-copyable="true" data-clean-code="Import-DbaBinaryFile -SqlInstance sqlcs -Database tempdb -Table BunchOFiles -FilePath C:\azure\adalsql.msi" }

Imports the file adalsql.msi into the BunchOFiles table in the tempdb database on sqlcs. Automatically guesses the column names for the image and filename columns.<br>

#####  Example:  3 

```powershell
PS C:\> Import-DbaBinaryFile -SqlInstance sqlcs -Database tempdb -Table BunchOFiles -FilePath C:\azure\adalsql.msi -FileNameColumn fname -BinaryColumn data
```
{: data-copyable="true" data-clean-code="Import-DbaBinaryFile -SqlInstance sqlcs -Database tempdb -Table BunchOFiles -FilePath C:\azure\adalsql.msi -FileNameColumn fname -BinaryColumn data" }

Imports the file adalsql.msi into the BunchOFiles table in the tempdb database on sqlcs. Uses the fname and data columns for the filename and binary data.<br>

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

Specifies the target database where the binary files will be imported. Required when not using InputObject.  
Use this to identify which database contains the table for storing your binary files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies the target table where binary files will be stored. Must contain at least one binary-type column (binary, varbinary, image).  
Use this when importing files into a specific table designed for file storage. Supports three-part naming (db.schema.table).  
If the object has special characters please wrap them in square brackets [ ].  
Using dbo.First.Table will try to find table named 'Table' on schema 'First' and database 'dbo'.  
The correct way to find table named 'First.Table' on schema 'dbo' is by passing dbo.[First.Table]  
Any actual usage of the ] must be escaped by duplicating the ] character.  
The correct way to find a table Name] in schema Schema.Name is by passing [Schema.Name].[Name]]]

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies the schema containing the target table. Defaults to the user's default schema if not specified.  
Use this when your table exists in a non-default schema or when you need to be explicit about schema ownership.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Statement

Provides a custom INSERT statement for complex import scenarios. Must include @FileContents parameter for binary data.  
Use this when automatic column detection fails or when you need custom INSERT logic with joins, triggers, or computed columns.  
Example: INSERT INTO db.tbl ([FileNameColumn], [bBinaryColumn]) VALUES (@FileName, @FileContents)  
The @FileContents parameter is required. Include @FileName parameter if storing filenames.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FileNameColumn

Specifies which column will store the original filename. Auto-detects columns containing 'name' if not specified.  
Use this when your table has multiple name-related columns or when auto-detection fails to identify the correct column.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BinaryColumn

Specifies which column will store the binary file data. Auto-detects binary, varbinary, or image columns if not specified.  
Use this when your table has multiple binary columns or when auto-detection fails to identify the correct storage column.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoFileNameColumn

Indicates that the target table does not have a column for storing filenames. Only the binary data will be imported.  
Use this when your table design only stores file content without filename metadata for blob storage scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts table objects from Get-DbaDbTable for pipeline-based imports. Alternative to specifying Database and Table parameters.  
Use this when working with multiple tables or when integrating with other dbatools commands that return table objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -FilePath

Specifies one or more individual files to import into the database table. Accepts pipeline input from Get-ChildItem.  
Use this when importing specific files rather than entire directories. Cannot be used with Path parameter.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Path

Specifies a directory containing files to import. Recursively processes all files within the directory and subdirectories.  
Use this when bulk importing multiple files from a folder structure. Cannot be used with FilePath parameter.

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
