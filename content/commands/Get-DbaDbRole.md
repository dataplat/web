---
title: "Get-DbaDbRole"
slug: "Get-DbaDbRole"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database roles from SQL Server instances for security auditing and permission analysis."
tags:
  - "Role"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbRole"
draft: false
---

# Get-DbaDbRole

| Property | Value |
| --- | --- |
| **Author** | Ben Miller (@DBAduck) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbRole](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbRole](https://dataplat.github.io/boh#Get-DbaDbRole).

## Synopsis

Retrieves database roles from SQL Server instances for security auditing and permission analysis.

## Description

Retrieves all database roles (both fixed and custom) from one or more SQL Server databases, returning detailed role information for security audits and compliance reporting. This function examines the roles collection in each accessible database, allowing you to identify custom roles, exclude built-in fixed roles, or focus on specific roles by name. Essential for documenting role structures across environments, troubleshooting permission issues, and ensuring consistent security configurations during migrations or standardization projects.

## Syntax

```powershell
Get-DbaDbRole
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Role] <String[]>]
    [[-ExcludeRole] <String[]>]
    [-ExcludeFixedRole]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance localhost
```

Returns all database roles in all databases on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance localhost, sql2016
```

Returns all roles of all database(s) on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Get-DbaDbRole
```

Returns roles of all database(s) for every server in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance localhost -Database msdb
```

Returns roles of the database msdb on localhost.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance localhost -Database msdb -ExcludeFixedRole
```

Returns all non-fixed roles in the msdb database on localhost.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDbRole -SqlInstance localhost -Database msdb -Role 'db_owner'
```

Returns the db_owner role in the msdb database on localhost.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

Specifies which databases to examine for role information. Accepts wildcards for pattern matching.  
Use this when you need to audit roles in specific databases rather than scanning all databases on the instance.  
Particularly useful for focusing on user databases while skipping system databases, or for compliance audits of specific applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specified databases from role enumeration. Accepts wildcards for pattern matching.  
Use this to skip databases you don't need to audit, such as development databases during production security reviews.  
Commonly used to exclude system databases or databases with known standard configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Role

Specifies which database roles to retrieve by name. Accepts wildcards for pattern matching.  
Use this when investigating specific roles across databases, such as checking for custom application roles or finding all instances of a particular role name.  
Particularly useful for security audits focusing on elevated permissions like 'db_owner' or custom admin roles.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeRole

Excludes specified roles from the results by name. Accepts wildcards for pattern matching.  
Use this to filter out roles you're not interested in, such as excluding standard fixed roles when focusing on custom application roles.  
Helpful for reducing noise in reports when you want to see only non-standard or suspicious role configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFixedRole

Excludes all built-in fixed database roles from the results, showing only custom user-defined roles.  
Use this when auditing custom role implementations or when you need to focus on application-specific security configurations.  
Fixed roles like db_owner, db_datareader, and db_datawriter are filtered out, along with the public role.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline for role enumeration.  
Use this when you need to chain database selection criteria with role analysis, such as filtering databases by size, compatibility level, or other properties first.  
Allows for more complex filtering scenarios than the basic Database parameter provides.

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


&nbsp;
