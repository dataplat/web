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

# Save-DbaKbUpdate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Save-DbaKbUpdate](https://github.com/dataplat/dbatools/blob/master/public/Save-DbaKbUpdate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Save-DbaKbUpdate](https://dataplat.github.io/boh#Save-DbaKbUpdate).

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

Downloads KB4057119 to the current directory. This works for SQL Server or any other KB.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaKbUpdate -Name KB4057119 -Simple | Out-GridView -Passthru | Save-DbaKbUpdate
```

Downloads the selected files from KB4057119 to the current directory.<br>

#####  Example:  3 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB4057119, 4057114 -Path C:\temp
```

Downloads KB4057119 and the x64 version of KB4057114 to C:\temp. This works for SQL Server or any other KB.<br>

#####  Example:  4 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB4057114 -Architecture All -Path C:\temp
```

Downloads the x64 version of KB4057114 and the x86 version of KB4057114 to C:\temp. This works for SQL Server or any other KB.<br>

#####  Example:  5 

```powershell
PS C:\> Save-DbaKbUpdate -Name KB5003279 -Language enu -Path C:\temp
```

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
