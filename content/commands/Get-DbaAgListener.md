---
title: "Get-DbaAgListener"
slug: "Get-DbaAgListener"
date: 2024-01-01
layout: "single"
author: "Viorel Ciucu (@viorelciucu)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves availability group listener configurations including IP addresses and port numbers."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgListener.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgListener"
draft: false
---

# Get-DbaAgListener

| Property | Value |
| --- | --- |
| **Author** | Viorel Ciucu (@viorelciucu) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgListener](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgListener.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgListener](https://dataplat.github.io/boh#Get-DbaAgListener).

## Synopsis

Retrieves availability group listener configurations including IP addresses and port numbers.

## Description

Retrieves availability group listener configurations from SQL Server instances, providing essential network details needed for client connections and troubleshooting. This function returns listener names, port numbers, IP configurations, and associated availability groups, which is crucial for validating listener setup and diagnosing connection issues. Use this when you need to document your AG infrastructure, verify listener configurations after setup, or troubleshoot client connectivity problems.

## Syntax

```powershell
Get-DbaAgListener
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Listener] <String[]>]
    [[-InputObject] <AvailabilityGroup[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgListener -SqlInstance sql2017a
```

Returns all listeners found on sql2017a<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgListener -SqlInstance sql2017a -AvailabilityGroup AG-a
```

Returns all listeners found on sql2017a on sql2017a for the availability group AG-a<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql2017a -AvailabilityGroup OPP | Get-DbaAgListener
```

Returns all listeners found on sql2017a on sql2017a for the availability group OPP<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

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

##### -AvailabilityGroup

Specifies which availability groups to include when retrieving listener information. Supports wildcards for pattern matching.  
Use this when you only need listener details for specific availability groups rather than all groups on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Listener

Specifies which availability group listeners to return by name. Accepts multiple listener names for filtering results.  
Use this when you need to examine specific listeners during troubleshooting or when documenting particular AG configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline operations.  
Use this when chaining commands to get listener details for specific availability groups you've already retrieved.

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


&nbsp;
