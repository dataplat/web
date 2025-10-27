---
title: "Save-DbaKbUpdate"
slug: "Save-DbaKbUpdate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Downloads Microsoft Knowledge Base updates and patches to local storage"
tags:
  - "Deployment"
  - "Install"
  - "Patching"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Save-DbaKbUpdate.ps1"
bohUrl: "https://dataplat.github.io/boh#Save-DbaKbUpdate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Save-DbaKbUpdate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Save-DbaKbUpdate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Downloads Microsoft Knowledge Base updates and patches to local storage

## Description

Downloads Microsoft KB updates, cumulative updates, and service packs from Microsoft's servers to your local file system. This function handles SQL Server patches as well as any other Microsoft KB updates, making it easy to stage patches for installation across multiple servers. Supports filtering by architecture (x86, x64, ia64) and language, and can download multiple KBs in a single operation. Use this to build a local patch repository or download specific updates for offline installation scenarios.

## Syntax

```powershell
Save-DbaKbUpdate
    [[-Name] <String[]>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Architecture] <String>]
    [[-Language] <String>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB4057119
```
{: data-copyable="true" data-clean-code="Save-DbaKbUpdate -Name KB4057119" }

Downloads KB4057119 to the current directory. This works for SQL Server or any other KB.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119 -Simple | Out-GridView -Passthru | Save-DbaKbUpdate
```
{: data-copyable="true" data-clean-code="Get-DbaKbUpdate -Name KB4057119 -Simple | Out-GridView -Passthru | Save-DbaKbUpdate" }

Downloads the selected files from KB4057119 to the current directory.<br>

#####  Example:  3 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB4057119, 4057114 -Path C:\temp
```
{: data-copyable="true" data-clean-code="Save-DbaKbUpdate -Name KB4057119, 4057114 -Path C:\temp" }

Downloads KB4057119 and the x64 version of KB4057114 to C:\temp. This works for SQL Server or any other KB.<br>

#####  Example:  4 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB4057114 -Architecture All -Path C:\temp
```
{: data-copyable="true" data-clean-code="Save-DbaKbUpdate -Name KB4057114 -Architecture All -Path C:\temp" }

Downloads the x64 version of KB4057114 and the x86 version of KB4057114 to C:\temp. This works for SQL Server or any other KB.<br>

#####  Example:  5 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB5003279 -Language enu -Path C:\temp
```
{: data-copyable="true" data-clean-code="Save-DbaKbUpdate -Name KB5003279 -Language enu -Path C:\temp" }

Downloads only the english version of KB5003279, which is the Service Pack 3 for SQL Server 2016, to C:\temp.<br>

### Optional Parameters

##### -Name

Specifies the Microsoft Knowledge Base article number to download. Accepts KB prefix or just the numeric value (e.g., 'KB4057119' or '4057119').  
Use this to target specific patches, cumulative updates, or service packs for SQL Server or other Microsoft products.  
Supports multiple KB numbers in a single command for batch downloading.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where downloaded KB files will be saved. Defaults to the current working directory.  
Use this to organize patches into specific folders or network locations for easier deployment across multiple servers.  
The directory will be created if it doesn't exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | . |

##### -FilePath

Specifies the exact filename and path for the downloaded file, overriding the server-provided filename.  
Use this when you need custom naming conventions or want to save to a specific location with a particular name.  
Cannot be used when downloading multiple KBs or when Architecture is set to 'All'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Architecture

Specifies the CPU architecture for the downloaded files. Valid values are 'x64', 'x86', 'ia64', or 'All'.  
Use 'All' to download files for all available architectures when you need to support mixed environments.  
Most modern SQL Server deployments use 'x64', which is the default.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | x64 |
| Accepted Values | x64,x86,ia64,All |

##### -Language

Filters downloads to a specific language version using three-letter language codes (e.g., 'enu' for English, 'deu' for German).  
Primarily useful for SQL Server Service Packs which have separate files per language, unlike Cumulative Updates which are language-neutral.  
Only downloads files matching the specified language code when multiple language versions are available.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts pipeline input from Get-DbaKbUpdate, allowing you to filter and select specific files before downloading.  
Use this workflow to preview available downloads with Get-DbaKbUpdate, then pipe selected results for download.  
Particularly useful when working with KBs that have multiple file options.

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
