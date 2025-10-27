---
title: "Set-DbaEndpoint"
slug: "Set-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Modifies SQL Server endpoint properties including owner and protocol type."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaEndpoint"
draft: false
---

# Set-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaEndpoint](https://dataplat.github.io/boh#Set-DbaEndpoint).

## Synopsis

Modifies SQL Server endpoint properties including owner and protocol type.

## Description

Modifies properties of existing SQL Server endpoints such as changing the owner for security compliance or switching the endpoint type between DatabaseMirroring, ServiceBroker, Soap, and TSql protocols. This is commonly used when transferring endpoint ownership during security audits, changing communication protocols for availability group configurations, or updating Service Broker endpoints for application messaging. The function works with specific endpoints by name or can target all endpoints on an instance, making it useful for bulk administrative changes across your SQL Server environment.

## Syntax

```powershell
Set-DbaEndpoint
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Endpoint] <String[]>]
    [[-Owner] <String>]
    [[-Type] <String>]
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
PS C:\> Set-DbaEndpoint -SqlInstance sql2016 -AllEndpoints -Owner sa
```

Sets all endpoint owners to sa on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance sql2016 -Endpoint ep1 | Set-DbaEndpoint -Type TSql
```

Changes the endpoint type to Tsql on endpoint ep1<br>

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

Specifies the name(s) of specific endpoints to modify. Accepts multiple endpoint names and wildcards for pattern matching. Use when you need to update only certain endpoints rather than all endpoints   
on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Owner

Specifies the new login name to assign as the endpoint owner. Common during security compliance audits when transferring endpoint ownership from individual accounts to service accounts or when   
standardizing endpoint ownership across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Changes the endpoint protocol type between DatabaseMirroring, ServiceBroker, Soap, or TSql. Use DatabaseMirroring for availability group configurations, ServiceBroker for application messaging, TSql   
for custom client connections, or Soap for web service integrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | DatabaseMirroring,ServiceBroker,Soap,TSql |

##### -AllEndpoints

Modifies all endpoints found on the target SQL Server instance. Useful for bulk administrative changes like standardizing endpoint ownership or protocol types across your entire server environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts endpoint objects from the pipeline, typically from Get-DbaEndpoint. This allows you to filter endpoints with Get-DbaEndpoint first, then pipe the results for modification, providing precise   
control over which endpoints get updated.

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
