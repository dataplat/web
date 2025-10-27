---
title: "Get-DbaDbCheckConstraint"
slug: "Get-DbaDbCheckConstraint"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@ClaudioESSilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Gets database Check constraints."
tags:
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCheckConstraint.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbCheckConstraint"
draft: false
---

# Get-DbaDbCheckConstraint

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@ClaudioESSilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbCheckConstraint](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbCheckConstraint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbCheckConstraint](https://dataplat.github.io/boh#Get-DbaDbCheckConstraint).

## Synopsis

Gets database Check constraints.

## Description

Gets database Checks constraints.

## Syntax

```powershell
Get-DbaDbCheckConstraint
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemTable]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbCheckConstraint -SqlInstance sql2016
```

Gets all database check constraints.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbCheckConstraint -SqlInstance Server1 -Database db1
```

Gets the check constraints for the db1 database.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbCheckConstraint -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the check constraints for all databases except db1.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbCheckConstraint -SqlInstance Server1 -ExcludeSystemTable
```

Gets the check constraints for all databases that are not system objects.<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbCheckConstraint
```

Gets the check constraints for the databases on Sql1 and Sql2/sqlexpress.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

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

Specifies which databases to search for check constraints. Accepts wildcards and multiple database names.  
Use this when you need to examine constraints on specific databases rather than all accessible databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the check constraint search. Accepts multiple database names.  
Useful when you want to scan most databases but skip certain ones like development or temporary databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemTable

Excludes check constraints from system tables when searching through databases.  
Use this to focus only on user-created tables and avoid system table constraints that are typically not relevant for DBA reviews.

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
