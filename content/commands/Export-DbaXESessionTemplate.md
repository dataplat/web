---
title: "Export-DbaXESessionTemplate"
slug: "Export-DbaXESessionTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports Extended Events sessions as reusable XML templates for SSMS"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaXESessionTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaXESessionTemplate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaXESessionTemplate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaXESessionTemplate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Exports Extended Events sessions as reusable XML templates for SSMS

## Description

Converts existing Extended Events sessions into XML template files that can be imported and reused in SQL Server Management Studio.  
This lets you standardize XE session configurations across multiple environments without manually recreating session definitions.  
Templates are saved to the SSMS XEvent templates folder by default, making them immediately available in the SSMS template browser.  
Accepts sessions directly from SQL Server instances or from Get-DbaXESession pipeline output.

## Syntax

```powershell
Export-DbaXESessionTemplate
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Session] <Object[]>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-InputObject] <Session[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaXESessionTemplate -SqlInstance sql2017 -Path C:\temp\xe
```
{: data-copyable="true" data-clean-code="Export-DbaXESessionTemplate -SqlInstance sql2017 -Path C:\temp\xe" }

Exports an XESession XML Template for all Extended Event Sessions on sql2017 to the C:\temp\xe folder.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2017 -Session system_health | Export-DbaXESessionTemplate -Path C:\temp\xe
```
{: data-copyable="true" data-clean-code="Get-DbaXESession -SqlInstance sql2017 -Session system_health | Export-DbaXESessionTemplate -Path C:\temp\xe" }

Gets the system_health Extended Events Session from sql2017 and then exports as an XESession XML Template to C:\temp\xe<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

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

##### -Session

Specifies which Extended Events sessions to export by name. Accepts wildcards for pattern matching.  
Use this to export specific sessions instead of all sessions on the instance. Common sessions include system_health, AlwaysOn_health, or custom monitoring sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Sets the directory where XML template files will be saved. Defaults to the SSMS XEvent Templates folder in your Documents.  
Templates saved to the default location appear automatically in SSMS under Templates > XEventTemplates for easy reuse.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$home\Documents\SQL Server Management Studio\Templates\XEventTemplates" |

##### -FilePath

Sets the complete file path including filename for the exported template. Use when you need a specific filename or location.  
When specified, only one session can be exported at a time. If not provided, files are named after the session and saved to the Path directory.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Extended Events session objects from Get-DbaXESession pipeline input.  
Use this when you need to filter sessions first or when working with sessions from multiple instances in a single export operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
