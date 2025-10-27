---
title: "Install-DbaDarlingData"
slug: "Install-DbaDarlingData"
date: 2024-01-01
layout: "single"
author: "Ant Green (@ant_green)"
availability: "Windows, Linux, macOS"
synopsis: "Downloads and installs Erik Darling's performance monitoring stored procedures"
tags:
  - "Community"
  - "Erik Darling"
  - "DarlingData"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaDarlingData.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaDarlingData"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Install-DbaDarlingData</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Install-DbaDarlingData.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Ant Green (@ant_green)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Downloads and installs Erik Darling's performance monitoring stored procedures

## Description

Downloads, extracts and installs Erik Darling's collection of performance monitoring stored procedures from the DarlingData GitHub repository. This gives you access to popular diagnostic tools like sp_HumanEvents for extended events analysis, sp_PressureDetector for memory pressure monitoring, sp_QuickieStore for Query Store analysis, and several others that help with SQL Server performance troubleshooting. The function handles version compatibility automatically (for example, skipping sp_QuickieStore on SQL Server versions below 2016) and only installs the stored procedures themselves, not other repository contents like views or documentation.  
  
DarlingData links:  
https://www.erikdarling.com  
https://github.com/erikdarlingdata/DarlingData

## Syntax

```powershell
Install-DbaDarlingData
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object>]
    [[-Branch] <String>]
    [[-Procedure] <String[]>]
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
PS C:\> Install-DbaDarlingData -SqlInstance server1 -Database master
```
{: data-copyable="true" data-clean-code="Install-DbaDarlingData -SqlInstance server1 -Database master" }

Logs into server1 with Windows authentication and then installs all of Erik's scripts in the master database.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaDarlingData -SqlInstance server1\instance1 -Database DBA
```
{: data-copyable="true" data-clean-code="Install-DbaDarlingData -SqlInstance server1\instance1 -Database DBA" }

Logs into server1\instance1 with Windows authentication and then installs all of Erik's scripts in the DBA database.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaDarlingData -SqlInstance server1\instance1 -Database master -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Install-DbaDarlingData -SqlInstance server1\instance1 -Database master -SqlCredential $cred" }

Logs into server1\instance1 with SQL authentication and then installs all of Erik's scripts in the master database.<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaDarlingData -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014
```
{: data-copyable="true" data-clean-code="Install-DbaDarlingData -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014" }

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs al of Erik's scripts in the master database.<br>

#####  Example:  5 

```powershell
PS C:\> Install-DbaDarlingData -SqlInstance sql2016 -Branch dev
```
{: data-copyable="true" data-clean-code="Install-DbaDarlingData -SqlInstance sql2016 -Branch dev" }

Installs the dev branch version of Erik's scripts in the master database on sql2016 instance.<br>

#####  Example:  6 

```powershell
PS C:\> Install-DbaDarlingData -SqlInstance server1\instance1 -Database DBA -Procedure Human, Pressure
```
{: data-copyable="true" data-clean-code="Install-DbaDarlingData -SqlInstance server1\instance1 -Database DBA -Procedure Human, Pressure" }

Logs into server1\instance1 with Windows authentication and then installs sp_HumanEvents and sp_PressureDetector of Erik's scripts in the DBA database.<br>

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

##### -Database

Specifies the target database where Erik Darling's performance monitoring stored procedures will be installed.  
Commonly set to master, DBA, or a dedicated administrative database where diagnostic procedures are centralized.  
The database must already exist on the target instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -Branch

Specifies which branch of the DarlingData repository to install from.  
Use 'main' for the latest stable release or 'dev' for experimental features and bug fixes.  
The dev branch may contain newer procedures or fixes not yet available in the main branch.  
Allowed values:  
    main (default)  
    dev

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | main |
| Accepted Values | main,dev |

##### -Procedure

Specifies which specific performance monitoring procedures to install instead of the complete collection.  
Use this when you only need particular diagnostic tools or want to avoid installing procedures you don't use.  
Each procedure addresses different performance areas: HumanEvents for extended events analysis, PressureDetector for memory pressure monitoring, QuickieStore for Query Store analysis.  
Allowed Values or Combination of Values:  
    All (default, to install all procedures)  
    HumanEvents (to install sp_HumanEvents)  
    PressureDetector (to install sp_PressureDetector)  
    QuickieStore (to install sp_QuickieStore)  
    HumanEventsBlockViewer (to install sp_HumanEventsBlockViewer)  
    LogHunter (to install sp_LogHunter)  
    HealthParser (to install sp_HealthParser)  
    IndexCleanup (to install sp_IndexCleanup)  
    PerfCheck (to install sp_PerfCheck)  
The following shorthands are allowed, ordered as above: Human, Pressure, Quickie, Block, Log, Health, Index, Perf.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Human,HumanEvents,Pressure,PressureDetector,Quickie,QuickieStore,Block,HumanEventsBlockViewer,Log,LogHunter,Health,HealthParser,Index,IndexCleanup,Perf,PerfCheck |

##### -LocalFile

Specifies the path to a local zip file containing the DarlingData procedures instead of downloading from GitHub.  
Use this when internet access is restricted, when you need to install a specific version, or when you have a pre-downloaded copy.  
The file must be the official zip distribution from the DarlingData repository maintainers.  
If this parameter is not specified, the latest version will be downloaded and installed from https://github.com/erikdarlingdata/DarlingData

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces a fresh download of the DarlingData procedures even if a cached version already exists locally.  
Use this when you need to ensure you have the absolute latest version or when troubleshooting installation issues.  
Without this switch, the function uses the cached version if available to improve performance.

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

Prompts to confirm actions

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
