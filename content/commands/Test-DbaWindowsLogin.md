---
title: "Test-DbaWindowsLogin"
slug: "Test-DbaWindowsLogin"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Validates Windows logins and groups in SQL Server against Active Directory to identify orphaned, disabled, or problematic accounts"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaWindowsLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaWindowsLogin"
draft: false
---

# Test-DbaWindowsLogin

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaWindowsLogin](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaWindowsLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaWindowsLogin](https://dataplat.github.io/boh#Test-DbaWindowsLogin).

## Synopsis

Validates Windows logins and groups in SQL Server against Active Directory to identify orphaned, disabled, or problematic accounts

## Description

Queries SQL Server for all Windows-based logins and groups, then validates each against Active Directory to identify security issues and cleanup opportunities. The function checks whether AD accounts still exist, are enabled, and match their SQL Server SID to detect orphaned logins from domain migrations or account deletions. This helps DBAs maintain login security by identifying stale Windows authentication accounts that should be removed from SQL Server.

## Syntax

```powershell
Test-DbaWindowsLogin
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [[-ExcludeLogin] <String[]>]
    [[-FilterBy] <String>]
    [[-IgnoreDomains] <String[]>]
    [[-InputObject] <Login[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaWindowsLogin -SqlInstance Dev01
```

Tests all logins in the current Active Directory domain that are either disabled or do not exist on the SQL Server instance Dev01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaWindowsLogin -SqlInstance Dev01 -FilterBy GroupsOnly | Select-Object -Property *
```

Tests all Active Directory groups that have logins on Dev01, and shows all information for those logins<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaWindowsLogin -SqlInstance Dev01 -IgnoreDomains testdomain
```

Tests all Domain logins excluding any that are from the testdomain<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaLogin -SqlInstance Dev01 -Login DOMAIN\User | Test-DbaWindowsLogin
```

Tests only the login returned by Get-DbaLogin<br>

### Optional Parameters

##### -SqlInstance

The SQL Server instance you're checking logins on. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

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

##### -Login

Specifies specific Windows logins to validate against Active Directory. Use this when you want to test only certain logins rather than all Windows accounts on the server.  
Accepts wildcards and multiple values. Helpful for focused security audits of high-privilege accounts or problem logins.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLogin

Excludes specific Windows logins from validation checks. Use this to skip service accounts or known system logins that you don't need to audit.  
Accepts wildcards and multiple values. Common exclusions include application service accounts and break-glass emergency accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FilterBy

Limits validation to either individual user accounts or Active Directory groups. Use 'LoginsOnly' when auditing user access or 'GroupsOnly' when reviewing group-based permissions.  
Default of 'None' validates both types. GroupsOnly is useful for reviewing role-based access control implementation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |
| Accepted Values | LoginsOnly,GroupsOnly,None |

##### -IgnoreDomains

Excludes logins from specific Active Directory domains from validation. Use this in multi-domain environments to focus on specific domains or skip legacy/untrusted domains.  
Helpful when you have old domain trusts or want to audit only production domains while excluding development or test domains.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts login objects from Get-DbaLogin for targeted validation. Use this when you want to validate a specific subset of logins already retrieved by another command.  
Enables powerful filtering scenarios by piping pre-filtered login objects instead of processing all Windows logins on the server.

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
