---
title: "Get-DbaAgentProxy"
slug: "Get-DbaAgentProxy"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent proxy accounts and their associated credentials from target instances."
tags:
  - "Agent"
  - "Proxy"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentProxy.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentProxy"
draft: false
---

# Get-DbaAgentProxy

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentProxy](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentProxy.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentProxy](https://dataplat.github.io/boh#Get-DbaAgentProxy).

## Synopsis

Retrieves SQL Server Agent proxy accounts and their associated credentials from target instances.

## Description

Retrieves SQL Server Agent proxy accounts which allow job steps to execute under different security contexts than the SQL Agent service account.  
This function is essential for security auditing, compliance reporting, and troubleshooting job step execution permissions.  
Returns detailed information including proxy names, associated credentials, descriptions, and enabled status across multiple SQL Server instances.

## Syntax

```powershell
Get-DbaAgentProxy
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Proxy] <String[]>]
    [[-ExcludeProxy] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentProxy -SqlInstance ServerA,ServerB\instanceB
```

Returns all SQL Agent proxies on serverA and serverB\instanceB<br>

#####  Example:  2 

```powershell
PS C:\> 'serverA','serverB\instanceB' | Get-DbaAgentProxy
```

Returns all SQL Agent proxies  on serverA and serverB\instanceB<br>

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

##### -Proxy

Specifies which SQL Agent proxy accounts to retrieve by name. Supports wildcards for pattern matching.  
Use this to filter results when you only need specific proxy accounts instead of all proxies on the instance.  
Common when auditing specific service accounts or troubleshooting particular job step failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProxy

Specifies which SQL Agent proxy accounts to exclude from results by name. Supports wildcards for pattern matching.  
Useful when you want to review all proxies except certain ones, such as excluding system or test proxies from security audits.  
Can be combined with the Proxy parameter for fine-grained filtering.

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
