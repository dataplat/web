---
title: "Save-DbaDiagnosticQueryScript"
slug: "Save-DbaDiagnosticQueryScript"
date: 2024-01-01
layout: "single"
author: "Andre Kamman (@AndreKamman), andrekamman.com"
availability: "Windows, Linux, macOS"
synopsis: "Downloads Glenn Berry's SQL Server Diagnostic Information Queries for performance monitoring and troubleshooting"
tags:
  - "Community"
  - "GlennBerry"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Save-DbaDiagnosticQueryScript.ps1"
bohUrl: "https://dataplat.github.io/boh#Save-DbaDiagnosticQueryScript"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Save-DbaDiagnosticQueryScript</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Save-DbaDiagnosticQueryScript.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andre Kamman (@AndreKamman), andrekamman.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Downloads Glenn Berry's SQL Server Diagnostic Information Queries for performance monitoring and troubleshooting

## Description

Downloads the latest versions of Glenn Berry's renowned SQL Server Diagnostic Information Queries from his website. These DMV-based scripts are essential tools for DBAs to assess SQL Server health, identify performance bottlenecks, and gather comprehensive system information across all SQL Server versions including Azure SQL Database and Managed Instance.  
  
The dbatools module includes diagnostic queries pre-installed, but this function lets you update to more recent versions or download specific versions for your environment. This is particularly valuable since Glenn Berry regularly updates these scripts with new insights and compatibility improvements.  
  
This function is primarily used by Invoke-DbaDiagnosticQuery, but can also be used independently to download the scripts. Use this to pre-download scripts from a device with internet connection for later use on systems without internet access.  
  
The function automatically detects and downloads scripts for all available SQL Server versions found on Glenn Berry's resources page, saving them with version-specific filenames for easy identification.

## Syntax

```powershell
Save-DbaDiagnosticQueryScript
    [[-Path] <FileInfo>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Save-DbaDiagnosticQueryScript -Path c:\temp
```
{: data-copyable="true" data-clean-code="Save-DbaDiagnosticQueryScript -Path c:\temp" }

Downloads the most recent version of all Glenn Berry DMV scripts to the specified location.<br>
If Path is not specified, the "My Documents" location will be used.<br>

### Optional Parameters

##### -Path

Specifies the directory path where Glenn Berry's diagnostic query scripts will be downloaded. Defaults to the current user's Documents folder.  
Use this when you need to organize scripts in a specific location, such as a shared network drive for team access or a local folder structure for different environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | [Environment]::GetFolderPath("mydocuments") |

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
