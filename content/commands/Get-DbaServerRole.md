---
title: "Get-DbaServerRole"
slug: "Get-DbaServerRole"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves server-level security roles and their members from SQL Server instances."
tags:
  - "Role"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaServerRole.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaServerRole"
draft: false
---

# Get-DbaServerRole

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaServerRole](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaServerRole.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaServerRole](https://dataplat.github.io/boh#Get-DbaServerRole).

## Synopsis

Retrieves server-level security roles and their members from SQL Server instances.

## Description

Retrieves all server-level security roles from SQL Server instances, including role members, creation dates, and ownership details. This function helps DBAs audit server-level permissions, identify role membership for compliance reporting, and distinguish between built-in fixed roles (like sysadmin, serveradmin) and custom user-defined roles. Supports filtering to specific roles or excluding fixed roles to focus on custom security configurations.

## Syntax

```powershell
Get-DbaServerRole
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-ServerRole] <String[]>]
    [[-ExcludeServerRole] <String[]>]
    [-ExcludeFixedRole]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaServerRole -SqlInstance sql2016a
```

Outputs list of server-level roles for sql2016a instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaServerRole -SqlInstance sql2017a -ExcludeFixedRole
```

Outputs the server-level role(s) that are not fixed roles on sql2017a instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2005 or higher.

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

##### -ServerRole

Specifies one or more server-level roles to include in the results. Accepts role names like 'sysadmin', 'dbcreator', or custom role names.  
Use this when you need to audit specific roles rather than retrieving all server roles from the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeServerRole

Specifies one or more server-level roles to exclude from the results. Useful for filtering out roles you don't need to audit.  
Commonly used to exclude built-in roles like 'public' when focusing on administrative roles with elevated permissions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFixedRole

Excludes built-in fixed server roles from the results, showing only custom user-defined server roles.  
Use this when auditing custom security configurations or identifying roles created by your organization rather than SQL Server's default roles.

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


&nbsp;
