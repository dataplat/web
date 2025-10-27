---
title: "Invoke-DbaDbMirrorFailover"
slug: "Invoke-DbaDbMirrorFailover"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Fails over database mirroring configurations to the mirror server"
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbMirrorFailover.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbMirrorFailover"
draft: false
---

# Invoke-DbaDbMirrorFailover

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbMirrorFailover](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbMirrorFailover.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbMirrorFailover](https://dataplat.github.io/boh#Invoke-DbaDbMirrorFailover).

## Synopsis

Fails over database mirroring configurations to the mirror server

## Description

Performs a database mirroring failover by switching roles between the primary and mirror servers. For synchronous mirroring, sets safety level to Full and executes a clean failover without data loss. For asynchronous mirroring or emergency situations, use -Force to allow a forced failover that may result in data loss. This is essential for planned maintenance, disaster recovery scenarios, and testing your high availability setup.

## Syntax

```powershell
Invoke-DbaDbMirrorFailover
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
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
PS C:\> Invoke-DbaDbMirrorFailover -SqlInstance sql2016 -Database pubs
```

Fails over the pubs database on sql2016. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2016 -Database pubs | Invoke-DbaDbMirrorFailover -Force -Confirm:$false
```

Forces the failover of the pubs database on sql2016 and allows data loss.<br>
Does not prompt for confirmation.<br>

### Optional Parameters

##### -SqlInstance

SQL Server name or SMO object representing the primary SQL Server.

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

##### -Database

Specifies which mirrored databases to fail over to their mirror partners. Accepts multiple database names.  
Use this when you need to fail over specific databases rather than piping database objects from Get-DbaDatabase.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline for failover operations.  
This enables you to filter databases using Get-DbaDatabase and pipe the results directly to perform failovers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Forces an immediate failover that allows data loss, primarily for asynchronous mirroring or emergency situations.  
Without this switch, the function performs a safe synchronous failover by setting safety to Full before failing over.

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
