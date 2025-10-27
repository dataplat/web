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

# Remove-DbaFirewallRule

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaFirewallRule](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaFirewallRule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaFirewallRule](https://dataplat.github.io/boh#Remove-DbaFirewallRule).

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

Removes the firewall rule for the default instance on SRV1.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaFirewallRule -SqlInstance SRV1\SQL2016 -Type Engine, Browser
```

Removes the firewall rule for the instance SQL2016 on SRV1 and the firewall rule for the SQL Server Browser.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFirewallRule -SqlInstance SRV1 -Type AllInstance | Where-Object Type -eq 'Engine' | Remove-DbaFirewallRule
```

Removes the firewall rules for all instance from SRV1. Leaves the firewall rule for the SQL Server Browser in place.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaFirewallRule -SqlInstance SRV1 -Confirm:$false
```

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
