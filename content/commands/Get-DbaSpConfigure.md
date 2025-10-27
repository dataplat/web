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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaSpConfigure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpConfigure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Nic Cain, sirsql.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaSpConfigure -SqlInstance localhost" }

Returns all system configuration information on the localhost.<br>

#####  Example:  2 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaSpConfigure
```
{: data-copyable="true" data-clean-code="'localhost','localhost\namedinstance' | Get-DbaSpConfigure" }

Returns system configuration information on multiple instances piped into the function<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance sql2012 -Name 'max server memory (MB)'
```
{: data-copyable="true" data-clean-code="Get-DbaSpConfigure -SqlInstance sql2012 -Name 'max server memory (MB)'" }

Returns only the system configuration for MaxServerMemory on sql2012.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaSpConfigure -SqlInstance sql2012 -ExcludeName 'max server memory (MB)', RemoteAccess | Out-GridView
```
{: data-copyable="true" data-clean-code="Get-DbaSpConfigure -SqlInstance sql2012 -ExcludeName 'max server memory (MB)', RemoteAccess | Out-GridView" }

Returns system configuration information on sql2012 but excludes for max server memory (MB) and remote access. Values returned in grid view<br>

#####  Example:  5 

```powershell
PS C:\> $cred = Get-Credential SqlCredential
PS C:\> 'sql2012' | Get-DbaSpConfigure -SqlCredential $cred -Name RemoteAccess, 'max server memory (MB)' -ExcludeName 'remote access' | Out-GridView
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential SqlCredential
'sql2012' | Get-DbaSpConfigure -SqlCredential $cred -Name RemoteAccess, 'max server memory (MB)' -ExcludeName 'remote access' | Out-GridView" }

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
