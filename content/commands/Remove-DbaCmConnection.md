---
title: "Remove-DbaCmConnection"
slug: "Remove-DbaCmConnection"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Removes cached Windows Management and CIM connections from the dbatools connection cache."
tags:
  - "ComputerManagement"
  - "CIM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaCmConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaCmConnection"
draft: false
---

# Remove-DbaCmConnection

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaCmConnection](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaCmConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaCmConnection](https://dataplat.github.io/boh#Remove-DbaCmConnection).

## Synopsis

Removes cached Windows Management and CIM connections from the dbatools connection cache.

## Description

Clears cached connection objects that dbatools uses for remote computer management operations like accessing Windows services, registry, and file systems on SQL Server instances.  
When you run dbatools commands against remote servers, these connections are automatically created and cached to improve performance and reduce authentication overhead.  
This function lets you remove specific cached connections or clear the entire cache, which is useful when credentials change, connections become stale, or you need to force fresh authentication for troubleshooting.

## Syntax

```powershell
Remove-DbaCmConnection
    [-ComputerName] <DbaCmConnectionParameter[]>
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
PS C:\> Remove-DbaCmConnection -ComputerName sql2014
```

Removes the cached connection to the server sql2014 from the cache.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCmConnection | Remove-DbaCmConnection
```

Clears the entire connection cache.<br>

### Required Parameters

##### -ComputerName

Specifies the computer name(s) whose cached connections should be removed from the dbatools connection cache. Accepts computer names as strings or connection objects from Get-DbaCmConnection.  
Use this when you need to clear stale connections after credential changes, network issues, or when troubleshooting remote computer management problems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
