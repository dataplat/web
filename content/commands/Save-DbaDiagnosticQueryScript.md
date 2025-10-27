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

# Save-DbaDiagnosticQueryScript

| Property | Value |
| --- | --- |
| **Author** | Andre Kamman (@AndreKamman), andrekamman.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Save-DbaDiagnosticQueryScript](https://github.com/dataplat/dbatools/blob/master/public/Save-DbaDiagnosticQueryScript.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Save-DbaDiagnosticQueryScript](https://dataplat.github.io/boh#Save-DbaDiagnosticQueryScript).

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
