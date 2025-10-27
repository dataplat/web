---
title: "Update-Dbatools"
slug: "Update-Dbatools"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Updates the dbatools PowerShell module to the latest version"
tags:
  - "Module"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Update-Dbatools.ps1"
bohUrl: "https://dataplat.github.io/boh#Update-Dbatools"
draft: false
---

# Update-Dbatools

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Update-Dbatools](https://github.com/dataplat/dbatools/blob/master/public/Update-Dbatools.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Update-Dbatools](https://dataplat.github.io/boh#Update-Dbatools).

## Synopsis

Updates the dbatools PowerShell module to the latest version

## Description

Updates the dbatools module by removing the current installation and replacing it with the latest version from PowerShell Gallery or GitHub. This function has been deprecated in favor of PowerShell's native Install-Module and Update-Module commands which provide better dependency management and version control.

## Syntax

```powershell
Update-Dbatools
    [-Development]
    [-Cleanup]
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
PS C:\> Update-Dbatools
```

Updates dbatools. Deletes current copy and replaces it with freshest copy.<br>

#####  Example:  2 

```powershell
PS C:\> Update-Dbatools -dev
```

Updates dbatools to the current development branch. Deletes current copy and replaces it with latest from github.<br>

### Optional Parameters

##### -Development

Installs the latest development branch from GitHub instead of the stable release from PowerShell Gallery. Use this when you need access to the newest features or bug fixes that haven't been   
officially released yet. Development builds may contain untested changes, so avoid using this in production environments unless specifically needed for troubleshooting or testing.

| Property | Value |
| --- | --- |
| Alias | dev,devbranch |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Cleanup

Removes previous versions of dbatools after installing the new version to free up disk space and avoid version conflicts. Use this when you have multiple dbatools versions installed and want to keep   
only the latest version. Without this switch, old versions remain on the system which can occasionally cause module loading issues or consume unnecessary disk space.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
