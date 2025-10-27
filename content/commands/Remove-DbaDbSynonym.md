---
title: "Remove-DbaDbSynonym"
slug: "Remove-DbaDbSynonym"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes database synonyms from SQL Server databases"
tags:
  - "Synonym"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSynonym.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbSynonym"
draft: false
---

# Remove-DbaDbSynonym

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbSynonym](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbSynonym.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbSynonym](https://dataplat.github.io/boh#Remove-DbaDbSynonym).

## Synopsis

Removes database synonyms from SQL Server databases

## Description

Removes one or more database synonyms from SQL Server databases by executing DROP SYNONYM commands. Synonyms are database objects that provide alternate names for tables, views, or other objects, often used to simplify complex object names or provide abstraction layers. This function helps clean up obsolete synonyms during database refactoring, migrations, or general maintenance activities, so you don't have to manually script DROP statements across multiple databases or instances.

## Syntax

```powershell
Remove-DbaDbSynonym
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Schema] <String[]>]
    [[-ExcludeSchema] <String[]>]
    [[-Synonym] <String[]>]
    [[-ExcludeSynonym] <String[]>]
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaDbSynonym -SqlInstance localhost -Database db1 -Synonym "synonym1", "synonym2"
```

Removes synonyms synonym1 and synonym2 from the database db1 on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbSynonym -SqlInstance localhost, sql2016 -Database db1, db2 -Synonym synonym1, synonym2, synonym3
```

Removes synonym1, synonym2, synonym3 from db1 and db2 on the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> $servers = Get-Content C:\servers.txt
PS C:\> $servers | Remove-DbaDbSynonym -Database db1, db2 -Synonym synonym1
```

Removes synonym1 from db1 and db2 on the servers in C:\servers.txt<br>

#####  Example:  4 

```powershell
PS C:\> $synonyms = Get-DbaDbSynonym -SqlInstance localhost, sql2016 -Database db1, db2 -Synonym synonym1, synonym2, synonym3
PS C:\> $synonyms | Remove-DbaDbSynonym
```

Removes synonym1, synonym2, synonym3 from db1 and db2 on the local and sql2016 SQL Server instances<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -Database

Specifies which databases to remove synonyms from. Accepts wildcards for pattern matching.  
Use this to target specific databases instead of processing all databases on the instance. If unspecified, all databases will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during synonym removal operations.  
Use this when you want to process most databases but exclude specific ones like system databases or production databases during maintenance windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Specifies which schemas to target for synonym removal within the selected databases.  
Use this to limit removal to synonyms in specific schemas like 'dbo', 'reporting', or custom application schemas. If unspecified, all schemas will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSchema

Specifies schemas to skip during synonym removal operations.  
Use this to avoid removing synonyms from critical schemas while processing others, such as excluding 'sys' or application-specific schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Synonym

Specifies the exact synonym names to remove from the target databases.  
Use this when you need to remove specific synonyms by name rather than all synonyms. Supports multiple synonym names for bulk operations. If unspecified, all synonyms will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSynonym

Specifies synonym names to skip during the removal operation.  
Use this when you want to remove most synonyms but preserve specific ones that are still in use by applications or reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped input from Get-DbaDbSynonym, Get-DbaDatabase, or SQL Server instances.  
Use this to remove synonyms that were identified by Get-DbaDbSynonym or to process multiple server instances from pipeline input. This enables more precise control over which synonyms to remove.

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
