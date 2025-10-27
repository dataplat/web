---
title: "Export-DbaLinkedServer"
slug: "Export-DbaLinkedServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL scripts to recreate linked server configurations with their login credentials."
tags:
  - "LinkedServer"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaLinkedServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaLinkedServer"
draft: false
---

# Export-DbaLinkedServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaLinkedServer](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaLinkedServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaLinkedServer](https://dataplat.github.io/boh#Export-DbaLinkedServer).

## Synopsis

Generates T-SQL scripts to recreate linked server configurations with their login credentials.

## Description

Creates executable T-SQL scripts from existing linked server definitions, including remote login mappings and passwords. Perfect for migrating linked servers between environments, creating disaster recovery scripts, or documenting your linked server landscape. When passwords are included, the function accesses the local registry to decrypt stored credentials, so the generated scripts contain actual working passwords rather than placeholder values.

## Syntax

```powershell
Export-DbaLinkedServer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-LinkedServer] <String[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [-ExcludePassword]
    [-Append]
    [[-InputObject] <LinkedServer[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaLinkedServer -SqlInstance sql2017 -Path C:\temp\ls.sql
```

Exports the linked servers, including passwords, from sql2017 to the file C:\temp\ls.sql<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaLinkedServer -SqlInstance sql2017 -Path C:\temp\ls.sql -ExcludePassword
```

Exports the linked servers, without passwords, from sql2017 to the file C:\temp\ls.sql<br>

### Required Parameters

##### -SqlInstance

Source SQL Server. You must have sysadmin access and server version must be SQL Server version 2005 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -LinkedServer

Specifies one or more linked server names to export, supporting wildcards for pattern matching. If not specified, all linked servers on the instance will be exported.  
Use this when you need to export specific linked servers rather than the entire linked server configuration from an instance.

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

##### -Credential

Login to the target OS using alternative linked servers. Accepts credential objects (Get-Credential)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where the linked server export file will be created. Defaults to the configured DbatoolsExport path.  
Use this when you need the script saved to a specific folder location for organization or deployment purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path and name for the exported T-SQL script, including the .sql extension.  
Use this when you need precise control over the output filename and location, overriding the automatic naming from Path parameter.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludePassword

Excludes actual passwords from the exported script, replacing them with placeholder values for security purposes.  
Use this when sharing scripts across environments or with team members where you need the linked server structure but want to protect sensitive credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the exported linked server scripts to an existing file instead of overwriting it.  
Use this when combining multiple linked server exports into a single deployment script or building comprehensive migration scripts over multiple runs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts linked server objects piped from Get-DbaLinkedServer, allowing you to filter and process specific linked servers before export.  
Use this when you want to chain commands together, such as first getting linked servers with specific criteria then exporting only those results.

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


&nbsp;
