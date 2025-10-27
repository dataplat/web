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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDacProfile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDacProfile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Richie lee (@richiebzzzt)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="New-DbaDacProfile -SqlInstance sql2017 -SqlCredential ad\sqldba -Database WorldWideImporters -Path C:\temp" }

In this example, a prompt will appear for alternative credentials, then a connection will be made to sql2017. Using that connection,<br>
the ConnectionString will be extracted and used within the Publish Profile XML file which will be created at C:\temp\sql2017-WorldWideImporters-publish.xml<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDacProfile -Database WorldWideImporters -Path C:\temp -ConnectionString "SERVER=(localdb)\MSSQLLocalDB;Integrated Security=True;Database=master"
```
{: data-copyable="true" data-clean-code="New-DbaDacProfile -Database WorldWideImporters -Path C:\temp -ConnectionString &quot;SERVER=(localdb)\MSSQLLocalDB;Integrated Security=True;Database=master&quot;" }

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
