---
title: "Rename-DbaLogin"
slug: "Rename-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Mitchell Hamann (@SirCaptainMitch)"
availability: "Windows, Linux, macOS"
synopsis: "Renames SQL Server logins and optionally their associated database users"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Rename-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Rename-DbaLogin"
draft: false
---

# Rename-DbaLogin

| Property | Value |
| --- | --- |
| **Author** | Mitchell Hamann (@SirCaptainMitch) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Rename-DbaLogin](https://github.com/dataplat/dbatools/blob/master/public/Rename-DbaLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Rename-DbaLogin](https://dataplat.github.io/boh#Rename-DbaLogin).

## Synopsis

Renames SQL Server logins and optionally their associated database users

## Description

Renames SQL Server logins at the instance level, solving the common problem of needing to update login names after migrations, domain changes, or when improving naming conventions.  
  
When migrating logins between environments or standardizing naming conventions, manually updating login names and all their database user mappings is time-consuming and error-prone. This function handles both the login rename and optionally updates all associated database users in a single operation.  
  
By default, only the server-level login is renamed. Use the -Force parameter to also rename the corresponding database users across all databases where the login is mapped. If any database user rename fails, the function automatically rolls back the login name change to maintain consistency.

## Syntax

```powershell
Rename-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Login] <String>
    [-NewLogin] <String>
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
PS C:\> Rename-DbaLogin -SqlInstance localhost -Login DbaToolsUser -NewLogin captain
```

SQL Login Example<br>

#####  Example:  2 

```powershell
PS C:\> Rename-DbaLogin -SqlInstance localhost -Login domain\oldname -NewLogin domain\newname
```

Change the windowsuser login name.<br>

#####  Example:  3 

```powershell
PS C:\> Rename-DbaLogin -SqlInstance localhost -Login dbatoolsuser -NewLogin captain -WhatIf
```

WhatIf Example<br>

### Required Parameters

##### -SqlInstance

Source SQL Server.You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies the existing login name that you want to rename on the SQL Server instance.  
This must be an exact match for a login that currently exists on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -NewLogin

Specifies the new name for the login after the rename operation.  
For Windows logins, the new name must resolve to the same SID as the original login to maintain security mappings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Force

Renames corresponding database users across all databases where the login is mapped.  
Without this parameter, only the server-level login is renamed, leaving database users unchanged. If any database user rename fails, the entire operation rolls back to maintain consistency.

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

Prompts to confirm actions

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
