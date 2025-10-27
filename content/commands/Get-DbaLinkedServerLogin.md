---
title: "Get-DbaLinkedServerLogin"
slug: "Get-DbaLinkedServerLogin"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves linked server login mappings and authentication configurations from SQL Server instances."
tags:
  - "LinkedServer"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLinkedServerLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLinkedServerLogin"
draft: false
---

# Get-DbaLinkedServerLogin

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaLinkedServerLogin](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLinkedServerLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaLinkedServerLogin](https://dataplat.github.io/boh#Get-DbaLinkedServerLogin).

## Synopsis

Retrieves linked server login mappings and authentication configurations from SQL Server instances.

## Description

Retrieves the login mappings configured for linked servers, showing how local SQL Server logins are mapped to remote server credentials. This function returns details about each login mapping including the local login name, remote user account, and whether impersonation is enabled. Use this to audit linked server security configurations, troubleshoot authentication issues between servers, or document cross-server login relationships for compliance purposes.

## Syntax

```powershell
Get-DbaLinkedServerLogin
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LinkedServer] <String[]>]
    [[-LocalLogin] <String[]>]
    [[-ExcludeLocalLogin] <String[]>]
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
PS C:\> Get-DbaLinkedServerLogin -SqlInstance sql01 -LinkedServer linkedServer1 -LocalLogin login1
```

Gets the linked server login "login1" from the linked server "linkedServer1" on sql01.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLinkedServerLogin -SqlInstance sql01 -LinkedServer linkedServer1 -ExcludeLocalLogin login2
```

Gets the linked server login(s) from the linked server "linkedServer1" on sql01 and excludes the login2 linked server login.<br>

#####  Example:  3 

```powershell
PS C:\> (Get-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1) | Get-DbaLinkedServerLogin -LocalLogin login1
```

Gets the linked server login "login1" from the linked server "linkedServer1" on sql01 using a pipeline with the linked server passed in.<br>

#####  Example:  4 

```powershell
PS C:\> (Connect-DbaInstance -SqlInstance sql01) | Get-DbaLinkedServerLogin -LinkedServer linkedServer1 -LocalLogin login1
```

Gets the linked server login "login1" from the linked server "linkedServer1" on sql01 using a pipeline with the instance passed in.<br>

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

Specifies the name(s) of the linked server(s) to retrieve login mappings from. Required when using SqlInstance parameter.  
Use this to focus on specific linked servers when you have multiple configured on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalLogin

Filters results to only include specific local SQL Server login names that have mappings configured for the linked server.  
Useful when auditing a specific user's access or troubleshooting authentication for particular accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLocalLogin

Excludes specific local SQL Server login names from the results, showing all other configured login mappings.  
Use this to hide system accounts or service accounts when focusing on user login mappings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped input from Connect-DbaInstance or Get-DbaLinkedServer commands to work with existing connection objects.  
When piping from Get-DbaLinkedServer, the LinkedServer parameter becomes optional since the linked server context is already established.

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
