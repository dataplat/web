---
title: "Get-DbaTraceFlag"
slug: "Get-DbaTraceFlag"
date: 2024-01-01
layout: "single"
author: "Kevin Bullen (@sqlpadawan)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves currently enabled global trace flags from SQL Server instances."
tags:
  - "Diagnostic"
  - "TraceFlag"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTraceFlag.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaTraceFlag"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaTraceFlag</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaTraceFlag.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kevin Bullen (@sqlpadawan)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves currently enabled global trace flags from SQL Server instances.

## Description

Queries SQL Server instances to identify which global trace flags are currently active, returning detailed status information for monitoring and compliance purposes. This is essential for auditing server configurations, troubleshooting performance issues, and ensuring trace flag consistency across environments. You can filter results to specific trace flag numbers or retrieve all enabled flags across multiple instances.

## Syntax

```powershell
Get-DbaTraceFlag
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-TraceFlag] <Int32[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaTraceFlag -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaTraceFlag -SqlInstance localhost" }

Returns all Trace Flag information on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaTraceFlag -SqlInstance localhost, sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaTraceFlag -SqlInstance localhost, sql2016" }

Returns all Trace Flag(s) for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaTraceFlag -SqlInstance localhost -TraceFlag 4199,3205
```
{: data-copyable="true" data-clean-code="Get-DbaTraceFlag -SqlInstance localhost -TraceFlag 4199,3205" }

Returns Trace Flag status for TF 4199 and 3205 for the local SQL Server instance if they are enabled.<br>

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

##### -TraceFlag

Specifies one or more trace flag numbers to filter the results. Only returns information for the specified trace flags if they are currently enabled.  
Use this when you need to check the status of specific trace flags rather than reviewing all enabled flags on the instance.

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
