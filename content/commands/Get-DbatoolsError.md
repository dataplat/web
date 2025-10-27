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

# Get-DbatoolsError

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbatoolsError](https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsError.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbatoolsError](https://dataplat.github.io/boh#Get-DbatoolsError).

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

Returns detailed error information for the most recent dbatools error<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbatoolsError -All
```

Returns detailed error information for all dbatools-related errors<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbatoolsError -Last 1
```

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
