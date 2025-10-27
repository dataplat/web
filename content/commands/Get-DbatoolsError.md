---
title: "Get-DbatoolsError"
slug: "Get-DbatoolsError"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves detailed error information from failed dbatools commands for troubleshooting"
tags:
  - "Module"
  - "Support"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsError.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbatoolsError"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbatoolsError</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsError.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves detailed error information from failed dbatools commands for troubleshooting

## Description

Retrieves detailed error information specifically from dbatools command failures, filtering the PowerShell error collection to show only dbatools-related errors. This provides comprehensive diagnostic details including exception messages, stack traces, and invocation information that help troubleshoot SQL Server connection issues, permission problems, or command syntax errors. By default, it returns only the most recent dbatools error, but can retrieve all historical dbatools errors for pattern analysis or support requests.

## Syntax

```powershell
Get-DbatoolsError
    [[-First] <Int32>]
    [[-Last] <Int32>]
    [[-Skip] <Int32>]
    [-All]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsError
```
{: data-copyable="true" data-clean-code="Get-DbatoolsError" }

Returns detailed error information for the most recent dbatools error<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsError -All
```
{: data-copyable="true" data-clean-code="Get-DbatoolsError -All" }

Returns detailed error information for all dbatools-related errors<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbatoolsError -Last 1
```
{: data-copyable="true" data-clean-code="Get-DbatoolsError -Last 1" }

Returns the oldest dbatools-related error in the pipeline<br>

### Optional Parameters

##### -First

Specifies the number of most recent dbatools errors to return. Defaults to 1 if no parameters are specified.  
Use this when you need to examine the latest few errors after a batch operation or troubleshooting session.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Last

Specifies the number of oldest dbatools errors to return from the error history.  
Use this when you need to see the earliest errors that occurred during a session or to trace the root cause of cascading failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Skip

Specifies the number of most recent dbatools errors to skip before returning results.  
Use this when you want to ignore the latest error and examine previous errors, or when paging through error history.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -All

Returns detailed information for all dbatools-related errors in the current PowerShell session.  
Use this when creating support tickets, analyzing error patterns, or performing comprehensive troubleshooting of multiple failed commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
