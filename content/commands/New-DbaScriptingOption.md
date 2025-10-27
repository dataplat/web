---
title: "New-DbaScriptingOption"
slug: "New-DbaScriptingOption"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a customizable SMO ScriptingOptions object for controlling T-SQL script generation"
tags:
  - "General"
  - "Script"
  - "Object"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaScriptingOption.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaScriptingOption"
draft: false
---

# New-DbaScriptingOption

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaScriptingOption](https://github.com/dataplat/dbatools/blob/master/public/New-DbaScriptingOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaScriptingOption](https://dataplat.github.io/boh#New-DbaScriptingOption).

## Synopsis

Creates a customizable SMO ScriptingOptions object for controlling T-SQL script generation

## Description

Creates a Microsoft.SqlServer.Management.Smo.ScriptingOptions object that controls how SQL Server objects get scripted into T-SQL CREATE statements. This object lets you customize what gets included when using Export-DbaScript and other dbatools scripting commands - things like whether to include indexes, triggers, permissions, dependencies, or batch separators. Perfect for creating deployment scripts where you need specific control over what gets scripted and how it's formatted.  
  
See https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.management.smo.scriptingoptions.aspx for more information

## Syntax

```powershell
New-DbaScriptingOption
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $options = New-DbaScriptingOption
PS C:\> $options.ScriptDrops = $false
PS C:\> $options.WithDependencies = $false
PS C:\> $options.AgentAlertJob = $true
PS C:\> $options.AgentNotify = $true
PS C:\> Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript -ScriptingOptionObject $options
```

Exports Agent Jobs with the Scripting Options ScriptDrops/WithDependencies set to $false and AgentAlertJob/AgentNotify set to true<br>


&nbsp;
