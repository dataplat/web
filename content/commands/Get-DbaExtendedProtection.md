---
title: "Get-DbaExtendedProtection"
slug: "Get-DbaExtendedProtection"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Extended Protection authentication settings from SQL Server network configuration."
tags:
  - "Instance"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExtendedProtection.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaExtendedProtection"
draft: false
---

# Get-DbaExtendedProtection

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaExtendedProtection](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExtendedProtection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaExtendedProtection](https://dataplat.github.io/boh#Get-DbaExtendedProtection).

## Synopsis

Retrieves Extended Protection authentication settings from SQL Server network configuration.

## Description

Retrieves the Extended Protection setting for SQL Server instances to help assess authentication security posture. Extended Protection is a Windows authentication enhancement that helps prevent credential relay attacks by validating channel binding and service principal names.  
  
This function queries the Windows registry directly rather than connecting to SQL Server, so it requires Windows-level access to the target server. The setting corresponds to what you see in SQL Server Configuration Manager under Network Configuration > Protocols properties, but can be checked programmatically across multiple instances for compliance auditing.  
  
Returns the current setting as both a numeric value (0, 1, 2) and descriptive text (Off, Allowed, Required) to help DBAs understand the security configuration and plan any necessary changes.

## Syntax

```powershell
Get-DbaExtendedProtection
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
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
PS C:\> Get-DbaExtendedProtection
```

Gets Extended Protection on the default (MSSQLSERVER) instance on localhost - requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaExtendedProtection -SqlInstance sql01\SQL2008R2SP2
```

Set Extended Protection of SQL Engine for the SQL2008R2SP2 on sql01 to "Off". Uses Windows Credentials to both connect and modify the registry.<br>
Gets Extended Protection for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both login and view the registry.<br>

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

Specifies alternative Windows credentials for connecting to the target computer to read registry values. This is for Windows computer access, not SQL Server authentication.  
Required when your current Windows account lacks administrative privileges on the target server or when connecting across domains.

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
