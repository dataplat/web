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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaSpConfigure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpConfigure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Nic Cain, sirsql.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Set-DbaSpConfigure -SqlInstance localhost -Name ScanForStartupProcedures -Value 1" }

Adjusts the Scan for startup stored procedures configuration value to 1 and notifies the user that this requires a SQL restart to take effect<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance sql2017, sql2014 -Name XPCmdShellEnabled, IsSqlClrEnabled | Set-DbaSpConfigure -Value $false
```
{: data-copyable="true" data-clean-code="Get-DbaSpConfigure -SqlInstance sql2017, sql2014 -Name XPCmdShellEnabled, IsSqlClrEnabled | Set-DbaSpConfigure -Value $false" }

Sets the values for XPCmdShellEnabled and IsSqlClrEnabled on sql2017 and sql2014 to False<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaSpConfigure -SqlInstance localhost -Name XPCmdShellEnabled -Value 1
```
{: data-copyable="true" data-clean-code="Set-DbaSpConfigure -SqlInstance localhost -Name XPCmdShellEnabled -Value 1" }

Adjusts the xp_cmdshell configuration value to 1.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaSpConfigure -SqlInstance localhost -Name XPCmdShellEnabled -Value 1 -WhatIf
```
{: data-copyable="true" data-clean-code="Set-DbaSpConfigure -SqlInstance localhost -Name XPCmdShellEnabled -Value 1 -WhatIf" }

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
