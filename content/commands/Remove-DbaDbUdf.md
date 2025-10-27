---
title: "Remove-DbaDbUdf"
slug: "Remove-DbaDbUdf"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes user-defined functions from SQL Server databases."
tags:
  - "Udf"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbUdf.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbUdf"
draft: false
---

# Remove-DbaDbUdf

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbUdf](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbUdf.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbUdf](https://dataplat.github.io/boh#Remove-DbaDbUdf).

## Synopsis

Removes user-defined functions from SQL Server databases.

## Description

Removes user-defined functions from specified databases, providing a clean way to drop obsolete or unwanted UDFs without manual T-SQL scripting. This function is particularly useful during database cleanup operations, code refactoring projects, or when removing deprecated functions that are no longer needed. Supports filtering by schema and function name, and can exclude system UDFs to prevent accidental removal of built-in functions. Works seamlessly with Get-DbaDbUdf for pipeline operations.

## Syntax

```powershell
Remove-DbaDbUdf
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-ExcludeDatabase <Object[]>]
    [-ExcludeSystemUdf]
    [-Schema <String[]>]
    [-ExcludeSchema <String[]>]
    [-Name <String[]>]
    [-ExcludeName <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbUdf -InputObject <UserDefinedFunction[]>
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
PS C:\> Remove-DbaDbUdf -SqlInstance localhost, sql2016 -Database db1, db2 -Name udf1, udf2, udf3
```

Removes udf1, udf2, udf3 from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  2 

```powershell
PS C:\> $udfs = Get-DbaDbUdf -SqlInstance localhost, sql2016 -Database db1, db2 -Name udf1, udf2, udf3
PS C:\> $udfs | Remove-DbaDbUdf
```

Removes udf1, udf2, udf3 from db1 and db2 on the local and sql2016 SQL Server instances.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts UDF objects directly from Get-DbaDbUdf pipeline operations.  
Use this when you need to filter or examine UDFs first before removal, enabling complex selection logic not possible with simple name matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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

##### -Database

Specifies which databases to process for UDF removal. Accepts multiple database names and supports wildcards.  
Use this to limit the operation to specific databases instead of processing all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during UDF removal operations. Auto-populated with server database names for tab completion.  
Use this when you want to process most databases but exclude specific ones like production or system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemUdf

Excludes system-generated and built-in user-defined functions from removal operations.  
Use this safety switch to prevent accidental deletion of system UDFs that may be required for database functionality.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Schema

Specifies which schemas to include when removing UDFs. Accepts multiple schema names.  
Use this to target UDFs in specific schemas like 'dbo', 'reporting', or custom application schemas while leaving others untouched.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSchema

Specifies schemas to skip during UDF removal operations.  
Use this to protect critical schemas from modification while processing UDFs in other schemas throughout the database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies the exact names of UDFs to remove. Accepts multiple function names and supports wildcards.  
Use this for targeted removal of specific functions like deprecated calculation functions or obsolete business logic UDFs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeName

Specifies UDF names to skip during removal operations. Accepts multiple function names and wildcards.  
Use this to protect specific functions from deletion while removing others that match your criteria.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.  
This is the default. Use -Confirm:$false to suppress these prompts.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
