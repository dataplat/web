---
title: "Test-DbaLoginPassword"
slug: "Test-DbaLoginPassword"
date: 2024-01-01
layout: "single"
author: "Peter Samuelsson"
availability: "Windows, Linux, macOS"
synopsis: "Identifies SQL Server logins with weak passwords including empty, username-matching, or dictionary-based passwords"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLoginPassword.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaLoginPassword"
draft: false
---

# Test-DbaLoginPassword

| Property | Value |
| --- | --- |
| **Author** | Peter Samuelsson |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaLoginPassword](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLoginPassword.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaLoginPassword](https://dataplat.github.io/boh#Test-DbaLoginPassword).

## Synopsis

Identifies SQL Server logins with weak passwords including empty, username-matching, or dictionary-based passwords

## Description

Tests SQL Server authentication logins for common weak password patterns using the PWDCOMPARE() function to validate password hashes stored in sys.sql_logins. This security audit function helps identify authentication vulnerabilities by checking for empty passwords, passwords that match the username, and passwords from a custom dictionary you provide. Use this during security reviews to find logins that could be easily compromised and require immediate password changes.

## Syntax

```powershell
Test-DbaLoginPassword
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [[-Dictionary] <String[]>]
    [[-InputObject] <Login[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaLoginPassword -SqlInstance Dev01
```

Test all SQL logins that the password is null or same as username on SQL server instance Dev01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaLoginPassword -SqlInstance Dev01 -Login sqladmin
```

Test the 'sqladmin' SQL login that the password is null or same as username on SQL server instance Dev01<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaLoginPassword -SqlInstance Dev01 -Dictionary Test1,test2
```

Test all SQL logins that the password is null, same as username or Test1,Test2 on SQL server instance Dev0<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaLogin -SqlInstance "sql2017","sql2016" | Test-DbaLoginPassword
```

Test all logins on sql2017 and sql2016<br>

#####  Example:  5 

```powershell
PS C:\> $servers | Get-DbaLogin | Out-GridView -PassThru | Test-DbaLoginPassword
```

Test selected logins on all servers in the $servers variable<br>

### Optional Parameters

##### -SqlInstance

The SQL Server instance you're checking logins on. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Allows you to login to servers using SQL Logins instead of Windows Authentication (AKA Integrated or Trusted). To use:  
$scred = Get-Credential, then pass $scred object to the -SqlCredential parameter.  
Windows Authentication will be used if SqlCredential is not specified. SQL Server does not accept Windows credentials being passed as credentials.  
To connect as a different Windows user, run PowerShell as that user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies which SQL authentication logins to test for weak passwords instead of testing all SQL logins on the instance.  
Accepts single login names, arrays of login names, or wildcard patterns for filtering specific accounts.  
Useful when you want to focus testing on high-privilege logins or specific service accounts that need immediate attention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Dictionary

Specifies additional passwords to test against all SQL authentication logins using PWDCOMPARE().  
Use this to check for organization-specific weak passwords like company names, common words, or previously breached passwords.  
These passwords are tested in addition to the default checks for empty passwords and username-matching passwords.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts login objects from Get-DbaLogin to test for weak passwords, enabling pipeline operations and complex filtering scenarios.  
Use this when you need to filter logins by properties like creation date, last login time, or server roles before testing passwords.  
Commonly used with Get-DbaLogin to test logins across multiple servers or with specific criteria that can't be achieved with the Login parameter alone.

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
