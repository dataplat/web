---
title: "Set-DbaPowerPlan"
slug: "Set-DbaPowerPlan"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures Windows power plan on SQL Server host computers to optimize database performance."
tags:
  - "PowerPlan"
  - "OS"
  - "Configure"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPowerPlan.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaPowerPlan"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaPowerPlan</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPowerPlan.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Configures Windows power plan on SQL Server host computers to optimize database performance.

## Description

Changes the Windows power plan on SQL Server host machines using WMI and PowerShell remoting. Defaults to High Performance, which prevents CPU throttling that can severely impact database query performance and response times.  
  
Windows power plans control CPU frequency scaling, and the default "Balanced" plan can cause significant performance degradation under SQL Server workloads. This function ensures your SQL Server hosts are configured for optimal performance rather than power savings.  
  
If your organization has a custom power plan considered best practice, you can specify it with -PowerPlan. The function will skip computers that already have the target power plan active.  
  
References:  
https://support.microsoft.com/en-us/kb/2207548  
http://www.sqlskills.com/blogs/glenn/windows-power-plan-effects-on-newer-intel-processors/

## Syntax

```powershell
Set-DbaPowerPlan
    [-ComputerName] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-PowerPlan] <String>]
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
PS C:\> Set-DbaPowerPlan -ComputerName sql2017
```
{: data-copyable="true" data-clean-code="Set-DbaPowerPlan -ComputerName sql2017" }

Sets the Power Plan to High Performance. Skips it if its already set.<br>

#####  Example:  2 

```powershell
PS C:\> 'Server1', 'Server2' | Set-DbaPowerPlan -PowerPlan Balanced
```
{: data-copyable="true" data-clean-code="'Server1', 'Server2' | Set-DbaPowerPlan -PowerPlan Balanced" }

Sets the Power Plan to Balanced for Server1 and Server2. Skips it if its already set.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential 'Domain\User'
PS C:\> Set-DbaPowerPlan -ComputerName sql2017 -Credential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential 'Domain\User'
Set-DbaPowerPlan -ComputerName sql2017 -Credential $cred" }

Connects using alternative Windows credential and sets the Power Plan to High Performance. Skips it if its already set.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaPowerPlan -ComputerName sqlcluster -PowerPlan 'Maximum Performance'
```
{: data-copyable="true" data-clean-code="Set-DbaPowerPlan -ComputerName sqlcluster -PowerPlan 'Maximum Performance'" }

Sets the Power Plan to "Maximum Performance". Skips it if its already set.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName oldserver | Set-DbaPowerPlan -ComputerName newserver1, newserver2
```
{: data-copyable="true" data-clean-code="Get-DbaPowerPlan -ComputerName oldserver | Set-DbaPowerPlan -ComputerName newserver1, newserver2" }

Uses the Power Plan of oldserver as best practice and sets the Power Plan of newserver1 and newserver2 accordingly.<br>

### Required Parameters

##### -ComputerName

Specifies the Windows host computers where SQL Server instances are running to configure the power plan.  
Accepts multiple server names and connects via WMI and PowerShell remoting to change OS-level power settings.  
Use the actual Windows computer names, not SQL Server instance names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -Credential

Specifies a PSCredential object to use in authenticating to the server(s), instead of the current user account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -PowerPlan

Specifies the Windows power plan to set on the target computers. Defaults to "High Performance" when not specified.  
Use this when your organization has a custom power plan or specific requirements beyond the default recommendation.  
Run Get-DbaPowerPlan -ComputerName <server> -List to see all available power plans on each computer before setting.

| Property | Value |
| --- | --- |
| Alias | CustomPowerPlan,RecommendedPowerPlan |
| Required | False |
| Pipeline | true (ByPropertyName) |
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
