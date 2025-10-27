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

# Set-DbaPowerPlan

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaPowerPlan](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPowerPlan.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaPowerPlan](https://dataplat.github.io/boh#Set-DbaPowerPlan).

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

Sets the Power Plan to High Performance. Skips it if its already set.<br>

#####  Example:  2 

```powershell
PS C:\> 'Server1', 'Server2' | Set-DbaPowerPlan -PowerPlan Balanced
```

Sets the Power Plan to Balanced for Server1 and Server2. Skips it if its already set.<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential 'Domain\User'
PS C:\> Set-DbaPowerPlan -ComputerName sql2017 -Credential $cred
```

Connects using alternative Windows credential and sets the Power Plan to High Performance. Skips it if its already set.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaPowerPlan -ComputerName sqlcluster -PowerPlan 'Maximum Performance'
```

Sets the Power Plan to "Maximum Performance". Skips it if its already set.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName oldserver | Set-DbaPowerPlan -ComputerName newserver1, newserver2
```

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
