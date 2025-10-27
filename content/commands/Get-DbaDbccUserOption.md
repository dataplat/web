---
title: "Get-DbaDbccUserOption"
slug: "Get-DbaDbccUserOption"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves current session-level SET options and connection settings from SQL Server instances"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccUserOption.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbccUserOption"
draft: false
---

# Get-DbaDbccUserOption

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbccUserOption](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccUserOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbccUserOption](https://dataplat.github.io/boh#Get-DbaDbccUserOption).

## Synopsis

Retrieves current session-level SET options and connection settings from SQL Server instances

## Description

Executes DBCC USEROPTIONS against SQL Server instances to display current session settings including ANSI options, isolation levels, date formats, language, and timeout values. This is particularly useful when troubleshooting application connection issues or verifying that session-level defaults match across environments. You can filter results to specific options or retrieve all current settings to compare against expected configurations during deployments or performance investigations.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-useroptions-transact-sql

## Syntax

```powershell
Get-DbaDbccUserOption
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Option] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbccUserOption -SqlInstance Server1
```

Get results of DBCC USEROPTIONS for Instance Server1<br>

#####  Example:  2 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccUserOption
```

Get results of DBCC USEROPTIONS for Instances Sql1 and Sql2/sqlexpress<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccUserOption -SqlInstance Server1 -SqlCredential $cred
```

Connects using sqladmin credential and gets results of DBCC USEROPTIONS for Instance Server1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbccUserOption -SqlInstance Server1 -Option ansi_nulls, ansi_warnings, datefirst
```

Gets results of DBCC USEROPTIONS for Instance Server1. Only display results for the options ansi_nulls, ansi_warnings, datefirst<br>

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

##### -Option

Filters results to show only specific session options instead of all DBCC USEROPTIONS output. Use this when troubleshooting specific connection settings like ANSI options, date formats, or isolation   
levels without seeing the full list of 13 available options.  
Accepts any values in set 'ansi_null_dflt_on', 'ansi_nulls', 'ansi_padding', 'ansi_warnings', 'arithabort', 'concat_null_yields_null', 'datefirst', 'dateformat', 'isolation level', 'language',   
'lock_timeout', 'quoted_identifier', 'textsize'

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ansi_null_dflt_on,ansi_nulls,ansi_padding,ansi_warnings,arithabort,concat_null_yields_null,datefirst,dateformat,isolation level,language,lock_timeout,quoted_identifier,textsize |

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
