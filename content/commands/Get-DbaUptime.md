---
title: "Get-DbaUptime"
slug: "Get-DbaUptime"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves uptime information for SQL Server instances and their hosting Windows servers"
tags:
  - "CIM"
  - "Instance"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaUptime.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaUptime"
draft: false
---

# Get-DbaUptime

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaUptime](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaUptime.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaUptime](https://dataplat.github.io/boh#Get-DbaUptime).

## Synopsis

Retrieves uptime information for SQL Server instances and their hosting Windows servers

## Description

This function determines SQL Server uptime by checking the tempdb creation date and calculates Windows server uptime using CIM/WMI calls to get the last boot time. Essential for monitoring system stability, troubleshooting unexpected restarts, and generating compliance reports that require uptime documentation. Returns both raw TimeSpan objects for calculations and formatted strings for reporting, covering both the SQL Server service and the underlying Windows host.

## Syntax

```powershell
Get-DbaUptime
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaUptime -SqlInstance SqlBox1\Instance2
```

Returns an object with SQL Server start time, uptime as TimeSpan object, uptime as a string, and Windows host boot time, host uptime as TimeSpan objects and host uptime as a string for the sqlexpress <br>
instance on winserver<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaUptime -SqlInstance winserver\sqlexpress, sql2016
```

Returns an object with SQL Server start time, uptime as TimeSpan object, uptime as a string, and Windows host boot time, host uptime as TimeSpan objects and host uptime as a string for the sqlexpress <br>
instance on host winserver  and the default instance on host sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Get-DbaUptime
```

Returns an object with SQL Server start time, uptime as TimeSpan object, uptime as a string, and Windows host boot time, host uptime as TimeSpan objects and host uptime as a string for every server <br>
listed in the Central Management Server on sql2014<br>

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

Specifies Windows credentials to connect to the hosting server for retrieving Windows boot time and uptime information.  
Use this when you need different credentials to access the Windows server than your current PowerShell session, such as when querying servers in different domains or when running under a service   
account that lacks WMI access.

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
