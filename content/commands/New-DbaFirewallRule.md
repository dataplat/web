---
title: "New-DbaFirewallRule"
slug: "New-DbaFirewallRule"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Creates Windows firewall rules for SQL Server instances to allow network connectivity"
tags:
  - "Network"
  - "Connection"
  - "Firewall"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaFirewallRule.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaFirewallRule"
draft: false
---

# New-DbaFirewallRule

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaFirewallRule](https://github.com/dataplat/dbatools/blob/master/public/New-DbaFirewallRule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaFirewallRule](https://dataplat.github.io/boh#New-DbaFirewallRule).

## Synopsis

Creates Windows firewall rules for SQL Server instances to allow network connectivity

## Description

Creates inbound Windows firewall rules for SQL Server instances, Browser service, and Dedicated Admin Connection (DAC) to allow network connectivity.  
This automates the tedious post-installation task of configuring firewall access for SQL Server, eliminating the need to manually determine ports and create rules through Windows Firewall GUI or netsh commands.  
  
The function intelligently detects whether instances use static or dynamic ports and creates appropriate rules.  
For static ports, it creates port-based rules; for dynamic ports, it creates program-based rules targeting sqlservr.exe.  
When instances use non-default ports, it automatically includes a Browser service rule so clients can discover the instance.  
  
This is a wrapper around New-NetFirewallRule executed remotely on the target computer via Invoke-Command2.  
Both DisplayName and Name are set to the same value to ensure unique rule identification and prevent duplicates.  
All rules use the "SQL Server" group for easy management with Get-DbaFirewallRule.  
  
The functionality is currently limited. Help to extend the functionality is welcome.  
  
As long as you can read this note here, there may be breaking changes in future versions.  
So please review your scripts using this command after updating dbatools.  
  
The firewall rule for the instance itself will have the following configuration (parameters for New-NetFirewallRule):  
  
    DisplayName = 'SQL Server default instance' or 'SQL Server instance <InstanceName>'  
    Name        = 'SQL Server default instance' or 'SQL Server instance <InstanceName>'  
    Group       = 'SQL Server'  
    Enabled     = 'True'  
    Direction   = 'Inbound'  
    Protocol    = 'TCP'  
    LocalPort   = '<Port>' (for instances with static port)  
    Program     = '<Path ending with MSSQL\Binn\sqlservr.exe>' (for instances with dynamic port)  
  
The firewall rule for the SQL Server Browser will have the following configuration (parameters for New-NetFirewallRule):  
  
    DisplayName = 'SQL Server Browser'  
    Name        = 'SQL Server Browser'  
    Group       = 'SQL Server'  
    Enabled     = 'True'  
    Direction   = 'Inbound'  
    Protocol    = 'UDP'  
    LocalPort   = '1434'  
  
The firewall rule for the dedicated admin connection (DAC) will have the following configuration (parameters for New-NetFirewallRule):  
  
    DisplayName = 'SQL Server default instance (DAC)' or 'SQL Server instance <InstanceName> (DAC)'  
    Name        = 'SQL Server default instance (DAC)' or 'SQL Server instance <InstanceName> (DAC)'  
    Group       = 'SQL Server'  
    Enabled     = 'True'  
    Direction   = 'Inbound'  
    Protocol    = 'TCP'  
    LocalPort   = '<Port>' (typically 1434 for a default instance, but will be fetched from ERRORLOG)  
  
The firewall rule for the DAC will only be created if the DAC is configured for listening remotely.  
Use `Set-DbaSpConfigure -SqlInstance SRV1 -Name RemoteDacConnectionsEnabled -Value 1` to enable remote DAC before running this command.  
  
The firewall rule for database mirroring or Availability Groups will have the following configuration (parameters for New-NetFirewallRule):  
  
    DisplayName = 'SQL Server default instance (DatabaseMirroring)' or 'SQL Server instance <InstanceName> (DatabaseMirroring)'  
    Name        = 'SQL Server default instance (DatabaseMirroring)' or 'SQL Server instance <InstanceName> (DatabaseMirroring)'  
    Group       = 'SQL Server'  
    Enabled     = 'True'  
    Direction   = 'Inbound'  
    Protocol    = 'TCP'  
    LocalPort   = '5022' (can be overwritten by using the parameter Configuration)

## Syntax

```powershell
New-DbaFirewallRule
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-Type] <String[]>]
    [[-Configuration] <Hashtable>]
    [-Force]
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
PS C:\> New-DbaFirewallRule -SqlInstance SRV1, SRV1\TEST
```

Automatically configures the needed firewall rules for both the default instance and the instance named TEST on SRV1.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SRV1, SRV1\TEST -Configuration @{ Profile = 'Domain' }
```

Automatically configures the needed firewall rules for both the default instance and the instance named TEST on SRV1,<br>
but configures the firewall rule for the domain profile only.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SRV1\TEST -Type Engine -Force -Confirm:$false
```

Creates or recreates the firewall rule for the instance TEST on SRV1. Does not prompt for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SQL01 -Type DatabaseMirroring
```

Creates the firewall rule for database mirroring or Availability Groups on the default instance on SQL01 using the default port 5022.<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SQL02 -Type DatabaseMirroring -Configuration @{ LocalPort = '5023' }
```

Creates the firewall rule for database mirroring or Availability Groups on the default instance on SQL02 using the custom port 5023.<br>

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

Specifies which firewall rule types to create for SQL Server network access.  
Use this when you need to create specific rules instead of the automatic detection behavior.  
Valid values are Engine (SQL Server instance), Browser (SQL Server Browser service), DAC (Dedicated Admin Connection) and DatabaseMirroring (database mirroring or Availability Groups). When omitted,   
the function automatically creates Engine rules plus Browser rules for non-default ports and DAC rules when remote DAC is enabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Engine,Browser,DAC,DatabaseMirroring |

##### -Configuration

Provides custom settings to override the default firewall rule configuration when calling New-NetFirewallRule.  
Use this when you need to restrict rules to specific network profiles (Domain, Private, Public) or modify other advanced firewall settings.  
Common examples include @{Profile = 'Domain'} to limit rules to domain networks only, or @{RemoteAddress = '192.168.1.0/24'} to restrict source IPs. The Name, DisplayName, and Group parameters are   
reserved and will be ignored if specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces recreation of firewall rules that already exist by deleting and recreating them.  
Use this when you need to update existing rules with new settings or when troubleshooting connectivity issues.  
Without this switch, the function will warn you about existing rules and skip their creation.

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
