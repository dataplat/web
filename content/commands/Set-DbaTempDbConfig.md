---
title: "Set-DbaTempDbConfig"
slug: "Set-DbaTempDbConfig"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures tempdb database files according to Microsoft best practices for optimal performance"
tags:
  - "Tempdb"
  - "Configuration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaTempDbConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaTempDbConfig"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaTempDbConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaTempDbConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Michael Fal (@Mike_Fal), mikefal.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Configures tempdb database files according to Microsoft best practices for optimal performance

## Description

Configures tempdb database files to follow Microsoft's recommended best practices for performance optimization. This function calculates the optimal number of data files based on logical CPU cores (capped at 8) and distributes the specified total data file size evenly across those files. You must specify the target SQL Server instance and total data file size as mandatory parameters.  
  
The function automatically determines the appropriate number of data files based on your server's logical cores, but you can override this behavior. It validates the current tempdb configuration to ensure it won't conflict with your desired settings - existing files must be smaller than the calculated target size and you cannot have more existing files than the target configuration.  
  
Additional parameters let you customize file paths, log file size, and growth settings. The function generates ALTER DATABASE statements but does not shrink or delete existing files. If your current tempdb is larger than your target configuration, you'll need to shrink it manually before running this function. A SQL Server restart is required for tempdb changes to take effect.

## Syntax

```powershell
Set-DbaTempDbConfig
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-DataFileCount] <Int32>]
    [-DataFileSize] <Int32>
    [[-LogFileSize] <Int32>]
    [[-DataFileGrowth] <Int32>]
    [[-LogFileGrowth] <Int32>]
    [[-DataPath] <String[]>]
    [[-LogPath] <String>]
    [[-OutFile] <String>]
    [-OutputScriptOnly]
    [-DisableGrowth]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000
```
{: data-copyable="true" data-clean-code="Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000" }

Creates tempdb with a number of data files equal to the logical cores where each file is equal to 1000MB divided by the number of logical cores, with a log file of 250MB.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -DataFileCount 8
```
{: data-copyable="true" data-clean-code="Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -DataFileCount 8" }

Creates tempdb with 8 data files, each one sized at 125MB, with a log file of 250MB.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -OutputScriptOnly
```
{: data-copyable="true" data-clean-code="Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -OutputScriptOnly" }

Provides a SQL script output to configure tempdb according to the passed parameters.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -DisableGrowth
```
{: data-copyable="true" data-clean-code="Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -DisableGrowth" }

Disables the growth for the data and log files.<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -OutputScriptOnly
```
{: data-copyable="true" data-clean-code="Set-DbaTempDbConfig -SqlInstance localhost -DataFileSize 1000 -OutputScriptOnly" }

Returns the T-SQL script representing tempdb configuration.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -DataFileSize

Sets the total size in MB for all tempdb data files combined. This value gets evenly divided across all data files.  
For example, 1000MB with 4 files creates four 250MB files. Choose based on your workload's tempdb usage patterns and available storage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | 0 |

### Optional Parameters

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

##### -DataFileCount

Sets the number of tempdb data files to create. When omitted, automatically uses the logical core count (capped at 8 per Microsoft best practices).  
Override this when you need a specific file count different from core count, though exceeding core count generates a warning as it goes against best practices.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -LogFileSize

Sets the tempdb log file size in MB. When omitted, the existing log file size remains unchanged.  
Use this to resize the log file when current sizing doesn't match your tempdb transaction volume requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DataFileGrowth

Controls the growth increment for tempdb data files in MB when they need to expand. Defaults to 512 MB.  
Set this based on your typical tempdb usage spikes to avoid frequent small growths that can impact performance. Use 0 with -DisableGrowth to prevent growth entirely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 512 |

##### -LogFileGrowth

Controls the growth increment for the tempdb log file in MB when it needs to expand. Defaults to 512 MB.  
Size this according to your transaction log activity in tempdb to minimize auto-growth events during peak workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 512 |

##### -DataPath

Sets the folder path(s) where tempdb data files will be created. When omitted, uses the current tempdb data file location.  
Specify multiple paths to distribute files across different drives for performance. Files are distributed round-robin across the provided paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogPath

Sets the folder path where the tempdb log file will be created. When omitted, uses the current tempdb log file location.  
Consider placing the log file on a separate drive from data files to reduce I/O contention for write-heavy tempdb workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OutFile

Saves the generated T-SQL script to the specified file path instead of executing it.  
Useful for storing configuration scripts in source control or running them later through scheduled maintenance processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OutputScriptOnly

Returns the generated T-SQL script without executing it against the SQL Server instance.  
Use this to review the configuration changes before applying them, or to run the script manually during maintenance windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableGrowth

Prevents tempdb files from auto-growing by setting growth to 0. Overrides any values specified for -DataFileGrowth and -LogFileGrowth.  
Use this when you want to pre-size tempdb files appropriately and prevent unexpected growth during production workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
