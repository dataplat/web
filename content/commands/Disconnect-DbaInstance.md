---
title: "Disconnect-DbaInstance"
slug: "Disconnect-DbaInstance"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Closes active SQL Server connections and removes them from the dbatools connection cache"
tags:
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disconnect-DbaInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Disconnect-DbaInstance"
draft: false
---

# Disconnect-DbaInstance

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disconnect-DbaInstance](https://github.com/dataplat/dbatools/blob/master/public/Disconnect-DbaInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disconnect-DbaInstance](https://dataplat.github.io/boh#Disconnect-DbaInstance).

## Synopsis

Closes active SQL Server connections and removes them from the dbatools connection cache

## Description

Properly closes SQL Server connections created by dbatools commands like Connect-DbaInstance, preventing connection leaks and freeing up server connection limits. This function handles both SMO server objects and raw SqlConnection objects, ensuring clean disconnection and removing connections from the internal connection hash. Use this in scripts to explicitly manage connection lifecycle, especially when working with multiple instances or in long-running automation where connection limits matter.  
  
To clear all of your connection pools, use Clear-DbaConnectionPool

## Syntax

```powershell
Disconnect-DbaInstance
    [[-InputObject] <PSObject[]>]
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
PS C:\> Get-DbaConnectedInstance | Disconnect-DbaInstance
```

Disconnects all connected instances<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaConnectedInstance | Out-GridView -Passthru | Disconnect-DbaInstance
```

Disconnects selected SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance sql01
PS C:\> $server | Disconnect-DbaInstance
```

Disconnects the $server connection<br>

### Optional Parameters

##### -InputObject

Specifies the SQL Server connection object(s) to disconnect, such as SMO Server objects or SqlConnection objects from Connect-DbaInstance. Accepts pipeline input from Get-DbaConnectedInstance to   
disconnect multiple connections at once.  
Use this to explicitly close specific connections rather than letting them time out, which helps prevent connection pool exhaustion and reduces load on SQL Server instances.

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
