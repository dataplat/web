---
title: "Disable-DbaStartupProcedure"
slug: "Disable-DbaStartupProcedure"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Removes stored procedures from SQL Server's automatic startup execution list"
tags:
  - "Procedure"
  - "Startup"
  - "StartupProcedure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaStartupProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaStartupProcedure"
draft: false
---

# Disable-DbaStartupProcedure

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaStartupProcedure](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaStartupProcedure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaStartupProcedure](https://dataplat.github.io/boh#Disable-DbaStartupProcedure).

## Synopsis

Removes stored procedures from SQL Server's automatic startup execution list

## Description

Prevents stored procedures from automatically executing when the SQL Server service starts by clearing their startup designation in the master database.  
This is essential when troubleshooting startup issues or removing procedures that were previously configured to run at service startup.  
Equivalent to running sp_procoption with @OptionValue = off, but provides object-based management with detailed status reporting.  
Returns enhanced SMO StoredProcedure objects showing the action results and current startup status.

## Syntax

```powershell
Disable-DbaStartupProcedure
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-StartupProcedure] <String[]>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Disable-DbaStartupProcedure -SqlInstance SqlBox1\Instance2 -StartupProcedure '[dbo].[StartUpProc1]'
```

Attempts to clear the automatic execution of the procedure '[dbo].[StartUpProc1]' in the master database of SqlBox1\Instance2 when the instance is started.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Disable-DbaStartupProcedure -SqlInstance winserver\sqlexpress, sql2016 -SqlCredential $cred -StartupProcedure '[dbo].[StartUpProc1]'
```

Attempts to clear the automatic execution of the procedure '[dbo].[StartUpProc1]' in the master database of winserver\sqlexpress and sql2016 when the instance is started. Connects using sqladmin <br>
credential<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaStartupProcedure -SqlInstance sql2016 | Disable-DbaStartupProcedure
```

Get all startup procedures for the sql2016 instance and disables them by piping to Disable-DbaStartupProcedure<br>

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

##### -StartupProcedure

Specifies the stored procedure names to remove from automatic startup execution. Accepts schema-qualified names like '[dbo].[MyStartupProc]'.  
Use this when you know the specific procedure names that need their startup designation disabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts stored procedure objects from Get-DbaStartupProcedure via pipeline input.  
Use this when working with the results of Get-DbaStartupProcedure to disable multiple startup procedures at once.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
