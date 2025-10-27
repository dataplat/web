---
title: "Enable-DbaStartupProcedure"
slug: "Enable-DbaStartupProcedure"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Configures stored procedures in the master database to execute automatically when SQL Server service starts"
tags:
  - "Procedure"
  - "Startup"
  - "StartupProcedure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaStartupProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaStartupProcedure"
draft: false
---

# Enable-DbaStartupProcedure

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaStartupProcedure](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaStartupProcedure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaStartupProcedure](https://dataplat.github.io/boh#Enable-DbaStartupProcedure).

## Synopsis

Configures stored procedures in the master database to execute automatically when SQL Server service starts

## Description

Marks stored procedures in the master database for automatic execution during SQL Server startup, eliminating the need to manually run initialization scripts after service restarts.  
This is essential for DBAs who need to ensure critical maintenance procedures, monitoring setup, or custom configurations are applied consistently every time the instance starts.  
The function modifies the procedure's Startup property using SMO, which is equivalent to running sp_procoption with @OptionValue = 'on'.  
Returns detailed information about each procedure processed, including success status and any error conditions encountered.

## Syntax

```powershell
Enable-DbaStartupProcedure
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-StartupProcedure] <Object[]>]
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
PS C:\> Enable-DbaStartupProcedure -SqlInstance SqlBox1\Instance2 -StartupProcedure '[dbo].[StartUpProc1]'
```

Attempts to set the procedure '[dbo].[StartUpProc1]' in the master database of SqlBox1\Instance2 for automatic execution when the instance is started.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Enable-DbaStartupProcedure -SqlInstance winserver\sqlexpress, sql2016 -SqlCredential $cred -StartupProcedure '[dbo].[StartUpProc1]'
```

Attempts to set the procedure '[dbo].[StartUpProc1]' in the master database of winserver\sqlexpress and sql2016 for automatic execution when the instance is started. Connects using sqladmin credential<br>

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

##### -StartupProcedure

Specifies the stored procedure(s) in the master database to enable for automatic startup execution. Accepts schema-qualified names like '[dbo].[MyStartupProc]' or simple names.  
Use this when you need specific procedures to run automatically after SQL Server service restarts, such as initialization scripts, monitoring setup, or custom configuration procedures.  
Multiple procedures can be specified as an array to enable several startup procedures in a single operation.

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
