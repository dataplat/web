---
title: "Remove-DbaLinkedServerLogin"
slug: "Remove-DbaLinkedServerLogin"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Removes linked server login mappings that define credential relationships between local and remote server logins."
tags:
  - "Security"
  - "Server"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaLinkedServerLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaLinkedServerLogin"
draft: false
---

# Remove-DbaLinkedServerLogin

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaLinkedServerLogin](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaLinkedServerLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaLinkedServerLogin](https://dataplat.github.io/boh#Remove-DbaLinkedServerLogin).

## Synopsis

Removes linked server login mappings that define credential relationships between local and remote server logins.

## Description

Removes linked server login mappings, which are the credential associations that determine how local SQL Server logins authenticate to remote servers through linked server connections. These mappings control which credentials are used when executing queries against remote servers, so removing them effectively blocks access through that linked server for the specified local login. This is commonly used when decommissioning user access, cleaning up security configurations, or removing entire linked server setups.

## Syntax

```powershell
Remove-DbaLinkedServerLogin
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LinkedServer] <String[]>]
    [[-LocalLogin] <String[]>]
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
PS C:\> Remove-DbaLinkedServerLogin -SqlInstance sql01 -LinkedServer linkedServer1 -LocalLogin linkedServerLogin1 -Confirm:$false
```

Removes the linkedServerLogin1 from the linkedServer1 linked server on the sql01 instance.<br>

#####  Example:  2 

```powershell
PS C:\> $instance = Connect-DbaInstance -SqlInstance sql01
PS C:\> $instance | Remove-DbaLinkedServerLogin -LinkedServer linkedServer1 -LocalLogin linkedServerLogin1 -Confirm:$false
```

Passes in a SqlInstance via pipeline and removes the linkedServerLogin1 from the linkedServer1 linked server.<br>

#####  Example:  3 

```powershell
PS C:\> $linkedServer1 = Get-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1
PS C:\> $linkedServer1 | Remove-DbaLinkedServerLogin -LocalLogin linkedServerLogin1 -Confirm:$false
```

Passes in a linked server via pipeline and removes the linkedServerLogin1.<br>

#####  Example:  4 

```powershell
PS C:\> $linkedServerLogin1 = Get-DbaLinkedServerLogin -SqlInstance sql01 -LinkedServer linkedServer1 -LocalLogin linkedServerLogin1
PS C:\> $linkedServerLogin1 | Remove-DbaLinkedServerLogin -Confirm:$false
```

Passes in a linked server login via pipeline and removes it.<br>

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

Specifies the name of the linked server containing the login mappings to remove. This is the linked server object that holds the credential associations between local and remote server logins.  
Use this when you need to remove login mappings from a specific linked server, such as when cleaning up security configurations or decommissioning user access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalLogin

Specifies the local login names whose linked server login mappings should be removed. These are the local SQL Server login accounts that have credential mappings defined for remote server access.  
Use this to remove specific login mappings rather than all mappings for a linked server, such as when a user account is being deactivated or their remote access needs to be revoked.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Server instance objects, linked server objects, or linked server login objects from the pipeline for batch removal operations. Compatible with output from Connect-DbaInstance,   
Get-DbaLinkedServer, and Get-DbaLinkedServerLogin.  
Use this for pipeline operations when you want to remove login mappings from multiple objects or when chaining commands together for bulk security configuration changes.

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
