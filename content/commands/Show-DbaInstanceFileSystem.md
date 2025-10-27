---
title: "Show-DbaInstanceFileSystem"
slug: "Show-DbaInstanceFileSystem"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Displays a GUI tree view for browsing remote SQL Server file systems and returns the selected directory path"
tags:
  - "Storage"
  - "FileSystem"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Show-DbaInstanceFileSystem.ps1"
bohUrl: "https://dataplat.github.io/boh#Show-DbaInstanceFileSystem"
draft: false
---

# Show-DbaInstanceFileSystem

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Show-DbaInstanceFileSystem](https://github.com/dataplat/dbatools/blob/master/public/Show-DbaInstanceFileSystem.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Show-DbaInstanceFileSystem](https://dataplat.github.io/boh#Show-DbaInstanceFileSystem).

## Synopsis

Displays a GUI tree view for browsing remote SQL Server file systems and returns the selected directory path

## Description

Similar to the remote file system popup you see when browsing a remote SQL Server in SQL Server Management Studio, this function allows you to traverse the remote SQL Server's file structure. This replaces the need to manually type or guess directory paths when setting up backup locations, restore operations, or specifying data and log file paths.  
  
Show-DbaInstanceFileSystem uses SQL Management Objects to browse the directories and what you see is limited to the permissions of the account running the command. The function opens a Windows Presentation Framework GUI with a familiar tree view interface, complete with drive and folder icons, making it easy to navigate and select the correct directory path for your SQL Server operations.

## Syntax

```powershell
Show-DbaInstanceFileSystem
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Show-DbaInstanceFileSystem -SqlInstance sql2017
```

Shows a list of databases using Windows Authentication to connect to the SQL Server. Returns a string of the selected path.<br>

#####  Example:  2 

```powershell
PS C:\> Show-DbaInstanceFileSystem -SqlInstance sql2017 -SqlCredential $cred
```

Shows a list of databases using SQL credentials to connect to the SQL Server. Returns a string of the selected path.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

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
