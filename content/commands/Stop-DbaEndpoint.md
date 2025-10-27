---
title: "Stop-DbaEndpoint"
slug: "Stop-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Stops SQL Server communication endpoints like Service Broker, Database Mirroring, or custom TCP endpoints."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Stop-DbaEndpoint"
draft: false
---

# Stop-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Stop-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Stop-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Stop-DbaEndpoint](https://dataplat.github.io/boh#Stop-DbaEndpoint).

## Synopsis

Stops SQL Server communication endpoints like Service Broker, Database Mirroring, or custom TCP endpoints.

## Description

Stops specific or all SQL Server endpoints on target instances. Endpoints are communication channels that SQL Server uses for features like Service Broker messaging, Database Mirroring, Availability Groups, and custom applications. You might need to stop endpoints during maintenance windows, troubleshooting connectivity issues, or when decommissioning specific services. This command safely stops the endpoints without dropping them, so they can be restarted later with Start-DbaEndpoint.

## Syntax

```powershell
Stop-DbaEndpoint
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Endpoint] <String[]>]
    [-AllEndpoints]
    [[-InputObject] <Endpoint[]>]
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
PS C:\> Stop-DbaEndpoint -SqlInstance sql2017a -AllEndpoints
```

Stops all endpoints on the sqlserver2014 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Stop-DbaEndpoint -SqlInstance sql2017a -Endpoint endpoint1,endpoint2
```

Stops the endpoint1 and endpoint2 endpoints.<br>

#####  Example:  3 

```powershell
PS C:\> Get-Endpoint -SqlInstance sql2017a -Endpoint endpoint1 | Stop-DbaEndpoint
```

Stops the endpoints returned from the Get-Endpoint command.<br>

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

##### -Endpoint

Specifies the names of specific endpoints to stop. Accepts multiple endpoint names as an array.  
Use this when you need to stop only certain endpoints while leaving others running, such as stopping a Service Broker endpoint for maintenance while keeping Database Mirroring endpoints active.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllEndpoints

Stops all endpoints on the specified SQL Server instance. Required when using SqlInstance parameter if Endpoint is not specified.  
Use this during full maintenance windows or when you need to completely disable all endpoint communication for troubleshooting network connectivity issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts endpoint objects from Get-DbaEndpoint for pipeline operations. Allows filtering and processing endpoints before stopping them.  
Use this for complex scenarios where you need to filter endpoints based on their properties before stopping them.

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
