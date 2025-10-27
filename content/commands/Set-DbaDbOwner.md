---
title: "Set-DbaDbOwner"
slug: "Set-DbaDbOwner"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Changes database ownership to a specified login when current ownership doesn't match the target."
tags:
  - "Database"
  - "Owner"
  - "DbOwner"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbOwner.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbOwner"
draft: false
---

# Set-DbaDbOwner

| Property | Value |
| --- | --- |
| **Author** | Michael Fal (@Mike_Fal), mikefal.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbOwner](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbOwner.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbOwner](https://dataplat.github.io/boh#Set-DbaDbOwner).

## Synopsis

Changes database ownership to a specified login when current ownership doesn't match the target.

## Description

Changes database ownership to standardize who owns your databases across an instance. This is particularly useful for maintaining consistent ownership patterns after restoring databases from other environments, where databases may have orphaned owners or inconsistent ownership.  
  
By default, the function sets ownership to 'sa' (or the renamed sysadmin account), but you can specify any valid login. The function only processes user databases and includes safety checks to ensure the target login exists, isn't a Windows group, and isn't already mapped as a user within the database. You can target all databases on an instance or filter to specific databases.  
  
Best Practice reference: http://weblogs.sqlteam.com/dang/archive/2008/01/13/Database-Owner-Troubles.aspx

## Syntax

```powershell
Set-DbaDbOwner
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-InputObject] <Database[]>]
    [[-TargetLogin] <String>]
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
PS C:\> Set-DbaDbOwner -SqlInstance localhost
```

Sets database owner to 'sa' on all databases where the owner does not match 'sa'.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbOwner -SqlInstance localhost -TargetLogin DOMAIN\account
```

Sets the database owner to DOMAIN\account on all databases where the owner does not match DOMAIN\account.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaDbOwner -SqlInstance sqlserver -Database db1, db2
```

Sets database owner to 'sa' on the db1 and db2 databases if their current owner does not match 'sa'.<br>

#####  Example:  4 

```powershell
PS C:\> $db = Get-DbaDatabase -SqlInstance localhost -Database db1, db2
PS C:\> $db | Set-DbaDbOwner -TargetLogin DOMAIN\account
```

Sets database owner to 'sa' on the db1 and db2 databases if their current owner does not match 'sa'.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Database

Specifies which databases to change ownership for. Accepts database names and supports wildcards for pattern matching.  
When omitted, all user databases on the instance will be processed. System databases are automatically excluded.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during ownership changes. Useful when processing all databases but need to exclude specific ones.  
Accepts database names and supports wildcards for pattern matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase for pipeline operations. Use this when you need to filter databases with specific criteria before changing ownership.  
Allows for complex database selection logic beyond simple name matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -TargetLogin

Specifies the login to set as the new database owner. Defaults to 'sa' (or the renamed sysadmin account if sa was renamed).  
The login must exist on the server, cannot be a Windows group, and cannot already be mapped as a user within the target database. Common values include service accounts or standardized admin logins.

| Property | Value |
| --- | --- |
| Alias | Login |
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
