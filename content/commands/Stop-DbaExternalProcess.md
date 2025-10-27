---
title: "Stop-DbaExternalProcess"
slug: "Stop-DbaExternalProcess"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Terminates operating system processes spawned by SQL Server instances"
tags:
  - "Diagnostic"
  - "Process"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaExternalProcess.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaExternalProcess"
draft: false
---

# Stop-DbaExternalProcess

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaExternalProcess](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaExternalProcess.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaExternalProcess](https://dataplat.github.io/boh#Stop-DbaExternalProcess).

## Synopsis

Terminates operating system processes spawned by SQL Server instances

## Description

Terminates external processes that were created by SQL Server, such as those spawned by xp_cmdshell, BCP operations, SSIS packages, or external script executions. This function is designed to work with the output from Get-DbaExternalProcess to resolve specific performance issues.  
  
The primary use case is troubleshooting hung SQL Server sessions that display External Wait Types like WAITFOR_RESULTS or EXTERNAL_SCRIPT_NETWORK_IO. When SQL Server is waiting for an external process to complete and that process becomes unresponsive, this command provides a safe way to terminate the problematic process without affecting the SQL Server service itself.  
  
This approach is much more targeted than killing SQL Server sessions directly, as it addresses the root cause (the stuck external process) rather than just terminating the database connection that's waiting for it.  
  
https://web.archive.org/web/20201027122300/http://vickyharp.com/2013/12/killing-sessions-with-external-wait-types/

## Syntax

```powershell
Stop-DbaExternalProcess
    [-ComputerName] <DbaInstanceParameter>
    [[-Credential] <PSCredential>]
    [[-ProcessId] <Int32>]
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
PS C:\> Get-DbaExternalProcess -ComputerName SQL01 | Stop-DbaExternalProcess
```

Kills all OS processes created by SQL Server on SQL01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaExternalProcess -ComputerName SQL01 | Where-Object Name -eq "cmd.exe" | Stop-DbaExternalProcess
```

Kills all cmd.exe processes created by SQL Server on SQL01<br>

### Required Parameters

##### -ComputerName

Specifies the Windows server hosting the SQL Server instance where external processes need to be terminated.  
Use this when troubleshooting hung sessions with external wait types on remote SQL Server hosts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -Credential

Allows you to login to $ComputerName using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -ProcessId

Specifies the Windows process ID of the external process spawned by SQL Server that needs to be terminated.  
Typically obtained from Get-DbaExternalProcess output when identifying processes causing EXTERNAL_SCRIPT_NETWORK_IO or WAITFOR_RESULTS wait types.

| Property | Value |
| --- | --- |
| Alias | pid |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | 0 |

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

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
