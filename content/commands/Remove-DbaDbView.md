---
title: "Remove-DbaDbView"
slug: "Remove-DbaDbView"
date: 2024-01-01
layout: "single"
author: "Mikey Bronowski (@MikeyBronowski), bronowski.it"
availability: "Windows, Linux, macOS"
synopsis: "Removes database views from SQL Server databases"
tags:
  - "View"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbView.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbView"
draft: false
---

# Remove-DbaDbView

| Property | Value |
| --- | --- |
| **Author** | Mikey Bronowski (@MikeyBronowski), bronowski.it |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbView](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbView.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbView](https://dataplat.github.io/boh#Remove-DbaDbView).

## Synopsis

Removes database views from SQL Server databases

## Description

Removes one or more database views from specified databases and SQL Server instances. This function streamlines the cleanup of obsolete views during database refactoring, development cleanup, or schema maintenance tasks. You can specify views individually by name or use pipeline input from Get-DbaDbView for bulk operations. Each removal operation includes detailed status reporting and supports WhatIf testing to preview changes before execution.

## Syntax

```powershell
Remove-DbaDbView
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Database <String[]>]
    [-View <String[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Remove-DbaDbView -InputObject <View[]>
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
PS C:\> Remove-DbaDbView -SqlInstance localhost, sql2016 -Database db1, db2 -View view1, view2, view3
```

Removes view1, view2, view3 from db1 and db2 on the local and sql2016 SQL Server instances.<br>

#####  Example:  2 

```powershell
PS C:\> $views = Get-DbaDbView -SqlInstance localhost, sql2016 -Database db1, db2 -View view1, view2, view3
PS C:\> $views | Remove-DbaDbView
```

Removes view1, view2, view3 from db1 and db2 on the local and sql2016 SQL Server instances.<br>

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

Accepts view objects from Get-DbaDbView for pipeline operations. Use this for complex filtering scenarios or bulk removals.  
This approach provides better control over which specific views get removed compared to using name-based targeting.

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

Specifies which databases to search for views to remove. Accepts multiple database names.  
Use this to limit view removal to specific databases instead of searching all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -View

Specifies the names of the views to remove. Accepts multiple view names and supports wildcards for pattern matching.  
When targeting views in specific schemas, use the two-part naming convention like 'dbo.ViewName'.

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
