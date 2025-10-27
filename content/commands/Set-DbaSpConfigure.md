---
title: "Set-DbaSpConfigure"
slug: "Set-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Nic Cain, sirsql.net"
availability: "Windows, Linux, macOS"
synopsis: "Modifies SQL Server instance-level configuration settings through sp_configure"
tags:
  - "SpConfigure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaSpConfigure"
draft: false
---

# Set-DbaSpConfigure

| Property | Value |
| --- | --- |
| **Author** | Nic Cain, sirsql.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaSpConfigure](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpConfigure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaSpConfigure](https://dataplat.github.io/boh#Set-DbaSpConfigure).

## Synopsis

Modifies SQL Server instance-level configuration settings through sp_configure

## Description

This function safely modifies SQL Server instance-level configuration values that are normally changed through sp_configure. Use this when you need to adjust settings like max memory, xp_cmdshell, cost threshold for parallelism, or any other server configuration option.  
  
For dynamic settings, changes take effect immediately. For static settings, you'll receive a warning that SQL Server must be restarted before the new value becomes active.  
  
Built-in safety prevents setting values outside their defined minimum and maximum ranges, protecting against configuration errors that could prevent SQL Server from starting or cause performance issues.

## Syntax

```powershell
Set-DbaSpConfigure
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Value] <Int32>]
    [[-Name] <String[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Set-DbaSpConfigure -SqlInstance localhost -Name ScanForStartupProcedures -Value 1
```

Adjusts the Scan for startup stored procedures configuration value to 1 and notifies the user that this requires a SQL restart to take effect<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance sql2017, sql2014 -Name XPCmdShellEnabled, IsSqlClrEnabled | Set-DbaSpConfigure -Value $false
```

Sets the values for XPCmdShellEnabled and IsSqlClrEnabled on sql2017 and sql2014 to False<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaSpConfigure -SqlInstance localhost -Name XPCmdShellEnabled -Value 1
```

Adjusts the xp_cmdshell configuration value to 1.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaSpConfigure -SqlInstance localhost -Name XPCmdShellEnabled -Value 1 -WhatIf
```

Returns information on the action that would be performed. No actual change will be made.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a  
collection and receive pipeline input

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Value

Sets the new configuration value within the setting's valid range (minimum to maximum). The function validates the value against SQL Server's defined limits to prevent invalid configurations that   
could prevent startup or cause performance issues.

| Property | Value |
| --- | --- |
| Alias | NewValue,NewConfig |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Name

Specifies which SQL Server configuration setting to modify, such as 'max server memory (MB)', 'xp_cmdshell', or 'cost threshold for parallelism'. Use this when targeting specific settings by name   
instead of piping from Get-DbaSpConfigure.

| Property | Value |
| --- | --- |
| Alias | Config,ConfigName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts configuration objects piped from Get-DbaSpConfigure to modify multiple settings across instances. Use this approach when you need to bulk update configurations or apply conditional logic   
based on current values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
