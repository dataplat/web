---
title: "Get-DbaDbView"
slug: "Get-DbaDbView"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server database views with metadata for documentation and analysis."
tags:
  - "View"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbView.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbView"
draft: false
---

# Get-DbaDbView

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbView](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbView.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbView](https://dataplat.github.io/boh#Get-DbaDbView).

## Synopsis

Retrieves SQL Server database views with metadata for documentation and analysis.

## Description

Retrieves all database views from SQL Server instances along with their schema, creation dates, and modification timestamps. This helps DBAs document database architecture, analyze view dependencies, and audit database objects across multiple servers and databases. The function excludes system views by default when requested, making it useful for focusing on custom business logic views.

## Syntax

```powershell
Get-DbaDbView
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemView]
    [[-View] <String[]>]
    [[-Schema] <String[]>]
    [[-InputObject] <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbView -SqlInstance sql2016
```

Gets all database views<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbView -SqlInstance Server1 -Database db1
```

Gets the views for the db1 database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbView -SqlInstance Server1 -ExcludeDatabase db1
```

Gets the views for all databases except db1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbView -SqlInstance Server1 -ExcludeSystemView
```

Gets the views for all databases that are not system objects (there can be 400+ system views in each DB)<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbView
```

Gets the views for the databases on Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance Server1 -ExcludeSystem | Get-DbaDbView
```

Pipe the databases from Get-DbaDatabase into Get-DbaDbView<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaDbView -SqlInstance Server1 -Database db1 -View vw1
```

Gets the view vw1 for the db1 database<br>

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

Specifies which databases to search for views. Use this when you need to focus on specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when retrieving views. Useful when you want results from most databases but need to exclude specific ones like test or staging databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemView

Excludes SQL Server system views from results to focus only on user-created views. Essential when documenting custom application views since each database can contain 400+ system views that clutter   
output.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -View

Specifies specific view names to retrieve instead of returning all views. Supports three-part naming (database.schema.view) to target views across different databases and schemas in a single query.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Schema

Filters results to views within specific schemas only. Useful for organizing output when databases have views spread across multiple schemas like dbo, reporting, or application-specific schemas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase through the pipeline. Allows you to filter databases first with Get-DbaDatabase then retrieve views from only those selected databases.

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


&nbsp;
