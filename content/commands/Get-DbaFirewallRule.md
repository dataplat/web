---
title: "Get-DbaFirewallRule"
slug: "Get-DbaFirewallRule"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows firewall rules for SQL Server components from target computers for network troubleshooting and security auditing."
tags:
  - "Network"
  - "Connection"
  - "Firewall"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFirewallRule.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaFirewallRule"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaFirewallRule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFirewallRule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andreas Jordan (@JordanOrdix), ordix.de</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves Windows firewall rules for SQL Server components from target computers for network troubleshooting and security auditing.

## Description

Retrieves Windows firewall rules for SQL Server components from target computers, helping DBAs troubleshoot connectivity issues and audit network security configurations. This command queries firewall rules for the SQL Server Engine, Browser service, and Dedicated Admin Connection (DAC) to identify which ports are open and what programs are allowed through the firewall.  
  
Most useful when SQL Server connections are failing and you need to verify firewall rules are correctly configured, or when conducting security audits to document which SQL Server ports are exposed. The command only works with standardized firewall rules created by New-DbaFirewallRule, as it relies on specific group names and naming conventions.  
  
This is a wrapper around Get-NetFirewallRule executed at the target computer, so the NetSecurity PowerShell module must be available on the remote system. The command returns detailed information including port numbers, protocols, and executable paths for each firewall rule.  
  
The functionality is currently limited. Help to extend the functionality is welcome.  
  
As long as you can read this note here, there may be breaking changes in future versions.  
So please review your scripts using this command after updating dbatools.

## Syntax

```powershell
Get-DbaFirewallRule
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-Type] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1
```
{: data-copyable="true" data-clean-code="Get-DbaFirewallRule -SqlInstance SRV1" }

Returns the firewall rule for the default instance on SRV1.<br>
In case the instance is not listening on port 1433, it also returns the firewall rule for the SQL Server Browser.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Engine
```
{: data-copyable="true" data-clean-code="Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Engine" }

Returns only the firewall rule for the instance SQL2016 on SRV1.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Browser
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1 -Type Browser
```
{: data-copyable="true" data-clean-code="Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Browser
Get-DbaFirewallRule -SqlInstance SRV1 -Type Browser" }

Both commands return the firewall rule for the SQL Serer Browser on SRV1.<br>
As the Browser is not bound to a specific instance, only the computer part of SqlInstance is used.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type AllInstance
```
{: data-copyable="true" data-clean-code="Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type AllInstance" }

Returns all firewall rules on the computer SRV1 related to SQL Server.<br>
The value "AllInstance" only uses the computer name part of SqlInstance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Credential object used to connect to the Computer as a different user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies which SQL Server firewall rule types to retrieve from the target computer.  
Use this when you need to focus on specific SQL Server components during network troubleshooting or security audits.  
Valid values are:  
* Engine - Returns firewall rules for the SQL Server Database Engine service  
* Browser - Returns firewall rules for the SQL Server Browser service (UDP 1434)  
* DAC - Returns firewall rules for the Dedicated Admin Connection  
* DatabaseMirroring - Returns firewall rules for database mirroring or Availability Groups  
* AllInstance - Returns all SQL Server-related firewall rules on the target computer  
When omitted, returns Engine and DAC rules for the specified instance, plus Browser rules if the instance uses a non-standard port.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Engine,Browser,DAC,DatabaseMirroring,AllInstance |

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
