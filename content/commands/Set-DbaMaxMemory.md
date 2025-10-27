---
title: "Set-DbaMaxMemory"
slug: "Set-DbaMaxMemory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server 'Max Server Memory' setting using calculated recommendations or explicit values"
tags:
  - "MaxMemory"
  - "Memory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxMemory.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaMaxMemory"
draft: false
---

# Set-DbaMaxMemory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaMaxMemory](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaMaxMemory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaMaxMemory](https://dataplat.github.io/boh#Set-DbaMaxMemory).

## Synopsis

Configures SQL Server 'Max Server Memory' setting using calculated recommendations or explicit values

## Description

Modifies the SQL Server 'Max Server Memory' configuration to prevent SQL Server from consuming all available system memory.  
This setting controls how much memory SQL Server can allocate for its buffer pool and other memory consumers, leaving  
adequate memory for the operating system and other applications.  
  
When no explicit value is provided, the function calculates an optimal recommendation using a proven formula that reserves  
memory based on total system RAM. This formula accounts for operating system overhead, scales appropriately for servers  
with different memory configurations, and can handle multiple SQL Server instances on the same server.  
  
Inspired by Jonathan Kehayias's post about SQL Server Max memory (http://bit.ly/sqlmemcalc), this uses a formula to  
determine the default optimum RAM to use, then sets the SQL max value to that number.  
  
Jonathan notes that the formula used provides a *general recommendation* that doesn't account for everything that may  
be going on in your specific environment.

## Syntax

```powershell
Set-DbaMaxMemory
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Max] <Int32>]
    [[-InputObject] <PSObject[]>]
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
PS C:\> Set-DbaMaxMemory sqlserver1
```

Set max memory to the recommended on just one server named "sqlserver1"<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaMaxMemory -SqlInstance sqlserver1 -Max 2048
```

Explicitly set max memory to 2048 on just one server, "sqlserver1"<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver | Test-DbaMaxMemory | Where-Object { $_.MaxValue -gt $_.Total } | Set-DbaMaxMemory
```

Find all servers in SQL Server Central Management Server that have Max SQL memory set to higher than the total memory<br>
of the server (think 2147483647), then pipe those to Set-DbaMaxMemory and use the default recommendation.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Max

Specifies the explicit maximum memory value in megabytes for SQL Server to use. When provided, this overrides the automatic memory recommendation calculation.  
Use this when you need a specific memory allocation that differs from the calculated recommendation, such as reserving memory for other applications or setting conservative limits for shared servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -InputObject

Accepts output objects from Test-DbaMaxMemory containing memory analysis results for one or more SQL Server instances.  
Use this to pipeline memory testing results directly into memory configuration, allowing you to review recommendations before applying changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
