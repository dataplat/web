---
title: "Repair-DbaDbMirror"
slug: "Repair-DbaDbMirror"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Repairs suspended database mirroring sessions by restarting endpoints and resuming mirroring"
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaDbMirror.ps1"
bohUrl: "https://dataplat.github.io/boh#Repair-DbaDbMirror"
draft: false
---

# Repair-DbaDbMirror

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Repair-DbaDbMirror](https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaDbMirror.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Repair-DbaDbMirror](https://dataplat.github.io/boh#Repair-DbaDbMirror).

## Synopsis

Repairs suspended database mirroring sessions by restarting endpoints and resuming mirroring

## Description

Restores database mirroring functionality when mirroring sessions become suspended due to network connectivity issues, log space problems, or other transient failures. This function performs the standard troubleshooting steps that DBAs typically execute manually: stops and restarts the database mirroring endpoints on the SQL Server instance, then resumes the mirroring session between the principal and mirror databases.  
  
When database mirroring is suspended, the mirror database stops receiving transaction log records from the principal database, creating a potential data loss risk. This command automates the common recovery process, eliminating the need to manually restart endpoints and issue ALTER DATABASE commands to resume mirroring.

## Syntax

```powershell
Repair-DbaDbMirror
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-InputObject] <Database[]>]
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
PS C:\> Repair-DbaDbMirror -SqlInstance sql2017 -Database pubs
```

Attempts to repair the mirrored but suspended pubs database on sql2017.<br>
Restarts the endpoints then sets the partner to resume. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017 -Database pubs | Repair-DbaDbMirror -Confirm:$false
```

Attempts to repair the mirrored but suspended pubs database on sql2017.<br>
Restarts the endpoints then sets the partner to resume. Does not prompt for confirmation.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

Specifies the name of the mirrored database that needs repair on the SQL Server instance.  
Use this when you know the specific database with suspended mirroring that requires endpoint restart and session resumption.  
Accepts multiple database names and supports wildcards for pattern matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase pipeline input to repair multiple mirrored databases in a single operation.  
Use this approach when you need to repair several databases at once or when working with the output of database filtering commands.  
Each database object must represent a database that has mirroring configured.

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
