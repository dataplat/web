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

# Resolve-DbaNetworkName

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) , Simone Bizzotto (@niphold) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Resolve-DbaNetworkName](https://github.com/dataplat/dbatools/blob/master/public/Resolve-DbaNetworkName.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Resolve-DbaNetworkName](https://dataplat.github.io/boh#Resolve-DbaNetworkName).

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

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for sql2014<br>

#####  Example:  2 

```powershell
PS C:\> Resolve-DbaNetworkName -ComputerName sql2016, sql2014
```

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for sql2016 and sql2014<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Resolve-DbaNetworkName
```

Returns a custom object displaying InputName, ComputerName, IPAddress, DNSHostName, DNSDomain, Domain, DNSHostEntry, FQDN, DNSHostEntry for all SQL Servers returned by Get-DbaRegServer<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014, sql2016\sqlexpress | Resolve-DbaNetworkName
```

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
