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

# Install-DbaMultiTool

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Install-DbaMultiTool](https://github.com/dataplat/dbatools/blob/master/public/Install-DbaMultiTool.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Install-DbaMultiTool](https://dataplat.github.io/boh#Install-DbaMultiTool).

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

Logs into server1 with Windows authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance server1\instance1 -Database DBA
```

Logs into server1\instance1 with Windows authentication and then installs the DBA MultiTool in the DBA database.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance server1\instance1 -Database main -SqlCredential $cred
```

Logs into server1\instance1 with SQL authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014
```

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016\standardrtm", "sql2016\sqlexpress", "sql2014"
PS C:\> $servers | Install-DbaMultiTool
```

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs the DBA MultiTool in the main database.<br>

#####  Example:  6 

```powershell
PS C:\> Install-DbaMultiTool -SqlInstance sql2016 -Branch development
```

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
