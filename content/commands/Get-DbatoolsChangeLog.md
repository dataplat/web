---
title: "Get-DbatoolsChangeLog"
slug: "Get-DbatoolsChangeLog"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Opens the dbatools release changelog in your default browser"
tags:
  - "Module"
  - "ChangeLog"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsChangeLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbatoolsChangeLog"
draft: false
---

# Get-DbatoolsChangeLog

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbatoolsChangeLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbatoolsChangeLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbatoolsChangeLog](https://dataplat.github.io/boh#Get-DbatoolsChangeLog).

## Synopsis

Opens the dbatools release changelog in your default browser

## Description

Launches your default browser to view the dbatools release changelog on GitHub. This provides access to version history, new features, bug fixes, and breaking changes for the dbatools PowerShell module. Useful for staying current with module updates or troubleshooting issues that may be related to recent changes.

## Syntax

```powershell
Get-DbatoolsChangeLog
    [-Local]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbatoolsChangeLog
```

Opens a browser to our online changelog<br>

### Optional Parameters

##### -Local

Attempts to display a local changelog file instead of opening the online version. This functionality has been deprecated and will display a warning message directing users to the online changelog.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
