---
title: "Import-DbaXESessionTemplate"
slug: "Import-DbaXESessionTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates Extended Events sessions from XML templates on SQL Server instances"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaXESessionTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaXESessionTemplate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Import-DbaXESessionTemplate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Import-DbaXESessionTemplate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates Extended Events sessions from XML templates on SQL Server instances

## Description

Creates new Extended Events sessions using predefined XML templates from the dbatools repository or custom template files you specify. This function simplifies XE session deployment by providing ready-to-use templates for common monitoring scenarios like performance troubleshooting, security auditing, and health monitoring.  
  
Templates from the dbatools repository include popular configurations for index page splits, query wait statistics, deadlock monitoring, IO errors, and database health checks. You can also import custom templates created from existing sessions or third-party sources.  
  
The function automatically handles SQL Server version compatibility, validates template XML structure, checks for existing sessions to prevent conflicts, and can optionally start sessions immediately with auto-start configuration for server restarts.

## Syntax

```powershell
Import-DbaXESessionTemplate
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String>]
    [[-Path] <String[]>]
    [[-Template] <String[]>]
    [[-TargetFilePath] <String>]
    [[-TargetFileMetadataPath] <String>]
    [[-StartUpState] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template "15 Second IO Error"
```
{: data-copyable="true" data-clean-code="Import-DbaXESessionTemplate -SqlInstance sql2017 -Template &quot;15 Second IO Error&quot;" }

Creates a new XESession named "15 Second IO Error" from the dbatools repository to the SQL Server sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template "Index Page Splits" -StartUpState On
```
{: data-copyable="true" data-clean-code="Import-DbaXESessionTemplate -SqlInstance sql2017 -Template &quot;Index Page Splits&quot; -StartUpState On" }

Creates a new XESession named "Index Page Splits" from the dbatools repository to the SQL Server sql2017, starts the XESession and sets the StartUpState to On so that it starts on the next server <br>
restart.<br>

#####  Example:  3 

```powershell
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template "Query Wait Statistics" -Name "Query Wait Stats" | Start-DbaXESession
```
{: data-copyable="true" data-clean-code="Import-DbaXESessionTemplate -SqlInstance sql2017 -Template &quot;Query Wait Statistics&quot; -Name &quot;Query Wait Stats&quot; | Start-DbaXESession" }

Creates a new XESession named "Query Wait Stats" using the Query Wait Statistics template, then immediately starts it.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2017 -Session 'Database Health 2014' | Remove-DbaXESession
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template 'Database Health 2014' | Start-DbaXESession
```
{: data-copyable="true" data-clean-code="Get-DbaXESession -SqlInstance sql2017 -Session 'Database Health 2014' | Remove-DbaXESession
Import-DbaXESessionTemplate -SqlInstance sql2017 -Template 'Database Health 2014' | Start-DbaXESession" }

Removes a session if it exists, then recreates it using a template.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaXESessionTemplate | Out-GridView -PassThru | Import-DbaXESessionTemplate -SqlInstance sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaXESessionTemplate | Out-GridView -PassThru | Import-DbaXESessionTemplate -SqlInstance sql2017" }

Allows you to select a Session template then import to an instance named sql2017.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

##### -Name

Specifies a custom name for the Extended Events session being created. When not provided, the session name defaults to the template filename.  
Use this when you need multiple sessions from the same template or want descriptive names that match your monitoring standards.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the full file path to custom Extended Events session XML template files. Accepts multiple file paths for bulk imports.  
Use this when importing custom templates you've created or third-party XE session definitions instead of built-in dbatools templates.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Template

Specifies the name of a built-in Extended Events template from the dbatools repository. Accepts multiple template names for bulk deployment.  
Use tab completion to browse available templates like "Blocked Process Report", "Query Wait Statistics", or "Index Page Splits". These templates provide pre-configured monitoring for common DBA   
scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TargetFilePath

Overrides the default directory for Extended Events trace files (.xel files) in the template. Specify only the directory path, not filenames.  
Use this when you need XE files stored in specific locations for storage management, compliance, or performance reasons. The path is relative to the SQL Server instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TargetFileMetadataPath

Overrides the default directory for Extended Events metadata files (.xem files) in the template. Specify only the directory path, not filenames.  
Use this when you need XE metadata files stored separately from trace files or in specific locations for organizational purposes. The path is relative to the SQL Server instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StartUpState

Controls whether the Extended Events session starts immediately and automatically restarts after SQL Server restarts. Default is Off.  
Set to "On" when you need continuous monitoring that survives server restarts, such as for production performance monitoring or security auditing sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Off |
| Accepted Values | On,Off |

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
