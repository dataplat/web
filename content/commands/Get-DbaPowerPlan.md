---
title: "Get-DbaPowerPlan"
slug: "Get-DbaPowerPlan"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows Power Plan configuration from SQL Server hosts to verify High Performance settings."
tags:
  - "PowerPlan"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPowerPlan.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPowerPlan"
draft: false
---

# Get-DbaPowerPlan

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPowerPlan](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPowerPlan.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPowerPlan](https://dataplat.github.io/boh#Get-DbaPowerPlan).

## Synopsis

Retrieves Windows Power Plan configuration from SQL Server hosts to verify High Performance settings.

## Description

Checks the active Windows Power Plan configuration on SQL Server host computers to ensure they follow performance best practices. SQL Server performance can be significantly impacted by power management settings that throttle CPU frequency or put processors to sleep during idle periods.  
  
By default, returns the currently active power plan for each specified computer. Use the -List parameter to view all available power plans and their status. Microsoft recommends using the "High Performance" power plan for SQL Server hosts to prevent CPU throttling and ensure consistent database performance.

## Syntax

```powershell
Get-DbaPowerPlan
    [-ComputerName] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-List]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName sql2017
```

Gets the Power Plan settings for sql2017<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName sql2017 -Credential ad\admin
```

Gets the Power Plan settings for sql2017 using an alternative credential<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName sql2017 -List
```

Gets all available Power Plans on sql2017<br>

### Required Parameters

##### -ComputerName

Specifies the SQL Server host computer(s) to check for Windows Power Plan configuration. Accepts multiple server names for bulk power plan auditing.  
Use this to verify that your SQL Server hosts are configured with the recommended "High Performance" power plan instead of "Balanced" or "Power Saver" modes that can throttle CPU performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Specifies a PSCredential object to use in authenticating to the server(s), instead of the current user account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -List

Returns all available power plans on the target computers instead of just the currently active plan. Shows the status of each plan including which one is active.  
Use this when you need to see all power plan options available on a server before making configuration changes or to audit power plan availability across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
