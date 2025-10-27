---
title: "Update-DbaMaintenanceSolution"
slug: "Update-DbaMaintenanceSolution"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan, @JordanOrdix"
availability: "Windows, Linux, macOS"
synopsis: "Updates existing Ola Hallengren Maintenance Solution stored procedures to the latest version"
tags:
  - "Community"
  - "OlaHallengren"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Update-DbaMaintenanceSolution.ps1"
bohUrl: "https://dataplat.github.io/boh#Update-DbaMaintenanceSolution"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Update-DbaMaintenanceSolution</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Update-DbaMaintenanceSolution.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andreas Jordan, @JordanOrdix</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Updates existing Ola Hallengren Maintenance Solution stored procedures to the latest version

## Description

Updates the stored procedures for Ola Hallengren's Maintenance Solution on SQL Server instances where it's already installed. This function downloads the latest version from GitHub and replaces only the procedure code, leaving all existing tables, jobs, and configurations intact.  
  
Use this when you need to get bug fixes or improvements in the maintenance procedures without disrupting your existing backup, integrity check, and index optimization jobs. The function checks for existing procedures before attempting updates and only updates what's currently installed.  
  
This approach only works when the new procedure versions are compatible with your existing table structures and job configurations. If Ola releases changes that require schema modifications or new tables, you'll need to use Install-DbaMaintenanceSolution for a complete reinstallation instead.

## Syntax

```powershell
Update-DbaMaintenanceSolution
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-Solution] <String[]>]
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
PS C:\> Update-DbaMaintenanceSolution -SqlInstance RES14224 -Database DBA
```
{: data-copyable="true" data-clean-code="Update-DbaMaintenanceSolution -SqlInstance RES14224 -Database DBA" }

Updates Ola Hallengren's Solution objects on RES14224 in the DBA database.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance onto which the Maintenance Solution will be updated.

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

##### -Database

Specifies the database containing the existing Ola Hallengren maintenance solution stored procedures. Defaults to master.  
Change this if you installed the maintenance solution in a different database like DBA or Admin.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

##### -Solution

Controls which maintenance solution components to update. Valid options are All, Backup, IntegrityCheck, IndexOptimize, or CommandExecute.  
Use this when you only want to update specific procedures instead of the entire solution. Only procedures that already exist will be updated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,Backup,IntegrityCheck,IndexOptimize,CommandExecute |

##### -LocalFile

Path to a local zip file containing Ola Hallengren's maintenance solution instead of downloading from GitHub.  
Use this in environments without internet access or when you need to deploy a specific version that differs from the latest release.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Forces download of the latest maintenance solution from GitHub even if a cached version exists locally.  
Use this when you want to ensure you're getting the absolute latest version or if the cached version is corrupted.

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
