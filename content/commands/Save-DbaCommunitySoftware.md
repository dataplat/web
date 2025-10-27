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

# Save-DbaCommunitySoftware

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan, @JordanOrdix |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Save-DbaCommunitySoftware](https://github.com/dataplat/dbatools/blob/master/public/Save-DbaCommunitySoftware.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Save-DbaCommunitySoftware](https://dataplat.github.io/boh#Save-DbaCommunitySoftware).

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

Updates the local cache of Ola Hallengren's Solution objects.<br>

#####  Example:  2 

```powershell
PS C:\> Save-DbaCommunitySoftware -Software FirstResponderKit -LocalFile \\fileserver\Software\SQL-Server-First-Responder-Kit-20211106.zip
```

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
