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

# Export-DbaRegServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaRegServer](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaRegServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaRegServer](https://dataplat.github.io/boh#Export-DbaRegServer).

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

Exports all Registered Server and Registered Server Groups on sql2008 to an automatically generated file name in the current directory<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2008, sql2012 | Export-DbaRegServer
```

Exports all registered servers on sql2008 and sql2012. Warning - each one will have its own individual file. Consider piping groups.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2008, sql2012 | Export-DbaRegServer
```

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
