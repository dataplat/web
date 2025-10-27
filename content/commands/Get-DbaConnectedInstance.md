---
title: "Get-DbaConnectedInstance"
slug: "Get-DbaConnectedInstance"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Returns SQL Server instances currently cached in the dbatools connection pool"
tags:
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaConnectedInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaConnectedInstance"
draft: false
---

# Get-DbaConnectedInstance

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaConnectedInstance](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaConnectedInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaConnectedInstance](https://dataplat.github.io/boh#Get-DbaConnectedInstance).

## Synopsis

Returns SQL Server instances currently cached in the dbatools connection pool

## Description

Shows all SQL Server connections that are currently active or cached in your PowerShell session. When you connect to instances using dbatools commands like Connect-DbaInstance, those connections are stored in an internal cache for reuse. This command reveals what's in that cache, including connection details like whether pooling is enabled and the connection type (SMO server objects vs raw SqlConnection objects). Use this to track active connections before cleaning them up with Disconnect-DbaInstance or to troubleshoot connection-related issues in long-running scripts.

## Syntax

```powershell
Get-DbaConnectedInstance
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaConnectedInstance
```

Gets all connected SQL Server instances<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaConnectedInstance | Select *
```

Gets all connected SQL Server instances and shows the associated connectionstrings as well<br>


&nbsp;
