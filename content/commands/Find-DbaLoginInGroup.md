---
title: "Find-DbaLoginInGroup"
slug: "Find-DbaLoginInGroup"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Discovers individual Active Directory users within Windows group logins on SQL Server instances."
tags:
  - "Login"
  - "Group"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaLoginInGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaLoginInGroup"
draft: false
---

# Find-DbaLoginInGroup

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com , Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaLoginInGroup](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaLoginInGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaLoginInGroup](https://dataplat.github.io/boh#Find-DbaLoginInGroup).

## Synopsis

Discovers individual Active Directory users within Windows group logins on SQL Server instances.

## Description

Connects to SQL Server instances and recursively expands all Windows Active Directory group logins to reveal the individual user accounts that inherit access through group membership. This function queries Active Directory to enumerate all users within each Windows group login, including nested groups, providing a complete view of who actually has access to your SQL Server through group-based authentication. Essential for security audits, compliance reporting, and troubleshooting login access issues when you need to know which specific users can connect through group logins.

## Syntax

```powershell
Find-DbaLoginInGroup
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaLoginInGroup -SqlInstance DEV01 -Login "MyDomain\Stephen.Bennett"
```

Returns all active directory groups with logins on Sql Instance DEV01 that contain the AD user Stephen.Bennett.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaLoginInGroup -SqlInstance DEV01
```

Returns all active directory users within all windows AD groups that have logins on the instance.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaLoginInGroup -SqlInstance DEV01 | Where-Object Login -like '*stephen*'
```

Returns all active directory users within all windows AD groups that have logins on the instance whose login contains "stephen"<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

PSCredential object to connect under. If not specified, current Windows login will be used.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Filters results to show only Windows Active Directory groups that contain the specified individual user account(s).  
Use this when you need to find which AD groups give a specific user access to SQL Server, rather than seeing all users from all groups.  
Accepts multiple login names in DOMAIN\username format and supports pipeline input.

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
