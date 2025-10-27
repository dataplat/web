---
title: "Install-DbaWhoIsActive"
slug: "Install-DbaWhoIsActive"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Downloads and installs sp_WhoIsActive stored procedure for real-time SQL Server session monitoring"
tags:
  - "Community"
  - "WhoIsActive"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaWhoIsActive.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaWhoIsActive"
draft: false
---

# Install-DbaWhoIsActive

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Install-DbaWhoIsActive](https://github.com/dataplat/dbatools/blob/master/public/Install-DbaWhoIsActive.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Install-DbaWhoIsActive](https://dataplat.github.io/boh#Install-DbaWhoIsActive).

## Synopsis

Downloads and installs sp_WhoIsActive stored procedure for real-time SQL Server session monitoring

## Description

Installs Adam Machanic's sp_WhoIsActive stored procedure, the most widely-used tool for monitoring active SQL Server sessions in real-time. This procedure provides detailed information about currently running queries, blocking chains, wait statistics, and resource consumption without the overhead of SQL Server Profiler.  
  
The function automatically downloads the latest version from GitHub or uses a local file you specify. It handles installation to any database you choose, though master is recommended for server-wide availability. When sp_WhoIsActive already exists, the function performs an update instead.  
  
This eliminates the manual process of downloading, extracting, and deploying the procedure across multiple SQL Server instances. Essential for DBAs who need to quickly troubleshoot performance issues, identify blocking sessions, or monitor query execution in production environments.  
  
For more information about sp_WhoIsActive, visit http://whoisactive.com and http://sqlblog.com/blogs/adam_machanic/archive/tags/who+is+active/default.aspx  
  
Please consider donating to Adam if you find this stored procedure helpful: http://tinyurl.com/WhoIsActiveDonate

## Syntax

```powershell
Install-DbaWhoIsActive
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-LocalFile <String>]
    [-Database <Object>]
    [-EnableException]
    [-Force]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Install-DbaWhoIsActive -SqlInstance sqlserver2014a -Database master
```

Downloads sp_WhoisActive from the internet and installs to sqlserver2014a's master database. Connects to SQL Server using Windows Authentication.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaWhoIsActive -SqlInstance sqlserver2014a -SqlCredential $cred
```

Pops up a dialog box asking which database on sqlserver2014a you want to install the procedure into. Connects to SQL Server using SQL Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaWhoIsActive -SqlInstance sqlserver2014a -Database master -LocalFile c:\SQLAdmin\sp_WhoIsActive.sql
```

Installs sp_WhoisActive to sqlserver2014a's master database from the local file sp_WhoIsActive.sql.<br>
You can download this file from https://github.com/amachanic/sp_whoisactive/blob/master/sp_WhoIsActive.sql<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaWhoIsActive -SqlInstance sqlserver2014a -Database master -LocalFile c:\SQLAdmin\sp_whoisactive-12.00.zip
```

Installs sp_WhoisActive to sqlserver2014a's master database from the local file sp_whoisactive-12.00.zip.<br>
You can download this file from https://github.com/amachanic/sp_whoisactive/releases<br>

#####  Example:  5 

```powershell
PS C:\> $instances = Get-DbaRegServer sqlserver
PS C:\> Install-DbaWhoIsActive -SqlInstance $instances -Database master
```

Installs sp_WhoisActive to all servers within CMS<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2005 or higher.

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

##### -LocalFile

Specifies the path to a local copy of sp_WhoIsActive instead of downloading from GitHub. Accepts either the zip file or the extracted SQL script.  
Use this when your SQL Server instances don't have internet access, when you need to deploy a specific version, or when you have customized the procedure.  
If not specified, the function automatically downloads the latest version from the official GitHub repository.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database where sp_WhoIsActive will be installed. Defaults to master database if not specified in interactive mode.  
Installing in master makes the procedure available server-wide, while installing in a user database limits access to that database only.  
When running unattended or in scripts, this parameter is mandatory to avoid interactive prompts.

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

##### -Force

Forces a fresh download of sp_WhoIsActive from GitHub, bypassing any locally cached version.  
Use this when you need to ensure you have the absolute latest version or when troubleshooting installation issues with cached files.

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
