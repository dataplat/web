---
title: "Resolve-DbaPath"
slug: "Resolve-DbaPath"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Validates and resolves file system paths with enhanced error handling and provider verification."
tags:
  - "Path"
  - "Resolve"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Resolve-DbaPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Resolve-DbaPath"
draft: false
---

# Resolve-DbaPath

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Resolve-DbaPath](https://github.com/dataplat/dbatools/blob/master/public/Resolve-DbaPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Resolve-DbaPath](https://dataplat.github.io/boh#Resolve-DbaPath).

## Synopsis

Validates and resolves file system paths with enhanced error handling and provider verification.

## Description

Validates and resolves file system paths with additional safety checks beyond PowerShell's built-in Resolve-Path cmdlet. This function ensures paths exist and are accessible before performing database operations like backups, restores, or log file management. It provides enhanced error handling, provider validation (FileSystem, Registry, etc.), and supports both existing paths and parent directories for new file creation. DBAs can use this to validate backup destinations, database file locations, and script paths before running maintenance operations, preventing failures due to invalid or inaccessible paths.

## Syntax

```powershell
Resolve-DbaPath
    [-Path] <String[]>
    [[-Provider] <String>]
    [-SingleItem]
    [-NewChild]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Resolve-DbaPath -Path report.log -Provider FileSystem -NewChild -SingleItem
```

Ensures the resolved path is a FileSystem path.<br>
This will resolve to the current folder and the file report.log.<br>
Will not ensure the file exists or doesn't exist.<br>
If the current path is in a different provider, it will throw an exception.<br>

#####  Example:  2 

```powershell
PS C:\> Resolve-DbaPath -Path ..\*
```

This will resolve all items in the parent folder, whatever the current path or drive might be.<br>

### Required Parameters

##### -Path

Specifies the file system path to validate and resolve, supporting both absolute and relative paths.  
Use this to verify backup destinations, database file locations, or script paths before database operations.  
Accepts wildcards for pattern matching and can validate multiple paths when passed as an array.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Provider

Validates that the resolved path belongs to the specified PowerShell provider type.  
Use 'FileSystem' to ensure database backup paths or data file locations are on disk storage, not registry or other providers.  
Prevents accidental operations on wrong provider types like 'Registry', 'Certificate', or 'ActiveDirectory'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SingleItem

Requires the path to resolve to exactly one location, preventing wildcard expansion.  
Use when specifying a unique backup file destination or single database file path where multiple matches would cause errors.  
Will throw an error if wildcards or patterns resolve to multiple paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NewChild

Validates the parent directory exists for creating new files, without requiring the target file to exist.  
Use when specifying backup file destinations, new database file paths, or log file locations that will be created.  
The parent folder must be accessible, but the final filename can be new.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
