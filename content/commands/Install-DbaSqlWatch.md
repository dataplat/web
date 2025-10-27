---
title: "Install-DbaSqlWatch"
slug: "Install-DbaSqlWatch"
date: 2024-01-01
layout: "single"
author: "Ken K (github.com/koglerk)"
availability: "Windows, Linux, macOS"
synopsis: "Installs or updates SqlWatch monitoring solution on SQL Server instances."
tags:
  - "Community"
  - "SqlWatch"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaSqlWatch.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaSqlWatch"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Install-DbaSqlWatch</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Install-DbaSqlWatch.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Ken K (github.com/koglerk)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Installs or updates SqlWatch monitoring solution on SQL Server instances.

## Description

Deploys SqlWatch, an open-source SQL Server monitoring and performance collection tool, to one or more SQL Server instances. SqlWatch continuously gathers performance metrics, wait statistics, and system information into dedicated tables for historical analysis and alerting.  
  
This function automatically downloads the latest SqlWatch release from GitHub (or uses a local file), then deploys it to the specified database using DACPAC technology. SqlWatch creates its own database objects to collect and store performance data, making it useful for DBAs who need ongoing monitoring without third-party agents or expensive monitoring solutions.  
  
The installed SqlWatch system runs autonomously via SQL Agent jobs, collecting data at regular intervals. It includes a web dashboard for viewing metrics and can be customized for specific monitoring requirements.  
  
More information: https://sqlwatch.io/

## Syntax

```powershell
Install-DbaSqlWatch
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-LocalFile] <String>]
    [-PreRelease]
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
PS C:\> Install-DbaSqlWatch -SqlInstance server1
```
{: data-copyable="true" data-clean-code="Install-DbaSqlWatch -SqlInstance server1" }

Logs into server1 with Windows authentication and then installs SqlWatch in the SQLWATCH database.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaSqlWatch -SqlInstance server1\instance1 -Database DBA
```
{: data-copyable="true" data-clean-code="Install-DbaSqlWatch -SqlInstance server1\instance1 -Database DBA" }

Logs into server1\instance1 with Windows authentication and then installs SqlWatch in the DBA database.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaSqlWatch -SqlInstance server1\instance1 -Database DBA -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Install-DbaSqlWatch -SqlInstance server1\instance1 -Database DBA -SqlCredential $cred" }

Logs into server1\instance1 with SQL authentication and then installs SqlWatch in the DBA database.<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaSqlWatch -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014
```
{: data-copyable="true" data-clean-code="Install-DbaSqlWatch -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014" }

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs SqlWatch in the SQLWATCH database.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016\standardrtm", "sql2016\sqlexpress", "sql2014"
```
{: data-copyable="true" data-clean-code="$servers = &quot;sql2016\standardrtm&quot;, &quot;sql2016\sqlexpress&quot;, &quot;sql2014&quot;" }

$servers | Install-DbaSqlWatch<br>
Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs SqlWatch in the SQLWATCH database.<br>

### Required Parameters

##### -SqlInstance

SQL Server name or SMO object representing the SQL Server to connect to.

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

Specifies the target database where SqlWatch objects will be created and performance data will be stored. Defaults to SQLWATCH.  
Use this when you want to install SqlWatch into an existing database alongside other monitoring tools or when following specific naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SQLWATCH |

##### -LocalFile

Specifies the path to a local SqlWatch zip file to install instead of downloading from GitHub. Must be the official zip file distributed by SqlWatch maintainers.  
Use this when you have offline environments, want to control the specific version being deployed, or need to install from a pre-approved software repository.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PreRelease

Downloads and installs the latest pre-release (beta) version of SqlWatch instead of the stable release branch.  
Use this when you need to test new features or bug fixes that haven't been released yet, but avoid in production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Forces re-download of SqlWatch from GitHub even if a cached copy already exists locally in the dbatools data directory.  
Use this when you need to ensure you have the absolute latest version or when troubleshooting installation issues with potentially corrupted cached files.

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
