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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Enable-DbaForceNetworkEncryption</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaForceNetworkEncryption.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Enable-DbaForceNetworkEncryption" }

Enables Force Encryption on the default (MSSQLSERVER) instance on localhost. Requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2
```
{: data-copyable="true" data-clean-code="Enable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2" }

Enables Force Network Encryption for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  3 

```powershell
PS C:\> Enable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2 -WhatIf
```
{: data-copyable="true" data-clean-code="Enable-DbaForceNetworkEncryption -SqlInstance sql01\SQL2008R2SP2 -WhatIf" }

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
