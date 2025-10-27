---
title: "Set-DbaMaxMemory"
slug: "Set-DbaMaxMemory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server 'Max Server Memory' setting using calculated recommendations or explicit values"
tags:
  - "MaxMemory"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxMemory.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaMaxMemory"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaMaxMemory</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxMemory.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Configures SQL Server 'Max Server Memory' setting using calculated recommendations or explicit values

## Description

Modifies the SQL Server 'Max Server Memory' configuration to prevent SQL Server from consuming all available system memory.  
This setting controls how much memory SQL Server can allocate for its buffer pool and other memory consumers, leaving  
adequate memory for the operating system and other applications.  
  
When no explicit value is provided, the function calculates an optimal recommendation using a proven formula that reserves  
memory based on total system RAM. This formula accounts for operating system overhead, scales appropriately for servers  
with different memory configurations, and can handle multiple SQL Server instances on the same server.  
  
Inspired by Jonathan Kehayias's post about SQL Server Max memory (http://bit.ly/sqlmemcalc), this uses a formula to  
determine the default optimum RAM to use, then sets the SQL max value to that number.  
  
Jonathan notes that the formula used provides a *general recommendation* that doesn't account for everything that may  
be going on in your specific environment.

## Syntax

```powershell
Set-DbaMaxMemory
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Max] <Int32>]
    [[-InputObject] <PSObject[]>]
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
PS C:\> Set-DbaMaxMemory sqlserver1
```
{: data-copyable="true" data-clean-code="Set-DbaMaxMemory sqlserver1" }

Set max memory to the recommended on just one server named "sqlserver1"<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaMaxMemory -SqlInstance sqlserver1 -Max 2048
```
{: data-copyable="true" data-clean-code="Set-DbaMaxMemory -SqlInstance sqlserver1 -Max 2048" }

Explicitly set max memory to 2048 on just one server, "sqlserver1"<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver | Test-DbaMaxMemory | Where-Object { $_.MaxValue -gt $_.Total } | Set-DbaMaxMemory
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlserver | Test-DbaMaxMemory | Where-Object { $_.MaxValue -gt $_.Total } | Set-DbaMaxMemory" }

Find all servers in SQL Server Central Management Server that have Max SQL memory set to higher than the total memory<br>
of the server (think 2147483647), then pipe those to Set-DbaMaxMemory and use the default recommendation.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -Max

Specifies the explicit maximum memory value in megabytes for SQL Server to use. When provided, this overrides the automatic memory recommendation calculation.  
Use this when you need a specific memory allocation that differs from the calculated recommendation, such as reserving memory for other applications or setting conservative limits for shared servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -InputObject

Accepts output objects from Test-DbaMaxMemory containing memory analysis results for one or more SQL Server instances.  
Use this to pipeline memory testing results directly into memory configuration, allowing you to review recommendations before applying changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
