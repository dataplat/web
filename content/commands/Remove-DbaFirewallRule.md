---
title: "Remove-DbaFirewallRule"
slug: "Remove-DbaFirewallRule"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Removes Windows firewall rules for SQL Server Engine, Browser, and DAC connections from target computers."
tags:
  - "Firewall"
  - "Network"
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaFirewallRule.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaFirewallRule"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaFirewallRule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaFirewallRule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Removes Windows firewall rules for SQL Server Engine, Browser, and DAC connections from target computers.

## Description

Removes Windows firewall rules for SQL Server components from target computers, cleaning up network access rules when decommissioning instances or changing security configurations. This command only works with firewall rules that were previously created using New-DbaFirewallRule, as it relies on specific naming conventions and rule groups.  
  
The function can remove rules for SQL Server Engine connections (typically port 1433 for default instances), SQL Server Browser service (UDP port 1434), and Dedicated Admin Connection (DAC) ports. This is particularly useful when decommissioning SQL Server instances, changing network security policies, or troubleshooting connectivity issues.  
  
This command executes Remove-NetFirewallRule remotely on target computers using PowerShell remoting, so it requires appropriate permissions and network connectivity to the target systems. The function provides detailed status reporting for each removal operation, including success status and any warnings or errors encountered.  
  
The functionality is currently limited to rules created by dbatools. Future versions may introduce breaking changes, so review scripts after updating dbatools.

## Syntax

```powershell
Remove-DbaFirewallRule
    [-SqlInstance] <DbaInstanceParameter[]>
    [-Credential <PSCredential>]
    [-Type <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaFirewallRule -InputObject <Object[]>
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
PS C:\> Remove-DbaFirewallRule -SqlInstance SRV1
```
{: data-copyable="true" data-clean-code="Remove-DbaFirewallRule -SqlInstance SRV1" }

Removes the firewall rule for the default instance on SRV1.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Engine, Browser
```
{: data-copyable="true" data-clean-code="Remove-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Engine, Browser" }

Removes the firewall rule for the instance SQL2016 on SRV1 and the firewall rule for the SQL Server Browser.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1 -Type AllInstance | Where-Object Type -eq 'Engine' | Remove-DbaFirewallRule
```
{: data-copyable="true" data-clean-code="Get-DbaFirewallRule -SqlInstance SRV1 -Type AllInstance | Where-Object Type -eq 'Engine' | Remove-DbaFirewallRule" }

Removes the firewall rules for all instance from SRV1. Leaves the firewall rule for the SQL Server Browser in place.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaFirewallRule -SqlInstance SRV1 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Remove-DbaFirewallRule -SqlInstance SRV1 -Confirm:$false" }

Removes the firewall rule for the default instance on SRV1. Does not prompt for confirmation.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts firewall rule objects from Get-DbaFirewallRule for pipeline-based removal operations.  
Use this when you need to filter or review existing firewall rules before removing them, allowing for more precise control over which rules get deleted.

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

Specifies which types of SQL Server firewall rules to remove from the target computer.  
Use this to control exactly which network access rules are cleaned up when decommissioning or reconfiguring SQL Server instances.  
Engine removes rules for SQL Server database connections, Browser removes UDP port 1434 rules for SQL Server Browser service, DAC removes Dedicated Admin Connection rules, DatabaseMirroring removes   
database mirroring or Availability Groups rules, and AllInstance removes all SQL Server-related rules. Defaults to Engine and DAC since Browser rules are often shared between multiple instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('Engine', 'DAC') |
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
