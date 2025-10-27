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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaLinkedServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaLinkedServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Export-DbaLinkedServer -SqlInstance sql2017 -Path C:\temp\ls.sql" }

Exports the linked servers, including passwords, from sql2017 to the file C:\temp\ls.sql<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaLinkedServer -SqlInstance sql2017 -Path C:\temp\ls.sql -ExcludePassword
```
{: data-copyable="true" data-clean-code="Export-DbaLinkedServer -SqlInstance sql2017 -Path C:\temp\ls.sql -ExcludePassword" }

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
