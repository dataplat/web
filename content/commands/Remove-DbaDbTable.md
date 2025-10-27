---
title: "Remove-DbaDbTable"
slug: "Remove-DbaDbTable"
date: 2024-01-01
layout: "single"
author: "Andreas Jordan (@JordanOrdix), ordix.de"
availability: "Windows, Linux, macOS"
synopsis: "Drops tables from SQL Server databases with safety controls and detailed status reporting."
tags:
  - "Table"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbTable.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbTable"
draft: false
---

# Remove-DbaDbTable

| Property | Value |
| --- | --- |
| **Author** | Andreas Jordan (@JordanOrdix), ordix.de |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbTable](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbTable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbTable](https://dataplat.github.io/boh#Remove-DbaDbTable).

## Synopsis

Drops tables from SQL Server databases with safety controls and detailed status reporting.

## Description

Permanently removes tables from one or more databases using SQL Server Management Objects (SMO). This function provides a safer alternative to manual DROP TABLE statements by including built-in confirmation prompts and comprehensive error handling. You can specify tables directly by name or pipe table objects from Get-DbaDbTable for more complex filtering scenarios. Each removal operation returns detailed status information including success confirmation and specific error messages when failures occur.

## Syntax

```powershell
Remove-DbaDbTable
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [[-InputObject] <Table[]>]
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
PS C:\> Remove-DbaDbTable -SqlInstance localhost, sql2016 -Database db1, db2 -Table table1, table2, table3
```

Removes table1, table2, table3 from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  2 

```powershell
PS C:\> $tables = Get-DbaDbTable -SqlInstance localhost, sql2016 -Database db1, db2 -Table table1, table2, table3
PS C:\> $tables | Remove-DbaDbTable
```

Removes table1, table2, table3 from db1 and db2 on the local and sql2016 SQL Server instances.<br>

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

Specifies which databases to target for table removal operations. Accepts multiple database names as an array.  
Use this when you need to remove tables from specific databases rather than searching across all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies the names of tables to remove from the target databases. Accepts multiple table names as an array.  
Tables should be specified by name only (without schema prefix) as the function will find tables regardless of schema. Use Get-DbaDbTable for more complex filtering scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts table objects directly from Get-DbaDbTable for removal operations. This approach allows for advanced filtering and validation before deletion.  
Use this parameter when you need to remove tables based on complex criteria like size, row count, or schema patterns that Get-DbaDbTable can filter.

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
This is the default. Use -Confirm:$false to suppress these prompts.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
