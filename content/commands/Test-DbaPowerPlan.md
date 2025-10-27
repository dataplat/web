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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaPowerPlan</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaPowerPlan.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Test-DbaPowerPlan -ComputerName sqlserver2014a" }

Checks the Power Plan settings for sqlserver2014a and indicates whether or not it complies with best practices.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaPowerPlan -ComputerName sqlserver2014a -PowerPlan 'Maximum Performance'
```
{: data-copyable="true" data-clean-code="Test-DbaPowerPlan -ComputerName sqlserver2014a -PowerPlan 'Maximum Performance'" }

Checks the Power Plan settings for sqlserver2014a and indicates whether or not it is set to the Power Plan "Maximum Performance".<br>

#####  Example:  3 

```powershell
PS C:\> 'newserver1', 'newserver2' | Test-DbaPowerPlan
```
{: data-copyable="true" data-clean-code="'newserver1', 'newserver2' | Test-DbaPowerPlan" }

Checks the Power Plan settings for newserver1 and newserver2 and indicates whether or not they comply with best practices.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPowerPlan -ComputerName oldserver | Test-DbaPowerPlan -ComputerName newserver1, newserver2
```
{: data-copyable="true" data-clean-code="Get-DbaPowerPlan -ComputerName oldserver | Test-DbaPowerPlan -ComputerName newserver1, newserver2" }

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
