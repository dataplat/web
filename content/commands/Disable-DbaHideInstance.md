---
title: "Disable-DbaHideInstance"
slug: "Disable-DbaHideInstance"
date: 2024-01-01
layout: "single"
author: "Gareth Newman (@gazeranco), ifexists.blog"
availability: "Windows, Linux, macOS"
synopsis: "Makes SQL Server instances visible to network discovery by disabling the Hide Instance registry setting."
tags:
  - "Instance"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaHideInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaHideInstance"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Disable-DbaHideInstance</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaHideInstance.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Gareth Newman (@gazeranco), ifexists.blog</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Makes SQL Server instances visible to network discovery by disabling the Hide Instance registry setting.

## Description

Modifies the Windows registry to disable the Hide Instance setting, making SQL Server instances visible to the SQL Server Browser service and network discovery tools. When Hide Instance is enabled, the instance won't respond to browse requests, which is often used for security hardening but makes instances harder to locate.  
  
This function directly modifies the HideInstance registry value in HKEY_LOCAL_MACHINE, so you need Windows administrative access to the target server (not SQL Server login credentials). The change takes effect immediately for new connections without requiring a service restart.  
  
This requires access to the Windows Server and not the SQL Server instance. The setting is found in SQL Server Configuration Manager under the properties of SQL Server Network Configuration > Protocols for "InstanceName".

## Syntax

```powershell
Disable-DbaHideInstance
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
PS C:\> Disable-DbaHideInstance
```
{: data-copyable="true" data-clean-code="Disable-DbaHideInstance" }

Disables Hide Instance of SQL Engine on the default (MSSQLSERVER) instance on localhost. Requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2
```
{: data-copyable="true" data-clean-code="Disable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2" }

Disables Hide Instance of SQL Engine for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  3 

```powershell
PS C:\> Disable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2 -WhatIf
```
{: data-copyable="true" data-clean-code="Disable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2 -WhatIf" }

Shows what would happen if the command were executed.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances to make visible to network discovery.  
Specify the server name and instance name (e.g., 'SQL01\PROD') to unhide specific named instances, or just the server name for default instances.  
Accepts multiple instances for bulk operations across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Windows credentials for accessing the target computer's registry remotely.  
Required when your current Windows account lacks administrative access to modify the HideInstance registry setting on the remote server.  
Note this is for Windows authentication, not SQL Server login credentials, since this function modifies the Windows registry.

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
