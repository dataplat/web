---
title: "Enable-DbaAgHadr"
slug: "Enable-DbaAgHadr"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Enables HADR service setting on SQL Server instances to allow Availability Group creation."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaAgHadr.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaAgHadr"
draft: false
---

# Enable-DbaAgHadr

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaAgHadr](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaAgHadr.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaAgHadr](https://dataplat.github.io/boh#Enable-DbaAgHadr).

## Synopsis

Enables HADR service setting on SQL Server instances to allow Availability Group creation.

## Description

Configures the High Availability Disaster Recovery (HADR) service setting on SQL Server instances, which is a required prerequisite before you can create Availability Groups. This setting must be enabled at the instance level and requires a service restart to take effect. Use this command when preparing SQL Server instances for Availability Group participation after your Windows Server Failover Cluster is already configured.

## Syntax

```powershell
Enable-DbaAgHadr
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
PS C:\> Enable-DbaAgHadr -SqlInstance sql2016
```

Sets Hadr service to enabled for the instance sql2016 but changes will not be applied until the next time the server restarts.<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaAgHadr -SqlInstance sql2016 -Force
```

Sets Hadr service to enabled for the instance sql2016, and restart the service to apply the change.<br>

#####  Example:  3 

```powershell
PS C:\> Enable-DbaAgHadr -SqlInstance sql2012\dev1 -Force
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

Windows credential object used to connect to the target server with different authentication context.  
Required when the current user lacks administrative privileges on the SQL Server host or when connecting across domain boundaries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically restarts the SQL Server Database Engine and SQL Server Agent services to immediately apply the HADR setting change.  
Without this parameter, the HADR setting change requires a manual service restart before Availability Groups can be created.

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
