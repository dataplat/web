---
title: "Copy-DbaXESessionTemplate"
slug: "Copy-DbaXESessionTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies Extended Event session templates from dbatools repository to SSMS template directory for GUI access."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaXESessionTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaXESessionTemplate"
draft: false
---

# Copy-DbaXESessionTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaXESessionTemplate](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaXESessionTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaXESessionTemplate](https://dataplat.github.io/boh#Copy-DbaXESessionTemplate).

## Synopsis

Copies Extended Event session templates from dbatools repository to SSMS template directory for GUI access.

## Description

Installs curated Extended Event session templates into SQL Server Management Studio's template directory so you can access them through the SSMS GUI.  
The templates include common monitoring scenarios like deadlock detection, query performance tracking, connection monitoring, and database health checks.  
Only copies non-Microsoft templates, preserving any custom templates already in your SSMS directory while adding the community-contributed ones from the dbatools collection.

## Syntax

```powershell
Copy-DbaXESessionTemplate
    [[-Path] <String[]>]
    [[-Destination] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Copy-DbaXESessionTemplate
```

Copies non-Microsoft templates from the dbatools template repository (/bin/XEtemplates/) to $home\Documents\SQL Server Management Studio\Templates\XEventTemplates.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaXESessionTemplate -Path C:\temp\XEtemplates
```

Copies your templates from C:\temp\XEtemplates to $home\Documents\SQL Server Management Studio\Templates\XEventTemplates.<br>

### Optional Parameters

##### -Path

Specifies the directory containing Extended Event session template files to copy from. Defaults to the dbatools template repository (/bin/XEtemplates/).  
Use this when you want to copy templates from a custom directory instead of the built-in dbatools collection, such as organization-specific templates or downloaded templates from other sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$script:PSModuleRoot\bin\XEtemplates" |

##### -Destination

Specifies the target directory where Extended Event templates will be installed for SSMS access. Defaults to $home\Documents\SQL Server Management Studio\Templates\XEventTemplates.  
Use this when you need to install templates to a different SSMS profile or custom template location, such as when SSMS is installed in a non-standard directory or for shared template repositories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$home\Documents\SQL Server Management Studio\Templates\XEventTemplates" |

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
