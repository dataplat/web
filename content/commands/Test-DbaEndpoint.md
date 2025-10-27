---
title: "Test-DbaEndpoint"
slug: "Test-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests network connectivity to SQL Server endpoint TCP listener ports."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaEndpoint"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaEndpoint</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaEndpoint.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Tests network connectivity to SQL Server endpoint TCP listener ports.

## Description

Tests network connectivity to SQL Server endpoint TCP listener ports by attempting direct socket connections. This function validates that endpoint ports are accessible from the network level, which is essential for troubleshooting database mirroring, Service Broker, and availability group connectivity issues.  
  
The function tests both standard TCP ports and SSL ports when configured, returning connection status rather than endpoint functionality. Endpoints without TCP listener ports (such as HTTP endpoints) are automatically skipped during testing.  
  
Use this when diagnosing connectivity problems between SQL Server instances or validating firewall rules before setting up features that rely on endpoints.

## Syntax

```powershell
Test-DbaEndpoint
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Endpoint] <String[]>]
    [[-InputObject] <Endpoint[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaEndpoint -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Test-DbaEndpoint -SqlInstance localhost" }

Tests all endpoints on the local default SQL Server instance.<br>
Note that if an endpoint does not have a tcp listener port, it will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaEndpoint -SqlInstance localhost, sql2016 -Endpoint Mirror | Test-DbaEndpoint
```
{: data-copyable="true" data-clean-code="Get-DbaEndpoint -SqlInstance localhost, sql2016 -Endpoint Mirror | Test-DbaEndpoint" }

Tests all endpoints named Mirroring on sql2016 and localhost.<br>
Note that if an endpoint does not have a tcp listener port, it will be skipped.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaEndpoint -SqlInstance localhost, sql2016 -Endpoint Mirror
```
{: data-copyable="true" data-clean-code="Test-DbaEndpoint -SqlInstance localhost, sql2016 -Endpoint Mirror" }

Tests all endpoints named Mirroring on sql2016 and localhost.<br>
Note that if an endpoint does not have a tcp listener port, it will be skipped.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaEndpoint -SqlInstance localhost -Verbose
```
{: data-copyable="true" data-clean-code="Test-DbaEndpoint -SqlInstance localhost -Verbose" }

Tests all endpoints on the local default SQL Server instance.<br>
See all endpoints that were skipped due to not having a tcp listener port.<br>

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

Specifies which endpoint names to test for network connectivity. Accepts multiple endpoint names to filter testing to specific endpoints.  
Use this when you need to validate connectivity for particular endpoints like database mirroring, Service Broker, or availability group listeners instead of testing all endpoints on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts endpoint objects from Get-DbaEndpoint for pipeline processing. This allows you to filter endpoints first using Get-DbaEndpoint, then test only those specific endpoints.  
Use this approach when you need to apply complex filtering logic before testing connectivity, such as testing only endpoints of a specific type or state.

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
