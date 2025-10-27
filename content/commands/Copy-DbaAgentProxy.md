---
title: "Copy-DbaAgentProxy"
slug: "Copy-DbaAgentProxy"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server Agent proxy accounts from one instance to another."
tags:
  - "Migration"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentProxy.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentProxy"
draft: false
---

# Copy-DbaAgentProxy

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaAgentProxy](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentProxy.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaAgentProxy](https://dataplat.github.io/boh#Copy-DbaAgentProxy).

## Synopsis

Copies SQL Server Agent proxy accounts from one instance to another.

## Description

Migrates SQL Server Agent proxy accounts between instances, enabling job steps to run under different security contexts than the SQL Agent service account. By default, all proxy accounts are copied, but you can specify individual accounts to migrate or exclude specific ones. The function requires that associated credentials already exist on the destination server before copying proxy accounts. If a proxy account already exists on the destination, it will be skipped unless you use -Force to overwrite it.

## Syntax

```powershell
Copy-DbaAgentProxy
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-ProxyAccount] <String[]>]
    [[-ExcludeProxyAccount] <String[]>]
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
PS C:\> Copy-DbaAgentProxy -Source sqlserver2014a -Destination sqlcluster
```

Copies all proxy accounts from sqlserver2014a to sqlcluster using Windows credentials. If proxy accounts with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentProxy -Source sqlserver2014a -Destination sqlcluster -ProxyAccount PSProxy -SourceSqlCredential $cred -Force
```

Copies only the PSProxy proxy account from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If a proxy account with the same name exists <br>
on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaAgentProxy -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Source SQL Server. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server. You must have sysadmin access and the server must be SQL Server 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ProxyAccount

Specifies which proxy accounts to copy from the source server. Accepts an array of proxy account names.  
Use this when you only need to migrate specific proxy accounts instead of all available accounts on the source server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProxyAccount

Specifies proxy accounts to skip during migration. Accepts an array of proxy account names to exclude.  
Use this when you want to copy most proxy accounts but need to avoid migrating specific ones that may conflict or aren't needed on the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces overwriting of existing proxy accounts on the destination server by dropping and recreating them.  
Use this when you need to update proxy accounts that already exist on the destination with the current configuration from the source server.

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
