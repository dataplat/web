---
title: "Get-DbaDbFileMapping"
slug: "Get-DbaDbFileMapping"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net | Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Creates file mapping hashtable from existing database for use in restore operations"
tags:
  - "Storage"
  - "File"
  - "Data"
  - "Log"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileMapping.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFileMapping"
draft: false
---

# Get-DbaDbFileMapping

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net , Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbFileMapping](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileMapping.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbFileMapping](https://dataplat.github.io/boh#Get-DbaDbFileMapping).

## Synopsis

Creates file mapping hashtable from existing database for use in restore operations

## Description

Extracts the logical-to-physical file name mappings from an existing database and returns them in a hashtable format compatible with Restore-DbaDatabase. This eliminates the need to manually specify file paths when restoring databases to different servers or locations. The function reads both data files and log files from the database's file groups and creates a complete mapping that preserves the original file structure during restore operations.

## Syntax

```powershell
Get-DbaDbFileMapping
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $filemap = Get-DbaDbFileMapping -SqlInstance sql2016 -Database test
PS C:\> Get-ChildItem \\nas\db\backups\test | Restore-DbaDatabase -SqlInstance sql2019 -Database test -FileMapping $filemap.FileMapping
```

Restores test to sql2019 using the file structure built from the existing database on sql2016<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

| Property | Value |
| --- | --- |
| Alias |  |
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

##### -Database

Specifies which databases to extract file mappings from. Accepts wildcards for pattern matching.  
Use this when you need file mappings for specific databases instead of all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects directly from Get-DbaDatabase or other dbatools database functions via pipeline.  
Use this when you want to chain database operations or work with pre-filtered database collections.

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
