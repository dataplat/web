---
title: "Remove-DbaLogin"
slug: "Remove-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server logins from target instances"
tags:
  - "Delete"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaLogin"
draft: false
---

# Remove-DbaLogin

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaLogin](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaLogin](https://dataplat.github.io/boh#Remove-DbaLogin).

## Synopsis

Removes SQL Server logins from target instances

## Description

Removes one or more SQL Server logins from specified instances using the SMO Drop() method. This function handles the complete removal process including dependency checks and provides proper error handling when logins cannot be dropped due to existing sessions or database ownership. Use the -Force parameter to automatically terminate active sessions associated with the login before removal, which is useful when cleaning up test environments or decommissioning user accounts.

## Syntax

```powershell
Remove-DbaLogin
    [-SqlCredential <PSCredential>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaLogin -SqlInstance <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    -Login <String[]>
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaLogin
    [-SqlCredential <PSCredential>]
    -InputObject <Login[]>
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
PS C:\> Remove-DbaLogin -SqlInstance sql2016 -Login mylogin
```

Prompts then removes the Login mylogin on SQL Server sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaLogin -SqlInstance sql2016 -Login mylogin, yourlogin
```

Prompts then removes the Logins mylogin and yourlogin on SQL Server sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaLogin -SqlInstance sql2016 -Login mylogin -Confirm:$false
```

Does not prompt and swiftly removes mylogin on SQL Server sql2016<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaLogin -SqlInstance server\instance -Login yourlogin | Remove-DbaLogin
```

Removes mylogin on SQL Server server\instance<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies the SQL Server login names to remove from the target instance. Accepts multiple login names as an array.  
Use this when you know the specific logins to delete, such as when cleaning up test accounts or decommissioned user logins.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts login objects piped from Get-DbaLogin or other dbatools functions that return SQL Server login objects.  
Use this for advanced filtering scenarios or when chaining multiple dbatools commands together in a pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Allows you to login to servers using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically terminates any active database connections and sessions associated with the login before attempting removal.  
Use this when you need to forcibly remove logins that have active sessions, common in development environments or during emergency cleanup.

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
