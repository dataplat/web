---
title: "Set-DbaResourceGovernor"
slug: "Set-DbaResourceGovernor"
date: 2024-01-01
layout: "single"
author: "John McCall (@lowlydba), lowlydba.com"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server Resource Governor to control workload resource allocation and sets classifier functions."
tags:
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaResourceGovernor.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaResourceGovernor"
draft: false
---

# Set-DbaResourceGovernor

| Property | Value |
| --- | --- |
| **Author** | John McCall (@lowlydba), lowlydba.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaResourceGovernor](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaResourceGovernor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaResourceGovernor](https://dataplat.github.io/boh#Set-DbaResourceGovernor).

## Synopsis

Configures SQL Server Resource Governor to control workload resource allocation and sets classifier functions.

## Description

Configures Resource Governor settings at the SQL Server instance level to control CPU, memory, and I/O resource allocation for different workloads. Resource Governor requires both being enabled on the instance and having an optional classifier function that determines which resource pool and workload group incoming sessions should use based on login properties, application name, or other criteria.  
  
This function handles the two-step Resource Governor setup process: enabling the feature and optionally assigning a classifier function. The classifier function must be a user-defined function in the master database that returns a workload group name or ID. Without a classifier function, all sessions use the default workload group.  
  
Commonly used when implementing resource management policies to prevent resource-intensive queries from impacting critical applications, or to allocate guaranteed resources to specific users or applications during peak usage periods.

## Syntax

```powershell
Set-DbaResourceGovernor
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Enabled]
    [-Disabled]
    [[-ClassifierFunction] <String>]
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
PS C:\> Set-DbaResourceGovernor -SqlInstance sql2016 -Enabled
```

Sets Resource Governor to enabled for the instance sql2016.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaResourceGovernor -SqlInstance sql2012\dev1 -Disabled
```

Sets Resource Governor to disabled for the instance dev1 on sq2012.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaResourceGovernor -SqlInstance sql2012\dev1 -ClassifierFunction 'fnRGClassifier' -Enabled
```

Sets Resource Governor to enabled for the instance dev1 on sq2012 and sets the classifier function to be 'fnRGClassifier'.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaResourceGovernor -SqlInstance sql2012\dev1 -ClassifierFunction 'NULL' -Enabled
```

Sets Resource Governor to enabled for the instance dev1 on sq2012 and sets the classifier function to be NULL.<br>

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

##### -SqlCredential

Credential object used to connect to the Windows server as a different user

| Property | Value |
| --- | --- |
| Alias | Credential |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Enabled

Enables Resource Governor on the SQL Server instance to activate workload resource management.  
Use this when you need to enforce resource limits and allocations for different workload groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Disabled

Disables Resource Governor on the SQL Server instance, removing all resource controls and workload management.  
All sessions will use unlimited resources from the default resource pool when Resource Governor is disabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ClassifierFunction

Specifies the name of a user-defined function in the master database that determines which workload group incoming sessions should use.  
The function must return a workload group name or ID based on session properties like login name or application name. Use 'NULL' to remove the current classifier function and route all sessions to   
the default workload group.

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
