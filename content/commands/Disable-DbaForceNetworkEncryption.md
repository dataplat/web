---
title: "Disable-DbaForceNetworkEncryption"
slug: "Disable-DbaForceNetworkEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Disables Force Network Encryption setting in SQL Server Configuration Manager"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaForceNetworkEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaForceNetworkEncryption"
draft: false
---

# Disable-DbaForceNetworkEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaForceNetworkEncryption](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaForceNetworkEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaForceNetworkEncryption](https://dataplat.github.io/boh#Disable-DbaForceNetworkEncryption).

## Synopsis

Disables Force Network Encryption setting in SQL Server Configuration Manager

## Description

Modifies the Windows registry to disable Force Network Encryption for SQL Server instances, allowing unencrypted client connections. This is useful when troubleshooting connectivity issues, working with legacy applications that don't support encryption, or when encryption is handled at the network level. Requires Windows administrator access to the target server and PowerShell remoting. SQL Server service must be restarted for changes to take effect.

## Syntax

```powershell
Disable-DbaForceNetworkEncryption
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
PS C:\> Disable-DbaForceNetworkEncryption
```

Disables Force Encryption on the default (MSSQLSERVER) instance on localhost - requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2
```

Disables Force Network Encryption for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both login and modify the registry.<br>

#####  Example:  3 

```powershell
PS C:\> Disable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2 -WhatIf
```

Shows what would happen if the command were executed.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances where Force Network Encryption will be disabled in the Windows registry.  
Use this to specify which SQL Server instances need their encryption requirements modified, typically for troubleshooting connectivity issues or supporting legacy applications that don't support   
encrypted connections.  
Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Specifies Windows credentials for connecting to the target computer to modify registry settings.  
The account must have local administrator privileges on the target server since this function modifies the Windows registry and uses PowerShell remoting.  
Use this when your current credentials don't have the required administrative access to the target machine.

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
