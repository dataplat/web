---
title: "Repair-DbaDbOrphanUser"
slug: "Repair-DbaDbOrphanUser"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Repairs orphaned database users by remapping them to matching server logins or optionally removing them."
tags:
  - "Orphan"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaDbOrphanUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Repair-DbaDbOrphanUser"
draft: false
---

# Repair-DbaDbOrphanUser

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva) , Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Repair-DbaDbOrphanUser](https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaDbOrphanUser.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Repair-DbaDbOrphanUser](https://dataplat.github.io/boh#Repair-DbaDbOrphanUser).

## Synopsis

Repairs orphaned database users by remapping them to matching server logins or optionally removing them.

## Description

Identifies and repairs orphaned database users - users that exist in a database but are no longer associated with a server login. This commonly occurs after database restores, migrations, or when logins are recreated.  
  
The function searches each database for users where the Login property is empty, then attempts to remap them to existing server logins with matching names. For a login to be eligible for remapping, it must be enabled, not a system object, not locked, and have the exact same name as the orphaned user.  
  
Uses modern ALTER USER syntax for SQL Server 2005+ or the legacy sp_change_users_login procedure for SQL Server 2000. Optionally removes orphaned users that have no matching server login when -RemoveNotExisting is specified.

## Syntax

```powershell
Repair-DbaDbOrphanUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Users] <Object[]>]
    [-RemoveNotExisting]
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
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sql2005
```

Finds and repairs all orphan users of all databases present on server 'sql2005'<br>

#####  Example:  2 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -SqlCredential $cred
```

Finds and repair all orphan users in all databases present on server 'sqlserver2014a'. SQL credentials are used to authenticate to the server.<br>

#####  Example:  3 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1, db2
```

Finds and repairs all orphan users in both db1 and db2 databases.<br>

#####  Example:  4 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Database db1 -Users OrphanUser
```

Finds and repairs user 'OrphanUser' in 'db1' database.<br>

#####  Example:  5 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -Users OrphanUser
```

Finds and repairs user 'OrphanUser' on all databases<br>

#####  Example:  6 

```powershell
PS C:\> Repair-DbaDbOrphanUser -SqlInstance sqlserver2014a -RemoveNotExisting
```

Finds all orphan users of all databases present on server 'sqlserver2014a'. Removes all users that do not have  matching Logins.<br>

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

Specifies which databases to scan for orphaned users. Accepts wildcards for pattern matching and multiple database names.  
Use this when you only need to repair orphaned users in specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when scanning for orphaned users. Useful for avoiding system databases or databases under maintenance.  
Commonly used to exclude tempdb, distribution databases, or databases where orphaned users should remain untouched.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Users

Specifies specific database users to repair rather than processing all orphaned users found.  
Use this when you need to target specific problematic users or when working with large databases where selective repair is preferred.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -RemoveNotExisting

Removes orphaned database users that have no corresponding server login instead of just reporting them.  
Use this after database migrations or when cleaning up databases where some users should no longer exist. Exercise caution as this permanently removes users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses confirmation prompts and forces schema ownership changes to dbo when removing orphaned users.  
Required when orphaned users own database schemas that prevent their removal. Use with caution as it can affect database object ownership.

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
