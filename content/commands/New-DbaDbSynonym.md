---
title: "New-DbaDbSynonym"
slug: "New-DbaDbSynonym"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Creates database synonyms to provide alternate names for tables, views, procedures, and other database objects."
tags:
  - "Synonym"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSynonym.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDbSynonym"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDbSynonym</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSynonym.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Mikey Bronowski (@MikeyBronowski), bronowski.it</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates database synonyms to provide alternate names for tables, views, procedures, and other database objects.

## Description

Creates database synonyms that serve as alternate names or aliases for database objects like tables, views, stored procedures, and functions. Synonyms simplify object references by providing shorter names, hiding complex schema structures, or creating abstraction layers for applications. You can create synonyms that reference objects in the same database, different databases, or even on linked servers, making cross-database and cross-server object access more manageable for applications and users.

## Syntax

```powershell
New-DbaDbSynonym
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Synonym] <String>]
    [[-Schema] <String>]
    [[-BaseServer] <String>]
    [[-BaseDatabase] <String>]
    [[-BaseSchema] <String>]
    [-BaseObject] <String>
    [[-InputObject] <Database[]>]
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
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Synonym synObj1 -BaseObject Obj1
```
{: data-copyable="true" data-clean-code="New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Synonym synObj1 -BaseObject Obj1" }

Will create a new synonym named synObj1 in db1 database in dbo schema on sql2017a instance for Obj1 object in the same database.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Synonym synObj1 -BaseObject Obj1
```
{: data-copyable="true" data-clean-code="New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Synonym synObj1 -BaseObject Obj1" }

Will create a new synonym named synObj1 in db1 database in dbo schema on sql2017a instance for Obj1 object in the same database.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1
```
{: data-copyable="true" data-clean-code="New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1" }

Will create a new synonym named synObj1 within dbo schema in db1 database  on sql2017a instance for Obj1 object in the same database.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2
```
{: data-copyable="true" data-clean-code="New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2" }

Will create a new synonym named synObj1 within sch1 schema in db1 database on sql2017a instance for Obj1 object within bSch2 schema in the same database.<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2 -BaseDatabase bDb3
```
{: data-copyable="true" data-clean-code="New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2 -BaseDatabase bDb3" }

Will create a new synonym named synObj1 within sch1 schema in db1 database on sql2017a instance for Obj1 object within bSch2 schema in bDb3 database.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2 -BaseDatabase bDb3 -BaseServer bSrv4
```
{: data-copyable="true" data-clean-code="New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2 -BaseDatabase bDb3 -BaseServer bSrv4" }

Will create a new synonym named synObj1 within sch1 schema in db1 database on sql2017a instance for Obj1 object within bSch2 schema in bDb3 database on bSrv4 linked server.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017a -ExcludeSystem | New-DbaDbSynonym -Synonym synObj1 -BaseObject Obj1
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2017a -ExcludeSystem | New-DbaDbSynonym -Synonym synObj1 -BaseObject Obj1" }

Will create a new synonym named synObj1 within dbo schema in all user databases on sql2017a instance for Obj1 object in the respective databases.<br>

### Required Parameters

##### -BaseObject

The name of the database object that the synonym will reference. Supports tables, views, stored procedures, functions, and other schema-scoped objects.  
This is the actual object that users will access through the synonym name, enabling abstraction and simplified references.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to create the synonym in. Accepts wildcards for pattern matching.  
When omitted, synonyms will be created in all accessible databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from synonym creation when processing multiple databases.  
Useful when you want to create synonyms across most databases but skip system databases or specific user databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Synonym

The name of the synonym to create. This becomes the alternate name that applications and users will reference.  
Choose meaningful names that follow your organization's naming conventions and make object access more intuitive.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

The schema where the synonym will be created. Defaults to 'dbo' if not specified.  
Consider using application-specific schemas to organize synonyms logically and control access through schema permissions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbo |

##### -BaseServer

The linked server name when creating cross-server synonyms. Requires BaseDatabase and BaseSchema parameters.  
Use this to create synonyms that reference objects on remote SQL Server instances through established linked server connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BaseDatabase

The database containing the target object that the synonym will reference. Requires BaseSchema when specified.  
Use this for cross-database synonyms or when creating synonyms on linked servers to reference objects in specific databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BaseSchema

The schema containing the target object that the synonym will reference.  
Required when BaseDatabase is specified, ensuring the synonym points to the correct object in complex multi-schema environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for creating synonyms across multiple databases.  
Useful for batch operations when you need to create the same synonym in multiple databases selected by specific criteria.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
