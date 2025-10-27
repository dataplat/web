---
title: "Stop-DbaProcess"
slug: "Stop-DbaProcess"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Terminates SQL Server processes (SPIDs) to resolve blocking, kill runaway queries, or clean up connections."
tags:
  - "Diagnostic"
  - "Process"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaProcess.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaProcess"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Stop-DbaProcess</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaProcess.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Terminates SQL Server processes (SPIDs) to resolve blocking, kill runaway queries, or clean up connections.

## Description

Terminates SQL Server processes by targeting specific SPIDs, logins, hostnames, programs, or databases. This is essential for resolving blocking situations, stopping runaway queries that consume resources, or cleaning up abandoned connections from applications or users.  
  
The function automatically prevents you from killing your own connection session to avoid disconnecting yourself. You can filter processes by multiple criteria and use it alongside Get-DbaProcess to identify problem sessions before terminating them.

## Syntax

```powershell
Stop-DbaProcess
    [-SqlCredential <PSCredential>]
    [-Spid <Int32[]>]
    [-ExcludeSpid <Int32[]>]
    [-Database <String[]>]
    [-Login <String[]>]
    [-Hostname <String[]>]
    [-Program <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Stop-DbaProcess -SqlInstance <DbaInstanceParameter>
    [-SqlCredential <PSCredential>]
    [-Spid <Int32[]>]
    [-ExcludeSpid <Int32[]>]
    [-Database <String[]>]
    [-Login <String[]>]
    [-Hostname <String[]>]
    [-Program <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Stop-DbaProcess
    [-SqlCredential <PSCredential>]
    [-Spid <Int32[]>]
    [-ExcludeSpid <Int32[]>]
    [-Database <String[]>]
    [-Login <String[]>]
    [-Hostname <String[]>]
    [-Program <String[]>]
    -InputObject <Object[]>
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
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -Login base\ctrlb, sa
```
{: data-copyable="true" data-clean-code="Stop-DbaProcess -SqlInstance sqlserver2014a -Login base\ctrlb, sa" }

Finds all processes for base\ctrlb and sa on sqlserver2014a, then kills them. Uses Windows Authentication to login to sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -SqlCredential $credential -Spid 56, 77
```
{: data-copyable="true" data-clean-code="Stop-DbaProcess -SqlInstance sqlserver2014a -SqlCredential $credential -Spid 56, 77" }

Finds processes for spid 56 and 57, then kills them. Uses alternative (SQL or Windows) credentials to login to sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -Program 'Microsoft SQL Server Management Studio'
```
{: data-copyable="true" data-clean-code="Stop-DbaProcess -SqlInstance sqlserver2014a -Program 'Microsoft SQL Server Management Studio'" }

Finds processes that were created in Microsoft SQL Server Management Studio, then kills them.<br>

#####  Example:  4 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -Hostname workstationx, server100
```
{: data-copyable="true" data-clean-code="Stop-DbaProcess -SqlInstance sqlserver2014a -Hostname workstationx, server100" }

Finds processes that were initiated (computers/clients) workstationx and server 1000, then kills them.<br>

#####  Example:  5 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014  -Database tempdb -WhatIf
```
{: data-copyable="true" data-clean-code="Stop-DbaProcess -SqlInstance sqlserver2014  -Database tempdb -WhatIf" }

Shows what would happen if the command were executed.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sql2016 -Program 'dbatools PowerShell module - dbatools.io' | Stop-DbaProcess
```
{: data-copyable="true" data-clean-code="Get-DbaProcess -SqlInstance sql2016 -Program 'dbatools PowerShell module - dbatools.io' | Stop-DbaProcess" }

Finds processes that were created with dbatools, then kills them.<br>

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

Accepts process objects from Get-DbaProcess through the pipeline. Use this approach to first identify and review problematic sessions before terminating them, providing better control and   
verification of which processes will be killed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

##### -Spid

Targets specific session IDs (SPIDs) for termination. Use this when you know the exact process ID causing problems, typically identified from blocking reports or activity monitors. You can specify   
multiple SPIDs to kill several problem sessions at once.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSpid

Protects specific session IDs from termination even if they match other filter criteria. Use this to preserve important connections like monitoring tools or critical application sessions when killing   
processes by login, hostname, or database. This exclusion is applied last, overriding all other matching filters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Kills all active sessions connected to specified databases. Useful when you need to perform exclusive database operations like restores, schema changes, or when preparing for database maintenance.   
This will disconnect all users currently connected to the targeted databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Terminates all active sessions for specified login names. Use this to disconnect all connections from a specific user account, such as when removing user access or troubleshooting login-specific   
issues. Supports multiple logins and accepts both Windows (DOMAIN\user) and SQL logins.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Hostname

Kills all sessions originating from specified client computer names. Useful when a problematic application server or workstation is creating excessive connections or when you need to force disconnect   
all sessions from a specific machine. Accepts multiple hostnames including both short names and FQDNs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Program

Terminates sessions based on the client application name. Use this to disconnect all connections from specific applications like SSMS, poorly-behaved ETL tools, or misbehaving custom applications.   
Common program names include 'Microsoft SQL Server Management Studio' and various .NET application names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
