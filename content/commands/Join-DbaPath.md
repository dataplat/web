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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Join-DbaPath</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Join-DbaPath.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Join-DbaPath -Path 'C:\temp' 'Foo' 'Bar'" }

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
