---
title: "Get-DbaDbccHelp"
slug: "Get-DbaDbccHelp"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves syntax help and parameter information for DBCC commands"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccHelp.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbccHelp"
draft: false
---

# Get-DbaDbccHelp

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbccHelp](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccHelp.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbccHelp](https://dataplat.github.io/boh#Get-DbaDbccHelp).

## Synopsis

Retrieves syntax help and parameter information for DBCC commands

## Description

Executes DBCC HELP against SQL Server to display syntax, parameters, and usage information for Database Console Commands. This saves you from having to look up DBCC command syntax in documentation, especially for complex commands like CHECKDB, CHECKTABLE, or SHRINKFILE. Supports both documented and undocumented DBCC commands when used with the IncludeUndocumented parameter.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-help-transact-sql

## Syntax

```powershell
Get-DbaDbccHelp
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Statement] <String>]
    [-IncludeUndocumented]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbccHelp -SqlInstance SQLInstance -Statement FREESYSTEMCACHE -Verbose | Format-List
```

Runs the command DBCC HELP(FREESYSTEMCACHE) WITH NO_INFOMSGS against the SQLInstance SQL Server instance.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbccHelp -SqlInstance SQLInstance -Statement WritePage -IncludeUndocumented | Format-List
```

Sets Trace Flag 2588 on for the session and then runs the command DBCC HELP(WritePage) WITH NO_INFOMSGS against the SQLInstance SQL Server instance.<br>

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

##### -Statement

Specifies the DBCC command name to get syntax help for. Provide only the command portion after "DBCC" (e.g., CHECKDB, CHECKTABLE, SHRINKFILE).  
Use this when you need to verify command syntax before running maintenance operations or troubleshooting database issues.  
Common commands include CHECKDB for database integrity, SHRINKFILE for file management, or FREEPROCCACHE for memory management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeUndocumented

Enables access to help for undocumented DBCC commands by setting trace flag 2588 for the session.  
Use this when troubleshooting advanced scenarios that require undocumented commands like WRITEPAGE or PAGE.  
Only works on SQL Server 2005 and higher, and should be used with caution as undocumented commands can affect system stability.

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
