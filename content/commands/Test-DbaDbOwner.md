---
title: "Test-DbaDbOwner"
slug: "Test-DbaDbOwner"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies databases with incorrect ownership for security compliance and best practice enforcement."
tags:
  - "Database"
  - "Owner"
  - "DbOwner"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbOwner.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbOwner"
draft: false
---

# Test-DbaDbOwner

| Property | Value |
| --- | --- |
| **Author** | Michael Fal (@Mike_Fal), mikefal.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbOwner](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbOwner.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbOwner](https://dataplat.github.io/boh#Test-DbaDbOwner).

## Synopsis

Identifies databases with incorrect ownership for security compliance and best practice enforcement.

## Description

This function compares the current owner of each database against a target login and returns only databases that do NOT match the expected owner. By default, it checks against 'sa' (or the renamed sysadmin account if 'sa' was changed), but you can specify any valid login.  
  
This addresses a common security compliance requirement where databases should be owned by a specific account rather than individual user accounts. Mismatched ownership can cause issues with scheduled jobs, maintenance plans, and security policies.  
  
The function automatically detects if the 'sa' account was renamed and uses the actual sysadmin login name. It returns detailed information including current owner, target owner, and ownership status for easy identification of databases requiring ownership changes.  
  
Best Practice reference: http://weblogs.sqlteam.com/dang/archive/2008/01/13/Database-Owner-Troubles.aspx

## Syntax

```powershell
Test-DbaDbOwner
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-TargetLogin <String>]
    [-InputObject <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbOwner -SqlInstance localhost
```

Returns all databases where the owner does not match 'sa'.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbOwner -SqlInstance localhost -TargetLogin 'DOMAIN\account'
```

Returns all databases where the owner does not match 'DOMAIN\account'.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -OnlyAccessible | Test-DbaDbOwner
```

Gets only accessible databases and checks where the owner does not match 'sa'.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

Specifies which databases to check for ownership compliance. Accepts wildcards for pattern matching.  
Use this when you need to audit ownership for specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the ownership compliance check. Accepts wildcards for pattern matching.  
Useful for excluding system databases or databases with intentionally different ownership from standard policy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TargetLogin

Specifies the expected database owner login for compliance checking. Defaults to 'sa' or the renamed sysadmin account if 'sa' was changed.  
Use this to enforce organizational standards where databases should be owned by a service account or specific login rather than individual users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for ownership verification.  
Use this to check ownership on a pre-filtered set of databases or when chaining with other database operations.

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
