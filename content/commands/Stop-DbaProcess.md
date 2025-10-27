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

# Stop-DbaProcess

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaProcess](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaProcess.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaProcess](https://dataplat.github.io/boh#Stop-DbaProcess).

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

Finds all processes for base\ctrlb and sa on sqlserver2014a, then kills them. Uses Windows Authentication to login to sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -SqlCredential $credential -Spid 56, 77
```

Finds processes for spid 56 and 57, then kills them. Uses alternative (SQL or Windows) credentials to login to sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -Program 'Microsoft SQL Server Management Studio'
```

Finds processes that were created in Microsoft SQL Server Management Studio, then kills them.<br>

#####  Example:  4 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014a -Hostname workstationx, server100
```

Finds processes that were initiated (computers/clients) workstationx and server 1000, then kills them.<br>

#####  Example:  5 

```powershell
PS C:\> Stop-DbaProcess -SqlInstance sqlserver2014  -Database tempdb -WhatIf
```

Shows what would happen if the command were executed.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaProcess -SqlInstance sql2016 -Program 'dbatools PowerShell module - dbatools.io' | Stop-DbaProcess
```

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
