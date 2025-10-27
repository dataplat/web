---
title: "Remove-DbaPfDataCollectorSet"
slug: "Remove-DbaPfDataCollectorSet"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes Windows Performance Monitor Data Collector Sets from local or remote computers"
tags:
  - "PerfMon"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaPfDataCollectorSet.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaPfDataCollectorSet"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaPfDataCollectorSet</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaPfDataCollectorSet.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Removes Windows Performance Monitor Data Collector Sets from local or remote computers

## Description

Removes Windows Performance Monitor Data Collector Sets that are no longer needed for SQL Server performance monitoring. This is useful for cleaning up old monitoring configurations, freeing disk space, or standardizing performance monitoring setups across your SQL Server environment. The collector set must be stopped before removal - running collector sets will generate an error and must be stopped first using Stop-DbaPfDataCollectorSet. When removing collector sets from the local computer, administrator privileges are required.

## Syntax

```powershell
Remove-DbaPfDataCollectorSet
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CollectorSet] <String[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaPfDataCollectorSet
```
{: data-copyable="true" data-clean-code="Remove-DbaPfDataCollectorSet" }

Prompts for confirmation then removes all ready Collectors on localhost.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaPfDataCollectorSet -ComputerName sql2017 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Remove-DbaPfDataCollectorSet -ComputerName sql2017 -Confirm:$false" }

Attempts to remove all ready Collectors on localhost and does not prompt to confirm.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaPfDataCollectorSet -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'
```
{: data-copyable="true" data-clean-code="Remove-DbaPfDataCollectorSet -ComputerName sql2017, sql2016 -Credential ad\sqldba -CollectorSet 'System Correlation'" }

Prompts for confirmation then removes the 'System Correlation' Collector on sql2017 and sql2016 using alternative credentials.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Remove-DbaPfDataCollectorSet
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Remove-DbaPfDataCollectorSet" }

Removes the 'System Correlation' Collector.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Stop-DbaPfDataCollectorSet | Remove-DbaPfDataCollectorSet
```
{: data-copyable="true" data-clean-code="Get-DbaPfDataCollectorSet -CollectorSet 'System Correlation' | Stop-DbaPfDataCollectorSet | Remove-DbaPfDataCollectorSet" }

Stops and removes the 'System Correlation' Collector.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where Performance Monitor Data Collector Sets will be removed. Supports multiple computers for bulk operations.  
Use this when removing collector sets from remote SQL Server hosts or when standardizing monitoring configurations across multiple servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the target computer using alternative credentials. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CollectorSet

Specifies the exact name(s) of the Performance Monitor Data Collector Sets to remove. Accepts multiple collector set names for batch operations.  
Use this when you need to remove specific monitoring configurations rather than all available collector sets on the target computer.

| Property | Value |
| --- | --- |
| Alias | DataCollectorSet |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Data Collector Set objects from Get-DbaPfDataCollectorSet for pipeline operations. Enables chaining commands together for workflow automation.  
Use this when you need to filter collector sets with Get-DbaPfDataCollectorSet first, then remove only the matching results.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
