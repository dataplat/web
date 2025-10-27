---
title: "Get-DbaLogin"
slug: "Get-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Mitchell Hamann (@SirCaptainMitch) | Rob Sewell (@SQLDBaWithBeard)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server login accounts with filtering options for security audits and access management"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLogin"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaLogin</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLogin.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Mitchell Hamann (@SirCaptainMitch) , Rob Sewell (@SQLDBaWithBeard)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves SQL Server login accounts with filtering options for security audits and access management

## Description

Returns detailed information about SQL Server login accounts, including authentication type, security status, and last login times. This function helps DBAs perform security audits by identifying locked, disabled, or expired accounts, and distinguish between Windows and SQL authentication logins. Use it to troubleshoot access issues, generate compliance reports, or review login configurations across multiple instances.

## Syntax

```powershell
Get-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [[-IncludeFilter] <String[]>]
    [[-ExcludeLogin] <String[]>]
    [[-ExcludeFilter] <String[]>]
    [-ExcludeSystemLogin]
    [[-Type] <String>]
    [-HasAccess]
    [-Locked]
    [-Disabled]
    [-MustChangePassword]
    [-Detailed]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016" }

Gets all the logins from server sql2016 using NT authentication and returns the SMO login objects<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -SqlCredential $sqlcred
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -SqlCredential $sqlcred" }

Gets all the logins for a given SQL Server using a passed credential object and returns the SMO login objects<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -SqlCredential $sqlcred -Login dbatoolsuser,TheCaptain
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -SqlCredential $sqlcred -Login dbatoolsuser,TheCaptain" }

Get specific logins from server sql2016 returned as SMO login objects.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -IncludeFilter '##*','NT *'
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -IncludeFilter '##*','NT *'" }

Get all user objects from server sql2016 beginning with '##' or 'NT ', returned as SMO login objects.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -ExcludeLogin dbatoolsuser
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -ExcludeLogin dbatoolsuser" }

Get all user objects from server sql2016 except the login dbatoolsuser, returned as SMO login objects.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -Type Windows
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -Type Windows" }

Get all user objects from server sql2016 that are Windows Logins<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -Type Windows -IncludeFilter *Rob*
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -Type Windows -IncludeFilter *Rob*" }

Get all user objects from server sql2016 that are Windows Logins and have Rob in the name<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -Type SQL
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -Type SQL" }

Get all user objects from server sql2016 that are SQL Logins<br>

#####  Example:  9 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -Type SQL -IncludeFilter *Rob*
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -Type SQL -IncludeFilter *Rob*" }

Get all user objects from server sql2016 that are SQL Logins and have Rob in the name<br>

#####  Example:  10 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -ExcludeSystemLogin
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -ExcludeSystemLogin" }

Get all user objects from server sql2016 that are not system objects<br>

#####  Example:  11 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -ExcludeFilter '##*','NT *'
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -ExcludeFilter '##*','NT *'" }

Get all user objects from server sql2016 except any beginning with '##' or 'NT ', returned as SMO login objects.<br>

#####  Example:  12 

```powershell
PS C:\> 'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred
```
{: data-copyable="true" data-clean-code="'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred" }

Using Get-DbaLogin on the pipeline, you can also specify which names you would like with -Login.<br>

#####  Example:  13 

```powershell
PS C:\> 'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred -Locked
```
{: data-copyable="true" data-clean-code="'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred -Locked" }

Using Get-DbaLogin on the pipeline to get all locked logins on servers sql2016 and sql2014.<br>

#####  Example:  14 

```powershell
PS C:\> 'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred -HasAccess -Disabled
```
{: data-copyable="true" data-clean-code="'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred -HasAccess -Disabled" }

Using Get-DbaLogin on the pipeline to get all Disabled logins that have access on servers sql2016 or sql2014.<br>

#####  Example:  15 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 -Type SQL -Detailed
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 -Type SQL -Detailed" }

Get all user objects from server sql2016 that are SQL Logins. Get additional info for login available from LoginProperty function<br>

#####  Example:  16 

```powershell
PS C:\> 'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred -MustChangePassword
```
{: data-copyable="true" data-clean-code="'sql2016', 'sql2014' | Get-DbaLogin -SqlCredential $sqlcred -MustChangePassword" }

Using Get-DbaLogin on the pipeline to get all logins that must change password on servers sql2016 and sql2014.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.You must have sysadmin access and server version must be SQL Server version 2000 or higher.

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

##### -Login

Specifies specific login names to retrieve instead of returning all logins from the instance.  
Use this when you need information about particular accounts for troubleshooting access issues or security audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeFilter

Includes only logins matching the specified wildcard patterns (supports * and ? wildcards).  
Use this to find groups of related logins, such as all domain accounts from a specific organizational unit or service accounts with naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLogin

Excludes specific login names from the results.  
Useful when you want all logins except certain service accounts or system logins that you don't need to review.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeFilter

Excludes logins matching the specified wildcard patterns (supports * and ? wildcards).  
Commonly used to filter out system accounts or built-in logins when focusing on user accounts during security reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemLogin

Excludes built-in system logins like sa, BUILTIN\Administrators, and NT AUTHORITY accounts from results.  
Use this when performing user access audits where you only want to see custom logins created for applications and users.

| Property | Value |
| --- | --- |
| Alias | ExcludeSystemLogins |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Filters results to show only Windows Authentication logins or SQL Server Authentication logins.  
Use 'Windows' to review domain accounts and local Windows users, or 'SQL' to audit SQL Server native accounts that store passwords in the database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Windows,SQL |

##### -HasAccess

Returns only logins that currently have permission to connect to the SQL Server instance.  
Use this to verify which accounts can actually access the server, as some logins may exist but be denied connection rights.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Locked

Returns only login accounts that are currently locked due to failed authentication attempts.  
Use this to identify accounts that may need to be unlocked or investigate potential security incidents.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Disabled

Returns only login accounts that have been disabled but not dropped from the server.  
Use this to identify inactive accounts that should be reviewed for cleanup or re-enabling for returning employees.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MustChangePassword

Returns only SQL Server logins that are flagged to change their password on next login.  
Use this to identify accounts with temporary passwords or those requiring password updates due to security policies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Detailed

Includes additional security-related properties like bad password count, password age, and lockout times.  
Use this for comprehensive security audits when you need detailed information about password policies and authentication failures.

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
