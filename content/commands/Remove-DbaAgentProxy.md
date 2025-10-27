---
title: "Remove-DbaAgentProxy"
slug: "Remove-DbaAgentProxy"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Agent agent proxy(s)."
tags:
  - "Agent"
  - "Proxy"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentProxy.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaAgentProxy"
draft: false
---

# Remove-DbaAgentProxy

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaAgentProxy](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaAgentProxy.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaAgentProxy](https://dataplat.github.io/boh#Remove-DbaAgentProxy).

## Synopsis

Removes SQL Agent agent proxy(s).

## Description

Removes the SQL Agent proxy(s) that have passed through the pipeline.  
If not used with a pipeline, Get-DbaAgentProxy will be executed with the parameters provided  
and the returned SQL Agent proxy(s) will be removed.

## Syntax

```powershell
Remove-DbaAgentProxy
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Proxy <String[]>]
    [-ExcludeProxy <String[]>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaAgentProxy
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Proxy <String[]>]
    [-ExcludeProxy <String[]>]
    -InputObject <ProxyAccount[]>
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
PS C:\> Remove-DbaAgentProxy -SqlInstance localhost, localhost\namedinstance
```

Removes all SQL Agent proxies on the localhost, localhost\namedinstance instances.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaAgentProxy -SqlInstance localhost -Proxy MyDatabaseProxy
```

Removes MyDatabaseProxy SQL Agent proxy on the localhost.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentProxy -SqlInstance SRV1 | Out-GridView -Title 'Select SQL Agent proxy(s) to drop' -OutputMode Multiple | Remove-DbaAgentProxy
```

Using a pipeline this command gets all SQL Agent proxies on SRV1, lets the user select those to remove and then removes the selected SQL Agent proxies.<br>

### Required Parameters

##### -InputObject

Accepts SQL Agent proxy objects from the pipeline, typically from Get-DbaAgentProxy.  
Use this parameter set when you need to filter or select specific proxies before removal.  
Enables advanced scenarios like interactive selection through Out-GridView or complex filtering logic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Proxy

Specifies one or more SQL Agent proxy account names to remove. Accepts wildcards for pattern matching.  
Use this when you need to remove specific proxy accounts instead of all proxies on the instance.  
Common examples include service account proxies or job-specific proxy accounts that are no longer needed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProxy

Specifies one or more SQL Agent proxy account names to exclude from removal. Accepts wildcards for pattern matching.  
Use this when removing multiple proxies but want to preserve certain critical proxy accounts.  
Helpful for bulk cleanup operations while protecting production service account proxies.

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
This is the default. Use -Confirm:$false to suppress these prompts.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
