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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Stop-DbaExternalProcess</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaExternalProcess.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaExternalProcess -ComputerName SQL01 | Stop-DbaExternalProcess" }

Kills all OS processes created by SQL Server on SQL01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaExternalProcess -ComputerName SQL01 | Where-Object Name -eq "cmd.exe" | Stop-DbaExternalProcess
```
{: data-copyable="true" data-clean-code="Get-DbaExternalProcess -ComputerName SQL01 | Where-Object Name -eq &quot;cmd.exe&quot; | Stop-DbaExternalProcess" }

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
