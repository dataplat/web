---
title: "Show-DbaDbList"
slug: "Show-DbaDbList"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Displays available databases in an interactive selection window"
tags:
  - "Database"
  - "FileSystem"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Show-DbaDbList.ps1"
bohUrl: "https://dataplat.github.io/boh#Show-DbaDbList"
draft: false
---

# Show-DbaDbList

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Show-DbaDbList](https://github.com/dataplat/dbatools/blob/master/public/Show-DbaDbList.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Show-DbaDbList](https://dataplat.github.io/boh#Show-DbaDbList).

## Synopsis

Displays available databases in an interactive selection window

## Description

Creates a Windows Presentation Framework dialog that connects to a SQL Server instance and presents all databases in a visual tree view for selection. This eliminates the need to hardcode database names in scripts or remember exact database names when building interactive tools.  
  
The function returns the name of the selected database as a string, making it ideal for building user-friendly maintenance scripts, allowing end users to choose databases without SQL Server Management Studio, or creating dynamic tools that work across different environments where database names may vary.  
  
Clicking OK returns the selected database name, while Cancel returns null, allowing your scripts to handle user cancellation gracefully.

## Syntax

```powershell
Show-DbaDbList
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [[-Title] <String>]
    [[-Header] <String>]
    [[-DefaultDb] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Show-DbaDbList -SqlInstance sqlserver2014a
```

Shows a GUI list of databases using Windows Authentication to connect to the SQL Server. Returns a string of the selected database.<br>

#####  Example:  2 

```powershell
PS C:\> Show-DbaDbList -SqlInstance sqlserver2014a -SqlCredential $cred
```

Shows a GUI list of databases using SQL credentials to connect to the SQL Server. Returns a string of the selected database.<br>

#####  Example:  3 

```powershell
PS C:\> Show-DbaDbList -SqlInstance sqlserver2014a -DefaultDb master
```

Shows a GUI list of databases using Windows Authentication to connect to the SQL Server. The "master" database will be selected when the lists shows. Returns a string of the selected database.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances..

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

##### -Title

Sets the title text that appears in the window's title bar. Defaults to "Select Database".  
Use this to customize the dialog title for specific maintenance scripts or to indicate the purpose of the database selection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Select Database |

##### -Header

Specifies the instruction text displayed above the database tree view. Defaults to "Select the database:".  
Customize this to provide context-specific instructions like "Choose database to backup:" or "Select database for maintenance:".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Select the database: |

##### -DefaultDb

Pre-selects a specific database when the selection dialog opens.  
Use this when you have a preferred or most commonly selected database to reduce clicks for end users.

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
