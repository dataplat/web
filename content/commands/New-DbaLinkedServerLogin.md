---
title: "New-DbaLinkedServerLogin"
slug: "New-DbaLinkedServerLogin"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Creates authentication mappings between local and remote logins for linked server connections."
tags:
  - "LinkedServer"
  - "Server"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaLinkedServerLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaLinkedServerLogin"
draft: false
---

# New-DbaLinkedServerLogin

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaLinkedServerLogin](https://github.com/dataplat/dbatools/blob/master/public/New-DbaLinkedServerLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaLinkedServerLogin](https://dataplat.github.io/boh#New-DbaLinkedServerLogin).

## Synopsis

Creates authentication mappings between local and remote logins for linked server connections.

## Description

Creates linked server login mappings that define how local SQL Server logins authenticate to remote servers during distributed queries. You can either map specific local logins to remote credentials or configure impersonation where local logins use their own credentials. This eliminates the need to hardcode passwords in applications that query across linked servers and provides centralized authentication management for cross-server operations.

## Syntax

```powershell
New-DbaLinkedServerLogin
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LinkedServer] <String[]>]
    [[-LocalLogin] <String>]
    [[-RemoteUser] <String>]
    [[-RemoteUserPassword] <SecureString>]
    [-Impersonate]
    [[-InputObject] <LinkedServer[]>]
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
PS C:\> New-DbaLinkedServerLogin -SqlInstance sql01 -LinkedServer linkedServer1 -LocalLogin localUser1 -RemoteUser remoteUser1 -RemoteUserPassword <password>
```

Creates a new linked server login and maps the local login testuser1 to the remote login testuser2. This linked server login is created on the sql01 instance for the linkedServer1 linked server.<br>
NOTE: passwords are sent to the SQL Server instance in plain text. Check with your security administrator before using the command with the RemoteUserPassword parameter. View the documentation for <br>
sp_addlinkedsrvlogin for more details.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaLinkedServerLogin -SqlInstance sql01 -LinkedServer linkedServer1 -Impersonate
```

Creates a mapping for all local logins on sql01 to connect using their own credentials to the linked server linkedServer1.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 | New-DbaLinkedServerLogin -LinkedServer linkedServer1 -LocalLogin testuser1 -RemoteUser testuser2 -RemoteUserPassword
```

<password><br>
Creates a new linked server login and maps the local login testuser1 to the remote login testuser2. This linked server login is created on the sql01 instance for the linkedServer1 linked server. The <br>
linkedServer1 instance is passed in via pipeline.<br>
NOTE: passwords are sent to the SQL Server instance in plain text. Check with your security administrator before using the command with the RemoteUserPassword parameter. View the documentation for <br>
sp_addlinkedsrvlogin for more details.<br>

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

Specifies the name of the linked server where the login mapping will be created. Required when using SqlInstance parameter.  
Use this to target specific linked servers when you have multiple configured on the same SQL instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LocalLogin

Specifies the local SQL Server login that needs access to the linked server. Required in all scenarios.  
This is the login name that exists on your local SQL instance and will be mapped to credentials on the remote server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteUser

Specifies the login name to use on the remote server for authentication. Use with RemoteUserPassword to create explicit credential mapping.  
When omitted with Impersonate disabled, the mapping will fail unless the same login exists on both servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoteUserPassword

Provides the password for the RemoteUser as a secure string. Required when mapping to a different remote login.  
WARNING: Passwords are transmitted to SQL Server in plain text - consult your security team before using in production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Impersonate

Enables pass-through authentication where local login credentials are used to authenticate to the remote server.  
Use this for trusted domain environments where the same login exists on both servers, eliminating the need to store remote passwords.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts linked server objects from Get-DbaLinkedServer pipeline input.  
Use this to efficiently configure login mappings across multiple linked servers retrieved from Get-DbaLinkedServer.

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
