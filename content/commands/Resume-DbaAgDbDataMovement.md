---
title: "Resume-DbaAgDbDataMovement"
slug: "Resume-DbaAgDbDataMovement"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Resumes suspended data synchronization for availability group databases."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Resume-DbaAgDbDataMovement.ps1"
bohUrl: "https://dataplat.github.io/boh#Resume-DbaAgDbDataMovement"
draft: false
---

# Resume-DbaAgDbDataMovement

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Resume-DbaAgDbDataMovement](https://github.com/dataplat/dbatools/blob/master/public/Resume-DbaAgDbDataMovement.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Resume-DbaAgDbDataMovement](https://dataplat.github.io/boh#Resume-DbaAgDbDataMovement).

## Synopsis

Resumes suspended data synchronization for availability group databases.

## Description

Resumes data movement for availability group databases that have been suspended due to errors, maintenance, or storage issues. When data movement is suspended, secondary replicas stop receiving transaction log records from the primary, causing synchronization lag. This function reconnects the synchronization process so secondary replicas can catch up to the primary replica.

## Syntax

```powershell
Resume-DbaAgDbDataMovement
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String>]
    [[-Database] <String[]>]
    [[-InputObject] <AvailabilityDatabase[]>]
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
PS C:\> Resume-DbaAgDbDataMovement -SqlInstance sql2017a -AvailabilityGroup ag1 -Database db1, db2
```

Resumes data movement on db1 and db2 to ag1 on sql2017a. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgDatabase -SqlInstance sql2017a, sql2019 | Out-GridView -Passthru | Resume-DbaAgDbDataMovement -Confirm:$false
```

Resumes data movement on the selected availability group databases. Does not prompt for confirmation.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

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

##### -AvailabilityGroup

Specifies the name of the availability group containing the databases with suspended data movement.  
Required when using the SqlInstance parameter to identify which AG context to work within.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which availability group databases to resume data movement for. Accepts multiple database names.  
Use this to target specific databases when you don't want to resume movement for all databases in the availability group.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group database objects from Get-DbaAgDatabase for pipeline operations.  
Use this when you want to filter or select specific AG databases before resuming data movement.

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
