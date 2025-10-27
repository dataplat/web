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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaXESessionTemplate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaXESessionTemplate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Copy-DbaXESessionTemplate" }

Copies non-Microsoft templates from the dbatools template repository (/bin/XEtemplates/) to $home\Documents\SQL Server Management Studio\Templates\XEventTemplates.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaXESessionTemplate -Path C:\temp\XEtemplates
```
{: data-copyable="true" data-clean-code="Copy-DbaXESessionTemplate -Path C:\temp\XEtemplates" }

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
