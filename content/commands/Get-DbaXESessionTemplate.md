---
title: "Get-DbaXESessionTemplate"
slug: "Get-DbaXESessionTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves metadata from Extended Event session templates to help you discover and select pre-built monitoring solutions."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESessionTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaXESessionTemplate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaXESessionTemplate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESessionTemplate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Retrieves metadata from Extended Event session templates to help you discover and select pre-built monitoring solutions.

## Description

Retrieves metadata from Extended Event session templates stored in XML format, showing you what pre-built Extended Event sessions are available before importing them to your SQL Server instances. This saves you from manually browsing template files or guessing what monitoring solutions exist for specific scenarios.  
  
Use this command when you need to set up Extended Event monitoring but want to start with proven templates rather than building sessions from scratch. It's particularly helpful for discovering templates that monitor specific areas like performance, deadlocks, or security events.  
  
The function parses templates and returns key information including the template name, category, source, SQL Server compatibility, and description. You can filter results by pattern matching or select specific templates by name.  
  
The default repository contains templates from:  
Microsoft's Templates that come with SSMS  
Jes Borland's "Everyday Extended Events" presentation and GitHub repository (https://github.com/grrlgeek/extended-events)  
Christian Grafe (@ChrGraefe) XE Repo: https://github.com/chrgraefe/sqlscripts/blob/master/XE-Events/  
Erin Stellato's Blog: https://www.sqlskills.com/blogs/erin/  
  
Some profile templates converted using:  
sp_SQLskills_ConvertTraceToExtendedEvents.sql  
Jonathan M. Kehayias, SQLskills.com  
http://sqlskills.com/blogs/jonathan

## Syntax

```powershell
Get-DbaXESessionTemplate
    [[-Path] <String[]>]
    [[-Pattern] <String>]
    [[-Template] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaXESessionTemplate
```
{: data-copyable="true" data-clean-code="Get-DbaXESessionTemplate" }

Returns information about all the templates in the local dbatools repository.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXESessionTemplate | Out-GridView -PassThru | Import-DbaXESessionTemplate -SqlInstance sql2017 | Start-DbaXESession
```
{: data-copyable="true" data-clean-code="Get-DbaXESessionTemplate | Out-GridView -PassThru | Import-DbaXESessionTemplate -SqlInstance sql2017 | Start-DbaXESession" }

Allows you to select a Session template, then import it to the specified instance and start the session.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESessionTemplate -Path "$home\Documents\SQL Server Management Studio\Templates\XEventTemplates"
```
{: data-copyable="true" data-clean-code="Get-DbaXESessionTemplate -Path &quot;$home\Documents\SQL Server Management Studio\Templates\XEventTemplates&quot;" }

Returns information about all the templates in your local XEventTemplates repository.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaXESessionTemplate -Pattern duration
```
{: data-copyable="true" data-clean-code="Get-DbaXESessionTemplate -Pattern duration" }

Returns information about all the templates that match the word "duration" in the title, category or body.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaXESessionTemplate | Select-Object *
```
{: data-copyable="true" data-clean-code="Get-DbaXESessionTemplate | Select-Object *" }

Returns more information about the template, including the full path/filename.<br>

### Optional Parameters

##### -Path

Specifies the directory path containing Extended Event template XML files. Defaults to the built-in dbatools template repository.  
Use this when you want to browse custom or additional templates stored in your own directory instead of the default collection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$script:PSModuleRoot\bin\XEtemplates" |

##### -Pattern

Filters templates by searching for the specified text pattern across template names, categories, sources, and descriptions.  
Use this to quickly find templates related to specific monitoring scenarios like "deadlock", "performance", or "security" without browsing all available templates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Template

Specifies the exact name(s) of specific templates to retrieve, matching the template file names without the .xml extension.  
Use this when you know the specific template names you want to examine, such as "Deadlock_Tracking" or "Query_Duration_Performance".

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
