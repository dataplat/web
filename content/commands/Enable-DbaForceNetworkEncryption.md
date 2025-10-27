---
title: "Enable-DbaForceNetworkEncryption"
slug: "Enable-DbaForceNetworkEncryption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server to require encrypted connections from all clients by modifying the Windows registry"
tags:
  - "Certificate"
  - "Encryption"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaForceNetworkEncryption.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaForceNetworkEncryption"
draft: false
---

# Enable-DbaForceNetworkEncryption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaForceNetworkEncryption](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaForceNetworkEncryption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaForceNetworkEncryption](https://dataplat.github.io/boh#Enable-DbaForceNetworkEncryption).

## Synopsis

Configures SQL Server to require encrypted connections from all clients by modifying the Windows registry

## Description

Modifies the Windows registry to force all client connections to SQL Server to use encryption, regardless of the client's encryption settings. This security feature ensures that all data transmitted between clients and SQL Server is encrypted, protecting against network eavesdropping and man-in-the-middle attacks.  
  
This function operates at the Windows level by updating the ForceEncryption registry value in the SQL Server network configuration, which normally requires manual changes through SQL Server Configuration Manager. The setting applies to all protocols and client connections to the specified instance.  
  
Important: You must restart the SQL Server service after running this command for the encryption requirement to take effect. Requires Windows administrator privileges on the target server, not SQL Server permissions.

## Syntax

```powershell
Enable-DbaForceNetworkEncryption
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
PS C:\> Enable-DbaForceNetworkEncryption
```

Enables Force Encryption on the default (MSSQLSERVER) instance on localhost. Requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2
```

Enables Force Network Encryption for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  3 

```powershell
PS C:\> Enable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2 -WhatIf
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

Windows credentials for connecting to the remote computer to modify registry settings. Required when the current user lacks administrative access to the target server.  
This is used for Windows authentication to the computer, not SQL Server login credentials.

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
