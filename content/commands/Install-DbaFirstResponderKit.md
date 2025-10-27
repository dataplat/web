---
title: "Install-DbaFirstResponderKit"
slug: "Install-DbaFirstResponderKit"
date: 2024-01-01
layout: "single"
author: "Tara Kizer, Brent Ozar Unlimited (brentozar.com)"
availability: "Windows, Linux, macOS"
synopsis: "Downloads and installs Brent Ozar's First Responder Kit diagnostic stored procedures."
tags:
  - "Community"
  - "FirstResponderKit"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaFirstResponderKit.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaFirstResponderKit"
draft: false
---

# Install-DbaFirstResponderKit

| Property | Value |
| --- | --- |
| **Author** | Tara Kizer, Brent Ozar Unlimited (brentozar.com) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Install-DbaFirstResponderKit](https://github.com/dataplat/dbatools/blob/master/public/Install-DbaFirstResponderKit.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Install-DbaFirstResponderKit](https://dataplat.github.io/boh#Install-DbaFirstResponderKit).

## Synopsis

Downloads and installs Brent Ozar's First Responder Kit diagnostic stored procedures.

## Description

Downloads and installs the First Responder Kit (FRK), a collection of stored procedures designed for SQL Server health checks, performance analysis, and troubleshooting. The FRK includes essential procedures like sp_Blitz for overall health assessment, sp_BlitzCache for query performance analysis, sp_BlitzIndex for index recommendations, and sp_BlitzFirst for real-time performance monitoring.  
  
This function automatically downloads the latest version from GitHub, caches it locally, and installs the procedures into your specified database. You can install the complete toolkit or select specific procedures based on your needs. The function handles version compatibility automatically, skipping procedures that aren't supported on older SQL Server versions.  
  
Perfect for DBAs who need standardized diagnostic tools across multiple SQL Server instances without manually downloading and deploying scripts.  
  
First Responder Kit links:  
http://FirstResponderKit.org  
https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit

## Syntax

```powershell
Install-DbaFirstResponderKit
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Branch] <String>]
    [[-Database] <Object>]
    [[-LocalFile] <String>]
    [[-OnlyScript] <String[]>]
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
PS C:\> Install-DbaFirstResponderKit -SqlInstance server1 -Database master
```

Logs into server1 with Windows authentication and then installs the FRK in the master database.<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance server1\instance1 -Database DBA
```

Logs into server1\instance1 with Windows authentication and then installs the FRK in the DBA database.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance server1\instance1 -Database master -SqlCredential $cred
```

Logs into server1\instance1 with SQL authentication and then installs the FRK in the master database.<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance sql2016\standardrtm, sql2016\sqlexpress, sql2014
```

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs the FRK in the master database.<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016\standardrtm", "sql2016\sqlexpress", "sql2014"
PS C:\> $servers | Install-DbaFirstResponderKit
```

Logs into sql2016\standardrtm, sql2016\sqlexpress and sql2014 with Windows authentication and then installs the FRK in the master database.<br>

#####  Example:  6 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance sql2016 -Branch dev
```

Installs the dev branch version of the FRK in the master database on sql2016 instance.<br>

#####  Example:  7 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance sql2016 -OnlyScript sp_Blitz.sql, sp_BlitzWho.sql, SqlServerVersions.sql
```

Installs only the procedures sp_Blitz and sp_BlitzWho and the table SqlServerVersions by running the corresponding scripts.<br>

#####  Example:  8 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance sql2016 -OnlyScript Install-All-Scripts.sql
```

Installs the First Responder Kit using the official install script.<br>

#####  Example:  9 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance sql-server-001.database.windows.net -OnlyScript Install-Azure.sql
```

Installs the First Responder Kit using the official install script for Azure SQL Database.<br>

#####  Example:  10 

```powershell
PS C:\> Install-DbaFirstResponderKit -SqlInstance sql2016 -OnlyScript Uninstall.sql
```

Uninstalls the First Responder Kit by running the official uninstall script.<br>

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

Specifies which GitHub branch of the First Responder Kit to download and install. Defaults to 'main' for the stable release.  
Use 'dev' to install the development branch when you need the latest features or bug fixes that haven't been released yet.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | main |
| Accepted Values | main,dev |

##### -Database

Specifies the target database where the First Responder Kit stored procedures will be installed. Defaults to master.  
Consider using a dedicated DBA or utility database instead of master for better organization and maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -LocalFile

Specifies the path to a local zip file containing the First Responder Kit scripts instead of downloading from GitHub.  
Use this when you have a specific version cached locally, when internet access is restricted, or when you need to install a customized version of the toolkit.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OnlyScript

Specifies specific script files to install instead of the entire First Responder Kit. Accepts multiple script names and wildcards.  
Use this to install only the procedures you need (like sp_Blitz.sql, sp_BlitzCache.sql) or to run official install scripts (Install-All-Scripts.sql, Install-Azure.sql). Also supports Uninstall.sql to   
remove the toolkit.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Install-All-Scripts.sql,Install-Azure.sql,sp_Blitz.sql,sp_BlitzFirst.sql,sp_BlitzIndex.sql,sp_BlitzCache.sql,sp_BlitzWho.sql,sp_BlitzAnalysis.sql,sp_BlitzBackups.sql,sp_BlitzLock.sql,sp_DatabaseRestore.sql,sp_ineachdb.sql,SqlServerVersions.sql,Uninstall.sql |

##### -Force

Forces a fresh download of the First Responder Kit from GitHub even if a cached version already exists locally.  
Use this when you want to ensure you have the absolute latest version or when the cached version may be corrupted.

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
