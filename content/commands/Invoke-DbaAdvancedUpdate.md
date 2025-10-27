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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaAdvancedUpdate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedUpdate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions" }

Invokes update actions on SQL1 after restarting it.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions -ExtractPath C:\temp
```
{: data-copyable="true" data-clean-code="Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions -ExtractPath C:\temp" }

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
