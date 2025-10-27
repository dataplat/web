---
title: "Get-DbaInstanceProperty"
slug: "Get-DbaInstanceProperty"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@powerdbaklaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive SQL Server instance configuration properties for auditing and comparison"
tags:
  - "Instance"
  - "Configure"
  - "Configuration"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceProperty.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceProperty"
draft: false
---

# Get-DbaInstanceProperty

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@powerdbaklaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceProperty](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceProperty.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceProperty](https://dataplat.github.io/boh#Get-DbaInstanceProperty).

## Synopsis

Retrieves comprehensive SQL Server instance configuration properties for auditing and comparison

## Description

Retrieves all instance-level configuration properties from SQL Server's Information, UserOptions, and Settings collections via SMO. This gives you a complete inventory of server settings like default file paths, memory configuration, security options, and user defaults in a standardized format. Essential for configuration audits, compliance reporting, environment comparisons, and troubleshooting configuration-related issues across multiple instances.

## Syntax

```powershell
Get-DbaInstanceProperty
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-InstanceProperty] <Object[]>]
    [[-ExcludeInstanceProperty] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaInstanceProperty -SqlInstance localhost
```

Returns SQL Server instance properties on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaInstanceProperty -SqlInstance sql2, sql4\sqlexpress
```

Returns SQL Server instance properties on default instance on sql2 and sqlexpress instance on sql4<br>

#####  Example:  3 

```powershell
PS C:\> 'sql2','sql4' | Get-DbaInstanceProperty
```

Returns SQL Server instance properties on sql2 and sql4<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaInstanceProperty -SqlInstance sql2,sql4 -InstanceProperty DefaultFile
```

Returns SQL Server instance property DefaultFile on instance sql2 and sql4<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaInstanceProperty -SqlInstance sql2,sql4 -ExcludeInstanceProperty DefaultFile
```

Returns all SQL Server instance properties except DefaultFile on instance sql2 and sql4<br>

#####  Example:  6 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaInstanceProperty -SqlInstance sql2 -SqlCredential $cred
```

Connects using sqladmin credential and returns SQL Server instance properties from sql2<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -InstanceProperty

Specifies which SQL Server instance properties to include from Information, UserOptions, and Settings collections. Accepts wildcards and arrays.  
Use this to focus on specific configuration properties like DefaultFile, MaxWorkerThreads, or LoginMode when auditing particular settings across instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeInstanceProperty

Specifies which SQL Server instance properties to exclude from the results. Accepts wildcards and arrays.  
Use this to filter out noisy or irrelevant properties when you need a cleaner view of configuration data for reporting or comparison.

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
