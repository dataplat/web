---
title: "Repair-DbaInstanceName"
slug: "Repair-DbaInstanceName"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Updates SQL Server's @@SERVERNAME system variable to match the Windows hostname"
tags:
  - "SPN"
  - "Instance"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaInstanceName.ps1"
bohUrl: "https://dataplat.github.io/boh#Repair-DbaInstanceName"
draft: false
---

# Repair-DbaInstanceName

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Repair-DbaInstanceName](https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaInstanceName.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Repair-DbaInstanceName](https://dataplat.github.io/boh#Repair-DbaInstanceName).

## Synopsis

Updates SQL Server's @@SERVERNAME system variable to match the Windows hostname

## Description

Updates SQL Server's @@SERVERNAME system variable to match the current Windows hostname, which is required after renaming a Windows server. This ensures proper functionality for Kerberos authentication and Availability Groups.  
  
The function automatically detects the correct new server name and uses sp_dropserver and sp_addserver to update the SQL Server system tables. It handles common blockers like active replication and database mirroring, optionally removing them with the -AutoFix parameter.  
  
A SQL Server service restart is required to complete the rename process, which the function can perform automatically. The function will skip the operation if the names already match.  
  
https://www.mssqltips.com/sqlservertip/2525/steps-to-change-the-server-name-for-a-sql-server-machine/

## Syntax

```powershell
Repair-DbaInstanceName
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-AutoFix]
    [-Force]
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
PS C:\> Repair-DbaInstanceName -SqlInstance sql2014
```

Checks to see if the server name is updatable and changes the name with a number of prompts.<br>

#####  Example:  2 

```powershell
PS C:\> Repair-DbaInstanceName -SqlInstance sql2014 -AutoFix
```

Checks to see if the server name is updatable and automatically performs the change. Replication or mirroring will be broken if necessary.<br>

#####  Example:  3 

```powershell
PS C:\> Repair-DbaInstanceName -SqlInstance sql2014 -AutoFix -Force
```

Checks to see if the server name is updatable and automatically performs the change, bypassing most prompts and confirmations. Replication or mirroring will be broken if necessary.<br>

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

##### -AutoFix

Automatically resolves blockers that prevent the server name repair, including removing replication distribution and disabling database mirroring.  
Use this when you need to fix the server name without manual intervention to remove these blocking configurations.  
This parameter will prompt for confirmation before breaking replication or mirroring unless combined with -Force.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses confirmation prompts for potentially destructive operations like stopping SQL services and breaking replication or mirroring.  
Use this for unattended automation or when you're certain about proceeding with all changes.  
Combine with -AutoFix for fully automated server name repairs without any prompts.

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
