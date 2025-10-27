---
title: "Get-DbaUserPermission"
slug: "Get-DbaUserPermission"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net | Josh Smith"
availability: "Windows, Linux, macOS"
synopsis: "Audits comprehensive security permissions across SQL Server instances using DISA STIG methodology"
tags:
  - "Security"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaUserPermission.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaUserPermission"
draft: false
---

# Get-DbaUserPermission

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net , Josh Smith |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaUserPermission](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaUserPermission.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaUserPermission](https://dataplat.github.io/boh#Get-DbaUserPermission).

## Synopsis

Audits comprehensive security permissions across SQL Server instances using DISA STIG methodology

## Description

Performs a comprehensive security audit by analyzing all server logins, server-level permissions, database users, database roles, and object-level permissions across SQL Server instances. Creates temporary STIG (Security Technical Implementation Guide) objects in tempdb to gather detailed permission information for both direct and inherited access rights.  
  
This command is essential for security compliance audits, particularly for organizations implementing DISA STIG requirements. It reveals the complete permission landscape including role memberships, explicit grants/denials, and securable object permissions, giving DBAs the detailed visibility needed for access reviews and compliance reporting.  
  
The function uses DISA-provided Permissions.sql scripts to ensure thorough analysis of security configurations. By default, it excludes public/guest permissions and system objects to focus on meaningful security grants, but these can be included for complete visibility.  
  
Note that if you interrupt this command prematurely (Ctrl-C), it will leave behind a STIG schema in tempdb that should be manually cleaned up.

## Syntax

```powershell
Get-DbaUserPermission
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemDatabase]
    [-IncludePublicGuest]
    [-IncludeSystemObjects]
    [-ExcludeSecurables]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaUserPermission -SqlInstance sql2008, sqlserver2012
```

Check server and database permissions for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaUserPermission -SqlInstance sql2008 -Database TestDB
```

Check server and database permissions on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaUserPermission -SqlInstance sql2008 -Database TestDB -IncludePublicGuest -IncludeSystemObjects
```

Check server and database permissions on server sql2008 for only the TestDB database,<br>
including public and guest grants, and sys schema objects.<br>

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

Specifies which databases to audit for user permissions and role memberships. Accepts multiple database names and supports wildcards.  
Use this when you need to focus the security audit on specific databases rather than scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the security audit. Useful for excluding databases that don't require security review.  
Common scenarios include excluding development databases or databases with known compliant configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemDatabase

Excludes system databases (master, model, msdb, tempdb) from the security audit. Focuses the output on user databases only.  
Use this when compliance requirements only apply to application databases and not SQL Server system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludePublicGuest

Includes permissions granted to the public database role and guest user account in the audit results.  
Use this for complete security visibility, as public and guest permissions affect all users and can create unintended access paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemObjects

Includes permissions on system schema objects (sys, INFORMATION_SCHEMA) in the audit results.  
Enable this when security policies require auditing access to metadata views and system functions that could expose sensitive information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeSecurables

Excludes object-level permissions (tables, views, procedures, functions) from the audit and returns only role memberships.  
Use this for high-level security reviews focused on role-based access rather than granular object permissions.

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
