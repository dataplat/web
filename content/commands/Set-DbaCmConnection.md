---
title: "Set-DbaCmConnection"
slug: "Set-DbaCmConnection"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Configures remote computer connection settings for SQL Server host management."
tags:
  - "ComputerManagement"
  - "CIM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaCmConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaCmConnection"
draft: false
---

# Set-DbaCmConnection

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaCmConnection](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaCmConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaCmConnection](https://dataplat.github.io/boh#Set-DbaCmConnection).

## Synopsis

Configures remote computer connection settings for SQL Server host management.

## Description

Configures connection objects that dbatools uses to manage remote SQL Server host computers via CIM, WMI, and PowerShell remoting.  
This function creates new connection records for computers not yet cached, or modifies existing connection settings for previously contacted hosts.  
  
Use this to bulk-configure connection behavior, manage credential caching, or troubleshoot remote connection issues when dbatools functions need to access SQL Server host systems for tasks like service management, file operations, or system information gathering.

## Syntax

```powershell
Set-DbaCmConnection
    [-ComputerName <DbaCmConnectionParameter[]>]
    [-Credential <PSCredential>]
    [-OverrideExplicitCredential]
    [-OverrideConnectionPolicy]
    [-DisabledConnectionTypes {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-DisableBadCredentialCache]
    [-DisableCimPersistence]
    [-DisableCredentialAutoRegister]
    [-EnableCredentialFailover]
    [-WindowsCredentialsAreBad]
    [-CimWinRMOptions <WSManSessionOptions>]
    [-CimDCOMOptions <DComSessionOptions>]
    [-AddBadCredential <PSCredential[]>]
    [-RemoveBadCredential <PSCredential[]>]
    [-ClearBadCredential]
    [-ClearCredential]
    [-ResetCredential]
    [-ResetConnectionStatus]
    [-ResetConfiguration]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaCmConnection
    [-ComputerName <DbaCmConnectionParameter[]>]
    [-UseWindowsCredentials]
    [-OverrideExplicitCredential]
    [-OverrideConnectionPolicy]
    [-DisabledConnectionTypes {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-DisableBadCredentialCache]
    [-DisableCimPersistence]
    [-DisableCredentialAutoRegister]
    [-EnableCredentialFailover]
    [-CimWinRMOptions <WSManSessionOptions>]
    [-CimDCOMOptions <DComSessionOptions>]
    [-AddBadCredential <PSCredential[]>]
    [-RemoveBadCredential <PSCredential[]>]
    [-ClearBadCredential]
    [-ClearCredential]
    [-ResetCredential]
    [-ResetConnectionStatus]
    [-ResetConfiguration]
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
PS C:\> Get-DbaCmConnection sql2014 | Set-DbaCmConnection -ClearBadCredential -UseWindowsCredentials
```

Retrieves the already existing connection to sql2014, removes the list of not working credentials and configures it to default to the credentials of the logged on user.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCmConnection | Set-DbaCmConnection -RemoveBadCredential $cred
```

Removes the credentials stored in $cred from all connections' list of "known to not work" credentials.<br>
Handy to update changes in privilege.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCmConnection | Export-Clixml .\connections.xml
PS C:\> Import-Clixml .\connections.xml | Set-DbaCmConnection -ResetConfiguration
```

At first, the current cached connections are stored in an xml file. At a later time - possibly in the profile when starting the console again - those connections are imported again and applied again <br>
to the connection cache.<br>
In this example, the configuration settings will also be reset, since after re-import those will be set to explicit, rather than deriving them from the global settings.<br>
In many cases, using the default settings is desirable. For specific settings, use New-DbaCmConnection as part of the profile in order to explicitly configure a connection.<br>

### Optional Parameters

##### -ComputerName

Specifies the SQL Server host computer name to configure connection settings for. Accepts computer names, FQDNs, or IP addresses.  
Use this when you need to pre-configure how dbatools connects to specific SQL Server host machines for service management, file operations, or system administration tasks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

The credential to register.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UseWindowsCredentials

Confirms that Windows credentials of the current user should be used for remote connections to the target computer.  
Set this when you know the current user account has sufficient privileges on the remote SQL Server host and want to avoid credential prompts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OverrideExplicitCredential

Forces dbatools to use cached working credentials instead of explicitly provided credentials when available.  
Enable this when you want the connection system to automatically use known-good credentials rather than failing with explicitly provided but incorrect credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OverrideConnectionPolicy

Allows this connection to bypass global connection type restrictions configured in dbatools settings.  
Use this when you need to enable specific connection methods (CIM, WMI, PowerShell remoting) for individual computers that are normally disabled globally.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisabledConnectionTypes

Specifies which connection protocols to disable for this computer (CIM, WMI, PowerShell remoting, or combinations).  
Use this to block problematic connection methods on specific hosts while allowing others to work normally.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |

##### -DisableBadCredentialCache

Prevents dbatools from remembering credentials that fail authentication for this computer.  
Enable this when you're frequently changing credentials or troubleshooting authentication issues and don't want failed attempts cached.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableCimPersistence

Forces dbatools to create new CIM sessions for each operation instead of reusing existing sessions.  
Use this when experiencing issues with persistent CIM connections or when you need fresh authentication for each operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableCredentialAutoRegister

Prevents successful credentials from being automatically saved to the connection cache for future use.  
Enable this for security-sensitive environments where you don't want credentials stored in memory between operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EnableCredentialFailover

Allows dbatools to automatically try previously successful credentials when the provided credentials fail.  
Use this to improve connection reliability by falling back to known working credentials when new ones don't authenticate properly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WindowsCredentialsAreBad

Marks the current user's Windows credentials as non-functional for this remote computer.  
Set this when you know Windows authentication won't work for the target host and want to prevent automatic attempts with current user credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CimWinRMOptions

Specifies advanced WinRM session options for CIM connections, such as authentication methods, timeouts, or proxy settings.  
Create this object using New-CimSessionOption and use when you need custom WinRM configuration for challenging network environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CimDCOMOptions

Specifies advanced DCOM session options for CIM connections, including authentication, impersonation levels, or DCOM-specific settings.  
Create this object using New-CimSessionOption and use when connecting through firewalls or when WinRM isn't available.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AddBadCredential

Adds specific credentials to the list of known non-working credentials for this computer.  
Use this to prevent dbatools from attempting credentials you know will fail, improving performance and avoiding account lockouts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RemoveBadCredential

Removes previously flagged credentials from the bad credential list for this computer.  
Use this when credentials that previously failed have been updated or permissions have been granted.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ClearBadCredential

Removes all entries from the bad credential cache for this computer.  
Use this when troubleshooting authentication issues or after bulk credential updates that might affect previously failed credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ClearCredential

Removes any cached working credentials for this computer, forcing fresh authentication on next connection.  
Use this when credentials have changed or when you need to ensure the next connection uses newly provided credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ResetCredential

Performs a complete credential reset by clearing both working and failed credential caches and resetting Windows credential status.  
Use this for comprehensive credential troubleshooting or when starting fresh with connection authentication for a host.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ResetConnectionStatus

Clears all connection protocol test results, marking CIM, WMI, and PowerShell remoting as untested for this computer.  
Use this to force dbatools to re-test connection methods after network changes, firewall updates, or service configuration changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ResetConfiguration

Restores all connection behavior settings to system defaults, removing any computer-specific overrides.  
Use this to return a connection to standard behavior after testing custom settings or when troubleshooting connection issues.

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
