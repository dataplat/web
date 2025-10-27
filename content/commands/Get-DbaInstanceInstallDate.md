---
title: "Get-DbaInstanceInstallDate"
slug: "Get-DbaInstanceInstallDate"
date: 2024-01-01
layout: "single"
author: "Mitchell Hamann (@SirCaptainMitch), mitchellhamann.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server installation dates by querying system tables for compliance auditing and infrastructure tracking."
tags:
  - "Install"
  - "Instance"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceInstallDate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceInstallDate"
draft: false
---

# Get-DbaInstanceInstallDate

| Property | Value |
| --- | --- |
| **Author** | Mitchell Hamann (@SirCaptainMitch), mitchellhamann.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceInstallDate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceInstallDate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceInstallDate](https://dataplat.github.io/boh#Get-DbaInstanceInstallDate).

## Synopsis

Retrieves SQL Server installation dates by querying system tables for compliance auditing and infrastructure tracking.

## Description

Queries system tables (sys.server_principals or sysservers) to determine when SQL Server was originally installed on each target instance. This information is essential for compliance auditing, license management, and tracking hardware refresh cycles. The function automatically handles different SQL Server versions using the appropriate system table, and can optionally retrieve the Windows OS installation date through WMI for complete infrastructure documentation. Returns structured data including computer name, instance name, and precise installation timestamps.

## Syntax

```powershell
Get-DbaInstanceInstallDate
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-IncludeWindows]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaInstanceInstallDate -SqlInstance SqlBox1\Instance2
```

Returns an object with SQL Instance Install date as a string.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaInstanceInstallDate -SqlInstance winserver\sqlexpress, sql2016
```

Returns an object with SQL Instance Install date as a string for both SQLInstances that are passed to the cmdlet.<br>

#####  Example:  3 

```powershell
PS C:\> 'sqlserver2014a', 'sql2016' | Get-DbaInstanceInstallDate
```

Returns an object with SQL Instance Install date as a string for both SQLInstances that are passed to the cmdlet via the pipeline.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaInstanceInstallDate -SqlInstance sqlserver2014a, sql2016 -IncludeWindows
```

Returns an object with the Windows Install date and the SQL install date as a string.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Get-DbaInstanceInstallDate
```

Returns an object with SQL Instance install date as a string for every server listed in the Central Management Server on sql2014<br>

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

##### -Credential

Windows credentials used for WMI connection when retrieving Windows OS installation date with -IncludeWindows.  
Only required when the current user lacks WMI access to the target server or when connecting across domains.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeWindows

Retrieves the Windows OS installation date in addition to SQL Server installation date using WMI.  
Useful for infrastructure audits requiring both application and operating system installation timestamps.

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
