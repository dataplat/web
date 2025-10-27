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

# Install-DbaSqlWatch

| Property | Value |
| --- | --- |
| **Author** | Ken K (github.com/koglerk) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Install-DbaSqlWatch](https://github.com/dataplat/dbatools/blob/master/public/Install-DbaSqlWatch.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Install-DbaSqlWatch](https://dataplat.github.io/boh#Install-DbaSqlWatch).

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

Logs into server1 with Windows authentication and then installs SqlWatch in the SQLWATCH database.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaSqlWatch -SqlInstance server1\instance1 -Database DBA
```

Logs into server1\instance1 with Windows authentication and then installs SqlWatch in the DBA database.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaSqlWatch -SqlInstance server1\instance1 -Database DBA -SqlCredential $cred
```

Logs into server1\instance1 with SQL authentication and then installs SqlWatch in the DBA database.<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaSqlWatch -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014
```

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs SqlWatch in the SQLWATCH database.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016\standardrtm", "sql2016\sqlexpress", "sql2014"
```

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
