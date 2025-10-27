---
title: "New-DbaDbUser"
slug: "New-DbaDbUser"
date: 2024-01-01
layout: "single"
author: "Frank Henninger (@osiris687) | Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Creates database users with support for SQL logins, contained users, and Azure AD authentication."
tags:
  - "Database"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbUser.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbUser"
draft: false
---

# New-DbaDbUser

| Property | Value |
| --- | --- |
| **Author** | Frank Henninger (@osiris687) , Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbUser](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbUser.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbUser](https://dataplat.github.io/boh#New-DbaDbUser).

## Synopsis

Creates database users with support for SQL logins, contained users, and Azure AD authentication.

## Description

Creates database users across one or more databases, supporting multiple authentication types including traditional SQL login mapping, contained users with passwords, and Azure Active Directory external provider authentication. This command handles the common DBA task of provisioning database access without requiring manual T-SQL scripts for each database. You can create users mapped to existing SQL logins, standalone contained users for partially contained databases, or Azure AD users for cloud environments. The function automatically validates that specified logins and schemas exist before attempting user creation.

## Syntax

```powershell
New-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <String[]>]
    [-IncludeSystem]
    -User <String>
    -ExternalProvider
    [-DefaultSchema <String>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <String[]>]
    [-IncludeSystem]
    -User <String>
    -SecurePassword <SecureString>
    [-DefaultSchema <String>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <String[]>]
    [-IncludeSystem]
    -User <String>
    [-DefaultSchema <String>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <String[]>]
    [-IncludeSystem]
    [-User <String>]
    -Login <String>
    [-DefaultSchema <String>]
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
PS C:\> New-DbaDbUser -SqlInstance sqlserver2014 -Database DB1 -Login user1
```

Creates a new sql user named user1 for the login user1 in the database DB1.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbUser -SqlInstance sqlserver2014 -Database DB1 -User user1
```

Creates a new sql user named user1 without login in the database DB1.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbUser -SqlInstance sqlserver2014 -Database DB1 -User user1 -Login login1
```

Creates a new sql user named user1 for the login login1 in the database DB1.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaDbUser -SqlInstance sqlserver2014 -Database DB1 -User user1 -Login Login1 -DefaultSchema schema1
```

Creates a new sql user named user1 for the login login1 in the database DB1 and specifies the default schema to be schema1.<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaDbUser -SqlInstance sqlserver2014 -Database DB1 -User "claudio@********.onmicrosoft.com" -ExternalProvider
```

Creates a new sql user named 'claudio@********.onmicrosoft.com' mapped to Azure Active Directory (AAD) in the database DB1.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaDbUser -SqlInstance sqlserver2014 -Database DB1 -Username user1 -Password (ConvertTo-SecureString -String "DBATools" -AsPlainText -Force)
```

Creates a new contained sql user named user1 in the database DB1 with the password specified.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -User

Sets the name of the database user to be created. Required for contained users, external provider users, and users without logins.  
If not specified when using -Login, the user name will match the login name.

| Property | Value |
| --- | --- |
| Alias | Username |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Login

Maps the database user to an existing SQL Server login for authentication.  
The login must already exist on the instance before creating the user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

If we need to pass a password to the command, we always use the type securestring and name the parameter SecurePassword. Here we only use the alias for backwords compatibility.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -ExternalProvider

Creates a user for Azure Active Directory authentication in Azure SQL databases or SQL Server with AAD integration.  
The User parameter should contain the full AAD principal name (user@domain.com or groupname).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

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

##### -Database

Specifies which databases to create the user in. Accepts multiple database names separated by commas.  
If not specified, the user will be created in all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from user creation when processing all databases on an instance.  
Use this to skip databases where you don't want the user created, such as read-only or archived databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeSystem

Creates the user in system databases (master, model, msdb, tempdb) in addition to user databases.  
Typically used when creating maintenance or administrative users that need access to system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DefaultSchema

Sets the default schema that will be used when the user creates objects without specifying a schema.  
Defaults to 'dbo' if not specified. The schema must already exist in the target database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -Force

Drops and recreates the user if it already exists in the database.  
Use this when you need to reset a user's properties or when automation scripts need to ensure a clean user state.

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
