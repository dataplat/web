---
title: "Install-DbaSqlPackage"
slug: "Install-DbaSqlPackage"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire and Claude"
availability: "Windows, Linux, macOS"
synopsis: "Installs Microsoft SqlPackage utility required for database deployment and DACPAC operations"
tags:
  - "Deployment"
  - "Install"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaSqlPackage.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaSqlPackage"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Install-DbaSqlPackage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Install-DbaSqlPackage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire and Claude</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Installs Microsoft SqlPackage utility required for database deployment and DACPAC operations

## Description

Downloads and installs Microsoft SqlPackage utility, which is essential for database deployment automation and DACPAC operations. This prerequisite tool enables you to use Import-DbaDacpac, Export-DbaDacpac, Publish-DbaDacpac and Get-DbaDacpac for automated database schema deployments and CI/CD pipelines.  
  
SqlPackage is Microsoft's command-line utility for deploying database schema changes, extracting database schemas to DACPAC files, and publishing changes across environments. DBAs use this for automated deployments, maintaining consistent database schemas between development and production, and implementing database DevOps workflows.  
  
Cross-platform support:  
- Windows: Supports both ZIP (portable) and MSI installation methods  
- Linux/macOS: Supports ZIP installation method only  
  
By default, SqlPackage is installed as a portable ZIP file to the dbatools directory for CurrentUser scope, making it immediately available for database deployment tasks without requiring system-wide installation.  
For AllUsers (LocalMachine) scope on Windows, you can use the MSI installer which requires administrative privileges and provides system-wide access.  
  
Writes to $script:PSModuleRoot\bin\sqlpackage by default for CurrentUser scope.

## Syntax

```powershell
Install-DbaSqlPackage
    [[-Path] <String>]
    [[-Scope] <String>]
    [[-Type] <String>]
    [[-LocalFile] <String>]
    [-Force]
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
PS C:\> Install-DbaSqlPackage
```
{: data-copyable="true" data-clean-code="Install-DbaSqlPackage" }

Downloads SqlPackage ZIP to the dbatools directory for the current user<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaSqlPackage -Scope AllUsers -Type Msi
```
{: data-copyable="true" data-clean-code="Install-DbaSqlPackage -Scope AllUsers -Type Msi" }

Downloads and installs SqlPackage MSI for all users (requires administrative privileges)<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaSqlPackage -Path C:\SqlPackage
```
{: data-copyable="true" data-clean-code="Install-DbaSqlPackage -Path C:\SqlPackage" }

Downloads SqlPackage ZIP to C:\SqlPackage<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaSqlPackage -LocalFile C:\temp\sqlpackage.zip
```
{: data-copyable="true" data-clean-code="Install-DbaSqlPackage -LocalFile C:\temp\sqlpackage.zip" }

Installs SqlPackage from the local ZIP file.<br>

### Optional Parameters

##### -Path

Specifies the custom directory path where SqlPackage will be extracted or installed.  
Use this when you need SqlPackage in a specific location for CI/CD pipelines, shared tools directories, or portable deployments.  
If not specified, defaults to the dbatools data directory for CurrentUser scope or system location for AllUsers scope.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Scope

Controls whether SqlPackage is installed for the current user only or system-wide for all users.  
Use CurrentUser (default) for personal use or when you lack admin rights. Use AllUsers for shared servers where multiple DBAs need access to SqlPackage.  
AllUsers requires administrative privileges on Windows and installs to Program Files via MSI or /usr/local/sqlpackage on Unix systems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | CurrentUser |
| Accepted Values | CurrentUser,AllUsers |

##### -Type

Determines the installation method for SqlPackage deployment.  
Use Zip (default) for portable installations that don't require admin rights and work on all platforms. Use Msi for Windows system-wide installations with proper registry integration.  
MSI installations require AllUsers scope and administrative privileges but provide better integration with Windows software management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Zip |
| Accepted Values | Zip,Msi |

##### -LocalFile

Specifies the path to a pre-downloaded SqlPackage installation file (MSI or ZIP format).  
Use this in air-gapped environments or when you've already downloaded SqlPackage for offline installation.  
Useful for corporate environments where direct internet downloads are restricted or when installing the same version across multiple servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces re-download and reinstallation of SqlPackage even if it already exists in the target location.  
Use this when you need to update to the latest version, fix a corrupted installation, or ensure you have a clean SqlPackage deployment.  
Without this switch, the function will skip installation if SqlPackage is already detected in the destination path.

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
