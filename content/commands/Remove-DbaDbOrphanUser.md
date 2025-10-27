---
title: "Remove-DbaDbOrphanUser"
slug: "Remove-DbaDbOrphanUser"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Removes orphaned database users that no longer have corresponding SQL Server logins"
tags:
  - "User"
  - "Orphan"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbOrphanUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbOrphanUser"
draft: false
---

# Remove-DbaDbOrphanUser

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) , Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbOrphanUser](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbOrphanUser.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbOrphanUser](https://dataplat.github.io/boh#Remove-DbaDbOrphanUser).

## Synopsis

Removes orphaned database users that no longer have corresponding SQL Server logins

## Description

Removes orphaned database users from one or more databases, handling schema ownership transfers automatically to prevent dependency issues.  
  
Orphaned users occur when a database user exists but its corresponding login in the master database has been deleted or doesn't exist on the current server. This commonly happens after login deletions, database migrations, or restores to servers where the original logins don't exist.  
  
The function intelligently handles schema ownership:  
- Drops empty schemas that have the same name as the orphaned user  
- Transfers ownership of other schemas to 'dbo' to maintain database integrity  
- Requires -Force parameter when schemas contain objects, ensuring you make conscious decisions about ownership changes  
  
When a login with the same name exists on the server (suggesting the user could be repaired with Repair-DbaDbOrphanUser instead), removal is blocked unless -Force is specified. This safety check prevents accidental deletions when remediation might be more appropriate than removal.  
  
Contained databases are automatically skipped since they manage authentication differently and cannot have orphaned users in the traditional sense.

## Syntax

```powershell
Remove-DbaDbOrphanUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-User] <Object[]>]
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
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sql2005
```

Finds and drops all orphan users without matching Logins in all databases present on server 'sql2005'.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -SqlCredential $cred
```

Finds and drops all orphan users without matching Logins in all databases present on server 'sqlserver2014a'. SQL Server authentication will be used in connecting to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1, db2 -Force
```

Finds and drops orphan users even if they have a matching Login on both db1 and db2 databases.<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -ExcludeDatabase db1, db2 -Force
```

Finds and drops orphan users even if they have a matching Login from all databases except db1 and db2.<br>

#####  Example:  5 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -User OrphanUser
```

Removes user OrphanUser from all databases only if there is no matching login.<br>

#####  Example:  6 

```powershell
PS C:\> Remove-DbaDbOrphanUser -SqlInstance sqlserver2014a -User OrphanUser -Force
```

Removes user OrphanUser from all databases even if they have a matching Login. Any schema that the user owns will change ownership to dbo.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Database

Specifies which databases to check for orphaned users. Accepts single database names, comma-separated lists, or arrays.  
When omitted, all accessible, non-read-only databases on the instance are processed. Contained databases are automatically skipped since they cannot have orphaned users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during orphaned user removal. Useful when you want to process most databases but avoid specific ones.  
Commonly used to exclude system databases, databases undergoing maintenance, or databases where user cleanup should be handled separately.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -User

Specifies specific orphaned users to target for removal instead of processing all orphaned users found.  
Use this when you need to remove only certain orphaned users rather than all orphans in the database. The function will verify these users are actually orphaned before removal.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Force

Bypasses safety checks that normally prevent orphaned user removal in potentially problematic scenarios.  
Required when the user owns schemas containing objects (ownership transfers to 'dbo') or when a matching login exists on the server (suggesting repair might be more appropriate than removal).  
Use with caution as this can change schema ownership and remove users that could potentially be repaired instead.

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
