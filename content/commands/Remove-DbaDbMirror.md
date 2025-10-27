---
title: "Remove-DbaDbMirror"
slug: "Remove-DbaDbMirror"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Breaks database mirroring partnerships and stops mirroring sessions"
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMirror.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbMirror"
draft: false
---

# Remove-DbaDbMirror

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbMirror](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMirror.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbMirror](https://dataplat.github.io/boh#Remove-DbaDbMirror).

## Synopsis

Breaks database mirroring partnerships and stops mirroring sessions

## Description

Terminates database mirroring sessions by breaking the partnership between principal and mirror databases. This command stops the mirroring relationship completely, which is useful when decommissioning mirrors, performing maintenance that requires breaking the partnership, or during disaster recovery scenarios where you need to bring a database online independently.  
  
Important: This function only breaks the mirroring partnership - it does not automatically recover databases that are left in a "Restoring" state. You'll need to manually restore those databases with RECOVERY to make them accessible for normal operations.

## Syntax

```powershell
Remove-DbaDbMirror
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
PS C:\> Remove-DbaDbMirror -SqlInstance localhost -Database TestDB
```

Stops the database mirroring session for the TestDB on the localhost instance.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbMirror -SqlInstance localhost -Database TestDB1, TestDB2
```

Stops the database mirroring session for the TestDB1 and TestDB2 databases on the localhost instance.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -Database TestDB1, TestDB2 | Remove-DbaDbMirror
```

Stops the database mirroring session for the TestDB1 and TestDB2 databases on the localhost instance.<br>

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

Specifies the names of databases whose mirroring partnerships should be terminated. Accepts multiple database names.  
Required when using SqlInstance parameter. Use this to target specific mirrored databases rather than processing all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase.  
Use this when you want to filter databases using Get-DbaDatabase's capabilities before breaking mirroring partnerships.

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
