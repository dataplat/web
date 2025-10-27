---
title: "Remove-DbaLinkedServer"
slug: "Remove-DbaLinkedServer"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Removes linked servers from SQL Server instances."
tags:
  - "LinkedServer"
  - "Server"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaLinkedServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaLinkedServer"
draft: false
---

# Remove-DbaLinkedServer

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaLinkedServer](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaLinkedServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaLinkedServer](https://dataplat.github.io/boh#Remove-DbaLinkedServer).

## Synopsis

Removes linked servers from SQL Server instances.

## Description

Removes one or more linked servers from target SQL Server instances. This function drops the linked server objects from the system catalog, effectively severing the connection between the local and remote servers. When using the -Force parameter, it also removes any associated linked server logins before dropping the linked server itself. This is useful for decommissioning legacy connections, cleaning up unused linked servers during server migrations, or removing connections for security compliance requirements.

## Syntax

```powershell
Remove-DbaLinkedServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LinkedServer] <String[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 -Confirm:$false
```

Removes the linked server "linkedServer1" from the sql01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 -Confirm:$false -Force
```

Removes the linked server "linkedServer1" and the associated linked server logins from the sql01 instance.<br>

#####  Example:  3 

```powershell
PS C:\> $linkedServer1 = Get-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1
PS C:\> $linkedServer1 | Remove-DbaLinkedServer -Confirm:$false
```

Passes in a linked server via pipeline and removes it from the sql01 instance.<br>

#####  Example:  4 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance sql01 | Remove-DbaLinkedServer -LinkedServer linkedServer1 -Confirm:$false
```

Removes the linked server "linkedServer1" from the sql01 instance, which is passed in via pipeline.<br>

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

##### -LinkedServer

Specifies the name(s) of the linked server(s) to remove from the SQL Server instance.  
Use this to target specific linked servers instead of removing all linked servers.  
Accepts an array of names when you need to remove multiple linked servers in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts linked server objects from Get-DbaLinkedServer or server instances from Connect-DbaInstance via pipeline.  
Use this when you want to remove linked servers that were previously retrieved with Get-DbaLinkedServer.  
When passing server instances, you must also specify the LinkedServer parameter to identify which linked servers to remove.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Removes all linked server logins associated with the linked server before dropping the linked server itself.  
Use this when the linked server has associated logins that would prevent removal.  
Without this parameter, the removal will fail if any linked server logins exist, requiring you to manually remove them first.

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
