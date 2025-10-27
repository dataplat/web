---
title: "Get-DbaNetworkActivity"
slug: "Get-DbaNetworkActivity"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves real-time network traffic statistics for all network interfaces on SQL Server host computers."
tags:
  - "Server"
  - "Management"
  - "Network"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkActivity.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaNetworkActivity"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaNetworkActivity</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkActivity.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDBAKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves real-time network traffic statistics for all network interfaces on SQL Server host computers.

## Description

Retrieves current network activity metrics including bytes received, sent, and total throughput per second for every network interface on target computers. This function helps DBAs monitor network performance and identify bandwidth bottlenecks that could impact SQL Server performance, especially during large data transfers, backup operations, or heavy replication traffic.  
  
The function queries Windows performance counters via CIM/WMI and displays bandwidth utilization alongside interface capacity (10Gb, 1Gb, 100Mb, etc.) to quickly identify saturated network links. Essential for troubleshooting connectivity issues, monitoring backup network performance, or validating network capacity before major data migration operations.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Get-DbaNetworkActivity
    [[-ComputerName] <String[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaNetworkActivity -ComputerName sqlserver2014a
```
{: data-copyable="true" data-clean-code="Get-DbaNetworkActivity -ComputerName sqlserver2014a" }

Gets the Current traffic on every Network Interface on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaNetworkActivity
```
{: data-copyable="true" data-clean-code="'sql1','sql2','sql3' | Get-DbaNetworkActivity" }

Gets the Current traffic on every Network Interface on computers sql1, sql2 and sql3.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaNetworkActivity -ComputerName sql1,sql2
```
{: data-copyable="true" data-clean-code="Get-DbaNetworkActivity -ComputerName sql1,sql2" }

Gets the Current traffic on every Network Interface on computers sql1 and sql2.<br>

### Optional Parameters

##### -ComputerName

Specifies the computer names or SQL Server instances to monitor network activity.  
Function extracts the computer name from full instance names and resolves them to fully qualified domain names.  
Defaults to the local computer when not specified.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

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


&nbsp;
