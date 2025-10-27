---
title: "Get-DbaSpConfigure"
slug: "Get-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Nic Cain, sirsql.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server sp_configure settings with default value comparisons for configuration auditing"
tags:
  - "SpConfig"
  - "Configure"
  - "Configuration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSpConfigure"
draft: false
---

# Get-DbaSpConfigure

| Property | Value |
| --- | --- |
| **Author** | Nic Cain, sirsql.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSpConfigure](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpConfigure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSpConfigure](https://dataplat.github.io/boh#Get-DbaSpConfigure).

## Synopsis

Retrieves SQL Server sp_configure settings with default value comparisons for configuration auditing

## Description

Retrieves all SQL Server instance-level configuration settings accessible through sp_configure, using SMO to gather comprehensive details about each setting. This function compares current configured and running values against SQL Server defaults to quickly identify which settings have been customized from their out-of-box values.  
  
Essential for configuration auditing, compliance checks, and ensuring consistency across multiple SQL Server environments. The output includes advanced and basic settings, minimum/maximum allowed values, whether settings are dynamic (require restart), and flags non-default configurations for review.  
  
Particularly useful when documenting server configurations, troubleshooting performance issues related to memory or parallelism settings, or preparing for server migrations where you need to replicate custom configurations.

## Syntax

```powershell
Get-DbaSpConfigure
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-ExcludeName] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance localhost
```

Returns all system configuration information on the localhost.<br>

#####  Example:  2 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaSpConfigure
```

Returns system configuration information on multiple instances piped into the function<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance sql2012 -Name 'max server memory (MB)'
```

Returns only the system configuration for MaxServerMemory on sql2012.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance sql2012 -ExcludeName 'max server memory (MB)', RemoteAccess | Out-GridView
```

Returns system configuration information on sql2012 but excludes for max server memory (MB) and remote access. Values returned in grid view<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential SqlCredential
PS C:\> 'sql2012' | Get-DbaSpConfigure -SqlCredential $cred -Name RemoteAccess, 'max server memory (MB)' -ExcludeName 'remote access' | Out-GridView
```

Returns system configuration information on sql2012 using SQL Server Authentication. Only MaxServerMemory is returned as RemoteAccess was also excluded.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

##### -Name

Return only specific configuration settings instead of all sp_configure values. Accepts either display names from sp_configure ('max server memory (MB)') or SMO property names ('MaxServerMemory').  
Use this when you need to check specific settings like memory configuration, parallelism, or security options without retrieving the full list.

| Property | Value |
| --- | --- |
| Alias | Config,ConfigName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeName

Exclude specific configuration settings from the results. Accepts either display names from sp_configure or SMO property names.  
Useful when generating reports or comparisons where you want to hide standard settings and focus on custom configurations.

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


&nbsp;
