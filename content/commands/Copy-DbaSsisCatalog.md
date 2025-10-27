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

# Copy-DbaSsisCatalog

| Property | Value |
| --- | --- |
| **Author** | Phil Schwartz (philschwartz.me, @pschwartzzz) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaSsisCatalog](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSsisCatalog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaSsisCatalog](https://dataplat.github.io/boh#Copy-DbaSsisCatalog).

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

Copies all folders, environments and SSIS Projects from sqlserver2014a to sqlcluster, using Windows credentials to authenticate to both instances. If folders with the same name exist on the <br>
destination they will be skipped, but projects will be redeployed.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -Project Archive_Tables -SourceSqlCredential $cred -Force
```

Copies a single Project, the Archive_Tables Project, from sqlserver2014a to sqlcluster using SQL credentials to authenticate to sqlserver2014a and Windows credentials to authenticate to sqlcluster. <br>
If a Project with the same name exists on sqlcluster, it will be deleted and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

#####  Example:  4 

```powershell
PS C:\> $SecurePW = Read-Host "Enter password" -AsSecureString
PS C:\> Copy-DbaSsisCatalog -Source sqlserver2014a -Destination sqlcluster -CreateCatalogPassword $SecurePW
```

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
