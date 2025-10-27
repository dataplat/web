---
title: "Get-DbatoolsPath"
slug: "Get-DbatoolsPath"
date: 2024-01-01
layout: "single"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves configured file paths used by dbatools functions for storing temporary files, logs, and output data."
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbatoolsPath"
draft: false
---

# Get-DbatoolsPath

| Property | Value |
| --- | --- |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbatoolsPath](https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbatoolsPath](https://dataplat.github.io/boh#Get-DbatoolsPath).

## Synopsis

Retrieves configured file paths used by dbatools functions for storing temporary files, logs, and output data.

## Description

Retrieves file paths that have been configured for use by dbatools functions. These paths define where the module stores temporary files, exports, logs, and other data during SQL Server operations. DBAs can customize these paths to control where dbatools writes files, ensuring compliance with organizational file storage policies and avoiding permission issues.  
  
Paths can be configured using Set-DbatoolsPath or directly through the configuration system by creating settings with the format "Path.Managed.<PathName>". Common predefined paths include Temp, LocalAppData, AppData, and ProgramData, but custom paths can be defined for specific workflows like backup file staging or export destinations.

## Syntax

```powershell
Get-DbatoolsPath
    [-Name] <String>
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsPath -Name 'temp'
```

Returns the temp path.<br>

### Required Parameters

##### -Name

Specifies the name of the configured path to retrieve. Common predefined paths include 'Temp' for temporary file operations, 'LocalAppData' for user-specific application data, 'AppData' for roaming   
profile data, and 'ProgramData' for system-wide application data.  
Use this when you need to determine where dbatools will write files for export operations, temporary processing, or when configuring custom paths for specific workflows like backup staging   
directories or report output locations.  
Custom path names can be defined using Set-DbatoolsPath and referenced here for consistent file management across your SQL Server administration scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |


&nbsp;
