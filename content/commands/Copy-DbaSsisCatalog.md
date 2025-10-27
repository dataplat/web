---
title: "Copy-DbaSsisCatalog"
slug: "Copy-DbaSsisCatalog"
date: 2024-01-01
layout: "single"
author: "Phil Schwartz (philschwartz.me, @pschwartzzz)"
availability: "Windows, Linux, macOS"
synopsis: "Migrates SSIS catalogs including folders, projects, and environments between SQL Server instances."
tags:
  - "Migration"
  - "SSIS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSsisCatalog.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaSsisCatalog"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaSsisCatalog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSsisCatalog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Phil Schwartz (philschwartz.me, @pschwartzzz)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Migrates SSIS catalogs including folders, projects, and environments between SQL Server instances.

## Description

Copies the complete SSISDB catalog structure from a source SQL Server to one or more destination instances. This function handles server migrations, environment promotions, and disaster recovery scenarios where you need to replicate your Integration Services deployments.  
  
By default, all folders, projects, and environments are copied. You can use -Project, -Folder, or -Environment parameters to migrate specific components instead of the entire catalog. The function will create the SSISDB catalog on the destination if it doesn't exist, and automatically enable SQL CLR if required.  
  
The parameters work hierarchically - specifying -Folder will only deploy projects and environments from within that folder, while -Project will deploy just that specific project from whichever folder contains it.

## Syntax

```powershell
Copy-DbaSsisCatalog
    [-Source] <DbaInstanceParameter>
    [-Destination] <DbaInstanceParameter[]>
    [[-SourceSqlCredential] <PSCredential>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Project] <String>]
    [[-Folder] <String>]
    [[-Environment] <String>]
    [[-CreateCatalogPassword] <SecureString>]
    [-EnableSqlClr]
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
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster" }

Copies all folders, environments and SSIS Projects from sqlserver2014a to sqlcluster, using Windows credentials to authenticate to both instances. If folders with the same name exist on the <br>
destination they will be skipped, but projects will be redeployed.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -Project Archive_Tables -SourceSqlCredential $cred -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -Project Archive_Tables -SourceSqlCredential $cred -Force" }

Copies a single Project, the Archive_Tables Project, from sqlserver2014a to sqlcluster using SQL credentials to authenticate to sqlserver2014a and Windows credentials to authenticate to sqlcluster. <br>
If a Project with the same name exists on sqlcluster, it will be deleted and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

#####  Example:  4 

```powershell
PS C:\> $SecurePW = Read-Host "Enter password" -AsSecureString
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -CreateCatalogPassword $SecurePW
```
{: data-copyable="true" data-clean-code="$SecurePW = Read-Host &quot;Enter password&quot; -AsSecureString
Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -CreateCatalogPassword $SecurePW" }

Deploy entire SSIS catalog to an instance without a destination catalog. User prompts for creating the catalog on Destination will be bypassed.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the SSISDB catalog to copy from. Requires sysadmin privileges and SQL Server 2012 or higher.  
This instance must have Integration Services installed with an existing SSISDB catalog containing the folders, projects, and environments you want to migrate.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instances where the SSISDB catalog will be copied to. Requires sysadmin privileges and SQL Server 2012 or higher.  
If SSISDB doesn't exist on the destination, the function will offer to create it automatically including enabling CLR integration if needed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance. Use this when you need to connect with different credentials than your current Windows identity.  
Accepts PowerShell credential objects created with Get-Credential and supports SQL Authentication, Windows Authentication, and Active Directory authentication modes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instances. Use this when you need to connect with different credentials than your current Windows identity.  
Accepts PowerShell credential objects created with Get-Credential and supports SQL Authentication, Windows Authentication, and Active Directory authentication modes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Project

Specifies a single SSIS project name to copy instead of migrating all projects. The project will be deployed from whichever source folder contains it.  
Use this when you only need to migrate a specific Integration Services project rather than the entire catalog structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Folder

Specifies a single SSISDB catalog folder to copy instead of migrating all folders. Only projects and environments from within this folder will be copied.  
Use this to limit the migration scope when you only need to move contents of a specific organizational folder.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Environment

Specifies a single SSIS environment to copy instead of migrating all environments. The environment will be deployed from whichever source folder contains it.  
Use this when you only need to migrate specific environment configurations that contain your parameter values and connection strings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CreateCatalogPassword

Password for creating a new SSISDB catalog on the destination as a SecureString object. Required when the destination doesn't have an existing SSISDB catalog.  
Use this in automated scripts to avoid interactive password prompts during catalog creation. The password encrypts sensitive data within the SSISDB catalog.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EnableSqlClr

Automatically enables CLR integration on the destination without prompting for confirmation. CLR integration is required for SSISDB catalog functionality.  
Use this in automated scenarios where you want to avoid interactive prompts when the destination server doesn't have CLR enabled.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates existing folders, projects, and environments at the destination instead of skipping them. Use this when you need to overwrite existing SSIS objects during migrations.  
Without this parameter, the function will skip objects that already exist at the destination and display warning messages.

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
