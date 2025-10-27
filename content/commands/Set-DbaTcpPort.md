---
title: "Set-DbaTcpPort"
slug: "Set-DbaTcpPort"
date: 2024-01-01
layout: "single"
author: "@H0s0n77"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server TCP port settings for specified instances and IP addresses."
tags:
  - "Network"
  - "Connection"
  - "TCP"
  - "Configure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaTcpPort.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaTcpPort"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaTcpPort</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaTcpPort.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>@H0s0n77</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Configures SQL Server TCP port settings for specified instances and IP addresses.

## Description

Configures TCP port settings for SQL Server instances by modifying the network configuration through SQL Server Configuration Manager functionality. This replaces the manual process of opening SQL Server Configuration Manager to change port settings for security hardening or network compliance.  
  
The function can target all IP addresses (IPAll setting) or specific IP addresses, disables dynamic port allocation, and sets static port numbers. This is commonly used to move SQL Server off the default port 1433 for security purposes, configure custom ports for named instances, or meet organizational network segmentation requirements.  
  
Important: SQL Server must be restarted before the new port configuration takes effect. Use the -Force parameter to automatically restart the Database Engine service, or restart manually after running the command.

## Syntax

```powershell
Set-DbaTcpPort
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-Port] <Int32[]>
    [[-IpAddress] <IPAddress[]>]
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
PS C:\> Set-DbaTcpPort -SqlInstance sql2017 -Port 1433
```
{: data-copyable="true" data-clean-code="Set-DbaTcpPort -SqlInstance sql2017 -Port 1433" }

Sets the port number 1433 for all IP Addresses on the default instance on sql2017. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaTcpPort -SqlInstance winserver\sqlexpress -IpAddress 192.168.1.22 -Port 1433 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Set-DbaTcpPort -SqlInstance winserver\sqlexpress -IpAddress 192.168.1.22 -Port 1433 -Confirm:$false" }

Sets the port number 1433 for IP 192.168.1.22 on the sqlexpress instance on winserver. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaTcpPort -SqlInstance sql2017, sql2019 -port 1337 -Credential ad\dba -Force
```
{: data-copyable="true" data-clean-code="Set-DbaTcpPort -SqlInstance sql2017, sql2019 -port 1337 -Credential ad\dba -Force" }

Sets the port number 1337 for all IP Addresses on SqlInstance sql2017 and sql2019 using the credentials for ad\dba. Prompts for confirmation. Restarts the service.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Port

Specifies the TCP port number for SQL Server to listen on, replacing any existing static or dynamic port configuration.  
Use this to move SQL Server off the default port 1433 for security hardening or to configure custom ports for named instances.  
Accepts any valid port number between 1 and 65535, with common choices being 1433 (default), 1434, or organization-specific port ranges.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Credential

Credential object used to connect to the Windows server itself as a different user (like SQL Configuration Manager).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IpAddress

Specifies which IP address should listen on the configured port instead of applying to all IP addresses.  
Use this for multi-homed servers where you need SQL Server to listen only on specific network interfaces.  
When omitted, the port change applies to all IP addresses (IPAll setting), which is the typical configuration for most servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically restarts the SQL Server Database Engine service to apply the new port configuration immediately.  
Use this when you need the port change to take effect right away instead of waiting for the next service restart.  
Without this parameter, you must manually restart SQL Server before the new port settings become active.

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
