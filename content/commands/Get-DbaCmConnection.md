---
title: "Get-DbaCmConnection"
slug: "Get-DbaCmConnection"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves cached Windows Management and CIM connections used by dbatools commands"
tags:
  - "ComputerManagement"
  - "CIM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCmConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaCmConnection"
draft: false
---

# Get-DbaCmConnection

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaCmConnection](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCmConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaCmConnection](https://dataplat.github.io/boh#Get-DbaCmConnection).

## Synopsis

Retrieves cached Windows Management and CIM connections used by dbatools commands

## Description

Shows which remote computer connections are currently cached by dbatools for Windows Management and CIM operations. This helps you understand what authentication contexts are active and troubleshoot connection issues when running dbatools commands against remote SQL Server instances. Cached connections are automatically created when you run dbatools commands that need to access Windows services, registry, or file system on remote servers.

## Syntax

```powershell
Get-DbaCmConnection
    [[-ComputerName] <String[]>]
    [[-UserName] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaCmConnection
```

List all cached connections.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCmConnection sql2014
```

List the cached connection - if any - to the server sql2014.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaCmConnection -UserName "*charles*"
```

List all cached connection that use a username containing "charles" as default or override credentials.<br>

### Optional Parameters

##### -ComputerName

Filters cached connections by computer name or server name. Supports wildcards for pattern matching.  
Use this to check connections to specific SQL Server hosts or to search for connections matching a pattern like "sql*prod*".

| Property | Value |
| --- | --- |
| Alias | Filter |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | * |

##### -UserName

Filters cached connections by the username in the stored credentials. Supports wildcards for pattern matching.  
Use this to find connections using specific service accounts or domain credentials. Will not match connections using integrated Windows authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | * |

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
