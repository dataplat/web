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

# Export-DbaXESessionTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaXESessionTemplate](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaXESessionTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaXESessionTemplate](https://dataplat.github.io/boh#Export-DbaXESessionTemplate).

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

Exports an XESession XML Template for all Extended Event Sessions on sql2017 to the C:\temp\xe folder.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXESession -SqlInstance sql2017 -Session system_health | Export-DbaXESessionTemplate -Path C:\temp\xe
```

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
