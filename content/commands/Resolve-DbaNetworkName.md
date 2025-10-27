---
title: "Resolve-DbaNetworkName"
slug: "Resolve-DbaNetworkName"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas) | Simone Bizzotto (@niphold)"
availability: "Windows, Linux, macOS"
synopsis: "Resolves network names and returns detailed network information for SQL Server connection troubleshooting and validation."
tags:
  - "Network"
  - "Connection"
  - "Resolve"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Resolve-DbaNetworkName.ps1"
bohUrl: "https://dataplat.github.io/boh#Resolve-DbaNetworkName"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Resolve-DbaNetworkName</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Resolve-DbaNetworkName.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDBAKlaas) , Simone Bizzotto (@niphold)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Resolves network names and returns detailed network information for SQL Server connection troubleshooting and validation.

## Description

Performs comprehensive network name resolution to gather detailed connection information for SQL Server instances and computers.  
This function is essential when you need to verify connectivity, troubleshoot connection issues, or validate network configurations before connecting to SQL Server.  
  
Uses multiple resolution methods including DNS lookups, ICMP ping tests, and WMI/CIM queries to ensure accurate results across different network configurations.  
First tests connectivity using ICMP to identify the responding IP address, then gathers comprehensive network details through various protocols.  
  
Important: Remember that FQDN doesn't always match "ComputerName dot Domain" as AD intends.  
There are network setup (google "disjoint domain") where AD and DNS do not match.  
"Full computer name" (as reported by sysdm.cpl) is the only match between the two,  
and it matches the "DNSHostName"  property of the computer object stored in AD.  
This means that the notation of FQDN that matches "ComputerName dot Domain" is incorrect  
in those scenarios.  
In other words, the "suffix" of the FQDN CAN be different from the AD Domain.  
  
This cmdlet has been providing good results since its inception but for lack of useful  
names some doubts may arise.  
Let this clear the doubts:  
- InputName: whatever has been passed in  
- ComputerName: hostname only  
- IPAddress: IP Address  
- DNSHostName: hostname only, coming strictly from DNS (as reported from the calling computer)  
- DNSDomain: domain only, coming strictly from DNS (as reported from the calling computer)  
- Domain: domain only, coming strictly from AD (i.e. the domain the ComputerName is joined to)  
- DNSHostEntry: Fully name as returned by DNS [System.Net.Dns]::GetHostEntry  
- FQDN: "legacy" notation of ComputerName "dot" Domain (coming from AD)  
- FullComputerName: Full name as configured from within the Computer (i.e. the only secure match between AD and DNS)  
  
So, if you need to use something, go with FullComputerName, always, as it is the most correct in every scenario.

## Syntax

```powershell
Resolve-DbaNetworkName
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-Turbo]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Resolve-DbaNetworkName -ComputerName sql2014
```
{: data-copyable="true" data-clean-code="Resolve-DbaNetworkName -ComputerName sql2014" }

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for sql2014<br>

#####  Example:  2 

```powershell
PS C:\> Resolve-DbaNetworkName -ComputerName sql2016, sql2014
```
{: data-copyable="true" data-clean-code="Resolve-DbaNetworkName -ComputerName sql2016, sql2014" }

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for sql2016 and sql2014<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Resolve-DbaNetworkName
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2014 | Resolve-DbaNetworkName" }

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for all SQL Servers returned by Get-DbaRegServer<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014, sql2016\sqlexpress | Resolve-DbaNetworkName
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2014, sql2016\sqlexpress | Resolve-DbaNetworkName" }

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for all SQL Servers returned by Get-DbaRegServer<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer name, IP address, or SQL Server instance to resolve network information for.  
Use this when troubleshooting connectivity issues or validating network configurations before connecting to SQL Server.  
Accepts computer names (SERVER01), IP addresses (192.168.1.100), SQL Server instances (SERVER01\INSTANCE), or SMO objects from Get-DbaRegServer.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Turbo

Enables DNS-only resolution mode for faster network name resolution without connecting to the target computer.  
Use this when you need quick DNS lookups but don't require comprehensive network details or WMI/CIM information.  
Results may be less accurate in disjoint-domain environments where AD and DNS configurations don't align, and may vary depending on your local DNS configuration.

| Property | Value |
| --- | --- |
| Alias | FastParrot |
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
