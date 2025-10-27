---
title: "Enable-DbaTraceFlag"
slug: "Enable-DbaTraceFlag"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Enables one or more trace flags globally on SQL Server instances"
tags:
  - "Diagnostic"
  - "TraceFlag"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaTraceFlag.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaTraceFlag"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Enable-DbaTraceFlag</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaTraceFlag.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Garry Bargsley (@gbargsley), blog.garrybargsley.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Enables one or more trace flags globally on SQL Server instances

## Description

Activates trace flags at the global level using DBCC TRACEON, affecting all connections and sessions on the target SQL Server instances.  
Commonly used for troubleshooting performance issues, enabling specific SQL Server behaviors, or applying recommended trace flags for your environment.  
Changes take effect immediately but are lost after a SQL Server restart - use Set-DbaStartupParameter to make trace flags persistent across restarts.  
The function automatically checks for already-enabled trace flags to prevent duplicate operations.

## Syntax

```powershell
Enable-DbaTraceFlag
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-TraceFlag] <Int32[]>
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
PS C:\> Enable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 3226
```
{: data-copyable="true" data-clean-code="Enable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 3226" }

Enable the trace flag 3226 on SQL Server instance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 1117, 1118
```
{: data-copyable="true" data-clean-code="Enable-DbaTraceFlag -SqlInstance sql2016 -TraceFlag 1117, 1118" }

Enable multiple trace flags on SQL Server instance sql2016<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -TraceFlag

Specifies one or more trace flag numbers to enable globally across all sessions on the SQL Server instance.  
Use specific trace flag numbers like 3226 (suppress backup log messages), 1117/1118 (tempdb optimization), or 4199 (query optimizer fixes).  
Multiple trace flags can be specified as an array to enable several flags in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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
