---
title: "Get-DbaAgentLog"
slug: "Get-DbaAgentLog"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent error log entries for troubleshooting and monitoring"
tags:
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentLog"
draft: false
---

# Get-DbaAgentLog

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentLog](https://dataplat.github.io/boh#Get-DbaAgentLog).

## Synopsis

Retrieves SQL Server Agent error log entries for troubleshooting and monitoring

## Description

Retrieves SQL Server Agent error log entries from the target instance, providing detailed information about agent service activity, job failures, and system events. This function accesses the agent's historical error logs (numbered 0-9, where 0 is the current log) so you don't have to manually navigate through SQL Server Management Studio or query system views. Essential for troubleshooting job failures, monitoring agent service health, and compliance auditing of automated processes.

## Syntax

```powershell
Get-DbaAgentLog
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LogNumber] <Int32[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentLog -SqlInstance sql01\sharepoint
```

Returns the entire error log for the SQL Agent on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentLog -SqlInstance sql01\sharepoint -LogNumber 3, 6
```

Returns log numbers 3 and 6 for the SQL Agent on sql01\sharepoint<br>

#####  Example:  3 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaAgentLog -LogNumber 0
```

Returns the most recent SQL Agent error logs for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -LogNumber

Specifies which numbered agent error log files to retrieve (0-9). Log 0 contains the most recent entries, while higher numbers contain older historical logs that get cycled as new logs are created.  
Use this when you need to examine historical agent activity or troubleshoot issues that occurred days or weeks ago, rather than just current entries.

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
