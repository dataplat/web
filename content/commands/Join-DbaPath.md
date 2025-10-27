---
title: "Join-DbaPath"
slug: "Join-DbaPath"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Constructs file paths with correct separators for Windows and Linux SQL Server instances."
tags:
  - "Path"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Join-DbaPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Join-DbaPath"
draft: false
---

# Join-DbaPath

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Join-DbaPath](https://github.com/dataplat/dbatools/blob/master/public/Join-DbaPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Join-DbaPath](https://dataplat.github.io/boh#Join-DbaPath).

## Synopsis

Constructs file paths with correct separators for Windows and Linux SQL Server instances.

## Description

Constructs file paths by joining multiple segments while automatically using the correct path separators (backslash for Windows, forward slash for Linux) based on the target SQL Server instance's operating system. This function eliminates the guesswork when building file paths for backup files, exports, scripts, or other SQL Server operations that need to reference files on the remote server. Without specifying a SqlInstance, it defaults to the local machine's path separator conventions.

## Syntax

```powershell
Join-DbaPath
    [-Path] <String>
    [-SqlInstance <DbaInstanceParameter>]
    [-Child <String[]>]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Join-DbaPath -Path 'C:\temp' 'Foo' 'Bar'
```

Returns 'C:\temp\Foo\Bar' on windows.<br>
Returns 'C:/temp/Foo/Bar' on non-windows.<br>

### Required Parameters

##### -Path

Specifies the base directory path where backup files, scripts, or other SQL Server resources will be stored. This forms the root location for building complete file paths.  
Use this when you need to define the starting directory for backup operations, export locations, or script file destinations on either local or remote SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

Optional -- tests to see if destination SQL Server is Linux or Windows

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Child

Specifies additional path segments to append to the base path, such as subdirectories, filename prefixes, or date folders. Accepts multiple values to build nested directory structures.  
Use this to organize files into logical groupings like database names, backup types, or date-based folders (e.g., 'MyDatabase', 'Full', '2024-01-15').

| Property | Value |
| --- | --- |
| Alias | ChildPath |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
