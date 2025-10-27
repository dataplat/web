---
title: "Set-DbaExtendedProtection"
slug: "Set-DbaExtendedProtection"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Configures Extended Protection for Authentication on SQL Server network protocols"
tags:
  - "Instance"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaExtendedProtection.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaExtendedProtection"
draft: false
---

# Set-DbaExtendedProtection

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaExtendedProtection](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaExtendedProtection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaExtendedProtection](https://dataplat.github.io/boh#Set-DbaExtendedProtection).

## Synopsis

Configures Extended Protection for Authentication on SQL Server network protocols

## Description

Modifies the Extended Protection registry setting for SQL Server network protocols to enhance connection security. Extended Protection helps prevent authentication relay attacks by requiring additional authentication at the network protocol level.  
  
This security feature is particularly useful in environments where you need to protect against man-in-the-middle attacks or when connecting over untrusted networks. When set to "Required", clients must support Extended Protection to connect, which may require updating older applications or connection strings.  
  
The function modifies Windows registry values directly and requires administrative privileges on the target server. Changes take effect immediately for new connections without requiring a SQL Server restart. This setting requires access to the Windows Server and not the SQL Server instance. The setting is found in SQL Server Configuration Manager under the properties of SQL Server Network Configuration > Protocols for "InstanceName".

## Syntax

```powershell
Set-DbaExtendedProtection
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Value] <Object>]
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
PS C:\> Set-DbaExtendedProtection
```

Set Extended Protection of SQL Engine on the default (MSSQLSERVER) instance on localhost to "Off". Requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaExtendedProtection -Value Required
```

Set Extended Protection of SQL Engine on the default (MSSQLSERVER) instance on localhost to "Required". Requires (and checks for) RunAs admin.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaExtendedProtection -SqlInstance sql01\SQL2008R2SP2
```

Set Extended Protection of SQL Engine for the SQL2008R2SP2 on sql01 to "Off". Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaExtendedProtection -SqlInstance sql01\SQL2008R2SP2 -Value Allowed
```

Set Extended Protection of SQL Engine for the SQL2008R2SP2 on sql01 to "Allowed". Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaExtendedProtection -SqlInstance sql01\SQL2008R2SP2 -WhatIf
```

Shows what would happen if the command were executed.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the computer (not SQL Server instance) using alternative Windows credentials

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Value

Specifies the Extended Protection level for SQL Server network protocols. Accepts "Off", "Allowed", or "Required" (or equivalent integers 0, 1, 2).  
Use "Off" to disable Extended Protection, "Allowed" to accept both protected and unprotected connections, or "Required" to enforce Extended Protection for all client connections.  
Defaults to "Off" when not specified. Setting to "Required" may prevent older applications from connecting unless they support Extended Protection authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Off |
| Accepted Values | 0,Off,1,Allowed,2,Required |

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
