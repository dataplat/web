---
title: "Export-DbaRegServer"
slug: "Export-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports registered servers and registered server groups to file"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaRegServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaRegServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaRegServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Exports registered servers and registered server groups to file

## Description

Exports registered servers and registered server groups to file

## Syntax

```powershell
Export-DbaRegServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <Object[]>]
    [[-Path] <String>]
    [[-FilePath] <FileInfo>]
    [[-CredentialPersistenceType] <String>]
    [[-Group] <Object[]>]
    [[-ExcludeGroup] <Object[]>]
    [-Overwrite]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaRegServer -SqlInstance sql2008
```
{: data-copyable="true" data-clean-code="Export-DbaRegServer -SqlInstance sql2008" }

Exports all Registered Server and Registered Server Groups on sql2008 to an automatically generated file name in the current directory<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2008, sql2012 | Export-DbaRegServer
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2008, sql2012 | Export-DbaRegServer" }

Exports all registered servers on sql2008 and sql2012. Warning - each one will have its own individual file. Consider piping groups.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2008, sql2012 | Export-DbaRegServer
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sql2008, sql2012 | Export-DbaRegServer" }

Exports all registered servers on sql2008 and sql2012, organized by group.<br>

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
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server or server group objects from Get-DbaRegServer, Get-DbaRegServerGroup, or custom objects via pipeline.  
Use this to export specific servers or groups that have been filtered or modified before export.  
For custom objects, requires a ServerName column with optional Name, Description, and Group columns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Path

Specifies the directory where the exported registered server files will be saved.  
Uses the dbatools default export directory if not specified, typically your user profile's Documents folder.  
Automatically generates timestamped filenames when exporting multiple servers or groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path for the exported registered server file, including filename and extension.  
Must end with .xml or .regsrvr extension to be compatible with SQL Server Management Studio imports.  
When exporting multiple groups, the group name is automatically appended to avoid file conflicts.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CredentialPersistenceType

Controls how login credentials are stored in the exported registered server file.  
Use 'PersistLoginName' to save usernames only, or 'PersistLoginNameAndPassword' to include passwords for automated connections.  
Defaults to 'None' for security, requiring manual credential entry when connecting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | None |
| Accepted Values | None,PersistLoginName,PersistLoginNameAndPassword |

##### -Group

Filters export to include only registered servers from the specified server group names.  
Use this when you want to export servers from specific organizational groups like 'Production', 'Development', or 'QA'.  
Accepts wildcards and multiple group names to export several groups in a single operation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeGroup

Excludes registered servers from the specified server group names during export.  
Useful when exporting most groups but need to skip sensitive environments like 'Production' or 'Customer-Facing'.  
Can be combined with the Group parameter to fine-tune which servers are included in the export.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Overwrite

Allows the function to replace an existing file at the specified FilePath location.  
Required when the target export file already exists, preventing accidental data loss.  
Without this switch, the function will stop with an error if the destination file is found.

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


&nbsp;
