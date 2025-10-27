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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Show-DbaDbList</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Show-DbaDbList.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Show-DbaDbList -SqlInstance sqlserver2014a" }

Shows a GUI list of databases using Windows Authentication to connect to the SQL Server. Returns a string of the selected database.<br>

#####  Example:  2 

```powershell
PS C:\> Show-DbaDbList -SqlInstance sqlserver2014a -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Show-DbaDbList -SqlInstance sqlserver2014a -SqlCredential $cred" }

Shows a GUI list of databases using SQL credentials to connect to the SQL Server. Returns a string of the selected database.<br>

#####  Example:  3 

```powershell
PS C:\> Show-DbaDbList -SqlInstance sqlserver2014a -DefaultDb master
```
{: data-copyable="true" data-clean-code="Show-DbaDbList -SqlInstance sqlserver2014a -DefaultDb master" }

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
