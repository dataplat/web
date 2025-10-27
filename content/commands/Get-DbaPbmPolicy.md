---
title: "Get-DbaPbmPolicy"
slug: "Get-DbaPbmPolicy"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Policy-Based Management policies from SQL Server instances for compliance auditing and configuration review."
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmPolicy.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmPolicy"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaPbmPolicy</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmPolicy.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stephen Bennett, sqlnotesfromtheunderground.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves Policy-Based Management policies from SQL Server instances for compliance auditing and configuration review.

## Description

Retrieves all Policy-Based Management policies configured on SQL Server instances, allowing DBAs to audit compliance configurations and review policy settings across their environment. This function connects to the PBM store and returns policy details including categories, conditions, and evaluation modes. Use this when you need to document existing policies, troubleshoot policy evaluations, or verify compliance configurations without manually navigating through SQL Server Management Studio's Policy-Based Management node.

## Syntax

```powershell
Get-DbaPbmPolicy
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Policy] <String[]>]
    [[-Category] <String[]>]
    [[-InputObject] <PSObject[]>]
    [-IncludeSystemObject]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPbmPolicy -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaPbmPolicy -SqlInstance sql2016" }

Returns all policies from sql2016 server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmPolicy -SqlInstance sql2016 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Get-DbaPbmPolicy -SqlInstance sql2016 -SqlCredential $cred" }

Uses a credential $cred to connect and return all policies from sql2016 instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPbmPolicy -SqlInstance sql2016 -Category MorningCheck
```
{: data-copyable="true" data-clean-code="Get-DbaPbmPolicy -SqlInstance sql2016 -Category MorningCheck" }

Returns all policies from sql2016 server that part of the PolicyCategory MorningCheck<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -Policy

Specifies one or more policy names to retrieve, filtering the results to only those policies. Supports exact name matching for targeted policy retrieval.  
Use this when you need to examine specific policies rather than all policies on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Category

Filters results to show only policies belonging to specific policy categories. Categories help organize policies by function or compliance framework.  
Use this to focus on policies related to specific areas like security, performance, or maintenance checks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts PBM store objects from Get-DbaPbmStore via pipeline, allowing efficient processing of multiple instances. Enables chaining PBM commands together.  
Use this when building complex PBM workflows or when you already have PBM store objects from previous commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -IncludeSystemObject

Includes Microsoft's built-in system policies in the results, which are excluded by default. System policies cover standard SQL Server best practices.  
Use this when you need to review or document all policies including Microsoft's predefined compliance policies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
