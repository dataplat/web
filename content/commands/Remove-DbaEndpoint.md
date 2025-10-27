---
title: "Remove-DbaEndpoint"
slug: "Remove-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server endpoints including DatabaseMirroring, ServiceBroker, Soap, and TSql types."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaEndpoint"
draft: false
---

# Remove-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaEndpoint](https://dataplat.github.io/boh#Remove-DbaEndpoint).

## Synopsis

Removes SQL Server endpoints including DatabaseMirroring, ServiceBroker, Soap, and TSql types.

## Description

Removes SQL Server endpoints by executing DROP ENDPOINT commands against the target instance. This function handles DatabaseMirroring, ServiceBroker, Soap, and TSql endpoint types, making it useful for decommissioning unused services, cleaning up after failed deployments, or hardening SQL Server instances by removing unnecessary network entry points. You can target specific endpoints by name or remove all endpoints at once, with confirmation prompts to prevent accidental deletions.

## Syntax

```powershell
Remove-DbaEndpoint
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
PS C:\> Remove-DbaEndpoint -SqlInstance sqlserver2012 -AllEndpoints
```

Removes all endpoints on the sqlserver2014 instance. Prompts for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaEndpoint -SqlInstance sqlserver2012 -Endpoint endpoint1,endpoint2 -Confirm:$false
```

Removes the endpoint1 and endpoint2 endpoints. Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance sqlserver2012 -Endpoint endpoint1 | Remove-DbaEndpoint
```

Removes the endpoints returned from the Get-DbaEndpoint function. Prompts for confirmation.<br>

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

Specifies the names of specific endpoints to remove from the SQL Server instance. Accepts multiple endpoint names as an array.  
Use this when you need to selectively remove particular endpoints like 'Mirroring' or custom service broker endpoints while leaving others intact.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllEndpoints

Removes all user-defined endpoints from the SQL Server instance, excluding system endpoints that cannot be dropped.  
Use this for complete endpoint cleanup during decommissioning or when hardening an instance by removing all custom network entry points.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts endpoint objects from the pipeline, typically from Get-DbaEndpoint output. Allows for filtering endpoints before removal.  
Use this when you need to apply complex filtering logic or when chaining endpoint discovery and removal operations together.

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
