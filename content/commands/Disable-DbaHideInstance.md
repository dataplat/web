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

# Disable-DbaHideInstance

| Property | Value |
| --- | --- |
| **Author** | Gareth Newman (@gazeranco), ifexists.blog |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaHideInstance](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaHideInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaHideInstance](https://dataplat.github.io/boh#Disable-DbaHideInstance).

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

Disables Hide Instance of SQL Engine on the default (MSSQLSERVER) instance on localhost. Requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2
```

Disables Hide Instance of SQL Engine for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  3 

```powershell
PS C:\> Disable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2 -WhatIf
```

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
