---
title: "Remove-DbaDbUser"
slug: "Remove-DbaDbUser"
date: 2024-01-01
layout: "single"
author: "Doug Meyers (@dgmyrs)"
availability: "Windows, Linux, macOS"
synopsis: "Removes database users from SQL Server databases with intelligent schema ownership handling"
tags:
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbUser.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbUser"
draft: false
---

# Remove-DbaDbUser

| Property | Value |
| --- | --- |
| **Author** | Doug Meyers (@dgmyrs) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbUser](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbUser.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbUser](https://dataplat.github.io/boh#Remove-DbaDbUser).

## Synopsis

Removes database users from SQL Server databases with intelligent schema ownership handling

## Description

Safely removes database users from SQL Server databases while automatically handling schema ownership conflicts that would normally prevent user deletion. This eliminates the manual process of identifying and resolving schema ownership issues before removing users.  
  
When a user owns schemas, the function intelligently manages the cleanup: schemas with the same name as the user are dropped (if empty), while other owned schemas have their ownership transferred to 'dbo'. If schemas contain objects, use -Force to allow ownership transfer and proceed with user removal.  
  
The function works across multiple databases and instances, making it ideal for cleanup operations during user deprovisioning or database migrations where you need to remove users without leaving orphaned objects or broken ownership chains.

## Syntax

```powershell
Remove-DbaDbUser
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    -User <Object[]>
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbUser -InputObject <User[]>
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
PS C:\> Remove-DbaDbUser -SqlInstance sqlserver2014 -User user1
```

Drops user1 from all databases it exists in on server 'sqlserver2014'.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbUser -SqlInstance sqlserver2014 -Database database1 -User user1
```

Drops user1 from the database1 database on server 'sqlserver2014'.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbUser -SqlInstance sqlserver2014 -ExcludeDatabase model -User user1
```

Drops user1 from all databases it exists in on server 'sqlserver2014' except for the model database.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbUser sqlserver2014 | Where-Object Name -In "user1" | Remove-DbaDbUser
```

Drops user1 from all databases it exists in on server 'sqlserver2014'.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -User

Specifies the database user(s) to remove from the target databases. Accepts multiple user names for bulk operations.  
The function will automatically handle schema ownership conflicts that typically prevent user deletion.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts user objects from Get-DbaDbUser for pipeline operations. This allows for advanced filtering scenarios.  
Use this when you need to remove users based on complex criteria like creation date, permissions, or other user properties.

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
For MFA support, please use Connect-DbaInstance..

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the database(s) from which to remove the specified users. Accepts wildcards for pattern matching.  
When omitted, the function processes all accessible databases on the instance to find and remove the specified users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies the database(s) to skip during user removal operations. Use this to protect critical databases like system databases.  
Commonly used to exclude model, tempdb, or production databases during bulk user cleanup operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces schema ownership transfer to 'dbo' when the user owns schemas containing database objects. Without this, user removal fails if owned schemas contain objects.  
Use this during user deprovisioning when you need to ensure complete cleanup regardless of schema dependencies.

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

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
