---
title: "Save-DbaCommunitySoftware"
slug: "Save-DbaCommunitySoftware"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan, @JordanOrdix"
availability: "Windows, Linux, macOS"
synopsis: "Downloads and caches popular SQL Server community tools from GitHub for use by dbatools installation commands"
tags:
  - "Community"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Save-DbaCommunitySoftware.ps1"
bohUrl: "https://dataplat.github.io/boh#Save-DbaCommunitySoftware"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Save-DbaCommunitySoftware</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Save-DbaCommunitySoftware.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andreas Jordan, @JordanOrdix</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Downloads and caches popular SQL Server community tools from GitHub for use by dbatools installation commands

## Description

Downloads and extracts popular SQL Server community tools from GitHub repositories to maintain a local cache used by dbatools installation commands.  
This function automatically manages the acquisition and versioning of essential DBA script collections, eliminating the need to manually download and organize multiple tool repositories.  
It's called internally by Install-Dba*, Update-Dba*, and Invoke-DbaAzSqlDbTip commands when they need to access the latest versions of community tools.  
  
Supports both online downloads directly from GitHub and offline installations using local zip files, making it suitable for restricted network environments.  
The function handles version detection, directory structure normalization, and maintains consistent file organization across different tool repositories.  
  
For environments without internet access, you can download zip files from the following URLs on another computer, transfer them to the target system, and use -LocalFile to update the local cache:  
* MaintenanceSolution: https://github.com/olahallengren/sql-server-maintenance-solution  
* FirstResponderKit: https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit/releases  
* DarlingData: https://github.com/erikdarlingdata/DarlingData  
* SQLWATCH: https://github.com/marcingminski/sqlwatch/releases  
* WhoIsActive: https://github.com/amachanic/sp_whoisactive/releases  
* DbaMultiTool: https://github.com/LowlyDBA/dba-multitool/releases  
* AzSqlTips: https://github.com/microsoft/azure-sql-tips/releases/

## Syntax

```powershell
Save-DbaCommunitySoftware
    [[-Software] <String>]
    [[-Branch] <String>]
    [[-LocalFile] <String>]
    [[-Url] <String>]
    [[-LocalDirectory] <String>]
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
PS C:\> Save-DbaCommunitySoftware -Software MaintenanceSolution
```
{: data-copyable="true" data-clean-code="Save-DbaCommunitySoftware -Software MaintenanceSolution" }

Updates the local cache of Ola Hallengren's Solution objects.<br>

#####  Example:  2 

```powershell
PS C:\> Save-DbaCommunitySoftware -Software FirstResponderKit -LocalFile \\fileserver\Software\SQL-Server-First-Responder-Kit-20211106.zip
```
{: data-copyable="true" data-clean-code="Save-DbaCommunitySoftware -Software FirstResponderKit -LocalFile \\fileserver\Software\SQL-Server-First-Responder-Kit-20211106.zip" }

Updates the local cache of the First Responder Kit based on the given file.<br>

### Optional Parameters

##### -Software

Name of the software to download.  
Options include:  
* MaintenanceSolution: SQL Server Maintenance Solution created by Ola Hallengren (https://ola.hallengren.com)  
* FirstResponderKit: First Responder Kit created by Brent Ozar (http://FirstResponderKit.org)  
* DarlingData: Erik Darling's stored procedures (https://www.erikdarlingdata.com)  
* SQLWATCH: SQL Server Monitoring Solution created by Marcin Gminski (https://sqlwatch.io/)  
* WhoIsActive: Adam Machanic's comprehensive activity monitoring stored procedure sp_WhoIsActive (https://github.com/amachanic/sp_whoisactive)  
* DbaMultiTool: John McCall's T-SQL scripts for the long haul: optimizing storage, on-the-fly documentation, and general administrative needs (https://dba-multitool.org)  
* AzSqlTips: Azure SQL PM team scripts to review Azure SQL Database design, health and performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | MaintenanceSolution,FirstResponderKit,DarlingData,SQLWATCH,WhoIsActive,DbaMultiTool,AzSqlTips |

##### -Branch

Specifies which branch or version to download from the GitHub repository. Defaults to master or main depending on the repository.  
Use this when you need a specific development branch or to override default versioning. Only applies to branch-based downloads like MaintenanceSolution, FirstResponderKit, DarlingData, and   
DbaMultiTool.  
For SQLWATCH, use 'prerelease' or 'pre-release' to get preview versions instead of stable releases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalFile

Specifies the path to a local zip file or SQL script to install from instead of downloading from GitHub.  
Use this for offline environments or when you have a specific version already downloaded. Accepts zip archives for all tools, plus individual SQL files for WhoIsActive (sp_WhoIsActive.sql) and   
AzSqlTips (get-sqldb-tips.sql).  
Essential for air-gapped systems where direct internet access is not available.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Url

Specifies a custom URL to download the software archive from instead of using the automatic GitHub URLs.  
Use this when you need to download from a forked repository, specific release, or alternative hosting location. Overrides the default URL generation that occurs when using the Software parameter.  
Must point to a downloadable zip file containing the community tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalDirectory

Specifies a custom directory path where the community software will be extracted and cached.  
Use this when you need to store the tools in a non-standard location instead of the default dbatools data directory. Overrides the automatic path generation based on the Software parameter.  
Useful for custom cache locations or when working with multiple versions of the same tool.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
