---
title: "Test-DbaPowerPlan"
slug: "Test-DbaPowerPlan"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests Windows Power Plan settings against SQL Server best practices and identifies non-compliant systems."
tags:
  - "PowerPlan"
  - "OS"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaPowerPlan.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaPowerPlan"
draft: false
---

# Test-DbaPowerPlan

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaPowerPlan](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaPowerPlan.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaPowerPlan](https://dataplat.github.io/boh#Test-DbaPowerPlan).

## Synopsis

Tests Windows Power Plan settings against SQL Server best practices and identifies non-compliant systems.

## Description

Audits Windows Power Plan settings on SQL Server hosts to ensure compliance with Microsoft's performance recommendations. SQL Server runs optimally with the "High Performance" power plan, which prevents CPU throttling and ensures consistent performance under load.  
  
This function compares the currently active power plan against the recommended "High Performance" plan (or a custom plan you specify) and returns a compliance report. This is essential for SQL Server environments where power management can significantly impact query performance and response times.  
  
Returns detailed information including the active power plan, recommended plan, and a clear IsBestPractice indicator for each system tested. Use this for regular compliance audits, new server validations, or troubleshooting performance issues that might be related to power management settings.  
  
If your organization uses a different Power Plan that is considered best practice, specify -PowerPlan to test against that instead.  
  
References:  
https://support.microsoft.com/en-us/kb/2207548  
http://www.sqlskills.com/blogs/glenn/windows-power-plan-effects-on-newer-intel-processors/

## Syntax

```powershell
Test-DbaPowerPlan
    [-ComputerName] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-PowerPlan] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaPowerPlan -ComputerName sqlserver2014a
```

Checks the Power Plan settings for sqlserver2014a and indicates whether or not it complies with best practices.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaPowerPlan -ComputerName sqlserver2014a -PowerPlan 'Maximum Performance'
```

Checks the Power Plan settings for sqlserver2014a and indicates whether or not it is set to the Power Plan "Maximum Performance".<br>

#####  Example:  3 

```powershell
PS C:\> 'newserver1', 'newserver2' | Test-DbaPowerPlan
```

Checks the Power Plan settings for newserver1 and newserver2 and indicates whether or not they comply with best practices.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName oldserver | Test-DbaPowerPlan -ComputerName newserver1, newserver2
```

Uses the Power Plan of oldserver as best practice and tests the Power Plan of newserver1 and newserver2 against that.<br>

### Required Parameters

##### -ComputerName

Specifies the SQL Server host(s) where you want to test Windows Power Plan compliance. Accepts server names, IP addresses, or DbaInstance objects.  
Use this to audit power settings across your SQL Server environment, especially important for performance-critical instances where CPU throttling can impact query response times.

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

Specifies a custom power plan name to test against instead of the default "High Performance" plan. Use exact name matching as it appears in Windows Power Options.  
Useful when your organization has standardized on a specific custom power plan or when testing against plans like "Ultimate Performance" on Windows Server 2016+ or workstation operating systems.

| Property | Value |
| --- | --- |
| Alias | CustomPowerPlan |
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


&nbsp;
