---
title: "New-DbaDacProfile"
slug: "New-DbaDacProfile"
date: 2024-01-01
layout: "single"
author: "Richie lee (@richiebzzzt)"
availability: "Windows, Linux, macOS"
synopsis: "Creates DAC publish profile XML files for automated dacpac deployment to SQL Server databases."
tags:
  - "Deployment"
  - "Dacpac"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDacProfile.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDacProfile"
draft: false
---

# New-DbaDacProfile

| Property | Value |
| --- | --- |
| **Author** | Richie lee (@richiebzzzt) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDacProfile](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDacProfile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDacProfile](https://dataplat.github.io/boh#New-DbaDacProfile).

## Synopsis

Creates DAC publish profile XML files for automated dacpac deployment to SQL Server databases.

## Description

The New-DbaDacProfile command generates standard publish profile XML files that control how DacFx deploys your dacpac files to SQL Server databases. These profile files define deployment settings like target database, connection details, and deployment options.  
  
The generated XML template includes basic deployment settings sufficient for most dacpac deployments, but you'll typically want to add additional deployment options to the publish profile for production scenarios.  
  
If you use Visual Studio with SSDT projects, you can enhance these profiles through the UI. Right-click on an SSDT project, choose "Publish", then "Load Profile" to load your generated profile. The Advanced button reveals the full list of available deployment options.  
  
For automation scenarios, these profiles work directly with SqlPackage.exe command-line deployments, eliminating the need to specify connection and deployment settings manually each time.  
  
For a complete list of deployment options you can add to profiles, search for "SqlPackage.exe command line switches" or visit https://msdn.microsoft.com/en-us/library/hh550080(v=vs.103).aspx

## Syntax

```powershell
New-DbaDacProfile
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Database] <String[]>
    [[-Path] <String>]
    [[-ConnectionString] <String[]>]
    [[-PublishOptions] <Hashtable>]
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
PS C:\> New-DbaDacProfile -SqlInstance sql2017 -SqlCredential ad\sqldba -Database WorldWideImporters -Path C:\temp
```

In this example, a prompt will appear for alternative credentials, then a connection will be made to sql2017. Using that connection,<br>
the ConnectionString will be extracted and used within the Publish Profile XML file which will be created at C:\temp\sql2017-WorldWideImporters-publish.xml<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDacProfile -Database WorldWideImporters -Path C:\temp -ConnectionString "SERVER=(localdb)\MSSQLLocalDB;Integrated Security=True;Database=master"
```

In this example, no connections are made, and a Publish Profile XML would be created at C:\temp\localdb-MSSQLLocalDB-WorldWideImporters-publish.xml<br>

### Required Parameters

##### -Database

Specifies the target database name where the dacpac will be deployed. This sets the TargetDatabaseName property in the generated publish profile.  
Use this to define which database will receive the dacpac deployment when the profile is used with SqlPackage.exe or Visual Studio publishing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Alternatively, you can provide a ConnectionString.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -Path

Specifies the directory where the publish profile XML files will be created. Defaults to your Documents folder if not specified.  
Files are automatically named using the pattern "instancename-databasename-publish.xml" for easy identification and organization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$home\Documents" |

##### -ConnectionString

Provides a direct connection string for the target SQL Server instance and database. This becomes the TargetConnectionString in the generated publish profile.  
Use this instead of SqlInstance when you need specific connection parameters, are connecting to non-standard instances like LocalDB, or when working in environments where Connect-DbaInstance may have   
limitations.  
If you provide SqlInstance, the function will connect and generate the connection string automatically.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PublishOptions

Specifies additional deployment options as a hashtable that will be embedded in the publish profile XML. Each key/value pair becomes a PropertyGroup element in the profile.  
Use this to control dacpac deployment behavior like blocking data loss (BlockOnPossibleDataLoss), ignoring permissions (IgnorePermissions), or script generation options.  
Common options include IgnoreUserSettingsObjects, GenerateDeploymentScript, and CreateNewDatabase. See SqlPackage.exe documentation for complete option list.

| Property | Value |
| --- | --- |
| Alias |  |
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
