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

# Import-DbaXESessionTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Import-DbaXESessionTemplate](https://github.com/dataplat/dbatools/blob/master/public/Import-DbaXESessionTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Import-DbaXESessionTemplate](https://dataplat.github.io/boh#Import-DbaXESessionTemplate).

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

Creates a new XESession named "15 Second IO Error" from the dbatools repository to the SQL Server sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template "Index Page Splits" -StartUpState On
```

Creates a new XESession named "Index Page Splits" from the dbatools repository to the SQL Server sql2017, starts the XESession and sets the StartUpState to On so that it starts on the next server <br>
restart.<br>

#####  Example:  3 

```powershell
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template "Query Wait Statistics" -Name "Query Wait Stats" | Start-DbaXESession
```

Creates a new XESession named "Query Wait Stats" using the Query Wait Statistics template, then immediately starts it.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2017 -Session 'Database Health 2014' | Remove-DbaXESession
PS C:\> Import-DbaXESessionTemplate -SqlInstance sql2017 -Template 'Database Health 2014' | Start-DbaXESession
```

Removes a session if it exists, then recreates it using a template.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaXESessionTemplate | Out-GridView -PassThru | Import-DbaXESessionTemplate -SqlInstance sql2017
```

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
