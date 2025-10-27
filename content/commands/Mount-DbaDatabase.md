---
title: "Mount-DbaDatabase"
slug: "Mount-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Attaches detached database files to a SQL Server instance"
tags:
  - "Attach"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Mount-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Mount-DbaDatabase"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Mount-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Mount-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Attaches detached database files to a SQL Server instance

## Description

Attaches detached database files (.mdf, .ldf, .ndf) back to a SQL Server instance, making the database available for use again. When database files exist on disk but the database is not registered in the SQL Server instance, this command reconnects them using the SQL Server Management Objects (SMO) AttachDatabase method.  
  
If you don't specify the file structure, the command attempts to determine the correct database files by examining backup history for the most recent full backup. This is particularly useful when restoring databases from file copies or moving databases between instances where the files already exist but need to be reattached.

## Syntax

```powershell
Mount-DbaDatabase
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Database] <String[]>
    [[-FileStructure] <StringCollection>]
    [[-DatabaseOwner] <String>]
    [[-AttachOption] <String>]
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
PS C:\> $fileStructure = New-Object System.Collections.Specialized.StringCollection
PS C:\> $fileStructure.Add("E:\archive\example.mdf")
PS C:\> $filestructure.Add("E:\archive\example.ldf")
PS C:\> $filestructure.Add("E:\archive\example.ndf")
PS C:\> Mount-DbaDatabase -SqlInstance sql2016 -Database example -FileStructure $fileStructure
```
{: data-copyable="true" data-clean-code="$fileStructure = New-Object System.Collections.Specialized.StringCollection
$fileStructure.Add(&quot;E:\archive\example.mdf&quot;)
$filestructure.Add(&quot;E:\archive\example.ldf&quot;)
$filestructure.Add(&quot;E:\archive\example.ndf&quot;)
Mount-DbaDatabase -SqlInstance sql2016 -Database example -FileStructure $fileStructure" }

Attaches a database named "example" to sql2016 with the files "E:\archive\example.mdf", "E:\archive\example.ldf" and "E:\archive\example.ndf". The database owner will be set to sa and the attach <br>
option is None.<br>

#####  Example:  2 

```powershell
PS C:\> Mount-DbaDatabase -SqlInstance sql2016 -Database example
```
{: data-copyable="true" data-clean-code="Mount-DbaDatabase -SqlInstance sql2016 -Database example" }

Since the FileStructure was not provided, this command will attempt to determine it based on backup history. If found, a database named example will be attached to sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Mount-DbaDatabase -SqlInstance sql2016 -Database example -WhatIf
```
{: data-copyable="true" data-clean-code="Mount-DbaDatabase -SqlInstance sql2016 -Database example -WhatIf" }

Shows what would happen if the command were executed (without actually performing the command)<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies the names of the detached databases to attach to the SQL Server instance.  
Use this when you have database files (.mdf, .ldf, .ndf) on disk but the database is no longer registered in SQL Server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -FileStructure

Specifies the complete collection of database file paths (.mdf, .ldf, .ndf) required to attach the database.  
When omitted, the command attempts to determine file locations automatically using backup history from the most recent full backup.  
Use this parameter when files are in non-standard locations or when automatic detection fails.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseOwner

Sets the login account that will own the attached database.  
When not specified, defaults to the sa account or the SQL Server sysadmin with ID 1 if sa is not available.  
Use this to assign ownership to a specific login for security or administrative requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AttachOption

Controls how SQL Server handles the database attachment process and Service Broker configuration.  
Use 'RebuildLog' when transaction log files are missing or corrupt, 'EnableBroker' to activate Service Broker, or 'NewBroker' to create a new Service Broker identifier.  
Defaults to 'None' for standard attachment without special handling.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |
| Accepted Values | None,RebuildLog,EnableBroker,NewBroker,ErrorBrokerConversations |

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
