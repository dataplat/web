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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaFirewallRule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaFirewallRule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="New-DbaFirewallRule -SqlInstance SRV1, SRV1\TEST" }

Automatically configures the needed firewall rules for both the default instance and the instance named TEST on SRV1.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SRV1, SRV1\TEST -Configuration @{ Profile = 'Domain' }
```
{: data-copyable="true" data-clean-code="New-DbaFirewallRule -SqlInstance SRV1, SRV1\TEST -Configuration @{ Profile = 'Domain' }" }

Automatically configures the needed firewall rules for both the default instance and the instance named TEST on SRV1,<br>
but configures the firewall rule for the domain profile only.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SRV1\TEST -Type Engine -Force -Confirm:$false
```
{: data-copyable="true" data-clean-code="New-DbaFirewallRule -SqlInstance SRV1\TEST -Type Engine -Force -Confirm:$false" }

Creates or recreates the firewall rule for the instance TEST on SRV1. Does not prompt for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SQL01 -Type DatabaseMirroring
```
{: data-copyable="true" data-clean-code="New-DbaFirewallRule -SqlInstance SQL01 -Type DatabaseMirroring" }

Creates the firewall rule for database mirroring or Availability Groups on the default instance on SQL01 using the default port 5022.<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaFirewallRule -SqlInstance SQL02 -Type DatabaseMirroring -Configuration @{ LocalPort = '5023' }
```
{: data-copyable="true" data-clean-code="New-DbaFirewallRule -SqlInstance SQL02 -Type DatabaseMirroring -Configuration @{ LocalPort = '5023' }" }

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
