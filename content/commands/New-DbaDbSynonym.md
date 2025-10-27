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

# New-DbaDbSynonym

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDbSynonym](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDbSynonym.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDbSynonym](https://dataplat.github.io/boh#New-DbaDbSynonym).

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

Will create a new synonym named synObj1 in db1 database in dbo schema on sql2017a instance for Obj1 object in the same database.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Synonym synObj1 -BaseObject Obj1
```

Will create a new synonym named synObj1 in db1 database in dbo schema on sql2017a instance for Obj1 object in the same database.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1
```

Will create a new synonym named synObj1 within dbo schema in db1 database  on sql2017a instance for Obj1 object in the same database.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2
```

Will create a new synonym named synObj1 within sch1 schema in db1 database on sql2017a instance for Obj1 object within bSch2 schema in the same database.<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2 -BaseDatabase bDb3
```

Will create a new synonym named synObj1 within sch1 schema in db1 database on sql2017a instance for Obj1 object within bSch2 schema in bDb3 database.<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaDbSynonym -SqlInstance sql2017a -Database db1 -Schema sch1 -Synonym synObj1 -BaseObject Obj1 -BaseSchema bSch2 -BaseDatabase bDb3 -BaseServer bSrv4
```

Will create a new synonym named synObj1 within sch1 schema in db1 database on sql2017a instance for Obj1 object within bSch2 schema in bDb3 database on bSrv4 linked server.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2017a -ExcludeSystem | New-DbaDbSynonym -Synonym synObj1 -BaseObject Obj1
```

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
