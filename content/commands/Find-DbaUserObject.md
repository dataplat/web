---
title: "Find-DbaUserObject"
slug: "Find-DbaUserObject"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Finds SQL Server objects owned by users other than sa or dbo, or searches for objects owned by a specific user pattern."
tags:
  - "Object"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaUserObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaUserObject"
draft: false
---

# Find-DbaUserObject

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaUserObject](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaUserObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaUserObject](https://dataplat.github.io/boh#Find-DbaUserObject).

## Synopsis

Finds SQL Server objects owned by users other than sa or dbo, or searches for objects owned by a specific user pattern.

## Description

Scans SQL Server instances to identify objects with non-standard ownership, which is critical for security auditing and user management.  
When removing user accounts or performing security reviews, you need to know what objects they own to avoid breaking dependencies.  
This function searches databases, SQL Agent jobs, credentials, proxies, endpoints, server roles, schemas, database roles, assemblies, and synonyms.  
Use the Pattern parameter to search for objects owned by a specific user, or run without it to find all user-owned objects that aren't owned by system accounts.

## Syntax

```powershell
Find-DbaUserObject
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Pattern] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaUserObject -SqlInstance DEV01 -Pattern ad\stephen
```

Searches user objects for owner ad\stephen<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaUserObject -SqlInstance DEV01 -Verbose
```

Shows all user owned (non-sa, non-dbo) objects and verbose output<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input

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

##### -Pattern

Searches for objects owned by accounts matching this regex pattern. Use this when looking for objects owned by a specific user or group of users.  
When omitted, finds all objects not owned by system accounts (sa/dbo). Supports Windows domain accounts like 'DOMAIN\username' or SQL logins.

| Property | Value |
| --- | --- |
| Alias |  |
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


&nbsp;
