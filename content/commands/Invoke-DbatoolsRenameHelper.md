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

# Invoke-DbatoolsRenameHelper

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbatoolsRenameHelper](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbatoolsRenameHelper.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbatoolsRenameHelper](https://dataplat.github.io/boh#Invoke-DbatoolsRenameHelper).

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

Checks to see if any ps1 file in C:\temp\ps matches an old command name.<br>
If so, then the command name within the text is updated and the resulting changes are written to disk in UTF-8.<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem C:\temp\ps\*.ps1 -Recurse | Invoke-DbatoolsRenameHelper -Encoding Ascii -WhatIf
```

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
