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

# Update-DbaMaintenanceSolution

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan, @JordanOrdix |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Update-DbaMaintenanceSolution](https://github.com/dataplat/dbatools/blob/master/public/Update-DbaMaintenanceSolution.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Update-DbaMaintenanceSolution](https://dataplat.github.io/boh#Update-DbaMaintenanceSolution).

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
