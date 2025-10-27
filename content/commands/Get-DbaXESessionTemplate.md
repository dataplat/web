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

# Get-DbaXESessionTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaXESessionTemplate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXESessionTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaXESessionTemplate](https://dataplat.github.io/boh#Get-DbaXESessionTemplate).

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

Returns information about all the templates in the local dbatools repository.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXESessionTemplate | Out-GridView -PassThru | Import-DbaXESessionTemplate -SqlInstance sql2017 | Start-DbaXESession
```

Allows you to select a Session template, then import it to the specified instance and start the session.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaXESessionTemplate -Path "$home\Documents\SQL Server Management Studio\Templates\XEventTemplates"
```

Returns information about all the templates in your local XEventTemplates repository.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaXESessionTemplate -Pattern duration
```

Returns information about all the templates that match the word "duration" in the title, category or body.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaXESessionTemplate | Select-Object *
```

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
