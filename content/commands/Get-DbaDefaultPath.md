---
title: "Get-DbaDefaultPath"
slug: "Get-DbaDefaultPath"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves default file paths for SQL Server data, log, backup, and error log directories"
tags:
  - "Storage"
  - "Data"
  - "Log"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDefaultPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDefaultPath"
draft: false
---

# Get-DbaDefaultPath

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDefaultPath](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDefaultPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDefaultPath](https://dataplat.github.io/boh#Get-DbaDefaultPath).

## Synopsis

Retrieves default file paths for SQL Server data, log, backup, and error log directories

## Description

Retrieves the default directory paths that SQL Server uses for new database files, transaction logs, backups, and error logs. This information is essential for capacity planning, automated database provisioning, and understanding where SQL Server will place files when no explicit path is specified. The function uses multiple fallback methods to determine these paths, including server properties, system queries, and examining existing system databases when standard properties are unavailable.

## Syntax

```powershell
Get-DbaDefaultPath
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDefaultPath -SqlInstance sql01\sharepoint
```

Returns the default file paths for sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDefaultPath
```

Returns the default file paths for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Accepts named instances (server\instance) and pipeline input for batch processing.  
Use this to query multiple SQL Server instances at once to compare their default path configurations across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Use this when Windows Authentication isn't available or when you need to connect using SQL Server Authentication or service accounts.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

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


&nbsp;
