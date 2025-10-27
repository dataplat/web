---
title: "Publish-DbaDacPackage"
slug: "Publish-DbaDacPackage"
date: 2024-01-01
layout: "single"
author: "Richie lee (@richiebzzzt)"
availability: "Windows, Linux, macOS"
synopsis: "Deploys DACPAC or BACPAC files to SQL Server databases using the DacFx framework"
tags:
  - "Deployment"
  - "Dacpac"
  - "Bacpac"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Publish-DbaDacPackage.ps1"
bohUrl: "https://dataplat.github.io/boh#Publish-DbaDacPackage"
draft: false
---

# Publish-DbaDacPackage

| Property | Value |
| --- | --- |
| **Author** | Richie lee (@richiebzzzt) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Publish-DbaDacPackage](https://github.com/dataplat/dbatools/blob/master/public/Publish-DbaDacPackage.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Publish-DbaDacPackage](https://dataplat.github.io/boh#Publish-DbaDacPackage).

## Synopsis

Deploys DACPAC or BACPAC files to SQL Server databases using the DacFx framework

## Description

Deploys database schema changes from DACPAC files created by SSDT projects or Export-DbaDacPackage, automatically updating target database structure and executing embedded pre/post deployment scripts. Also imports data from BACPAC files for complete database restoration scenarios. This replaces manual schema synchronization and deployment processes, making it essential for CI/CD pipelines and environment promotions. You can generate deployment scripts without applying changes for review, or use publish profiles to control deployment behavior and variable substitution.

## Syntax

```powershell
Publish-DbaDacPackage
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    -Path <String>
    -Database <String[]>
    [-ConnectionString <String[]>]
    [-GenerateDeploymentReport]
    [-ScriptOnly]
    [-Type <String>]
    [-OutputPath <String>]
    [-IncludeSqlCmdVars]
    [-DacOption <Object>]
    [-EnableException]
    [-DacFxPath <String>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Publish-DbaDacPackage
    [-SqlInstance <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    -Path <String>
    [-PublishXml <String>]
    -Database <String[]>
    [-ConnectionString <String[]>]
    [-GenerateDeploymentReport]
    [-ScriptOnly]
    [-Type <String>]
    [-OutputPath <String>]
    [-IncludeSqlCmdVars]
    [-EnableException]
    [-DacFxPath <String>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Publish
PS C:\> $options.DeployOptions.DropObjectsNotInSource = $true
PS C:\> Publish-DbaDacPackage -SqlInstance sql2016 -Database DB1 -DacOption $options -Path c:\temp\db.dacpac
```

Uses DacOption object to set Deployment Options and updates DB1 database on sql2016 from the db.dacpac dacpac file, dropping objects that are missing from source.<br>

#####  Example:  2 

```powershell
PS C:\> Publish-DbaDacPackage -SqlInstance sql2017 -Database WideWorldImporters -Path C:\temp\sql2016-WideWorldImporters.dacpac -PublishXml C:\temp\sql2016-WideWorldImporters-publish.xml -Confirm
```

Updates WideWorldImporters on sql2017 from the sql2016-WideWorldImporters.dacpac using the sql2016-WideWorldImporters-publish.xml publish profile. Prompts for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDacProfile -SqlInstance sql2016 -Database db2 -Path C:\temp
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database db2 | Publish-DbaDacPackage -PublishXml C:\temp\sql2016-db2-publish.xml -Database db1, db2 -SqlInstance sql2017
```

Creates a publish profile at C:\temp\sql2016-db2-publish.xml, exports the .dacpac to $home\Documents\sql2016-db2.dacpac. Does not prompt for confirmation.<br>
then publishes it to the sql2017 server database db2<br>

#####  Example:  4 

```powershell
PS C:\> $loc = "C:\Users\bob\source\repos\Microsoft.Data.Tools.Msbuild\lib\net46\Microsoft.SqlServer.Dac.dll"
PS C:\> Publish-DbaDacPackage -SqlInstance "local" -Database WideWorldImporters -Path C:\temp\WideWorldImporters.dacpac -PublishXml C:\temp\WideWorldImporters.publish.xml -DacFxPath $loc -Confirm
```

Publishes the dacpac using a specific dacfx library. Prompts for confirmation.<br>

#####  Example:  5 

```powershell
PS C:\> Publish-DbaDacPackage -SqlInstance sql2017 -Database WideWorldImporters -Path C:\temp\sql2016-WideWorldImporters.dacpac -PublishXml C:\temp\sql2016-WideWorldImporters-publish.xml -ScriptOnly
```

Does not deploy the changes, but will generate the deployment script that would be executed against WideWorldImporters.<br>

### Required Parameters

##### -Path

Specifies the filesystem path to the DACPAC or BACPAC file to deploy. The function automatically detects file type based on the extension.  
Use this to point to your compiled database project (.dacpac) or exported database backup with data (.bacpac).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Database

Specifies the target database name(s) to deploy the DACPAC or BACPAC to. Accepts multiple database names for deploying the same package to multiple databases.  
The database will be created if it doesn't exist, or updated to match the schema if it already exists.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Only SQL authentication is supported. When not specified, uses Trusted Authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PublishXml

Specifies the path to a publish profile XML file that defines deployment options and SqlCmd variables. Created by SQL Server Data Tools (SSDT) or New-DbaDacProfile.  
Use this to control deployment behavior like dropping objects not in source, ignoring permissions, or setting variable values for different environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConnectionString

Specifies the connection string to connect to the target SQL Server instance. Alternative to using SqlInstance and SqlCredential parameters.  
Use this when you need specific connection properties or when connecting through alternative authentication methods not supported by SqlInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -GenerateDeploymentReport

Creates an XML deployment report showing what changes were made during the deployment. The report is saved to the OutputPath directory.  
Use this for deployment auditing, troubleshooting failed deployments, or documenting changes applied to production databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ScriptOnly

Generates the deployment script without executing it against the target database. The script is saved to the OutputPath directory for review.  
Use this for change approval processes, manual deployment scenarios, or to review what changes would be applied before executing them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Type

Specifies whether to deploy a DACPAC (schema only) or BACPAC (schema and data) file. Defaults to DACPAC.  
Use DACPAC for deploying database schema changes from development to production, or BACPAC for full database restore including data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Dacpac |
| Accepted Values | Dacpac,Bacpac |

##### -OutputPath

Specifies the directory where deployment scripts and reports will be saved when using ScriptOnly or GenerateDeploymentReport. Defaults to the dbatools export path configuration.  
Use this to organize output files in a specific location for review, version control, or automated deployment processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -IncludeSqlCmdVars

Enables replacement of SqlCmd variables in the publish profile with their actual values during deployment.  
Use this when your deployment scripts or publish profile contain variables like $(Environment) or $(ServerName) that need to be substituted with environment-specific values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DacOption

Specifies deployment options object controlling how the deployment behaves. Created using New-DbaDacOption with specific deployment settings.  
Use this to programmatically control deployment behavior instead of using a publish profile XML file, such as dropping objects not in source or ignoring permissions.

| Property | Value |
| --- | --- |
| Alias | Option |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -DacFxPath

Specifies the path to a specific version of the Microsoft.SqlServer.Dac.dll library to use for deployment operations.  
Use this when you need a specific DacFx version for compatibility with your SQL Server version or to use features from a newer DacFx release.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
