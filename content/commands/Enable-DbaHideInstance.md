---
title: "Enable-DbaHideInstance"
slug: "Enable-DbaHideInstance"
date: 2024-01-01
layout: "single"
author: "Gareth Newman (@gazeranco), ifexists.blog"
availability: "Windows, Linux, macOS"
synopsis: "Enables the Hide Instance setting to prevent SQL Server Browser service from advertising the instance."
tags:
  - "Instance"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaHideInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaHideInstance"
draft: false
---

# Enable-DbaHideInstance

| Property | Value |
| --- | --- |
| **Author** | Gareth Newman (@gazeranco), ifexists.blog |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaHideInstance](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaHideInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaHideInstance](https://dataplat.github.io/boh#Enable-DbaHideInstance).

## Synopsis

Enables the Hide Instance setting to prevent SQL Server Browser service from advertising the instance.

## Description

Enables the Hide Instance setting in the SQL Server network configuration registry, which prevents the instance from responding to SQL Server Browser service enumeration requests. This security setting makes the instance invisible to network discovery tools and requires clients to specify the exact port number or use a SQL Server alias to connect.  
  
The function modifies the HideInstance registry value in HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\[InstanceName]\MSSQLServer\SuperSocketNetLib. This is commonly used in security-hardened environments to reduce the attack surface by hiding instance details from network scanning tools.  
  
This setting requires Windows administrative access to modify the registry and does not require SQL Server permissions. The change takes effect immediately for new connections, but existing connections remain unaffected.

## Syntax

```powershell
Enable-DbaHideInstance
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
PS C:\> Enable-DbaHideInstance
```

Enables Hide Instance of SQL Engine on the default (MSSQLSERVER) instance on localhost. Requires (and checks for) RunAs admin.<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2
```

Enables Hide Instance of SQL Engine for the SQL2008R2SP2 on sql01. Uses Windows Credentials to both connect and modify the registry.<br>

#####  Example:  3 

```powershell
PS C:\> Enable-DbaHideInstance -SqlInstance sql01\SQL2008R2SP2 -WhatIf
```

Shows what would happen if the command were executed.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances where you want to enable the Hide Instance setting.  
This parameter accepts server names, server\instance combinations, or fully qualified domain names.  
When not specified, defaults to the local computer's default instance (MSSQLSERVER).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Windows credentials used to connect to the target computer and modify the registry settings.  
This is required when running against remote servers where your current Windows account lacks administrative access.  
Note that this connects to the Windows computer, not the SQL Server instance itself.

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
