---
title: "Get-DbaOperatingSystem"
slug: "Get-DbaOperatingSystem"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive Windows operating system details from SQL Server host machines."
tags:
  - "Management"
  - "OS"
  - "OperatingSystem"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOperatingSystem.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaOperatingSystem"
draft: false
---

# Get-DbaOperatingSystem

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaOperatingSystem](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOperatingSystem.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaOperatingSystem](https://dataplat.github.io/boh#Get-DbaOperatingSystem).

## Synopsis

Retrieves comprehensive Windows operating system details from SQL Server host machines.

## Description

Collects detailed operating system information from local or remote Windows computers hosting SQL Server instances. Returns comprehensive system details including OS version, memory configuration, power plans, time zones, and Windows Server Failover Clustering status. This information is essential for SQL Server environment assessments, capacity planning, and troubleshooting performance issues that may be related to the underlying OS configuration.

## Syntax

```powershell
Get-DbaOperatingSystem
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaOperatingSystem
```

Returns information about the local computer's operating system<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaOperatingSystem -ComputerName sql2016
```

Returns information about the sql2016's operating system<br>

#####  Example:  3 

```powershell
PS C:\> $wincred = Get-Credential ad\sqladmin
PS C:\> 'sql2016', 'sql2017' | Get-DbaOperatingSystem -Credential $wincred
```

Returns information about the sql2016 and sql2017 operating systems using alternative Windows credentials<br>

#####  Example:  4 

```powershell
PS C:\> Get-Content .\servers.txt | Get-DbaOperatingSystem
```

Returns information about all the servers operating system that are stored in the file. Every line in the file can only contain one hostname for a server.<br>

### Optional Parameters

##### -ComputerName

Specifies the computer names of SQL Server host machines to query for operating system information. Accepts multiple computer names, IP addresses, or SQL Server instance names.  
Use this when you need to collect OS details from remote servers for environment assessments, capacity planning, or troubleshooting. Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Alternate credential object to use for accessing the target computer(s).

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
