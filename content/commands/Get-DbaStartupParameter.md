---
title: "Get-DbaStartupParameter"
slug: "Get-DbaStartupParameter"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server startup parameters from the Windows service configuration"
tags:
  - "WSMan"
  - "SQLWMI"
  - "Memory"
  - "Startup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaStartupParameter.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaStartupParameter"
draft: false
---

# Get-DbaStartupParameter

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaStartupParameter](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaStartupParameter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaStartupParameter](https://dataplat.github.io/boh#Get-DbaStartupParameter).

## Synopsis

Retrieves SQL Server startup parameters from the Windows service configuration

## Description

Extracts and parses SQL Server startup parameters directly from the Windows service configuration using WMI. Returns detailed information about file paths (master database, transaction log, error log), trace flags, debug flags, and special startup modes like single-user or minimal start.  
  
Useful for troubleshooting startup issues, documenting server configurations, and verifying trace flag settings without connecting to SQL Server itself. Requires Windows credentials and WMI access to the target server.  
  
See https://msdn.microsoft.com/en-us/library/ms190737.aspx for more information.

## Syntax

```powershell
Get-DbaStartupParameter
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-Simple]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaStartupParameter -SqlInstance sql2014
```

Logs into SQL WMI as the current user then displays the values for numerous startup parameters.<br>

#####  Example:  2 

```powershell
PS C:\> $wincred = Get-Credential ad\sqladmin
PS C:\> Get-DbaStartupParameter -SqlInstance sql2014 -Credential $wincred -Simple
```

Logs in to WMI using the ad\sqladmin credential and gathers simplified information about the SQL Server Startup Parameters.<br>

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

##### -Credential

Allows you to login to servers using alternate Windows credentials.  
$scred = Get-Credential, then pass $scred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias | SqlCredential |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Simple

Returns only essential startup information: file paths (master data, master log, error log), trace flags, and the complete parameter string.  
Use this when you need a quick overview without detailed startup mode flags like single-user, minimal start, or monitoring settings.

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
