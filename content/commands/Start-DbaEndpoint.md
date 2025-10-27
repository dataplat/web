---
title: "Start-DbaEndpoint"
slug: "Start-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Starts stopped SQL Server endpoints for Database Mirroring, Service Broker, and other network services."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaEndpoint"
draft: false
---

# Start-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Start-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Start-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Start-DbaEndpoint](https://dataplat.github.io/boh#Start-DbaEndpoint).

## Synopsis

Starts stopped SQL Server endpoints for Database Mirroring, Service Broker, and other network services.

## Description

Starts stopped SQL Server endpoints that are required for Database Mirroring, Service Broker, SOAP, and custom TCP connections. Endpoints must be in a started state to accept network connections and facilitate features like Availability Groups, database mirroring partnerships, and Service Broker message routing. This function is commonly used after maintenance windows, server restarts, or when troubleshooting connectivity issues where endpoints were inadvertently stopped.

## Syntax

```powershell
Start-DbaEndpoint
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
PS C:\> Start-DbaEndpoint -SqlInstance sqlserver2012 -AllEndpoints
```

Starts all endpoints on the sqlserver2014 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Start-DbaEndpoint -SqlInstance sqlserver2012 -Endpoint endpoint1,endpoint2 -SqlCredential sqladmin
```

Logs into sqlserver2012 using alternative credentials and starts the endpoint1 and endpoint2 endpoints.<br>

#####  Example:  3 

```powershell
PS C:\> Get-Endpoint -SqlInstance sqlserver2012 -Endpoint endpoint1 | Start-DbaEndpoint
```

Starts the endpoints returned from the Get-Endpoint function.<br>

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

Specifies the names of specific endpoints to start on the target SQL Server instance.  
Use this when you only need to start particular endpoints like Database Mirroring or Service Broker endpoints rather than all endpoints on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllEndpoints

Starts all endpoints on the target SQL Server instance regardless of their current state or type.  
This is required when using the SqlInstance parameter and you want to start all endpoints rather than specific ones.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts endpoint objects from the pipeline, typically from Get-DbaEndpoint cmdlet output.  
Use this to start endpoints that have already been retrieved and filtered by other dbatools commands.

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
