---
title: "Invoke-DbaAdvancedUpdate"
slug: "Invoke-DbaAdvancedUpdate"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Installs SQL Server updates and patches on remote computers with automatic restart management"
tags:
  - "Deployment"
  - "Install"
  - "Patching"
  - "Update"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedUpdate.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaAdvancedUpdate"
draft: false
---

# Invoke-DbaAdvancedUpdate

| Property | Value |
| --- | --- |
| **Author** | Kirill Kravtsov (@nvarscar) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaAdvancedUpdate](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedUpdate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaAdvancedUpdate](https://dataplat.github.io/boh#Invoke-DbaAdvancedUpdate).

## Synopsis

Installs SQL Server updates and patches on remote computers with automatic restart management

## Description

Executes SQL Server KB updates on a target computer by extracting patch files, running setup.exe with appropriate parameters, and managing system restarts as needed. This function handles the core installation logic for Update-DbaInstance, processing update actions for specific SQL Server instances or all instances on a machine. It automatically detects the drive with most free space for extraction, validates pending reboots, and coordinates restart sequences to ensure patches install successfully across multiple update cycles.

## Syntax

```powershell
Invoke-DbaAdvancedUpdate
    [[-ComputerName] <String>]
    [[-Action] <Object[]>]
    [[-Restart] <Boolean>]
    [[-Authentication] <String>]
    [[-Credential] <PSCredential>]
    [[-ExtractPath] <String>]
    [[-ArgumentList] <String[]>]
    [-NoPendingRenameCheck]
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
PS C:\> Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions
```

Invokes update actions on SQL1 after restarting it.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions -ExtractPath C:\temp
```

Extracts required files to the specific location "C:\temp". Invokes update actions on SQL1 after restarting it.<br>

### Optional Parameters

##### -ComputerName

Specifies the remote computer where SQL Server updates will be installed.  
This function handles the actual installation process after Update-DbaInstance creates the action plan.  
Must have WinRM enabled and accessible for remote operations including file extraction and system restarts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Action

Contains the update action plan objects created by Update-DbaInstance with details for each KB to install.  
Each action includes properties like TargetLevel, KB number, Installer path, MajorVersion, Build, and InstanceName.  
Multiple actions can be processed sequentially to chain-install several updates with automatic restarts between each.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Restart

Automatically restarts the target computer after successful patch installation and waits for it to come back online.  
Required for installing multiple patches in sequence, as each SQL Server update typically requires a system restart to complete.  
Also handles pre-installation restarts when pending reboots are detected before beginning the update process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Authentication

Specifies the WinRM authentication protocol for remote connections to the target computer.  
Defaults to CredSSP when credentials are provided to handle network share access and avoid double-hop authentication issues.  
Use Default authentication only for local operations, as network-based update repositories require credential delegation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Credssp |
| Accepted Values | Default,Basic,Negotiate,NegotiateWithImplicitCredential,Credssp,Digest,Kerberos |

##### -Credential

Windows Credential with permission to log on to the remote server.  
Must be specified for any remote connection if update Repository is located on a network folder.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExtractPath

Specifies the directory path where update files will be extracted on the target computer.  
If not specified, automatically selects the drive with the most free space for extraction.  
Use this when you need to control extraction location for space management or security requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ArgumentList

Additional command-line arguments passed to the SQL Server setup.exe during installation.  
Commonly used for setup customization like "/SkipRules=RebootRequiredCheck" to bypass reboot validation or "/Q" for quiet mode.  
Arguments are automatically combined with required parameters like /quiet, /allinstances or /instancename, and /IAcceptSQLServerLicenseTerms.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoPendingRenameCheck

Skips the pending file rename check when determining if a system restart is required before installation.  
Use this when the pending rename detection produces false positives that prevent updates from proceeding.  
The function will still check other restart conditions like registry entries and exit codes from previous installations.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
