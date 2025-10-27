---
title: "Disable-DbaAgHadr"
slug: "Disable-DbaAgHadr"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Disables High Availability Disaster Recovery (HADR) capability on SQL Server instances."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaAgHadr.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaAgHadr"
draft: false
---

# Disable-DbaAgHadr

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaAgHadr](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaAgHadr.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaAgHadr](https://dataplat.github.io/boh#Disable-DbaAgHadr).

## Synopsis

Disables High Availability Disaster Recovery (HADR) capability on SQL Server instances.

## Description

Disables the HADR service setting at the SQL Server instance level, effectively removing the instance's ability to participate in Availability Groups. This is commonly needed when decommissioning servers from AGs, troubleshooting AG setup issues, or converting instances back to standalone operation after removing them from Availability Groups.  
  
The function modifies the HADR setting through WMI but requires a SQL Server service restart to take effect. Use the -Force parameter to automatically restart both SQL Server and SQL Agent services immediately, or manually restart later to apply the change.

## Syntax

```powershell
Disable-DbaAgHadr
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-Force]
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
PS C:\> Disable-DbaAgHadr -SqlInstance sql2016
```

Sets Hadr service to disabled for the instance sql2016 but changes will not be applied until the next time the server restarts.<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaAgHadr -SqlInstance sql2016 -Force
```

Sets Hadr service to disabled for the instance sql2016, and restart the service to apply the change.<br>

#####  Example:  3 

```powershell
PS C:\> Disable-DbaAgHadr -SqlInstance sql2012\dev1 -Force
```

Sets Hadr service to disabled for the instance dev1 on sq2012, and restart the service to apply the change.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Credential object used to connect to the Windows server as a different user

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically restarts both SQL Server and SQL Server Agent services to immediately apply the HADR setting change. Without this switch, the HADR disable setting is changed but requires manual service   
restart to take effect.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
