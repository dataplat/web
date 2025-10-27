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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaEndpoint</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaEndpoint.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Set-DbaEndpoint -SqlInstance sql2016 -AllEndpoints -Owner sa" }

Sets all endpoint owners to sa on sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance sql2016 -Endpoint ep1 | Set-DbaEndpoint -Type TSql
```
{: data-copyable="true" data-clean-code="Get-DbaEndpoint -SqlInstance sql2016 -Endpoint ep1 | Set-DbaEndpoint -Type TSql" }

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
