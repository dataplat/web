---
title: "Install-DbaMultiTool"
slug: "Install-DbaMultiTool"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Installs five essential T-SQL stored procedures for database documentation, index optimization, and administrative tasks."
tags:
  - "Community"
  - "DbaMultiTool"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaMultiTool.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaMultiTool"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Install-DbaMultiTool</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Install-DbaMultiTool.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>John McCall (@lowlydba), lowlydba.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Installs five essential T-SQL stored procedures for database documentation, index optimization, and administrative tasks.

## Description

Downloads and installs the DBA MultiTool collection of T-SQL stored procedures into a specified database. This toolkit provides five key utilities that help DBAs with common documentation and optimization tasks that would otherwise require manual T-SQL scripting.  
  
The installed procedures include:  
â€¢ sp_helpme - Enhanced version of sp_help that provides detailed object information  
â€¢ sp_doc - Generates comprehensive database documentation  
â€¢ sp_sizeoptimiser - Analyzes and recommends optimal database file sizing  
â€¢ sp_estindex - Estimates potential storage savings from index compression  
â€¢ sp_help_revlogin - Creates scripts to recreate logins with their original SIDs and passwords  
  
These procedures are particularly valuable for database migrations, compliance reporting, capacity planning, and general administrative documentation. The function automatically handles downloading the latest version from GitHub and can install across multiple instances simultaneously.  
  
DBA MultiTool links:  
https://dba-multitool.org  
https://github.com/LowlyDBA/dba-multitool/

## Syntax

```powershell
Install-DbaMultiTool
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Branch] <String>]
    [[-Database] <Object>]
    [[-LocalFile] <String>]
    [-Force]
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
PS C:\> Install-DbaMultiTool -SqlInstance server1 -Database main
```
{: data-copyable="true" data-clean-code="Install-DbaMultiTool -SqlInstance server1 -Database main" }

Logs into server1 with Windows authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance server1\instance1 -Database DBA
```
{: data-copyable="true" data-clean-code="Install-DbaMultiTool -SqlInstance server1\instance1 -Database DBA" }

Logs into server1\instance1 with Windows authentication and then installs the DBA MultiTool in the DBA database.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance server1\instance1 -Database main -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Install-DbaMultiTool -SqlInstance server1\instance1 -Database main -SqlCredential $cred" }

Logs into server1\instance1 with SQL authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014
```
{: data-copyable="true" data-clean-code="Install-DbaMultiTool -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014" }

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016\standardrtm", "sql2016\sqlexpress", "sql2014"
PS C:\> $servers | Install-DbaMultiTool
```
{: data-copyable="true" data-clean-code="$servers = &quot;sql2016\standardrtm&quot;, &quot;sql2016\sqlexpress&quot;, &quot;sql2014&quot;
$servers | Install-DbaMultiTool" }

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  6 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance sql2016 -Branch development
```
{: data-copyable="true" data-clean-code="Install-DbaMultiTool -SqlInstance sql2016 -Branch development" }

Installs the development branch version of the DBA MultiTool in the main database on sql2016 instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Branch

Specifies which branch of the DBA MultiTool repository to download and install. Defaults to 'main' for stable releases.  
Use 'development' only when you need to test upcoming features or bug fixes before they are officially released.  
The development branch may contain untested code and should not be used in production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | main |
| Accepted Values | main,development |

##### -Database

Specifies the target database where the five DBA MultiTool stored procedures will be installed. Defaults to 'master' database if not specified.  
Choose a dedicated DBA or utility database to keep administrative procedures organized and separate from application databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -LocalFile

Specifies the path to a local zip file containing the DBA MultiTool scripts instead of downloading from GitHub.  
Use this when installing in environments without internet access, when you need to install a specific version, or when your organization requires using pre-approved software packages.  
The file must be the official zip distribution from the DBA MultiTool maintainers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces a fresh download of the DBA MultiTool from GitHub, ignoring any locally cached version.  
Use this when you need to ensure you have the absolute latest version or when troubleshooting installation issues with cached files.  
Without this switch, the function will use the cached version if it exists to improve performance and reduce network usage.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts to confirm actions.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
