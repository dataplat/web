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

# Get-DbaFirewallRule

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaFirewallRule](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFirewallRule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaFirewallRule](https://dataplat.github.io/boh#Get-DbaFirewallRule).

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

Returns the firewall rule for the default instance on SRV1.<br>
In case the instance is not listening on port 1433, it also returns the firewall rule for the SQL Server Browser.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Engine
```

Returns only the firewall rule for the instance SQL2016 on SRV1.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Browser
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1 -Type Browser
```

Both commands return the firewall rule for the SQL Serer Browser on SRV1.<br>
As the Browser is not bound to a specific instance, only the computer part of SqlInstance is used.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type AllInstance
```

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
