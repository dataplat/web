---
title: "New-DbaCmConnection"
slug: "New-DbaCmConnection"
date: 2024-01-01
layout: "single"
availability: "Windows, Linux, macOS"
synopsis: "Creates and configures connection objects for remote computer management using CIM/WMI protocols."
tags:
  - "ComputerManagement"
  - "CIM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaCmConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaCmConnection"
draft: false
---

# New-DbaCmConnection

| Property | Value |
| --- | --- |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaCmConnection](https://github.com/dataplat/dbatools/blob/master/public/New-DbaCmConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaCmConnection](https://dataplat.github.io/boh#New-DbaCmConnection).

## Synopsis

Creates and configures connection objects for remote computer management using CIM/WMI protocols.

## Description

Creates connection objects that optimize remote computer management for SQL Server environments using CIM and WMI protocols.  
These objects cache successful authentication methods and connection protocols, reducing authentication errors and improving performance when connecting to multiple SQL Server instances across different servers.  
  
The function pre-configures connection settings including credentials, preferred protocols (CIM over WinRM or DCOM), and failover behavior.  
This eliminates the need to repeatedly authenticate and negotiate protocols when running dbatools commands against remote SQL Server instances.  
  
New-DbaCmConnection creates a new connection object and overwrites any existing cached connection for the specified computer.  
All connection information beyond the computer name gets replaced with the new settings you specify.  
  
Unless connection caching has been disabled globally, all connections are automatically stored in the connection cache for reuse.  
The returned object is primarily informational, though it can be used to bypass the cache if needed.  
  
Note: This function is typically optional since dbatools commands like Get-DbaCmObject automatically create default connections when first connecting to a computer.  
Use this function when you need to pre-configure specific authentication or protocol settings before running other dbatools commands.

## Syntax

```powershell
New-DbaCmConnection
    [-ComputerName <DbaCmConnectionParameter[]>]
    [-Credential <PSCredential>]
    [-OverrideExplicitCredential]
    [-DisabledConnectionTypes {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-DisableBadCredentialCache]
    [-DisableCimPersistence]
    [-DisableCredentialAutoRegister]
    [-EnableCredentialFailover]
    [-WindowsCredentialsAreBad]
    [-CimWinRMOptions <WSManSessionOptions>]
    [-CimDCOMOptions <DComSessionOptions>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

New-DbaCmConnection
    [-ComputerName <DbaCmConnectionParameter[]>]
    [-UseWindowsCredentials]
    [-OverrideExplicitCredential]
    [-DisabledConnectionTypes {None | CimRM | CimDCOM | Wmi | PowerShellRemoting}]
    [-DisableBadCredentialCache]
    [-DisableCimPersistence]
    [-DisableCredentialAutoRegister]
    [-EnableCredentialFailover]
    [-CimWinRMOptions <WSManSessionOptions>]
    [-CimDCOMOptions <DComSessionOptions>]
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
PS C:\> New-DbaCmConnection -ComputerName sql2014 -UseWindowsCredentials -OverrideExplicitCredential -DisabledConnectionTypes CimRM
```

Returns a new configuration object for connecting to the computer sql2014.<br>
- The current user credentials are set as valid<br>
- The connection is configured to ignore explicit credentials (so all connections use the windows credentials)<br>
- The connections will not try using CIM over WinRM<br>
Unless caching is globally disabled, this is automatically stored in the connection cache and will be applied automatically.<br>
In that (the default) case, the output is for information purposes only and need not be used.<br>

#####  Example:  2 

```powershell
PS C:\> Get-Content computers.txt | New-DbaCmConnection -Credential $cred -CimWinRMOptions $options -DisableBadCredentialCache -OverrideExplicitCredential
```

Gathers a list of computers from a text file, then creates and registers connections for each of them, setting them to ...<br>
- use the credentials stored in $cred<br>
- use the options stored in $options when connecting using CIM over WinRM<br>
- not store credentials that are known to not work<br>
- to ignore explicitly specified credentials<br>
Essentially, this configures all connections to those computers to prefer failure with the specified credentials over using alternative credentials.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer name or IP address where SQL Server instances are running.  
Use this to pre-configure connection settings before running other dbatools commands against remote SQL Server hosts.  
Accepts pipeline input for bulk configuration of multiple servers.

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

Confirms that the current Windows user credentials are valid for connecting to the target computer.  
Use this when your current domain account has administrative rights on the SQL Server host.  
Pre-validates these credentials to avoid authentication delays during subsequent dbatools operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OverrideExplicitCredential

Forces the connection to use cached working credentials instead of any explicitly provided credentials.  
Use this when you want to ensure consistent authentication across multiple dbatools commands.  
Prevents authentication failures when mixed credentials are accidentally specified in scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisabledConnectionTypes

Specifies which connection protocols to disable when connecting to the remote computer.  
Use this to force specific connection methods when certain protocols are blocked by network policies.  
Common values include 'CimRM' to disable CIM over WinRM or 'CimDCOM' to disable DCOM connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |

##### -DisableBadCredentialCache

Prevents failed credentials from being stored in the credential cache.  
Use this in environments where credentials change frequently or when testing different authentication methods.  
Helps avoid repeated authentication attempts with known bad credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableCimPersistence

Forces creation of new CIM sessions for each connection instead of reusing existing sessions.  
Use this when troubleshooting connection issues or when working with servers that have session limits.  
May impact performance but ensures fresh connections for each dbatools operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableCredentialAutoRegister

Prevents successful credentials from being automatically stored in the connection cache.  
Use this for one-time operations where you don't want credentials persisted for future use.  
Useful in high-security environments where credential caching is not permitted.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EnableCredentialFailover

Automatically switches to cached working credentials when the initially provided credentials fail.  
Use this to ensure dbatools operations continue even if incorrect credentials are accidentally specified.  
Prevents script interruptions due to authentication failures when multiple credential sets are available.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WindowsCredentialsAreBad

Explicitly marks the current Windows user credentials as invalid for this computer connection.  
Use this when your domain account lacks privileges on the target SQL Server host.  
Forces the use of alternative credentials and prevents authentication attempts with insufficient privileges.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CimWinRMOptions

Configures advanced WinRM connection settings for CIM sessions to the target computer.  
Use this to specify custom ports, authentication methods, or SSL settings required by your network configuration.  
Create the options object using New-CimSessionOption with specific timeout, encryption, or proxy settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CimDCOMOptions

Configures advanced DCOM connection settings for legacy CIM sessions to the target computer.  
Use this when connecting to older Windows servers or when WinRM is not available.  
Create the options object using New-CimSessionOption with DCOM-specific authentication and timeout settings.

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
