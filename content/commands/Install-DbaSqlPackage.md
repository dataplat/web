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

# Install-DbaSqlPackage

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire and Claude |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Install-DbaSqlPackage](https://github.com/dataplat/dbatools/blob/master/public/Install-DbaSqlPackage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Install-DbaSqlPackage](https://dataplat.github.io/boh#Install-DbaSqlPackage).

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

Downloads SqlPackage ZIP to the dbatools directory for the current user<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaSqlPackage -Scope AllUsers -Type Msi
```

Downloads and installs SqlPackage MSI for all users (requires administrative privileges)<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaSqlPackage -Path C:\SqlPackage
```

Downloads SqlPackage ZIP to C:\SqlPackage<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaSqlPackage -LocalFile C:\temp\sqlpackage.zip
```

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
