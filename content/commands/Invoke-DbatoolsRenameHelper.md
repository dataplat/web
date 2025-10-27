---
title: "Invoke-DbatoolsRenameHelper"
slug: "Invoke-DbatoolsRenameHelper"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Updates PowerShell scripts to replace deprecated dbatools command and parameter names with current equivalents."
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbatoolsRenameHelper.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbatoolsRenameHelper"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbatoolsRenameHelper</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbatoolsRenameHelper.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Updates PowerShell scripts to replace deprecated dbatools command and parameter names with current equivalents.

## Description

Automatically scans and updates PowerShell script files to replace old dbatools command names and parameter names that have been renamed over time. This function searches through your scripts for over 200 deprecated command names and dozens of parameter renames, then updates the file content with the current naming conventions. Instead of manually hunting through scripts to update commands like Get-SqlMaxMemory to Get-DbaMaxMemory or Copy-SqlLogin to Copy-DbaLogin, this function handles the bulk replacement work for you.

## Syntax

```powershell
Invoke-DbatoolsRenameHelper
    [-InputObject] <FileInfo[]>
    [[-Encoding] <String>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-ChildItem C:\temp\ps\*.ps1 -Recurse | Invoke-DbatoolsRenameHelper
```
{: data-copyable="true" data-clean-code="Get-ChildItem C:\temp\ps\*.ps1 -Recurse | Invoke-DbatoolsRenameHelper" }

Checks to see if any ps1 file in C:\temp\ps matches an old command name.<br>
If so, then the command name within the text is updated and the resulting changes are written to disk in UTF-8.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem C:\temp\ps\*.ps1 -Recurse | Invoke-DbatoolsRenameHelper -Encoding Ascii -WhatIf
```
{: data-copyable="true" data-clean-code="Get-ChildItem C:\temp\ps\*.ps1 -Recurse | Invoke-DbatoolsRenameHelper -Encoding Ascii -WhatIf" }

Shows what would happen if the command would run. If the command would run and there were matches,<br>
the resulting changes would be written to disk as Ascii encoded.<br>

### Required Parameters

##### -InputObject

Specifies the PowerShell script files to scan and update for deprecated dbatools command and parameter names.  
Accept file objects from Get-ChildItem when you need to process multiple scripts containing outdated dbatools commands.  
Use this when modernizing existing automation scripts or migrating legacy PowerShell code to current dbatools naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Encoding

Sets the character encoding used when writing the updated script files back to disk. Defaults to UTF8.  
Use this when your PowerShell scripts require specific encoding formats for compatibility with source control systems or deployment processes.  
Most modern environments work well with the default UTF8 encoding, but legacy systems may require ASCII or other specific encodings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
