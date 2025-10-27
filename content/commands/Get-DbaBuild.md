---
title: "Get-DbaBuild"
slug: "Get-DbaBuild"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold) | Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed SQL Server build information including service pack, cumulative update, KB articles, and support lifecycle dates"
tags:
  - "SqlBuild"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBuild.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaBuild"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaBuild</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBuild.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Simone Bizzotto (@niphold) , Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves detailed SQL Server build information including service pack, cumulative update, KB articles, and support lifecycle dates

## Description

Identifies the specific build version of SQL Server instances and translates build numbers into meaningful patch levels with their corresponding KB articles.  
This function helps DBAs quickly determine what service packs and cumulative updates are installed, whether builds have been retired by Microsoft, and when support ends.  
You can query live SQL Server instances, look up specific build numbers, search by KB article numbers, or find builds by specifying major version with service pack and cumulative update combinations.  
The function maintains an offline reference index that can be updated online to ensure current patch information and accurate support lifecycle dates.

## Syntax

```powershell
Get-DbaBuild
    [[-Build] <Version[]>]
    [[-Kb] <String[]>]
    [[-MajorVersion] <String>]
    [[-ServicePack] <String>]
    [[-CumulativeUpdate] <String>]
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Update]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaBuild -Build "12.00.4502"
```
{: data-copyable="true" data-clean-code="Get-DbaBuild -Build &quot;12.00.4502&quot;" }

Returns information about a build identified by  "12.00.4502" (which is SQL 2014 with SP1 and CU11)<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaBuild -Build "12.00.4502" -Update
```
{: data-copyable="true" data-clean-code="Get-DbaBuild -Build &quot;12.00.4502&quot; -Update" }

Returns information about a build trying to fetch the most up to date index online. When the online version is newer, the local one gets overwritten<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaBuild -Build "12.0.4502","10.50.4260"
```
{: data-copyable="true" data-clean-code="Get-DbaBuild -Build &quot;12.0.4502&quot;,&quot;10.50.4260&quot;" }

Returns information builds identified by these versions strings<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a | Get-DbaBuild
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver2014a | Get-DbaBuild" }

Integrate with other cmdlets to have builds checked for all your registered servers on sqlserver2014a<br>

### Optional Parameters

##### -Build

Specifies SQL Server build numbers to look up without connecting to live instances. Accepts version strings like "12.00.4502" or "13.0.5026".  
Use this when you need to identify what service pack and cumulative update a specific build number represents, or to verify patch levels from installation logs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Kb

Looks up SQL Server build information using Knowledge Base article numbers. Accepts formats like "KB4057119" or just "4057119".  
Use this when you have a KB number from Microsoft documentation or patch notes and need to identify the corresponding SQL Server build version and patch level.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MajorVersion

Specifies the SQL Server major version to look up build information for specific version and patch level combinations. Accepts formats like "SQL2016", "2016", or "2008R2".  
Use this with -ServicePack and -CumulativeUpdate parameters when you need to find the exact build number for a specific SQL Server version and patch level combination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServicePack

Specifies the service pack level when looking up builds by major version. Accepts formats like "SP1", "1", or "RTM" for initial release. Defaults to "RTM".  
Requires the -MajorVersion parameter and can be combined with -CumulativeUpdate to pinpoint exact patch levels.

| Property | Value |
| --- | --- |
| Alias | SP |
| Required | False |
| Pipeline | false |
| Default Value | RTM |

##### -CumulativeUpdate

Specifies the cumulative update level when looking up builds by major version and service pack. Accepts formats like "CU5", "5", or "CU0" for base service pack.  
Requires the -MajorVersion parameter and works in combination with -ServicePack to identify exact patch levels within a service pack.

| Property | Value |
| --- | --- |
| Alias | CU |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlInstance

Target any number of instances, in order to return their build state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Update

Forces an online refresh of the local SQL Server build reference index from Microsoft sources. Updates the cached build database with the latest patch information and support lifecycle dates.  
Use this when the function warns about stale index data or when you need the most current patch and support information for accurate compliance reporting.

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


&nbsp;
