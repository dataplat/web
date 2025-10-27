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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbatoolsPath</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsPath.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbatoolsPath -Name 'temp'" }

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
