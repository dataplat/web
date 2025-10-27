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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaLoginPassword</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLoginPassword.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Peter Samuelsson</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaLoginPassword -SqlInstance Dev01" }

Test all SQL logins that the password is null or same as username on SQL server instance Dev01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaLoginPassword -SqlInstance Dev01 -Login sqladmin
```
{: data-copyable="true" data-clean-code="Test-DbaLoginPassword -SqlInstance Dev01 -Login sqladmin" }

Test the 'sqladmin' SQL login that the password is null or same as username on SQL server instance Dev01<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaLoginPassword -SqlInstance Dev01 -Dictionary Test1,test2
```
{: data-copyable="true" data-clean-code="Test-DbaLoginPassword -SqlInstance Dev01 -Dictionary Test1,test2" }

Test all SQL logins that the password is null, same as username or Test1,Test2 on SQL server instance Dev0<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaLogin -SqlInstance "sql2017","sql2016" | Test-DbaLoginPassword
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance &quot;sql2017&quot;,&quot;sql2016&quot; | Test-DbaLoginPassword" }

Test all logins on sql2017 and sql2016<br>

#####  Example:  5 

```powershell
PS C:\> $servers | Get-DbaLogin | Out-GridView -PassThru | Test-DbaLoginPassword
```
{: data-copyable="true" data-clean-code="$servers | Get-DbaLogin | Out-GridView -PassThru | Test-DbaLoginPassword" }

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
