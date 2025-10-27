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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaScriptingOption</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaScriptingOption.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="$options = New-DbaScriptingOption
$options.ScriptDrops = $false
$options.WithDependencies = $false
$options.AgentAlertJob = $true
$options.AgentNotify = $true
Get-DbaAgentJob -SqlInstance sql2016 | Export-DbaScript -ScriptingOptionObject $options" }

Exports Agent Jobs with the Scripting Options ScriptDrops/WithDependencies set to $false and AgentAlertJob/AgentNotify set to true<br>


&nbsp;
