---
title: "Get-DbaLinkedServer"
slug: "Get-DbaLinkedServer"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves linked server configurations and connection details from SQL Server instances."
tags:
  - "LinkedServer"
  - "Linked"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLinkedServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLinkedServer"
draft: false
---

# Get-DbaLinkedServer

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaLinkedServer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLinkedServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaLinkedServer](https://dataplat.github.io/boh#Get-DbaLinkedServer).

## Synopsis

Retrieves linked server configurations and connection details from SQL Server instances.

## Description

Pulls complete linked server information from one or more SQL Server instances, including remote server names, authentication methods, and security settings. This helps DBAs audit cross-server connections for compliance reporting, troubleshoot connectivity issues, and document distributed database architectures. Returns details about the remote server, product type, impersonation settings, and login mappings for each configured linked server.

## Syntax

```powershell
Get-DbaLinkedServer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-LinkedServer] <Object[]>]
    [[-ExcludeLinkedServer] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLinkedServer -SqlInstance DEV01
```

Returns all linked servers for the SQL Server instance DEV01<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance DEV01 -Group SQLDEV | Get-DbaLinkedServer | Out-GridView
```

Returns all linked servers for a group of servers from SQL Server Central Management Server (CMS). Send output to GridView.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -LinkedServer

Specifies one or more linked server names to retrieve information for. Accepts an array of server names for filtering results.  
Use this when you need details on specific linked servers instead of all configured linked servers on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLinkedServer

Specifies one or more linked server names to exclude from the results. Accepts an array of server names to filter out.  
Use this when you want to skip specific linked servers, such as excluding test or deprecated connections from your inventory.

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


&nbsp;
